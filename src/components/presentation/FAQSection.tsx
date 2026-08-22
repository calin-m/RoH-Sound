'use client';

import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { Accordion, AccordionItem } from '../ui/Accordion';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { StaggerGroup } from '@/components/motion/StaggerGroup';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is included in the 30-day in-home audition?',
    answer: 'We want you to experience RoH Sound in your personal acoustic environment. If within 30 days you are not completely enchanted by the soundstage clarity, simply return them in original condition for a 100% full refund with complimentary return shipping.',
  },
  {
    id: 'faq-2',
    question: 'How does RoH Sound achieve -48dB Active Noise Cancellation?',
    answer: 'RoH Sound uses custom neural DSP algorithms sampling environmental audio 50,000 times per second paired with an adaptive barometric pressure equalization valve to eliminate low and mid frequencies without ear fatigue.',
  },
  {
    id: 'faq-3',
    question: 'How does RoH Sound connect to my audio source?',
    answer: 'RoH Sound supports Bluetooth 5.4 with high-resolution LDAC and AAC codecs. For zero-latency studio mastering, use the included 1.5m braided USB-C digital audio cable (supporting 24-bit/192kHz DAC streaming) or the 3.5mm gold-plated analog cable with included 6.35mm adapter.',
  },
  {
    id: 'faq-4',
    question: 'Can I replace the ear cushions over time?',
    answer: 'Yes. The Italian protein leather memory foam ear cushions feature a magnetic self-aligning acoustic latch. Replacement pads in all matching colorways are readily available through our Atelier store.',
  },
  {
    id: 'faq-5',
    question: 'What is included with my pre-order package?',
    answer: 'Every RoH Sound flagship set includes: RoH Sound Headphones, Magnetic Hard Travel Case, 1.5m Braided USB-C Lossless Cable, 1.2m 3.5mm Analog Audio Cable, 6.35mm Gold-Plated Studio Adapter, Flight Adapter, and Certificate of Acoustic Calibration.',
  },
  {
    id: 'faq-6',
    question: 'What warranty is included?',
    answer: 'Every pair includes our 3-Year Precision Limited Warranty covering all electronic transducers, battery degradation beyond 20%, and structural components.',
  },
];

export interface FAQSectionProps {
  faqs?: FAQItem[];
  className?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs = DEFAULT_FAQS,
  className = '',
}) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className={`section-anchor py-24 px-4 sm:px-8 bg-canvas ${className}`}>
      <div className="max-w-6xl mx-auto">
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
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-hairline shadow-xs">
          <Accordion>
            <StaggerGroup staggerInterval={60} direction="up">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  id={faq.id}
                  title={faq.question}
                  isOpen={openId === faq.id}
                  onToggle={() => toggleFaq(faq.id)}
                >
                  {faq.answer}
                </AccordionItem>
              ))}
            </StaggerGroup>
          </Accordion>
        </div>
      </div>
    </section>
  );
};
