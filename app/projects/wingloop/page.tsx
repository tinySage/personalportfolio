import type { Metadata } from "next";
import { me, wingloop as w } from "../../data";
import { Mark, Rough } from "../../ui";

export const metadata: Metadata = {
  title: "WingLoop · Muktanan Mohapatra",
  description: "A CFD loop for an F1 front wing in ground effect that audits its own results, and a measurement of how well that audit works.",
};

export default function WingLoop() {
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
          <p className="tag">project file · computational aerodynamics · November 2026</p>
          <h1 className="pp-title" id="pp-h"><Mark text={w.title} seed={6} /></h1>
          <p className="pp-q">{w.question}</p>
          <p className="pp-lede">{w.lede}</p>
          <dl className="tfields pp-fields">
            {w.fields.map(([k, v]) => <div key={k}><dt>{k}:</dt><dd>{v}</dd></div>)}
          </dl>
          <div className="ctas">
            <a className="btn btn-ink" href={w.repo} target="_blank" rel="noreferrer">source on github ↗</a>
            <a className="btn" href="#pp-limits">what it does not show</a>
          </div>
        </section>

        <hr className="perf" />

        <section aria-labelledby="pp-how">
          <h2 className="pp-h2" id="pp-how">How it was built</h2>
          <ol className="pp-phases">
            {w.phases.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
          </ol>
        </section>

        <hr className="perf" />

        <section aria-labelledby="pp-res">
          <h2 className="pp-h2" id="pp-res">What came out</h2>
          {w.figures.map((f) => (
            <figure className="pp-fig" key={f.src}>
              <div className="pp-plate"><img src={f.src} width={f.w} height={f.h} alt={f.alt} loading="lazy" /></div>
              <figcaption><strong>{f.head}</strong>{f.body}</figcaption>
            </figure>
          ))}

          <h3 className="pp-h3">How often each auditor rejected a corrupted run</h3>
          <div className="pp-tablewrap">
            <table className="pp-table">
              <thead><tr>{w.table.cols.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
              <tbody>
                {w.table.rows.map((r) => (
                  <tr key={r[0]}><th scope="row">{r[0]}</th>{r.slice(1).map((c, i) => <td key={i}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr className="perf" />

        <section id="pp-limits" aria-labelledby="pp-lim">
          <h2 className="pp-h2" id="pp-lim">What it does not show</h2>
          <ul className="pp-caveats">{w.caveats.map((c) => <li key={c.slice(0, 24)}>{c}</li>)}</ul>
          <p className="pp-refs">{w.refs}</p>
        </section>
      </main>

      <footer className="credits">
        <p>Designed and built by {me.first} {me.last}, 2026.</p>
        <p><a href="/">← back to the front page</a></p>
      </footer>
    </>
  );
}
