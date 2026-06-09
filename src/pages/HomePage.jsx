import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { ArrowRight, Star, ChevronDown } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import Button from '../components/common/Button';
import { products, getBestsellers, getNewArrivals, getEditorsPicks } from '../data/products';
import { brands } from '../data/brands';
import { editorialArticles } from '../data/editorial';
import { categories } from '../data/categories';
import styles from './HomePage.module.css';

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add(styles.visible); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* Floating sparkle stars — pure CSS, zero JS randomness */
function Sparkles({ count = 12, className = '' }) {
  const stars = Array.from({ length: count }, (_, i) => i);
  return (
    <div className={[styles.sparkles, className].join(' ')} aria-hidden="true">
      {stars.map(i => (
        <span key={i} className={styles.sparkle} style={{
          left: `${(i * 37 + 11) % 97}%`,
          top:  `${(i * 53 + 7)  % 90}%`,
          animationDelay: `${(i * 0.7) % 5}s`,
          animationDuration: `${3 + (i * 0.4) % 3}s`,
          width:  `${4 + (i * 3) % 8}px`,
          height: `${4 + (i * 3) % 8}px`,
        }} />
      ))}
    </div>
  );
}

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=2000&q=90',
  'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=2000&q=90',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=2000&q=90',
];

export default function HomePage() {
  useReveal();

  const bestsellers  = getBestsellers().slice(0, 4);
  const newArrivals  = getNewArrivals().slice(0, 4);
  const editorsPicks = getEditorsPicks().slice(0, 3);
  const yanOneProducts = products.filter(p => p.brand === 'yan-one');
  const featuredBrands = brands.filter(b => !b.isOwn).slice(0, 8);

  return (
    <main className={styles.main}>
      <SEO
        title="Be You"
        description="Morocco's premium multi-brand beauty destination. Shop makeup, skincare, fragrance, hair care, and Yan&One — our signature collection."
        path="/"
      />

      {/* ═══ HERO ═══ */}
      <section className={styles.hero}>
        <div className={styles.heroSlides} aria-hidden="true">
          {HERO_IMAGES.map((src, i) => (
            <div key={i} className={styles.heroSlide}
              style={{ backgroundImage: `url(${src})`, animationDelay: `${i * -8}s` }} />
          ))}
        </div>
        <div className={styles.heroOverlay} />
        <Sparkles count={18} className={styles.heroSparkles} />

        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>New Season · Autumn 2025</p>
          <h1 className={styles.heroHeadline}>
            <span className={styles.heroLine}>Be Your</span>
            <span className={[styles.heroLine, styles.heroLineGold].join(' ')}>Beautiful.</span>
            <span className={styles.heroLine}>Be Unique.</span>
          </h1>
          <p className={styles.heroSub}>
            Morocco's premium multi-brand beauty destination. Discover established icons and future favourites.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/shop" className={styles.heroGoldBtn}>Shop Now <ArrowRight size={15} /></Link>
            <Link to="/brand/yan-one" className={styles.heroGhostBtn}>Explore Yan&amp;One <ArrowRight size={15} /></Link>
          </div>
          <div className={styles.heroDecor1} aria-hidden="true">BE YOU</div>
          <div className={styles.heroDecor2} aria-hidden="true">YAN BTY</div>
        </div>

        <a href="#categories" className={styles.scrollCue} aria-label="Scroll down">
          <ChevronDown size={20} className={styles.scrollChevron} />
        </a>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className={styles.marqueeStrip}>
        <div className={styles.marqueeTrack} aria-hidden="true">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className={styles.marqueeGroup}>
              <span>✦ BE YOUR BEAUTIFUL</span>
              <span className={styles.marqueeDot}>·</span>
              <span>BE UNIQUE</span>
              <span className={styles.marqueeDot}>·</span>
              <span>✦ BE YOU</span>
              <span className={styles.marqueeDot}>·</span>
              <span>YAN BTY</span>
              <span className={styles.marqueeDot}>·</span>
              <span>✦ MOROCCO'S BEAUTY DESTINATION</span>
              <span className={styles.marqueeDot}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ CATEGORIES ═══ */}
      <section id="categories" className={styles.catSection}>
        <div className="container">
          <div className={styles.catGrid}>
            {categories.slice(0, 6).map((cat, i) => (
              <Link key={cat.id} to={`/shop/${cat.slug}`} className={styles.catCard}
                data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                <div className={styles.catImgWrap}>
                  <img src={cat.image} alt="" role="presentation" className={styles.catImg} loading="lazy" />
                  <div className={styles.catImgOverlay} />
                  <span className={styles.catLabel}>{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ YAN & ONE — deep plum ═══ */}
      <section className={styles.yanOneSection}>
        <Sparkles count={14} />
        <div className={styles.yanOneTextCol} data-reveal>
          <p className={styles.yanOneEyebrow}>✦ Our Signature Collection</p>
          <h2 className={styles.yanOneHeadline}>
            Yan<span className={styles.yanOneAmpersand}>&</span>One
          </h2>
          <p className={styles.yanOneBody}>
            Crafted in Morocco with a global perspective. Every formula is clean, inclusive, and beautifully effective — designed for every skin, inspired by every journey.
          </p>
          <div className={styles.yanOnePills}>
            {['Clean Beauty', 'Cruelty-Free', 'Inclusive Shades', 'Dermatologist Tested'].map(f => (
              <span key={f} className={styles.yanOnePill}>{f}</span>
            ))}
          </div>
          <Link to="/brand/yan-one" className={styles.yanOneGoldBtn}>Shop Yan&amp;One <ArrowRight size={16} /></Link>
        </div>
        <div className={styles.yanOneScrollWrap}>
          <div className={styles.yanOneTrack}>
            {yanOneProducts.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className={styles.yanOnePCard}>
                <div className={styles.yanOnePImg}>
                  <img src={p.image} alt={p.name} loading="lazy" />
                  {p.isNew && <span className={styles.yanOnePBadge}>New</span>}
                </div>
                <div className={styles.yanOnePInfo}>
                  <p className={styles.yanOnePName}>{p.name}</p>
                  <p className={styles.yanOnePDesc}>{p.shortDescription}</p>
                  <p className={styles.yanOnePPrice}>{p.price.toLocaleString()} MAD</p>
                </div>
              </Link>
            ))}
            <Link to="/brand/yan-one" className={styles.yanOneSeeAll}>
              <div>
                <span className={styles.yanOneSeeAllLabel}>See full</span>
                <span className={styles.yanOneSeeAllTitle}>Yan&amp;One</span>
                <ArrowRight size={20} color="white" />
              </div>
            </Link>
          </div>
          <div className={styles.yanOneScrollHint}>
            <span>Scroll to explore</span>
            <ArrowRight size={12} />
          </div>
        </div>
      </section>

      {/* ═══ BESTSELLERS ═══ */}
      <section className={styles.productSection}>
        <div className="container">
          <header className={styles.secHeader} data-reveal>
            <div>
              <p className={styles.secLabel}>✦ Most Loved</p>
              <h2 className={styles.secTitle}>Bestsellers</h2>
            </div>
            <Link to="/shop?filter=bestsellers" className={styles.secLink}>View All <ArrowRight size={14} /></Link>
          </header>
          <div className={styles.prodGrid} data-reveal>
            {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ═══ EDITORIAL SPLIT ═══ */}
      <section className={styles.editorialSplit}>
        <div className={styles.editorialImg} data-reveal>
          <img src="https://images.unsplash.com/photo-1614530291012-b6b3d1ca1f07?w=1200&q=85"
            alt="The Art of Moroccan Beauty" loading="lazy" />
          <div className={styles.editorialImgOverlay} />
        </div>
        <div className={styles.editorialText} data-reveal>
          <p className={styles.secLabel}>✦ Beauty Journal</p>
          <h2 className={styles.editorialHeadline}>
            Beauty begins the moment you decide to be yourself.
          </h2>
          <p className={styles.editorialBody}>
            At Yan BTY, we believe beauty is personal, open, and endlessly adaptable. It's about exploration, experimentation, and finding what feels right for you — without compromise.
          </p>
          <Link to="/journal" className={styles.editorialLink}>
            Explore the Journal <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ═══ NEW ARRIVALS ═══ */}
      <section className={styles.newSection}>
        <div className="container">
          <header className={styles.secHeader} data-reveal>
            <div>
              <p className={styles.secLabel}>✦ Just In</p>
              <h2 className={styles.secTitle}>New Arrivals</h2>
            </div>
            <Link to="/shop?filter=new" className={styles.secLink}>View All <ArrowRight size={14} /></Link>
          </header>
          <div className={styles.prodGrid4} data-reveal>
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ═══ EDITOR'S PICKS — midnight ═══ */}
      <section className={styles.editorSection}>
        <Sparkles count={10} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <header className={styles.secHeaderCenter} data-reveal>
            <p className={styles.secLabelGold}>✦ Yan BTY Editors</p>
            <h2 className={styles.secTitleLight}>Editor's Picks</h2>
          </header>
          <div className={styles.editorGrid} data-reveal>
            {editorsPicks.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className={styles.editorCta} data-reveal>
            <Link to="/shop?filter=editors" className={styles.goldOutlineBtn}>View All Picks <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* ═══ BRANDS ═══ */}
      <section className={styles.brandsSection}>
        <div className="container">
          <header className={styles.secHeader} data-reveal>
            <div>
              <p className={styles.secLabel}>✦ Curated Selection</p>
              <h2 className={styles.secTitle}>Our Brands</h2>
            </div>
            <Link to="/brands" className={styles.secLink}>All Brands <ArrowRight size={14} /></Link>
          </header>
          <div className={styles.brandsTrack} data-reveal>
            {featuredBrands.map(b => (
              <Link key={b.id} to={`/brand/${b.slug}`} className={styles.brandChip}>
                <div className={styles.brandChipLogo} style={{ '--bc': b.color }}>{b.name[0]}</div>
                <span className={styles.brandChipName}>{b.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BEAUTY JOURNAL ═══ */}
      <section className={styles.journalSection}>
        <div className="container">
          <header className={styles.secHeader} data-reveal>
            <div>
              <p className={styles.secLabel}>✦ Expert Advice</p>
              <h2 className={styles.secTitle}>Beauty Journal</h2>
            </div>
            <Link to="/journal" className={styles.secLink}>All Articles <ArrowRight size={14} /></Link>
          </header>
          <div className={styles.journalGrid} data-reveal>
            {editorialArticles.slice(0, 3).map((a, i) => (
              <Link key={a.id} to={`/journal/${a.slug}`}
                className={[styles.journalCard, i === 0 ? styles.journalCardFeat : ''].join(' ')}>
                <div className={styles.journalImg}>
                  <img src={a.image} alt={a.title} loading="lazy" />
                  <div className={styles.journalImgOverlay} />
                  <span className={styles.journalCatTag}>{a.category}</span>
                </div>
                <div className={styles.journalInfo}>
                  <h3 className={styles.journalTitle}>{a.title}</h3>
                  {i === 0 && <p className={styles.journalExcerpt}>{a.excerpt}</p>}
                  <span className={styles.journalMeta}>{a.readTime} · {a.author}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BEAUTY PROFILE ═══ */}
      <section className={styles.profileSection}>
        <div className={styles.profileVisual}>
          <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=85"
            alt="Your beauty profile" loading="lazy" />
        </div>
        <div className={styles.profileText} data-reveal>
          <p className={styles.secLabelRose}>✦ Personalised For You</p>
          <h2 className={styles.profileHeadline}>Find Your Perfect Match</h2>
          <p className={styles.profileBody}>
            Tell us your skin type, concerns, and preferences — we'll surface products that are truly "Good For You" and build your ideal routine.
          </p>
          <Link to="/account/beauty-profile" className={styles.roseBtn}>Take the Beauty Quiz <ArrowRight size={14} /></Link>
        </div>
      </section>

      {/* ═══ LOYALTY — midnight stars ═══ */}
      <section className={styles.loyaltySection}>
        <div className={styles.loyaltyBg} aria-hidden="true" />
        <Sparkles count={20} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.loyaltyContent} data-reveal>
            <p className={styles.loyaltyEyebrow}>✦ Rewards &amp; Perks</p>
            <h2 className={styles.loyaltyHeadline}>Join kenzup Loyalty</h2>
            <p className={styles.loyaltyBody}>
              Earn points with every purchase and review. Redeem for exclusive rewards and early access to new launches.
            </p>
            <div className={styles.loyaltyPerks}>
              {[['1 MAD', '= 1 Point'], ['Reviews', '+50 Points'], ['Birthday', '+100 Points'], ['Referrals', '+200 Points']].map(([top, bottom]) => (
                <div key={top} className={styles.loyaltyPerk}>
                  <span className={styles.loyaltyPerkTop}>{top}</span>
                  <span className={styles.loyaltyPerkBottom}>{bottom}</span>
                </div>
              ))}
            </div>
            <Link to="/account" className={styles.heroGoldBtn}>Join Now — It's Free</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
