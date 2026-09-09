'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Type,
  Hash,
  Link2,
  Languages,
  ImageIcon,
  Check,
  Plus,
  X,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useAdminStore } from '@/store/use-admin-store';

export function AdminSiteSettings() {
  const state = useAdminStore();
  const [newKeyword, setNewKeyword] = useState('');

  const handleAddKeyword = () => {
    const trimmed = newKeyword.trim();
    if (trimmed && !state.keywords.includes(trimmed)) {
      state.addKeyword(trimmed);
      setNewKeyword('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 font-persian">تنظیمات سایت</h2>
        <p className="text-sm text-zinc-400 mt-1">Site Settings — Configure core SEO metadata</p>
      </div>

      {/* Title & Description */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <Type className="w-4 h-4 text-emerald-400" />
              عنوان و توضیحات سایت / Title & Description
            </CardTitle>
            <CardDescription className="text-zinc-500">Core meta information for search engines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-zinc-400 font-persian">عنوان فارسی / Title (FA)</Label>
                <Input
                  value={state.siteTitleFa}
                  onChange={(e) => state.setSiteTitleFa(e.target.value)}
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 font-persian"
                  dir="rtl"
                />
                <p className="text-[10px] text-zinc-600">{state.siteTitleFa.length}/60</p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-zinc-400">Title (EN)</Label>
                <Input
                  value={state.siteTitleEn}
                  onChange={(e) => state.setSiteTitleEn(e.target.value)}
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100"
                />
                <p className="text-[10px] text-zinc-600">{state.siteTitleEn.length}/60</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-zinc-400 font-persian">توضیحات فارسی / Description (FA)</Label>
                <Textarea
                  value={state.siteDescriptionFa}
                  onChange={(e) => state.setSiteDescriptionFa(e.target.value)}
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 font-persian min-h-[80px]"
                  dir="rtl"
                />
                <p className="text-[10px] text-zinc-600">{state.siteDescriptionFa.length}/160</p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-zinc-400">Description (EN)</Label>
                <Textarea
                  value={state.siteDescriptionEn}
                  onChange={(e) => state.setSiteDescriptionEn(e.target.value)}
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 min-h-[80px]"
                />
                <p className="text-[10px] text-zinc-600">{state.siteDescriptionEn.length}/160</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Keywords */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <Hash className="w-4 h-4 text-emerald-400" />
              کلمات کلیدی / Keywords
            </CardTitle>
            <CardDescription className="text-zinc-500">{state.keywords.length} keywords configured</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto scrollbar-thin p-1">
              {state.keywords.map((kw) => (
                <Badge
                  key={kw}
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800 gap-1 pr-1 font-persian"
                >
                  {kw}
                  <button
                    onClick={() => state.removeKeyword(kw)}
                    className="w-4 h-4 rounded-full hover:bg-zinc-700 flex items-center justify-center transition-colors"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                placeholder="کلمه کلیدی جدید / Add keyword..."
                className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-600 font-persian"
              />
              <Button
                onClick={handleAddKeyword}
                disabled={!newKeyword.trim()}
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 shrink-0"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Canonical & Hreflang */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <Link2 className="w-4 h-4 text-emerald-400" />
              URL کانونیکال و Hreflang / Canonical URL & Hreflang
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-zinc-400">Canonical URL</Label>
              <Input
                value={state.canonicalUrl}
                onChange={(e) => state.setCanonicalUrl(e.target.value)}
                className="bg-zinc-800/50 border-zinc-700 text-zinc-100"
                placeholder="https://lasermercury.ir"
              />
            </div>

            <Separator className="bg-zinc-800" />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm text-zinc-300 font-persian flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  فعال‌سازی Hreflang / Enable Hreflang
                </Label>
                <p className="text-xs text-zinc-500 mt-1">Multilingual alternate links for SEO</p>
              </div>
              <Switch
                checked={state.hreflangEnabled}
                onCheckedChange={state.setHreflangEnabled}
              />
            </div>

            {state.hreflangEnabled && (
              <div className="grid grid-cols-2 gap-4 pl-2">
                <div className="space-y-2">
                  <Label className="text-xs text-zinc-400">Default Language</Label>
                  <Input
                    value={state.hreflangDefaultLang}
                    readOnly
                    className="bg-zinc-800/50 border-zinc-700 text-zinc-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-zinc-400">Alternate Language</Label>
                  <Input
                    value={state.hreflangAlternateLang}
                    readOnly
                    className="bg-zinc-800/50 border-zinc-700 text-zinc-100"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Favicon & Manifest */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-400" />
              Favicon و Manifest / PWA Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-zinc-400">Favicon URL</Label>
              <Input
                value={state.faviconUrl}
                onChange={(e) => state.setFaviconUrl(e.target.value)}
                className="bg-zinc-800/50 border-zinc-700 text-zinc-100"
                placeholder="/logo.svg"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm text-zinc-300 font-persian">فعال‌سازی Manifest / Manifest Enabled</Label>
                <p className="text-xs text-zinc-500 mt-1">PWA manifest.json support</p>
              </div>
              <Switch
                checked={state.manifestEnabled}
                onCheckedChange={(v) => state.markUnsaved()}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
