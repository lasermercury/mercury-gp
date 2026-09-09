'use client';

import { motion } from 'framer-motion';
import {
  Search,
  Globe,
  ExternalLink,
  CheckCircle2,
  Copy,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAdminStore } from '@/store/use-admin-store';

export function AdminBingOthers() {
  const state = useAdminStore();

  const engines = [
    {
      id: 'bing',
      nameFa: 'بینگ وب‌مستر',
      nameEn: 'Bing Webmaster',
      icon: <Search className="w-5 h-5" />,
      value: state.bingVerification,
      setValue: state.setBingVerification,
      placeholder: 'Bing verification code',
      dashboardUrl: 'https://www.bing.com/webmasters',
      connected: !!state.bingVerification,
    },
    {
      id: 'yandex',
      nameFa: 'یاندکس وب‌مستر',
      nameEn: 'Yandex Webmaster',
      icon: <Globe className="w-5 h-5" />,
      value: state.yandexVerification,
      setValue: state.setYandexVerification,
      placeholder: 'Yandex verification code',
      dashboardUrl: 'https://webmaster.yandex.com/',
      connected: !!state.yandexVerification,
    },
    {
      id: 'baidu',
      nameFa: 'بایدو وب‌مستر',
      nameEn: 'Baidu Webmaster',
      icon: <Search className="w-5 h-5" />,
      value: state.baiduVerification,
      setValue: state.setBaiduVerification,
      placeholder: 'Baidu verification code',
      dashboardUrl: 'https://ziyuan.baidu.com/',
      connected: !!state.baiduVerification,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 font-persian">بینگ و سایر موتورها</h2>
        <p className="text-sm text-zinc-400 mt-1">Bing & Others — Configure verification for alternative search engines</p>
      </div>

      {/* Engine Cards */}
      {engines.map((engine, i) => (
        <motion.div
          key={engine.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * i }}
        >
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={('w-10 h-10 rounded-lg flex items-center justify-center ' + (engine.connected ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-500'))}>
                    {engine.icon}
                  </div>
                  <div>
                    <CardTitle className="text-base text-zinc-200 font-persian">{engine.nameFa}</CardTitle>
                    <CardDescription className="text-zinc-500">{engine.nameEn}</CardDescription>
                  </div>
                </div>
                {engine.connected ? (
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    متصل / Connected
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-zinc-700 text-zinc-500">
                    عدم اتصال / Not Connected
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-zinc-400 font-persian">کد تأیید / Verification Code</Label>
                <div className="flex gap-2">
                  <Input
                    value={engine.value}
                    onChange={(e) => engine.setValue(e.target.value)}
                    placeholder={engine.placeholder}
                    className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-600"
                  />
                  {engine.value && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 shrink-0"
                      onClick={() => navigator.clipboard.writeText(engine.value)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              {engine.value && (
                <div className="bg-zinc-800/50 rounded-lg p-3 text-xs text-zinc-400 font-mono">
                  <p className="text-zinc-500 mb-1">Meta Tag Preview:</p>
                  <p>{'<meta name="' + engine.id + '-site-verification" content="' + engine.value + '" />'}</p>
                </div>
              )}

              <Separator className="bg-zinc-800" />

              <Button
                variant="outline"
                className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 gap-2"
                onClick={() => window.open(engine.dashboardUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="font-persian">باز کردن داشبورد / Open {engine.nameEn} Dashboard</span>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* Summary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              خلاصه اتصال / Connection Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {engines.map((engine) => (
                <div
                  key={engine.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/30 border border-zinc-800"
                >
                  {engine.connected ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-zinc-600 shrink-0" />
                  )}
                  <div>
                    <p className="text-sm text-zinc-200 font-persian">{engine.nameFa}</p>
                    <p className="text-[10px] text-zinc-500">{engine.connected ? 'متصل / Connected' : 'متصل نشده / Not connected'}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
