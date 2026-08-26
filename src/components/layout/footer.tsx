'use client';

import { useLocale } from '@/components/layout/providers';
import { getContent } from '@/lib/i18n';
import { Separator } from '@/components/ui/separator';
import { useProductModalStore } from '@/store/use-product-modal-store';

export function Footer() {
  const { locale, direction } = useLocale();
  const content = getContent(locale);
  const footer = content.footer;
  const isRtl = direction === 'rtl';
  const { open: openProductModal } = useProductModalStore();

  return (
    <footer className="bg-navy-deep border-t border-white/5" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-medical-blue flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                {content.nav.brand}
              </span>
            </div>
            <p className="text-silver/50 text-sm leading-relaxed max-w-xs">
              {footer.brandDescription}
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-silver/80 font-semibold text-sm uppercase tracking-wider mb-4">
              {locale === 'fa' ? 'محصول' : 'Product'}
            </h3>
            <ul className="space-y-3">
              {footer.productLinks.map((link, i) => (
                <li key={i + '-' + link.href}>
                  <button
                    onClick={() => {
                      const id = link.href.replace('#', '');
                      const el = document.getElementById(id);
                      if (el) {
                        const top = el.getBoundingClientRect().top + window.scrollY - 80;
                        window.scrollTo({ top, behavior: 'smooth' });
                      }
                    }}
                    className="text-silver/50 text-sm hover:text-soft-blue transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resource Links */}
          <div>
            <h3 className="text-silver/80 font-semibold text-sm uppercase tracking-wider mb-4">
              {locale === 'fa' ? 'منابع' : 'Resources'}
            </h3>
            <ul className="space-y-3">
              {footer.resourceLinks.map((link, i) => (
                <li key={i + '-' + link.href}>
                  <button
                    onClick={() => {
                      const id = link.href.replace('#', '');
                      const el = document.getElementById(id);
                      if (el) {
                        const top = el.getBoundingClientRect().top + window.scrollY - 80;
                        window.scrollTo({ top, behavior: 'smooth' });
                      }
                    }}
                    className="text-silver/50 text-sm hover:text-soft-blue transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-silver/80 font-semibold text-sm uppercase tracking-wider mb-4">
              {locale === 'fa' ? 'پشتیبانی' : 'Support'}
            </h3>
            <ul className="space-y-3">
              {footer.supportLinks.map((link, i) => (
                <li key={i + '-' + link.label}>
                  <button
                    onClick={() => {
                      if (link.href === '#') {
                        // Dead links: open Product Modal (has specs, box contents, warranty info)
                        openProductModal();
                        return;
                      }
                      const id = link.href.replace('#', '');
                      const el = document.getElementById(id);
                      if (el) {
                        const top = el.getBoundingClientRect().top + window.scrollY - 80;
                        window.scrollTo({ top, behavior: 'smooth' });
                      }
                    }}
                    className="text-silver/50 text-sm hover:text-soft-blue transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-silver/30 text-xs">
            {footer.copyright}
          </p>
          <p className="text-silver/30 text-xs max-w-xl text-center md:text-end leading-relaxed">
            {footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
