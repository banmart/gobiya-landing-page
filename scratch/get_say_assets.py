import urllib.request
import re

def get_assets():
    url = "https://sayagency.com/en/"
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        )
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            
        print("HTML length:", len(html))
        
        # Find all stylesheets
        css_links = re.findall(r'<link[^>]+rel=["\']stylesheet["\'][^>]+href=["\']([^"\']+)["\']', html)
        print("\nStylesheets found:")
        for link in css_links:
            print(" -", link)
            
        # Find all scripts
        scripts = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', html)
        print("\nScripts found:")
        for script in scripts:
            print(" -", script)
            
    except Exception as e:
        print("Error fetching SAY Agency:", e)

if __name__ == "__main__":
    get_assets()
