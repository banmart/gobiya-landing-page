import os
import urllib.request

def extract_and_download():
    # 1. Extract theme.css
    theme_md_path = r"C:\Users\banma\.gemini\antigravity\brain\97062dfb-172d-429f-9692-59d43cf2ee94\.system_generated\steps\124\content.md"
    os.makedirs("public/css", exist_ok=True)
    os.makedirs("public/js", exist_ok=True)
    
    if os.path.exists(theme_md_path):
        with open(theme_md_path, "r", encoding="utf-8") as f:
            content = f.read()
        parts = content.split("---")
        theme_css = parts[-1].strip()
        with open("public/css/theme.css", "w", encoding="utf-8") as f:
            f.write(theme_css)
        print("Extracted theme.css successfully, size:", len(theme_css))
    else:
        print("theme.css content.md not found at:", theme_md_path)

    # 2. Extract animations.js
    animations_md_path = r"C:\Users\banma\.gemini\antigravity\brain\97062dfb-172d-429f-9692-59d43cf2ee94\.system_generated\steps\126\content.md"
    if os.path.exists(animations_md_path):
        with open(animations_md_path, "r", encoding="utf-8") as f:
            content = f.read()
        parts = content.split("---")
        animations_js = parts[-1].strip()
        with open("public/js/animations.js", "w", encoding="utf-8") as f:
            f.write(animations_js)
        print("Extracted animations.js successfully, size:", len(animations_js))
    else:
        print("animations.js content.md not found at:", animations_md_path)

    # 3. Download tailwind.css from SAY Agency
    tailwind_url = "https://sayagency.com/wp-content/themes/say/css/tailwind.css?id=ef4ea25298b250c38da3380572d7bf08"
    try:
        req = urllib.request.Request(
            tailwind_url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        )
        with urllib.request.urlopen(req) as response:
            tailwind_css = response.read().decode('utf-8')
        with open("public/css/tailwind.css", "w", encoding="utf-8") as f:
            f.write(tailwind_css)
        print("Downloaded tailwind.css successfully, size:", len(tailwind_css))
    except Exception as e:
        print("Error downloading tailwind.css:", e)

if __name__ == "__main__":
    extract_and_download()
