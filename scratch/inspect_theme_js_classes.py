import re

def inspect_theme_js():
    with open("public/js/theme.js", "r", encoding="utf-8") as f:
        code = f.read()
        
    # Search for jQuery selectors like $(".something") or $('#something') or jQuery('.something')
    jq_selectors = re.findall(r'\$\(\s*["\']([^"\']+)["\']\s*\)|jQuery\(\s*["\']([^"\']+)["\']\s*\)', code)
    
    selectors = []
    for match in jq_selectors:
        sel = match[0] if match[0] else match[1]
        if sel:
            selectors.append(sel.strip())
            
    # Also find querySelector / querySelectorAll
    qs_selectors = re.findall(r'querySelector(?:All)?\(\s*["\']([^"\']+)["\']\s*\)', code)
    for sel in qs_selectors:
        if sel:
            selectors.append(sel.strip())
            
    # Also find GSAP animation targets like gsap.to(".class", ...)
    gsap_targets = re.findall(r'gsap\.(?:to|from|fromTo|set)\(\s*["\']([^"\']+)["\']', code)
    for sel in gsap_targets:
        if sel:
            selectors.append(sel.strip())
            
    unique_selectors = sorted(list(set(selectors)))
    print("Total unique selectors in theme.js:", len(unique_selectors))
    print("\nSelectors:")
    for sel in unique_selectors:
        print(" -", sel)

if __name__ == "__main__":
    inspect_theme_js()
