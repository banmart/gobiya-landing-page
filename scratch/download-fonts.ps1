# Font Download Script v2 — handles Unicode subsets properly
# Each weight has multiple woff2 files (latin, latin-ext, etc.) — we need all of them.
# BUT for the @font-face declarations in CSS we only need the "latin" subset (most common).
# We'll download all subsets then just reference the critical latin subset in CSS.

$fontsDir = "public/fonts"
New-Item -ItemType Directory -Force -Path $fontsDir | Out-Null

$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
$url = "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Geist:wght@300;400;500&family=Geist+Mono:wght@400;500&display=swap"

Write-Host "Fetching Google Fonts CSS..."
$css = (Invoke-WebRequest -Uri $url -UserAgent $ua -UseBasicParsing).Content

# Parse @font-face blocks with their unicode-range comment context
# Google Fonts CSS structure:
#   /* latin */
#   @font-face { ... }
# We split by comment to get the subset name for each block

$sections = $css -split '(?=\/\* )'
Write-Host "Sections: $($sections.Count)"

$downloaded = @{}
$fontMap = @{}  # family+weight -> { subset -> filename }

foreach ($section in $sections) {
    # Get subset name from comment
    $commentMatch = [regex]::Match($section, '^\/\* ([^*]+) \*\/')
    $subset = if ($commentMatch.Success) { $commentMatch.Groups[1].Value.Trim() } else { "unknown" }
    
    # Find @font-face block in this section
    $faceMatch = [regex]::Match($section, '@font-face\s*\{([^}]+)\}', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if (-not $faceMatch.Success) { continue }
    $block = $faceMatch.Groups[1].Value
    
    # Extract fields
    $familyMatch = [regex]::Match($block, "font-family:\s*'([^']+)'")
    $family = if ($familyMatch.Success) { $familyMatch.Groups[1].Value } else { continue }
    
    $weightMatch = [regex]::Match($block, 'font-weight:\s*(\d+)')
    $weight = if ($weightMatch.Success) { $weightMatch.Groups[1].Value } else { "400" }
    
    $urlMatch = [regex]::Match($block, 'url\(([^)]+\.woff2)\)')
    if (-not $urlMatch.Success) { continue }
    $woff2Url = $urlMatch.Groups[1].Value
    
    $unicodeMatch = [regex]::Match($block, 'unicode-range:\s*([^\n;]+)')
    $unicodeRange = if ($unicodeMatch.Success) { $unicodeMatch.Groups[1].Value.Trim() } else { "" }
    
    # Build filename
    $familyClean = $family -replace '\s+', ''
    $subsetClean = $subset -replace '[^a-zA-Z0-9-]', ''
    $filename = "${familyClean}-${weight}-${subsetClean}.woff2"
    $outPath = "$fontsDir/$filename"
    
    if ($downloaded.ContainsKey($woff2Url)) {
        continue
    }
    
    Write-Host "  DL: $filename"
    try {
        Invoke-WebRequest -Uri $woff2Url -OutFile $outPath -UseBasicParsing
        $downloaded[$woff2Url] = $filename
        
        # Store the mapping for CSS generation
        $key = "${family}|${weight}"
        if (-not $fontMap.ContainsKey($key)) {
            $fontMap[$key] = @{}
        }
        $fontMap[$key][$subset] = @{
            file = $filename
            unicode = $unicodeRange
        }
    } catch {
        Write-Host "    FAILED: $_"
    }
}

Write-Host ""
Write-Host "=== Downloaded Files ==="
Get-ChildItem $fontsDir -Filter "*.woff2" | Sort-Object Name | Select-Object Name, @{N='KB';E={[math]::Round($_.Length/1KB,1)}} | Format-Table

# Now generate the @font-face CSS using the raw Google Fonts CSS response
# BUT with local paths instead of CDN URLs
Write-Host ""
Write-Host "=== Generating @font-face CSS ==="

$fontFaceCSS = ""

foreach ($section in $sections) {
    $commentMatch = [regex]::Match($section, '^\/\* ([^*]+) \*\/')
    $subset = if ($commentMatch.Success) { $commentMatch.Groups[1].Value.Trim() } else { "unknown" }
    
    $faceMatch = [regex]::Match($section, '@font-face\s*\{([^}]+)\}', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if (-not $faceMatch.Success) { continue }
    $block = $faceMatch.Groups[1].Value
    
    $familyMatch = [regex]::Match($block, "font-family:\s*'([^']+)'")
    $family = if ($familyMatch.Success) { $familyMatch.Groups[1].Value } else { continue }
    
    $weightMatch = [regex]::Match($block, 'font-weight:\s*(\d+)')
    $weight = if ($weightMatch.Success) { $weightMatch.Groups[1].Value } else { "400" }
    
    $urlMatch = [regex]::Match($block, 'url\(([^)]+\.woff2)\)')
    if (-not $urlMatch.Success) { continue }
    $woff2Url = $urlMatch.Groups[1].Value
    
    # Find what filename we saved this as
    $localFile = $downloaded[$woff2Url]
    if (-not $localFile) { continue }
    
    # Get unicode-range line
    $unicodeMatch = [regex]::Match($block, '(unicode-range:[^\n;]+;?)')
    $unicodeLine = if ($unicodeMatch.Success) { "  " + $unicodeMatch.Value.Trim().TrimEnd(";") + ";" } else { "" }
    
    # Get font-style
    $styleMatch = [regex]::Match($block, 'font-style:\s*(\w+)')
    $fontStyle = if ($styleMatch.Success) { $styleMatch.Groups[1].Value } else { "normal" }
    
    $fontFaceCSS += "/* $subset */`n"
    $fontFaceCSS += "@font-face {`n"
    $fontFaceCSS += "  font-family: '$family';`n"
    $fontFaceCSS += "  font-style: $fontStyle;`n"
    $fontFaceCSS += "  font-weight: $weight;`n"
    $fontFaceCSS += "  font-display: swap;`n"
    $fontFaceCSS += "  src: url('/fonts/$localFile') format('woff2');`n"
    if ($unicodeLine) { $fontFaceCSS += "$unicodeLine`n" }
    $fontFaceCSS += "}`n`n"
}

$fontFaceCSS | Out-File "scratch/font-face-generated.css" -Encoding utf8
Write-Host "Generated CSS saved to scratch/font-face-generated.css"
Write-Host "Done!"
