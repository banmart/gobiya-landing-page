import urllib.request
import os

def download_and_inspect():
    url = "https://sayagency.com/wp-content/themes/say/js/theme.js?id=00767426050b3c579b71c6aa911c5744"
    os.makedirs("public/js", exist_ok=True)
    
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        )
        with urllib.request.urlopen(req) as response:
            code = response.read().decode('utf-8')
            
        with open("public/js/theme.js", "w", encoding="utf-8") as f:
            f.write(code)
            
        print("Downloaded theme.js successfully, size:", len(code))
        
        # Search for selectors
        selectors = [
            "cursor-follower", "page-header", "menu-item", "universe-card",
            "intro-section", "number-block", "project-card", "glowing-cta",
            "swiper", "active", "hover", "click", "scroll"
        ]
        print("\nKeyword counts in theme.js:")
        for sel in selectors:
            count = code.lower().count(sel.lower())
            print(f" - '{sel}': {count}")
            
    except Exception as e:
        print("Error downloading theme.js:", e)

if __name__ == "__main__":
    download_and_inspect()
