import React, { useState } from 'react';
import { CartItem } from '../types/bakery';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, Check, Sparkles, Calendar, MapPin } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [shippingMethod, setShippingMethod] = useState<'ship' | 'pickup'>('ship');
  const [scheduledDate, setScheduledDate] = useState<string>('2026-11-12');
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  // Shipping & Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 65.0;
  const shippingCost = shippingMethod === 'pickup' ? 0 : subtotal >= freeShippingThreshold ? 0 : 12.0;
  const grandTotal = subtotal + shippingCost;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Customer form for mock checkout
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');

  const handleStartCheckout = () => {
    setIsCheckingOut(true);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `VW-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(newOrderId);
    setOrderConfirmed(true);
    setIsCheckingOut(false);
    onClearCart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end">
      <div
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-amber-900" />
            <h2 className="font-serif text-xl font-medium text-stone-900">
              Your Tasting Bag
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress bar */}
        {cartItems.length > 0 && shippingMethod === 'ship' && !orderConfirmed && (
          <div className="bg-amber-50/70 px-6 py-2.5 border-b border-amber-100/80 text-xs">
            {amountToFreeShipping > 0 ? (
              <div className="text-stone-700">
                Add <strong className="text-amber-900 font-semibold tabular-nums">${amountToFreeShipping.toFixed(2)}</strong> more for <strong>Free Express Cold Shipping</strong>
              </div>
            ) : (
              <div className="text-emerald-800 font-semibold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                You unlocked Free Express Cold Shipping!
              </div>
            )}
          </div>
        )}

        {/* Content Area */}
        <div className="p-6 flex-1 space-y-6">
          {orderConfirmed ? (
            /* Order Completed Confirmation View */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
                  Order Successfully Placed
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  We&apos;re baking your pops!
                </h3>
                <p className="text-xs text-stone-600 max-w-xs mx-auto">
                  A receipt and tracking details have been sent to <strong>{customerEmail || 'your email'}</strong>.
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-stone-200 text-left text-xs space-y-2 mt-4">
                <div className="flex justify-between">
                  <span className="text-stone-500">Order Reference</span>
                  <span className="font-mono font-semibold text-stone-900">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Method</span>
                  <span className="font-semibold text-stone-900">
                    {shippingMethod === 'pickup' ? 'Bakery Studio Pickup' : 'Express Cold Shipping'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Scheduled Dispatch Date</span>
                  <span className="font-semibold text-stone-900">{scheduledDate}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setOrderConfirmed(false);
                  onClose();
                }}
                className="w-full py-3 bg-stone-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer mt-4"
              >
                Continue Browsing
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form View */
            <form onSubmit={handleCompleteOrder} className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <h3 className="font-serif text-base font-semibold text-stone-900">
                  Recipient &amp; Delivery Details
                </h3>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-stone-500 hover:text-stone-900 underline cursor-pointer"
                >
                  Back to Bag
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Eleanor Vance"
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="eleanor@example.com"
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-stone-900"
                />
              </div>

              {shippingMethod === 'ship' ? (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Shipping Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="452 Montgomery St, San Francisco, CA 94104"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-stone-900"
                  />
                </div>
              ) : (
                <div className="p-3 bg-amber-50 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Pickup at our San Francisco Kitchen: 1420 Folsom Street, San Francisco, CA (10am - 4pm)</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Desired Arrival or Pickup Date *
                </label>
                <input
                  type="date"
                  required
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="pt-4 border-t border-stone-200">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  Complete Order &middot; ${grandTotal.toFixed(2)}
                </button>
              </div>
            </form>
          ) : cartItems.length === 0 ? (
            /* Empty Cart View */
            <div className="text-center py-16 space-y-3 text-stone-500">
              <ShoppingBag className="w-12 h-12 mx-auto text-stone-300" />
              <p className="text-sm font-medium text-stone-700">Your bag is currently empty.</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Discover our signature flavors or build your customized tasting box.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 cursor-pointer"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            /* Items List */
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-lg border border-stone-200 bg-[#FAF7F2]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-md object-cover border border-stone-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-medium text-stone-900 truncate">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-500 truncate">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5 border border-stone-300 rounded bg-white px-1.5 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="text-stone-600 hover:text-stone-950 p-0.5 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold w-4 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="text-stone-600 hover:text-stone-950 p-0.5 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs font-bold text-stone-900 tabular-nums">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer (Summary & Checkout CTA) */}
        {cartItems.length > 0 && !isCheckingOut && !orderConfirmed && (
          <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
            {/* Fulfillment toggle */}
            <div className="flex rounded-lg border border-stone-300 p-1 bg-white text-xs">
              <button
                onClick={() => setShippingMethod('ship')}
                className={`flex-1 py-1.5 rounded font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  shippingMethod === 'ship'
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Express Cold Ship</span>
              </button>
              <button
                onClick={() => setShippingMethod('pickup')}
                className={`flex-1 py-1.5 rounded font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  shippingMethod === 'pickup'
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>SF Kitchen Pickup</span>
              </button>
            </div>

            {/* Totals */}
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="tabular-nums font-medium text-stone-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>
                  {shippingMethod === 'pickup' ? 'Local Studio Pickup' : 'Express Cold-Pack Shipping'}
                </span>
                <span className="tabular-nums font-medium text-stone-900">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                <span className="font-serif text-base font-semibold text-stone-900">Estimated Total</span>
                <span className="font-serif text-xl font-bold text-stone-900 tabular-nums">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleStartCheckout}
              className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout &middot; ${grandTotal.toFixed(2)}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
