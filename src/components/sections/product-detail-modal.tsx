'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Zap,
  Plug,
  Gauge,
  Hand,
  ShieldCheck,
  Headphones,
  Check,
  X,
  Package,
  Info,
  Clock,
} from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { useLocale } from '@/components/layout/providers';
import { useProductModalStore } from '@/store/use-product-modal-store';
import { productEn } from '@/content/en/product';
import { productFa } from '@/content/fa/product';
import type { ProductContent } from '@/content/en/product';

type IconName = 'Zap' | 'Plug' | 'Gauge' | 'Hand' | 'ShieldCheck' | 'Headphones';

const iconMap: Record<IconName, React.ComponentType<{ className?: string }>> = {
  Zap,
  Plug,
  Gauge,
  Hand,
  ShieldCheck,
  Headphones,
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

function getProductContent(locale: string): ProductContent {
  return locale === 'fa' ? productFa : productEn;
}

export default function ProductDetailModal() {
  const { locale, direction } = useLocale();
  const { isOpen, close } = useProductModalStore();
  const content = getProductContent(locale);
  const { sectionLabels } = content;
  const isRtl = direction === 'rtl';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) close(); }}>
      <DialogContent
        className={`sm:max-w-4xl rounded-2xl bg-background p-0 ${isRtl ? 'text-right' : 'text-left'}`}
        dir={direction}
      >
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-h-[90vh] overflow-y-auto scrollbar-thin"
        >
          {/* Header: Product image + Title */}
          <div className={`flex flex-col md:flex-row items-center gap-6 p-6 pb-4 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-shrink-0 relative">
              <div className="glow-blue absolute inset-0 rounded-2xl opacity-40" />
              <Image
                src="/images/mercury-gp-product.png"
                alt={content.title}
                width={256}
                height={320}
                className={`relative z-10 rounded-2xl w-48 md:w-64 h-auto object-cover ${isRtl ? 'md:mr-0' : 'md:ml-0'}`}
              />
            </div>
            <DialogHeader className={`flex-1 ${isRtl ? 'md:text-right' : 'md:text-left'}`}>
              <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                {content.title}
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground mt-1">
                {content.subtitle}
              </DialogDescription>
              <p className={`text-sm text-medical-blue font-medium mt-3 ${isRtl ? 'md:text-right' : 'md:text-left'}`}>
                {content.tagline}
              </p>
            </DialogHeader>
          </div>

          <div className={`px-6 pb-6 flex flex-col gap-8 ${isRtl ? 'text-right' : 'text-left'}`}>
            {/* Overview Section */}
            <section>
              <h3 className={`text-sm font-semibold uppercase tracking-wider text-medical-blue mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                {sectionLabels.overview}
              </h3>
              <ul className="flex flex-col gap-3">
                {content.overview.map((item, index) => (
                  <li key={index} className={`flex items-start gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <Check className="size-4 mt-0.5 shrink-0 text-emerald-accent" />
                    <span className="text-sm text-foreground/80 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Key Features Section */}
            <section>
              <h3 className={`text-sm font-semibold uppercase tracking-wider text-medical-blue mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                {sectionLabels.keyFeatures}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {content.keyFeatures.map((feature, index) => {
                  const IconComponent = iconMap[feature.icon as IconName];
                  return (
                    <div
                      key={index}
                      className={`rounded-xl border p-4 transition-colors ${
                        feature.verified
                          ? 'border-medical-blue/30 bg-medical-blue/5'
                          : 'border-border/60 bg-muted/30'
                      } ${isRtl ? 'text-right' : 'text-left'}`}
                    >
                      <div className={`flex items-center gap-2 mb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        {IconComponent && (
                          <IconComponent className={`size-4 ${feature.verified ? 'text-medical-blue' : 'text-muted-foreground'}`} />
                        )}
                        <span className="text-sm font-semibold text-foreground">
                          {feature.title}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                        {feature.description}
                      </p>
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          feature.verified
                            ? 'border-emerald-accent/30 text-emerald-accent bg-emerald-accent/10'
                            : 'border-amber-500/30 text-amber-600 bg-amber-500/10'
                        }`}
                      >
                        {feature.verified ? (
                          <span className={`flex items-center gap-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                            <Check className="size-3" />
                            {sectionLabels.verified}
                          </span>
                        ) : (
                          <span className={`flex items-center gap-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                            <Clock className="size-3" />
                            {sectionLabels.pending}
                          </span>
                        )}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Specifications Table */}
            <section>
              <h3 className={`text-sm font-semibold uppercase tracking-wider text-medical-blue mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                {sectionLabels.specifications}
              </h3>
              <div className="rounded-xl border border-border/60 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/40 hover:bg-transparent bg-muted/20">
                      <TableHead className={`font-semibold text-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                        {locale === 'fa' ? 'مشخصه' : 'Specification'}
                      </TableHead>
                      <TableHead className={`font-semibold text-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                        {locale === 'fa' ? 'جزئیات' : 'Details'}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {content.specifications.map((spec, index) => (
                      <TableRow
                        key={spec.label}
                        className={`${index % 2 === 0 ? 'bg-muted/20' : ''} border-border/40 hover:bg-muted/30`}
                      >
                        <TableCell className={`font-medium text-foreground whitespace-normal ${isRtl ? 'text-right' : 'text-left'}`}>
                          {spec.label}
                        </TableCell>
                        <TableCell className={`text-muted-foreground whitespace-normal ${isRtl ? 'text-right' : 'text-left'}`}>
                          {spec.value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>

            {/* Box Contents */}
            <section>
              <h3 className={`text-sm font-semibold uppercase tracking-wider text-medical-blue mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                {sectionLabels.boxContents}
              </h3>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                <ul className="flex flex-col gap-2.5">
                  {content.boxContents.map((item, index) => (
                    <li key={index} className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <Package className="size-4 shrink-0 text-medical-blue" />
                      <span className="text-sm text-foreground/80">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Suitable For / Not Suitable For */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Suitable For */}
              <section className="rounded-xl border border-emerald-accent/30 bg-emerald-accent/5 p-4">
                <h3 className={`text-sm font-semibold text-emerald-accent mb-3 flex items-center gap-2 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                  <Check className="size-4 shrink-0" />
                  {sectionLabels.suitableFor}
                </h3>
                <ul className="flex flex-col gap-2">
                  {content.suitableFor.map((item, index) => (
                    <li key={index} className={`flex items-start gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <Check className="size-3 mt-0.5 shrink-0 text-emerald-accent/70" />
                      <span className="text-xs text-foreground/80 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Not Suitable For */}
              <section className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                <h3 className={`text-sm font-semibold text-amber-600 mb-3 flex items-center gap-2 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                  <X className="size-4 shrink-0" />
                  {sectionLabels.notSuitableFor}
                </h3>
                <ul className="flex flex-col gap-2">
                  {content.notSuitableFor.map((item, index) => (
                    <li key={index} className={`flex items-start gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <X className="size-3 mt-0.5 shrink-0 text-amber-500/70" />
                      <span className="text-xs text-foreground/80 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Disclaimer */}
            <div className={`flex items-start gap-2 pt-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <Info className="size-3.5 mt-0.5 shrink-0 text-muted-foreground/50" />
              <p className="text-[11px] text-muted-foreground/60 italic leading-relaxed">
                {content.disclaimer}
              </p>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
