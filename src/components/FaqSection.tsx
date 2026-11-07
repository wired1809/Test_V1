import React, { useState } from 'react';
import { FAQS } from '../data/flavors';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-900/80">
            Frequently Asked Questions
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight text-balance mt-2">
            Everything you need to know about our confections.
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Have a custom flavor or dietary inquiry not answered here? Reach out to our bakery team anytime.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-stone-200 bg-[#FAF7F2] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-medium text-stone-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-stone-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-stone-200/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
