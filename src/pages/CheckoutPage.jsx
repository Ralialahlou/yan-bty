import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Gift, ChevronRight, ShoppingBag } from 'lucide-react';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { sampleProducts } from '../data/products';
import styles from './CheckoutPage.module.css';

const STEPS = ['Bag', 'Details', 'Shipping', 'Payment', 'Confirmation'];

export default function CheckoutPage() {
  const { items, subtotal, shippingCost, clearCart, selectedSamples, setSelectedSamples } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', zip: '', country: 'Morocco',
    paymentMethod: 'card',
    cardNumber: '', cardExpiry: '', cardCvv: '',
  });
  const [giftMessage, setGiftMessage] = useState('');
  const [errors, setErrors] = useState({});

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const toggleSample = (id) => {
    if (selectedSamples.includes(id)) {
      setSelectedSamples(s => s.filter(i => i !== id));
    } else if (selectedSamples.length < 2) {
      setSelectedSamples(s => [...s, id]);
    }
  };

  const placeOrder = async () => {
    setPlacing(true);
    await new Promise(r => setTimeout(r, 1500));
    clearCart();
    setStep(4);
    setPlacing(false);
  };

  if (items.length === 0 && step < 4) {
    return (
      <div className={styles.empty}>
        <ShoppingBag size={48} />
        <h2>Your bag is empty</h2>
        <Link to="/shop"><Button variant="primary">Continue Shopping</Button></Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Progress */}
        <div className={styles.progress}>
          {STEPS.slice(1).map((s, i) => (
            <div key={s} className={[styles.stepItem, step >= i + 1 ? styles.stepActive : ''].join(' ')}>
              <div className={styles.stepCircle}>
                {step > i + 1 ? <Check size={12} /> : <span>{i + 1}</span>}
              </div>
              <span className={styles.stepLabel}>{s}</span>
              {i < STEPS.length - 2 && <div className={styles.stepLine} />}
            </div>
          ))}
        </div>

        {step === 4 && (
          <div className={styles.confirmation}>
            <div className={styles.confirmIcon}><Check size={32} /></div>
            <h2 className={styles.confirmTitle}>Order Confirmed!</h2>
            <p className={styles.confirmDesc}>
              Thank you for shopping with Yan BTY. You'll receive a confirmation email shortly.
            </p>
            <p className={styles.confirmOrder}>Order #YB-2025-{Math.floor(Math.random() * 9000) + 1000}</p>
            <div className={styles.confirmActions}>
              <Link to="/account/orders"><Button variant="primary">Track My Order</Button></Link>
              <Link to="/shop"><Button variant="outline">Continue Shopping</Button></Link>
            </div>
          </div>
        )}

        {step < 4 && <div className={styles.body}>
          {/* Main content */}
          <div className={styles.main}>
            {step === 1 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>Your Details</h2>
                <div className={styles.formGrid}>
                  <div>
                    <label htmlFor="co-first-name" className={styles.label}>First Name</label>
                    <input id="co-first-name" className={styles.input} value={form.firstName} onChange={e => update('firstName', e.target.value)} placeholder="Layla" autoComplete="given-name" />
                  </div>
                  <div>
                    <label htmlFor="co-last-name" className={styles.label}>Last Name</label>
                    <input id="co-last-name" className={styles.input} value={form.lastName} onChange={e => update('lastName', e.target.value)} placeholder="Benhaddou" autoComplete="family-name" />
                  </div>
                  <div className={styles.fullCol}>
                    <label htmlFor="co-email" className={styles.label}>Email Address</label>
                    <input id="co-email" className={styles.input} type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" autoComplete="email" />
                  </div>
                  <div className={styles.fullCol}>
                    <label htmlFor="co-phone" className={styles.label}>Phone Number</label>
                    <input id="co-phone" className={styles.input} value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+212 6 00 00 00 00" autoComplete="tel" />
                  </div>
                </div>
                {errors.step1 && <p style={{ color: '#b91c1c', fontSize: 13, marginBottom: 8 }}>{errors.step1}</p>}
                <Button variant="primary" fullWidth size="lg" onClick={() => {
                  if (!form.firstName.trim() || !form.lastName.trim()) return setErrors({ step1: 'Please enter your full name.' });
                  if (!form.email.includes('@')) return setErrors({ step1: 'Please enter a valid email address.' });
                  if (!form.phone.trim()) return setErrors({ step1: 'Please enter your phone number.' });
                  setErrors({});
                  setStep(2);
                }}>
                  Continue to Shipping <ChevronRight size={16} />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>Shipping Address</h2>
                <div className={styles.formGrid}>
                  <div className={styles.fullCol}>
                    <label htmlFor="co-address" className={styles.label}>Address</label>
                    <input id="co-address" className={styles.input} value={form.address} onChange={e => update('address', e.target.value)} placeholder="12 Rue Ibn Battuta" autoComplete="street-address" />
                  </div>
                  <div>
                    <label htmlFor="co-city" className={styles.label}>City</label>
                    <input id="co-city" className={styles.input} value={form.city} onChange={e => update('city', e.target.value)} placeholder="Casablanca" autoComplete="address-level2" />
                  </div>
                  <div>
                    <label htmlFor="co-zip" className={styles.label}>ZIP Code</label>
                    <input id="co-zip" className={styles.input} value={form.zip} onChange={e => update('zip', e.target.value)} placeholder="20000" autoComplete="postal-code" />
                  </div>
                </div>

                {/* Gift option — opt-in toggle, then message textarea */}
                <div className={styles.giftSection}>
                  <label className={styles.giftToggle}>
                    <input
                      type="checkbox"
                      checked={giftMessage !== ''}
                      onChange={e => setGiftMessage(e.target.checked ? ' ' : '')}
                      className={styles.giftCheckbox}
                    />
                    <Gift size={15} aria-hidden="true" />
                    <span>This is a gift — add a gift message</span>
                  </label>
                  {giftMessage !== '' && (
                    <textarea
                      autoFocus
                      aria-label="Gift message"
                      className={styles.giftTextarea}
                      placeholder="Write your personal message for the recipient..."
                      value={giftMessage === ' ' ? '' : giftMessage}
                      onChange={e => setGiftMessage(e.target.value || ' ')}
                      rows={3}
                    />
                  )}
                </div>

                {/* Samples */}
                <div className={styles.samplesSection}>
                  <h3 className={styles.samplesTitle}>Choose Your Complimentary Samples</h3>
                  <p className={styles.samplesDesc}>Select up to 2 Yan&One samples with your order</p>
                  <div className={styles.samplesList}>
                    {sampleProducts.map(sample => (
                      <button
                        key={sample.id}
                        className={[
                          styles.sampleItem,
                          selectedSamples.includes(sample.id) ? styles.sampleSelected : '',
                          !selectedSamples.includes(sample.id) && selectedSamples.length >= 2 ? styles.sampleDisabled : '',
                        ].join(' ')}
                        onClick={() => toggleSample(sample.id)}
                      >
                        <img src={sample.image} alt={sample.name} className={styles.sampleImg} />
                        <div className={styles.sampleInfo}>
                          <p className={styles.sampleBrand}>{sample.brand}</p>
                          <p className={styles.sampleName}>{sample.name}</p>
                        </div>
                        {selectedSamples.includes(sample.id) && (
                          <div className={styles.sampleCheck}><Check size={12} /></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {errors.step2 && <p style={{ color: '#b91c1c', fontSize: 13, marginBottom: 8 }}>{errors.step2}</p>}
                <div className={styles.btnRow}>
                  <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                  <Button variant="primary" size="lg" onClick={() => {
                    if (!form.address.trim()) return setErrors({ step2: 'Please enter your address.' });
                    if (!form.city.trim()) return setErrors({ step2: 'Please enter your city.' });
                    if (!form.zip.trim()) return setErrors({ step2: 'Please enter your ZIP code.' });
                    setErrors({});
                    setStep(3);
                  }}>
                    Continue to Payment <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>Payment</h2>

                <div className={styles.paymentMethods}>
                  {[['card', 'Credit / Debit Card'], ['cod', 'Cash on Delivery']].map(([val, label]) => (
                    <label key={val} className={[styles.paymentMethod, form.paymentMethod === val ? styles.paymentMethodActive : ''].join(' ')}>
                      <input type="radio" name="payment" value={val} checked={form.paymentMethod === val} onChange={() => update('paymentMethod', val)} />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>

                {form.paymentMethod === 'card' && (
                  <div className={styles.formGrid}>
                    <div className={styles.fullCol}>
                      <label htmlFor="co-card-number" className={styles.label}>Card Number</label>
                      <input id="co-card-number" className={styles.input} value={form.cardNumber} onChange={e => update('cardNumber', e.target.value)} placeholder="•••• •••• •••• ••••" maxLength={19} autoComplete="cc-number" />
                    </div>
                    <div>
                      <label htmlFor="co-card-expiry" className={styles.label}>Expiry</label>
                      <input id="co-card-expiry" className={styles.input} value={form.cardExpiry} onChange={e => update('cardExpiry', e.target.value)} placeholder="MM/YY" maxLength={5} autoComplete="cc-exp" />
                    </div>
                    <div>
                      <label htmlFor="co-card-cvv" className={styles.label}>CVV</label>
                      <input id="co-card-cvv" className={styles.input} value={form.cardCvv} onChange={e => update('cardCvv', e.target.value)} placeholder="•••" maxLength={4} type="password" autoComplete="cc-csc" />
                    </div>
                  </div>
                )}

                {errors.step3 && <p style={{ color: '#b91c1c', fontSize: 13, marginBottom: 8 }}>{errors.step3}</p>}
                <div className={styles.btnRow}>
                  <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                  <Button variant="accent" size="lg" fullWidth loading={placing} onClick={() => {
                    if (form.paymentMethod === 'card') {
                      if (!form.cardNumber.trim()) return setErrors({ step3: 'Please enter your card number.' });
                      if (!form.cardExpiry.trim()) return setErrors({ step3: 'Please enter the card expiry.' });
                      if (!form.cardCvv.trim()) return setErrors({ step3: 'Please enter your CVV.' });
                    }
                    setErrors({});
                    placeOrder();
                  }}>
                    Place Order · {(subtotal + shippingCost).toLocaleString()} MAD
                  </Button>
                </div>
              </div>
            )}

          </div>

          {/* Order summary */}
          <aside className={styles.summary}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>
            <div className={styles.summaryItems}>
              {items.map(item => (
                <div key={item.cartKey} className={styles.summaryItem}>
                  <img src={item.image} alt={item.name} className={styles.summaryImg} />
                  <div className={styles.summaryItemInfo}>
                    <p className={styles.summaryItemBrand}>{item.brand}</p>
                    <p className={styles.summaryItemName}>{item.name}</p>
                    {item.variantName && <p className={styles.summaryItemVariant}>{item.variantName}</p>}
                    <p className={styles.summaryItemQty}>Qty: {item.quantity}</p>
                  </div>
                  <span className={styles.summaryItemPrice}>{(item.price * item.quantity).toLocaleString()} MAD</span>
                </div>
              ))}
            </div>
            <div className={styles.summaryTotals}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString()} MAD</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Delivery</span>
                <span>{shippingCost === 0 ? 'Free' : `${shippingCost} MAD`}</span>
              </div>
              {selectedSamples.length > 0 && (
                <div className={styles.summaryRow}>
                  <span>Samples ({selectedSamples.length})</span>
                  <span className={styles.summaryFree}>Free</span>
                </div>
              )}
              <div className={[styles.summaryRow, styles.summaryTotal].join(' ')}>
                <span>Total</span>
                <span>{(subtotal + shippingCost).toLocaleString()} MAD</span>
              </div>
            </div>
          </aside>
        </div>}
      </div>
    </div>
  );
}
