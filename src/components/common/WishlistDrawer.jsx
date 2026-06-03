import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, Trash2, ShoppingBag, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { getProductById } from '../../data/products';
import styles from './WishlistDrawer.module.css';

export default function WishlistDrawer({ onClose }) {
  const { wishlists, removeFromWishlist, deleteWishlist, createWishlist, user } = useAuth();
  const { addItem } = useCart();
  const [activeList, setActiveList] = useState(wishlists[0]?.id ?? null);
  const [newListName, setNewListName] = useState('');
  const [creatingNew, setCreatingNew] = useState(false);

  const currentList = wishlists.find(wl => wl.id === activeList);
  const products = currentList?.productIds.map(id => getProductById(id)).filter(Boolean) ?? [];

  const handleCreate = () => {
    if (!newListName.trim()) return;
    const id = createWishlist(newListName.trim());
    setActiveList(id);
    setNewListName('');
    setCreatingNew(false);
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <aside className={styles.drawer}>
        <div className={styles.head}>
          <div className={styles.headLeft}>
            <Heart size={18} className={styles.heartIcon} />
            <span>My Wishlists</span>
          </div>
          <button onClick={onClose} className={styles.close}><X size={20} /></button>
        </div>

        {/* List tabs */}
        <div className={styles.tabs}>
          {wishlists.map(wl => (
            <button
              key={wl.id}
              className={[styles.tab, activeList === wl.id ? styles.tabActive : ''].join(' ')}
              onClick={() => setActiveList(wl.id)}
            >
              {wl.name}
              <span className={styles.tabCount}>{wl.productIds.length}</span>
            </button>
          ))}
          <button className={styles.newTabBtn} onClick={() => setCreatingNew(true)}>
            <Plus size={13} />
          </button>
        </div>

        {creatingNew && (
          <div className={styles.newListRow}>
            <input
              autoFocus
              className={styles.newListInput}
              value={newListName}
              onChange={e => setNewListName(e.target.value)}
              placeholder="List name..."
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
            />
            <button className={styles.newListSave} onClick={handleCreate}>Create</button>
            <button className={styles.newListCancel} onClick={() => setCreatingNew(false)}><X size={14} /></button>
          </div>
        )}

        {/* Products */}
        <div className={styles.products}>
          {products.length === 0 ? (
            <div className={styles.empty}>
              <Heart size={32} className={styles.emptyIcon} />
              <p>Nothing saved yet</p>
              <Link to="/shop" onClick={onClose} className={styles.emptyLink}>Discover products</Link>
            </div>
          ) : (
            products.map(product => (
              <div key={product.id} className={styles.item}>
                <Link to={`/product/${product.id}`} onClick={onClose} className={styles.itemImg}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <div className={styles.itemInfo}>
                  <p className={styles.itemBrand}>{product.brandName}</p>
                  <Link to={`/product/${product.id}`} onClick={onClose} className={styles.itemName}>
                    {product.name}
                  </Link>
                  <p className={styles.itemPrice}>{product.price.toLocaleString()} MAD</p>
                  <button
                    className={styles.itemAdd}
                    onClick={() => { addItem(product); onClose(); }}
                  >
                    <ShoppingBag size={12} /> Add to Bag
                  </button>
                </div>
                <button
                  className={styles.itemRemove}
                  onClick={() => removeFromWishlist(product.id, currentList.id)}
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Delete list option */}
        {currentList && wishlists.length > 1 && (
          <div className={styles.footer}>
            <button
              className={styles.deleteList}
              onClick={() => {
                deleteWishlist(currentList.id);
                setActiveList(wishlists.find(wl => wl.id !== currentList.id)?.id ?? null);
              }}
            >
              <Trash2 size={13} /> Delete list
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
