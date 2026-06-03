import { useState } from 'react';
import { Check, Gift, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import SEO from '../components/common/SEO';
import { useCart } from '../context/CartContext';
import styles from './GiftCardsPage.module.css';

/*
 * Gift card designs inspired by the actual Yan BTY gift card photographs.
 * Gift card 1: physical tabla-red card with centered logo + "BECAUSE YOU DESERVE IT"
 * Gift card 2: category cards with textured photo backgrounds + logo + www.yanbty.ma
 * Gift card 3: secondary-colour logo on various editorial photos
 */

const AMOUNT_CARDS = [
  {
    id: 'gc-200',  amount: 200,  label: '200 MAD',
    phrase: 'A BEAUTIFUL START',
    subPhrase: 'A LITTLE TREAT FOR YOU',
    bg: '#ebe8e0', text: '#332114', accent: '#b25745', logoVariant: 'dark',
  },
  {
    id: 'gc-500',  amount: 500,  label: '500 MAD',
    phrase: 'BECAUSE YOU DESERVE IT',
    subPhrase: 'A LITTLE TREAT FOR YOU',
    bg: '#b25745', text: '#ffffff', accent: '#ebe8e0', logoVariant: 'light',
    featured: true,
  },
  {
    id: 'gc-1000', amount: 1000, label: '1,000 MAD',
    phrase: 'BECAUSE YOU DESERVE IT',
    subPhrase: 'THE ULTIMATE TREAT',
    bg: '#332114', text: '#ffffff', accent: '#d4a391', logoVariant: 'light',
  },
  {
    id: 'gc-2000', amount: 2000, label: '2,000 MAD',
    phrase: 'FOR THOSE WHO DESERVE EVERYTHING',
    subPhrase: 'A LITTLE TREAT FOR YOU',
    bg: '#ebdecc', text: '#332114', accent: '#b25745', logoVariant: 'dark',
    premium: true,
  },
];

/* Category gift sets — inspired by gift card 2 (textured backgrounds + logo + URL) */
const CATEGORY_SETS = [
  { id: 'gb-makeup',   slug: 'makeup',   label: 'Makeup',    price: 750,  bg: 'https://images.unsplash.com/photo-1599733594230-6b823276abcc?w=600&q=80' },
  { id: 'gb-haircare', slug: 'haircare', label: 'Hair Care',  price: 680,  bg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80' },
  { id: 'gb-suncare',  slug: 'suncare',  label: 'Sun Care',   price: 580,  bg: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80' },
  { id: 'gb-skincare', slug: 'skincare', label: 'Skincare',   price: 980,  bg: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80' },
  { id: 'gb-bodycare', slug: 'bodycare', label: 'Body Care',  price: 720,  bg: 'https://images.unsplash.com/photo-1611232658409-0d98127f237f?w=600&q=80' },
  { id: 'gb-scents',   slug: 'fragrance',label: 'Scents',     price: 1200, bg: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80' },
];

export default function GiftCardsPage() {
  const { addItem } = useCart();
  const [added, setAdded] = useState(null);

  const handleAdd = (id, price, name) => {
    addItem({
      id,
      name,
      brandName: 'Yan BTY',
      price,
      image: '/images/gift-card-1.png',
      shortDescription: 'Physical gift card — delivered to your door.',
      variants: [], sizes: [], certifications: [],
    });
    setAdded(id);
    setTimeout(() => setAdded(null), 2000);
  };

  return (
    <>
      <SEO title="Gift Cards & Gift Sets" description="Give the gift of beauty — Yan BTY physical gift cards and curated category gift sets delivered to your door." path="/gift-cards" />

      {/* ── Hero — references gift card 1 photograph ── */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.heroEyebrow}>Give the gift of beauty</p>
          <h1 className={styles.heroTitle}>
            <span>Gift</span>
            <span className={styles.heroAccent}>Cards</span>
            <span>&amp; Sets</span>
          </h1>
          <p className={styles.heroBody}>
            Beautifully presented physical cards and curated gift sets. Let them discover their own beautiful — at any Yan BTY store or online at yanbty.ma.
          </p>
        </div>

        {/* Stacked preview referencing the actual card photograph */}
        <div className={styles.heroCards}>
          <div className={styles.heroCardEnvelope} />
          <div className={styles.heroCardBack} />
          <div className={styles.heroCardFront}>
            <Logo size="md" variant="light" />
            <p className={styles.heroCardPhrase}>BECAUSE YOU DESERVE IT</p>
            <p className={styles.heroCardSub}>A LITTLE TREAT FOR YOU</p>
          </div>
          <div className={styles.heroRibbon} />
        </div>
      </section>

      <div className="container">

        {/* ══════════════════════════════════
            SECTION 1 — AMOUNT GIFT CARDS
            Based on gift card 1 photograph:
            Tabla-red card, centred logo,
            "BECAUSE YOU DESERVE IT" text
            ══════════════════════════════════ */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionLabel}>Physical Gift Cards</p>
            <h2 className={styles.sectionTitle}>Choose Your Amount</h2>
            <p className={styles.sectionSub}>Delivered beautifully packaged within 2–3 working days.</p>
          </div>

          <div className={styles.amountGrid}>
            {AMOUNT_CARDS.map(card => (
              <div key={card.id} className={styles.cardOuter}>
                {card.featured && <div className={styles.badge}>Most Popular</div>}
                {card.premium && <div className={styles.badgePremium}>Premium</div>}

                {/* The physical card — matches brand photograph aesthetic */}
                <div className={styles.physCard} style={{ background: card.bg }}>
                  {/* Dot pattern overlay (visible in gift card 1 photo) */}
                  <div className={styles.dotPattern} />

                  <div className={styles.physCardTop}>
                    <Logo size="sm" variant={card.logoVariant} />
                  </div>

                  <div className={styles.physCardMid}>
                    <p className={styles.physCardPhrase} style={{ color: card.text }}>{card.phrase}</p>
                  </div>

                  <div className={styles.physCardBottom}>
                    <span className={styles.physCardAmount} style={{ color: card.text }}>{card.label}</span>
                    <span className={styles.physCardSub} style={{ color: card.accent }}>{card.subPhrase}</span>
                  </div>

                  {/* Shimmer sweep */}
                  <div className={styles.shimmer} />
                </div>

                <div className={styles.cardInfo}>
                  <span className={styles.cardPrice}>{card.amount.toLocaleString()} MAD</span>
                  <Button
                    variant={added === card.id ? 'accent' : 'primary'}
                    fullWidth
                    onClick={() => handleAdd(card.id, card.amount, `Yan BTY Gift Card — ${card.label}`)}
                  >
                    {added === card.id ? <><Check size={14} /> Added</> : <><Gift size={14} /> Add to Bag</>}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className={styles.divider}><span>or give them a category</span></div>

        {/* ══════════════════════════════════
            SECTION 2 — CATEGORY GIFT SETS
            Based on gift card 2 photograph:
            Square cards, textured/photo bg,
            yan® BTY logo, category name top,
            www.yanbty.ma bottom
            ══════════════════════════════════ */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionLabel}>Curated Gift Sets</p>
            <h2 className={styles.sectionTitle}>Shop by Category</h2>
            <p className={styles.sectionSub}>A curated selection of our most-loved products in each category, beautifully boxed.</p>
          </div>

          <div className={styles.catGrid}>
            {CATEGORY_SETS.map(set => (
              <div key={set.id} className={styles.catOuter}>
                {/* Category card — textured bg + logo + category name + URL, per gift card 2 */}
                <Link to={`/shop/${set.slug}`} className={styles.catCard}>
                  <img src={set.bg} alt={set.label} className={styles.catCardImg} />
                  <div className={styles.catCardOverlay} />

                  <div className={styles.catCardContent}>
                    <Logo size="sm" variant="light" />
                    <p className={styles.catCardLabel}>{set.label}</p>
                    <p className={styles.catCardUrl}>www.yanbty.ma</p>
                  </div>
                </Link>

                <div className={styles.cardInfo}>
                  <span className={styles.cardPrice}>{set.price.toLocaleString()} MAD</span>
                  <Button
                    variant={added === set.id ? 'accent' : 'outline'}
                    size="sm"
                    onClick={() => handleAdd(set.id, set.price, `Yan BTY ${set.label} Gift Set`)}
                  >
                    {added === set.id ? <><Check size={13} /> Added</> : <><Gift size={13} /> Add to Bag</>}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ── */}
        <section className={styles.how}>
          {[
            { n: '01', title: 'Choose & Order', desc: 'Select a monetary gift card or a curated category set.' },
            { n: '02', title: 'We Package It', desc: 'Your order arrives in Yan BTY branded packaging within 2–3 working days.' },
            { n: '03', title: 'Redeem Anywhere', desc: 'In-store at all Yan BTY locations or at yanbty.ma. No expiry.' },
          ].map(s => (
            <div key={s.n} className={styles.howStep}>
              <span className={styles.howN}>{s.n}</span>
              <h3 className={styles.howTitle}>{s.title}</h3>
              <p className={styles.howDesc}>{s.desc}</p>
            </div>
          ))}
        </section>

        {/* ── Terms ── */}
        <section className={styles.terms}>
          <h3 className={styles.termsTitle}>Terms &amp; Conditions</h3>
          <ul className={styles.termsList}>
            <li>Physical gift cards and sets are delivered within 2–3 working days to any address in Morocco.</li>
            <li>Valid in all Yan BTY stores and at yanbty.ma. Gift cards do not expire.</li>
            <li>Gift cards cannot be exchanged for cash. Partial redemption leaves balance on the card.</li>
            <li>Category gift set contents may vary seasonally. Substitutions are of equivalent value.</li>
            <li>Lost or stolen cards cannot be replaced without proof of purchase.</li>
          </ul>
        </section>
      </div>
    </>
  );
}
