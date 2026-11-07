import React, { useState } from 'react';
import { Flavor } from '../types/bakery';
import { Eye, Plus, Check } from 'lucide-react';

interface FlavorGalleryProps {
  flavors: Flavor[];
  onSelectFlavorQuickView: (flavor: Flavor) => void;
  onAddDozenToCart: (flavor: Flavor) => void;
  onAddToCustomBox: (flavor: Flavor) => void;
}

export const FlavorGallery: React.FC<FlavorGalleryProps> = ({
  flavors,
  onSelectFlavorQuickView,
  onAddDozenToCart,
  onAddToCustomBox,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [addedDozenId, setAddedDozenId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Flavors' },
    { id: 'signature', label: 'Signature Classics' },
    { id: 'botanical', label: 'Botanical & Fruit' },
    { id: 'chocolate', label: 'Decadent Chocolates' },
    { id: 'seasonal', label: 'Seasonal Reserve' },
  ];

  const filteredFlavors = flavors.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleAddDozen = (flavor: Flavor) => {
    onAddDozenToCart(flavor);
    setAddedDozenId(flavor.id);
    setTimeout(() => {
      setAddedDozenId(null);
    }, 1800);
  };

  return (
    <section id="flavors" className="py-16 md:py-24 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-900/80">
              The Artisan Collection
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight text-balance">
              Small-batch flavors, perfected by hand.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Every pop begins with our dedicated slow-baked sponge, enveloped in pure tempered Belgian chocolate and adorned with natural finishes.
            </p>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg border border-stone-200 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-white text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFlavors.map((flavor) => (
            <article
              key={flavor.id}
              className="group flex flex-col bg-[#FAF7F2] rounded-xl border border-stone-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              {/* Product Visual Container (takes ~65% visual weight) */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                <img
                  src={flavor.image}
                  alt={flavor.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Quick View overlay button */}
                <button
                  onClick={() => onSelectFlavorQuickView(flavor)}
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-stone-900/85 hover:bg-stone-900 text-stone-50 text-xs font-medium rounded-md backdrop-blur-sm transition-opacity opacity-90 group-hover:opacity-100 cursor-pointer shadow-sm"
                  aria-label={`Quick view ${flavor.name}`}
                >
                  <Eye className="w-3.5 h-3.5 text-amber-300" />
                  <span>Tasting Notes</span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Clean unboxed metadata with typographic separators (NO PILLS) */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                    <span className="capitalize text-amber-900 font-semibold">{flavor.category}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>${flavor.priceSingle.toFixed(2)} / ea</span>
                    {flavor.bestseller && (
                      <>
                        <span aria-hidden="true">&middot;</span>
                        <span className="text-stone-700 font-medium">Popular</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-serif text-xl font-medium text-stone-900 group-hover:text-amber-950 transition-colors">
                    {flavor.name}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {flavor.description}
                  </p>
                </div>

                {/* Tasting notes highlights */}
                <div className="pt-2 border-t border-stone-200/80">
                  <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold mb-1">
                    Notes
                  </div>
                  <div className="text-xs text-stone-700 font-medium">
                    {flavor.tastingNotes.join(' &middot; ')}
                  </div>
                </div>

                {/* Action Row */}
                <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-stone-500">Box of 12</div>
                    <div className="text-sm font-semibold text-stone-900 tabular-nums">
                      ${flavor.priceDozen.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onAddToCustomBox(flavor)}
                      className="px-3 py-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                      title="Add to your custom box builder"
                    >
                      + Add to Box
                    </button>

                    <button
                      onClick={() => handleAddDozen(flavor)}
                      className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                        addedDozenId === flavor.id
                          ? 'bg-emerald-800 text-white'
                          : 'bg-stone-900 hover:bg-stone-800 text-white'
                      }`}
                    >
                      {addedDozenId === flavor.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <span>Order Dozen</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
