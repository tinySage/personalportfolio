import Script from "next/script";
import { me, card, typed, intro, about, jobs, curve, thesis, papers, projects, writing, education } from "./data";

// Deterministic jitter so server and browser render the same letters
const rnd = (i: number, s: number) => {
  const v = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

// Distressed gothic wordmark: each letter slightly rotated, lifted and resized
function Mark({ text, seed = 1, className = "" }: { text: string; seed?: number; className?: string }) {
  return (
    <span className={`mark ${className}`} aria-label={text} role="img">
      {[...text].map((c, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            transform: `rotate(${((rnd(i, seed) - 0.5) * 14).toFixed(1)}deg) translateY(${((rnd(i, seed + 3) - 0.5) * 0.14).toFixed(2)}em) scale(${(0.86 + rnd(i, seed + 7) * 0.3).toFixed(2)})`,
          }}
        >
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}

function Head({ id, word }: { id: string; word: string }) {
  return (
    <h2 className="shead" id={`${id}-h`}>
      <span className="slash">/</span> <Mark text={word} seed={word.length} />
    </h2>
  );
}

// Faint ECG trace used as a watermark on the card
function ecgPath(w: number, h: number) {
  const mid = h / 2;
  let d = `M0 ${mid}`;
  for (let x = 0; x < w; x += 120) {
    d += ` L${x + 40} ${mid} L${x + 46} ${mid - 6} L${x + 52} ${mid} L${x + 60} ${mid} L${x + 64} ${mid + 8} L${x + 70} ${mid - 46} L${x + 76} ${mid + 18} L${x + 82} ${mid} L${x + 96} ${mid} L${x + 104} ${mid - 12} L${x + 112} ${mid} L${x + 120} ${mid}`;
  }
  return d;
}

function Chart() {
  const W = 440, H = 240, L = 54, R = 20, T = 26, B = 46;
  const lx = (v: number) => L + (Math.log10(v) / 2) * (W - L - R);
  const ly = (v: number) => T + (1 - (v - 0.89) / 0.015) * (H - T - B);
  const pts = curve.map((d) => [lx(d.x), ly(d.auc)] as const);
  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="chart-t">
        <title id="chart-t">Test macro-AUC stays at 0.90 up to 23 times compression, then drops to 0.897 at 89 times.</title>
        <rect x={lx(1)} y={T} width={lx(22.9) - lx(1)} height={H - T - B} className="c-safe" />
        {[0.89, 0.895, 0.9, 0.905].map((v) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={ly(v)} y2={ly(v)} className="c-grid" />
            <text x={L - 8} y={ly(v) + 4} textAnchor="end" className="c-tick">{v.toFixed(3)}</text>
          </g>
        ))}
        {[1, 10, 100].map((v) => (
          <text key={v} x={lx(v)} y={H - B + 18} textAnchor="middle" className="c-tick">{v}×</text>
        ))}
        <text x={(L + W - R) / 2} y={H - 8} textAnchor="middle" className="c-axis">update compression, log scale</text>
        <polyline points={pts.map((p) => p.join(",")).join(" ")} className="c-line" />
        {pts.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={i === 1 ? 6 : 4.5} className={i === 1 ? "c-pt c-op" : "c-pt"} />
            <text x={x} y={y - 13} textAnchor={i === 0 ? "start" : i === 2 ? "end" : "middle"} className="c-val">{curve[i].auc.toFixed(4)}</text>
          </g>
        ))}
        <text x={lx(22.9) - 10} y={ly(0.8935)} textAnchor="end" className="c-note">chosen point · 23×</text>
      </svg>
      <figcaption>Accuracy holds flat until 23× compression, then falls. Means of three seeds on the PTB-XL test set.</figcaption>
    </figure>
  );
}

