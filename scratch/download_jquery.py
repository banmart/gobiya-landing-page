import urllib.request
import os

def download_jquery():
    url = "https://sayagency.com/wp-includes/js/jquery/jquery.min.js?ver=3.7.1"
    os.makedirs("public/js", exist_ok=True)
    
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        )
        with urllib.request.urlopen(req) as response:
            code = response.read()
            
        with open("public/js/jquery.min.js", "wb") as f:
            f.write(code)
            
        print("Downloaded jquery.min.js successfully, size:", len(code))
    except Exception as e:
        print("Error downloading jquery.min.js:", e)

if __name__ == "__main__":
    download_jquery()
