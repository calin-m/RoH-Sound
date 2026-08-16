'use client';

import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What is included in the 30-day in-home audition?',
    answer: 'We want you to experience RoH Sound in your personal acoustic environment. If within 30 days you are not completely enchanted by the soundstage clarity, simply return them in original condition for a 100% full refund with complimentary return shipping.',
  },
  {
    question: 'How does RoH Sound achieve -48dB Active Noise Cancellation?',
    answer: 'RoH Sound uses custom neural DSP algorithms sampling environmental audio 50,000 times per second paired with an adaptive barometric pressure equalization valve to eliminate low and mid frequencies without ear fatigue.',
  },
  {
    question: 'How does RoH Sound connect to my audio source?',
    answer: 'RoH Sound supports Bluetooth 5.4 with high-resolution LDAC and AAC codecs. For zero-latency studio mastering, use the included 1.5m braided USB-C digital audio cable (supporting 24-bit/192kHz DAC streaming) or the 3.5mm gold-plated analog cable with included 6.35mm adapter.',
  },
  {
    question: 'Can I replace the ear cushions over time?',
    answer: 'Yes. The Italian protein leather memory foam ear cushions feature a magnetic self-aligning acoustic latch. Replacement pads in all matching colorways are readily available through our Atelier store.',
  },
  {
    question: 'What is included with my pre-order package?',
    answer: 'Every RoH Sound flagship set includes: RoH Sound Headphones, Magnetic Hard Travel Case, 1.5m Braided USB-C Lossless Cable, 1.2m 3.5mm Analog Audio Cable, 6.35mm Gold-Plated Studio Adapter, Flight Adapter, and Certificate of Acoustic Calibration.',
  },
  {
    question: 'What warranty is included?',
    answer: 'Every pair includes our 3-Year Precision Limited Warranty covering all electronic transducers, battery degradation beyond 20%, and structural components.',
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
        {/* Section Header */}
        <MotionReveal direction="up">
          <SectionHeader
            step="07"
            eyebrow="Inquiries & Policies"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about delivery, warranty, audio connectivity, and our in-home audition policy."
            className="mb-12"
          />
        </MotionReveal>

        {/* Accordion List with Staggered Entrance */}
        <StaggerGroup staggerInterval={60} direction="up" className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-zinc-50/50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-medium text-zinc-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-zinc-950' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-zinc-600 font-light leading-relaxed border-t border-black/[0.04] pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
};
