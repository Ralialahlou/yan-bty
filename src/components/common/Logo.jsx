import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

/**
 * Yan BTY Logo — brand guidelines §4 p.35–46
 *
 * Structure (p.35–36):
 *   Line 1: "yan®"  — rounded geometric lowercase, large
 *   Line 2: "B T Y" — uppercase, widely-spaced, ~25% of line 1 size
 *   Centred alignment excludes the ® mark (p.36)
 *
 * Typeface (p.54 + logo pages):
 *   "yan"  → Comfortaa Light 300 (closest free substitute for the rounded logo mark)
 *   "BTY"  → Outfit ExtraLight 200, wide tracking
 *   Production: replace with licensed logo asset when available
 *
 * Colour rule (p.39):
 *   variant="dark"  → YB Brown #332114  (default, light backgrounds)
 *   variant="light" → White  #ffffff    (dark/brown backgrounds)
 *   variant="red"   → YB Tabla Red #b25745  (accent contexts)
 *   Single colour per usage — never split the wordmark into two colours.
 */
export default function Logo({ variant = 'dark', size = 'md', linkTo = '/' }) {
  return (
    <Link to={linkTo} className={[styles.logo, styles[variant], styles[size]].join(' ')} aria-label="Yan BTY — home">
      <span className={styles.yanWrap}>
        <span className={styles.yan}>yan</span>
        <sup className={styles.reg}>®</sup>
      </span>
      <span className={styles.bty}>B&thinsp;T&thinsp;Y</span>
    </Link>
  );
}
