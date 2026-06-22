import re

def search_css():
    with open("public/css/theme.css", "r", encoding="utf-8") as f:
        css = f.read()
        
    print("CSS length:", len(css))
    
    # Simple regex to find selectors
    # Let's find classes matching common layout components
    components = ["header", "footer", "menu", "logo", "hero", "universe", "project", "cta", "cursor", "btn", "container"]
    
    for comp in components:
        matches = re.findall(rf"\.[a-zA-Z0-9_-]*{comp}[a-zA-Z0-9_-]*", css)
        unique_matches = sorted(list(set(matches)))
        print(f"\nSelector '{comp}' matches ({len(unique_matches)}):")
        print(", ".join(unique_matches[:15]))
        if len(unique_matches) > 15:
            print(f"... and {len(unique_matches)-15} more")

if __name__ == "__main__":
    search_css()
