'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Trash2, MessageCircle, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLocale } from '@/components/layout/providers';
import { useToolStore } from '@/store/use-tool-store';
import { toolsEn } from '@/content/en/tools';
import { toolsFa } from '@/content/fa/tools';

/* ───────────── types ───────────── */
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

/* ───────────── component ───────────── */
export default function FaqAssistant() {
  const { locale, direction } = useLocale();
  const { activeTool, closeTool } = useToolStore();
  const t = locale === 'fa' ? toolsFa : toolsEn;

  const isOpen = activeTool === 'faq-assistant';
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* ── auto-scroll ── */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  /* ── reset on close ── */
  const handleClose = useCallback(() => {
    closeTool();
    setTimeout(() => {
      setMessages([]);
      setInput('');
      setLoading(false);
      setError(null);
    }, 200);
  }, [closeTool]);

  /* ── send message ── */
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setError(null);
      const userMsg: Message = { role: 'user', content: trimmed };
      const updated = [...messages, userMsg];
      setMessages(updated);
      setInput('');
      setLoading(true);

      try {
        /* build history (last 6 pairs = 12 messages max) */
        const history = updated.slice(-13, -1); // exclude the just-added user message

        const res = await fetch('/api/faq-assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, locale, history }),
        });

        const data = await res.json();

        if (!res.ok || data.error) {
          throw new Error(data.error || 'Unknown error');
        }

        const assistantMsg: Message = { role: 'assistant', content: data.response };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : locale === 'fa'
            ? t.faqAssistant.errorLabelFa
            : t.faqAssistant.errorLabel;
        setError(msg);
      } finally {
        setLoading(false);
        /* refocus textarea */
        setTimeout(() => textareaRef.current?.focus(), 100);
      }
    },
    [messages, loading, locale, t.faqAssistant.errorLabel, t.faqAssistant.errorLabelFa]
  );

  /* ── handle submit ── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  /* ── handle keyboard ── */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  /* ── suggested question click ── */
  const handleSuggestion = (q: string) => {
    sendMessage(q);
  };

  /* ── clear chat ── */
  const clearChat = () => {
    setMessages([]);
    setError(null);
    setInput('');
  };

  const suggestedQuestions = locale === 'fa' ? t.faqAssistant.suggestedQuestions : t.faqAssistant.suggestedQuestions;
  const thinkingText = locale === 'fa' ? t.faqAssistant.thinkingLabelFa : t.faqAssistant.thinkingLabel;
  const clearText = locale === 'fa' ? t.faqAssistant.clearLabelFa : t.faqAssistant.clearLabel;
  const placeholder = locale === 'fa' ? t.faqAssistant.placeholderFa : t.faqAssistant.placeholder;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent
        className="sm:max-w-2xl rounded-2xl bg-background p-0 overflow-hidden sm:max-h-[85vh] flex flex-col"
        dir={direction}
      >
        {/* ── Header ── */}
        <div className="px-6 pt-6 pb-4 border-b border-border/40 shrink-0">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-medical-blue/20 to-soft-blue/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="size-5 text-medical-blue" />
                </div>
                <div className="min-w-0">
                  <DialogTitle className="text-lg font-bold text-foreground truncate">
                    {t.faqAssistant.title}
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground mt-0.5 truncate">
                    {t.faqAssistant.description}
                  </DialogDescription>
                </div>
              </div>
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="text-muted-foreground hover:text-foreground gap-1.5 shrink-0"
                >
                  <Trash2 className="size-3.5" />
                  <span className="hidden sm:inline text-xs">{clearText}</span>
                </Button>
              )}
            </div>
          </DialogHeader>
        </div>

        {/* ── Chat area ── */}
        <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
          {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
              <div className="w-16 h-16 rounded-2xl bg-medical-blue/10 flex items-center justify-center mb-4">
                <MessageCircle className="size-8 text-medical-blue/60" />
              </div>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                {locale === 'fa'
                  ? 'سوال خود را بپرسید یا یکی از سوالات پیشنهادی را انتخاب کنید.'
                  : 'Ask a question or choose a suggested one to get started.'}
              </p>
              {/* Suggested questions */}
              <div className="flex flex-wrap gap-2 justify-center max-w-md">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSuggestion(q)}
                    className="rounded-full border border-border/60 px-4 py-2 text-xs font-medium text-muted-foreground hover:border-medical-blue/40 hover:text-medical-blue hover:bg-medical-blue/5 transition-all duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`flex ${msg.role === 'user' ? (direction === 'rtl' ? 'justify-start' : 'justify-end') : (direction === 'rtl' ? 'justify-end' : 'justify-start')}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                      msg.role === 'user'
                        ? 'bg-medical-blue text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading indicator */}
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${direction === 'rtl' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="bg-muted text-muted-foreground rounded-2xl px-4 py-3 text-sm flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-medical-blue/60 animate-[pulse_1.2s_ease-in-out_infinite]" />
                    <span className="w-2 h-2 rounded-full bg-medical-blue/60 animate-[pulse_1.2s_ease-in-out_0.2s_infinite]" />
                    <span className="w-2 h-2 rounded-full bg-medical-blue/60 animate-[pulse_1.2s_ease-in-out_0.4s_infinite]" />
                  </span>
                  {thinkingText}
                </div>
              </motion.div>
            )}

            {/* Error state */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${direction === 'rtl' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="bg-red-500/10 border border-red-500/20 text-red-600 rounded-2xl px-4 py-3 text-sm flex items-center gap-2">
                  <AlertCircle className="size-4 shrink-0" />
                  {error}
                </div>
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>
        </div>

        {/* ── Input area ── */}
        <div className="px-6 pb-6 pt-3 border-t border-border/40 shrink-0">
          <form onSubmit={handleSubmit} className="flex items-end gap-3">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={1}
              disabled={loading}
              className="resize-none min-h-[44px] max-h-[120px] rounded-xl border-border/60 focus:border-medical-blue/50 text-sm"
            />
            <Button
              type="submit"
              disabled={!input.trim() || loading}
              size="icon"
              className="shrink-0 w-11 h-11 rounded-xl bg-medical-blue text-white hover:bg-medical-blue/90 disabled:opacity-40 disabled:pointer-events-none"
            >
              <Send className="size-4" />
            </Button>
          </form>

          {/* Disclaimer */}
          <p className="text-[10px] text-muted-foreground/40 mt-3 leading-relaxed text-center">
            {t.disclaimer[locale]}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
