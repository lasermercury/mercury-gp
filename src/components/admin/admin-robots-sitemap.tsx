'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Code2,
  Plus,
  Trash2,
  Globe,
  Rss,
  Save,
  RotateCcw,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAdminStore, type SitemapUrl } from '@/store/use-admin-store';

const DEFAULT_ROBOTS_TXT = `# Robots.txt for lasermercury.ir
# Managed by Mercury SEO Admin Panel

User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

# Sitemap
Sitemap: https://lasermercury.ir/sitemap.xml

# AI Bots
User-agent: GPTBot
Allow: /
Crawl-delay: 10

User-agent: ClaudeBot
Allow: /
Crawl-delay: 10

User-agent: PerplexityBot
Allow: /
Crawl-delay: 5

User-agent: ChatGPT-User
Allow: /
Crawl-delay: 10

User-agent: Google-Extended
Allow: /

User-agent: Bytespider
Disallow: /

User-agent: Applebot-Extended
Allow: /
Crawl-delay: 10

User-agent: FacebookBot
Allow: /
Crawl-delay: 5
`;

export function AdminRobotsSitemap() {
  const state = useAdminStore();
  const [newUrl, setNewUrl] = useState('');
  const [newPriority, setNewPriority] = useState('0.5');
  const [newChangefreq, setNewChangefreq] = useState<SitemapUrl['changefreq']>('weekly');

  const handleAddUrl = () => {
    if (!newUrl.trim()) return;
    state.addSitemapUrl({
      loc: newUrl.trim(),
      priority: newPriority,
      changefreq: newChangefreq,
      enabled: true,
    });
    setNewUrl('');
  };

  const handleResetRobots = () => {
    state.setRobotsTxtContent(DEFAULT_ROBOTS_TXT);
  };

  const robotsLineCount = state.robotsTxtContent.split('\n').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 font-persian">ربات‌ها و نقشه سایت</h2>
        <p className="text-sm text-zinc-400 mt-1">Robots & Sitemap — Manage robots.txt, sitemap URLs, and RSS feed</p>
      </div>

      {/* Robots.txt Editor */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  ویرایشگر robots.txt / Robots.txt Editor
                </CardTitle>
                <CardDescription className="text-zinc-500">{robotsLineCount + ' lines'}</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 gap-1"
                onClick={handleResetRobots}
              >
                <RotateCcw className="w-3 h-3" />
                <span className="font-persian">بازنشانی / Reset</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Textarea
                value={state.robotsTxtContent}
                onChange={(e) => state.setRobotsTxtContent(e.target.value)}
                className="bg-zinc-800/50 border-zinc-700 text-zinc-100 font-mono text-xs min-h-[300px] resize-y"
                spellCheck={false}
              />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px]">
                {robotsLineCount + ' lines'}
              </Badge>
              <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px]">
                {state.robotsTxtContent.length + ' chars'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sitemap URLs */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              آدرس‌های نقشه سایت / Sitemap URLs
            </CardTitle>
            <CardDescription className="text-zinc-500">{state.sitemapUrls.length + ' URLs configured'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-h-64 overflow-y-auto scrollbar-thin space-y-2 pr-1">
              {state.sitemapUrls.map((url, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-800/30 border border-zinc-800"
                >
                  <Globe className="w-4 h-4 text-zinc-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-200 truncate">{url.loc}</p>
                    <div className="flex gap-2 mt-0.5">
                      <Badge variant="outline" className="border-zinc-700 text-zinc-500 text-[10px]">
                        {'priority: ' + url.priority}
                      </Badge>
                      <Badge variant="outline" className="border-zinc-700 text-zinc-500 text-[10px]">
                        {url.changefreq}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 shrink-0"
                    onClick={() => state.removeSitemapUrl(index)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>

            <Separator className="bg-zinc-800" />

            <div className="space-y-2">
              <p className="text-xs text-zinc-400 font-persian">افزودن آدرس جدید / Add New URL</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="/path"
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-600 flex-1"
                />
                <Select value={newPriority} onValueChange={setNewPriority}>
                  <SelectTrigger className="w-24 bg-zinc-800/50 border-zinc-700 text-zinc-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    {['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1'].map((p) => (
                      <SelectItem key={p} value={p} className="text-zinc-200">{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={newChangefreq} onValueChange={(v) => setNewChangefreq(v as SitemapUrl['changefreq'])}>
                  <SelectTrigger className="w-28 bg-zinc-800/50 border-zinc-700 text-zinc-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    {(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'] as const).map((f) => (
                      <SelectItem key={f} value={f} className="text-zinc-200">{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleAddUrl}
                  disabled={!newUrl.trim()}
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

      {/* RSS Feed Settings */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <Rss className="w-4 h-4 text-emerald-400" />
              تنظیمات فید RSS / RSS Feed Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-zinc-400 font-persian">عنوان فید / Feed Title</Label>
                <Input
                  value={state.rssTitle}
                  onChange={(e) => state.setRssTitle(e.target.value)}
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 font-persian"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-zinc-400 font-persian">تعداد مقاله‌ها / Article Count</Label>
                <Input
                  type="number"
                  value={state.rssArticleCount}
                  onChange={(e) => state.setRssArticleCount(parseInt(e.target.value) || 0)}
                  min={1}
                  max={100}
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-zinc-400 font-persian">توضیحات فید / Feed Description</Label>
              <Textarea
                value={state.rssDescription}
                onChange={(e) => state.setRssDescription(e.target.value)}
                className="bg-zinc-800/50 border-zinc-700 text-zinc-100 min-h-[60px]"
              />
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-3 text-xs text-zinc-400 font-mono">
              <p className="text-zinc-500 mb-1">RSS Feed URL:</p>
              <p>https://lasermercury.ir/feed.xml</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
