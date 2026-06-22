import re

def list_selectors():
    with open("public/css/theme.css", "r", encoding="utf-8") as f:
        css = f.read()
        
    # Find all text before '{'
    selectors = re.findall(r'([^{]+)\s*\{', css)
    clean_selectors = []
    for sel in selectors:
        # Split by comma for multiple selectors
        parts = sel.split(",")
        for p in parts:
            p_clean = p.strip()
            # Remove media queries or keyframe names
            if not p_clean.startswith("@") and p_clean:
                clean_selectors.append(p_clean)
                
    clean_selectors = sorted(list(set(clean_selectors)))
    print("Total unique selectors in theme.css:", len(clean_selectors))
    print("\nFirst 100 selectors in theme.css:")
    for sel in clean_selectors[:100]:
        print(" -", sel)

if __name__ == "__main__":
    list_selectors()
