/**
 * KidsCorner Book Profile Page — Reusable React Template
 *
 * Usage:
 *   import KidsCornerBookProfile from './KidsCornerBookProfile';
 *
 *   // Pass a `book` object with { title, author, language } and an optional
 *   // pre-fetched `profileData` JSON. If profileData is omitted the component
 *   // calls the Anthropic API automatically.
 *
 *   <KidsCornerBookProfile
 *     book={{ title: "Wonder", author: "R.J. Palacio", language: "English" }}
 *     apiKey="sk-ant-..."          // pass your key or set REACT_APP_ANTHROPIC_KEY
 *     profileData={null}           // optional: skip API call with pre-fetched data
 *   />
 *
 * Dependencies (install if missing):
 *   npm install react react-dom
 *
 * The component is self-contained — no extra UI library needed.
 */

import { useState, useEffect, useCallback } from "react";

// ─── Book catalogue (edit freely) ────────────────────────────────────────────
export const BOOK_CATALOGUE = {
  English: [
    { title: "The Little Prince", author: "Antoine de Saint-Exupéry" },
    { title: "Wonder", author: "R.J. Palacio" },
    { title: "The Dot", author: "Peter H. Reynolds" },
    { title: "The Hobbit", author: "J.R.R. Tolkien" },
    { title: "The Arrival", author: "Shaun Tan" },
    { title: "The Very Hungry Caterpillar", author: "Eric Carle" },
  ],
  Français: [
    { title: "Le Petit Prince", author: "Antoine de Saint-Exupéry" },
    { title: "La Chenille Qui Fait des Trous", author: "Eric Carle" },
    { title: "La Couleur des Émotions", author: "Anna Llenas" },
    { title: "Le Petit Nicolas", author: "René Goscinny" },
    { title: "Tobie Lolness", author: "Timothée de Fombelle" },
  ],
  Italiano: [
    { title: "Il Piccolo Principe", author: "Antoine de Saint-Exupéry" },
    { title: "Favole al telefono", author: "Gianni Rodari" },
    { title: "Le Avventure di Pinocchio", author: "Carlo Collodi" },
    { title: "Mio Fratello Rincorre i Dinosauri", author: "Giacomo Mazzariol" },
    { title: "La Vita Segreta degli Alberi per Bambini", author: "Peter Wohlleben" },
  ],
  Español: [
    { title: "El Principito", author: "Antoine de Saint-Exupéry" },
    { title: "El Punto", author: "Peter H. Reynolds" },
    { title: "Mafalda", author: "Quino" },
    { title: "Invisible", author: "Eloy Moreno" },
    { title: "La Vida Secreta de los Árboles para Niños", author: "Peter Wohlleben" },
  ],
  Português: [
    { title: "Meu Pé de Laranja Lima", author: "José Mauro de Vasconcelos" },
    { title: "Menina Bonita do Laço de Fita", author: "Ana Maria Machado" },
    { title: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry" },
    { title: "A Bolsa Amarela", author: "Lygia Bojunga" },
    { title: "O Menino Maluquinho", author: "Ziraldo" },
    { title: "A Droga da Obediência", author: "Pedro Bandeira" },
    { title: "Turma da Mônica", author: "Mauricio de Sousa" },
    { title: "Harry Potter e a Pedra Filosofal", author: "J.K. Rowling" },
    { title: "O Pote Vazio", author: "Demi" },
    { title: "Pequenos Cientistas", author: "Vários" },
  ],
  Bilingual: [
    { title: "The Little Prince (Bilingual)", author: "Antoine de Saint-Exupéry" },
    { title: "Dreamers", author: "Yuyi Morales" },
    { title: "The Arrival (Bilingual)", author: "Shaun Tan" },
    { title: "Last Stop on Market Street", author: "Matt de la Peña" },
    { title: "Ada Twist, Scientist", author: "Andrea Beaty" },
  ],
};

// ─── Anthropic API helper ─────────────────────────────────────────────────────
function buildPrompt(book, language) {
  return `Generate a complete KidsCorner Book Page for "${book.title}" by ${book.author} (language context: ${language}).

Prioritize factual accuracy, educational value, literary significance, SEO optimization, and readability.
Write in a neutral editorial style. Do NOT invent awards, ISBNs, publication details, or edition info.
If information cannot be verified, state "Information not reliably available."

Return ONLY a valid JSON object (no markdown fences, no preamble) with this exact structure:
{
  "seo": {
    "title": "SEO title",
    "metaDescription": "meta description under 160 chars",
    "slug": "/book/slug-here"
  },
  "header": {
    "title": "Book title",
    "author": "Author name",
    "originalLanguage": "Language",
    "firstPublished": "Year",
    "recommendedAge": "Age range e.g. 4–8",
    "category": "Category",
    "readingType": "Fiction or Non-Fiction",
    "languagesAvailable": ["English","French"],
    "rating": 5
  },
  "quickOverview": "2–4 sentences why families should read this",
  "summary": {
    "short": "50–100 word summary",
    "full": "200–500 word summary without spoilers"
  },
  "bestEdition": {
    "publisher": "Publisher",
    "year": "Year",
    "format": "Hardcover / Paperback / Board Book",
    "isbn": "ISBN or Information not reliably available",
    "whyThisEdition": "explanation"
  },
  "developmentalBenefits": {
    "criticalThinking": "explanation or null",
    "curiosity": "explanation or null",
    "creativity": "explanation or null",
    "empathy": "explanation or null",
    "languageDevelopment": "explanation or null",
    "culturalAwareness": "explanation or null",
    "independence": "explanation or null",
    "problemSolving": "explanation or null"
  },
  "themes": ["theme1","theme2"],
  "educationalValue": "paragraph",
  "whyThisBookMatters": "paragraph",
  "reviewConsensus": {
    "likes": ["point1","point2","point3"],
    "criticisms": ["point1","point2"],
    "summary": "overall paragraph"
  },
  "awards": ["award1"],
  "author": {
    "name": "Author name",
    "biography": "150–300 words"
  },
  "whoIsItFor": {
    "interests": ["topic1","topic2","topic3"],
    "suitable": ["Independent readers","Read-aloud sessions","Classroom use","Family reading"]
  },
  "similarBooks": [
    {"title":"Title","author":"Author","reason":"one sentence"}
  ],
  "kidsCornerAssessment": {
    "ratings": {
      "criticalThinking": 4,
      "curiosity": 5,
      "creativity": 4,
      "honesty": 3,
      "empathy": 5,
      "independence": 3,
      "culturalAwareness": 4,
      "respectForOthers": 4
    },
    "explanation": "short explanation"
  },
  "bookData": {
    "author": "Author",
    "illustrator": "Illustrator or N/A",
    "publisher": "Publisher",
    "publicationYear": "Year",
    "pages": "Number or Information not reliably available",
    "isbn": "ISBN or Information not reliably available",
    "originalLanguage": "Language",
    "category": "Category",
    "subcategory": "Subcategory",
    "themes": ["theme"],
    "readingLevel": "Level",
    "ageRange": "Ages",
    "series": "Series or N/A",
    "awards": ["award"],
    "formats": ["Hardcover","Paperback"],
    "languagesAvailable": ["language"]
  },
  "internalLinks": {
    "authorPage": "/author/slug",
    "categoryPage": "/category/slug",
    "themePages": ["/theme/slug"],
    "languageCollections": ["/language/slug"],
    "ageGroupCollections": ["/ages/slug"]
  },
  "schema": {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": "Book title",
    "author": {"@type":"Person","name":"Author name"},
    "publisher": {"@type":"Organization","name":"Publisher"},
    "isbn": "ISBN",
    "datePublished": "Year",
    "inLanguage": "Language",
    "genre": "Genre",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "ratingCount": "1000"
    }
  }
}`;
}

async function fetchProfile(book, language, apiKey) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: [{ role: "user", content: buildPrompt(book, language) }],
    }),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  const text = data.content.map((c) => (c.type === "text" ? c.text : "")).join("");
  // Strip any accidental markdown fences
  const clean = text.replace(/^```json\s*/i, "").replace(/\s*```$/, "").trim();
  return JSON.parse(clean);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div style={styles.sectionLabel}>
      <span>{children}</span>
    </div>
  );
}

