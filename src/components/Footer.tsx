import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-stone-900 text-stone-300 py-16 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-serif text-2xl font-medium tracking-tight text-white block">
              Velvet &amp; Whisk
            </span>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Artisanal pâtisserie crafting small-batch cake pops, custom gift collections, and bespoke dessert installations dipped in single-origin Belgian chocolate.
            </p>
            <div className="text-[11px] text-stone-500">
              Kitchen: 1420 Folsom Street, San Francisco, CA 94103
              <br />
              Studio Hours: Wednesday &ndash; Sunday, 10:00 AM &ndash; 5:00 PM
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-white uppercase font-bold tracking-wider text-[11px]">
              Storefront
            </div>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#flavors" className="hover:text-amber-300 transition-colors">
                  Signature Flavors
                </a>
              </li>
              <li>
                <a href="#box-builder" className="hover:text-amber-300 transition-colors">
                  Build a Custom Box
                </a>
              </li>
              <li>
                <a href="#catering" className="hover:text-amber-300 transition-colors">
                  Weddings &amp; Galas
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-amber-300 transition-colors">
                  Small-Batch Craft
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-amber-300 transition-colors">
                  Shipping &amp; Freshness
                </a>
              </li>
            </ul>
          </div>

          {/* Dietary & Accommodations (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-white uppercase font-bold tracking-wider text-[11px]">
              Special Requests
            </div>
            <ul className="space-y-2 text-stone-400">
              <li>Gluten-Friendly Batches</li>
              <li>Nut-Free Certified Runs</li>
              <li>Custom Pantone Dipping</li>
              <li>24k Gold Monogramming</li>
              <li>Corporate Gifting Accounts</li>
            </ul>
          </div>

          {/* Seasonal Flavor Drop Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-white uppercase font-bold tracking-wider text-[11px]">
              Seasonal Flavor Releases
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Subscribe to receive first access to our limited-edition holiday and botanical drop boxes.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-200 rounded-lg flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>You&apos;re on the reserve list for our next drop!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="flex-1 bg-stone-800 border border-stone-700 text-stone-100 text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Velvet &amp; Whisk Artisanal Confections LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Handmade with Belgian Callebaut Couverture</span>
            <span aria-hidden="true">&middot;</span>
            <span>San Francisco, California</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
