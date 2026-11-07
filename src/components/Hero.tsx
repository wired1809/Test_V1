import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Truck } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onCustomBoxClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onCustomBoxClick }) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Split grid: Left Copy, Right Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column (Copy & Actions) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-widest text-amber-900/80 font-semibold">
              Artisanal Pâtisserie &middot; Hand-Dipped in San Francisco
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-[1.12] tracking-tight text-balance">
              Handcrafted cake pops for memorable celebrations.
            </h1>

            <p className="text-stone-600 text-lg md:text-xl font-normal leading-relaxed max-w-xl">
              Slow-baked scratch crumb, velvety infused ganache, and dipped in single-origin Belgian chocolate. Hand-adorned with edible 24k gold leaf and organic botanicals.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onCustomBoxClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium text-sm rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap"
              >
                <span>Build a Custom Box</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-medium text-sm rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Explore All Flavors
              </button>
            </div>

            {/* Micro value props inline with dividers */}
            <div className="pt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-500 font-medium">
              <span className="flex items-center gap-1.5 text-stone-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                Never leftover cake scraps
              </span>
              <span aria-hidden="true" className="text-stone-300">&middot;</span>
              <span className="flex items-center gap-1.5 text-stone-700">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                Single-origin Callebaut dipping
              </span>
              <span aria-hidden="true" className="text-stone-300">&middot;</span>
              <span className="flex items-center gap-1.5 text-stone-700">
                <Truck className="w-3.5 h-3.5 text-amber-700" />
                Insulated cold-pack shipping
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200/80 shadow-xl bg-stone-100 group">
              <img
                src="/src/assets/images/hero_artisanal_cake_pops_1794069128209.jpg"
                alt="Curated tasting tray of artisanal cake pops decorated with edible gold leaf, pastel glazes, and chocolate drizzles"
                className="w-full h-[400px] sm:h-[480px] lg:h-[520px] object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />

              {/* Elegant overlay caption card at bottom */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-amber-300 font-medium mb-1">
                    Signature Tasting Spread
                  </div>
                  <div className="font-serif text-lg font-medium">
                    Summer Botanicals &amp; Fleur de Sel Collection
                  </div>
                  <div className="text-xs text-stone-300 mt-1">
                    Di-dipped in Callebaut Belgian chocolate &middot; Scratch recipe
                  </div>
                </div>

                <div className="shrink-0 bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/20 text-right">
                  <div className="text-xs text-amber-200 uppercase font-semibold">Tasting Box</div>
                  <div className="text-sm font-semibold text-white">From $24</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Adjacency Proof Bar (§1.H: Claim-to-proof Adjacency) */}
        <div className="mt-14 pt-8 border-t border-stone-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="font-serif text-2xl md:text-3xl font-semibold text-stone-900 tabular-nums">
              18,400+
            </div>
            <div className="text-xs text-stone-600 font-medium">
              Handcrafted Pops Delivered
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-serif text-2xl md:text-3xl font-semibold text-stone-900 tabular-nums">
              4.98 &starf;
            </div>
            <div className="text-xs text-stone-600 font-medium">
              Average Rating (850+ Events)
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-serif text-2xl md:text-3xl font-semibold text-stone-900">
              100% Callebaut
            </div>
            <div className="text-xs text-stone-600 font-medium">
              Pure Belgian Cocoa Couverture
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-serif text-2xl md:text-3xl font-semibold text-stone-900">
              Cold-Pack
            </div>
            <div className="text-xs text-stone-600 font-medium">
              Fresh Arrival Guarantee
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
