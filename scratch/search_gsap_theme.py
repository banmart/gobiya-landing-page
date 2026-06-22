def search_gsap():
    with open("public/js/theme.js", "r", encoding="utf-8") as f:
        code = f.read()
    print("gsap occurrences in theme.js:", code.lower().count("gsap"))
    print("ScrollTrigger occurrences in theme.js:", code.lower().count("scrolltrigger"))
    print("Timeline occurrences in theme.js:", code.lower().count("timeline"))

if __name__ == "__main__":
    search_gsap()
