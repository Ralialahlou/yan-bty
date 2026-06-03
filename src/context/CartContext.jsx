import { createContext, useContext, useReducer, useState } from 'react';

const CartContext = createContext(null);

const initialState = { items: [], isOpen: false };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        i => i.id === action.item.id && i.variantId === action.item.variantId && i.sizeLabel === action.item.sizeLabel
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.item.id && i.variantId === action.item.variantId && i.sizeLabel === action.item.sizeLabel
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.item, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.cartKey !== action.cartKey) };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.cartKey === action.cartKey ? { ...i, quantity: action.quantity } : i
        ).filter(i => i.quantity > 0),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [giftMessage, setGiftMessage] = useState('');
  const [selectedSamples, setSelectedSamples] = useState([]);

  const addItem = (product, variantId = null, sizeLabel = null) => {
    const cartKey = `${product.id}-${variantId || 'default'}-${sizeLabel || 'default'}`;
    dispatch({
      type: 'ADD_ITEM',
      item: {
        id: product.id,
        cartKey,
        name: product.name,
        brand: product.brandName,
        price: sizeLabel
          ? (product.sizes?.find(s => s.label === sizeLabel)?.price ?? product.price)
          : product.price,
        image: product.image,
        variantId,
        variantName: variantId
          ? product.variants?.find(v => v.id === variantId)?.name
          : null,
        sizeLabel,
      },
    });
    dispatch({ type: 'OPEN' });
  };

  const removeItem = (cartKey) => dispatch({ type: 'REMOVE_ITEM', cartKey });
  const updateQty = (cartKey, quantity) => dispatch({ type: 'UPDATE_QTY', cartKey, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR' });
  const openCart = () => dispatch({ type: 'OPEN' });
  const closeCart = () => dispatch({ type: 'CLOSE' });

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const freeShippingThreshold = 500;
  const shippingCost = subtotal >= freeShippingThreshold ? 0 : 49;

  return (
    <CartContext.Provider value={{
      items: state.items,
      isOpen: state.isOpen,
      subtotal,
      itemCount,
      shippingCost,
      freeShippingThreshold,
      giftMessage,
      setGiftMessage,
      selectedSamples,
      setSelectedSamples,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      openCart,
      closeCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
