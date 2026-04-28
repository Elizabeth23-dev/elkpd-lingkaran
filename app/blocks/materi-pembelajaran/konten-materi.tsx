import classnames from "classnames";
import { kontenMateri, daftarMateri } from "~/data/materi";
import { LatexFormula } from "~/components/latex-formula/latex-formula";
import styles from "./konten-materi.module.css";

export interface KontenMateriProps {
  className?: string;
  topicId: string;
}

/** Regex to match poin like: "a. [Label] text" or "a. text" */
const POIN_REGEX = /^([a-e])\. (\[.+?\])?(.*)$/;

function renderSoalLines(soal: string) {
  const lines = soal.split('\n');
  const intro: string[] = [];
  const poin: { letter: string; label: string; body: string }[] = [];

  for (const line of lines) {
    const m = line.match(POIN_REGEX);
    if (m) {
      poin.push({ letter: m[1], label: m[2]?.replace(/^\[|\]$/g, '') ?? '', body: m[3].trim() });
    } else {
      if (poin.length === 0) intro.push(line);
    }
  }

  return { intro, poin };
}

export function KontenMateri({ className, topicId }: KontenMateriProps) {
  const konten = kontenMateri[topicId] ?? kontenMateri['definisi-unsur'];
  const materi = daftarMateri.find((m) => m.id === topicId) ?? daftarMateri[0];

  return (
    <div className={classnames(styles.root, className)}>
      <div className={styles.container}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📚 Materi Pembelajaran</h2>
          {konten.subMateri && konten.subMateri.length > 0 ? (
            <div className={styles.subMateriList}>
              {konten.subMateri.map((sub, i) => (
                <div key={i} className={styles.subMateriItem}>
                  <h3 className={styles.subMateriJudul}>{sub.judul}</h3>
                  <div className={styles.teoriText}>
                    {sub.isi.split('\n').map((line, j) => {
                      const latexMatch = line.match(/^\$\$(.+)\$\$/);
                      if (latexMatch) {
                        return (
                          <div key={j} className={styles.inlineLatex}>
                            <LatexFormula formula={latexMatch[1]} display={true} />
                          </div>
                        );
                      }
                      return <p key={j} className={styles.teoriParagraph}>{line}</p>;
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.teoriText}>
              {konten.teori.split('\n').map((line, i) => (
                <p key={i} className={styles.teoriParagraph}>{line}</p>
              ))}
            </div>
          )}
        </section>

        {konten.rumus.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>📌 Rumus-rumus Penting</h2>
            <div className={styles.rumusGrid}>
              {konten.rumus.map((r, i) => (
                <div key={i} className={styles.rumusCard}>
                  <div className={styles.rumusLabel}>{r.label}</div>
                  <div className={styles.rumusFormula}>
                    {r.latex ? (
                      <LatexFormula formula={r.formula} display={true} />
                    ) : (
                      r.formula
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📝 Contoh Soal</h2>
          {konten.contoh.map((contoh, i) => (
            <div key={i} className={styles.contohCard}>
              <div className={styles.contohHeader}>
                <span className={styles.contohNum}>Contoh {i + 1}</span>
              </div>
              <div className={styles.contohSoal}>
                {(() => {
                  const { intro, poin } = renderSoalLines(contoh.soal);
                  return (
                    <>
                      {intro.filter(l => l.trim()).map((line, k) => (
                        <p key={k} className={styles.soalIntro}>{line}</p>
                      ))}
                      {poin.length > 0 && (
                        <div className={styles.poinList}>
                          {poin.map((p, k) => (
                            <div key={k} className={styles.poinItem}>
                              <div className={styles.poinLetter}>{p.letter}.</div>
                              <div className={styles.poinKonten}>
                                {p.body && <span className={styles.poinBody}>{p.body}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
              <div className={styles.contohSolusiTitle}>Penyelesaian:</div>
              <ol className={styles.solusiList}>
                {contoh.solusi.map((step, j) => (
                  <li key={j} className={styles.solusiStep}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🎯 Topik dalam Materi Ini</h2>
          <div className={styles.topikList}>
            {materi.topik.map((t, i) => (
              <div key={i} className={styles.topikItem}>
                <div className={styles.topikNum}>{i + 1}</div>
                <span className={styles.topikLabel}>{t}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
