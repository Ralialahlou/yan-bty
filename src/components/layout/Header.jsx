import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import Logo from '../common/Logo';
import WishlistDrawer from '../common/WishlistDrawer';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';

/*
 * Each nav link that has a mega menu also has a `featured` panel
 * displayed on the right side of the full-width dropdown.
 * Images are editorial-quality and on-brand (minimal, neutral).
 */
const navLinks = [
  {
    label: 'Shop',
    to: '/shop',
    mega: [
      { heading: 'Categories', links: [
        { label: 'Makeup', to: '/shop/makeup' },
        { label: 'Skincare', to: '/shop/skincare' },
        { label: 'Fragrance', to: '/shop/fragrance' },
        { label: 'Hair Care', to: '/shop/haircare' },
        { label: 'Body Care', to: '/shop/bodycare' },
        { label: 'Sun Care', to: '/shop/suncare' },
      ]},
      { heading: 'Discover', links: [
        { label: 'New Arrivals', to: '/shop?filter=new' },
        { label: 'Bestsellers', to: '/shop?filter=bestsellers' },
        { label: "Editor's Picks", to: '/shop?filter=editors' },
        { label: 'Clean Beauty', to: '/shop?cert=clean' },
        { label: 'Vegan', to: '/shop?cert=vegan' },
      ]},
      { heading: 'Shop by Brand', links: [
        { label: 'Yan&One', to: '/brand/yan-one', highlight: true },
        { label: 'Clarins', to: '/brand/clarins' },
        { label: 'Charlotte Tilbury', to: '/brand/charlotte-tilbury' },
        { label: 'NARS', to: '/brand/nars' },
        { label: 'All Brands', to: '/brands' },
      ]},
    ],
    featured: {
      image: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=900&q=85',
      eyebrow: 'New Season',
      title: 'Autumn Edit',
      subtitle: 'The most-loved products of the season, curated by our editors.',
      cta: 'Shop All',
      ctaLink: '/shop',
    },
  },
  {
    label: 'Makeup',
    to: '/shop/makeup',
    mega: [
      { heading: 'Face', shopAll: { label: 'Shop all Face', to: '/shop/makeup?sub=face' }, links: [
        { label: 'Foundation', to: '/shop/makeup?sub=foundation' },
        { label: 'Concealer', to: '/shop/makeup?sub=concealer' },
        { label: 'Blush', to: '/shop/makeup?sub=blush' },
        { label: 'Bronzer & Contour', to: '/shop/makeup?sub=bronzer' },
        { label: 'Highlighter', to: '/shop/makeup?sub=highlighter' },
        { label: 'Primer', to: '/shop/makeup?sub=primer' },
        { label: 'BB & CC Cream', to: '/shop/makeup?sub=bb-cc-cream' },
        { label: 'Setting Spray', to: '/shop/makeup?sub=setting-spray' },
      ]},
      { heading: 'Eyes', shopAll: { label: 'Shop all Eyes', to: '/shop/makeup?sub=eyes' }, links: [
        { label: 'Mascara', to: '/shop/makeup?sub=mascara' },
        { label: 'Eyeshadow Palettes', to: '/shop/makeup?sub=eyeshadow-palettes' },
        { label: 'Eyeliner', to: '/shop/makeup?sub=eyeliner' },
        { label: 'Eyebrow Products', to: '/shop/makeup?sub=eyebrow' },
        { label: 'False Lashes', to: '/shop/makeup?sub=false-lashes' },
        { label: 'Eye Primer', to: '/shop/makeup?sub=eye-primer' },
      ]},
      { heading: 'Lips', shopAll: { label: 'Shop all Lips', to: '/shop/makeup?sub=lips' }, links: [
        { label: 'Lipstick', to: '/shop/makeup?sub=lipstick' },
        { label: 'Lip Gloss', to: '/shop/makeup?sub=lip-gloss' },
        { label: 'Lip Liner', to: '/shop/makeup?sub=lip-liner' },
        { label: 'Liquid Lipstick', to: '/shop/makeup?sub=liquid-lipstick' },
        { label: 'Lip Balm', to: '/shop/makeup?sub=lip-balm' },
        { label: 'Lip Stain', to: '/shop/makeup?sub=lip-stain' },
      ]},
      { heading: 'Tools & Brushes', shopAll: { label: 'Shop all Makeup', to: '/shop/makeup' }, links: [
        { label: 'Makeup Brushes', to: '/shop/makeup?sub=brushes' },
        { label: 'Sponges & Blenders', to: '/shop/makeup?sub=sponges' },
        { label: 'Eyelash Curlers', to: '/shop/makeup?sub=eyelash-curlers' },
        { label: 'Brush Sets', to: '/shop/makeup?sub=brush-sets' },
      ]},
    ],
    featured: {
      image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=900&q=85',
      eyebrow: 'Trending Now',
      title: 'The Lip Edit',
      subtitle: 'From bold reds to everyday nudes — find your perfect shade.',
      cta: 'Shop Lips',
      ctaLink: '/shop/makeup?sub=lipstick',
    },
  },
  {
    label: 'Skincare',
    to: '/shop/skincare',
    mega: [
      { heading: 'Cleanse & Tone', shopAll: { label: 'Shop all Cleanse', to: '/shop/skincare?sub=cleanse' }, links: [
        { label: 'Cleansers', to: '/shop/skincare?sub=cleanser' },
        { label: 'Micellar Water', to: '/shop/skincare?sub=micellar-water' },
        { label: 'Toners & Essences', to: '/shop/skincare?sub=toner' },
        { label: 'Exfoliators', to: '/shop/skincare?sub=exfoliator' },
      ]},
      { heading: 'Treat & Correct', shopAll: { label: 'Shop all Serums', to: '/shop/skincare?sub=serum' }, links: [
        { label: 'Serums', to: '/shop/skincare?sub=serum' },
        { label: 'Face Oils', to: '/shop/skincare?sub=face-oil' },
        { label: 'Eye Creams', to: '/shop/skincare?sub=eye-cream' },
        { label: 'Retinol', to: '/shop/skincare?sub=retinol' },
        { label: 'Vitamin C', to: '/shop/skincare?sub=vitamin-c' },
      ]},
      { heading: 'Moisturise & Protect', shopAll: { label: 'Shop all Skincare', to: '/shop/skincare' }, links: [
        { label: 'Moisturisers', to: '/shop/skincare?sub=moisturiser' },
        { label: 'SPF & Sunscreen', to: '/shop/skincare?sub=spf' },
        { label: 'Face Masks', to: '/shop/skincare?sub=face-mask' },
        { label: 'Night Creams', to: '/shop/skincare?sub=night-cream' },
      ]},
    ],
    featured: {
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=85',
      eyebrow: 'Expert Advice',
      title: 'Build Your Routine',
      subtitle: 'Cleanse, treat, moisturise, protect — discover the products for every step.',
      cta: 'Explore Skincare',
      ctaLink: '/shop/skincare',
    },
  },
  {
    label: 'Fragrance',
    to: '/shop/fragrance',
    mega: [
      { heading: 'Women', links: [
        { label: 'Eau de Parfum', to: '/shop/fragrance?sub=edp-women' },
        { label: 'Eau de Toilette', to: '/shop/fragrance?sub=edt-women' },
        { label: 'Body Mist', to: '/shop/fragrance?sub=body-mist' },
      ]},
      { heading: 'Men', links: [
        { label: 'Eau de Parfum', to: '/shop/fragrance?sub=edp-men' },
        { label: 'Eau de Toilette', to: '/shop/fragrance?sub=edt-men' },
        { label: 'Aftershave', to: '/shop/fragrance?sub=aftershave' },
      ]},
      { heading: 'By Family & Home', links: [
        { label: 'Floral', to: '/shop/fragrance?sub=floral' },
        { label: 'Woody & Oud', to: '/shop/fragrance?sub=woody-oud' },
        { label: 'Candles & Diffusers', to: '/shop/fragrance?sub=candles' },
        { label: 'Shop All Fragrance', to: '/shop/fragrance', highlight: true },
      ]},
    ],
    featured: {
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=900&q=85',
      eyebrow: 'Yan&One Exclusive',
      title: 'Desert Rose',
      subtitle: 'Warm rose with Moroccan oud and amber. Our most iconic fragrance.',
      cta: 'Discover the Scent',
      ctaLink: '/product/yo-004',
    },
  },
  {
    label: 'Hair Care',
    to: '/shop/haircare',
    mega: [
      { heading: 'Wash & Condition', links: [
        { label: 'Shampoo', to: '/shop/haircare?sub=shampoo' },
        { label: 'Conditioner', to: '/shop/haircare?sub=conditioner' },
        { label: 'Scalp Scrubs', to: '/shop/haircare?sub=scalp-scrub' },
      ]},
      { heading: 'Treat & Repair', links: [
        { label: 'Hair Masks', to: '/shop/haircare?sub=hair-mask' },
        { label: 'Hair Oils', to: '/shop/haircare?sub=hair-oil' },
        { label: 'Scalp Care', to: '/shop/haircare?sub=scalp-care' },
      ]},
      { heading: 'Style & Finish', links: [
        { label: 'Heat Protectant', to: '/shop/haircare?sub=heat-protectant' },
        { label: 'Dry Shampoo', to: '/shop/haircare?sub=dry-shampoo' },
        { label: 'Shop All Hair', to: '/shop/haircare', highlight: true },
      ]},
    ],
    featured: {
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=85',
      eyebrow: 'New Arrivals',
      title: 'Healthy Hair',
      subtitle: 'From scalp to ends — curated hair care for every texture and type.',
      cta: 'Shop Hair Care',
      ctaLink: '/shop/haircare',
    },
  },
  {
    label: 'Body Care',
    to: '/shop/bodycare',
    mega: [
      { heading: 'Cleanse', links: [
        { label: 'Body Wash & Shower Gel', to: '/shop/bodycare?sub=body-wash' },
        { label: 'Bar Soap', to: '/shop/bodycare?sub=bar-soap' },
        { label: 'Bath Soaks', to: '/shop/bodycare?sub=bath-soaks' },
        { label: 'Body Scrubs', to: '/shop/bodycare?sub=body-scrub' },
      ]},
      { heading: 'Moisturise', links: [
        { label: 'Body Lotions', to: '/shop/bodycare?sub=body-lotion' },
        { label: 'Body Butter', to: '/shop/bodycare?sub=body-butter' },
        { label: 'Body Oils', to: '/shop/bodycare?sub=body-oil' },
        { label: 'Hand & Nail Cream', to: '/shop/bodycare?sub=hand-cream' },
      ]},
      { heading: 'Targeted & Wellbeing', links: [
        { label: 'Stretch Mark', to: '/shop/bodycare?sub=stretch-mark' },
        { label: 'Deodorant', to: '/shop/bodycare?sub=deodorant' },
        { label: 'Self Tan', to: '/shop/bodycare?sub=self-tan' },
        { label: 'Shop All Body', to: '/shop/bodycare', highlight: true },
      ]},
    ],
    featured: {
      image: 'https://images.unsplash.com/photo-1611232658409-0d98127f237f?w=900&q=85',
      eyebrow: 'Bestsellers',
      title: 'Body Rituals',
      subtitle: 'Indulge in the art of self-care — luxurious formulas for silky, glowing skin.',
      cta: 'Shop Body Care',
      ctaLink: '/shop/bodycare',
    },
  },
  {
    label: 'Yan&One',
    to: '/brand/yan-one',
    highlight: true,
    mega: [
      { heading: 'Makeup', links: [
        { label: 'Face', to: '/brand/yan-one?cat=face' },
        { label: 'Eyes', to: '/brand/yan-one?cat=eyes' },
        { label: 'Lips', to: '/brand/yan-one?cat=lips' },
        { label: 'Brows', to: '/brand/yan-one?cat=brows' },
        { label: 'Nails', to: '/brand/yan-one?cat=nails' },
        { label: 'Accessories', to: '/brand/yan-one?cat=accessories' },
      ]},
      { heading: 'Skin & Body', links: [
        { label: 'Skincare', to: '/brand/yan-one?cat=skincare' },
        { label: 'Body Care', to: '/brand/yan-one?cat=body' },
        { label: 'Sun Care', to: '/brand/yan-one?cat=sun' },
        { label: 'Rituals', to: '/brand/yan-one?cat=rituals' },
        { label: 'Kids', to: '/brand/yan-one?cat=kids' },
      ]},
      { heading: 'Fragrance & Hair', links: [
        { label: 'Perfume — Women', to: '/brand/yan-one?cat=perfume-women' },
        { label: 'Perfume — Men', to: '/brand/yan-one?cat=perfume-men' },
        { label: 'Home Scent', to: '/brand/yan-one?cat=home-scent' },
        { label: 'Hair Care', to: '/brand/yan-one?cat=hair' },
        { label: 'Shop All Yan&One', to: '/brand/yan-one', highlight: true },
      ]},
    ],
    featured: {
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=85',
      eyebrow: 'Our Signature Collection',
      title: 'Yan&One',
      subtitle: 'Crafted in Morocco with a global perspective. Clean, inclusive, effective.',
      cta: 'Explore the Collection',
      ctaLink: '/brand/yan-one',
      dark: true,
    },
  },
];