function Card({ children, style = {} }) {
  return <div style={{ ...styles.card, ...style }}>{children}</div>;
}

function Tag({ children, color }) {
  const palettes = {
    amber: { bg: "#fdf3e0", color: "#7a4f0d", border: "#f5d89a" },
    green: { bg: "#e6f4ea", color: "#1a5c2a", border: "#a8d8b3" },
    blue:  { bg: "#e8f0fb", color: "#1a3a72", border: "#9ab5e8" },
    red:   { bg: "#fdecea", color: "#6b1a1a", border: "#f0b4b4" },
  };
  const p = palettes[color] || palettes.amber;
  return (
    <span style={{ ...styles.tag, background: p.bg, color: p.color, border: `1px solid ${p.border}` }}>
      {children}
    </span>
  );
}

function RatingBar({ label, value }) {
  return (
    <div style={styles.ratingRow}>
      <span style={styles.ratingLabel}>{label}</span>
      <div style={styles.ratingBg}>
        <div style={{ ...styles.ratingFill, width: `${(value / 5) * 100}%` }} />
      </div>
      <span style={styles.ratingNum}>{value}/5</span>
    </div>
  );
}

// ─── Tab panels ──────────────────────────────────────────────────────────────

function ProfileTab({ d }) {
  const awards = d.awards || [];
  const likes = d.reviewConsensus?.likes || [];
  const crits = d.reviewConsensus?.criticisms || [];
  const similar = (d.similarBooks || []).slice(0, 8);

  return (
    <div>
      <section style={styles.section}>
        <SectionLabel>Why Read This Book</SectionLabel>
        <p style={styles.prose}>{d.quickOverview}</p>
      </section>

      <section style={styles.section}>
        <SectionLabel>Summary</SectionLabel>
        <div style={styles.grid2}>
          <Card>
            <div style={styles.cardTitle}>Short Summary</div>
            <p style={styles.prose}>{d.summary?.short}</p>
          </Card>
          <Card>
            <div style={styles.cardTitle}>Best Edition</div>
            <p style={{ ...styles.prose, fontWeight: 500 }}>
              {d.bestEdition?.publisher} · {d.bestEdition?.year} · {d.bestEdition?.format}
            </p>
            <p style={{ ...styles.prose, fontSize: 12, color: "#888", margin: "4px 0 8px" }}>
              ISBN: {d.bestEdition?.isbn}
            </p>
            <p style={{ ...styles.prose, fontSize: 13 }}>{d.bestEdition?.whyThisEdition}</p>
          </Card>
        </div>
        <Card style={{ marginTop: 16 }}>
          <div style={styles.cardTitle}>Full Summary</div>
          <p style={styles.prose}>{d.summary?.full}</p>
        </Card>
      </section>

      <section style={styles.section}>
        <SectionLabel>Themes</SectionLabel>
        <div style={styles.themesGrid}>
          {(d.themes || []).map((t) => (
            <span key={t} style={styles.themePill}>{t}</span>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <SectionLabel>Awards &amp; Recognition</SectionLabel>
        {awards.length ? (
          awards.map((a, i) => (
            <div key={i} style={styles.awardItem}>
              <span style={{ fontSize: 16 }}>🏆</span>
              <span style={styles.prose}>{a}</span>
            </div>
          ))
        ) : (
          <p style={{ ...styles.prose, color: "#888" }}>No verified awards listed.</p>
        )}
      </section>

      <section style={styles.section}>
        <SectionLabel>Reader Consensus</SectionLabel>
        <div style={styles.grid2}>
          <Card>
            <div style={styles.cardTitle}>What Readers Love</div>
            <ul style={styles.list}>
              {likes.map((l, i) => <li key={i} style={styles.listItem}>{l}</li>)}
            </ul>
          </Card>
          <Card>
            <div style={styles.cardTitle}>Common Criticisms</div>
            <ul style={styles.list}>
              {crits.map((c, i) => <li key={i} style={styles.listItem}>{c}</li>)}
            </ul>
          </Card>
        </div>
        <p style={{ ...styles.prose, fontStyle: "italic", color: "#666", marginTop: 16 }}>
          {d.reviewConsensus?.summary}
        </p>
      </section>

      <section style={styles.section}>
        <SectionLabel>Similar Books</SectionLabel>
        <Card>
          {similar.map((b, i) => (
            <div key={i} style={{ ...styles.similarRow, borderBottom: i < similar.length - 1 ? "1px solid #f0ede6" : "none" }}>
              <div style={styles.similarNum}>{i + 1}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{b.title}</div>
                <div style={{ fontSize: 12, color: "#888" }}>{b.author}</div>
                <div style={{ fontSize: 13, color: "#555", marginTop: 4, lineHeight: 1.5 }}>{b.reason}</div>
              </div>
            </div>
          ))}
        </Card>
      </section>

      <section style={styles.section}>
        <SectionLabel>About the Author</SectionLabel>
        <Card>
          <h3 style={styles.cardHeading}>{d.author?.name}</h3>
          <p style={styles.prose}>{d.author?.biography}</p>
        </Card>
      </section>
    </div>
  );
}

function EducationTab({ d }) {
  const devBenefits = Object.entries(d.developmentalBenefits || {}).filter(
    ([, v]) => v && v !== "null"
  );
  const ratings = d.kidsCornerAssessment?.ratings || {};

  return (
    <div>
      <section style={styles.section}>
        <SectionLabel>Developmental Benefits</SectionLabel>
        {devBenefits.map(([key, val]) => (
          <div key={key} style={styles.devCard}>
            <div style={styles.cardTitle}>{key.replace(/([A-Z])/g, " $1").trim()}</div>
            <p style={styles.prose}>{val}</p>
          </div>
        ))}
      </section>

      <section style={styles.section}>
        <SectionLabel>Educational Value</SectionLabel>
        <Card><p style={styles.prose}>{d.educationalValue}</p></Card>
      </section>

      <section style={styles.section}>
        <SectionLabel>Why This Book Matters</SectionLabel>
        <Card><p style={styles.prose}>{d.whyThisBookMatters}</p></Card>
      </section>

      <section style={styles.section}>
        <SectionLabel>KidsCorner Assessment</SectionLabel>
        <Card>
          {Object.entries(ratings).map(([k, v]) => (
            <RatingBar key={k} label={k.replace(/([A-Z])/g, " $1").trim()} value={v} />
          ))}
          <hr style={{ border: "none", borderTop: "1px solid #f0ede6", margin: "16px 0" }} />
          <p style={styles.prose}>{d.kidsCornerAssessment?.explanation}</p>
        </Card>
      </section>

      <section style={styles.section}>
        <SectionLabel>Who Is This Book For</SectionLabel>
        <div style={styles.grid2}>
          <Card>
            <div style={styles.cardTitle}>Children who enjoy</div>
            <ul style={styles.list}>
              {(d.whoIsItFor?.interests || []).map((i) => <li key={i} style={styles.listItem}>{i}</li>)}
            </ul>
          </Card>
          <Card>
            <div style={styles.cardTitle}>Suitable for</div>
            <ul style={styles.list}>
              {(d.whoIsItFor?.suitable || []).map((s) => <li key={s} style={styles.listItem}>{s}</li>)}
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}

function DataTab({ d }) {
  const bookData = d.bookData || {};
  const scalar = Object.entries(bookData).filter(([, v]) => !Array.isArray(v));

  const [copied, setCopied] = useState(false);
  const schemaStr = JSON.stringify(d.schema || {}, null, 2);

  function copySchema() {
    navigator.clipboard.writeText(schemaStr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div>
      <section style={styles.section}>
        <SectionLabel>SEO Metadata</SectionLabel>
        <div style={styles.seoBox}>
          <div style={styles.seoField}>
            <div style={styles.seoKey}>SEO Title</div>
            <div style={styles.seoVal}>{d.seo?.title}</div>
          </div>
          <div style={styles.seoField}>
            <div style={styles.seoKey}>Meta Description</div>
            <div style={styles.seoVal}>{d.seo?.metaDescription}</div>
          </div>
          <div style={styles.seoField}>
            <div style={styles.seoKey}>URL Slug</div>
            <code style={styles.seoSlug}>{d.seo?.slug}</code>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <SectionLabel>Book Data</SectionLabel>
        <Card>
          <table style={styles.table}>
            <tbody>
              {scalar.map(([k, v]) => (
                <tr key={k}>
                  <td style={styles.tdKey}>{k.replace(/([A-Z])/g, " $1").trim()}</td>
                  <td style={styles.tdVal}>{v}</td>
                </tr>
              ))}
              <tr>
                <td style={styles.tdKey}>Languages Available</td>
                <td style={styles.tdVal}>{(bookData.languagesAvailable || []).join(", ")}</td>
              </tr>
              <tr>
                <td style={styles.tdKey}>Formats</td>
                <td style={styles.tdVal}>{(bookData.formats || []).join(", ")}</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      <section style={styles.section}>
        <SectionLabel>Internal Linking</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            ["Author Page", d.internalLinks?.authorPage],
            ["Category Page", d.internalLinks?.categoryPage],
          ].map(([label, val]) => (
            <div key={label} style={styles.devCard}>
              <div style={styles.cardTitle}>{label}</div>
              <code style={{ fontSize: 12, color: "#888" }}>{val}</code>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <SectionLabel>Schema.org Markup</SectionLabel>
        <div style={styles.jsonBlock}>
          <button style={styles.copyBtn} onClick={copySchema}>
            {copied ? "Copied!" : "Copy"}
          </button>
          <pre style={styles.pre}>{schemaStr}</pre>
        </div>
        <p style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
          Paste inside a{" "}
          <code style={{ background: "#f0ede6", padding: "1px 4px", borderRadius: 3 }}>
            &lt;script type="application/ld+json"&gt;
          </code>{" "}
          tag on your book page.
        </p>
      </section>
    </div>
  );
}

function JsonTab({ d }) {
  const [copied, setCopied] = useState(false);
  const fullJson = JSON.stringify(d, null, 2);

  function copy() {
    navigator.clipboard.writeText(fullJson).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div>
      <section style={styles.section}>
        <SectionLabel>Complete Profile JSON</SectionLabel>
        <div style={styles.jsonBlock}>
          <button style={styles.copyBtn} onClick={copy}>
            {copied ? "Copied!" : "Copy All"}
          </button>
          <pre style={styles.pre}>{fullJson}</pre>
        </div>
      </section>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * KidsCornerBookProfile
 *
 * Props:
 *   book         { title: string, author: string }   — required
 *   language     string                              — required (e.g. "English")
 *   apiKey       string                              — Anthropic API key
 *                                                     (falls back to process.env.REACT_APP_ANTHROPIC_KEY)
 *   profileData  object | null                       — optional pre-fetched profile JSON;
 *                                                     if provided the API call is skipped
 */
export default function KidsCornerBookProfile({
  book,
  language = "English",
  apiKey,
  profileData = null,
}) {
  const [data, setData] = useState(profileData);
  const [loading, setLoading] = useState(!profileData);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  const key = apiKey || (typeof process !== "undefined" && process.env?.REACT_APP_ANTHROPIC_KEY);

  const load = useCallback(async () => {
    if (!book) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetchProfile(book, language, key);
      setData(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [book, language, key]);

  useEffect(() => {
    if (!profileData) load();
    else setData(profileData);
  }, [book, profileData]);

  if (loading) {
    return (
      <div style={styles.centered}>
        <div style={styles.spinner} />
        <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "#888", marginTop: 16 }}>
          Generating profile for "{book?.title}"…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorBox}>
        <strong>Error:</strong> {error}
        <button style={{ ...styles.copyBtn, marginLeft: 16, position: "relative", top: 0, right: 0 }} onClick={load}>
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  const h = data.header || {};
  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "education", label: "Education" },
    { id: "data", label: "Data & SEO" },
    { id: "json", label: "JSON" },
  ];

  return (
    <div style={styles.root}>
      {/* Hero */}
      <header style={styles.hero}>
        <div style={styles.heroEyebrow}>{language} Collection</div>
        <h1 style={styles.heroTitle}>{h.title}</h1>
        <p style={styles.heroAuthor}>
          by <span style={{ color: "#b0a99a" }}>{h.author}</span>
        </p>
        <div style={styles.tagsRow}>
          <Tag color="amber">Ages {h.recommendedAge}</Tag>
          <Tag color="green">{h.category}</Tag>
          <Tag color="blue">{h.originalLanguage}</Tag>
          <Tag color="red">{h.readingType}</Tag>
        </div>
        <div style={styles.stars}>{"★".repeat(h.rating || 5)}</div>
      </header>

      {/* Tabs */}
      <div style={styles.content}>
        <div style={styles.tabs}>
          {tabs.map((t) => (
            <button
              key={t.id}
              style={{
                ...styles.tabBtn,
                ...(activeTab === t.id ? styles.tabBtnActive : {}),
              }}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "profile"   && <ProfileTab   d={data} />}
        {activeTab === "education" && <EducationTab d={data} />}
        {activeTab === "data"      && <DataTab      d={data} />}
        {activeTab === "json"      && <JsonTab      d={data} />}
      </div>
    </div>
  );
}

// ─── Catalogue browser (optional convenience wrapper) ─────────────────────────

/**
 * KidsCornerCatalogueBrowser
 *
 * Renders a sidebar + profile view for the full catalogue.
 * Drop this into any page to get the full browsing experience.
 */
export function KidsCornerCatalogueBrowser({ apiKey }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 20, color: "#e8d5b0" }}>KidsCorner</div>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 3, color: "#666", marginTop: 2 }}>
            Book Profiles
          </div>
        </div>
        {Object.entries(BOOK_CATALOGUE).map(([lang, books]) => (
          <div key={lang}>
            <div style={styles.langLabel}>{lang}</div>
            {books.map((b) => {
              const isActive = selected?.book.title === b.title && selected?.language === lang;
              return (
                <button
                  key={b.title}
                  style={{ ...styles.sidebarBtn, ...(isActive ? styles.sidebarBtnActive : {}) }}
                  onClick={() => setSelected({ book: b, language: lang })}
                >
                  {b.title}
                </button>
              );
            })}
          </div>
        ))}
      </aside>

      {/* Profile area */}
      <main style={{ flex: 1, overflowY: "auto" }}>
        {selected ? (
          <KidsCornerBookProfile
            key={selected.book.title + selected.language}
            book={selected.book}
            language={selected.language}
            apiKey={apiKey}
          />
        ) : (
          <div style={styles.centered}>
            <div style={{ fontSize: 48, opacity: 0.3 }}>📚</div>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#555", marginTop: 16 }}>Select a book to begin</h2>
            <p style={{ color: "#888", fontSize: 14 }}>43 books across 6 languages</p>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  root: { background: "#faf8f4", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" },
  hero: {
    background: "#1a1a1a", color: "#f0ede6",
    padding: "48px 56px 40px", position: "relative", overflow: "hidden",
  },
  heroEyebrow: { fontSize: 10, textTransform: "uppercase", letterSpacing: 3, color: "#888", marginBottom: 12 },
  heroTitle: {
    fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 40, fontWeight: 600,
    lineHeight: 1.1, color: "#f0ede6", marginBottom: 8,
  },
  heroAuthor: { fontSize: 15, color: "#888", marginBottom: 20 },
  tagsRow: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 },
  tag: { padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1 },
  stars: { color: "#c9a96e", fontSize: 18, letterSpacing: 2 },
  content: { padding: "40px 56px" },
  section: { marginBottom: 40 },
  sectionLabel: {
    fontSize: 10, textTransform: "uppercase", letterSpacing: 3, color: "#888",
    fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 8,
  },
  card: {
    background: "#fff", border: "1px solid #e8e2d9", borderRadius: 12,
    padding: "20px 24px",
  },
  cardTitle: { fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "#888", fontWeight: 500, marginBottom: 8 },
  cardHeading: { fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 400, marginBottom: 12 },
  devCard: { background: "#f5f1eb", borderRadius: 8, padding: "14px 16px", marginBottom: 10 },
  prose: { fontSize: 14.5, lineHeight: 1.8, color: "#3a3530", margin: 0 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  themesGrid: { display: "flex", flexWrap: "wrap", gap: 8 },
  themePill: {
    padding: "6px 14px", background: "#f5f1eb", border: "1px solid #e0d8cc",
    borderRadius: 20, fontSize: 12, color: "#6b5c3e",
  },
  awardItem: { display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: "1px solid #f0ede6" },
  list: { paddingLeft: 16, marginTop: 8 },
  listItem: { fontSize: 13.5, color: "#3a3530", marginBottom: 6, lineHeight: 1.6 },
  similarRow: { display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 0" },
  similarNum: {
    width: 24, height: 24, borderRadius: "50%", background: "#f0ede6",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, color: "#888", flexShrink: 0, marginTop: 2,
  },
  ratingRow: { display: "flex", alignItems: "center", gap: 12, marginBottom: 10 },
  ratingLabel: { fontSize: 13, color: "#555", width: 130, flexShrink: 0, textTransform: "capitalize" },
  ratingBg: { flex: 1, height: 6, background: "#e8e2d9", borderRadius: 3, overflow: "hidden" },
  ratingFill: { height: "100%", borderRadius: 3, background: "linear-gradient(90deg,#c9a96e,#e8c98a)", transition: "width 0.4s ease" },
  ratingNum: { fontSize: 12, color: "#888", width: 30, textAlign: "right" },
  seoBox: { background: "#eef6ff", border: "1px solid #d0e4f7", borderRadius: 10, padding: "16px 20px" },
  seoField: { marginBottom: 12 },
  seoKey: { fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "#6a9bbf", fontWeight: 500, marginBottom: 4 },
  seoVal: { fontSize: 13, color: "#1a3a5c", lineHeight: 1.5 },
  seoSlug: { fontFamily: "monospace", fontSize: 12, background: "#ddeef9", padding: "2px 8px", borderRadius: 4, color: "#1a3a5c" },
  table: { width: "100%", borderCollapse: "collapse" },
  tdKey: { fontSize: 13, color: "#888", padding: "8px 0", borderBottom: "1px solid #f0ede6", width: 160, verticalAlign: "top", textTransform: "capitalize" },
  tdVal: { fontSize: 13, color: "#1a1a1a", padding: "8px 0", borderBottom: "1px solid #f0ede6" },
  jsonBlock: { background: "#1a1a1a", borderRadius: 10, padding: 20, position: "relative", overflowX: "auto" },
  pre: { fontFamily: "'SF Mono','Courier New',monospace", fontSize: 11.5, lineHeight: 1.7, color: "#d4c9b0", margin: 0, whiteSpace: "pre" },
  copyBtn: {
    position: "absolute", top: 12, right: 12, background: "#333", border: "none",
    color: "#c9a96e", fontSize: 11, padding: "4px 10px", borderRadius: 6,
    cursor: "pointer", fontFamily: "inherit",
  },
  tabs: { display: "flex", borderBottom: "1px solid #e8e2d9", marginBottom: 28 },
  tabBtn: {
    padding: "10px 18px", background: "none", border: "none",
    borderBottom: "2px solid transparent", fontSize: 13, color: "#888",
    cursor: "pointer", fontFamily: "inherit", marginBottom: -1,
  },
  tabBtnActive: { color: "#1a1a1a", borderBottomColor: "#c9a96e", fontWeight: 500 },
  centered: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", textAlign: "center" },
  spinner: { width: 36, height: 36, border: "3px solid #e8e2d9", borderTop: "3px solid #c9a96e", borderRadius: "50%", animation: "spin 1s linear infinite" },
  errorBox: { background: "#fff5f5", border: "1px solid #fcd0d0", borderRadius: 10, padding: 20, color: "#8b2a2a", fontSize: 14, margin: 40 },
  sidebar: { width: 260, background: "#1a1a1a", color: "#f0ede6", overflowY: "auto", flexShrink: 0 },
  sidebarLogo: { padding: "24px 20px 16px", borderBottom: "1px solid #333" },
  langLabel: { fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "#666", padding: "12px 20px 4px", fontWeight: 500 },
  sidebarBtn: {
    display: "block", width: "100%", textAlign: "left", background: "none",
    border: "none", color: "#b0a99a", fontFamily: "inherit", fontSize: 12.5,
    padding: "7px 20px", cursor: "pointer", lineHeight: 1.4,
  },
  sidebarBtnActive: { background: "#2e2519", color: "#e8d5b0", borderLeft: "3px solid #c9a96e", paddingLeft: 17 },
};
