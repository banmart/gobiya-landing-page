import re

def find_gsap_contexts():
    with open("public/js/theme.js", "r", encoding="utf-8") as f:
        code = f.read()
        
    # Find all occurrences of gsap and print 100 chars before and 300 chars after
    matches = [m.start() for m in re.finditer(r"\bgsap\b", code)]
    print(f"Found {len(matches)} matches of 'gsap'")
    
    for i, idx in enumerate(matches):
        start = max(0, idx - 60)
        end = min(len(code), idx + 240)
        print(f"\n--- Match {i+1} at index {idx} ---")
        print(code[start:end].replace('\n', ' '))

if __name__ == "__main__":
    find_gsap_contexts()
