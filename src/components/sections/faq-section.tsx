'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle, ListPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { useLocale } from '@/components/layout/providers';
import { getContent } from '@/lib/i18n';
import { useToolStore } from '@/store/use-tool-store';

export default function FaqSection() {
  const { locale, direction } = useLocale();
  const { openTool } = useToolStore();
  const content = getContent(locale);
  const { faq } = content;
  const [showAll, setShowAll] = useState(false);

  const allKeys = useMemo(
    () => faq.items.map((_, i) => 'faq-' + i),
    [faq.items]
  );

  return (
    <section id="faq" className="py-20 md:py-28 bg-background" dir={direction}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-start text-start max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge
            variant="secondary"
            className="mb-4 text-xs px-3 py-1 rounded-full"
          >
            {faq.sectionTag}
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            {faq.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mt-4 leading-relaxed">
            {faq.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <Accordion
            type="multiple"
            className="max-w-3xl mx-auto"
            value={showAll ? allKeys : []}
          >
            {faq.items.map((item, index) => {
              const isLongAnswer = item.answer.length > 200;
              return (
                <AccordionItem
                  key={index}
                  value={'faq-' + index}
                  className="border-b border-border/50"
                >
                  <AccordionTrigger className="py-5 text-foreground font-medium text-start hover:text-medical-blue transition-colors duration-200 hover:no-underline">
                    <span className="flex items-center gap-3">
                      <HelpCircle className="size-4 shrink-0 text-muted-foreground" />
                      <span>{item.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                    <div className="ps-7" data-speakable>
                      {isLongAnswer && (
                        <span className="inline-block font-semibold text-foreground/80 text-xs uppercase tracking-wider mb-2">
                          {locale === 'en' ? 'Answer:' : 'پاسخ:'}
                        </span>
                      )}
                      <span className="inline-block">{item.answer}</span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <Button
            variant="ghost"
            className="text-medical-blue hover:text-medical-blue/80 hover:bg-medical-blue/10 rounded-full px-6"
            onClick={() => setShowAll((prev) => !prev)}
          >
            <ListPlus className={"size-4 " + (direction === 'rtl' ? 'ms-2' : 'me-2')} />
            {showAll
              ? (locale === 'en' ? 'Collapse All' : 'بستن همه')
              : faq.cta}
          </Button>
          <Button
            variant="outline"
            className="border-medical-blue/30 text-medical-blue hover:bg-medical-blue/10 rounded-full px-6"
            onClick={() => openTool('faq-assistant')}
          >
            {locale === 'en' ? 'Ask AI Assistant' : 'پرسش از دستیار هوشمند'}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}