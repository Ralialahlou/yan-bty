import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Logo from '../common/Logo';
import styles from './Footer.module.css';

const footerLinks = [
  {
    heading: 'Shop',
    links: [
      { label: 'Makeup', to: '/shop/makeup' },
      { label: 'Skincare', to: '/shop/skincare' },
      { label: 'Fragrance', to: '/shop/fragrance' },
      { label: 'Hair Care', to: '/shop/haircare' },
      { label: 'New Arrivals', to: '/shop?filter=new' },
      { label: 'Bestsellers', to: '/shop?filter=bestsellers' },
    ],
  },
  {
    heading: 'Yan BTY',
    links: [
      { label: 'Our Story', to: '/about' },
      { label: 'Yan&One', to: '/brand/yan-one' },
      { label: 'Beauty Journal', to: '/journal' },
      { label: 'Loyalty — AKSAL Black', to: '/loyalty' },
      { label: 'Stores', to: '/stores' },
      { label: 'Gift Cards', to: '/gift-cards' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'Shipping & Delivery', to: '/help/shipping' },
      { label: 'Returns', to: '/help/returns' },
      { label: 'Track Your Order', to: '/account/orders' },
      { label: 'FAQ', to: '/help/faq' },
      { label: 'Contact Us', to: '/help/contact' },
    ],
  },
  {
    heading: 'Discover',
    links: [
      { label: 'All Brands', to: '/brands' },
      { label: 'Ingredient Glossary', to: '/ingredients' },
      { label: 'Skincare Routines', to: '/journal?category=routines' },
      { label: 'Beauty Advice', to: '/journal?category=expert' },
      { label: 'Sustainability', to: '/sustainability' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.newsletter}>
          <p className={styles.newsletterLabel}>Stay in the know</p>
          <h3 className={styles.newsletterTitle}>Beauty delivered to your inbox.</h3>
          <form className={styles.newsletterForm} onSubmit={e => e.preventDefault()}>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              className={styles.newsletterInput}
              autoComplete="email"
            />
            <button type="submit" className={styles.newsletterBtn}>Subscribe</button>
          </form>
        </div>
      </div>

      <div className={styles.mid}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.brand}>
              <Logo size="lg" variant="light" />
              <p className={styles.tagline}>Be You.</p>
              <p className={styles.brandDesc}>
                Morocco's premium multi-brand beauty destination. Where every beauty lover can discover established icons and future favourites.
              </p>
              <div className={styles.social}>
                {/* Instagram */}
                <a href="https://www.instagram.com/yanbty" target="_blank" rel="noopener noreferrer" aria-label="Instagram @yanbty" className={styles.socialLink}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                {/* TikTok */}
                <a href="https://www.tiktok.com/@yanbty" target="_blank" rel="noopener noreferrer" aria-label="TikTok @yanbty" className={styles.socialLink}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34v-7a8.27 8.27 0 004.84 1.55V6.42a4.85 4.85 0 01-1.07-.27z"/></svg>
                </a>
                {/* Facebook */}
                <a href="https://www.facebook.com/yanbty" target="_blank" rel="noopener noreferrer" aria-label="Facebook Yan BTY" className={styles.socialLink}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                {/* Pinterest */}
                <a href="https://www.pinterest.com/yanbty" target="_blank" rel="noopener noreferrer" aria-label="Pinterest Yan BTY" className={styles.socialLink}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                </a>
                {/* YouTube */}
                <a href="https://www.youtube.com/@yanbty" target="_blank" rel="noopener noreferrer" aria-label="YouTube Yan BTY" className={styles.socialLink}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
              <p className={styles.website}>www.yanbty.ma</p>
            </div>

            {footerLinks.map(col => (
              <div key={col.heading} className={styles.col}>
                <h4 className={styles.colHeading}>{col.heading}</h4>
                <ul className={styles.colLinks}>
                  {col.links.map(l => (
                    <li key={l.label}>
                      <Link to={l.to} className={styles.colLink}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copy}>© 2025 Yan BTY. All rights reserved.</p>
            <div className={styles.legal}>
              <Link to="/privacy" className={styles.legalLink}>Privacy Policy</Link>
              <Link to="/terms" className={styles.legalLink}>Terms of Service</Link>
              <Link to="/cookies" className={styles.legalLink}>Cookies</Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.pattern}>
        <span>YAN BTY&nbsp;&nbsp;BE YOU&nbsp;&nbsp;YAN BTY&nbsp;&nbsp;BE YOU&nbsp;&nbsp;YAN BTY&nbsp;&nbsp;BE YOU&nbsp;&nbsp;YAN BTY&nbsp;&nbsp;BE YOU&nbsp;&nbsp;YAN BTY&nbsp;&nbsp;BE YOU&nbsp;&nbsp;</span>
      </div>
    </footer>
  );
}
