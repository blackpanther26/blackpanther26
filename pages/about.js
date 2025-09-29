import Head from "next/head";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";

export default function About() {
  const learningData = [
    {
      symbol: "\\sigma",
      year: "2021",
      description: "Learned statistics and data analysis fundamentals",
    },
    {
      symbol: "\\phi",
      year: "2022",
      description: "Explored the golden ratio and mathematical beauty",
    },
    {
      symbol: "\\tau",
      year: "2023",
      description: "Discovered the elegance of tau over pi in mathematics",
    },
    {
      symbol: "\\lambda",
      year: "2024",
      description: "Mastered functional programming and lambda calculus",
    },
  ];

  return (
    <Layout>
      <Head>
        <title>About - Priyanshu Chahal</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.headingXl}>About Me</h1>
        <p>
          Welcome to my corner of the internet! I'm passionate about
          mathematics, programming, and continuous learning. This space serves
          as my digital notebook where I share insights, discoveries, and
          reflections on my journey through various fields of knowledge.
        </p>
        <p>
          I believe in the power of learning and the beauty found in
          mathematical concepts. Each year brings new discoveries and deeper
          understanding of the world around us.
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Learning</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            marginTop: "1.5rem",
          }}
        >
          {learningData.map((item, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                padding: "1.5rem",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-primary)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  color: "var(--text-accent)",
                }}
              >
                <Latex>{`$${item.symbol}$`}</Latex>
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  margin: "0.5rem 0",
                  color: "var(--text-primary)",
                }}
              >
                {item.year}
              </h3>
              <p
                className={utilStyles.lightText}
                style={{
                  fontSize: "0.9rem",
                  margin: 0,
                  lineHeight: "1.4",
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
