import re

def find_strings():
    path = r"C:\Users\banma\.gemini\antigravity\brain\97062dfb-172d-429f-9692-59d43cf2ee94\.system_generated\steps\126\content.md"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    parts = content.split("---")
    code = parts[-1].strip()
    
    # Let's find double quoted and single quoted strings
    # A simple regex for strings
    strings = re.findall(r'"([^"\\]*(?:\\.[^"\\]*)*)"|\'([^\'\\]*(?:\\.[^\'\\]*)*)\'', code)
    all_strs = []
    for s in strings:
        val = s[0] if s[0] else s[1]
        if val:
            all_strs.append(val)
            
    print("Total strings:", len(all_strs))
    # Filter strings that might be CSS selectors or classes (starting with ., #, or matching standard tags/classes)
    potential_selectors = []
    for s in all_strs:
        if len(s) > 1 and (s.startswith(".") or s.startswith("#") or any(word in s for word in ["menu", "header", "nav", "footer", "card", "btn", "hover", "scroll"])):
            potential_selectors.append(s)
            
    print("\nPotential selectors/classes:")
    for ps in sorted(list(set(potential_selectors))):
        print(" -", ps)

if __name__ == "__main__":
    find_strings()
