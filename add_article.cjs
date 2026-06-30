const fs = require('fs');

const articleCode = `
'how-can-a-startup-figure-out-whether-its-content-is-being-picked-up-by-llms': {
    slug: 'how-can-a-startup-figure-out-whether-its-content-is-being-picked-up-by-llms',
    title: 'How Can a Startup Figure Out Whether Its Content Is Being Picked Up by LLMs?',
    category: 'Strategy',
    readTime: '9 min read',
    date: 'June 30, 2026',
    image: '/images/llm-content-pickup-thumbnail.webp',
    heroAlt: 'Diverse startup professionals analyzing data on a sleek screen in a photorealistic modern office',
    metaDescription: 'How can a startup figure out whether its content is being picked up by LLMs? Run a prompt library across ChatGPT, Claude & Perplexity, track citations & AI referral traffic. Get a free AI visibility audit.',
    content: (
      <>
        {/* JSON-LD FAQ SCHEMA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How can a startup tell if LLMs are using its content?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Three ways. Run a library of 50–100 buyer-relevant prompts weekly across ChatGPT, Claude, Perplexity, and Google AI Overviews and record whether your brand and URLs appear. Track AI referral traffic (visits from chatgpt.com, perplexity.ai, etc.) and AI-crawler hits (GPTBot, ClaudeBot) in your analytics and server logs. And, once that's too much to do by hand, use an AI citation-tracking tool to automate it at scale. There's no Google Search Console equivalent for LLMs yet, so you build the measurement yourself, anchored on citation rate over time."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do LLMs understand content?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "LLMs process text as tokens and represent meaning as patterns learned across large training corpora, then, in AI search, retrieve and synthesize from web sources at query time. They don't read like humans; they parse structure. Content that's clearly structured — hierarchical headings, concise answer blocks, attributed statistics, FAQ formats, schema markup — is easier for them to understand and extract, and is meaningfully (roughly 28–40%) more likely to be cited. If you're mentioned but not cited, it usually means the model recognizes your brand but your content isn't structured or authoritative enough to be used as the source."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do LLMs determine context?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Within a conversation, LLMs use the surrounding text — your prompt and any prior turns — and, in AI search, the retrieved source documents, weighting relevance through attention mechanisms to decide what's important for the answer. Notably, AI engines often reformulate a user's question into sub-queries rather than searching the literal words (one study found ChatGPT \\"never searches the same way twice\\"), and context is query-dependent and probabilistic. That's why a varied library of prompts beats a single keyword, and why citation status changes from prompt to prompt and day to day, making repeated measurement essential."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do we know exactly how LLMs work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Not completely. We understand the architecture (transformer models that predict tokens from learned patterns) and the broad mechanics, but the internal reasoning of large models isn't fully interpretable, even to the teams that build them. This is exactly why you measure LLM pickup empirically — running prompts and observing outputs — rather than trying to deduce it. You can't read the model's mind, so you watch what it actually does, consistently and over time."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is one way to reduce the likelihood of LLMs producing made-up text?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ground the model in verifiable, retrievable sources — the technique known as retrieval-augmented generation (RAG), where the model answers from supplied, citable documents rather than from memory alone, and is prompted to cite that material. For a startup, the parallel is to publish clear, accurate, authoritative content (and keep consistent, correct information across trusted third-party sources) so AI systems have good material to ground answers about you in, instead of guessing. Grounding reduces hallucination — and being good grounding is also what earns citations."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What's the difference between a mention and a citation?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A mention is when an AI answer names your brand — an awareness signal. A citation is when the AI attributes information to your domain as a source (a linked or named URL) — an authority signal. You can be mentioned without being cited, which usually means the model knows your brand but doesn't trust your content enough to source it. Citations are the higher-value signal: they drive referral traffic and compound (cited sources tend to get cited again). Track both, but treat citation rate as the primary measure of whether your content is truly being picked up."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What citation rate should a startup aim for?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For B2B/SaaS in 2026, seed-stage startups realistically start around 2–8%, below roughly 10% is effectively invisible, 20–30% is a solid target, and 40%+ is category-leading for competitive spaces. These are directional benchmarks, not guarantees — your numbers depend on category, competition, and content maturity. Focus on the trend: a citation rate climbing week over week as you fix crawler access, restructure content, and build authority is the signal that your content is increasingly being picked up."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Why isn't my startup's content showing up in AI answers at all?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The most common cause is technical: your robots.txt may be blocking AI crawlers (GPTBot, ClaudeBot, PerplexityBot), or you may lack structured data and an llms.txt file — if models can't access or parse your content, nothing else matters, so check this first. Beyond that: content that isn't extractable (no clear answer blocks, headings, or stats), weak authority and thin presence on the third-party sources your category cites (around 85% of top-of-funnel AI visibility comes from unowned domains), or a toxic backlink profile suppressing trust. Fix access first, then extractability, then authority."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need a paid tool to track LLM visibility?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No — start free. A manual prompt library run weekly across the major engines, plus GA4 referral segmentation and server-log crawler checks, costs nothing and is the right first step because it forces you to understand the signal. Move to a paid citation-tracking tool (entry-level around $29/month, enterprise far higher) once you're tracking enough prompts and platforms that manual measurement eats too much time. The tool adds scale, consistency, and competitor share-of-voice math — but it measures the problem; it doesn't fix it. Budget for the fixing, not just the tracking."
                  }
                }
              ]
            })
          }}
        />

        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-8 font-medium">
          A practical, no-fluff guide to measuring whether ChatGPT, Claude, Perplexity, and Google's AI Overviews are actually citing your startup's content — the free methods, the metrics that matter, and how to fix it when the answer is "they're not."
        </p>

        {/* INLINE TABLE OF CONTENTS */}
        <details className="bg-gray-50 border border-gray-200 rounded-lg p-6 sm:p-8 my-10 sm:my-14 group" open>
          <summary className="text-[14px] font-semibold uppercase tracking-wider text-gray-500 cursor-pointer list-none flex items-center justify-between">
            Table of Contents
            <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </summary>
          <ul className="mt-6 space-y-3.5 text-[15px] font-medium text-gray-900 border-t border-gray-200 pt-6">
            {[
              { id: 'short-answer', label: 'The short answer' },
              { id: 'three-layers', label: 'Three layers: consumed, referenced, and cited' },
              { id: 'prompt-library', label: 'Method 1: Run a prompt library (the free starting point)' },
              { id: 'referral-traffic', label: 'Method 2: Track AI referral traffic and crawler hits' },
              { id: 'tools', label: 'Method 3: Citation tracking tools (when to automate)' },
              { id: 'metrics', label: 'The metrics that actually matter' },
              { id: 'how-llms-understand', label: 'Mentions vs. citations: how do LLMs understand content?' },
              { id: 'how-llms-work', label: 'Do we know exactly how LLMs work — and how do LLMs determine context?' },
              { id: 'why-not-picked-up', label: 'Why your content isn\\'t being picked up (and how to fix it)' },
              { id: 'reduce-hallucination', label: 'What is one way to reduce the likelihood of LLMs producing made-up text?' },
              { id: 'how-gobiya', label: 'How Gobiya measures and improves LLM pickup' },
              { id: 'right-call', label: 'The right call on measuring LLM visibility' },
              { id: 'faq', label: 'Frequently Asked Questions' },
              { id: 'sources', label: 'Sources & further reading' },
            ].map(({ id, label }) => (
              <li key={id} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F26522] shrink-0" />
                <a href={'#' + id} className="hover:text-[#F26522] transition-colors">{label}</a>
              </li>
            ))}
          </ul>
        </details>

        <h2 id="short-answer" className="scroll-mt-24 text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          The short answer
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          <strong>A startup can figure out whether its content is being picked up by LLMs in three ways: (1) run a library of 50–100 buyer-relevant prompts weekly across ChatGPT, Claude, Perplexity, and Google's AI Overviews and record whether your brand and URLs appear; (2) track AI referral traffic and AI-crawler hits in your analytics and server logs; and (3) use an AI citation-tracking tool to automate this at scale.</strong> There is no "Google Search Console for LLMs" yet, so measurement is something you actively build. The clearest signal is your citation rate — the percentage of relevant prompts where an LLM cites your content. Seed-stage startups typically start at 2–8%; 20–30%+ is a strong target.
        </p>

        <h2 id="three-layers" className="scroll-mt-24 text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          Three layers: consumed, referenced, and cited
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Before you measure anything, you need to know <em>what</em> you're measuring, because "picked up by LLMs" actually means three different things, and most measurement mistakes come from conflating them:
        </p>
        <ul className="space-y-4 mb-8 text-[16px] sm:text-[17px] text-gray-800 leading-[1.75] list-disc pl-6">
          <li><strong>Consumed</strong> — your content was ingested during the model's training or retrieval. You generally can't observe this directly; it's invisible.</li>
          <li><strong>Referenced</strong> — the model used your page to build an answer and attributes information to it internally (the layer citation tools detect).</li>
          <li><strong>Cited</strong> — your URL appears as an explicit, often clickable, source in the answer (Perplexity's inline citations, ChatGPT Search's source links, Google AI Overviews' references).</li>
        </ul>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          There's also a critical distinction between a <strong>mention</strong> (the AI names your brand in the answer — an <em>awareness</em> signal) and a <strong>citation</strong> (the AI attributes information to your domain as a source — an <em>authority</em> signal). A startup can be mentioned without being cited, which usually means the model knows your brand but doesn't trust your content enough to source it. Knowing which layer you're measuring keeps your conclusions honest: "ChatGPT mentioned us" and "ChatGPT cited our blog post" are very different wins. To understand more on how mentions tie to trust, you can read our guide on <a href="/insights/brand-entity-extraction-perception-drift" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">brand entity extraction & perception drift</a>.
        </p>
        
        <figure className="my-10 sm:my-14 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <img
            src="/images/llm-content-pickup-secondary.webp"
            alt="Photorealistic close up of a modern professional working on a laptop, elegant lighting, modern startup office, analyzing data trends"
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </figure>

        <h2 id="prompt-library" className="scroll-mt-24 text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          Method 1: Run a prompt library (the free starting point)
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          The most accessible way to figure out whether LLMs are picking up your content costs nothing but time, and every startup should do it before paying for a tool. The method:
        </p>
        <ol className="space-y-4 mb-8 text-[16px] sm:text-[17px] text-gray-800 leading-[1.75] list-decimal pl-6">
          <li><strong>Build a prompt library of 50–100 queries</strong> your target buyers actually ask about your category — not your brand name, but the problems and comparisons that should surface you (e.g., "best [your category] tools for startups," "how do I solve [problem your product solves]").</li>
          <li><strong>Run them across the major engines</strong> — ChatGPT, Claude, Perplexity, and Google AI Overviews (and Gemini/Copilot if relevant). Platform fragmentation is extreme: research found only about 11% of sites cited by ChatGPT are also cited by Perplexity, so testing one engine predicts little about the others.</li>
          <li><strong>Record three things per prompt:</strong> whether your brand is <em>mentioned</em>, whether a source link points to <em>your domain</em>, and which <em>competitors</em> are cited instead.</li>
          <li><strong>Run it on a fixed cadence</strong> — weekly is the standard — so you have trend data, not a one-time snapshot. AI answers are probabilistic and change query to query and day to day.</li>
        </ol>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Start small (even 20–30 prompts) and expand. Manual tracking is the right first step precisely because it forces you to <em>see</em> the signal — which prompts surface you, which surface competitors, and how the engines differ — before you automate. A simple spreadsheet (prompt × engine × mentioned/cited/competitor) is enough to start.
        </p>

        <h2 id="referral-traffic" className="scroll-mt-24 text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          Method 2: Track AI referral traffic and crawler hits
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          The prompt library tells you whether you <em>appear</em> in answers; your analytics and server logs tell you whether that's driving real behavior, and whether AI bots can even reach you. Two free signals:
        </p>
        <ul className="space-y-4 mb-8 text-[16px] sm:text-[17px] text-gray-800 leading-[1.75] list-disc pl-6">
          <li><strong>AI referral traffic.</strong> In GA4 (or a privacy-friendly analytics tool), segment traffic by referrer to isolate visits from <code>chatgpt.com</code>, <code>perplexity.ai</code>, <code>gemini.google.com</code>, and similar. A growing trickle of AI-referred sessions is direct evidence your content is being surfaced and clicked — and these visitors often convert at higher rates than typical organic traffic. (Note: some AI referrals land in GA4's "direct" bucket, so this undercounts; it's a floor, not a full picture.)</li>
          <li><strong>AI-crawler access in server logs.</strong> Check your logs (or your CDN's analytics) for AI crawler user-agents like <code>GPTBot</code> (OpenAI), <code>ClaudeBot</code> (Anthropic), <code>PerplexityBot</code>, and <code>Google-Extended</code>. If they're not visiting, your content can't be picked up — and the cause is often a <code>robots.txt</code> rule blocking them. This is the most common, and most fixable, reason a startup is invisible to LLMs.</li>
        </ul>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Together these answer two different questions: server logs tell you <em>can the models access your content?</em>, and referral traffic tells you <em>is appearing in answers producing visits?</em> Both are free, and both are blind spots most startups never check.
        </p>

        <h2 id="tools" className="scroll-mt-24 text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          Method 3: Citation tracking tools (when to automate)
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Manual tracking is the right start, but at 50+ prompts across four engines on a weekly cadence, it becomes real overhead that eats your team's time. That's the point to consider an <strong>AI citation-tracking tool</strong>. A category of these now exists, purpose-built to run hundreds of prompts across ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews automatically and log which URLs get cited, how often, with what sentiment, and how your share of voice compares to competitors.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Entry-level options start around $29/month; enterprise platforms go much higher and add GA4/revenue integration. What a tool buys you over the manual method: scale (hundreds of prompts, daily/weekly, without manual labor), consistency (the same prompt set tracked over time for reliable trends), competitor benchmarking (share-of-voice math done for you), and the "used vs. cited" distinction surfaced automatically. The honest guidance on timing: a seed-stage startup can and should start manual; graduate to a tool once you're tracking enough prompts and platforms that manual measurement is stealing time from actually <em>improving</em> the content. The tool measures the problem; it doesn't fix it. For details on how we apply such approaches natively into CRMs, see our <a href="/insights/automated-b2b-sales-pipeline-seo" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">B2B sales pipeline automation guide</a>.
        </p>

        <h2 id="metrics" className="scroll-mt-24 text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          The metrics that actually matter
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Whether you measure manually or with a tool, five metrics tell the real story of whether LLMs are picking up your content:
        </p>
        
        <div className="overflow-x-auto my-8 border border-gray-200 rounded-lg">
          <table className="w-full text-left text-gray-800 text-[14px]">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-900">Metric</th>
                <th className="p-4 font-semibold text-gray-900">What it measures</th>
                <th className="p-4 font-semibold text-gray-900">Why it matters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-medium text-gray-900">Citation rate</td>
                <td className="p-4 text-gray-600">% of relevant prompts where your content is cited</td>
                <td className="p-4 text-gray-600">The clearest single signal of AI authority</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-medium text-gray-900">URL citation rate</td>
                <td className="p-4 text-gray-600">Whether the AI links to <em>your domain</em> (not just names you)</td>
                <td className="p-4 text-gray-600">Distinguishes authority from mere awareness</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-medium text-gray-900">Sentiment</td>
                <td className="p-4 text-gray-600">Whether mentions are positive, neutral, or negative</td>
                <td className="p-4 text-gray-600">A wrong or negative mention is worse than none</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-medium text-gray-900">Prominence</td>
                <td className="p-4 text-gray-600">Primary recommendation vs. listed among alternatives</td>
                <td className="p-4 text-gray-600">Position within the answer shapes influence</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-medium text-gray-900">Share of voice</td>
                <td className="p-4 text-gray-600">Your citations ÷ all brands' citations for the same prompts</td>
                <td className="p-4 text-gray-600">Competitive standing in your category</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          <strong>Benchmarks to calibrate against (B2B/SaaS, 2026):</strong> seed-stage startups realistically start around 2–8% citation rate; below ~10% is effectively invisible; 20–30% is a solid target; and 40%+ is category-leading. Share of voice is simple math: if you track 200 prompts and appear in 60 answers while a competitor appears in 90, your AI SOV is 30% and theirs is 45%. The metric to anchor on is <strong>citation rate over time</strong> — it's nearly binary per prompt (cited or not), easy to measure, and the leading indicator of AI-referred traffic and pipeline. Track the trend, not a single week's number.
        </p>

        <h2 id="how-llms-understand" className="scroll-mt-24 text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          Mentions vs. citations: how do LLMs understand content?
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          To measure pickup well, it helps to understand <em>how do LLMs understand content</em> in the first place. LLMs don't "read" a page the way a person does; they process text as tokens and represent meaning as patterns learned across enormous training corpora, then, in AI search, retrieve and synthesize from web sources at query time. What makes a page <em>understandable</em> — and therefore citable — to an LLM is structure and clarity it can parse and extract: clear hierarchical headings, direct answer blocks (a concise 40–60-word answer right under the question), statistics with explicit attribution, FAQ formats that mirror how people query, and schema markup. For the specific mechanics of this, you might check <a href="/insights/what-is-generative-engine-optimization-and-how-does-it-work" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">Generative Engine Optimization (GEO) principles</a>.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Content with clear formatting (headings, bullets, tables) is meaningfully more likely to be cited — one analysis put it at 28–40% more likely. The practical link to measurement: when your tracking shows you're <em>mentioned but not cited</em>, it usually means the model recognizes your brand but your content isn't structured or authoritative enough to be extracted as the <em>source</em>. Understanding how LLMs parse content tells you what to fix when the measurement comes back weak — make the answer extractable, attributed, and well-structured.
        </p>

        <h2 id="how-llms-work" className="scroll-mt-24 text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          Do we know exactly how LLMs work — and how do LLMs determine context?
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          An honest answer matters here, because it shapes realistic expectations for measurement. <em>Do we know exactly how LLMs work?</em> Not completely. We understand the architecture (transformer models predicting tokens from patterns learned in training) and the broad mechanics, but the internal reasoning of large models is not fully interpretable even to their builders — which is precisely why you have to <em>measure</em> LLM pickup empirically rather than deduce it. You can't read the model's mind; you observe its outputs.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          <em>How do LLMs determine context?</em> Within a conversation, they use the surrounding text (the prompt and prior turns) and, in AI search, the retrieved sources, weighting relevance through attention mechanisms to decide what matters for the answer. Two consequences for startups: first, AI engines often <em>reformulate</em> your buyers' questions into sub-queries rather than searching the literal words (one study of 10,000 prompts found engines rarely search exactly what users type, and ChatGPT "never searches the same way twice") — which is why a <em>library</em> of varied prompts beats a single keyword. Second, because context is query-dependent and probabilistic, your citation status genuinely changes from prompt to prompt and day to day, so single checks mislead and consistent, repeated measurement is the only reliable read. The opacity isn't a reason to give up; it's the reason measurement, not assumption, is the whole game.
        </p>

        <h2 id="why-not-picked-up" className="scroll-mt-24 text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          Why your content isn't being picked up (and how to fix it)
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          When your measurement comes back at near-zero, the cause is usually one of a few fixable things, roughly in order of how often they're the culprit:
        </p>
        <ul className="space-y-4 mb-8 text-[16px] sm:text-[17px] text-gray-800 leading-[1.75] list-disc pl-6">
          <li><strong>AI crawlers are blocked.</strong> Your <code>robots.txt</code> may disallow <code>GPTBot</code>, <code>ClaudeBot</code>, or <code>PerplexityBot</code>, or your site may be hard for them to render. If models can't access your content, nothing else matters — check this first.</li>
          <li><strong>No <code>llms.txt</code> / weak technical readiness.</strong> Missing structured data and an <code>llms.txt</code> file make your content harder for AI systems to interpret. Technical AI-readiness is the foundation. (For a deep dive into structured frameworks, see our overview of the <a href="/insights/introducing-open-knowledge-format-why-it-matters-for-ai-ready-businesses" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">Open Knowledge Format</a>.)</li>
          <li><strong>Content isn't extractable.</strong> Walls of prose without clear answer blocks, headings, stats, or FAQ structure give the model nothing clean to lift. Restructure into direct, attributed, well-formatted answers.</li>
          <li><strong>Weak authority and thin third-party presence.</strong> LLMs lean heavily on what <em>other</em> trusted sources say — research found ~85% of top-of-funnel brand visibility comes from <em>unowned</em> domains. If you're absent from the publications, communities (Reddit, industry forums), and review sites your category cites, you're absent from the answers. Brands cited across four-plus domain types are far more likely to hold visibility.</li>
          <li><strong>Toxic or manipulative backlinks.</strong> A spammy link profile can suppress the trust signal LLMs use to decide whom to cite — sometimes cleaning it up is what unlocks visibility. Learn more about <a href="/insights/what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">algorithmic penalties vs. manual actions</a>.</li>
        </ul>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          The fix mirrors the diagnosis: ensure crawler access and technical readiness, restructure content for extractability, build genuine authority across the third-party sources your category trusts, and re-measure. Pickup follows from removing the blocker <em>and</em> supplying the positive signals.
        </p>

        <h2 id="reduce-hallucination" className="scroll-mt-24 text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          What is one way to reduce the likelihood of LLMs producing made-up text?
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          This question matters to startups for two reasons: you want AI to describe <em>you</em> accurately, and the same principle governs whether your content gets cited. <strong>One reliable way to reduce the likelihood of an LLM producing made-up (hallucinated) text is to ground it in verifiable, retrievable sources</strong> — the technique broadly called retrieval-augmented generation (RAG), where the model answers from supplied, citable documents rather than from memory alone. Giving a model authoritative source material to draw from, and prompting it to cite that material, measurably reduces fabrication.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          For a startup, the parallel is direct and useful: you reduce the chance an AI <em>misrepresents your brand</em> by publishing clear, accurate, well-structured, and authoritative content the models can retrieve and ground their answers in — and by maintaining consistent, correct information about your company across the third-party sources AI engines trust. If an AI is saying something wrong about you, the fix is the same one that improves citation: supply better, clearer, more authoritative grounding (and document the inaccuracy, then correct your owned content), so the model has accurate material to retrieve instead of guessing. Grounding reduces hallucination; for your brand, <em>being</em> good grounding is also what gets you cited. See <a href="/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">what data sources LLMs crawl</a> to learn more.
        </p>

        <h2 id="how-gobiya" className="scroll-mt-24 text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          How Gobiya measures and improves LLM pickup
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Gobiya treats LLM visibility as a measurable engineering problem, not guesswork. Our <a href="/performance/seo-discoverability-agency" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">SEO and AI-discoverability practice</a> starts exactly where this article does: building a prompt library for your category, baselining your citation rate and share of voice across ChatGPT, Claude, Perplexity, and Google AI Overviews, and auditing the technical layer (crawler access, <code>robots.txt</code>, <code>llms.txt</code>, structured data) that determines whether models can pick up your content at all.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          From there we fix the blockers and supply the positive signals — restructuring content for extractability, building authority across the third-party sources your category cites, and tracking whether the numbers actually move. Because we build on fast, clean, crawlable infrastructure, AI-readiness is engineered in rather than bolted on. Want to know whether LLMs are picking up your content right now? <a href="/book" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">Book a free AI visibility audit</a>.
        </p>

        <h2 id="right-call" className="scroll-mt-24 text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          The right call on measuring LLM visibility
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          So, how can a startup figure out whether its content is being picked up by LLMs? Build a prompt library of 50–100 buyer-relevant questions and run them weekly across ChatGPT, Claude, Perplexity, and Google AI Overviews, recording mentions, citations, and competitors; track AI referral traffic and AI-crawler access in your analytics and logs; and graduate to a citation-tracking tool once manual measurement no longer scales. Anchor on citation rate over time, distinguish mentions from citations (awareness vs. authority), and remember there's no native dashboard for this yet — measurement is something you actively build.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Two decisions matter most. First: whether you measure <em>systematically and repeatedly</em> rather than spot-checking, since AI answers are probabilistic and query-dependent, so only a consistent prompt library over time gives a trustworthy read. Second: whether you act on the diagnosis — checking crawler access first, then extractability, then third-party authority — because measurement only pays off if it drives the fixes that turn "not picked up" into "cited." For a startup, getting picked up by LLMs is increasingly where discovery begins, and the brands measuring it now will compound the advantage.
        </p>

        <LeadMagnetCTA />

        <h2 id="faq" className="scroll-mt-24 text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6 my-8">
          {[
            {
              q: "How can a startup tell if LLMs are using its content?",
              a: "Three ways. Run a library of 50–100 buyer-relevant prompts weekly across ChatGPT, Claude, Perplexity, and Google AI Overviews and record whether your brand and URLs appear. Track AI referral traffic (visits from chatgpt.com, perplexity.ai, etc.) and AI-crawler hits (GPTBot, ClaudeBot) in your analytics and server logs. And, once that's too much to do by hand, use an AI citation-tracking tool to automate it at scale. There's no Google Search Console equivalent for LLMs yet, so you build the measurement yourself, anchored on citation rate over time."
            },
            {
              q: "How do LLMs understand content?",
              a: "LLMs process text as tokens and represent meaning as patterns learned across large training corpora, then, in AI search, retrieve and synthesize from web sources at query time. They don't read like humans; they parse structure. Content that's clearly structured — hierarchical headings, concise answer blocks, attributed statistics, FAQ formats, schema markup — is easier for them to understand and extract, and is meaningfully (roughly 28–40%) more likely to be cited. If you're mentioned but not cited, it usually means the model recognizes your brand but your content isn't structured or authoritative enough to be used as the source."
            },
            {
              q: "How do LLMs determine context?",
              a: "Within a conversation, LLMs use the surrounding text — your prompt and any prior turns — and, in AI search, the retrieved source documents, weighting relevance through attention mechanisms to decide what's important for the answer. Notably, AI engines often reformulate a user's question into sub-queries rather than searching the literal words (one study found ChatGPT \\"never searches the same way twice\\"), and context is query-dependent and probabilistic. That's why a varied library of prompts beats a single keyword, and why citation status changes from prompt to prompt and day to day, making repeated measurement essential."
            },
            {
              q: "Do we know exactly how LLMs work?",
              a: "Not completely. We understand the architecture (transformer models that predict tokens from learned patterns) and the broad mechanics, but the internal reasoning of large models isn't fully interpretable, even to the teams that build them. This is exactly why you measure LLM pickup empirically — running prompts and observing outputs — rather than trying to deduce it. You can't read the model's mind, so you watch what it actually does, consistently and over time."
            },
            {
              q: "What is one way to reduce the likelihood of LLMs producing made-up text?",
              a: "Ground the model in verifiable, retrievable sources — the technique known as retrieval-augmented generation (RAG), where the model answers from supplied, citable documents rather than from memory alone, and is prompted to cite that material. For a startup, the parallel is to publish clear, accurate, authoritative content (and keep consistent, correct information across trusted third-party sources) so AI systems have good material to ground answers about you in, instead of guessing. Grounding reduces hallucination — and being good grounding is also what earns citations."
            },
            {
              q: "What's the difference between a mention and a citation?",
              a: "A mention is when an AI answer names your brand — an awareness signal. A citation is when the AI attributes information to your domain as a source (a linked or named URL) — an authority signal. You can be mentioned without being cited, which usually means the model knows your brand but doesn't trust your content enough to source it. Citations are the higher-value signal: they drive referral traffic and compound (cited sources tend to get cited again). Track both, but treat citation rate as the primary measure of whether your content is truly being picked up."
            },
            {
              q: "What citation rate should a startup aim for?",
              a: "For B2B/SaaS in 2026, seed-stage startups realistically start around 2–8%, below roughly 10% is effectively invisible, 20–30% is a solid target, and 40%+ is category-leading for competitive spaces. These are directional benchmarks, not guarantees — your numbers depend on category, competition, and content maturity. Focus on the trend: a citation rate climbing week over week as you fix crawler access, restructure content, and build authority is the signal that your content is increasingly being picked up."
            },
            {
              q: "Why isn't my startup's content showing up in AI answers at all?",
              a: "The most common cause is technical: your robots.txt may be blocking AI crawlers (GPTBot, ClaudeBot, PerplexityBot), or you may lack structured data and an llms.txt file — if models can't access or parse your content, nothing else matters, so check this first. Beyond that: content that isn't extractable (no clear answer blocks, headings, or stats), weak authority and thin presence on the third-party sources your category cites (around 85% of top-of-funnel AI visibility comes from unowned domains), or a toxic backlink profile suppressing trust. Fix access first, then extractability, then authority."
            },
            {
              q: "Do I need a paid tool to track LLM visibility?",
              a: "No — start free. A manual prompt library run weekly across the major engines, plus GA4 referral segmentation and server-log crawler checks, costs nothing and is the right first step because it forces you to understand the signal. Move to a paid citation-tracking tool (entry-level around $29/month, enterprise far higher) once you're tracking enough prompts and platforms that manual measurement eats too much time. The tool adds scale, consistency, and competitor share-of-voice math — but it measures the problem; it doesn't fix it. Budget for the fixing, not just the tracking."
            }
          ].map((faq, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-[18px] font-semibold text-gray-900 mb-3">{faq.q}</h3>
              <p className="text-[16px] leading-[1.6] text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>

        <h2 id="sources" className="scroll-mt-24 text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          Sources & further reading
        </h2>
        <ul className="space-y-4 mb-8 text-[16px] sm:text-[17px] text-gray-800 leading-[1.75] list-disc pl-6">
          <li><a href="https://arxiv.org/abs/2311.09735" target="_blank" rel="noopener noreferrer" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">Generative Engine Optimization (Princeton, Georgia Tech, IIT Delhi)</a> — the peer-reviewed study finding statistics, sources, and quotes raise AI citation likelihood 30–40%.</li>
          <li><a href="https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" target="_blank" rel="noopener noreferrer" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">Google Search Central — Optimizing for AI features on Google Search</a> — Google's guidance on how AI search surfaces and attributes content.</li>
          <li><a href="https://en.wikipedia.org/wiki/Generative_engine_optimization" target="_blank" rel="noopener noreferrer" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">Generative Engine Optimization (GEO) — overview</a> — definitions of AI visibility, citations, and measurement.</li>
          <li><a href="https://developers.google.com/search/docs/crawling-indexing/robots/intro" target="_blank" rel="noopener noreferrer" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">Google Search Central — robots.txt and controlling crawling</a> — how crawler access (including AI bots) is governed.</li>
        </ul>
      </>
    )
  },
`;

const file = 'src/components/ArticlePage.tsx';
let content = fs.readFileSync(file, 'utf8');

const anchor = 'const ARTICLES: Record<string, ArticleData> = {';
const insertPos = content.indexOf(anchor) + anchor.length;

content = content.slice(0, insertPos) + '\n' + articleCode + content.slice(insertPos);
fs.writeFileSync(file, content);
console.log('Inserted new article into ArticlePage.tsx');
