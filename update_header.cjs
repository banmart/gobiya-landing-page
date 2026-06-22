const fs = require('fs');
let content = fs.readFileSync('src/components/SiteHeader.tsx', 'utf8');

// 1. Add isScrolled state
content = content.replace(
  'const [openCategory, setOpenCategory] = useState<string | null>(null);',
  `const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);`
);

// 2. Update header tag
content = content.replace(
  '<header id="page-header" className="page-header w-full relative z-[100]">',
  '<header id="page-header" className={`page-header w-full z-[100] transition-colors duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`} style={{ position: "fixed", top: 0, left: 0 }}>'
);

// 3. Update top menu color
content = content.replace(
  '<ul id="menu-top-en" className="menu">',
  '<ul id="menu-top-en" className="menu" style={{ color: isScrolled ? "inherit" : "#ffffff" }}>'
);

// 4. Update page-header__inner
content = content.replace(
  '<div className="page-header__inner w-full mx-auto flex items-center justify-between static bg-white"',
  '<div className={`page-header__inner w-full mx-auto flex items-center justify-between static transition-colors duration-300 ${isScrolled ? "bg-white" : "bg-transparent"}`}'
);

// 5. Update logo
content = content.replace(
  '<img src="/images/gobiya-wordmark.webp" alt="GOBIYA logo" className="w-full h-auto object-contain" />',
  '<img src="/images/gobiya-wordmark.webp" alt="GOBIYA logo" className="w-full h-auto object-contain transition-all duration-300" style={{ filter: isScrolled ? "none" : "invert(1) brightness(2)" }} />'
);

// 6. Update main menu links (Desktop)
// Creativity
content = content.replace(
  '<a href="/creativity" className="flex items-center gap-1 py-8 text-gray-900 font-medium hover:text-gray-600 transition-colors">',
  '<a href="/creativity" className="flex items-center gap-1 py-8 font-medium hover:text-gray-400 transition-colors" style={{ color: isScrolled ? "#111827" : "#ffffff" }}>'
);
// Performance
content = content.replace(
  '<a href="/performance" className="flex items-center gap-1 py-8 text-gray-900 font-medium hover:text-gray-600 transition-colors">',
  '<a href="/performance" className="flex items-center gap-1 py-8 font-medium hover:text-gray-400 transition-colors" style={{ color: isScrolled ? "#111827" : "#ffffff" }}>'
);
// Relations
content = content.replace(
  '<a href="/relations" className="flex items-center gap-1 py-8 text-gray-900 font-medium hover:text-gray-600 transition-colors">',
  '<a href="/relations" className="flex items-center gap-1 py-8 font-medium hover:text-gray-400 transition-colors" style={{ color: isScrolled ? "#111827" : "#ffffff" }}>'
);

// 7. Update hamburger (careful with exact string match)
content = content.replace(
  '<span className="w-6 h-0.5 bg-black transition-all duration-300" style={{ transform: isMobileMenuOpen ? \'rotate(45deg) translate(5px, 5px)\' : \'none\' }}></span>\n            <span className="w-6 h-0.5 bg-black transition-all duration-300" style={{ opacity: isMobileMenuOpen ? 0 : 1 }}></span>\n            <span className="w-6 h-0.5 bg-black transition-all duration-300" style={{ transform: isMobileMenuOpen ? \'rotate(-45deg) translate(4px, -4px)\' : \'none\' }}></span>',
  '<span className="w-6 h-0.5 transition-all duration-300" style={{ background: isScrolled || isMobileMenuOpen ? "#000" : "#fff", transform: isMobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }}></span>\n            <span className="w-6 h-0.5 transition-all duration-300" style={{ background: isScrolled || isMobileMenuOpen ? "#000" : "#fff", opacity: isMobileMenuOpen ? 0 : 1 }}></span>\n            <span className="w-6 h-0.5 transition-all duration-300" style={{ background: isScrolled || isMobileMenuOpen ? "#000" : "#fff", transform: isMobileMenuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }}></span>'
);

// If hamburger replace didn't match perfectly, we can do it with regex
if (!content.includes('background: isScrolled')) {
  content = content.replace(/<span className="w-6 h-0.5 bg-black/g, '<span className="w-6 h-0.5');
  content = content.replace(/style={{ transform: isMobileMenuOpen \? 'rotate\(45deg\) translate\(5px, 5px\)' : 'none' }}/g, 'style={{ background: isScrolled || isMobileMenuOpen ? "#000" : "#fff", transform: isMobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }}');
  content = content.replace(/style={{ opacity: isMobileMenuOpen \? 0 : 1 }}/g, 'style={{ background: isScrolled || isMobileMenuOpen ? "#000" : "#fff", opacity: isMobileMenuOpen ? 0 : 1 }}');
  content = content.replace(/style={{ transform: isMobileMenuOpen \? 'rotate\(-45deg\) translate\(4px, -4px\)' : 'none' }}/g, 'style={{ background: isScrolled || isMobileMenuOpen ? "#000" : "#fff", transform: isMobileMenuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }}');
}

fs.writeFileSync('src/components/SiteHeader.tsx', content);
console.log("Header updated successfully!");
