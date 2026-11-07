import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element) */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="text-left group cursor-pointer focus-visible:outline-none"
        >
          <span className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-stone-900 group-hover:text-amber-950 transition-colors whitespace-nowrap shrink-0">
            Velvet & Whisk
          </span>
        </button>

        {/* Zone 2: 4-5 single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
          <button
            onClick={() => handleLinkClick('flavors')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Flavors
          </button>
          <button
            onClick={() => handleLinkClick('box-builder')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Custom Box
          </button>
          <button
            onClick={() => handleLinkClick('craft')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            The Craft
          </button>
          <button
            onClick={() => handleLinkClick('catering')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Catering & Events
          </button>
          <button
            onClick={() => handleLinkClick('reviews')}
            className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Reviews
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-stone-900 text-stone-50 hover:bg-stone-800 transition-colors text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
            aria-label={`View shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span>Bag</span>
            <span className="bg-amber-400 text-stone-950 px-1.5 py-0.5 rounded text-[11px] font-bold tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-950 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#FAF7F2] px-6 py-4 space-y-3">
          <button
            onClick={() => handleLinkClick('flavors')}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-amber-900"
          >
            Flavors & Collection
          </button>
          <button
            onClick={() => handleLinkClick('box-builder')}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-amber-900"
          >
            Build a Custom Box
          </button>
          <button
            onClick={() => handleLinkClick('craft')}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-amber-900"
          >
            The Small-Batch Craft
          </button>
          <button
            onClick={() => handleLinkClick('catering')}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-amber-900"
          >
            Event & Wedding Catering
          </button>
          <button
            onClick={() => handleLinkClick('reviews')}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-amber-900"
          >
            Client Reviews
          </button>
          <button
            onClick={() => handleLinkClick('faqs')}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-amber-900"
          >
            Delivery & FAQ
          </button>
        </div>
      )}
    </header>
  );
};
