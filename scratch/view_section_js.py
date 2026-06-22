with open("public/js/theme.js", "r", encoding="utf-8") as f:
    code = f.read()

idx = code.find("section:first-of-type")
if idx != -1:
    start = max(0, idx - 200)
    end = min(len(code), idx + 600)
    print("Code around 'section:first-of-type':")
    print(code[start:end])
else:
    print("Could not find 'section:first-of-type' in theme.js")
