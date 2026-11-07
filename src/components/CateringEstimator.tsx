import React, { useState } from 'react';
import { CateringInquiry } from '../types/bakery';
import { Users, Calendar, Sparkles, Check, Send, Award, Clock } from 'lucide-react';

export const CateringEstimator: React.FC = () => {
  const [guestCount, setGuestCount] = useState<number>(80);
  const [displayStyle, setDisplayStyle] = useState<'tower' | 'individual' | 'platters' | 'bouquet'>('tower');
  const [includeMonogram, setIncludeMonogram] = useState<boolean>(true);
  const [includeCustomColors, setIncludeCustomColors] = useState<boolean>(true);
  const [glutenFreeRatio, setGlutenFreeRatio] = useState<number>(15); // percent

  // Inquiry form states
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('2026-10-14');
  const [eventType, setEventType] = useState<'wedding' | 'corporate' | 'birthday' | 'baby-shower' | 'other'>('wedding');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Estimator math
  const popsPerGuest = 1.5;
  const totalPops = Math.round(guestCount * popsPerGuest);
  const baseRatePerPop = totalPops >= 200 ? 3.25 : totalPops >= 100 ? 3.45 : 3.65;
  const basePopsCost = totalPops * baseRatePerPop;

  // Add-ons
  const displayCost =
    displayStyle === 'tower'
      ? totalPops >= 120 ? 0 : 45
      : displayStyle === 'individual'
      ? totalPops * 1.25 // individual boxes with wax seal
      : displayStyle === 'bouquet'
      ? 65
      : 0;

  const monogramCost = includeMonogram ? totalPops * 0.45 : 0;
  const estimatedTotal = basePopsCost + displayCost + monogramCost;

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setSubmitted(true);
  };

  return (
    <section id="catering" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-900/80">
            Event &amp; Wedding Catering
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight text-balance">
            Bespoke dessert displays for your milestone moments.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            From Sonoma vineyard weddings to Silicon Valley product launches, calculate an instant estimate and reserve your celebration date.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Estimator Tool (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-sm space-y-8">
            {/* Guest Count Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-800" />
                  Expected Guest Count
                </label>
                <span className="font-serif text-xl font-bold text-stone-900 tabular-nums">
                  {guestCount} Guests
                </span>
              </div>

              <input
                type="range"
                min="20"
                max="400"
                step="5"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
              />

              <div className="flex justify-between text-[11px] text-stone-400">
                <span>20 Guests (Intimate Gathering)</span>
                <span>200 (Grand Reception)</span>
                <span>400+ (Convention)</span>
              </div>
            </div>

            {/* Display Format Choice */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Presentation &amp; Service Format
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDisplayStyle('tower')}
                  className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                    displayStyle === 'tower'
                      ? 'border-stone-900 bg-stone-50 text-stone-950 font-medium shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <div className="font-serif text-sm font-medium">Tiered Acrylic Tower</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Multi-tier stand, centerpiece dessert table impact
                  </div>
                  <div className="text-[11px] font-semibold text-amber-900 mt-2">
                    {totalPops >= 120 ? 'Free with your order size' : '+$45 Stand Rental'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDisplayStyle('individual')}
                  className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                    displayStyle === 'individual'
                      ? 'border-stone-900 bg-stone-50 text-stone-950 font-medium shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <div className="font-serif text-sm font-medium">Individual Favor Boxes</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Clear cubes with hand-stamped wax seal &amp; ribbon
                  </div>
                  <div className="text-[11px] font-semibold text-amber-900 mt-2">
                    +$1.25 per guest favor
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDisplayStyle('platters')}
                  className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                    displayStyle === 'platters'
                      ? 'border-stone-900 bg-stone-50 text-stone-950 font-medium shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <div className="font-serif text-sm font-medium">Artisan Platter Buffets</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Ready-to-serve travertine &amp; marble board arrangements
                  </div>
                  <div className="text-[11px] font-semibold text-amber-900 mt-2">
                    Included complimentary
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDisplayStyle('bouquet')}
                  className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                    displayStyle === 'bouquet'
                      ? 'border-stone-900 bg-stone-50 text-stone-950 font-medium shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <div className="font-serif text-sm font-medium">Confectionery Bouquets</div>
                  <div className="text-xs text-stone-500 mt-1">
                    Floral vase table centerpieces with fresh greenery
                  </div>
                  <div className="text-[11px] font-semibold text-amber-900 mt-2">
                    +$65 setup &amp; vases
                  </div>
                </button>
              </div>
            </div>

            {/* Customization toggles */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                Bespoke Styling Options
              </label>

              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 rounded-lg border border-stone-200 hover:bg-stone-50 cursor-pointer">
                  <div className="text-xs text-stone-800">
                    <span className="font-semibold">24k Gold Monogramming or Corporate Logo Foil</span>
                    <p className="text-[11px] text-stone-500">Custom embossed initials or brand emblem on each chocolate crown</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeMonogram}
                    onChange={(e) => setIncludeMonogram(e.target.checked)}
                    className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-amber-500 shrink-0"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border border-stone-200 hover:bg-stone-50 cursor-pointer">
                  <div className="text-xs text-stone-800">
                    <span className="font-semibold">Custom Pantone Chocolate Tinting</span>
                    <p className="text-[11px] text-stone-500">Match your exact event palette using organic food-grade botanical pigments</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeCustomColors}
                    onChange={(e) => setIncludeCustomColors(e.target.checked)}
                    className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-amber-500 shrink-0"
                  />
                </label>
              </div>
            </div>

            {/* Live Pricing Breakdown Bar */}
            <div className="p-4 bg-[#FAF7F2] rounded-lg border border-stone-200 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Instant Estimate Summary
              </div>
              <div className="flex justify-between text-xs text-stone-700">
                <span>Recommended Count ({popsPerGuest} per guest)</span>
                <span className="font-semibold tabular-nums">{totalPops} Hand-dipped Pops</span>
              </div>
              <div className="flex justify-between text-xs text-stone-700">
                <span>Base Tier Rate (${baseRatePerPop.toFixed(2)}/ea)</span>
                <span className="tabular-nums">${basePopsCost.toFixed(2)}</span>
              </div>
              {displayCost > 0 && (
                <div className="flex justify-between text-xs text-stone-700">
                  <span>Display Hardware / Favor Packaging</span>
                  <span className="tabular-nums">${displayCost.toFixed(2)}</span>
                </div>
              )}
              {monogramCost > 0 && (
                <div className="flex justify-between text-xs text-stone-700">
                  <span>Edible Gold Monogramming</span>
                  <span className="tabular-nums">${monogramCost.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-stone-300 flex justify-between items-baseline">
                <span className="font-medium text-stone-900 text-sm">Estimated Total</span>
                <span className="font-serif text-2xl font-bold text-stone-900 tabular-nums">
                  ${estimatedTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Date Reservation & Tasting Kit Request Form (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-sm space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-900">
                Step 2 &middot; Tasting Kit &amp; Date Hold
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mt-1">
                Request your bespoke tasting kit.
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                We send a complimentary 6-flavor tasting kit to your door so you and your partner or planning committee can sample before confirming.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-medium text-emerald-950">
                  Tasting Request Received!
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thank you, {fullName}. Our event culinary director will review your date ({eventDate}) and dispatch your 6-pop custom tasting kit to your attention within 24 hours.
                </p>
                <div className="text-[11px] text-emerald-700 font-mono">
                  Reference: #CAT-{Math.floor(1000 + Math.random() * 9000)} &middot; {totalPops} Pops Estimated
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-emerald-900 underline underline-offset-2 cursor-pointer"
                >
                  Submit another date or modify request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Camille Vance"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="camille@example.com"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(415) 829-1042"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Celebration Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Event Category
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value as any)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                    >
                      <option value="wedding">Wedding &amp; Reception</option>
                      <option value="corporate">Corporate Gala or Summit</option>
                      <option value="birthday">Milestone Birthday</option>
                      <option value="baby-shower">Baby Shower / Bridal Tea</option>
                      <option value="other">Private Celebration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Venue Location &amp; Theme Notes
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Viansa Sonoma Winery; blush pink and sage green floral palette; need 25 gluten-friendly pops..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-stone-900 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm uppercase tracking-wider"
                >
                  <Send className="w-3.5 h-3.5 text-amber-300" />
                  <span>Request Tasting Kit &middot; Hold My Date</span>
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    24h Response
                  </span>
                  <span>&middot;</span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-stone-400" />
                    Free Tasting Kit
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
