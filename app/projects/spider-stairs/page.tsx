import type { Metadata } from "next";
import { me, spider as s } from "../../data";
import { Mark, Rough } from "../../ui";

export const metadata: Metadata = {
  title: "Spider Stairs · Muktanan Mohapatra",
  description: "An eight-legged robot teaches itself to climb stairs with reinforcement learning, and finds two ways to cheat first.",
};

export default function SpiderStairs() {
  return (
    <>
      <Rough />
      <header className="top">
        <a href="/" className="logo"><Mark text="mm" seed={9} /></a>
        <nav aria-label="Site">
          <a href="/#projects">/projects</a>
          <a href="/#research">/research</a>
          <a href="/#writing">/writing</a>
        </nav>
        <a href="/#contact" className="sayhi">say hi ✶</a>
      </header>

      <main className="sheet pp">
        <section aria-labelledby="pp-h">
          <a className="pp-back" href="/#projects">← all projects</a>
          <p className="tag">project file · reinforcement learning · November 2026</p>
          <h1 className="pp-title" id="pp-h"><Mark text={s.title} seed={4} /></h1>
          <p className="pp-q">{s.question}</p>
          <p className="pp-lede">{s.lede}</p>
          <dl className="tfields pp-fields">
            {s.fields.map(([k, v]) => <div key={k}><dt>{k}:</dt><dd>{v}</dd></div>)}
          </dl>
          <div className="ctas">
            <a className="btn btn-ink" href={s.site} target="_blank" rel="noreferrer">live write-up ↗</a>
            <a className="btn" href={s.repo} target="_blank" rel="noreferrer">source on github ↗</a>
            <a className="btn" href="#pp-limits">what it does not show</a>
          </div>
        </section>

        <hr className="perf" />

        <section aria-labelledby="pp-how">
          <h2 className="pp-h2" id="pp-how">How it was built</h2>
          <ol className="pp-phases">
            {s.phases.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
          </ol>
        </section>

        <hr className="perf" />

        <section aria-labelledby="pp-cheat">
          <h2 className="pp-h2" id="pp-cheat">Two ways it cheated</h2>
          <ol className="pp-phases pp-cheats">
            {s.cheats.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
          </ol>
        </section>

        <hr className="perf" />

        <section aria-labelledby="pp-res">
          <h2 className="pp-h2" id="pp-res">What came out</h2>
          {s.figures.map((f) => (
            <figure className="pp-fig" key={f.src}>
              <div className="pp-plate"><img src={f.src} width={f.w} height={f.h} alt={f.alt} loading="lazy" /></div>
              <figcaption><strong>{f.head}</strong>{f.body}</figcaption>
            </figure>
          ))}

          <h3 className="pp-h3">Every staircase, one attempt, exploration noise off</h3>
          <div className="pp-tablewrap">
            <table className="pp-table">
              <thead><tr>{s.table.cols.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
              <tbody>
                {s.table.rows.map((r) => (
                  <tr key={r[0] + r[1]}><th scope="row">{r[0]}</th>{r.slice(1).map((c, i) => <td key={i}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr className="perf" />

        <section id="pp-limits" aria-labelledby="pp-lim">
          <h2 className="pp-h2" id="pp-lim">What it does not show</h2>
          <ul className="pp-caveats">{s.caveats.map((c) => <li key={c.slice(0, 24)}>{c}</li>)}</ul>
        </section>
      </main>

      <footer className="credits">
        <p>Designed and built by {me.first} {me.last}, 2026.</p>
        <p><a href="/">← back to the front page</a></p>
      </footer>
    </>
  );
}
