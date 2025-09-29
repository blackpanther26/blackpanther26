import styles from "./footer.module.css";
import { MdEmail } from "react-icons/md";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>© Priyanshu Chahal 2025.</div>

      <div className={styles.contacts}>
        <a
          href="https://github.com/blackpanther26"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactLink}
          aria-label="GitHub"
        >
          <IoLogoGithub />
        </a>
        <a
          href="https://linkedin.com/in/priyanshu-chahal-988005288"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactLink}
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="mailto:priyanshuchahal1@gmail.com"
          className={styles.contactLink}
          aria-label="Email"
        >
          <MdEmail />
        </a>
      </div>
    </footer>
  );
}
