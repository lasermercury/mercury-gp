'use client';

import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLocale } from '@/components/layout/providers';
import { getContent } from '@/lib/i18n';
import { useComparisonStore } from '@/store/use-comparison-store';

type ComparisonKey = 'philips-lumea' | 'braun-silk-expert-pro-5' | 'ulike' | 'deess' | 'silkn';

const COMPETITOR_KEYS: ComparisonKey[] = [
  'philips-lumea',
  'braun-silk-expert-pro-5',
  'ulike',
  'deess',
  'silkn',
];

const fadeInVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function ComparisonModals() {
  const { locale, direction } = useLocale();
  const { activeCompetitor, closeComparison } = useComparisonStore();
  const content = getContent(locale);
  const { comparisonDetails } = content;
  const isRtl = direction === 'rtl';

  return (
    <>
      {COMPETITOR_KEYS.map((key) => {
        const details = comparisonDetails[key];
        if (!details) return null;

        const isOpen = activeCompetitor === key;
        const isEven = (index: number) => index % 2 === 0;

        // Column order: competitor first in LTR, but in RTL the visual order flips automatically via dir
        const competitorHeader = isRtl ? 'مرکوری GP' : details.name;
        const mercuryHeader = isRtl ? details.name : 'Mercury GP';

        return (
          <Dialog key={key} open={isOpen} onOpenChange={(open) => { if (!open) closeComparison(); }}>
            <DialogContent
              className={`sm:max-w-3xl rounded-2xl bg-background ${isRtl ? 'text-right' : 'text-left'}`}
              dir={direction}
            >
              <motion.div
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="max-h-[85vh] overflow-y-auto"
              >
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-foreground">
                    {details.name}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    {isRtl ? (
                      <>{'مقایسه با مرکوری GP'}</>
                    ) : (
                      <>{`vs Mercury GP`}</>
                    )}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {details.overview}
                  </p>
                </div>

                <div className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/60 hover:bg-transparent">
                        <TableHead className={`font-semibold text-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                          {isRtl ? 'ویژگی' : 'Specification'}
                        </TableHead>
                        <TableHead className={`font-semibold text-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                          {competitorHeader}
                        </TableHead>
                        <TableHead className={`font-semibold text-medical-blue ${isRtl ? 'text-right' : 'text-left'}`}>
                          {mercuryHeader}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {details.specifications.map((spec, index) => (
                        <TableRow
                          key={spec.label}
                          className={`${isEven(index) ? 'bg-muted/30' : ''} border-border/40 hover:bg-muted/40`}
                        >
                          <TableCell className={`text-foreground font-medium whitespace-normal ${isRtl ? 'text-right' : 'text-left'}`}>
                            {spec.label}
                          </TableCell>
                          <TableCell className={`text-foreground whitespace-normal ${isRtl ? 'text-right' : 'text-left'}`}>
                            {spec.competitor}
                          </TableCell>
                          <TableCell className={`text-medical-blue font-medium whitespace-normal ${isRtl ? 'text-right' : 'text-left'}`}>
                            {spec.mercury}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-5 p-4 rounded-xl bg-muted/20 border border-border/40">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {details.note}
                  </p>
                </div>

                <p className={`text-muted-foreground/60 text-xs italic mt-4 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                  {details.sourceDisclaimer}
                </p>
              </motion.div>
            </DialogContent>
          </Dialog>
        );
      })}
    </>
  );
}
