import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import SEO from '../components/common/SEO';
import styles from './OurStoryPage.module.css';

/*
 * Our Story page — brand guidelines §1–2, p.5–24
 * Values, vision, mission, UVP, audience all sourced from the brand document.
 * Visual language: editorial, full-bleed imagery, typographically driven.
 */

const VALUES = [
  { title: 'Unique & Curated',      desc: 'Every brand on our shelves is intentionally chosen — a carefully considered portfolio that balances heritage icons with emerging favourites.' },
  { title: 'Inclusive & Diverse',   desc: 'Beauty belongs to everyone. We celebrate every skin tone, every age, every identity — because individuality is at the heart of what we do.' },
  { title: 'Innovative & Experiential', desc: "We don't just sell products. We offer a journey of discovery — immersive retail, expert guidance, and experiences that inspire." },
  { title: 'International & Modern', desc: "A global mindset with a Moroccan soul. We bring the world's finest brands together under one roof, setting a new standard in beauty retail." },
  { title: 'Aspirational & Sophisticated', desc: 'We position ourselves at the premium end of the market — refined, relevant, and confident without ever being exclusive or intimidating.' },
];

const BRAND_FACTS = [
  { num: '50+',    label: 'Premium Brands' },
  { num: '6',      label: 'Product Categories' },
  { num: '3',      label: 'Stores in Morocco' },
  { num: '2025',   label: 'Founded' },
];

export default function OurStoryPage() {
  return (
    <>
      <SEO
        title="Our Story"
        description="Yan BTY is Morocco's premium multi-brand beauty destination. One beauty — where every beauty lover can discover established icons and future favourites."
        path="/about"
      />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <img
          src="https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=2000&q=90"
          alt="Yan BTY — Be You"
          className={styles.heroImg}
        />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>One Beauty</p>
          <Logo size="xl" variant="light" />
          <p className={styles.heroTagline}>Be Your Beautiful. Be Unique. Be You.</p>
        </div>
      </section>

      {/* ── Brand numbers ── */}
      <section className={styles.numbers}>
        {BRAND_FACTS.map(f => (
          <div key={f.num} className={styles.numberItem}>
            <span className={styles.numberVal}>{f.num}</span>
            <span className={styles.numberLabel}>{f.label}</span>
          </div>
        ))}
      </section>

      {/* ── Origin ── */}
      <section className={styles.origin}>
        <div className="container">
          <div className={styles.originGrid}>
            <div className={styles.originText}>
              <p className={styles.sectionLabel}>Our Name</p>
              <h2 className={styles.originTitle}>Yan BTY means<br />One Beauty.</h2>
              <p className={styles.originBody}>
                One beauty refers to something that is unique and special. It can describe a person, an object, or even an experience that is considered beautiful, remarkable, or one-of-a-kind.
              </p>
              <p className={styles.originBody}>
                Every one of our partners and customers deserves that feeling. They are special and the centre of our attention.
              </p>
            </div>
            <div className={styles.originVisual}>
              <img
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=85"
                alt="Yan BTY beauty"
                className={styles.originImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision + Mission ── */}
      <section className={styles.vmSection}>
        <div className={styles.vmCard}>
          <p className={styles.vmLabel}>Our Vision</p>
          <h3 className={styles.vmTitle}>Why we do what we do</h3>
          <p className={styles.vmBody}>
            To create a disruptive, innovative, and versatile multi-brand beauty destination. By blending cutting-edge technology, immersive retail experiences, and an unwavering passion for beauty, we inspire every customer to embrace and express their unique self.
          </p>
          <p className={styles.vmQuote}>At Yan BTY, individuality isn't just accepted — it is celebrated.</p>
        </div>
        <div className={styles.vmCard}>
          <p className={styles.vmLabel}>Our Mission</p>
          <h3 className={styles.vmTitle}>What we do</h3>
          <p className={styles.vmBody}>
            To deliver an elevated, welcoming, and inspiring multi-brand beauty experience, designed for exploration and connection. By curating the finest international names alongside our own signature collection, we offer a destination where diversity, quality, and creativity meet.
          </p>
          <p className={styles.vmQuote}>"Where every beauty lover can discover established icons and future favourites."</p>
        </div>
      </section>

      {/* ── UVP editorial ── */}
      <section className={styles.uvpSection}>
        <div className={styles.uvpOverlay} />
        <img
          src="https://images.unsplash.com/photo-1614530291012-b6b3d1ca1f07?w=1800&q=85"
          alt="Moroccan beauty"
          className={styles.uvpImg}
        />
        <div className={styles.uvpContent}>
          <p className={styles.uvpLabel}>What makes us different</p>
          <blockquote className={styles.uvpQuote}>
            The only Moroccan premium multi-brand beauty destination that pairs a globally curated portfolio alongside an own brand, offering innovation, inclusivity, and an experiential shopping journey that sets a new standard in beauty retail.
          </blockquote>
        </div>
      </section>

      {/* ── Brand values ── */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.valuesHeader}>
            <p className={styles.sectionLabel}>How we show up</p>
            <h2 className={styles.valuesTitle}>Our Brand Values</h2>
          </div>
          <div className={styles.valuesGrid}>
            {VALUES.map((v, i) => (
              <div key={v.title} className={styles.valueCard}>
                <span className={styles.valueNum}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Yan&One CTA ── */}
      <section className={styles.yanOneCta}>
        <div className={styles.yanOneCtaOverlay} />
        <img
          src="https://images.unsplash.com/photo-1631214500004-f8b36869f28e?w=1200&q=85"
          alt="Yan&One"
          className={styles.yanOneCtaImg}
        />
        <div className={styles.yanOneCtaContent}>
          <p className={styles.sectionLabel}>Our Signature Collection</p>
          <h2 className={styles.yanOneCtaTitle}>Discover Yan&One</h2>
          <p className={styles.yanOneCtaBody}>Our in-house beauty collection — clean, inclusive, and formulated for every skin.</p>
          <Link to="/brand/yan-one">
            <Button variant="accent" size="lg">Explore Yan&One <ArrowRight size={16} /></Button>
          </Link>
        </div>
      </section>
    </>
  );
}
