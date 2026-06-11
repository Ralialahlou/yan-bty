import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, Gift, ChevronRight, Heart, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { getProductById } from '../../data/products';
import Button from '../common/Button';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const {
    isOpen, closeCart, items, subtotal, itemCount,
    shippingCost, freeShippingThreshold, removeItem, updateQty,
    giftMessage, setGiftMessage,
  } = useCart();
  const { wishlists, user } = useAuth();

  // Wishlist upsell: products saved but not in cart
  const cartIds = new Set(items.map(i => i.id));
  const wishlistUpsell = user
    ? wishlists.flatMap(wl => wl.productIds.map(id => getProductById(id)).filter(Boolean))
        .filter((p, i, arr) => p && !cartIds.has(p.id) && arr.findIndex(x => x?.id === p.id) === i)
        .slice(0, 3)
    : [];

  const remaining = freeShippingThreshold - subtotal;

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={closeCart} />
      <aside className={styles.drawer} role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className={styles.head}>
          <div className={styles.headLeft}>
            <ShoppingBag size={18} aria-hidden="true" />
            <span className={styles.headTitle}>My Bag</span>
            {itemCount > 0 && <span className={styles.headCount} aria-hidden="true">{itemCount}</span>}
          </div>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Close cart"><X size={20} aria-hidden="true" /></button>
        </div>

        {remaining > 0 && (
          <div className={styles.freeShipping}>
            <div className={styles.freeShippingBar} style={{ '--progress': `${Math.max(0, (subtotal / freeShippingThreshold) * 100)}%` }} />
            <p>Add <strong>{remaining.toFixed(0)} MAD</strong> more for free delivery</p>
          </div>
        )}
        {remaining <= 0 && subtotal > 0 && (
          <div className={styles.freeShippingSuccess}>
            ✓ You've unlocked free delivery!
          </div>
        )}

        {items.length === 0 ? (
          <div className={styles.empty}>
            <ShoppingBag size={48} className={styles.emptyIcon} />
            <p className={styles.emptyTitle}>Your bag is empty</p>
            <p className={styles.emptyDesc}>Discover our curated selection of beauty brands</p>
            <Link to="/shop" onClick={closeCart} className={styles.startShoppingBtn}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map(item => (
                <div key={item.cartKey} className={styles.item}>
                  <img src={item.image} alt={item.name} className={styles.itemImg} />
                  <div className={styles.itemInfo}>
                    <p className={styles.itemBrand}>{item.brand}</p>
                    <p className={styles.itemName}>{item.name}</p>
                    {item.variantName && <p className={styles.itemVariant}>{item.variantName}</p>}
                    {item.sizeLabel && <p className={styles.itemVariant}>{item.sizeLabel}</p>}
                    <div className={styles.itemActions}>
                      <div className={styles.qty}>
                        <button onClick={() => updateQty(item.cartKey, item.quantity - 1)} className={styles.qtyBtn} aria-label={`Decrease quantity of ${item.name}`}>
                          <Minus size={12} aria-hidden="true" />
                        </button>
                        <span className={styles.qtyNum} aria-live="polite" aria-label={`Quantity: ${item.quantity}`}>{item.quantity}</span>
                        <button onClick={() => updateQty(item.cartKey, item.quantity + 1)} className={styles.qtyBtn} aria-label={`Increase quantity of ${item.name}`}>
                          <Plus size={12} aria-hidden="true" />
                        </button>
                      </div>
                      <span className={styles.itemPrice}>{(item.price * item.quantity).toLocaleString()} MAD</span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.cartKey)} className={styles.removeBtn} aria-label={`Remove ${item.name} from cart`}>
                    <X size={14} aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>

            {/* Gift message moved to shipping step in checkout */}

            {/* Wishlist upsell — show first item only, link to see more */}
            {wishlistUpsell.length > 0 && (
              <div className={styles.upsell}>
                <div className={styles.upsellHeader}>
                  <p className={styles.upsellTitle}>
                    <Heart size={13} fill="currentColor" />
                    From Your Wishlist
                  </p>
                  {wishlistUpsell.length > 1 && (
                    <Link
                      to="/account/wishlist"
                      onClick={closeCart}
                      className={styles.upsellSeeMore}
                    >
                      See all {wishlistUpsell.length} <ArrowRight size={11} />
                    </Link>
                  )}
                </div>
                {/* Only the first item — keeps cart items visible */}
                <UpsellItem product={wishlistUpsell[0]} onClose={closeCart} />
              </div>
            )}

            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString()} MAD</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Delivery</span>
                <span>{shippingCost === 0 ? 'Free' : `${shippingCost} MAD`}</span>
              </div>
            </div>

            <div className={styles.cta}>
              <Link to="/checkout" onClick={closeCart} className={styles.checkoutBtn}>
                Checkout · {(subtotal + shippingCost).toLocaleString()} MAD
              </Link>
              <button className={styles.continueShopping} onClick={closeCart}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function UpsellItem({ product, onClose }) {
  const { addItem } = useCart();
  return (
    <div className={styles.upsellItem}>
      <Link to={`/product/${product.id}`} onClick={onClose} className={styles.upsellImg}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className={styles.upsellInfo}>
        <p className={styles.upsellBrand}>{product.brandName}</p>
        <p className={styles.upsellName}>{product.name}</p>
        <p className={styles.upsellPrice}>{product.price.toLocaleString()} MAD</p>
      </div>
      <button
        className={styles.upsellAdd}
        onClick={() => addItem(product)}
        aria-label="Add to bag"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
