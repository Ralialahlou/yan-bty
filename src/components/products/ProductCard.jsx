import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import Badge from '../common/Badge';
import RatingStars from '../common/RatingStars';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useBeautyProfile } from '../../context/BeautyProfileContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, layout = 'grid', showAllBadges = false }) {
  const { addItem } = useCart();
  const { openWishlistPicker, isWishlisted } = useAuth();
  const { isGoodForMe, profile } = useBeautyProfile();
  const wishlisted = isWishlisted(product.id);
  const goodForMe = profile ? isGoodForMe(product) : false;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
  };

  // PLP: show only the single highest-priority badge; PDP passes showAllBadges=true
  const badge = (() => {
    if (goodForMe) return <Badge variant="good">Good For You ✓</Badge>;
    if (product.isNew) return <Badge variant="new">New</Badge>;
    if (product.isBestseller) return <Badge variant="bestseller">Bestseller</Badge>;
    if (product.isEditorsPick) return <Badge variant="editors">Editor's Pick</Badge>;
    return null;
  })();

  return (
    <Link to={`/product/${product.id}`} className={[styles.card, styles[layout]].join(' ')}>
      <div className={styles.imageWrap}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.badges}>
          {showAllBadges ? (
            <>
              {product.isNew && <Badge variant="new">New</Badge>}
              {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
              {product.isEditorsPick && <Badge variant="editors">Editor's Pick</Badge>}
              {goodForMe && <Badge variant="good">Good For You ✓</Badge>}
            </>
          ) : badge}
        </div>
        <button
          className={[styles.wishlistBtn, wishlisted ? styles.wishlisted : ''].join(' ')}
          onClick={e => { e.preventDefault(); openWishlistPicker(product.id); }}
          aria-label="Save to wishlist"
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
        <button
          className={styles.quickAdd}
          onClick={handleAddToCart}
          aria-label="Add to bag"
        >
          <ShoppingBag size={14} />
          <span>Add to Bag</span>
        </button>
      </div>

      <div className={styles.info}>
        <p className={styles.brand}>{product.brandName}</p>
        <p className={styles.name}>{product.name}</p>
        {product.shortDescription && (
          <p className={styles.desc}>{product.shortDescription}</p>
        )}
        <div className={styles.bottom}>
          <div className={styles.certifications}>
            {product.certifications?.slice(0, 2).map(cert => (
              <span key={cert} className={styles.cert}>{cert}</span>
            ))}
            {product.pregnancySafe && (
              <span className={styles.certPreg}>Pregnancy-Safe</span>
            )}
          </div>
          {product.rating && (
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
          )}
          <p className={styles.price}>
            {product.sizes && product.sizes.length > 1 && 'From '}
            {Math.min(...(product.sizes?.length ? product.sizes.map(s => s.price) : [product.price])).toLocaleString()} MAD
          </p>
        </div>
      </div>
    </Link>
  );
}
