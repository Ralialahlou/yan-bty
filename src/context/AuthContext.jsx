import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const DEFAULT_WISHLISTS = [
  { id: 'wl-faves', name: 'My Favourites', productIds: ['yo-001', 'ct-001', 'de-001'] },
  { id: 'wl-routine', name: 'Skincare Routine', productIds: ['yo-002', 'lrp-001'] },
];

const MOCK_USER = {
  id: 'u-001',
  name: 'Layla Benhaddou',
  email: 'layla@example.com',
  loyaltyPoints: 1240,
  tier: 'Gold',
  spendThisYear: 2240,
  orders: [
    { id: 'ORD-2025-001', date: '2025-11-01', total: 1340, status: 'Delivered', items: 3 },
    { id: 'ORD-2025-002', date: '2025-10-15', total: 580, status: 'Delivered', items: 1 },
  ],
  savedAddresses: [
    { id: 'addr-1', label: 'Home', name: 'Layla Benhaddou', line1: '12 Rue Ibn Battuta', city: 'Casablanca', zip: '20000', country: 'Morocco', isDefault: true },
  ],
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [wishlists, setWishlists] = useState(DEFAULT_WISHLISTS);
  // { productId, anchorRect } — drives the picker modal
  const [wishlistPicker, setWishlistPicker] = useState(null);

  const login = (email, password) => {
    setUser({ ...MOCK_USER, email });
    setIsAuthOpen(false);
    return Promise.resolve();
  };

  const register = (name, email, password) => {
    setUser({ ...MOCK_USER, name, email, loyaltyPoints: 0, tier: 'Silver', spendThisYear: 0, orders: [] });
    setIsAuthOpen(false);
    return Promise.resolve();
  };

  const logout = () => setUser(null);

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  // Open the picker so user can choose/create a list
  const openWishlistPicker = (productId) => {
    if (!user) { openAuth('login'); return; }
    setWishlistPicker({ productId });
  };

  const closeWishlistPicker = () => setWishlistPicker(null);

  // Add product to a specific list
  const addToWishlist = (productId, listId) => {
    setWishlists(prev => prev.map(wl =>
      wl.id === listId && !wl.productIds.includes(productId)
        ? { ...wl, productIds: [...wl.productIds, productId] }
        : wl
    ));
  };

  // Remove product from a specific list
  const removeFromWishlist = (productId, listId) => {
    setWishlists(prev => prev.map(wl =>
      wl.id === listId
        ? { ...wl, productIds: wl.productIds.filter(id => id !== productId) }
        : wl
    ));
  };

  // Legacy: toggle in/out of "My Favourites" (default list)
  const toggleWishlist = (productId) => {
    if (!user) { openAuth('login'); return; }
    const defaultList = wishlists[0];
    if (!defaultList) return;
    if (defaultList.productIds.includes(productId)) {
      removeFromWishlist(productId, defaultList.id);
    } else {
      addToWishlist(productId, defaultList.id);
    }
  };

  const isWishlisted = (productId) =>
    user ? wishlists.some(wl => wl.productIds.includes(productId)) : false;

  const createWishlist = (name) => {
    const newList = { id: `wl-${Date.now()}`, name, productIds: [] };
    setWishlists(prev => [...prev, newList]);
    return newList.id;
  };

  const deleteWishlist = (listId) => {
    setWishlists(prev => prev.filter(wl => wl.id !== listId));
  };

  // All product IDs across all lists (for the header heart count)
  const wishlistCount = user ? new Set(wishlists.flatMap(wl => wl.productIds)).size : 0;

  return (
    <AuthContext.Provider value={{
      user,
      isAuthOpen,
      authMode,
      wishlists,
      wishlistPicker,
      wishlistCount,
      login,
      register,
      logout,
      openAuth,
      closeAuth: () => setIsAuthOpen(false),
      openWishlistPicker,
      closeWishlistPicker,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isWishlisted,
      createWishlist,
      deleteWishlist,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
