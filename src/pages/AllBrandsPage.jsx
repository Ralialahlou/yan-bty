import { Link } from 'react-router-dom';
import { brands } from '../data/brands';
import SEO from '../components/common/SEO';
import styles from './AllBrandsPage.module.css';

export default function AllBrandsPage() {
  const partnerBrands = brands.filter(b => !b.isOwn);
  const ownBrands = brands.filter(b => b.isOwn);

  return (
    <div className={styles.page}>
      <SEO title="All Brands — Yan BTY" description="Explore every brand available at Yan BTY." path="/brands" />
      <div className="container">
        <header className={styles.header}>
          <p className={styles.eyebrow}>✦ Our curation</p>
          <h1 className={styles.title}>All Brands</h1>
          <p className={styles.subtitle}>From global icons to Moroccan-born beauty.</p>
        </header>

        {ownBrands.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>Our Own Brands</h2>
            <div className={styles.grid}>
              {ownBrands.map(brand => (
                <BrandChip key={brand.id} brand={brand} />
              ))}
            </div>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Partner Brands</h2>
          <div className={styles.grid}>
            {partnerBrands.map(brand => (
              <BrandChip key={brand.id} brand={brand} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function BrandChip({ brand }) {
  return (
    <Link to={`/brand/${brand.slug}`} className={styles.chip}>
      <div className={styles.chipColor} style={{ background: brand.color }} />
      <div className={styles.chipInfo}>
        <p className={styles.chipName}>{brand.name}</p>
        {brand.tagline && <p className={styles.chipTagline}>{brand.tagline}</p>}
      </div>
    </Link>
  );
}
