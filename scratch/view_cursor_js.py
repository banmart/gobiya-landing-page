with open("public/js/theme.js", "r", encoding="utf-8") as f:
    code = f.read()

idx = code.find("cursor-follower")
if idx != -1:
    start = max(0, idx - 200)
    end = min(len(code), idx + 600)
    print("Code around 'cursor-follower':")
    print(code[start:end])
else:
    print("Could not find 'cursor-follower' in theme.js")
