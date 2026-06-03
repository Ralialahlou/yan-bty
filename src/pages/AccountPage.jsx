import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { User, Package, Heart, Star, MapPin, Settings, LogOut, ChevronRight, ChevronLeft, Plus, Edit2, Trash2, Check, Smartphone, ExternalLink } from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useBeautyProfile } from '../context/BeautyProfileContext';
import { products } from '../data/products';
import { skinTypes, skinConcerns } from '../data/categories';
import styles from './AccountPage.module.css';

// Mock order items for detail view
const MOCK_ORDER_ITEMS = {
  'ORD-2025-001': [
    { id: 'yo-002', name: 'Golden Glow Serum', brand: 'Yan&One', price: 690, qty: 1, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&q=80' },
    { id: 'lrp-001', name: 'Toleriane Double Repair', brand: 'La Roche-Posay', price: 340, qty: 1, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { id: 'ct-001', name: 'Pillow Talk Lipstick', brand: 'Charlotte Tilbury', price: 520, qty: 1, image: 'https://images.unsplash.com/photo-1599733594230-6b823276abcc?w=200&q=80' },
  ],
  'ORD-2025-002': [
    { id: 'yo-001', name: 'Luminous Veil Foundation', brand: 'Yan&One', price: 580, qty: 1, image: 'https://images.unsplash.com/photo-1631214500004-f8b36869f28e?w=200&q=80' },
  ],
};

export default function AccountPage() {
  const { section } = useParams();
  const navigate = useNavigate();
  // Single useAuth() call — merging all required slices (previously called twice, bug fixed)
  const { user, openAuth, logout, wishlists, removeFromWishlist, login, register } = useAuth();
  const { profile, saveProfile } = useBeautyProfile();

  // Auth form state
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);

  // Profile edit state
  const [profileEdit, setProfileEdit] = useState(
    user ? { firstName: user.name.split(' ')[0] || '', lastName: user.name.split(' ')[1] || '', gender: '', birthday: '' } : {}
  );
  const [profileSaved, setProfileSaved] = useState(false);

  // Beauty profile state
  const [beautyProfile, setBeautyProfile] = useState(profile ?? { skinType: '', concerns: [], preferences: [] });
  const [beautyProfileSaved, setBeautyProfileSaved] = useState(false);

  // Addresses state
  const [addresses, setAddresses] = useState(user?.savedAddresses ?? []);
  const [editingAddr, setEditingAddr] = useState(null);
  const [newAddrForm, setNewAddrForm] = useState({ label: 'Home', name: '', line1: '', city: '', zip: '', country: 'Morocco' });

  // Orders detail
  const [openOrderId, setOpenOrderId] = useState(null);

  const wishlistProducts = wishlists.flatMap(wl =>
    wl.productIds.map(id => products.find(p => p.id === id)).filter(Boolean)
  );

  const currentSection = section || 'profile';

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(loginForm.email, loginForm.password);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    await register(registerForm.name, registerForm.email, registerForm.password);
  };

  const handleSaveProfile = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleSaveBeautyProfile = () => {
    saveProfile(beautyProfile);
    setBeautyProfileSaved(true);
    setTimeout(() => setBeautyProfileSaved(false), 2500);
  };

  const toggleConcern = (c) => {
    setBeautyProfile(p => ({
      ...p,
      concerns: p.concerns?.includes(c) ? p.concerns.filter(x => x !== c) : [...(p.concerns ?? []), c],
    }));
  };

  const togglePref = (pref) => {
    setBeautyProfile(p => ({
      ...p,
      preferences: p.preferences?.includes(pref) ? p.preferences.filter(x => x !== pref) : [...(p.preferences ?? []), pref],
    }));
  };

  const saveAddress = () => {
    if (editingAddr === 'new') {
      setAddresses(a => [...a, { ...newAddrForm, id: `addr-${Date.now()}` }]);
    } else {
      setAddresses(a => a.map(addr => addr.id === editingAddr ? { ...newAddrForm, id: editingAddr } : addr));
    }
    setEditingAddr(null);
    setNewAddrForm({ label: 'Home', name: '', line1: '', city: '', zip: '', country: 'Morocco' });
  };

  const deleteAddress = (id) => setAddresses(a => a.filter(addr => addr.id !== id));

  const openEdit = (addr) => {
    setEditingAddr(addr.id);
    setNewAddrForm({ label: addr.label, name: addr.name, line1: addr.line1, city: addr.city, zip: addr.zip, country: addr.country });
  };

  if (!user) {
    return (
      <div className={styles.authPage}>
        <div className={styles.authCard}>
          <h1 className={styles.authTitle}>{isLogin ? 'Sign In' : 'Create Account'}</h1>
          <p className={styles.authSub}>{isLogin ? 'Welcome back to Yan BTY' : 'Join the Yan BTY community'}</p>
          {isLogin ? (
            <form onSubmit={handleLogin} className={styles.authForm}>
              <div><label className={styles.label}>Email</label><input className={styles.input} type="email" value={loginForm.email} onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" /></div>
              <div><label className={styles.label}>Password</label><input className={styles.input} type="password" value={loginForm.password} onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" /></div>
              <Button variant="primary" fullWidth type="submit" size="lg">Sign In</Button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className={styles.authForm}>
              <div><label className={styles.label}>Name</label><input className={styles.input} value={registerForm.name} onChange={e => setRegisterForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" /></div>
              <div><label className={styles.label}>Email</label><input className={styles.input} type="email" value={registerForm.email} onChange={e => setRegisterForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" /></div>
              <div><label className={styles.label}>Password</label><input className={styles.input} type="password" value={registerForm.password} onChange={e => setRegisterForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" /></div>
              <Button variant="primary" fullWidth type="submit" size="lg">Create Account</Button>
            </form>
          )}
          <button className={styles.authSwitch} onClick={() => setIsLogin(l => !l)}>
            {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    { icon: <User size={16} />, label: 'My Profile', id: 'profile' },
    { icon: <Package size={16} />, label: 'Orders', id: 'orders' },
    { icon: <Heart size={16} />, label: 'Wishlist', id: 'wishlist' },
    { icon: <Star size={16} />, label: 'Loyalty — kenzup', id: 'loyalty' },
    { icon: <MapPin size={16} />, label: 'Addresses', id: 'addresses' },
    { icon: <Settings size={16} />, label: 'Beauty Profile', id: 'beauty-profile' },
  ];

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.userCard}>
              <div className={styles.avatar}>{user.name[0]}</div>
              <div>
                <p className={styles.userName}>{user.name}</p>
                <p className={styles.userEmail}>{user.email}</p>
                <p className={styles.userTier}><Star size={10} fill="currentColor" /> {user.tier} Member · {user.loyaltyPoints?.toLocaleString()} pts</p>
              </div>
            </div>
            <nav className={styles.nav}>
              {navItems.map(item => (
                <Link
                  key={item.id}
                  to={`/account/${item.id}`}
                  className={[styles.navLink, currentSection === item.id ? styles.navLinkActive : ''].join(' ')}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  <ChevronRight size={14} className={styles.navArrow} />
                </Link>
              ))}
            </nav>
            <button className={styles.logoutBtn} onClick={logout}>
              <LogOut size={16} /> Sign Out
            </button>
          </aside>

          {/* Content */}
          <div className={styles.content}>

            {/* ── MY PROFILE ── */}
            {currentSection === 'profile' && (
              <div>
                <h1 className={styles.pageTitle}>My Profile</h1>
                <div className={styles.profileForm}>
                  <div className={styles.profileAvatar}>
                    <div className={styles.profileAvatarCircle}>{user.name[0]}</div>
                    <button className={styles.profileAvatarEdit}><Edit2 size={14} /> Change photo</button>
                  </div>
                  <div className={styles.formGrid}>
                    <div>
                      <label className={styles.label}>First Name</label>
                      <input className={styles.input} value={profileEdit.firstName} onChange={e => setProfileEdit(p => ({ ...p, firstName: e.target.value }))} placeholder="Layla" />
                    </div>
                    <div>
                      <label className={styles.label}>Last Name</label>
                      <input className={styles.input} value={profileEdit.lastName} onChange={e => setProfileEdit(p => ({ ...p, lastName: e.target.value }))} placeholder="Benhaddou" />
                    </div>
                    <div>
                      <label className={styles.label}>Email Address</label>
                      <input className={styles.input} type="email" value={user.email} readOnly disabled />
                    </div>
                    <div>
                      <label className={styles.label}>Gender</label>
                      <select className={styles.input} value={profileEdit.gender} onChange={e => setProfileEdit(p => ({ ...p, gender: e.target.value }))}>
                        <option value="">Prefer not to say</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="nonbinary">Non-binary</option>
                      </select>
                    </div>
                    <div>
                      <label className={styles.label}>Date of Birth</label>
                      <input className={styles.input} type="date" value={profileEdit.birthday} onChange={e => setProfileEdit(p => ({ ...p, birthday: e.target.value }))} />
                    </div>
                    <div>
                      <label className={styles.label}>Phone Number</label>
                      <input className={styles.input} placeholder="+212 6 00 00 00 00" />
                    </div>
                  </div>
                  <div className={styles.profileActions}>
                    <Button variant="primary" onClick={handleSaveProfile}>
                      {profileSaved ? <><Check size={16} /> Saved!</> : 'Save Changes'}
                    </Button>
                    <p className={styles.profileNote}>Your birthday earns you a bonus 100 kenzup points.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ── ORDERS ── */}
            {currentSection === 'orders' && (
              <div>
                <h1 className={styles.pageTitle}>My Orders</h1>
                {openOrderId ? (
                  <OrderDetail
                    order={user.orders?.find(o => o.id === openOrderId)}
                    items={MOCK_ORDER_ITEMS[openOrderId] ?? []}
                    onBack={() => setOpenOrderId(null)}
                  />
                ) : (
                  <div className={styles.ordersList}>
                    {user.orders?.length ? user.orders.map(order => {
                      const items = MOCK_ORDER_ITEMS[order.id] ?? [];
                      return (
                        <button
                          key={order.id}
                          className={styles.orderCard}
                          onClick={() => setOpenOrderId(order.id)}
                        >
                          <div className={styles.orderImages}>
                            {items.slice(0, 3).map(item => (
                              <img key={item.id} src={item.image} alt={item.name} className={styles.orderThumb} />
                            ))}
                            {items.length > 3 && <span className={styles.orderMoreImg}>+{items.length - 3}</span>}
                          </div>
                          <div className={styles.orderInfo}>
                            <p className={styles.orderId}>{order.id}</p>
                            <p className={styles.orderDate}>{order.date} · {order.items} item{order.items !== 1 ? 's' : ''}</p>
                            <p className={styles.orderItemNames}>{items.map(i => i.name).join(', ')}</p>
                          </div>
                          <div className={styles.orderRight}>
                            <span className={styles.orderStatus}>{order.status}</span>
                            <span className={styles.orderTotal}>{order.total.toLocaleString()} MAD</span>
                            <ChevronRight size={16} className={styles.orderChevron} />
                          </div>
                        </button>
                      );
                    }) : (
                      <div className={styles.empty}>
                        <Package size={40} />
                        <p>No orders yet</p>
                        <Link to="/shop"><Button variant="primary">Start Shopping</Button></Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ── WISHLIST ── */}
            {currentSection === 'wishlist' && (
              <WishlistManager />
            )}

            {/* ── LOYALTY ── */}
            {currentSection === 'loyalty' && (
              <div>
                <h1 className={styles.pageTitle}>kenzup Loyalty</h1>
                <div className={styles.loyaltyHero}>
                  <div className={styles.loyaltyPoints}>
                    <span className={styles.loyaltyPointsNum}>{user.loyaltyPoints?.toLocaleString()}</span>
                    <span className={styles.loyaltyPointsLabel}>Points</span>
                  </div>
                  <div className={styles.loyaltyRight}>
                    <p className={styles.loyaltyTierLabel}><Star size={14} fill="currentColor" /> {user.tier} Member</p>
                    <p className={styles.loyaltyNextTier}>2,760 points to Platinum</p>
                    <div className={styles.loyaltyBar}>
                      <div className={styles.loyaltyBarFill} style={{ width: `${Math.min(100, (user.loyaltyPoints / 4000) * 100)}%` }} />
                    </div>
                  </div>
                </div>

                <div className={styles.loyaltyEarnGrid}>
                  {[
                    ['Purchases', '1 MAD = 1 point', '🛍️'],
                    ['Write a Review', '+50 points', '⭐'],
                    ['Refer a Friend', '+200 points', '👥'],
                    ['Birthday Bonus', '+100 points', '🎂'],
                  ].map(([title, desc, icon]) => (
                    <div key={title} className={styles.loyaltyEarnCard}>
                      <span className={styles.loyaltyEarnIcon}>{icon}</span>
                      <p className={styles.loyaltyEarnTitle}>{title}</p>
                      <p className={styles.loyaltyEarnDesc}>{desc}</p>
                    </div>
                  ))}
                </div>

                {/* kenzup App Download */}
                <div className={styles.kenzupApp}>
                  <div className={styles.kenzupLeft}>
                    <p className={styles.kenzupEyebrow}>Powered by</p>
                    <h3 className={styles.kenzupTitle}>kenzup</h3>
                    <p className={styles.kenzupDesc}>
                      Download the kenzup app to manage your loyalty points, track your rewards, and get exclusive member-only offers — all in one place.
                    </p>
                    <div className={styles.kenzupBtns}>
                      <a
                        href="https://www.kenzup.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.kenzupStoreBtn}
                      >
                        <Smartphone size={16} />
                        <div>
                          <span className={styles.kenzupStoreSub}>Download on</span>
                          <span className={styles.kenzupStoreName}>App Store</span>
                        </div>
                      </a>
                      <a
                        href="https://www.kenzup.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.kenzupStoreBtn}
                      >
                        <Smartphone size={16} />
                        <div>
                          <span className={styles.kenzupStoreSub}>Get it on</span>
                          <span className={styles.kenzupStoreName}>Google Play</span>
                        </div>
                      </a>
                      <a
                        href="https://www.kenzup.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.kenzupWebLink}
                      >
                        Visit kenzup.com <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                  <div className={styles.kenzupVisual}>
                    <div className={styles.kenzupPhone}>
                      <div className={styles.kenzupPhoneScreen}>
                        <p className={styles.kenzupPhonePoints}>{user.loyaltyPoints?.toLocaleString()}</p>
                        <p className={styles.kenzupPhoneLabel}>Your Points</p>
                        <p className={styles.kenzupPhoneTier}>{user.tier} Member</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── ADDRESSES ── */}
            {currentSection === 'addresses' && (
              <div>
                <div className={styles.sectionTitleRow}>
                  <h1 className={styles.pageTitle}>My Addresses</h1>
                  <Button variant="outline" size="sm" onClick={() => { setEditingAddr('new'); setNewAddrForm({ label: 'Home', name: '', line1: '', city: '', zip: '', country: 'Morocco' }); }}>
                    <Plus size={14} /> Add Address
                  </Button>
                </div>

                {(editingAddr === 'new' || addresses.some(a => a.id === editingAddr)) && (
                  <AddressForm
                    form={newAddrForm}
                    setForm={setNewAddrForm}
                    onSave={saveAddress}
                    onCancel={() => setEditingAddr(null)}
                    isNew={editingAddr === 'new'}
                  />
                )}

                <div className={styles.addressList}>
                  {addresses.map(addr => (
                    <div key={addr.id} className={[styles.addressCard, addr.isDefault ? styles.addressCardDefault : ''].join(' ')}>
                      {addr.isDefault && <span className={styles.defaultBadge}>Default</span>}
                      <div className={styles.addressCardContent}>
                        <MapPin size={16} className={styles.addressPin} />
                        <div>
                          <p className={styles.addressLabel}>{addr.label}</p>
                          <p className={styles.addressName}>{addr.name}</p>
                          <p className={styles.addressLine}>{addr.line1}</p>
                          <p className={styles.addressLine}>{addr.city}, {addr.zip}</p>
                          <p className={styles.addressLine}>{addr.country}</p>
                        </div>
                      </div>
                      <div className={styles.addressActions}>
                        <button className={styles.addrBtn} onClick={() => openEdit(addr)}><Edit2 size={14} /> Edit</button>
                        <button className={styles.addrBtnDanger} onClick={() => deleteAddress(addr.id)}><Trash2 size={14} /> Delete</button>
                      </div>
                    </div>
                  ))}
                  {addresses.length === 0 && !editingAddr && (
                    <div className={styles.empty}>
                      <MapPin size={36} />
                      <p>No saved addresses yet</p>
                      <Button variant="outline" onClick={() => setEditingAddr('new')}>Add Your First Address</Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── BEAUTY PROFILE ── */}
            {currentSection === 'beauty-profile' && (
              <div>
                <h1 className={styles.pageTitle}>Beauty Profile</h1>
                <p className={styles.profileDesc}>
                  Tell us about your skin so we can surface products that are "Good For You" and build your ideal routine.
                </p>
                <div className={styles.profileSection}>
                  <h3 className={styles.profileSectionTitle}>Skin Type</h3>
                  <div className={styles.profileOptions}>
                    {skinTypes.map(s => (
                      <button
                        key={s}
                        className={[styles.profileOption, beautyProfile.skinType === s ? styles.profileOptionActive : ''].join(' ')}
                        onClick={() => setBeautyProfile(p => ({ ...p, skinType: s }))}
                      >{s}</button>
                    ))}
                  </div>
                </div>
                <div className={styles.profileSection}>
                  <h3 className={styles.profileSectionTitle}>Skin Concerns</h3>
                  <div className={styles.profileOptions}>
                    {skinConcerns.map(c => (
                      <button
                        key={c}
                        className={[styles.profileOption, beautyProfile.concerns?.includes(c) ? styles.profileOptionActive : ''].join(' ')}
                        onClick={() => toggleConcern(c)}
                      >{c}</button>
                    ))}
                  </div>
                </div>
                <div className={styles.profileSection}>
                  <h3 className={styles.profileSectionTitle}>Preferences</h3>
                  <div className={styles.profileOptions}>
                    {['Clean Beauty', 'Vegan', 'Fragrance-Free', 'Pregnancy-Safe', 'Cruelty-Free'].map(pref => (
                      <button
                        key={pref}
                        className={[styles.profileOption, beautyProfile.preferences?.includes(pref) ? styles.profileOptionActive : ''].join(' ')}
                        onClick={() => togglePref(pref)}
                      >{pref}</button>
                    ))}
                  </div>
                </div>
                <Button variant="primary" size="lg" onClick={handleSaveBeautyProfile}>
                  {beautyProfileSaved ? <><Check size={16} /> Saved!</> : 'Save My Beauty Profile'}
                </Button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ──

function WishlistManager() {
  const { wishlists, addToWishlist, removeFromWishlist, createWishlist, deleteWishlist } = useAuth();
  const { addItem } = useCart();
  const [activeId, setActiveId] = useState(wishlists[0]?.id ?? null);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);

  const active = wishlists.find(wl => wl.id === activeId);
  const items = active?.productIds.map(id => products.find(p => p.id === id)).filter(Boolean) ?? [];

  const handleCreate = () => {
    if (!newName.trim()) return;
    const id = createWishlist(newName.trim());
    setActiveId(id);
    setNewName('');
    setCreating(false);
  };

  const handleDelete = () => {
    if (!active) return;
    deleteWishlist(active.id);
    setActiveId(wishlists.find(wl => wl.id !== active.id)?.id ?? null);
  };

  return (
    <div>
      {/* Header row */}
      <div className={styles.wlHeader}>
        <h1 className={styles.pageTitle} style={{ marginBottom: 0 }}>My Wishlists</h1>
        <Button variant="outline" size="sm" onClick={() => setCreating(c => !c)}>
          <Plus size={13} /> New list
        </Button>
      </div>

      {/* New list form */}
      {creating && (
        <div className={styles.wlNewForm}>
          <input
            autoFocus
            className={styles.input}
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="List name..."
            onKeyDown={e => e.key === 'Enter' && handleCreate()}
          />
          <Button variant="primary" size="sm" onClick={handleCreate}>Create</Button>
          <Button variant="ghost" size="sm" onClick={() => setCreating(false)}>Cancel</Button>
        </div>
      )}

      {/* List tabs */}
      <div className={styles.wlTabs}>
        {wishlists.map(wl => (
          <button
            key={wl.id}
            className={[styles.wlTab, activeId === wl.id ? styles.wlTabActive : ''].join(' ')}
            onClick={() => setActiveId(wl.id)}
          >
            {wl.name}
            <span className={styles.wlTabCount}>{wl.productIds.length}</span>
          </button>
        ))}
      </div>

      {/* Active list meta */}
      {active && (
        <div className={styles.wlMeta}>
          <p className={styles.wlMetaInfo}>{items.length} product{items.length !== 1 ? 's' : ''} saved</p>
          <div className={styles.wlMetaActions}>
            <Link to="/shop">
              <Button variant="outline" size="sm"><Plus size={13} /> Add products</Button>
            </Link>
            {wishlists.length > 1 && (
              <button className={styles.wlDelete} onClick={handleDelete}>
                <Trash2 size={13} /> Delete list
              </button>
            )}
          </div>
        </div>
      )}

      {/* Products in active list */}
      {items.length === 0 ? (
        <div className={styles.empty}>
          <Heart size={36} />
          <p>This list is empty</p>
          <Link to="/shop"><Button variant="primary">Discover Products</Button></Link>
        </div>
      ) : (
        <div className={styles.wishlistGrid}>
          {items.map(p => (
            <div key={p.id} className={styles.wishlistItem}>
              <Link to={`/product/${p.id}`}>
                <img src={p.image} alt={p.name} className={styles.wishlistImg} />
              </Link>
              <div className={styles.wishlistInfo}>
                <p className={styles.wishlistBrand}>{p.brandName}</p>
                <Link to={`/product/${p.id}`} className={styles.wishlistName}>{p.name}</Link>
                <p className={styles.wishlistPrice}>{p.price.toLocaleString()} MAD</p>
                <div className={styles.wishlistActions}>
                  <Link to={`/product/${p.id}`}><Button variant="outline" size="sm">View</Button></Link>
                  <Button variant="primary" size="sm" onClick={() => addItem(p)}>Add to Bag</Button>
                  <button className={styles.removeBtn} onClick={() => removeFromWishlist(p.id, active.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OrderDetail({ order, items, onBack }) {
  const [reviewingItem, setReviewingItem] = useState(null);
  const [submittedReviews, setSubmittedReviews] = useState({});

  if (!order) return null;
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className={styles.orderDetail}>
      <button className={styles.orderDetailBack} onClick={onBack}>
        <ChevronLeft size={16} /> Back to Orders
      </button>
      <div className={styles.orderDetailHeader}>
        <div>
          <h2 className={styles.orderDetailId}>{order.id}</h2>
          <p className={styles.orderDetailDate}>{order.date}</p>
        </div>
        <span className={styles.orderStatus}>{order.status}</span>
      </div>
      <div className={styles.orderDetailTimeline}>
        {['Order Placed', 'Processing', 'Shipped', 'Delivered'].map((step, i) => (
          <div key={step} className={[styles.timelineStep, i <= 3 ? styles.timelineStepDone : ''].join(' ')}>
            <div className={styles.timelineDot}>{i < 3 ? <Check size={10} /> : <Package size={10} />}</div>
            <span className={styles.timelineLabel}>{step}</span>
            {i < 3 && <div className={styles.timelineLine} />}
          </div>
        ))}
      </div>

      <h3 className={styles.orderDetailSectionTitle}>Items Ordered</h3>
      <div className={styles.orderDetailItems}>
        {items.map(item => (
          <div key={item.id}>
            <div className={styles.orderDetailItem}>
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} className={styles.orderDetailImg} />
              </Link>
              <div className={styles.orderDetailItemInfo}>
                <p className={styles.orderDetailBrand}>{item.brand}</p>
                <Link to={`/product/${item.id}`} className={styles.orderDetailNameLink}>{item.name}</Link>
                <p className={styles.orderDetailQty}>Qty: {item.qty}</p>
              </div>
              <div className={styles.orderItemRight}>
                <p className={styles.orderDetailItemPrice}>{(item.price * item.qty).toLocaleString()} MAD</p>
                {submittedReviews[item.id] ? (
                  <span className={styles.reviewDone}><Check size={12} /> Review submitted</span>
                ) : (
                  <button
                    className={styles.leaveReviewBtn}
                    onClick={() => setReviewingItem(reviewingItem === item.id ? null : item.id)}
                  >
                    <Star size={12} /> {reviewingItem === item.id ? 'Cancel' : 'Leave a Review'}
                  </button>
                )}
              </div>
            </div>

            {reviewingItem === item.id && (
              <ReviewForm
                item={item}
                onSubmit={() => {
                  setSubmittedReviews(r => ({ ...r, [item.id]: true }));
                  setReviewingItem(null);
                }}
                onCancel={() => setReviewingItem(null)}
              />
            )}
          </div>
        ))}
      </div>

      <div className={styles.orderDetailSummary}>
        <div className={styles.orderDetailRow}><span>Subtotal</span><span>{total.toLocaleString()} MAD</span></div>
        <div className={styles.orderDetailRow}><span>Delivery</span><span>Free</span></div>
        <div className={[styles.orderDetailRow, styles.orderDetailTotal].join(' ')}><span>Total</span><span>{order.total.toLocaleString()} MAD</span></div>
      </div>
      <div className={styles.orderDetailShipping}>
        <h3 className={styles.orderDetailSectionTitle}>Delivery Address</h3>
        <p className={styles.shippingLine}>Layla Benhaddou</p>
        <p className={styles.shippingLine}>12 Rue Ibn Battuta, Casablanca 20000</p>
        <p className={styles.shippingLine}>Morocco</p>
      </div>
      <div className={styles.orderDetailActions}>
        <Button variant="outline">Track Shipment</Button>
        <Button variant="ghost">Need Help?</Button>
      </div>
    </div>
  );
}

function ReviewForm({ item, onSubmit, onCancel }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [skinType, setSkinType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit({ rating, title, text, skinType });
  };

  return (
    <form className={styles.reviewForm} onSubmit={handleSubmit}>
      <h4 className={styles.reviewFormTitle}>Review: {item.name}</h4>

      <div className={styles.reviewFormStars}>
        <p className={styles.label}>Your Rating</p>
        <div className={styles.starPicker}>
          {[1,2,3,4,5].map(n => (
            <button
              key={n}
              type="button"
              className={[styles.starPickerBtn, n <= (hover || rating) ? styles.starPickerActive : ''].join(' ')}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(n)}
            >★</button>
          ))}
          {rating > 0 && <span className={styles.starPickerLabel}>{['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}</span>}
        </div>
      </div>

      <div>
        <label className={styles.label}>Review Title</label>
        <input className={styles.input} value={title} onChange={e => setTitle(e.target.value)} placeholder="Sum up your review in a sentence..." required />
      </div>

      <div>
        <label className={styles.label}>Your Review</label>
        <textarea className={styles.reviewTextarea} value={text} onChange={e => setText(e.target.value)} placeholder="Tell us what you think — what you loved, what you'd improve, and who you'd recommend it to..." rows={4} required />
      </div>

      <div>
        <label className={styles.label}>Skin Type</label>
        <select className={styles.input} value={skinType} onChange={e => setSkinType(e.target.value)}>
          <option value="">Select...</option>
          {['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className={styles.reviewFormActions}>
        <Button type="submit" variant="primary" disabled={rating === 0}>Submit Review (+50 pts)</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

function AddressForm({ form, setForm, onSave, onCancel, isNew }) {
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className={styles.addrFormWrap}>
      <h3 className={styles.addrFormTitle}>{isNew ? 'Add New Address' : 'Edit Address'}</h3>
      <div className={styles.addrFormGrid}>
        <div>
          <label className={styles.label}>Label</label>
          <select className={styles.input} value={form.label} onChange={e => update('label', e.target.value)}>
            {['Home', 'Work', 'Other'].map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className={styles.label}>Full Name</label>
          <input className={styles.input} value={form.name} onChange={e => update('name', e.target.value)} placeholder="Full name" />
        </div>
        <div className={styles.addrFullCol}>
          <label className={styles.label}>Address Line</label>
          <input className={styles.input} value={form.line1} onChange={e => update('line1', e.target.value)} placeholder="Street address" />
        </div>
        <div>
          <label className={styles.label}>City</label>
          <input className={styles.input} value={form.city} onChange={e => update('city', e.target.value)} placeholder="Casablanca" />
        </div>
        <div>
          <label className={styles.label}>ZIP Code</label>
          <input className={styles.input} value={form.zip} onChange={e => update('zip', e.target.value)} placeholder="20000" />
        </div>
      </div>
      <div className={styles.addrFormActions}>
        <Button variant="primary" onClick={onSave}>{isNew ? 'Save Address' : 'Update Address'}</Button>
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}
