/**
 * Gobiya client case studies and success stories.
 */

export interface CaseStudy {
  id: string;
  clientName: string;
  industry: string;
  location: string;
  challenge: string;
  solution: string;
  results: string[];
  servicesUsed: string[];
  url: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "smile-center-dentistry",
    clientName: "SmileCenter Dentistry",
    industry: "Dental / Healthcare",
    location: "Los Angeles, CA",
    challenge:
      "The practice had a stagnant online presence with low organic visibility and poor patient inquiry volume despite being a high-quality dental office in a competitive Los Angeles market.",
    solution:
      "Gobiya implemented a comprehensive local SEO strategy including Google Business Profile optimisation, NAP citation cleanup, review velocity programme, local schema markup, and patient-intent content architecture.",
    results: [
      "5× increase in patient inquiries",
      "213,000 organic impressions",
      "Dominant Google Map Pack positioning for target keywords",
      "Review velocity programme generating consistent 5-star reviews",
    ],
    servicesUsed: [
      "Local SEO Services",
      "Google Business Profile Optimisation",
      "SEO Web Copywriting",
      "Technical SEO Audit",
    ],
    url: "https://www.gobiya.com/case-studies",
  },
  {
    id: "american-livescan",
    clientName: "American Livescan",
    industry: "Background Check / Legal Services",
    location: "Los Angeles, CA",
    challenge:
      "American Livescan underwent a website migration that caused significant ranking losses and a 70% drop in organic bookings. The new site had structural issues preventing Google from properly indexing key service pages.",
    solution:
      "Gobiya conducted a forensic migration audit, resolved canonical tag conflicts, fixed redirect chains, rebuilt the internal link architecture, and implemented structured data to re-establish Google's confidence in the site.",
    results: [
      "3× increase in bookings post-migration",
      "Full index coverage restored for all service pages",
      "Redirect chain issues fully eliminated",
      "Rankings restored within 12 weeks",
    ],
    servicesUsed: [
      "SEO Traffic Recovery",
      "Technical SEO Audit",
      "SEO Indexing & Discoverability",
      "Web Development",
    ],
    url: "https://www.gobiya.com/case-studies",
  },
];

export const caseStudiesSummary = {
  totalClients: "50+",
  totalYears: "15+",
  highlights: [
    "SmileCenter Dentistry: 5× patient inquiries, 213K impressions",
    "American Livescan: 3× bookings after legacy migration recovery",
    "Average client traffic recovery: 12 weeks",
    "Google Ads ROAS: 5.7× documented",
    "CPL reduction: 61% documented",
  ],
  caseStudiesUrl: "https://www.gobiya.com/case-studies",
};
