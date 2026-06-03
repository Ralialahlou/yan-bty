import styles from './Badge.module.css';

export default function Badge({ children, variant = 'default', small = false }) {
  return (
    <span className={[styles.badge, styles[variant], small ? styles.small : ''].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
}
