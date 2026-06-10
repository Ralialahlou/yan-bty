import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../components/common/SEO';
import styles from './LoyaltyPage.module.css';

const TIERS = [
  {
    id: 'silver',
    name: 'Silver',
    threshold: 'Free to join',
    thresholdSub: 'No minimum spend',
    color: '#b8bec8',
    textColor: '#332114',
    benefits: [true, '+100 pts', '+50 pts', '+200 pts', true, true, 'Welcome gift', null, null, null, null],
  },
  {
    id: 'gold',
    name: 'Gold',
    threshold: '1,500 MAD / year',
    thresholdSub: 'Annual spend',
    color: '#c4933f',
    textColor: 'white',
    highlighted: true,
    benefits: [true, '+100 pts', '+50 pts', '+200 pts', true, true, 'Enhanced gift', null, true, null, true],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    threshold: '4,000 MAD / year',
    thresholdSub: 'Annual spend',
    color: '#8890a8',
    textColor: 'white',
    benefits: [true, '+150 pts', '+75 pts', '+300 pts', true, true, 'Luxury gift', true, true, true, true],
  },
  {
    id: 'diamond',
    name: 'Diamond',
    threshold: '8,000 MAD / year',
    thresholdSub: 'Annual spend',
    color: '#332114',
    textColor: 'white',
    benefits: [true, '+200 pts', '+100 pts', '+400 pts', true, true, 'Exclusive gift', true, true, true, true],
  },
];

const BENEFIT_LABELS = [
  'Points per 1 MAD',
  'Birthday bonus',
  'Review reward',
  'Referral reward',
  '150 pts = 10 MAD off',
  '300 pts = 20 MAD off',
  'Tier welcome gift',
  'Personal Beauty Advisor',
  'Free standard delivery',
  'Free express delivery',
  'Early launch access',
];

const FAQS = [
  {
    q: 'How do I join AKSAL Black?',
    a: 'Creating a Yan BTY account automatically enrols you into AKSAL Black at Silver tier — no minimum spend, no hidden fees. Any purchases made in the last 365 days count toward your current tier status.',
  },
  {
    q: 'How do I earn kenz points?',
    a: 'You earn 1 kenz point for every 1 MAD spent on yanbty.com or through the AKSAL Black app. Bonus points are available for completing your Beauty Profile (+75 pts), writing product reviews (+50 pts), referring friends (+200 pts), and on your birthday (+100 pts).',
  },
  {
    q: 'How do tier levels work?',
    a: 'There are four tiers: Silver (free), Gold (1,500 MAD/year), Platinum (4,000 MAD/year), and Diamond (8,000 MAD/year). Tiers reset every 365 days from when you first reached that level — keep spending to maintain or rise through your tier.',
  },
  {
    q: 'When do my points expire?',
    a: 'Kenz points expire after 330 days of earning. Once converted into a reward voucher, that voucher is valid for 30 days. Check your balance and expiry dates anytime in the AKSAL Black app or your account dashboard.',
  },
  {
    q: 'Can I use a points reward and a promo code together?',
    a: 'Points rewards and promotional codes cannot be combined in a single transaction. However, shipping benefits (free delivery for Gold and above) are automatically applied and can be used alongside points rewards.',
  },
];

