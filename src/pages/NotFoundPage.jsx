import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.body}>This page doesn't exist yet — check back soon.</p>
      <Link to="/" className={styles.btn}>Back to home</Link>
    </div>
  );
}
