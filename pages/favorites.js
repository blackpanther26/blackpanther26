import Head from "next/head";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import styles from "../styles/favorites.module.css";

export default function Favorites() {
  const mathResources = [
    {
      title: "3Blue1Brown",
      description: "Beautiful visual explanations of mathematical concepts",
      url: "https://www.3blue1brown.com/",
      type: "YouTube Channel",
    },
    {
      title: "MIT OpenCourseWare",
      description: "Free MIT mathematics courses and materials",
      url: "https://ocw.mit.edu/courses/mathematics/",
      type: "University Course",
    },
    {
      title: "Wolfram MathWorld",
      description: "The web's most extensive mathematics resource",
      url: "https://mathworld.wolfram.com/",
      type: "Reference",
    },
  ];

  const mlResources = [
    {
      title: "Fast.ai",
      description: "Practical deep learning for coders",
      url: "https://www.fast.ai/",
      type: "Online Course",
    },
    {
      title: "Papers With Code",
      description: "Latest machine learning papers with code implementations",
      url: "https://paperswithcode.com/",
      type: "Research Platform",
    },
    {
      title: "Distill",
      description: "Clear explanations of machine learning concepts",
      url: "https://distill.pub/",
      type: "Publication",
    },
    {
      title: "Andrew Ng's ML Course",
      description: "Stanford's machine learning course on Coursera",
      url: "https://www.coursera.org/learn/machine-learning",
      type: "Online Course",
    },
  ];

  const ResourceCard = ({ resource }) => (
    <div
      className={styles.resourceCard}
      onClick={() => window.open(resource.url, "_blank", "noopener,noreferrer")}
    >
      <div className={styles.resourceHeader}>
        <h3 className={styles.resourceTitle}>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              window.open(resource.url, "_blank", "noopener,noreferrer");
            }}
          >
            {resource.title}
          </a>
        </h3>
        <span className={styles.resourceType}>{resource.type}</span>
      </div>
      <p className={utilStyles.lightText}>{resource.description}</p>
    </div>
  );

  return (
    <Layout>
      <Head>
        <title>Favorites - Priyanshu Chahal</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.headingXl}>Favorites</h1>
        <p>
          A curated collection of my favorite resources for learning and
          exploring mathematics and machine learning. These have been invaluable
          in my journey of continuous learning.
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Math Resources</h2>
        <div className={styles.resourcesGrid}>
          {mathResources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>ML Resources</h2>
        <div className={styles.resourcesGrid}>
          {mlResources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
