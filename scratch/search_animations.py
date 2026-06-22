import re

def search_js():
    path = r"C:\Users\banma\.gemini\antigravity\brain\97062dfb-172d-429f-9692-59d43cf2ee94\.system_generated\steps\126\content.md"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Let's find some selectors or keywords like gsap.to, gsap.from, scrollTrigger, etc.
    # The file has a header then --- then the code. Let's find code.
    parts = content.split("---")
    if len(parts) < 2:
        print("Could not find --- separator")
        return
    code = parts[-1].strip()
    
    print("Code length:", len(code))
    
    # Search for selectors (e.g. '.something' or '#something') in quotes
    # Let's search for some strings that contain classes from the HTML
    selectors = [
        "cursor-follower", "page-header", "menu-item", "universe-card",
        "intro-section", "number-block", "project-card", "glowing-cta"
    ]
    for sel in selectors:
        matches = [m.start() for m in re.finditer(sel, code)]
        print(f"Keyword '{sel}' matches count: {len(matches)}")
        for idx in matches[:5]:
            start = max(0, idx - 100)
            end = min(len(code), idx + 200)
            print(f"  Match at index {idx}: ... {code[start:end]} ...\n")

if __name__ == "__main__":
    search_js()
