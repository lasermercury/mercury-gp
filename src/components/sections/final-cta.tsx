'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ClipboardCheck, Send, CheckCircle2, User, Mail, MessageSquare, Shield, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLocale } from '@/components/layout/providers';
import { getContent } from '@/lib/i18n';
import { useProductModalStore } from '@/store/use-product-modal-store';
import { useToolStore } from '@/store/use-tool-store';
import { useSafetyModalStore } from '@/store/use-safety-modal-store';
import { toast } from '@/hooks/use-toast';

export default function FinalCta() {
  const { locale, direction } = useLocale();
  const content = getContent(locale);
  const { finalCta, contact } = content;
  const isRtl = direction === 'rtl';
  const openProductModal = useProductModalStore((s) => s.open);
  const openTool = useToolStore((s) => s.openTool);
  const openSafetyModal = useSafetyModalStore((s) => s.open);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const strings = {
    sending: locale === 'en' ? 'Sending...' : 'در حال ارسال...',
    sendBtn: locale === 'en' ? 'Send Message' : 'ارسال پیام',
    errorMsg: locale === 'en'
      ? 'Failed to send message. Please try again.'
      : 'ارسال پیام ناموفق بود. لطفاً دوباره تلاش کنید.',
    toastSuccess: locale === 'en' ? 'Message sent successfully' : 'پیام با موفقیت ارسال شد',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formState, locale }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || strings.errorMsg);
        toast({ title: strings.errorMsg, variant: 'destructive' });
        return;
      }

      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      toast({ title: strings.toastSuccess, variant: 'default' });
    } catch {
      setError(strings.errorMsg);
      toast({ title: strings.errorMsg, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-navy-deep relative overflow-hidden" dir={direction}>
      {/* Decorative blurred gradient circle */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-medical-blue/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CTA Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            {finalCta.title}
          </h2>
          <p className="text-silver/70 max-w-xl mx-auto mt-4 leading-relaxed">
            {finalCta.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: CTAs */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: isRtl ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              {locale === 'en' ? 'Quick Actions' : 'دسترسی سریع'}
            </h3>
            <p className="text-silver/60 text-sm leading-relaxed mb-8">
              {locale === 'en'
                ? 'Explore the product, check your suitability, or get in touch with our team.'
                : 'محصول را بررسی کنید، تطابق‌پذیری خود را بسنجید، یا با تیم ما تماس بگیرید.'}
            </p>

            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                className="bg-medical-blue text-white hover:bg-medical-blue/90 rounded-xl justify-start"
                onClick={() => openProductModal()}
              >
                <Sparkles className="size-4 me-3" />
                {finalCta.primaryCta}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-silver/20 text-silver hover:text-white hover:border-silver/40 rounded-xl justify-start"
                onClick={() => openTool('suitability-test')}
              >
                <ClipboardCheck className="size-4 me-3" />
                {finalCta.secondaryCta}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-emerald-accent/20 text-emerald-accent hover:bg-emerald-accent/10 rounded-xl justify-start"
                onClick={() => openSafetyModal()}
              >
                {isRtl ? <Shield className="size-4 ms-3" /> : <Shield className="size-4 me-3" />}
                {locale === 'en' ? 'View Safety Information' : 'مشاهده اطلاعات ایمنی'}
              </Button>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            <div className="glass rounded-2xl p-6 md:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-accent/15 flex items-center justify-center mb-4">
                    <CheckCircle2 className="size-8 text-emerald-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {locale === 'en' ? 'Message Sent' : 'پیام ارسال شد'}
                  </h3>
                  <p className="text-silver/60 text-sm mt-2">
                    {locale === 'en'
                      ? 'Thank you for reaching out. Our team will respond as soon as possible.'
                      : 'با تشکر از تماس شما. تیم ما در اسرع وقت پاسخ خواهد داد.'}
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-white mb-1">{contact.title}</h3>
                  <p className="text-silver/60 text-sm mb-6">{contact.subtitle}</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <User className="absolute top-3 start-3 size-4 text-silver/40" />
                      <Input
                        required
                        value={formState.name}
                        onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                        placeholder={locale === 'en' ? 'Your name' : 'نام شما'}
                        className="ps-10 bg-white/5 border-white/10 text-white placeholder:text-silver/30 focus:border-medical-blue/50 rounded-xl"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute top-3 start-3 size-4 text-silver/40" />
                      <Input
                        required
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                        placeholder={locale === 'en' ? 'Email address' : 'آدرس ایمیل'}
                        className="ps-10 bg-white/5 border-white/10 text-white placeholder:text-silver/30 focus:border-medical-blue/50 rounded-xl"
                      />
                    </div>
                    <div className="relative">
                      <MessageSquare className="absolute top-3 start-3 size-4 text-silver/40" />
                      <Textarea
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                        placeholder={locale === 'en' ? 'Your message...' : 'پیام شما...'}
                        className="ps-10 bg-white/5 border-white/10 text-white placeholder:text-silver/30 focus:border-medical-blue/50 rounded-xl resize-none"
                      />
                    </div>
                    {error && (
                      <p className="text-red-400 text-sm text-center">{error}</p>
                    )}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-medical-blue text-white hover:bg-medical-blue/90 rounded-xl disabled:opacity-60"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 className={`size-4 ${isRtl ? 'ms-2' : 'me-2'} animate-spin`} />
                          {strings.sending}
                        </>
                      ) : (
                        <>
                          <Send className={`size-4 ${isRtl ? 'ms-2' : 'me-2'}`} />
                          {strings.sendBtn}
                        </>
                      )}
                    </Button>
                  </form>

                  <p className="text-silver/30 text-xs mt-4 text-center leading-relaxed">
                    {locale === 'en'
                      ? 'Your information is handled respectfully. We do not share your data with third parties.'
                      : 'اطلاعات شما با احترام پردازش می‌شود. ما اطلاعات شما را با اشخاص ثالث به اشتراک نمی‌گذاریم.'}
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
