import React from 'react';
import { Flavor } from '../types/bakery';
import { X, Sparkles, Plus, Check } from 'lucide-react';

interface QuickViewModalProps {
  flavor: Flavor | null;
  onClose: () => void;
  onAddDozen: (flavor: Flavor) => void;
  onAddToBox: (flavor: Flavor) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  flavor,
  onClose,
  onAddDozen,
  onAddToBox,
}) => {
  if (!flavor) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl border border-stone-200 shadow-2xl overflow-hidden text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 shadow-sm transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Image */}
          <div className="md:col-span-5 relative aspect-square md:aspect-auto bg-stone-100">
            <img
              src={flavor.image}
              alt={flavor.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Details */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold">
                {flavor.category} &middot; Tasting Notes
              </div>

              <h3 className="font-serif text-2xl font-medium text-stone-900">
                {flavor.name}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                {flavor.description}
              </p>

              {/* Anatomy details */}
              <div className="pt-3 border-t border-stone-200 space-y-2 text-xs">
                <div>
                  <strong className="text-stone-800">Cake Crumb:</strong>{' '}
                  <span className="text-stone-600">{flavor.crumb}</span>
                </div>
                <div>
                  <strong className="text-stone-800">Infusion:</strong>{' '}
                  <span className="text-stone-600">{flavor.filling}</span>
                </div>
                <div>
                  <strong className="text-stone-800">Couverture:</strong>{' '}
                  <span className="text-stone-600">{flavor.shell}</span>
                </div>
                <div>
                  <strong className="text-stone-800">Hand Adornment:</strong>{' '}
                  <span className="text-stone-600">{flavor.finish}</span>
                </div>
              </div>

              {/* Tasting notes */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                  Flavor Profile
                </span>
                <div className="text-xs text-stone-700 font-medium">
                  {flavor.tastingNotes.join(' &middot; ')}
                </div>
              </div>
            </div>

            {/* Price and actions */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-stone-500">Box of 12</div>
                  <div className="font-serif text-xl font-bold text-stone-900 tabular-nums">
                    ${flavor.priceDozen.toFixed(2)}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-stone-500">Single In Box</div>
                  <div className="text-sm font-semibold text-stone-700 tabular-nums">
                    ${flavor.priceSingle.toFixed(2)} / ea
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onAddToBox(flavor);
                    onClose();
                  }}
                  className="px-4 py-2.5 text-xs font-medium text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors cursor-pointer"
                >
                  Configure in Box
                </button>

                <button
                  onClick={() => {
                    onAddDozen(flavor);
                    onClose();
                  }}
                  className="px-4 py-2.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  Order 1 Dozen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
