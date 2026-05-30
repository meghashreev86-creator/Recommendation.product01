import React, { useMemo, useState } from 'react';
import { Banknote, CheckCircle2, CreditCard, Landmark, MapPin, ShieldCheck, ShoppingBag, Smartphone } from 'lucide-react';
import BackButton from '../components/BackButton';
import { formatInr } from '../utils/formatters';

const paymentOptions = [
  { id: 'UPI', label: 'UPI', icon: Smartphone, note: 'Pay instantly using your UPI app.' },
  { id: 'Debit/Credit Card', label: 'Debit / Credit Card', icon: CreditCard, note: 'Demo card payment with secure masking.' },
  { id: 'Net Banking', label: 'Net Banking', icon: Landmark, note: 'Choose your bank and continue with a demo bank flow.' },
  { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: Banknote, note: 'Pay when the order reaches your doorstep.' }
];

const emptyAddress = {
  name: '',
  phone: '',
  house: '',
  street: '',
  city: '',
  state: '',
  pincode: '',
  landmark: ''
};

const emptyPaymentForm = {
  upiId: '',
  cardHolder: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  bankName: ''
};

function generateReference(prefix) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export default function CartPage({
  cartItems,
  onBack,
  onUpdateCartQuantity,
  onRemoveFromCart,
  onPlaceOrder,
  onExploreProducts,
  onViewOrders
}) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [address, setAddress] = useState(emptyAddress);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [paymentForm, setPaymentForm] = useState(emptyPaymentForm);
  const [errors, setErrors] = useState({});

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems]
  );
  const deliveryCharge = cartItems.length > 0 ? 99 : 0;
  const platformFee = cartItems.length > 0 ? 19 : 0;
  const total = subtotal + deliveryCharge + platformFee;

  function validateAddress() {
    const nextErrors = {};
    if (!address.name.trim()) nextErrors.name = 'Enter the full name';
    if (!/^\d{10}$/.test(address.phone.trim())) nextErrors.phone = 'Enter a valid 10-digit phone number';
    if (!address.house.trim()) nextErrors.house = 'Enter house or flat number';
    if (!address.street.trim()) nextErrors.street = 'Enter street or area';
    if (!address.city.trim()) nextErrors.city = 'Enter city';
    if (!address.state.trim()) nextErrors.state = 'Enter state';
    if (!/^\d{6}$/.test(address.pincode.trim())) nextErrors.pincode = 'Enter a valid 6-digit pincode';
    return nextErrors;
  }

  function validatePayment() {
    const nextErrors = {};

    if (paymentMethod === 'UPI') {
      if (!/^[\w.-]+@[\w.-]+$/.test(paymentForm.upiId.trim())) nextErrors.upiId = 'Enter a valid UPI ID';
    }

    if (paymentMethod === 'Debit/Credit Card') {
      if (!paymentForm.cardHolder.trim()) nextErrors.cardHolder = 'Enter card holder name';
      if (!/^\d{16}$/.test(paymentForm.cardNumber.replace(/\s+/g, ''))) nextErrors.cardNumber = 'Enter a valid 16-digit card number';
      if (!/^\d{2}\/\d{2}$/.test(paymentForm.expiry.trim())) nextErrors.expiry = 'Use MM/YY format';
      if (!/^\d{3}$/.test(paymentForm.cvv.trim())) nextErrors.cvv = 'Enter a valid 3-digit CVV';
    }

    if (paymentMethod === 'Net Banking') {
      if (!paymentForm.bankName.trim()) nextErrors.bankName = 'Select your bank';
    }

    return nextErrors;
  }

  function getPaymentDetails() {
    if (paymentMethod === 'UPI') {
      const [prefix, suffix] = paymentForm.upiId.split('@');
      return { label: `${prefix?.slice(0, 2) || '**'}***@${suffix || 'upi'}` };
    }

    if (paymentMethod === 'Debit/Credit Card') {
      const last4 = paymentForm.cardNumber.replace(/\s+/g, '').slice(-4);
      return { label: `Card ending in ${last4}`, cardHolder: paymentForm.cardHolder.trim() };
    }

    if (paymentMethod === 'Net Banking') {
      return { label: `${paymentForm.bankName} net banking` };
    }

    return { label: 'Pay on delivery' };
  }

  function handleConfirmOrder() {
    const validationErrors = {
      ...validateAddress(),
      ...validatePayment()
    };

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    const orderDraft = {
      id: generateReference('ORD'),
      transactionId: paymentMethod === 'Cash on Delivery' ? generateReference('COD') : generateReference('TXN'),
      items: cartItems.map(item => ({ ...item.product, quantity: item.quantity })),
      total,
      paymentMethod,
      paymentDetails: getPaymentDetails(),
      address: {
        ...address,
        phone: address.phone.trim()
      },
      status: paymentMethod === 'Cash on Delivery' ? 'Confirmed' : 'Paid',
      createdAt: new Date().toISOString()
    };

    const savedOrder = onPlaceOrder(orderDraft);
    if (savedOrder) {
      setOrderSuccess(savedOrder);
      setIsCheckout(false);
      setAddress(emptyAddress);
      setPaymentForm(emptyPaymentForm);
      setErrors({});
    }
  }

  function renderFieldError(field) {
    return errors[field] ? <small className="checkout-error">{errors[field]}</small> : null;
  }

  if (orderSuccess) {
    return (
      <main className="page-shell cart-page">
        <section className="order-success-shell">
          <div className="order-success-card">
            <CheckCircle2 size={54} />
            <span className="eyebrow">Order Success</span>
            <h1>Your order is confirmed</h1>
            <p>Transaction reference and shipping details are saved to your dashboard for easy tracking.</p>

            <div className="order-success-grid">
              <div>
                <span>Order ID</span>
                <strong>{orderSuccess.id}</strong>
              </div>
              <div>
                <span>Transaction ID</span>
                <strong>{orderSuccess.transactionId}</strong>
              </div>
              <div>
                <span>Payment</span>
                <strong>{orderSuccess.paymentMethod}</strong>
              </div>
              <div>
                <span>Total Paid</span>
                <strong>{formatInr(orderSuccess.total)}</strong>
              </div>
            </div>

            <div className="order-success-summary">
              <h3>Delivery Address</h3>
              <p>
                {orderSuccess.address?.name}, {orderSuccess.address?.house}, {orderSuccess.address?.street},{' '}
                {orderSuccess.address?.city}, {orderSuccess.address?.state} - {orderSuccess.address?.pincode}
              </p>
              <h3>Payment Summary</h3>
              <p>{orderSuccess.paymentDetails?.label || orderSuccess.paymentMethod}</p>
            </div>

            <div className="hero-actions">
              <button className="button-primary" onClick={onViewOrders}>View My Orders</button>
              <button className="button-secondary" onClick={onExploreProducts}>Continue Shopping</button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell cart-page">
      <BackButton label="< Back" onClick={isCheckout ? () => setIsCheckout(false) : onBack} />

      <section className="page-head">
        <div>
          <span className="eyebrow">{isCheckout ? 'Secure Checkout' : 'Shopping Cart'}</span>
          <h1>{isCheckout ? 'Complete your premium checkout' : 'Review your cart and proceed to payment'}</h1>
          <p>
            {isCheckout
              ? 'Validate address details, choose a payment method, and confirm your order with safe payment handling.'
              : 'Edit quantities, review charges, and move into a realistic ecommerce checkout flow.'}
          </p>
        </div>
      </section>

      <section className="cart-layout standalone-cart-layout premium-checkout-layout">
        <div className="cart-main-content">
          {!isCheckout ? (
            <div className="glass-card cart-panel premium-cart-panel">
              {cartItems.length ? (
                <div className="checkout-item-list">
                  {cartItems.map(item => (
                    <article key={item.product.id} className="checkout-item-card">
                      <img src={item.product.image} alt={item.product.name} />
                      <div className="checkout-item-copy">
                        <strong>{item.product.name}</strong>
                        <span>{item.product.brand} - {formatInr(item.product.price)} each</span>
                      </div>
                      <div className="inline-button-row checkout-quantity-tools">
                        <input
                          className="quantity-inline"
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={event => onUpdateCartQuantity(item.product.id, Number(event.target.value))}
                        />
                        <button className="button-secondary" onClick={() => onRemoveFromCart(item.product.id)}>Remove</button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-state-card">
                  <ShoppingBag size={24} />
                  <h3>Your cart is empty</h3>
                  <p>Explore premium AI-ranked products and add your favorites here.</p>
                  <button className="button-primary" onClick={onExploreProducts}>Explore Products</button>
                </div>
              )}
            </div>
          ) : (
            <div className="checkout-form-stack">
              <div className="glass-card cart-panel premium-cart-panel">
                <div className="checkout-section-head">
                  <h3><MapPin size={18} /> Delivery Address</h3>
                  <span>Validated for order delivery</span>
                </div>
                <div className="checkout-form-grid">
                  <label>
                    Full name
                    <input value={address.name} onChange={event => setAddress(prev => ({ ...prev, name: event.target.value }))} />
                    {renderFieldError('name')}
                  </label>
                  <label>
                    Phone number
                    <input value={address.phone} onChange={event => setAddress(prev => ({ ...prev, phone: event.target.value }))} />
                    {renderFieldError('phone')}
                  </label>
                  <label>
                    House / Flat No.
                    <input value={address.house} onChange={event => setAddress(prev => ({ ...prev, house: event.target.value }))} />
                    {renderFieldError('house')}
                  </label>
                  <label>
                    Street / Area
                    <input value={address.street} onChange={event => setAddress(prev => ({ ...prev, street: event.target.value }))} />
                    {renderFieldError('street')}
                  </label>
                  <label>
                    City
                    <input value={address.city} onChange={event => setAddress(prev => ({ ...prev, city: event.target.value }))} />
                    {renderFieldError('city')}
                  </label>
                  <label>
                    State
                    <input value={address.state} onChange={event => setAddress(prev => ({ ...prev, state: event.target.value }))} />
                    {renderFieldError('state')}
                  </label>
                  <label>
                    Pincode
                    <input value={address.pincode} onChange={event => setAddress(prev => ({ ...prev, pincode: event.target.value }))} />
                    {renderFieldError('pincode')}
                  </label>
                  <label>
                    Landmark
                    <input value={address.landmark} onChange={event => setAddress(prev => ({ ...prev, landmark: event.target.value }))} />
                  </label>
                </div>
              </div>

              <div className="glass-card cart-panel premium-cart-panel">
                <div className="checkout-section-head">
                  <h3><ShieldCheck size={18} /> Payment Method</h3>
                  <span>We never store CVV or full card numbers</span>
                </div>
                <div className="payment-method-grid">
                  {paymentOptions.map(option => {
                    const Icon = option.icon;
                    const isSelected = paymentMethod === option.id;

                    return (
                      <button
                        key={option.id}
                        className={`payment-method-card ${isSelected ? 'active' : ''}`}
                        onClick={() => setPaymentMethod(option.id)}
                      >
                        <Icon size={20} />
                        <strong>{option.label}</strong>
                        <span>{option.note}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="payment-fields">
                  {paymentMethod === 'UPI' && (
                    <label>
                      UPI ID
                      <input value={paymentForm.upiId} onChange={event => setPaymentForm(prev => ({ ...prev, upiId: event.target.value }))} placeholder="name@bank" />
                      {renderFieldError('upiId')}
                    </label>
                  )}

                  {paymentMethod === 'Debit/Credit Card' && (
                    <div className="checkout-form-grid">
                      <label>
                        Card holder
                        <input value={paymentForm.cardHolder} onChange={event => setPaymentForm(prev => ({ ...prev, cardHolder: event.target.value }))} />
                        {renderFieldError('cardHolder')}
                      </label>
                      <label>
                        Card number
                        <input value={paymentForm.cardNumber} onChange={event => setPaymentForm(prev => ({ ...prev, cardNumber: event.target.value.replace(/[^\d]/g, '').slice(0, 16) }))} placeholder="1234123412341234" />
                        {renderFieldError('cardNumber')}
                      </label>
                      <label>
                        Expiry
                        <input value={paymentForm.expiry} onChange={event => setPaymentForm(prev => ({ ...prev, expiry: event.target.value.slice(0, 5) }))} placeholder="MM/YY" />
                        {renderFieldError('expiry')}
                      </label>
                      <label>
                        CVV
                        <input type="password" value={paymentForm.cvv} onChange={event => setPaymentForm(prev => ({ ...prev, cvv: event.target.value.replace(/[^\d]/g, '').slice(0, 3) }))} placeholder="***" />
                        {renderFieldError('cvv')}
                      </label>
                    </div>
                  )}

                  {paymentMethod === 'Net Banking' && (
                    <label>
                      Bank name
                      <select value={paymentForm.bankName} onChange={event => setPaymentForm(prev => ({ ...prev, bankName: event.target.value }))}>
                        <option value="">Select bank</option>
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="State Bank of India">State Bank of India</option>
                        <option value="Axis Bank">Axis Bank</option>
                      </select>
                      {renderFieldError('bankName')}
                    </label>
                  )}

                  {paymentMethod === 'Cash on Delivery' && (
                    <p className="cod-note">Pay in cash when your order is delivered. Order confirmation will still generate an order ID and COD reference.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="glass-card order-summary-card cart-panel premium-cart-panel">
          <h3>Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><strong>{formatInr(subtotal)}</strong></div>
          <div className="summary-row"><span>Delivery</span><strong>{formatInr(deliveryCharge)}</strong></div>
          <div className="summary-row"><span>Platform fee</span><strong>{formatInr(platformFee)}</strong></div>
          <div className="summary-row total-row"><span>Total</span><strong>{formatInr(total)}</strong></div>
          <div className="summary-row"><span>Items</span><strong>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</strong></div>
          <div className="summary-row"><span>Payment</span><strong>{paymentMethod}</strong></div>
          <button
            className="button-primary"
            disabled={!cartItems.length}
            onClick={() => (isCheckout ? handleConfirmOrder() : setIsCheckout(true))}
          >
            {isCheckout ? 'Place Order Securely' : 'Proceed to Checkout'}
          </button>
        </div>
      </section>
    </main>
  );
}
