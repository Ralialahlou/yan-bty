import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import Button from '../components/common/Button';
import { getBrandBySlug } from '../data/brands';
import { getProductsByBrand } from '../data/products';
import styles from './BrandPage.module.css';

const YAN_ONE_HERO = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=85';

const YAN_ONE_CATS = [
  { id: 'all',       label: 'All',         slug: null },
  { id: 'makeup',    label: 'Makeup',      slug: 'makeup' },
  { id: 'skincare',  label: 'Skincare',    slug: 'skincare' },
  { id: 'fragrance', label: 'Fragrance',   slug: 'fragrance' },
  { id: 'haircare',  label: 'Hair Care',   slug: 'haircare' },
  { id: 'bodycare',  label: 'Body Care',   slug: 'bodycare' },
];

export default function BrandPage() {
  const { slug } = useParams();
  const brand = getBrandBySlug(slug);
  const allBrandProducts = getProductsByBrand(brand?.id ?? '');
  const [activeCat, setActiveCat] = useState('all');

  const brandProducts = activeCat === 'all'
    ? allBrandProducts
    : allBrandProducts.filter(p => p.category === activeCat);

  if (!brand) {
    return (
      <div className={styles.notFound}>
        <p>Brand not found.</p>
        <Link to="/brands"><Button variant="primary">All Brands</Button></Link>
      </div>
    );
  }

  const isOwn = brand.isOwn;

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        {isOwn && (
          <div className={styles.yanOneHeroGrid}>
            {/* Left: text */}
            <div className={styles.heroContent}>
              <p className={styles.heroLabel}>Yan BTY Signature Collection</p>
              <h1 className={styles.heroTitle}>Yan&One</h1>
              <p className={styles.heroTagline}>Be your beautiful, be unique.</p>
              <p className={styles.heroDesc}>
                Crafted in Morocco with a global perspective. Yan&One is formulated for every skin type, inspired by every journey — clean, inclusive, and beautifully effective.
              </p>
              <div className={styles.heroFeatures}>
                {['Clean Beauty', 'Cruelty-Free', 'Inclusive', 'Vegan Options'].map(f => (
                  <span key={f} className={styles.heroFeature}>{f}</span>
                ))}
              </div>
            </div>
            {/* Right: full-height image extending to viewport edge */}
            <div className={styles.heroImageWrap}>
              <img src={YAN_ONE_HERO} alt="Yan&One" />
            </div>
          </div>
        )}
        {!isOwn && (
          <div className={styles.partnerHero}>
            <div
              className={styles.partnerLogoCircle}
              style={{ backgroundColor: brand.color }}
            >
              <span>{brand.name[0]}</span>
            </div>
            <h1 className={styles.partnerName}>{brand.name}</h1>
            <p className={styles.partnerTagline}>{brand.tagline}</p>
          </div>
        )}
      </section>

      {/* Products */}
      <section className={styles.products}>
        <div className="container">
          <div className={styles.productsHeader}>
            <h2 className={styles.productsTitle}>
              {isOwn ? 'Shop Yan&One' : `Shop ${brand.name}`}
            </h2>
            <span className={styles.productsCount}>{brandProducts.length} products</span>
          </div>

          {/* Category nav — Yan&One only, links to filtered PLP */}
          {isOwn && (
            <div className={styles.catNav}>
              {YAN_ONE_CATS.map(cat => (
                <button
                  key={cat.id}
                  className={[styles.catNavBtn, activeCat === cat.id ? styles.catNavBtnActive : ''].join(' ')}
                  onClick={() => setActiveCat(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
              <Link to="/shop/yan-one" className={styles.catNavLink}>
                Browse all categories <ArrowRight size={13} />
              </Link>
            </div>
          )}

          {brandProducts.length === 0 ? (
            <div className={styles.empty}>
              <p>Products coming soon.</p>
              <Link to="/shop"><Button variant="primary">Browse All Products</Button></Link>
            </div>
          ) : (
            <div className={styles.grid}>
              {brandProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brand story (for own brand) */}
      {isOwn && (
        <section className={styles.story}>
          <div className="container">
            <div className={styles.storyGrid}>
              <div className={styles.storyContent}>
                <p className={styles.storyLabel}>Our Story</p>
                <h2 className={styles.storyTitle}>Born in Morocco. Made for the World.</h2>
                <p className={styles.storyText}>
                  Yan&One was born from a simple idea: that beauty should be accessible, inclusive, and honest. Developed by our team of beauty experts alongside leading dermatologists, every formula is crafted with care and backed by science.
                </p>
                <p className={styles.storyText}>
                  We believe in clean, effective beauty that works for every skin tone, type, and age. Because beauty begins the moment you decide to be yourself.
                </p>
                <div className={styles.storyValues}>
                  {[['Clean', 'No harmful ingredients'], ['Inclusive', 'Every skin, every shade'], ['Effective', 'Clinically proven results'], ['Sustainable', 'Eco-conscious packaging']].map(([title, desc]) => (
                    <div key={title} className={styles.storyValue}>
                      <span className={styles.storyValueTitle}>{title}</span>
                      <span className={styles.storyValueDesc}>{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.storyImage}>
                <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80" alt="Yan&One Story" />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
