import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { editorialArticles, routineSteps } from '../data/editorial';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import styles from './JournalPage.module.css';

const categories = ['All', 'Skincare Routines', 'Ingredient Deep Dives', 'Seasonal Guides', 'Expert Advice', 'Brand Stories'];

export default function JournalPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('category');
  const [activeCat, setActiveCat] = useState(catParam || 'All');
  const { addItem } = useCart();

  // Single article view
  if (slug) {
    const article = editorialArticles.find(a => a.slug === slug);
    if (!article) return <div className={styles.notFound}>Article not found.</div>;

    const recommendedProducts = article.recommendedProductIds
      ?.map(id => getProductById(id)).filter(Boolean) ?? [];

    return (
      <div className={styles.articlePage}>
        <div className="container">
          <Link to="/journal" className={styles.back}><ArrowLeft size={16} /> Back to Journal</Link>

          {/* Hero */}
          <div className={styles.articleHero}>
            <p className={styles.articleCategory}>{article.category}</p>
            <h1 className={styles.articleTitle}>{article.title}</h1>
            <div className={styles.articleMeta}>
              <span>{article.author}</span>
              <span>·</span>
              <span>{article.readTime}</span>
              <span>·</span>
              <span>{article.date}</span>
            </div>
          </div>

          <div className={styles.articleImage}>
            <img src={article.image} alt={article.title} />
          </div>

          {/* Rich sections or plain content */}
          <div className={styles.articleBody}>
            {article.sections ? (
              article.sections.map((section, i) => (
                <ArticleSection key={i} section={section} />
              ))
            ) : (
              <>
                <p className={styles.articleExcerpt}>{article.excerpt}</p>
                <p className={styles.articleContent}>{article.content}</p>
              </>
            )}

            {article.slug === 'how-to-build-skincare-routine' && (
              <div className={styles.routineBuilder}>
                <h3 className={styles.routineBuilderTitle}>Your 5-Step Routine</h3>
                <div className={styles.routineSteps}>
                  {routineSteps.map(step => (
                    <div key={step.step} className={styles.routineStep}>
                      <div className={styles.routineStepNum}>{step.step}</div>
                      <span className={styles.routineStepIcon}>{step.icon}</span>
                      <div>
                        <p className={styles.routineStepLabel}>{step.label}</p>
                        <p className={styles.routineStepDesc}>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Author bio */}
          {article.authorBio && (
            <div className={styles.authorBio}>
              {article.authorImage && (
                <img src={article.authorImage} alt={article.author} className={styles.authorImg} />
              )}
              <div>
                <p className={styles.authorName}>{article.author}</p>
                <p className={styles.authorText}>{article.authorBio}</p>
              </div>
            </div>
          )}

          {/* Recommended products */}
          {recommendedProducts.length > 0 && (
            <div className={styles.recommendations}>
              <div className={styles.recsHeader}>
                <p className={styles.recsLabel}>Shop the Edit</p>
                <h3 className={styles.recsTitle}>Products Featured in This Article</h3>
                <p className={styles.recsDesc}>
                  Niacinamide-rich formulas hand-picked by our team and dermatologist to complement every skin type.
                </p>
              </div>
              <div className={styles.recsGrid}>
                {recommendedProducts.map(product => (
                  <Link key={product.id} to={`/product/${product.id}`} className={styles.recCard}>
                    <div className={styles.recImg}>
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className={styles.recInfo}>
                      <p className={styles.recBrand}>{product.brandName}</p>
                      <p className={styles.recName}>{product.name}</p>
                      <p className={styles.recDesc}>{product.shortDescription}</p>
                      <div className={styles.recCerts}>
                        {product.certifications?.slice(0, 2).map(c => (
                          <span key={c} className={styles.recCert}>{c}</span>
                        ))}
                      </div>
                      <div className={styles.recBottom}>
                        <span className={styles.recPrice}>{product.price.toLocaleString()} MAD</span>
                        <button
                          className={styles.recAddBtn}
                          onClick={e => { e.preventDefault(); addItem(product); }}
                        >
                          <ShoppingBag size={14} />
                          Add to Bag
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* More articles */}
          <div className={styles.moreArticles}>
            <h3 className={styles.moreTitle}>Continue Reading</h3>
            <div className={styles.moreGrid}>
              {editorialArticles.filter(a => a.slug !== slug).slice(0, 3).map(a => (
                <Link key={a.id} to={`/journal/${a.slug}`} className={styles.moreCard}>
                  <div className={styles.moreImg}>
                    <img src={a.image} alt={a.title} />
                  </div>
                  <p className={styles.moreCat}>{a.category}</p>
                  <p className={styles.moreCardTitle}>{a.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Journal index
  const filtered = activeCat === 'All'
    ? editorialArticles
    : editorialArticles.filter(a => a.category === activeCat);

  const [featured, ...rest] = filtered;

  return (
    <div className={styles.page}>
      <div className={styles.pageHero}>
        <div className="container">
          <p className={styles.heroLabel}>Discover · Learn · Be Inspired</p>
          <h1 className={styles.heroTitle}>Beauty Journal</h1>
          <p className={styles.heroSub}>Expert advice, ingredient guides, and seasonal beauty inspiration curated by our team.</p>
        </div>
      </div>

      <div className="container">
        {/* Categories */}
        <div className={styles.categories}>
          {categories.map(cat => (
            <button
              key={cat}
              className={[styles.catBtn, activeCat === cat ? styles.catBtnActive : ''].join(' ')}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured article */}
        {featured && (
          <Link to={`/journal/${featured.slug}`} className={styles.featured}>
            <div className={styles.featuredImage}>
              <img src={featured.image} alt={featured.title} />
            </div>
            <div className={styles.featuredContent}>
              <p className={styles.featuredCategory}>{featured.category}</p>
              <h2 className={styles.featuredTitle}>{featured.title}</h2>
              <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
              <div className={styles.featuredMeta}>
                <span>{featured.author}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
            </div>
          </Link>
        )}

        {/* Article grid */}
        <div className={styles.grid}>
          {rest.map(article => (
            <Link key={article.id} to={`/journal/${article.slug}`} className={styles.card}>
              <div className={styles.cardImage}>
                <img src={article.image} alt={article.title} />
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardCategory}>{article.category}</p>
                <h3 className={styles.cardTitle}>{article.title}</h3>
                <p className={styles.cardExcerpt}>{article.excerpt}</p>
                <div className={styles.cardMeta}>
                  <span>{article.readTime}</span>
                  <span>·</span>
                  <span>{article.author}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArticleSection({ section }) {
  switch (section.type) {
    case 'intro':
      return <p className={styles.articleIntro}>{section.text}</p>;

    case 'heading':
      return <h2 className={styles.articleHeading}>{section.text}</h2>;

    case 'text':
      return <p className={styles.articlePara}>{section.text}</p>;

    case 'pullquote':
      return (
        <blockquote className={styles.pullquote}>
          <p className={styles.pullquoteText}>{section.text}</p>
          {section.attribution && (
            <footer className={styles.pullquoteAttrib}>— {section.attribution}</footer>
          )}
        </blockquote>
      );

    case 'image':
      return (
        <figure className={styles.articleFigure}>
          <img src={section.src} alt={section.caption} className={styles.articleFigureImg} />
          {section.caption && <figcaption className={styles.articleFigureCaption}>{section.caption}</figcaption>}
        </figure>
      );

    case 'benefits':
      return (
        <div className={styles.benefitsGrid}>
          {section.items.map((item, i) => (
            <div key={i} className={styles.benefitCard}>
              <div className={styles.benefitNum}>{String(i + 1).padStart(2, '0')}</div>
              <h4 className={styles.benefitTitle}>{item.title}</h4>
              <p className={styles.benefitText}>{item.text}</p>
            </div>
          ))}
        </div>
      );

    case 'steps':
      return (
        <div className={styles.stepsBlock}>
          {section.items.map(item => (
            <div key={item.step} className={styles.stepRow}>
              <div className={styles.stepCircle}>{item.step}</div>
              <div>
                <p className={styles.stepLabel}>{item.label}</p>
                <p className={styles.stepText}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
