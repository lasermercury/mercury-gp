'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Bot,
  ToggleLeft,
  Clock,
  Plus,
  Trash2,
  ExternalLink,
  BookOpen,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { useAdminStore, type EntitySalience } from '@/store/use-admin-store';

export function AdminAiOptimization() {
  const state = useAdminStore();
  const [newEntityName, setNewEntityName] = useState('');
  const [newEntityUrl, setNewEntityUrl] = useState('');

  const handleAddEntity = () => {
    if (!newEntityName.trim() || !newEntityUrl.trim()) return;
    const entity: EntitySalience = {
      id: Date.now().toString(),
      name: newEntityName.trim(),
      wikipediaUrl: newEntityUrl.trim(),
      mentionsEnabled: true,
    };
    state.addEntity(entity);
    setNewEntityName('');
    setNewEntityUrl('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 font-persian">بهینه‌سازی هوش مصنوعی</h2>
        <p className="text-sm text-zinc-400 mt-1">AI Optimization (GEO/AIO) — Configure AI bot crawling, entity salience, and citation optimization</p>
      </div>

      {/* AI Bot Crawl Settings */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-400" />
              تنظیمات خزش ربات‌های AI / AI Bot Crawl Settings
            </CardTitle>
            <CardDescription className="text-zinc-500">
              Control which AI bots can crawl your site and set crawl delays
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {state.aiBots.map((bot) => (
              <div
                key={bot.name}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg bg-zinc-800/30 border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={('w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ' + (bot.allowed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-700/50 text-zinc-500'))}>
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-200">{bot.userAgent}</p>
                    <p className="text-xs text-zinc-500 font-persian truncate">{bot.descriptionFa}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-zinc-400 whitespace-nowrap">Crawl-delay:</Label>
                    <span className="text-xs text-zinc-300 w-6 text-center">{bot.crawlDelay}</span>
                    <Slider
                      value={[bot.crawlDelay]}
                      onValueChange={([v]) => state.setAiBotCrawlDelay(bot.name, v)}
                      min={0}
                      max={30}
                      step={1}
                      className="w-20"
                    />
                  </div>
                  <Switch
                    checked={bot.allowed}
                    onCheckedChange={() => state.toggleAiBot(bot.name)}
                  />
                  <Badge variant="outline" className={('text-[10px] shrink-0 ' + (bot.allowed ? 'border-emerald-500/30 text-emerald-400' : 'border-red-500/30 text-red-400'))}>
                    {bot.allowed ? 'Allow' : 'Disallow'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Entity Salience */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              برجستگی موجودیت / Entity Salience
            </CardTitle>
            <CardDescription className="text-zinc-500">
              Define entities for AI to recognize and cite. Link to Wikipedia for authority signals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-h-64 overflow-y-auto scrollbar-thin space-y-2 pr-1">
              {state.entitySalience.map((entity) => (
                <div
                  key={entity.id}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-zinc-800/30 border border-zinc-800"
                >
                  <div className={('w-7 h-7 rounded flex items-center justify-center shrink-0 ' + (entity.mentionsEnabled ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-700/50 text-zinc-500'))}>
                    <Lightbulb className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-200 truncate">{entity.name}</p>
                    <a
                      href={entity.wikipediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors truncate block"
                    >
                      {entity.wikipediaUrl}
                    </a>
                  </div>
                  <Switch
                    checked={entity.mentionsEnabled}
                    onCheckedChange={(v) => state.updateEntity(entity.id, { mentionsEnabled: v })}
                    className="shrink-0"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 shrink-0"
                    onClick={() => state.removeEntity(entity.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
              {state.entitySalience.length === 0 && (
                <p className="text-sm text-zinc-500 text-center py-4 font-persian">
                  هیچ موجودیتی تعریف نشده / No entities defined
                </p>
              )}
            </div>

            <Separator className="bg-zinc-800" />

            <div className="space-y-2">
              <p className="text-xs text-zinc-400 font-persian">افزودن موجودیت جدید / Add New Entity</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  value={newEntityName}
                  onChange={(e) => setNewEntityName(e.target.value)}
                  placeholder="نام موجودیت / Entity name"
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-600 font-persian"
                />
                <Input
                  value={newEntityUrl}
                  onChange={(e) => setNewEntityUrl(e.target.value)}
                  placeholder="https://en.wikipedia.org/wiki/..."
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-600"
                />
                <Button
                  onClick={handleAddEntity}
                  disabled={!newEntityName.trim() || !newEntityUrl.trim()}
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Citation Optimization */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <Brain className="w-4 h-4 text-emerald-400" />
              بهینه‌سازی استناد AI / AI Citation Optimization
            </CardTitle>
            <CardDescription className="text-zinc-500">
              Optimize content for AI search engine citations and featured mentions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/30">
              <div>
                <Label className="text-sm text-zinc-300 font-persian">فعال‌سازی بهینه‌سازی استناد / Citation Optimization</Label>
                <p className="text-xs text-zinc-500 mt-1">Enable structured citations for AI answers</p>
              </div>
              <Switch
                checked={state.aiCitationOptimizationEnabled}
                onCheckedChange={state.setAiCitationOptimizationEnabled}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/30">
              <div>
                <Label className="text-sm text-zinc-300 font-persian">ساختار محتوای AIO / AIO Content Structure</Label>
                <p className="text-xs text-zinc-500 mt-1">Optimize content structure for AI Overview</p>
              </div>
              <Switch
                checked={state.aioContentStructureEnabled}
                onCheckedChange={state.setAioContentStructureEnabled}
              />
            </div>

            <div className="space-y-2 p-3 rounded-lg bg-zinc-800/30">
              <Label className="text-sm text-zinc-300 font-persian">اولویت داده ساختاریافته / Structured Data Priority</Label>
              <div className="flex gap-2 mt-2">
                {['low', 'medium', 'high'].map((p) => (
                  <Button
                    key={p}
                    variant="outline"
                    size="sm"
                    className={('flex-1 ' + (state.aioStructuredDataPriority === p ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' : 'border-zinc-700 text-zinc-400 hover:bg-zinc-800'))}
                    onClick={() => state.setAioStructuredDataPriority(p)}
                  >
                    {p === 'low' ? 'کم / Low' : p === 'medium' ? 'متوسط / Med' : 'زیاد / High'}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AIO Recommendations */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-emerald-400" />
              توصیه‌های AIO / AIO Content Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { fa: 'از پاراگراف‌های کوتاه و مختصر استفاده کنید', en: 'Use short, concise paragraphs for AI extraction' },
              { fa: 'سوالات متداول با ساختار مشخص تعریف کنید', en: 'Define FAQ with clear Q&A structure' },
              { fa: 'موجیت‌های معتبر ویکی‌پدیا را پیوند دهید', en: 'Link to authoritative Wikipedia entities' },
              { fa: 'از نشانه‌گذاری اسکیما استفاده کنید', en: 'Use Schema markup for structured data' },
              { fa: 'محتوا را با تیترهای معنادار ساختاربندی کنید', en: 'Structure content with semantic headings' },
              { fa: 'خلاصه‌های اجرایی در ابتدای مقالات قرار دهید', en: 'Place executive summaries at the top of articles' },
            ].map((rec, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-zinc-200 font-persian">{rec.fa}</p>
                  <p className="text-xs text-zinc-500">{rec.en}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
