import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ChevronDown, ChevronUp, ArrowLeft, Package, Truck, RefreshCcw, MapPin, Check, X } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import RatingStars from '../components/common/RatingStars';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { getProductById, products } from '../data/products';
import SEO from '../components/common/SEO';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useBeautyProfile } from '../context/BeautyProfileContext';
import styles from './ProductDetailPage.module.css';

const MOCK_REVIEWS = [
  { id: 1, name: 'Nadia B.', rating: 5, skinType: 'Combination', age: '25-35', text: 'Absolutely love this product. My skin has never looked better — my dark spots have visibly faded in just 3 weeks.', date: '2025-11-10', verified: true },
  { id: 2, name: 'Sophia L.', rating: 4, skinType: 'Dry', age: '35-45', text: 'Good product overall. Takes a few weeks to see results but definitely worth the wait. The texture is gorgeous.', date: '2025-10-25', verified: true },
  { id: 3, name: 'Amira K.', rating: 5, skinType: 'Sensitive', age: '25-35', text: 'I was worried it would irritate my sensitive skin but it\'s incredibly gentle. I see brighter, more even skin every morning.', date: '2025-10-18', verified: true },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useAuth();
  const { isGoodForMe, profile } = useBeautyProfile();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]?.id ?? null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]?.label ?? null);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('description');
  const [adding, setAdding] = useState(false);
  const [storeModalOpen, setStoreModalOpen] = useState(false);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <p>Product not found.</p>
        <Button variant="primary" onClick={() => navigate('/shop')}>Back to Shop</Button>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const goodForMe = profile ? isGoodForMe(product) : false;
  const currentPrice = selectedSize
    ? (product.sizes?.find(s => s.label === selectedSize)?.price ?? product.price)
    : product.price;

  const handleAddToCart = async () => {
    setAdding(true);
    addItem(product, selectedVariant, selectedSize);
    await new Promise(r => setTimeout(r, 600));
    setAdding(false);
  };

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className={styles.page}>
      <SEO
        title={`${product.name} — ${product.brandName}`}
        description={`${product.shortDescription} ${product.description?.slice(0, 120)}...`}
        image={product.images?.[0] ?? product.image}
        path={`/product/${product.id}`}
        type="product"
      />
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/shop">Shop</Link>
          <span>›</span>
          <Link to={`/shop/${product.category}`}>{product.category}</Link>
          <span>›</span>
          <span>{product.name}</span>
        </nav>

        <div className={styles.pdp}>
          {/* Images */}
          <div className={styles.images}>
            <div className={styles.thumbnails}>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={[styles.thumb, selectedImage === i ? styles.thumbActive : ''].join(' ')}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} />
                </button>
              ))}
            </div>
            <div className={styles.mainImage}>
              <img src={product.images[selectedImage]} alt={product.name} />
              <div className={styles.imageBadges}>
                {product.isNew && <Badge variant="new">New</Badge>}
                {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
                {goodForMe && <Badge variant="good">Good For You ✓</Badge>}
              </div>
              <button
                className={styles.wishlistBtn}
                onClick={() => toggleWishlist(product.id)}
                aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
                aria-pressed={wishlisted}
              >
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className={styles.info}>
            <div className={styles.brandRow}>
              <Link to={`/brand/${product.brand}`} className={styles.brand}>{product.brandName}</Link>
              {product.brand === 'yan-one' && <Badge variant="own">Our Brand</Badge>}
            </div>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.shortDesc}>{product.shortDescription}</p>

            <div className={styles.ratingRow}>
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
            </div>

            {/* Certifications */}
            <div className={styles.certifications}>
              {product.certifications?.map(cert => (
                <span key={cert} className={styles.cert}>{cert}</span>
              ))}
              {product.pregnancySafe && <span className={styles.certPreg}>Pregnancy-Safe</span>}
            </div>

            {/* Good for you */}
            {goodForMe && (
              <div className={styles.goodForYou}>
                <Star size={14} fill="currentColor" />
                <span>Good for your {profile?.skinType} skin</span>
              </div>
            )}

            {/* Price */}
            <div className={styles.priceRow}>
              <span className={styles.price}>{currentPrice.toLocaleString()} MAD</span>
            </div>

            {/* Size selector */}
            {product.sizes?.length > 1 && (
              <div className={styles.optionGroup}>
                <p className={styles.optionLabel}>Size</p>
                <div className={styles.optionButtons}>
                  {product.sizes.map(size => (
                    <button
                      key={size.label}
                      className={[styles.optionBtn, selectedSize === size.label ? styles.optionBtnActive : ''].join(' ')}
                      onClick={() => setSelectedSize(size.label)}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variant selector — color swatches or text buttons */}
            {product.variants?.length > 0 && (
              <div className={styles.optionGroup}>
                <p className={styles.optionLabel}>
                  Shade
                  {selectedVariant && (
                    <span className={styles.selectedShadeName}>
                      : {product.variants.find(v => v.id === selectedVariant)?.name}
                    </span>
                  )}
                </p>
                {product.variantType === 'color' ? (
                  <div className={styles.swatches}>
                    {product.variants.map(v => (
                      <button
                        key={v.id}
                        className={[
                          styles.swatch,
                          selectedVariant === v.id ? styles.swatchActive : '',
                          !v.inStock ? styles.swatchOos : '',
                        ].join(' ')}
                        style={{ '--swatch-color': v.hex }}
                        onClick={() => v.inStock && setSelectedVariant(v.id)}
                        title={v.inStock ? v.name : `${v.name} — Out of stock`}
                        aria-label={v.name}
                      >
                        {!v.inStock && <span className={styles.swatchOosLine} />}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className={styles.optionButtons}>
                    {product.variants.map(v => (
                      <button
                        key={v.id}
                        className={[
                          styles.optionBtn,
                          selectedVariant === v.id ? styles.optionBtnActive : '',
                          !v.inStock ? styles.optionBtnOos : '',
                        ].join(' ')}
                        onClick={() => v.inStock && setSelectedVariant(v.id)}
                        disabled={!v.inStock}
                        title={!v.inStock ? 'Out of stock' : v.name}
                      >
                        {v.name.split('–')[1]?.trim() || v.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div className={styles.qtyRow}>
              <div className={styles.qty}>
                <button
                  className={styles.qtyBtn}
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >−</button>
                <span className={styles.qtyNum} aria-live="polite" aria-label={`Quantity: ${quantity}`}>{quantity}</span>
                <button
                  className={styles.qtyBtn}
                  aria-label="Increase quantity"
                  onClick={() => setQuantity(q => q + 1)}
                >+</button>
              </div>
            </div>

            {/* Add to cart */}
            <div className={styles.actions}>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                loading={adding}
              >
                <ShoppingBag size={18} />
                Add to Bag · {(currentPrice * quantity).toLocaleString()} MAD
              </Button>
              <button
                className={[styles.wishlistFullBtn, wishlisted ? styles.wishlisted : ''].join(' ')}
                onClick={() => toggleWishlist(product.id)}
                aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
                aria-pressed={wishlisted}
              >
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} aria-hidden="true" />
              </button>
            </div>

            {/* Find in store */}
            <button
              className={styles.findInStoreBtn}
              onClick={() => setStoreModalOpen(true)}
            >
              <MapPin size={16} />
              Find in Store
            </button>

            {/* Store availability modal */}
            {storeModalOpen && (
              <StoreAvailabilityModal
                productName={product.name}
                onClose={() => setStoreModalOpen(false)}
              />
            )}

            {/* Trust badges */}
            <div className={styles.trustBadges}>
              <div className={styles.trustBadge}>
                <Truck size={16} />
                <span>Free shipping over 500 MAD</span>
              </div>
              <div className={styles.trustBadge}>
                <Package size={16} />
                <span>Click & Collect available</span>
              </div>
              <div className={styles.trustBadge}>
                <RefreshCcw size={16} />
                <span>Easy returns</span>
              </div>
            </div>

            {/* Accordions */}
            <div className={styles.accordions}>
              <Accordion
                title="Description"
                open={openAccordion === 'description'}
                onToggle={() => setOpenAccordion(o => o === 'description' ? null : 'description')}
              >
                <p className={styles.accordionText}>{product.description}</p>
              </Accordion>

              <Accordion
                title="How to Use"
                open={openAccordion === 'howtouse'}
                onToggle={() => setOpenAccordion(o => o === 'howtouse' ? null : 'howtouse')}
              >
                <p className={styles.accordionText}>{product.howToUse}</p>
              </Accordion>

              <Accordion
                title="Key Ingredients"
                open={openAccordion === 'ingredients'}
                onToggle={() => setOpenAccordion(o => o === 'ingredients' ? null : 'ingredients')}
              >
                <div className={styles.ingredientsList}>
                  {product.keyIngredients?.map(ingredient => (
                    <div key={ingredient} className={styles.ingredient}>
                      <span className={styles.ingredientDot} />
                      <span className={styles.ingredientName}>{ingredient}</span>
                    </div>
                  ))}
                </div>
                {product.fullIngredients && (
                  <details className={styles.fullIngredients}>
                    <summary>View full ingredient list</summary>
                    <p className={styles.fullIngredientsList}>{product.fullIngredients}</p>
                  </details>
                )}
              </Accordion>

              <Accordion
                title="Suitable For"
                open={openAccordion === 'suitable'}
                onToggle={() => setOpenAccordion(o => o === 'suitable' ? null : 'suitable')}
              >
                {product.skinTypes?.length > 0 && (
                  <div className={styles.suitableRow}>
                    <p className={styles.suitableLabel}>Skin Types:</p>
                    <div className={styles.suitableTags}>
                      {product.skinTypes.map(s => <span key={s} className={styles.suitableTag}>{s}</span>)}
                    </div>
                  </div>
                )}
                {product.skinConcerns?.length > 0 && (
                  <div className={styles.suitableRow}>
                    <p className={styles.suitableLabel}>Concerns:</p>
                    <div className={styles.suitableTags}>
                      {product.skinConcerns.map(c => <span key={c} className={styles.suitableTag}>{c}</span>)}
                    </div>
                  </div>
                )}
              </Accordion>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className={styles.reviews}>
          <h2 className={styles.reviewsTitle}>Customer Reviews</h2>
          <div className={styles.reviewsOverview}>
            <div className={styles.reviewsScore}>
              <span className={styles.reviewsScoreNum}>{product.rating}</span>
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="lg" />
              <span className={styles.reviewsVerified}>All reviews verified</span>
            </div>
          </div>
          <div className={styles.reviewsList}>
            {MOCK_REVIEWS.map(review => (
              <div key={review.id} className={styles.review}>
                <div className={styles.reviewHeader}>
                  <div>
                    <p className={styles.reviewName}>{review.name}</p>
                    <div className={styles.reviewMeta}>
                      <span>{review.skinType} skin</span>
                      <span>·</span>
                      <span>Age {review.age}</span>
                      {review.verified && <span className={styles.reviewVerified}>✓ Verified</span>}
                    </div>
                  </div>
                  <div className={styles.reviewRight}>
                    <RatingStars rating={review.rating} size="sm" />
                    <span className={styles.reviewDate}>{review.date}</span>
                  </div>
                </div>
                <p className={styles.reviewText}>{review.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Awards */}
        {product.awards?.length > 0 && (
          <section className={styles.awards}>
            <div className={styles.awardsInner}>
              {product.awards.map(a => (
                <div key={a} className={styles.award}>
                  <Star size={14} fill="currentColor" className={styles.awardStar} />
                  <span className={styles.awardText}>{a}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* As Seen on Social Media */}
        {product.ugcImages?.length > 0 && (
          <section className={styles.ugcSection}>
            <div className={styles.ugcHeader}>
              <div>
                <p className={styles.ugcLabel}>#YanBTY</p>
                <h2 className={styles.ugcTitle}>As Seen on Social</h2>
              </div>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ugcFollowBtn}
              >
                Follow @yanbty
              </a>
            </div>
            <div className={styles.ugcGrid}>
              {product.ugcImages.map((ugc, i) => (
                <div key={i} className={styles.ugcItem}>
                  <img src={ugc.src} alt={`${product.name} by ${ugc.user}`} className={styles.ugcImg} loading="lazy" />
                  <div className={styles.ugcOverlay}>
                    <span className={styles.ugcUser}>{ugc.user}</span>
                    <span className={styles.ugcLikes}>♥ {ugc.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <section className={styles.related}>
            <h2 className={styles.relatedTitle}>You May Also Like</h2>
            <div className={styles.relatedGrid}>
              {related.map(p => <ProductCard key={p.id} product={p} showAllBadges />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function Accordion({ title, open, onToggle, children }) {
  return (
    <div className={styles.accordion}>
      <button className={styles.accordionHead} onClick={onToggle}>
        <span>{title}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className={styles.accordionBody}>{children}</div>}
    </div>
  );
}

const STORES = [
  { id: 1, name: 'Morocco Mall', city: 'Casablanca', inStock: true, qty: 'In stock' },
  { id: 2, name: 'Maarif', city: 'Casablanca', inStock: true, qty: 'In stock' },
  { id: 3, name: 'Marina', city: 'Agadir', inStock: false, qty: 'Out of stock' },
  { id: 4, name: 'Tangier', city: 'Tangier', inStock: true, qty: 'Low stock' },
  { id: 5, name: 'Mega Mall', city: 'Rabat', inStock: true, qty: 'In stock' },
  { id: 6, name: 'Morocco Mall', city: 'Marrakech', inStock: false, qty: 'Out of stock' },
];

function StoreAvailabilityModal({ productName, onClose }) {
  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.modalHead}>
          <div>
            <p className={styles.modalSub}>Store Availability</p>
            <h3 className={styles.modalTitle}>{productName}</h3>
          </div>
          <button onClick={onClose} className={styles.modalClose}><X size={20} /></button>
        </div>
        <div className={styles.storeList}>
          {STORES.map(store => (
            <div key={store.id} className={styles.storeRow}>
              <div className={styles.storeRowLeft}>
                <MapPin size={14} className={styles.storePin} />
                <div>
                  <p className={styles.storeName}>Yan BTY {store.name}</p>
                  <p className={styles.storeCity}>{store.city}</p>
                </div>
              </div>
              <span className={[
                styles.storeStock,
                store.inStock ? styles.storeStockIn : styles.storeStockOut,
                store.qty === 'Low stock' ? styles.storeStockLow : '',
              ].join(' ')}>
                {store.inStock ? <Check size={12} /> : <X size={12} />}
                {store.qty}
              </span>
            </div>
          ))}
        </div>
        <p className={styles.storeNote}>Stock levels update daily. Call ahead to confirm availability.</p>
      </div>
    </>
  );
}
