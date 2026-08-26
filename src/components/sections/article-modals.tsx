'use client';

import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Clock, Lightbulb, User, CheckCircle2 } from 'lucide-react';
import { useLocale } from '@/components/layout/providers';
import { useArticleStore, type ArticleSlug } from '@/store/use-article-store';
import { articlesEn } from '@/content/en/articles';
import { articlesFa } from '@/content/fa/articles';

const ARTICLE_SLUGS: ArticleSlug[] = [
  'what-is-ipl',
  'treatment-schedule',
  'skin-hair-color',
  'safe-home-use',
];

const fadeInVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function ArticleModals() {
  const { locale, direction } = useLocale();
  const { activeArticle, closeArticle } = useArticleStore();
  const isRtl = direction === 'rtl';

  const articlesMap = locale === 'fa' ? articlesFa : articlesEn;

  return (
    <>
      {ARTICLE_SLUGS.map((slug) => {
        const article = articlesMap[slug];
        if (!article) return null;

        const isOpen = activeArticle === slug;

        return (
          <Dialog key={slug} open={isOpen} onOpenChange={(open) => { if (!open) closeArticle(); }}>
            <DialogContent
              className={`sm:max-w-3xl rounded-2xl bg-background p-0 gap-0 ${isRtl ? 'text-right' : 'text-left'}`}
              dir={direction}
            >
              <motion.div
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="max-h-[90vh] overflow-y-auto scrollbar-thin"
              >
                {/* Header */}
                <div className={`p-6 pb-0 ${isRtl ? 'text-right' : 'text-left'}`}>
                  <DialogHeader>
                    <Badge className={`bg-medical-blue/15 text-medical-blue text-xs border-0 hover:bg-medical-blue/20 ${isRtl ? 'ms-auto w-fit' : 'me-auto w-fit'}`}>
                      {article.tag}
                    </Badge>
                    <DialogTitle className="text-2xl font-bold text-foreground mt-3">
                      {article.title}
                    </DialogTitle>
                    <DialogDescription className={`flex items-center gap-4 mt-3 text-sm text-muted-foreground ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-3.5" />
                        {article.readTime}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="size-3.5" />
                        {article.author}
                      </span>
                    </DialogDescription>
                  </DialogHeader>
                </div>

                {/* Content */}
                <div className={`p-6 pt-5 space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}>
                  {article.sections.map((section, idx) => (
                    <div key={idx}>
                      {section.heading && (
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {section.heading}
                        </h3>
                      )}
                      {section.paragraphs.map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-sm text-muted-foreground leading-relaxed mt-1.5"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Key Takeaways */}
                <div className={`px-6 pb-5 ${isRtl ? 'text-right' : 'text-left'}`}>
                  <div className="bg-medical-blue/5 border border-medical-blue/20 rounded-xl p-5">
                    <div className={`flex items-center gap-2 mb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <Lightbulb className="size-4 text-medical-blue" />
                      <h4 className={`text-sm font-semibold text-medical-blue ${isRtl ? 'text-right' : 'text-left'}`}>
                        {isRtl ? 'نکات کلیدی' : 'Key Takeaways'}
                      </h4>
                    </div>
                    <ul className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                      {article.keyTakeaways.map((takeaway, tIdx) => (
                        <li key={tIdx} className={`flex items-start gap-2 text-sm text-muted-foreground leading-relaxed ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <CheckCircle2 className="size-4 text-medical-blue mt-0.5 shrink-0" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className={`px-6 pb-6 ${isRtl ? 'text-right' : 'text-left'}`}>
                  <p className="text-muted-foreground/60 text-xs italic leading-relaxed">
                    {article.disclaimer}
                  </p>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        );
      })}
    </>
  );
}
