import React from 'react';
import { TESTIMONIALS } from '../data/flavors';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-900/80">
            Client Love &amp; Celebrations
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight text-balance">
            Cherished by brides, event directors &amp; sweet tooths.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Real stories from intimate dinner tables to grand ballroom receptions.
          </p>
        </div>

        {/* 3-Column Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#FAF7F2] p-8 rounded-xl border border-stone-200 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Clean 5-star rating */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-stone-700 text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Attribution (Attributable Testimonial with Metric) */}
              <div className="pt-4 border-t border-stone-200/80">
                <div className="font-serif text-base font-semibold text-stone-900">
                  {t.author}
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  {t.role}
                </div>
                <div className="text-[11px] font-mono text-amber-900/90 mt-1.5 font-medium">
                  {t.metric}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Press mentions banner */}
        <div className="mt-14 pt-8 border-t border-stone-200 flex flex-wrap items-center justify-between gap-6 text-stone-400">
          <span className="text-xs uppercase tracking-widest font-semibold text-stone-500">
            Recognized by editors &amp; sommeliers:
          </span>
          <div className="flex flex-wrap items-center gap-8 md:gap-12 font-serif text-lg tracking-wide text-stone-600">
            <span className="hover:text-stone-900 transition-colors">Martha Stewart Weddings</span>
            <span className="hover:text-stone-900 transition-colors">San Francisco Chronicle Food</span>
            <span className="hover:text-stone-900 transition-colors">The Knot Best of Confections</span>
            <span className="hover:text-stone-900 transition-colors">Vogue Entertaining</span>
          </div>
        </div>
      </div>
    </section>
  );
};