export default function LoyaltyPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <main>
      <SEO
        title="AKSAL Black — Earn Points & Unlock Rewards"
        description="Join AKSAL Black, Yan BTY's loyalty programme powered by kenzup. Earn kenz points with every purchase and rise through Silver, Gold, Platinum, and Diamond tiers."
        path="/loyalty"
      />

      {/* ═══ HERO ═══ */}
      <section className={styles.hero}>
        <div className={styles.heroGrain} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.heroPowered}>Powered by kenzup</p>
          <h1 className={styles.heroTitle}>AKSAL Black</h1>
          <p className={styles.heroTagline}>Beauty rewards, reinvented.</p>
          <p className={styles.heroBody}>
            Earn kenz points with every purchase and unlock exclusive rewards — from birthday treats and free gifts to personal beauty consultations and express delivery. Four tiers, endless benefits.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/account" className={styles.heroJoinBtn}>
              Join AKSAL Black — it's free <ArrowRight size={15} />
            </Link>
            <Link to="/account/loyalty" className={styles.heroSignInLink}>
              Already a member? Sign in
            </Link>
          </div>
          <div className={styles.heroTierBadges}>
            {TIERS.map(tier => (
              <span
                key={tier.id}
                className={styles.heroTierBadge}
                style={{ background: tier.color, color: tier.textColor }}
              >
                {tier.name}
              </span>
            ))}
          </div>
          <div className={styles.heroStats}>
            {[
              ['1 MAD', '= 1 point'],
              ['4 tiers', 'of rewards'],
              ['Free', 'to join'],
            ].map(([top, bottom]) => (
              <div key={top} className={styles.heroStat}>
                <span className={styles.heroStatTop}>{top}</span>
                <span className={styles.heroStatBottom}>{bottom}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className={styles.howSection}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>✦ Getting started</p>
            <h2 className={styles.sectionTitle}>How AKSAL Black works</h2>
          </header>
          <div className={styles.howGrid}>
            {[
              {
                num: '01',
                title: 'Join AKSAL Black',
                body: "Create a free Yan BTY account and you're automatically enrolled into AKSAL Black at Silver tier — no minimum spend, no fees.",
              },
              {
                num: '02',
                title: 'Earn kenz points',
                body: 'Earn 1 kenz point for every 1 MAD you spend. Stack extra points through reviews, referrals, your birthday, and by completing your Beauty Profile.',
              },
              {
                num: '03',
                title: 'Unlock rewards',
                body: 'Redeem points for MAD-off vouchers and free beauty gifts. Spend more to rise through Silver, Gold, Platinum, and Diamond tiers.',
              },
            ].map(step => (
              <div key={step.num} className={styles.howCard}>
                <span className={styles.howNum}>{step.num}</span>
                <h3 className={styles.howTitle}>{step.title}</h3>
                <p className={styles.howBody}>{step.body}</p>
              </div>
            ))}
          </div>

          <div className={styles.bonusRow}>
            <p className={styles.bonusRowLabel}>✦ Bonus ways to earn</p>
            <div className={styles.bonusGrid}>
              {[
                ['Complete Beauty Profile', '+75 pts', '✦'],
                ['Write a Review', '+50 pts', '⭐'],
                ['Refer a Friend', '+200 pts', '👥'],
                ['Birthday Bonus', '+100 pts', '🎂'],
              ].map(([action, pts, icon]) => (
                <div key={action} className={styles.bonusCard}>
                  <span className={styles.bonusIcon}>{icon}</span>
                  <span className={styles.bonusAction}>{action}</span>
                  <span className={styles.bonusPts}>{pts}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TIERS ═══ */}
      <section className={styles.tiersSection}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>✦ Four levels of rewards</p>
            <h2 className={styles.sectionTitle}>Your AKSAL Black journey</h2>
            <p className={styles.tiersSubtitle}>
              The more you shop, the more you unlock. Rise through Silver, Gold, Platinum, and Diamond to reveal the full AKSAL Black experience.
            </p>
          </header>

          <div className={styles.tiersGrid}>
            {TIERS.map(tier => (
              <div
                key={tier.id}
                className={[styles.tierCard, tier.highlighted ? styles.tierCardHighlighted : ''].join(' ')}
              >
                <div
                  className={styles.tierCardTop}
                  style={{ background: tier.color, color: tier.textColor }}
                >
                  <span className={styles.tierName}>{tier.name}</span>
                  <p className={styles.tierThreshold}>{tier.threshold}</p>
                  <p className={styles.tierThresholdSub}>{tier.thresholdSub}</p>
                  {tier.highlighted && (
                    <span className={styles.tierPopular}>Most popular</span>
                  )}
                </div>

                <ul className={styles.tierBenefitsList}>
                  {BENEFIT_LABELS.map((label, i) => (
                    <li key={label} className={styles.tierBenefitRow}>
                      <span className={styles.tierBenefitLabel}>{label}</span>
                      <span className={[
                        styles.tierBenefitValue,
                        tier.benefits[i] === null ? styles.tierBenefitNA : '',
                      ].join(' ')}>
                        {tier.benefits[i] === true
                          ? <Check size={14} strokeWidth={2.5} />
                          : tier.benefits[i] === null
                            ? <Minus size={13} />
                            : tier.benefits[i]}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className={styles.tierCta}>
                  <Link
                    to="/account"
                    className={[styles.tierBtn, tier.highlighted ? styles.tierBtnPrimary : ''].join(' ')}
                  >
                    {tier.id === 'silver' ? 'Join free' : 'Start earning'} <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PERKS ═══ */}
      <section className={styles.perksSection}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>✦ Member perks</p>
            <h2 className={styles.sectionTitle}>More than just points</h2>
          </header>
          <div className={styles.perksGrid}>
            {[
              {
                icon: '🎁',
                title: 'Birthday Reward',
                body: 'A surprise beauty gift every year on your birthday — upgraded at each tier level, with Diamond members receiving an exclusive luxury treat.',
                tier: 'All tiers',
              },
              {
                icon: '✨',
                title: 'Tier Welcome Gift',
                body: 'Unlock a free beauty gift every time you reach a new tier. More luxurious at Gold, Platinum, and Diamond.',
                tier: 'All tiers',
              },
              {
                icon: '🚀',
                title: 'Early Launch Access',
                body: 'Be first to shop new launches, limited editions, and exclusive collaborations before the public.',
                tier: 'Gold & above',
              },
              {
                icon: '💋',
                title: 'Personal Beauty Advisor',
                body: 'Your own dedicated consultant for 1:1 online consultations, routine building, and personalised recommendations.',
                tier: 'Platinum & Diamond',
              },
              {
                icon: '📦',
                title: 'Free Delivery',
                body: 'Gold and above enjoy free standard delivery on every order. Platinum and Diamond members also get complimentary express delivery.',
                tier: 'Gold & above',
              },
              {
                icon: '💰',
                title: 'Points on Every Order',
                body: '1 MAD = 1 kenz point on every single order. Diamond members earn accelerated points on all purchases.',
                tier: 'All tiers',
              },
            ].map(perk => (
              <div key={perk.title} className={styles.perkCard}>
                <span className={styles.perkIcon}>{perk.icon}</span>
                <h3 className={styles.perkTitle}>{perk.title}</h3>
                <p className={styles.perkBody}>{perk.body}</p>
                <span className={styles.perkTier}>{perk.tier}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className={styles.faqSection}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>✦ Questions answered</p>
            <h2 className={styles.sectionTitle}>AKSAL Black FAQ</h2>
          </header>
          <div className={styles.faqList}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={[styles.faqItem, openFaq === i ? styles.faqItemOpen : ''].join(' ')}
              >
                <button
                  className={styles.faqQ}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openFaq === i && <p className={styles.faqA}>{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ JOIN CTA ═══ */}
      <section className={styles.joinSection}>
        <div className={styles.joinGrain} aria-hidden="true" />
        <div className="container">
          <div className={styles.joinContent}>
            <p className={styles.joinPowered}>Powered by kenzup</p>
            <h2 className={styles.joinTitle}>Join AKSAL Black today</h2>
            <p className={styles.joinBody}>
              Create your free Yan BTY account and start earning kenz points on your very first order. Download the AKSAL Black app to manage your rewards on the go.
            </p>
            <Link to="/account" className={styles.joinBtn}>
              Create free account <ArrowRight size={15} />
            </Link>
            <p className={styles.joinNote}>
              Already a member?{' '}
              <Link to="/account/loyalty" className={styles.joinSignIn}>View your dashboard →</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
