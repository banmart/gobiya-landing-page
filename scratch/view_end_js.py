path = r"C:\Users\banma\.gemini\antigravity\brain\97062dfb-172d-429f-9692-59d43cf2ee94\.system_generated\steps\126\content.md"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

parts = content.split("---")
code = parts[-1].strip()

print("File size of JS code:", len(code))
print("\nLast 3000 characters of animations.js:")
print(code[-3000:])
