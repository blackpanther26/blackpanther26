import Link from "next/link";
import styles from "./header.module.css";
import utilStyles from "../styles/utils.module.css";
import { useTheme } from "../contexts/ThemeContext";
import { GoMoon, GoSun } from "react-icons/go";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";

const name = "Priyanshu Chahal";

export default function Header({ home }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.profileSection}>
        <Link href="/">
          <div className="logo">
            <Latex>{"$\\mathbb{PC}$"}</Latex>
          </div>
        </Link>
      </div>

      <div className={styles.centerSection}>
        <div className={styles.nameSection}>
          <Link href="/" className={styles.nameLink}>
            {name}
          </Link>
        </div>

        <nav className={styles.navigation}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <span className={styles.separator}>|</span>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
          <span className={styles.separator}>|</span>
          <Link href="/blogs" className={styles.navLink}>
            Blogs
          </Link>
        </nav>
      </div>

      <div className={styles.themeSection}>
        <button
          onClick={toggleTheme}
          className={styles.themeButton}
          aria-label="Toggle theme"
        >
          {isDark ? <GoSun color="white" /> : <GoMoon />}
        </button>
      </div>
    </header>
  );
}