export default function Home() {
  const links = [
    ["github", me.github],
    ["linkedin", me.linkedin],
    ["substack", me.substack],
    ["cv", me.cv],
  ].filter(([, h]) => h);

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <filter id="rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="2.6" />
        </filter>
      </svg>

      <a href="#about" className="skip">Skip to content</a>

      <header className="top">
        <a href="#top" className="logo"><Mark text="mm" seed={9} /></a>
        <nav aria-label="Sections">
          <a href="#about">/about</a>
          <a href="#experience">/experience</a>
          <a href="#research">/research</a>
          <a href="#projects">/projects</a>
          <a href="#writing">/writing</a>
        </nav>
        <a href="#contact" className="sayhi">say hi ✶</a>
      </header>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-text">
          <p className="kicker">{me.place} · M.Tech CSE · open to PhD positions</p>
          <h1>
            hi, i&apos;m <Mark text={me.nick} seed={4} className="h1mark" />
            <span className="sr"> ({me.first} {me.last})</span>.
          </h1>
          <p className="typed" aria-live="off">
            <span className="sr">{typed.join(" ")}</span>
            <span className="typed-out" aria-hidden data-lines={JSON.stringify(typed)}>{typed[0]}</span>
            <span className="caret" aria-hidden />
          </p>
          <p className="intro">{intro}</p>
          <div className="ctas">
            <a href="#research" className="btn btn-ink">see my research</a>
            <a href="#contact" className="btn">say hi</a>
          </div>
        </div>

        <div className="hero-card">
          <div className="strap" aria-hidden><span className="clip" /></div>
          <div className="idcard" id="idcard">
            <button className="flip" aria-label="Flip the ID card" aria-pressed="false" id="flip">flip ↻</button>
            <div className="idcard-inner">
              {/* FRONT */}
              <div className="face front">
                <span className="dots" aria-hidden />
                <svg className="ecg" viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden>
                  <path d={ecgPath(600, 120)} />
                </svg>
                <div className="idrow">
                  <p className="idno">ID: {card.id}<br />No: {card.no}</p>
                  <div className="idtitle">
                    <Mark text="momo" seed={2} className="cardmark" />
                    <span className="idline">ID<i />CARD</span>
                  </div>
                </div>
                <div className="idbody">
                  <div className="photo">
                    <canvas id="ascii" data-src={me.photo} aria-label={`ASCII portrait of ${me.first}. Move the cursor over it to scatter the characters.`} role="img" />
                  </div>
                  <dl className="fields">
                    {card.fields.map(([k, v, s]) => (
                      <div key={k}>
                        <dt>{k}:</dt>
                        <dd>{v}{s && <small>{s}</small>}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <p className="disclaimer">{card.disclaimer}</p>
                <div className="idfoot">
                  <span className="sig">Momo</span>
                  <span className="issued">{card.issued}</span>
                </div>
              </div>
              {/* BACK */}
              <div className="face back" aria-hidden>
                <span className="dots" />
                <canvas id="thorns" />
                <Mark text="portfolio" seed={5} className="backmark" />
                <div className="barcode">
                  <span className="bars" />
                  <span>{card.id.replace("#", "")} · 2026</span>
                </div>
                <p className="return">{card.returnTo}</p>
              </div>
            </div>
          </div>
          <p className="card-hint">tap the card to flip it · hover the portrait</p>
        </div>
      </section>

      <main className="sheet">
        {/* ABOUT */}
        <section id="about" aria-labelledby="about-h">
          <Head id="about" word="about me" />
          <div className="about">
            <div className="about-text">
              {about.paras.map((p) => <p key={p.slice(0, 16)}>{p}</p>)}
              <p className="stack-h">Tools I reach for most:</p>
              <ul className="stack">{about.stack.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
            <div className="stamps" aria-label="Milestones">
              {about.stamps.map((s, i) => (
                <div key={s.mid} className={`stamp ${s.tone}`} style={{ transform: `rotate(${[-8, 6, -3][i]}deg)` }}>
                  <span>{s.top}</span><strong>{s.mid}</strong><span>{s.bot}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="perf" />

        {/* EXPERIENCE */}
        <section id="experience" aria-labelledby="experience-h">
          <Head id="experience" word="experience" />
          <div className="jobs">
            <div className="tabs" role="tablist" aria-label="Places I've worked" aria-orientation="vertical">
              {jobs.map((j, i) => (
                <button key={j.org} role="tab" id={`tab-${i}`} aria-controls={`job-${i}`} aria-selected={i === 0} tabIndex={i === 0 ? 0 : -1}>
                  {j.org}
                </button>
              ))}
            </div>
            {jobs.map((j, i) => (
              <div key={j.org} className="job" role="tabpanel" id={`job-${i}`} aria-labelledby={`tab-${i}`} hidden={i !== 0}>
                <h3>{j.title} <span>@ {j.org}</span></h3>
                <p className="job-when">{j.when} · {j.where}</p>
                <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <hr className="perf" />

        {/* RESEARCH */}
        <section id="research" aria-labelledby="research-h">
          <Head id="research" word="research" />
          <article className="thesis">
            <div className="thesis-text">
              <p className="tag">M.Tech thesis · featured</p>
              <h3>{thesis.title}</h3>
              <p className="thesis-sub">{thesis.sub}</p>
              <p>{thesis.body}</p>
              <dl className="tfields">
                {thesis.fields.map(([k, v]) => <div key={k}><dt>{k}:</dt><dd>{v}</dd></div>)}
              </dl>
            </div>
            <Chart />
          </article>
          <ul className="papers">
            {papers.map((p) => (
              <li key={p.title}>
                <span className="p-title">{p.title}</span>
                <span className="p-venue">{p.venue}</span>
                <span className="p-state">{p.state}</span>
              </li>
            ))}
          </ul>
        </section>

        <hr className="perf" />

        {/* PROJECTS */}
        <section id="projects" aria-labelledby="projects-h">
          <Head id="projects" word="projects" />
          <ul className="pgrid">
            {projects.map((p) => (
              <li key={p.title} className="pcard">
                <span className="dots" aria-hidden />
                <p className="pno">No: {p.no}/{String(projects.length).padStart(2, "0")} <span>{p.kind}</span></p>
                <h3>{p.title}</h3>
                <p className="pdesc">{p.desc}</p>
                <dl className="pfields">
                  <div><dt>stack:</dt><dd>{p.stack}</dd></div>
                  <div><dt>status:</dt><dd>{p.status}</dd></div>
                </dl>
                {p.link && <a className="plink" href={p.link} target="_blank" rel="noreferrer">{p.linkLabel} ↗</a>}
              </li>
            ))}
          </ul>
        </section>

        <hr className="perf" />

        {/* WRITING */}
        <section id="writing" aria-labelledby="writing-h">
          <Head id="writing" word="writing" />
          <div className="writing">
            <div>
              <p className="pub"><Mark text={writing.name} seed={11} /></p>
              <p className="pub-blurb">{writing.blurb}</p>
              <a className="btn btn-ink" href={writing.url} target="_blank" rel="noreferrer">read on substack ↗</a>
            </div>
            <ol className="posts">
              {writing.posts.map((w) => (
                <li key={w.title}>
                  <a href={w.url} target="_blank" rel="noreferrer"><span>{w.title}</span><small>{w.kind}</small></a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <hr className="perf" />

        {/* EDUCATION */}
        <section id="education" aria-labelledby="education-h">
          <Head id="education" word="education" />
          <ul className="edu">
            {education.map((e) => (
              <li key={e.what}><span className="edu-when">{e.when}</span><div><h3>{e.what}</h3><p>{e.where}</p></div></li>
            ))}
          </ul>
        </section>

        <hr className="perf" />

        {/* CONTACT */}
        <section id="contact" className="contact" aria-labelledby="contact-h">
          <Head id="contact" word="say hi" />
          <p className="contact-lead">I&apos;m looking for PhD positions and research internships in federated or on-device learning. I also answer emails about essays and robots.</p>
          <div className="mailrow">
            <a className="mail" href={`mailto:${me.email}`}>{me.email}</a>
            <button className="btn copy" data-copy={me.email}>copy</button>
          </div>
          <ul className="links">{links.map(([l, h]) => <li key={l}><a href={h} target="_blank" rel="noreferrer">{l} ↗</a></li>)}</ul>
        </section>
      </main>

      <footer className="credits">
        <p>Designed and built by {me.first} {me.last}, 2026.</p>
        <p>Inspired by a pink ID card and Gazi Jarin&apos;s website. The card is drawn at ISO/IEC 7810 ID-1 proportions, 85.60 × 53.98 mm.</p>
      </footer>

      <Script src="/site.js" strategy="afterInteractive" />
    </>
  );
}
