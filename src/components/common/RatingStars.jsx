import styles from './RatingStars.module.css';

export default function RatingStars({ rating, reviewCount, size = 'sm' }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className={[styles.wrapper, styles[size]].join(' ')}>
      <div className={styles.stars}>
        {Array.from({ length: full }).map((_, i) => (
          <span key={`f${i}`} className={styles.star}>★</span>
        ))}
        {half && <span className={styles.starHalf}>★</span>}
        {Array.from({ length: empty }).map((_, i) => (
          <span key={`e${i}`} className={styles.starEmpty}>★</span>
        ))}
      </div>
      {reviewCount != null && (
        <span className={styles.count}>({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}
