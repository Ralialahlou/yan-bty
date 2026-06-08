import { useState } from 'react';
import { X, Plus, Check, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './WishlistPicker.module.css';

export default function WishlistPicker() {
  const {
    wishlistPicker, closeWishlistPicker,
    wishlists, addToWishlist, removeFromWishlist, createWishlist,
  } = useAuth();
  const [newListName, setNewListName] = useState('');
  const [creating, setCreating] = useState(false);

  if (!wishlistPicker) return null;

  const { productId } = wishlistPicker;

  const handleToggle = (listId, isIn) => {
    if (isIn) {
      removeFromWishlist(productId, listId);
    } else {
      addToWishlist(productId, listId);
    }
  };

  const handleCreate = () => {
    if (!newListName.trim()) return;
    const newId = createWishlist(newListName.trim());
    addToWishlist(productId, newId);
    setNewListName('');
    setCreating(false);
    closeWishlistPicker();
  };

  return (
    <>
      <div className={styles.overlay} onClick={closeWishlistPicker} />
      <div className={styles.picker} role="dialog" aria-modal="true" aria-label="Save to Wishlist">
        <div className={styles.head}>
          <div className={styles.headLeft}>
            <Heart size={16} className={styles.heartIcon} aria-hidden="true" />
            <span>Save to Wishlist</span>
          </div>
          <button onClick={closeWishlistPicker} className={styles.close} aria-label="Close">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.lists}>
          {wishlists.map(wl => {
            const isIn = wl.productIds.includes(productId);
            return (
              <button
                key={wl.id}
                className={[styles.listItem, isIn ? styles.listItemActive : ''].join(' ')}
                onClick={() => handleToggle(wl.id, isIn)}
                aria-pressed={isIn}
              >
                <span className={styles.listName}>{wl.name}</span>
                <span className={styles.listCount}>{wl.productIds.length} items</span>
                {isIn && <Check size={14} className={styles.checkIcon} aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        <div className={styles.footer}>
          {creating ? (
            <div className={styles.newListForm}>
              <input
                autoFocus
                aria-label="New list name"
                className={styles.newListInput}
                value={newListName}
                onChange={e => setNewListName(e.target.value)}
                placeholder="List name..."
                onKeyDown={e => e.key === 'Enter' && handleCreate()}
              />
              <button className={styles.newListSave} onClick={handleCreate}>Save</button>
              <button className={styles.newListCancel} onClick={() => setCreating(false)} aria-label="Cancel">
                <X size={14} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <button className={styles.createBtn} onClick={() => setCreating(true)}>
              <Plus size={14} aria-hidden="true" />
              Create new list
            </button>
          )}
        </div>
      </div>
    </>
  );
}
