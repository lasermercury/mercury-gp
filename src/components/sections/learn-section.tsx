'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLocale } from '@/components/layout/providers';
import { getContent } from '@/lib/i18n';
import { useArticleStore, type ArticleSlug } from '@/store/use-article-store';
import dynamic from 'next/dynamic';

const ArticleModals = dynamic(
  () => import('@/components/sections/article-modals'),
  { ssr: false }
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function LearnSection() {
  const { locale, direction } = useLocale();
  const content = getContent(locale);
  const { learn } = content;
  const isRtl = direction === 'rtl';
  const { openArticle } = useArticleStore();

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const handleCardClick = (slug: string) => {
    openArticle(slug as ArticleSlug);
  };

  return (
    <section id="learn" className="py-20 md:py-28 bg-navy-deep" dir={direction}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className={`flex flex-col items-start text-start max-w-2xl ${isRtl ? 'items-end text-right' : 'items-start text-left'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge
            variant="outline"
            className="mb-4 text-xs px-3 py-1 rounded-full border-soft-blue/30 text-soft-blue"
          >
            {learn.sectionTag}
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            {learn.title}
          </h2>
          <p className="text-silver/70 max-w-xl mt-4 leading-relaxed">
            {learn.subtitle}
          </p>
        </motion.div>

        {/* Article Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {learn.articles.map((article) => (
            <motion.div key={article.title} variants={cardVariants}>
              <Card
                className="glass rounded-2xl p-6 md:p-8 border-0 shadow-none group hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => handleCardClick(article.slug)}
              >
                <CardContent className="p-0">
                  <Badge className="bg-soft-blue/15 text-soft-blue text-xs border-0 hover:bg-soft-blue/20">
                    {article.tag}
                  </Badge>

                  <h3 className="font-semibold text-white text-lg mt-4 group-hover:text-soft-blue transition-colors duration-200">
                    {article.title}
                  </h3>

                  <p className="text-silver/60 text-sm mt-2 leading-relaxed line-clamp-3">
                    {article.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-silver/40 text-xs flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {article.readTime}
                    </span>
                    <ArrowIcon className="size-4 text-soft-blue/60 group-hover:text-soft-blue transition-colors duration-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <Button
            variant="outline"
            className="border-soft-blue/30 text-soft-blue hover:bg-soft-blue/10 hover:text-soft-blue rounded-full px-6"
            onClick={() => openArticle('what-is-ipl')}
          >
            <BookOpen className="size-4 me-2" />
            {learn.cta}
          </Button>
        </motion.div>
      </div>

      {/* Article Detail Modals */}
      <ArticleModals />
    </section>
  );
}