// Links shown in mobile drawer only (not in desktop bar)
const mobileOnlyLinks = [
  { label: 'Beauty Journal', to: '/journal' },
  { label: 'Stores', to: '/stores' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { user, openAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Active link object (for rendering the hoisted mega panel)
  const activeMegaLink = navLinks.find(l => l.label === activeMega) ?? null;

  return (
    <>
      {/* Promo bar */}
      <div className={styles.promoBar}>
        <span>Free shipping on orders over 500 MAD · <strong>Loyalty Points on every order</strong></span>
      </div>

      <header
        className={[styles.header, scrolled ? styles.scrolled : ''].join(' ')}
        onMouseLeave={() => setActiveMega(null)}
      >
        {/* ── Top bar ── */}
        <div className={styles.inner}>
          <button className={styles.menuBtn} onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>

          <Logo size="md" />

          {/* Desktop nav — triggers activeMega only, no panel rendered here */}
          <nav className={styles.nav} aria-label="Main navigation">
            {navLinks.map(link => (
              <div
                key={link.label}
                className={styles.navItem}
                onMouseEnter={() => link.mega ? setActiveMega(link.label) : setActiveMega(null)}
              >
                <Link
                  to={link.to}
                  className={[
                    styles.navLink,
                    link.highlight ? styles.navHighlight : '',
                    activeMega === link.label ? styles.navLinkActive : '',
                  ].join(' ')}
                  aria-expanded={link.mega ? activeMega === link.label : undefined}
                  aria-haspopup={link.mega ? 'true' : undefined}
                >
                  {link.label}
                  {link.mega && <ChevronDown size={11} className={[styles.chevron, activeMega === link.label ? styles.chevronOpen : ''].join(' ')} aria-hidden="true" />}
                </Link>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.iconBtn} onClick={() => setSearchOpen(s => !s)} aria-label="Search">
              <Search size={20} />
            </button>
            <button className={styles.iconBtn} onClick={() => user ? setWishlistOpen(true) : openAuth('login')} aria-label="Wishlist">
              <Heart size={20} />
            </button>
            <button className={styles.iconBtn} onClick={() => user ? navigate('/account') : openAuth('login')} aria-label="Account">
              <User size={20} />
            </button>
            <button className={styles.cartBtn} onClick={openCart} aria-label={`Cart${itemCount > 0 ? `, ${itemCount} item${itemCount === 1 ? '' : 's'}` : ''}`}>
              <ShoppingBag size={20} />
              {itemCount > 0 && <span className={styles.cartCount} aria-hidden="true">{itemCount}</span>}
            </button>
          </div>
        </div>

        {/* ── FULL-WIDTH MEGA MENU PANEL ──────────────────────────────────────
         *  Rendered directly inside <header> (not inside a nav item).
         *  position: absolute top:100% left:0 right:0 → full viewport width.
         *  Left side: subcategory columns aligned with container.
         *  Right side: editorial featured image with text overlay.
         * ────────────────────────────────────────────────────────────────── */}
        {activeMegaLink?.mega && (
          <div className={styles.megaPanel} onMouseEnter={() => setActiveMega(activeMega)}>
            <div className={styles.megaLayout}>

              {/* Left: subcategory columns */}
              <div className={styles.megaCols}>
                {activeMegaLink.mega.map(col => (
                  <div key={col.heading} className={styles.megaCol}>
                    <p className={styles.megaHeading}>{col.heading}</p>
                    <ul className={styles.megaColList}>
                      {col.links.map(l => (
                        <li key={l.label}>
                          <Link
                            to={l.to}
                            className={[styles.megaLink, l.highlight ? styles.megaLinkHighlight : ''].join(' ')}
                            onClick={() => setActiveMega(null)}
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {/* "Shop all [section]" at bottom of each column */}
                    {col.shopAll && (
                      <Link
                        to={col.shopAll.to}
                        className={styles.megaShopAll}
                        onClick={() => setActiveMega(null)}
                      >
                        {col.shopAll.label} <ArrowRight size={11} />
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Right: featured image panel */}
              {activeMegaLink.featured && (
                <Link
                  to={activeMegaLink.featured.ctaLink}
                  className={[styles.megaFeature, activeMegaLink.featured.dark ? styles.megaFeatureDark : ''].join(' ')}
                  onClick={() => setActiveMega(null)}
                >
                  <img
                    src={activeMegaLink.featured.image}
                    alt={activeMegaLink.featured.title}
                    className={styles.megaFeatureImg}
                    loading="eager"
                  />
                  <div className={styles.megaFeatureOverlay} />
                  <div className={styles.megaFeatureContent}>
                    <p className={styles.megaFeatureEyebrow}>{activeMegaLink.featured.eyebrow}</p>
                    <p className={styles.megaFeatureTitle}>{activeMegaLink.featured.title}</p>
                    <p className={styles.megaFeatureSub}>{activeMegaLink.featured.subtitle}</p>
                    <span className={styles.megaFeatureCta}>
                      {activeMegaLink.featured.cta} <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* ── Search bar ── */}
        {searchOpen && (
          <div className={styles.searchBar} role="search">
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <Search size={18} className={styles.searchIcon} aria-hidden="true" />
              <input
                autoFocus
                id="site-search"
                type="search"
                aria-label="Search products, brands, and ingredients"
                placeholder="Search products, brands, ingredients..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button type="button" onClick={() => setSearchOpen(false)} className={styles.searchClose} aria-label="Close search">
                <X size={18} aria-hidden="true" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)}>
          <div
            className={styles.mobileDrawer}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className={styles.mobileHeader}>
              <Logo size="md" />
              <button onClick={() => setMobileOpen(false)} className={styles.iconBtn} aria-label="Close menu"><X size={22} aria-hidden="true" /></button>
            </div>

            <div className={styles.mobileSearch} role="search">
              <form onSubmit={(e) => { e.preventDefault(); navigate(`/shop?search=${searchQuery}`); setMobileOpen(false); }}>
                <input
                  type="search"
                  aria-label="Search products"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className={styles.mobileSearchInput}
                />
              </form>
            </div>

            <nav className={styles.mobileNav} aria-label="Mobile navigation">
              {[...navLinks, ...mobileOnlyLinks].map(link => (
                <div key={link.label}>
                  <Link
                    to={link.to}
                    className={[styles.mobileNavLink, link.highlight ? styles.navHighlight : ''].join(' ')}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.mega && (
                    <div className={styles.mobileSub}>
                      {link.mega.flatMap(col => col.links).map(l => (
                        <Link
                          key={l.label}
                          to={l.to}
                          className={styles.mobileSubLink}
                          onClick={() => setMobileOpen(false)}
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className={styles.mobileFooter}>
              {user ? (
                <Link to="/account" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>
                  <User size={16} /> {user.name}
                </Link>
              ) : (
                <button className={styles.mobileNavLink} onClick={() => { openAuth('login'); setMobileOpen(false); }}>
                  <User size={16} /> Sign In / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Wishlist drawer */}
      {wishlistOpen && <WishlistDrawer onClose={() => setWishlistOpen(false)} />}
    </>
  );
}
