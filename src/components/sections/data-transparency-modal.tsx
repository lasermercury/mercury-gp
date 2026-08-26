'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Filter,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/layout/providers';
import { useVerificationStore } from '@/store/use-verification-store';
import { productClaims, type ClaimStatus, type ClaimCategory } from '@/data/product/claims';
import { verificationEn } from '@/content/en/verification';
import { verificationFa } from '@/content/fa/verification';

type StatusFilter = 'all' | ClaimStatus;
type CategoryFilter = 'all' | ClaimCategory;

const STATUS_OPTIONS: StatusFilter[] = ['all', 'verified', 'pending', 'unverified'];
const CATEGORY_OPTIONS: CategoryFilter[] = ['all', 'specification', 'feature', 'safety', 'comparison', 'general'];

const fadeInVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const statusIconMap: Record<ClaimStatus, typeof CheckCircle> = {
  verified: CheckCircle,
  pending: AlertCircle,
  unverified: XCircle,
};

const statusColorMap: Record<ClaimStatus, string> = {
  verified: 'bg-emerald-accent/10 text-emerald-accent border-emerald-accent/20',
  pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  unverified: 'bg-muted text-muted-foreground border-muted',
};

export default function DataTransparencyModal() {
  const { locale, direction } = useLocale();
  const { isOpen, close } = useVerificationStore();
  const content = locale === 'fa' ? verificationFa : verificationEn;

  const [activeStatus, setActiveStatus] = useState<StatusFilter>('all');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const verifiedCount = useMemo(
    () => productClaims.filter((c) => c.status === 'verified').length,
    []
  );

  const filteredClaims = useMemo(() => {
    return productClaims.filter((claim) => {
      const matchesStatus = activeStatus === 'all' || claim.status === activeStatus;
      const matchesCategory = activeCategory === 'all' || claim.category === activeCategory;
      return matchesStatus && matchesCategory;
    });
  }, [activeStatus, activeCategory]);

  const lang = locale as 'en' | 'fa';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) close(); }}>
      <DialogContent
        className={`sm:max-w-4xl rounded-2xl bg-background scrollbar-thin max-h-[90vh] overflow-y-auto ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
        dir={direction}
      >
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <DialogHeader>
            <div className={`flex items-center gap-3 ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="w-10 h-10 rounded-xl bg-medical-blue/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="size-5 text-medical-blue" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {content.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-1">
                  {content.subtitle}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Summary stat */}
          <div className={`mt-4 flex items-center gap-3 ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
            <Badge
              variant="outline"
              className="bg-medical-blue/5 border-medical-blue/20 text-medical-blue px-3 py-1 rounded-full text-xs"
            >
              <CheckCircle className="size-3 me-1.5" />
              {content.sectionLabels.verifiedCount(verifiedCount, productClaims.length)}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {content.sectionLabels.showingCount(filteredClaims.length, productClaims.length)}
            </span>
          </div>

          {/* Filter bar — Status */}
          <div className="mt-5 space-y-3">
            <div className={`flex items-center gap-2 text-xs font-medium text-muted-foreground ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
              <Filter className="size-3.5" />
              <span>{content.sectionLabels.status}</span>
            </div>
            <div className={`flex flex-wrap gap-2 ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
              {STATUS_OPTIONS.map((status) => {
                const isActive = activeStatus === status;
                const label = status === 'all' ? content.sectionLabels.all : content.statuses[status];
                return (
                  <Button
                    key={status}
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    className={`rounded-full text-xs ${isActive ? 'bg-medical-blue hover:bg-medical-blue/90 text-white border-medical-blue' : ''}`}
                    onClick={() => setActiveStatus(status)}
                  >
                    {label}
                  </Button>
                );
              })}
            </div>

            {/* Filter bar — Category */}
            <div className={`flex items-center gap-2 text-xs font-medium text-muted-foreground mt-3 ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
              <Filter className="size-3.5" />
              <span>{content.sectionLabels.category}</span>
            </div>
            <div className={`flex flex-wrap gap-2 ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
              {CATEGORY_OPTIONS.map((cat) => {
                const isActive = activeCategory === cat;
                const label = cat === 'all' ? content.sectionLabels.allCategories : content.categories[cat];
                return (
                  <Button
                    key={cat}
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    className={`rounded-full text-xs ${isActive ? 'bg-medical-blue hover:bg-medical-blue/90 text-white border-medical-blue' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Claims list */}
          <div className="mt-6 space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredClaims.map((claim) => {
                const StatusIcon = statusIconMap[claim.status];
                return (
                  <motion.div
                    key={claim.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-xl border border-border/50 p-4 hover:border-border transition-colors"
                  >
                    <div className={`flex items-start gap-3 ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Status & Category badges */}
                      <div className={`flex flex-col gap-1.5 shrink-0 pt-0.5 ${direction === 'rtl' ? 'items-end' : 'items-start'}`}>
                        <Badge
                          variant="outline"
                          className={`${statusColorMap[claim.status]} rounded-full text-[10px] px-2 py-0.5 gap-1`}
                        >
                          <StatusIcon className="size-3" />
                          {content.statuses[claim.status]}
                        </Badge>
                        <Badge variant="secondary" className="rounded-full text-[10px] px-2 py-0.5">
                          {content.categories[claim.category]}
                        </Badge>
                      </div>

                      {/* Claim text & details */}
                      <div className={`flex-1 min-w-0 space-y-2 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                        <p className="text-sm font-medium text-foreground leading-relaxed">
                          {claim.claim[lang]}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {claim.detail[lang]}
                        </p>

                        {/* Source & Evidence row */}
                        <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
                          {claim.source && (
                            <a
                              href={claim.source}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1 text-[11px] text-medical-blue hover:underline ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                              <ExternalLink className="size-3" />
                              <span>{content.sectionLabels.source}</span>
                            </a>
                          )}
                          {claim.evidence && (
                            <span className="text-[11px] text-muted-foreground/70">
                              <span className={`font-medium ${direction === 'rtl' ? 'ms-1' : 'me-1'}`}>
                                {content.sectionLabels.evidence}:
                              </span>
                              {claim.evidence.length > 80
                                ? `${claim.evidence.slice(0, 80)}...`
                                : claim.evidence}
                            </span>
                          )}
                          {claim.lastVerified && (
                            <span className={`inline-flex items-center gap-1 text-[11px] text-muted-foreground/60 ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
                              <Clock className="size-3" />
                              <span>{content.sectionLabels.lastVerified}: {claim.lastVerified}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredClaims.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                {locale === 'fa' ? 'هیچ ادعایی با این فیلترها مطابقت ندارد.' : 'No claims match the selected filters.'}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-border/40">
            <p className={`text-muted-foreground/60 text-xs leading-relaxed ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              {content.disclaimer}
            </p>
            <div className={`mt-3 flex ${direction === 'rtl' ? 'justify-start' : 'justify-end'}`}>
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full px-5"
                onClick={close}
              >
                {content.sectionLabels.close}
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
