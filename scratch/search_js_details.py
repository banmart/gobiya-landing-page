def search_details():
    with open("public/js/animations.js", "r", encoding="utf-8") as f:
        code = f.read()
        
    print("Code length:", len(code))
    
    keywords = ["ScrollTrigger", "gsap", "Swiper", "timeline", "mouseenter", "mousemove", "active", "header", "menu"]
    for kw in keywords:
        count = code.lower().count(kw.lower())
        print(f"Keyword '{kw}': {count} occurrences")

if __name__ == "__main__":
    search_details()
