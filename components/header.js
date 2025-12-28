import Link from "next/link";
import styles from "./header.module.css";
import { useTheme } from "../contexts/ThemeContext";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { Snowflake } from "lucide-react";

import "katex/dist/katex.min.css";

const name = "Priyanshu Chahal";

export default function Header({ home }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.profileSection}>
        <Link href="/">
          <div className="logo">
            <Snowflake size={80} />
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
          <Link href="/favorites" className={styles.navLink}>
            Favorites
          </Link>
        </nav>
      </div>

      <div className={styles.themeSection}>
        <button
          onClick={toggleTheme}
          className={styles.themeButton}
          aria-label="Toggle theme"
        >
          {isDark ? <MdSunny color="white" /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
}
