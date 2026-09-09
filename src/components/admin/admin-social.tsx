'use client';

import { motion } from 'framer-motion';
import {
  Share2,
  ImageIcon,
  Twitter,
  Facebook,
  Eye,
  Link2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAdminStore } from '@/store/use-admin-store';

export function AdminSocial() {
  const state = useAdminStore();

  const ogTitle = state.ogTitleOverride || state.siteTitleEn;
  const ogDescription = state.ogDescriptionOverride || state.siteDescriptionEn;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 font-persian">شبکه‌های اجتماعی</h2>
        <p className="text-sm text-zinc-400 mt-1">Social Media — Configure Open Graph and Twitter Card meta</p>
      </div>

      {/* Open Graph Settings */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <Share2 className="w-4 h-4 text-emerald-400" />
              تنظیمات Open Graph / Open Graph Settings
            </CardTitle>
            <CardDescription className="text-zinc-500">Social sharing metadata for Facebook, LinkedIn, etc.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-zinc-400">OG Image URL</Label>
              <Input
                value={state.ogImageUrl}
                onChange={(e) => state.setOgImageUrl(e.target.value)}
                placeholder="/images/og-image.jpg"
                className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-600"
              />
              {state.ogImageUrl && (
                <div className="mt-2 w-40 h-40 rounded-lg border border-zinc-700 overflow-hidden bg-zinc-800">
                  <img
                    src={state.ogImageUrl}
                    alt="OG Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              )}
            </div>

            <Separator className="bg-zinc-800" />

            <div className="space-y-2">
              <Label className="text-xs text-zinc-400 font-persian">عنوان OG (نادیده‌گیری) / OG Title Override</Label>
              <Input
                value={state.ogTitleOverride}
                onChange={(e) => state.setOgTitleOverride(e.target.value)}
                placeholder="Leave empty to use site title"
                className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-600"
              />
              <p className="text-[10px] text-zinc-600">Current: {ogTitle}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-zinc-400 font-persian">توضیحات OG (نادیده‌گیری) / OG Description Override</Label>
              <Input
                value={state.ogDescriptionOverride}
                onChange={(e) => state.setOgDescriptionOverride(e.target.value)}
                placeholder="Leave empty to use site description"
                className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-600"
              />
              <p className="text-[10px] text-zinc-600">{ogDescription.length}/200 chars</p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-zinc-400 font-persian">شناسه اپلیکیشن فیس‌بوک / Facebook App ID</Label>
              <Input
                value={state.facebookAppId}
                onChange={(e) => state.setFacebookAppId(e.target.value)}
                placeholder="123456789"
                className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-600"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Twitter Card Settings */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <Twitter className="w-4 h-4 text-emerald-400" />
              تنظیمات توییتر / Twitter Card Settings
            </CardTitle>
            <CardDescription className="text-zinc-500">Twitter/X card metadata for rich link previews</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-zinc-400 font-persian">هندل توییتر / Twitter Handle</Label>
              <Input
                value={state.twitterHandle}
                onChange={(e) => state.setTwitterHandle(e.target.value)}
                placeholder="@handle"
                className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-600"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Social Sharing Preview */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              پیش‌نمایش اشتراک‌گذاری / Social Sharing Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-zinc-700 bg-zinc-800/30 overflow-hidden max-w-md">
              {/* Image */}
              <div className="aspect-[1.91/1] bg-zinc-800 flex items-center justify-center">
                {state.ogImageUrl ? (
                  <img
                    src={state.ogImageUrl}
                    alt="OG Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-zinc-600" />
                )}
              </div>
              {/* Text */}
              <div className="p-3 space-y-1">
                <p className="text-xs text-zinc-500 truncate">{state.canonicalUrl}</p>
                <p className="text-sm font-medium text-zinc-200 truncate">{ogTitle}</p>
                <p className="text-xs text-zinc-400 line-clamp-2">{ogDescription}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 gap-2"
                onClick={() => window.open('https://developers.facebook.com/tools/debug/', '_blank')}
              >
                <Facebook className="w-3.5 h-3.5" />
                <span className="font-persian">اشکال‌زدایی فیس‌بوک / FB Debug</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 gap-2"
                onClick={() => window.open('https://cards-dev.twitter.com/validator', '_blank')}
              >
                <Twitter className="w-3.5 h-3.5" />
                <span className="font-persian">اعتبارسنجی توییتر / Twitter Validator</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
