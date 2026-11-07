import React from 'react';
import { Sparkles, ThermometerSnowflake, Feather, CheckCircle2 } from 'lucide-react';

export const Craftsmanship: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Dedicated Scratch-Baked Crumb',
      description:
        'We never use leftover cake trims or shelf-stable box mixes. Each cake is formulated and slow-baked from scratch specifically for its pop format—calibrating exact moisture, butter fat, and tender crumb density.',
      ingredient: 'European cultured butter & Madagascar Bourbon vanilla beans',
    },
    {
      number: '02',
      title: 'Callebaut Single-Origin Couverture',
      description:
        'Instead of oily candy melts or hydrogenated palm fat, every pop is enveloped in pure Belgian Callebaut chocolate. Tempered with precision to achieve that crisp snap that gives way to a velvety, luscious center.',
      ingredient: 'Pure Belgian cocoa butter & 54% dark / 32% ivory couverture',
    },
    {
      number: '03',
      title: 'Artisan Finishing & 24k Gold Leaf',
      description:
        'No conveyor belts. Every piece is hand-dipped on artisanal stems, drizzled with copper-pot caramels, hand-painted with genuine edible 24-karat gold foil, and sprinkled with crushed freeze-dried fruits or sea salts.',
      ingredient: 'Certified edible 24k gold, Brittany fleur de sel & organic florals',
    },
    {
      number: '04',
      title: 'Climate-Cycled Cold Protection',
      description:
        'Designed to travel anywhere across the country without melting or breaking. Each order is settled into custom moulded protective foam cradles alongside reusable gel ice blocks inside insulated thermal chambers.',
      ingredient: '100% recyclable insulation & zero-crush protective packaging',
    },
  ];

  return (
    <section id="craft" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-900/80">
            Our Small-Batch Philosophy
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight text-balance">
            The anatomy of an artisanal cake pop.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Why our pops taste like a fine French pâtisserie dessert rather than standard grocery dough balls.
          </p>
        </div>

        {/* 4-Step Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-6 rounded-xl bg-[#FAF7F2] border border-stone-200 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <span className="font-serif text-2xl font-medium text-amber-900">
                  {step.number}.
                </span>
                <h3 className="font-serif text-lg font-medium text-stone-900 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/80">
                <div className="text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-1">
                  Key Standard
                </div>
                <div className="text-xs text-stone-700 font-medium">
                  {step.ingredient}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Callout Box: Standard Cake Pops vs. Velvet & Whisk */}
        <div className="mt-14 bg-stone-900 text-stone-100 rounded-2xl p-8 md:p-10 border border-stone-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                Purity &amp; Taste Difference
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-medium text-white">
                Never canned frosting. Never cake scraps.
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Most commercial cake pops are made by mashing discarded bakery trims with sugary canned frosting and dipping them in wax candy coatings. We reject that entirely.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
                  Velvet &amp; Whisk Recipe
                </div>
                <ul className="text-xs text-stone-200 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    Bespoke scratch cake crumb
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    Silky chocolate ganache &amp; compotes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    Pure Callebaut cocoa butter shell
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    Hand-painted 24k gold leaf
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 opacity-75">
                <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
                  Standard Bakery Pop
                </div>
                <ul className="text-xs text-stone-300 space-y-1.5">
                  <li>&times; Leftover trimmed dry cake scraps</li>
                  <li>&times; High-fructose canned shortening frosting</li>
                  <li>&times; Palm-oil candy coating melts</li>
                  <li>&times; Machine-stamped synthetic dyes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
