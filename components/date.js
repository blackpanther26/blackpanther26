import { parseISO, format } from "date-fns";
import { useTheme } from "../contexts/ThemeContext";
import styles from "./date.module.css";

export default function Date({ dateString }) {
  const { isDark } = useTheme();
  const date = parseISO(dateString);

  return (
    <time
      dateTime={dateString}
      className={`${styles.date} ${isDark ? styles.dark : ""}`}
    >
      {format(date, "LLLL d, yyyy")}
    </time>
  );
}
