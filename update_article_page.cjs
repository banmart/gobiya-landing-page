const fs = require('fs');
const file = 'src/components/ArticlePage.tsx';
const content = fs.readFileSync(file, 'utf8');

const startIndex = content.indexOf('const ArticlePage: React.FC<ArticlePageProps> = ({ slug }) => {');
if (startIndex === -1) throw new Error('Not found');

const topPart = content.substring(0, startIndex);

const newComponent = `const ArticlePage: React.FC<ArticlePageProps> = ({ slug }) => {
  const article = ARTICLES[slug];
  const [toc, setToc] = useState<{ id: string; label: string }[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const barRef = useRef<HTMLElement>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);

  // SEO
  useEffect(() => {
    if (!article) return;
    document.title = \`\${article.title} | Gobiya\`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', article.metaDescription);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', \`\${article.title} | Gobiya\`);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', article.metaDescription);
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', \`https://www.gobiya.com\${article.image}\`);
  }, [article]);

  // TOC parsing
  useEffect(() => {
    if (!article) return;
    const timer = setTimeout(() => {
      const headings = document.querySelectorAll('.art-body h2[id]');
      const items = Array.from(headings).map((h) => ({
        id: h.id,
        label: h.textContent?.replace(/^\\d+/, '').trim() || '',
      }));
      setToc(items);
    }, 150);
    return () => clearTimeout(timer);
  }, [article, slug]);

  // ScrollSpy
  useEffect(() => {
    if (toc.length === 0) return;
    const headings = document.querySelectorAll('.art-body h2[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );
    headings.forEach((h) => observer.observe(h));
    return () => headings.forEach((h) => observer.unobserve(h));
  }, [toc]);

  // Progress Bar
  useEffect(() => {
    const onScroll = () => {
      if (navInnerRef.current) {
        navInnerRef.current.classList.toggle('is-scrolled', window.scrollY > 40);
      }
      if (barRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        barRef.current.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!window.gsap) return;
    const ctx = gsap.context(() => {
      const ease = 'power3.out';
      
      const headTl = gsap.timeline({ delay: 0.15, defaults: { ease, duration: 1.1 } });
      headTl
        .from('.breadcrumb', { opacity: 0, y: 12 }, 0)
        .from('.art-meta-top', { opacity: 0, y: 12 }, 0.08)
        .from('.art-head h1', { opacity: 0, y: 24 }, 0.15)
        .from('.art-dek', { opacity: 0, y: 16 }, 0.3)
        .from('.art-byline', { opacity: 0 }, 0.45)
        .from('.brief-strip', { opacity: 0 }, 0.55);

      const sc = (el) => ({ trigger: el, start: 'top 87%' });
      
      gsap.utils.toArray('[data-anim="up"]').forEach((el) => {
        gsap.from(el, { scrollTrigger: sc(el), y: 26, opacity: 0, duration: 1.1, ease });
      });
      
      gsap.utils.toArray('[data-anim="fade"]').forEach((el) => {
        gsap.from(el, { scrollTrigger: sc(el), opacity: 0, duration: 1.1, ease });
      });
      
      gsap.utils.toArray('[data-anim="stagger"]').forEach((parent) => {
        const kids = parent.querySelectorAll('[data-anim-child]');
        if (!kids.length) return;
        gsap.from(kids, { scrollTrigger: sc(parent), y: 22, opacity: 0, duration: 1.05, ease, stagger: 0.1 });
      });

      document.querySelectorAll('.magnetic').forEach((btn) => {
        const strength = 10;
        const move = (e) => {
          const r = btn.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
          const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
          gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power2.out' });
        };
        const leave = () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.45)' });
        };
        btn.addEventListener('mousemove', move);
        btn.addEventListener('mouseleave', leave);
      });
    });
    return () => ctx.revert();
  }, []);

  const handleMagnetSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const first = form.elements.namedItem('m-first').value.trim();
    const last = form.elements.namedItem('m-last').value.trim();
    const email = form.elements.namedItem('m-email').value.trim();
    const company = form.elements.namedItem('m-company').value.trim();
    const domain = form.elements.namedItem('m-domain').value.trim();
    const note = document.getElementById('magnet-note');

    if (!email || !email.includes('@')) {
      form.elements.namedItem('m-email').focus();
      if (note) note.textContent = '// enter a valid work email to receive the checklist';
      return;
    }
    const body = 'Please send me the Core Update & Penalty Recovery Checklist.\\n\\n' +
      'Name: ' + first + ' ' + last + '\\n' +
      'Email: ' + email + '\\nCompany: ' + company + '\\nDomain: ' + domain;
    window.location.href = 'mailto:hello@gobiya.com?subject=' +
      encodeURIComponent('Recovery Checklist request — ' + (domain || company || email)) +
      '&body=' + encodeURIComponent(body);
    if (note) note.textContent = '// opening your mail client — the checklist ships right back';
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-black">
        <div className="text-center px-6">
          <h1 className="text-3xl font-medium mb-4">Article not found</h1>
          <a href="/insights" className="text-green-800 underline">Back to Insights</a>
        </div>
      </div>
    );
  }

  const relatedArticles = [...(RELATED_ARTICLES_MAP[slug] || DEFAULT_RELATED_ARTICLES)]
    .sort((a, b) => {
      const aMatches = a.category === article.category;
      const bMatches = b.category === article.category;
      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return 0;
    }).slice(0, 3);

  return (
    <div className="article-page">
      <div className="progress" aria-hidden="true"><i ref={barRef} id="progress-bar"></i></div>
      
      <SiteHeader />

      <header className="art-head">
        <div className="art-head-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb" data-anim="fade">
            <a href="/">Gobiya</a><i>/</i>
            <a href="/insights">Insights</a><i>/</i>
            <span>{article.title}</span>
          </nav>

          <div className="art-meta-top" data-anim="fade">
            <span className="cat-pill">{article.category}</span>
            <span className="mono-tag">BRIEF — evaluation framework</span>
          </div>

          <h1 className="display" data-anim="up">
            {article.title.split(':').map((part, i, arr) => i === arr.length - 1 ? <React.Fragment key={i}><span className="accent">{part}</span></React.Fragment> : <React.Fragment key={i}>{part}: </React.Fragment>)}
          </h1>

          <p className="art-dek body-l" data-anim="up">
            {article.metaDescription}
          </p>

          <div className="art-byline" data-anim="fade">
            <div className="byline-left">
              <span className="author-mark" aria-hidden="true">SM</span>
              <div>
                <p className="name"><a href="/about/steve-martin">Steve Martin</a></p>
                <p className="role mono-tag">Founder &amp; principal — GOBIYA</p>
              </div>
            </div>
            <div className="byline-right">
              <span>Filed: {article.date}</span>
              <span>{article.readTime}</span>
              <span>Desk: {article.category}</span>
            </div>
          </div>
        </div>

        <div className="brief-strip">
          <div className="brief-strip-inner">
            <span>Evaluation lens: <em>scope · evidence · pricing · contract</em></span>
            <span>Rule of record: <em>no deliverable, no accountability</em></span>
          </div>
        </div>
      </header>

      <div className="art-layout">
        <article className="art-body">
          {article.content}

          <div className="magnet" id="checklist">
            <div className="magnet-head">
              <span>forensic engineering protocol</span>
              <em>free download</em>
            </div>
            <div className="magnet-body">
              <div>
                <h3>Google Core Update &amp; Penalty Recovery Checklist</h3>
                <p>A step-by-step technical guide to isolating algorithmic drops, diagnosing entity devaluation, and preparing reconsideration submissions.</p>
                <ul>
                  <li>Isolate query drops from broad Core Update filters</li>
                  <li>Link-profile triage checklist for manual actions</li>
                  <li>Reconsideration letter copy-paste template</li>
                </ul>
              </div>
              <form className="magnet-form" id="magnet-form" onSubmit={handleMagnetSubmit}>
                <div className="magnet-row">
                  <input className="magnet-input" id="m-first" name="m-first" type="text" placeholder="First name" autoComplete="given-name" />
                  <input className="magnet-input" id="m-last" name="m-last" type="text" placeholder="Last name" autoComplete="family-name" />
                </div>
                <input className="magnet-input" id="m-email" name="m-email" type="email" placeholder="Work email" autoComplete="email" />
                <div className="magnet-row">
                  <input className="magnet-input" id="m-company" name="m-company" type="text" placeholder="Company name" autoComplete="organization" />
                  <input className="magnet-input" id="m-domain" name="m-domain" type="text" placeholder="Website domain" />
                </div>
                <button className="btn btn-light" type="submit">
                  Download recovery checklist
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v12m0 0 5-5m-5 5-5-5M5 20h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <p className="magnet-note" id="magnet-note">// we respect your inbox — instant delivery after submit</p>
              </form>
            </div>
          </div>
        </article>

        <aside className="art-side">
          <div className="side-sticky">
            <div className="toc" data-anim="fade">
              <div className="toc-head">
                <span className="mono-tag">Table of contents</span>
                <span className="mono-tag" style={{color: 'var(--green)'}}>0{toc.length} sections</span>
              </div>
              <nav id="toc-nav" aria-label="Table of contents">
                {toc.map((item, index) => (
                  <a key={item.id} href={\`#\${item.id}\`} className={activeId === item.id ? 'active' : ''}>
                    <span className="n">0{index + 1}</span>{item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="side-cta" data-anim="fade">
              <span className="mono-tag">Let's grow your business</span>
              <h4>Scale organic channels. Get cited in conversational search.</h4>
              <ul>
                <li>More visibility on Google Search &amp; Maps</li>
                <li>Get cited on ChatGPT, Claude, and Gemini</li>
                <li>High-converting paid media campaigns</li>
                <li>Smarter email flow with stronger retention</li>
              </ul>
              <a href="/book" className="btn btn-light magnetic">
                Book a call
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
        </aside>
      </div>

      <section className="related">
        <div className="related-inner">
          <div className="related-head" data-anim="up">
            <h2 className="display">Related <span className="accent">briefs.</span></h2>
            <a href="/insights" className="text-link">
              All insights
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
          <div className="related-grid" data-anim="stagger">
            {relatedArticles.map((item) => {
              const itemSlug = item.href.startsWith('/insights/') ? item.href.substring('/insights/'.length) : '';
              const matchedArticle = itemSlug ? ARTICLES[itemSlug] : null;
              const displayTitle = matchedArticle ? matchedArticle.title : item.title;
              return (
                <a key={item.href} href={item.href} className="rel-card" data-anim-child="true">
                  <span className="rel-pill" style={item.category === 'Local SEO' ? { color: 'var(--green)', borderColor: 'rgba(47,93,80,0.45)' } : {}}>{item.category}</span>
                  <h3>{displayTitle}</h3>
                  <span className="text-link">Read more
                    <svg viewBox="0 0 24 24" width="13" height="13" fill=\"none\" aria-hidden=\"true\"><path d=\"M7 17 17 7M9 7h8v8\" stroke=\"currentColor\" strokeWidth=\"1.8\" strokeLinecap=\"round\" strokeLinejoin=\"round\"/></svg>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export { ARTICLES };
export default ArticlePage;
`;

fs.writeFileSync(file, topPart + newComponent);
