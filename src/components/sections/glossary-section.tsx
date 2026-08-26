'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLocale } from '@/components/layout/providers';
import { getContent } from '@/lib/i18n';

export default function GlossarySection() {
  const { locale, direction } = useLocale();
  const content = getContent(locale);
  const { glossary } = content;
  const [searchTerm, setSearchTerm] = useState('');
  const isRtl = direction === 'rtl';

  const filteredTerms = glossary.terms.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="glossary" className="py-20 md:py-28 bg-background" dir={direction}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-start text-start max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge variant="secondary" className="mb-4 text-xs px-3 py-1 rounded-full">
            {glossary.sectionTag}
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            {glossary.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mt-4 leading-relaxed">
            {glossary.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="mt-10 max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className="relative">
            <Search className={"absolute top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50 " + (isRtl ? 'right-3' : 'left-3')} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={locale === 'en' ? 'Search terms...' : 'جستجوی اصطلاحات...'}
              className={
                'w-full rounded-full border border-border/60 bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-medical-blue/30 focus:border-medical-blue/40 transition-all ' +
                (isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4')
              }
              aria-label={locale === 'en' ? 'Search glossary terms' : 'جستجوی اصطلاحات واژه‌نامه'}
            />
          </div>
        </motion.div>

        <motion.div
          className="mt-8 grid gap-4 sm:grid-cols-2 max-h-[600px] overflow-y-auto scrollbar-thin pr-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          {filteredTerms.map((item, index) => (
            <motion.div
              key={index}
              className="rounded-xl border border-border/40 bg-card p-5 hover:border-medical-blue/30 transition-colors duration-200"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
            >
              <div className="flex items-start gap-3">
                <BookOpen className="size-4 shrink-0 text-medical-blue mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground leading-tight">
                    {item.term}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mt-2">
                    {item.definition}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredTerms.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground/60 text-sm">
              {locale === 'en' ? 'No terms match your search.' : 'هیچ اصطلاحی با جستجوی شما مطابقت ندارد.'}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
