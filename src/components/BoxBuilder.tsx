import React, { useState } from 'react';
import { Flavor, BoxSizeOption, StickOption, RibbonOption, CustomBoxItem } from '../types/bakery';
import { BOX_SIZES, STICK_OPTIONS, RIBBON_OPTIONS } from '../data/flavors';
import { Plus, Minus, Check, Gift, Sparkles, RefreshCw } from 'lucide-react';

interface BoxBuilderProps {
  flavors: Flavor[];
  onAddCustomBoxToCart: (box: CustomBoxItem) => void;
  initialFlavorToAdd?: Flavor | null;
}

export const BoxBuilder: React.FC<BoxBuilderProps> = ({
  flavors,
  onAddCustomBoxToCart,
  initialFlavorToAdd,
}) => {
  const [selectedSize, setSelectedSize] = useState<BoxSizeOption>(BOX_SIZES[1]); // 12-pack default
  const [flavorCounts, setFlavorCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    flavors.forEach((f) => {
      initial[f.id] = 0;
    });
    // Pre-populate a balanced favorite assortment so it feels ready to order or tweak
    if (initialFlavorToAdd) {
      initial[initialFlavorToAdd.id] = 2;
    } else {
      initial['salted-caramel'] = 4;
      initial['raspberry-rose'] = 4;
      initial['matcha-pistachio'] = 4;
    }
    return initial;
  });

  const [selectedStick, setSelectedStick] = useState<StickOption>(STICK_OPTIONS[0]);
  const [selectedRibbon, setSelectedRibbon] = useState<RibbonOption>(RIBBON_OPTIONS[0]);

  const [includeGiftNote, setIncludeGiftNote] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<string>('');
  const [giftMessage, setGiftMessage] = useState<string>('');
  const [sender, setSender] = useState<string>('');
  const [justAdded, setJustAdded] = useState<boolean>(false);

  // Compute total selected pops
  const totalSelectedCount = Object.values(flavorCounts).reduce((a, b) => a + b, 0);
  const remainingSlots = selectedSize.count - totalSelectedCount;
  const isBoxFull = totalSelectedCount === selectedSize.count;

  const handleIncrement = (flavorId: string) => {
    if (totalSelectedCount >= selectedSize.count) return;
    setFlavorCounts((prev) => ({
      ...prev,
      [flavorId]: (prev[flavorId] || 0) + 1,
    }));
  };

  const handleDecrement = (flavorId: string) => {
    if (!flavorCounts[flavorId] || flavorCounts[flavorId] <= 0) return;
    setFlavorCounts((prev) => ({
      ...prev,
      [flavorId]: prev[flavorId] - 1,
    }));
  };

  const handleResetAssortment = () => {
    const empty: Record<string, number> = {};
    flavors.forEach((f) => {
      empty[f.id] = 0;
    });
    setFlavorCounts(empty);
  };

  const handleFillEvenly = () => {
    const newCounts: Record<string, number> = {};
    const flavorKeys = flavors.map((f) => f.id);
    const perFlavor = Math.floor(selectedSize.count / flavorKeys.length);
    let remainder = selectedSize.count % flavorKeys.length;

    flavorKeys.forEach((key) => {
      newCounts[key] = perFlavor + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder--;
    });
    setFlavorCounts(newCounts);
  };

  const handleSizeChange = (newSize: BoxSizeOption) => {
    setSelectedSize(newSize);
    // If current count exceeds new capacity, scale back proportionally or reset
    if (totalSelectedCount > newSize.count) {
      const empty: Record<string, number> = {};
      const flavorKeys = flavors.map((f) => f.id);
      const perFlavor = Math.floor(newSize.count / flavorKeys.length);
      let remainder = newSize.count % flavorKeys.length;
      flavorKeys.forEach((key) => {
        newCounts: empty[key] = perFlavor + (remainder > 0 ? 1 : 0);
        if (remainder > 0) remainder--;
      });
      setFlavorCounts(empty);
    }
  };

  const handleAddToCart = () => {
    if (!isBoxFull) return;

    const selectedFlavorsList = Object.entries(flavorCounts)
      .filter(([_, count]) => count > 0)
      .map(([flavorId, count]) => ({ flavorId, count }));

    const boxItem: CustomBoxItem = {
      id: `box-${Date.now()}`,
      size: selectedSize,
      selectedFlavors: selectedFlavorsList,
      stick: selectedStick,
      ribbon: selectedRibbon,
      giftNote: includeGiftNote
        ? {
            recipient,
            message: giftMessage,
            sender,
          }
        : undefined,
      totalPrice: selectedSize.price,
    };

    onAddCustomBoxToCart(boxItem);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 2200);
  };

  // Build an array of filled slots for visual tray
  const visualSlots: { flavor?: Flavor; index: number }[] = [];
  let currentSlot = 0;
  flavors.forEach((f) => {
    const count = flavorCounts[f.id] || 0;
    for (let i = 0; i < count; i++) {
      if (currentSlot < selectedSize.count) {
        visualSlots.push({ flavor: f, index: currentSlot });
        currentSlot++;
      }
    }
  });
  while (visualSlots.length < selectedSize.count) {
    visualSlots.push({ flavor: undefined, index: visualSlots.length });
  }

  return (
    <section id="box-builder" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-900/80">
            Interactive Tasting Box
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight text-balance">
            Build your custom confectionery gift box.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Select your box format, tailor every single flavor slot, choose your satin ribbon, and add an optional handwritten gift card.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Area: Builder Controls (8 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Box Size Selection */}
            <div className="bg-white p-6 rounded-xl border border-stone-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Step 1 &middot; Choose Your Box Size
                </span>
                <span className="text-xs text-stone-500">
                  {selectedSize.count} Pops Capacity
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BOX_SIZES.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => handleSizeChange(size)}
                    className={`p-4 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      selectedSize.id === size.id
                        ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                        : 'border-stone-200 hover:border-stone-300 bg-[#FAF7F2] text-stone-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="font-serif font-medium text-base">
                          {size.name}
                        </div>
                        {size.popular && (
                          <span className={`text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded ${
                            selectedSize.id === size.id ? 'bg-amber-400 text-stone-950' : 'bg-amber-100 text-amber-900'
                          }`}>
                            Popular
                          </span>
                        )}
                      </div>
                      <div className={`text-xs mt-1 ${selectedSize.id === size.id ? 'text-stone-300' : 'text-stone-500'}`}>
                        {size.count} Hand-dipped Pops
                      </div>
                    </div>

                    <div className="mt-4 pt-2 border-t border-current/20 flex items-baseline justify-between">
                      <span className="text-xs opacity-75">Fixed Box Price</span>
                      <span className="text-base font-bold tabular-nums">
                        ${size.price.toFixed(2)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Flavor Slot Assignment */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Step 2 &middot; Assign Your Flavors
                  </span>
                  <div className="text-sm font-medium text-stone-900">
                    {remainingSlots > 0 ? (
                      <span className="text-amber-800">
                        {remainingSlots} {remainingSlots === 1 ? 'pop' : 'pops'} remaining to fill your box
                      </span>
                    ) : (
                      <span className="text-emerald-800 font-semibold flex items-center gap-1.5">
                        <Check className="w-4 h-4" /> Box is perfectly filled!
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleFillEvenly}
                    className="text-xs text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2.5 py-1.5 rounded transition-colors cursor-pointer"
                  >
                    Blend Evenly
                  </button>
                  <button
                    onClick={handleResetAssortment}
                    className="text-xs text-stone-500 hover:text-stone-800 p-1.5 transition-colors cursor-pointer"
                    title="Clear slots"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Flavor list with tactile counter buttons */}
              <div className="space-y-3 pt-2">
                {flavors.map((flavor) => {
                  const count = flavorCounts[flavor.id] || 0;
                  return (
                    <div
                      key={flavor.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-stone-100 bg-[#FAF7F2] hover:border-stone-200 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={flavor.image}
                          alt={flavor.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-serif text-sm font-medium text-stone-900">
                            {flavor.name}
                          </div>
                          <div className="text-xs text-stone-500 line-clamp-1">
                            {flavor.tagline}
                          </div>
                        </div>
                      </div>

                      {/* Stepper control */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleDecrement(flavor.id)}
                          disabled={count === 0}
                          className="w-8 h-8 rounded-md bg-white border border-stone-300 text-stone-700 flex items-center justify-center hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                          aria-label={`Decrease ${flavor.name}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <span className="w-7 text-center font-semibold text-sm text-stone-900 tabular-nums">
                          {count}
                        </span>

                        <button
                          onClick={() => handleIncrement(flavor.id)}
                          disabled={isBoxFull}
                          className="w-8 h-8 rounded-md bg-stone-900 text-white flex items-center justify-center hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                          aria-label={`Increase ${flavor.name}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Stick & Ribbon Styling */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Step 3 &middot; Stem &amp; Presentation Ribbon
                </span>
              </div>

              {/* Stick options */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-stone-700">Display Stem Style</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {STICK_OPTIONS.map((stick) => (
                    <button
                      key={stick.id}
                      onClick={() => setSelectedStick(stick)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        selectedStick.id === stick.id
                          ? 'border-stone-900 bg-stone-50 text-stone-950 font-medium'
                          : 'border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-stone-300"
                          style={{ backgroundColor: stick.colorHex }}
                        />
                        <span className="text-xs font-semibold">{stick.name}</span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1 line-clamp-1">
                        {stick.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ribbon options */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-stone-700">Hand-Tied Satin Ribbon</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {RIBBON_OPTIONS.map((ribbon) => (
                    <button
                      key={ribbon.id}
                      onClick={() => setSelectedRibbon(ribbon)}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        selectedRibbon.id === ribbon.id
                          ? 'border-stone-900 bg-stone-50 font-medium'
                          : 'border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border shadow-xs shrink-0"
                        style={{
                          backgroundColor: ribbon.colorHex,
                          borderColor: ribbon.borderHex,
                        }}
                      />
                      <span className="text-xs truncate">{ribbon.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Handwritten Gift Note */}
              <div className="pt-4 border-t border-stone-200 space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeGiftNote}
                    onChange={(e) => setIncludeGiftNote(e.target.checked)}
                    className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-amber-500"
                  />
                  <span className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-amber-700" />
                    Include Complimentary Hand-Written Calligraphy Note
                  </span>
                </label>

                {includeGiftNote && (
                  <div className="p-4 bg-[#FAF7F2] rounded-lg border border-stone-200 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Recipient Name (To)
                        </label>
                        <input
                          type="text"
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                          placeholder="e.g. Eleanor Vance"
                          className="w-full text-xs px-3 py-2 bg-white rounded border border-stone-300 focus:outline-none focus:border-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Sender Name (From)
                        </label>
                        <input
                          type="text"
                          value={sender}
                          onChange={(e) => setSender(e.target.value)}
                          placeholder="e.g. Julian"
                          className="w-full text-xs px-3 py-2 bg-white rounded border border-stone-300 focus:outline-none focus:border-stone-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Personal Message
                      </label>
                      <textarea
                        rows={2}
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        placeholder="Wishing you the sweetest birthday celebration! May this year be as wonderful as you are..."
                        className="w-full text-xs px-3 py-2 bg-white rounded border border-stone-300 focus:outline-none focus:border-stone-900 resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Area: Tactile Live Box Tray & Add to Bag (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-900">
                    Live Box Preview
                  </div>
                  <div className="font-serif text-xl font-medium text-stone-900">
                    {selectedSize.name}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-stone-500">Box Total</div>
                  <div className="font-serif text-2xl font-bold text-stone-900 tabular-nums">
                    ${selectedSize.price.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Visual Box Tray Representation */}
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-dashed border-stone-300">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 mb-3 flex items-center justify-between">
                  <span>Confectionery Crate Slots</span>
                  <span className="font-mono text-stone-700">
                    {totalSelectedCount}/{selectedSize.count} filled
                  </span>
                </div>

                {/* Slots Grid */}
                <div
                  className={`grid gap-2.5 ${
                    selectedSize.count === 6
                      ? 'grid-cols-3'
                      : selectedSize.count === 12
                      ? 'grid-cols-4'
                      : 'grid-cols-6'
                  }`}
                >
                  {visualSlots.map((slot, idx) => (
                    <div
                      key={idx}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center p-1 text-center transition-all duration-300 ${
                        slot.flavor
                          ? 'bg-white border border-stone-300 shadow-xs'
                          : 'border border-dashed border-stone-300 bg-stone-100/60'
                      }`}
                      title={slot.flavor ? slot.flavor.name : 'Empty Slot'}
                    >
                      {slot.flavor ? (
                        <div className="relative w-full h-full flex flex-col items-center justify-center">
                          <img
                            src={slot.flavor.image}
                            alt={slot.flavor.name}
                            className="w-full h-full rounded object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <span className="text-[10px] text-stone-400 font-mono">
                          #{idx + 1}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Packaging preview callout */}
                <div className="mt-4 pt-3 border-t border-stone-200/80 text-xs text-stone-600 flex items-center justify-between">
                  <span>Stem: <strong className="text-stone-800">{selectedStick.name}</strong></span>
                  <span>Ribbon: <strong className="text-stone-800">{selectedRibbon.name}</strong></span>
                </div>
              </div>

              {/* Summary Breakdown */}
              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>{selectedSize.count} Handcrafted Pops</span>
                  <span className="tabular-nums">${selectedSize.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gift Box &amp; Protective Cold Cradle</span>
                  <span className="text-emerald-700 font-medium">Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Custom Ribbon &amp; Stem Dressing</span>
                  <span className="text-emerald-700 font-medium">Included</span>
                </div>
                {includeGiftNote && (
                  <div className="flex justify-between text-amber-900 font-medium">
                    <span>Calligraphy Gift Note</span>
                    <span className="text-emerald-700">Free</span>
                  </div>
                )}
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                disabled={!isBoxFull}
                className={`w-full py-3.5 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  justAdded
                    ? 'bg-emerald-800 text-white'
                    : isBoxFull
                    ? 'bg-stone-900 hover:bg-stone-800 text-white shadow-md'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added Custom Box to Bag!</span>
                  </>
                ) : isBoxFull ? (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Add Custom Tasting Box to Bag &middot; ${selectedSize.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span>Select {remainingSlots} more {remainingSlots === 1 ? 'pop' : 'pops'} to complete</span>
                )}
              </button>

              <div className="text-[11px] text-stone-500 text-center">
                Need 48+ pops for an event? Check our <a href="#catering" className="text-stone-800 underline underline-offset-2">Event Catering options</a>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
