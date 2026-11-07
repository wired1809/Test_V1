import React, { useState } from 'react';
import { FLAVORS } from './data/flavors';
import { Flavor, CartItem, CustomBoxItem } from './types/bakery';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FlavorGallery } from './components/FlavorGallery';
import { BoxBuilder } from './components/BoxBuilder';
import { Craftsmanship } from './components/Craftsmanship';
import { CateringEstimator } from './components/CateringEstimator';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { Check } from 'lucide-react';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedQuickViewFlavor, setSelectedQuickViewFlavor] = useState<Flavor | null>(null);
  const [primedFlavorForBox, setPrimedFlavorForBox] = useState<Flavor | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart state initialized with an artisan 12-pack sample so visitors immediately see the cart experience
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-sample-box',
      type: 'custom-box',
      title: 'The Signature Dozen Gift Box',
      subtitle: 'Fleur de Sel Caramel (4) · Raspberry Rose (4) · Uji Matcha (4)',
      price: 44.0,
      quantity: 1,
      image: '/src/assets/images/hero_artisanal_cake_pops_1794069128209.jpg',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddDozenToCart = (flavor: Flavor) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.type === 'dozen-pack' && item.title.includes(flavor.name)
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `dozen-${flavor.id}-${Date.now()}`,
        type: 'dozen-pack',
        title: `${flavor.name} (Dozen)`,
        subtitle: `12 handcrafted pops · Single-flavor presentation box`,
        price: flavor.priceDozen,
        quantity: 1,
        image: flavor.image,
      };
      setCartItems((prev) => [...prev, newItem]);
    }
    showToast(`Added 1 Dozen ${flavor.name} to your bag`);
  };

  const handleAddCustomBoxToCart = (box: CustomBoxItem) => {
    const summaryFlavors = box.selectedFlavors
      .map((sf) => {
        const found = FLAVORS.find((f) => f.id === sf.flavorId);
        return `${found?.name.split(' ')[0]} (${sf.count})`;
      })
      .join(' · ');

    const newItem: CartItem = {
      id: box.id,
      type: 'custom-box',
      title: `Custom ${box.size.name}`,
      subtitle: summaryFlavors,
      price: box.totalPrice,
      quantity: 1,
      image: '/src/assets/images/hero_artisanal_cake_pops_1794069128209.jpg',
      customBoxData: box,
    };

    setCartItems((prev) => [...prev, newItem]);
    showToast(`Added ${box.size.name} to your bag`);
  };

  const handleAddToCustomBox = (flavor: Flavor) => {
    setPrimedFlavorForBox(flavor);
    handleNavigate('box-builder');
    showToast(`Selected ${flavor.name} for your custom box`);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900">
      {/* Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => handleNavigate('flavors')}
          onCustomBoxClick={() => handleNavigate('box-builder')}
        />

        {/* Flavor Gallery */}
        <FlavorGallery
          flavors={FLAVORS}
          onSelectFlavorQuickView={(flavor) => setSelectedQuickViewFlavor(flavor)}
          onAddDozenToCart={handleAddDozenToCart}
          onAddToCustomBox={handleAddToCustomBox}
        />

        {/* Custom Box Builder */}
        <BoxBuilder
          flavors={FLAVORS}
          onAddCustomBoxToCart={handleAddCustomBoxToCart}
          initialFlavorToAdd={primedFlavorForBox}
        />

        {/* Craftsmanship & Quality Standards */}
        <Craftsmanship />

        {/* Event & Wedding Catering Estimator */}
        <CateringEstimator />

        {/* Attributable Testimonials & Press */}
        <Testimonials />

        {/* Delivery & FAQ Accordion */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick View Modal */}
      <QuickViewModal
        flavor={selectedQuickViewFlavor}
        onClose={() => setSelectedQuickViewFlavor(null)}
        onAddDozen={handleAddDozenToCart}
        onAddToBox={handleAddToCustomBox}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Subtle feedback toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-100 text-xs py-3 px-4 rounded-xl shadow-xl border border-stone-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="w-4 h-4 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
