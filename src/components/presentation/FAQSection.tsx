'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is included in the 30-day in-home audition?',
    answer:
      'We believe true acoustic performance must be evaluated in your own listening environment with your favorite source material. Try RoH Sound for 30 days. If it does not exceed your expectations, return it in original packaging for a full 100% refund with prepaid return shipping.',
  },
  {
    question: 'How does RoH Sound achieve -48dB Active Noise Cancellation without pressure buildup?',
    answer:
      'Our proprietary neural DSP utilizes an adaptive barometric pressure equalization valve combined with quad feedback/feedforward microphone arrays. It samples external noise at 50kHz and adjusts anti-phase curves dynamically without creating ear fatigue or acoustic suction.',
  },
  {
    question: 'Can I listen to uncompressed lossless audio over wired connections?',
    answer:
      'Yes. RoH Sound includes dual-mode operation. You can listen via Bluetooth 5.4 with LDAC (24-bit/192kHz) or plug in via the included braided USB-C cable for bit-perfect digital audio directly from your Mac, PC, or smartphone, bypassing standard headphone jack compression.',
  },
  {
    question: 'What does the 3-Year RoH Platinum Care warranty cover?',
    answer:
      'The included precision warranty covers all transducer components, battery degradation below 80%, mechanical headband integrity, and neural DSP motherboard replacements. We also offer one complimentary headband cushion replacement during the warranty period.',
  },
  {
    question: 'When will priority pre-orders ship?',
    answer:
      'The initial production batch of RoH Sound is scheduled to ship within 2–3 business days via insured express courier with real-time tracking.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-8 bg-[#fafaf9]">
      <div className="max-w-4xl mx-auto">
        {/* Step Index & Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-semibold tracking-widest text-[#b8934a]">
            07
          </span>
          <span className="h-3 w-px bg-black/10" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Inquiries & Policies
          </span>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-950">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-zinc-600 font-light text-sm sm:text-base">
            Everything you need to know about auditioning, technology, warranty, and delivery.
          </p>
        </div>

        {/* Accordion List */}
        <div className="bg-white rounded-3xl border border-black/[0.06] divide-y divide-black/[0.04] shadow-sm overflow-hidden">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="transition-colors">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 sm:px-8 text-left flex items-center justify-between gap-4 hover:bg-zinc-50/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-medium text-zinc-950">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-zinc-950' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-1 text-sm text-zinc-600 font-light leading-relaxed animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help Footer */}
        <div className="mt-8 flex items-center justify-between p-4 bg-white rounded-2xl border border-black/[0.06] text-xs text-zinc-500 font-mono">
          <span className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#b8934a]" /> Have a technical question?
          </span>
          <a
            href="mailto:support@rohsound.example"
            className="text-zinc-950 font-semibold hover:text-[#b8934a] transition-colors"
          >
            Contact Acoustic Concierge →
          </a>
        </div>
      </div>
    </section>
  );
};
