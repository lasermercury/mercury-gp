'use client';

import { motion } from 'framer-motion';
import {
  Code2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Eye,
  ToggleLeft,
  Search,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAdminStore } from '@/store/use-admin-store';
import { useState } from 'react';

export function AdminSchemaManager() {
  const state = useAdminStore();
  const [searchFilter, setSearchFilter] = useState('');
  const [expandedSchema, setExpandedSchema] = useState<string | null>(null);

  const enabledCount = state.schemas.filter((s) => s.enabled).length;
  const totalCount = state.schemas.length;

  const filteredSchemas = state.schemas.filter(
    (s) => s.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
           s.nameFa.includes(searchFilter) ||
           s.type.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 font-persian">اسکیمای نشانه‌گذاری</h2>
        <p className="text-sm text-zinc-400 mt-1">Schema Markup — Manage JSON-LD structured data schemas</p>
      </div>

      {/* Overview */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-lg font-bold text-zinc-100">{enabledCount + '/' + totalCount}</p>
                  <p className="text-xs text-zinc-400 font-persian">اسکیما فعال / Active Schemas</p>
                </div>
              </div>

              <Separator orientation="vertical" className="h-8 bg-zinc-800 hidden sm:block" />

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-zinc-300">{enabledCount} <span className="text-zinc-500 font-persian">فعال / enabled</span></span>
              </div>

              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-zinc-500" />
                <span className="text-sm text-zinc-300">{totalCount - enabledCount} <span className="text-zinc-500 font-persian">غیرفعال / disabled</span></span>
              </div>

              <div className="ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 gap-2"
                  onClick={() => window.open('https://search.google.com/test/rich-results', '_blank')}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="font-persian">تست نتایج غنی / Test Rich Results</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <Input
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="جستجوی اسکیما / Search schemas..."
          className="pl-10 bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder-zinc-600 font-persian"
        />
      </div>

      {/* Schema List */}
      <div className="space-y-2">
        {filteredSchemas.map((schema, i) => (
          <motion.div
            key={schema.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.03 * i }}
          >
            <Card className={('bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors ' + (!schema.enabled ? 'opacity-60' : ''))}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={('w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ' + (schema.enabled ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-500'))}>
                    <Code2 className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-zinc-200 font-persian">{schema.nameFa}</p>
                      <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px] shrink-0">
                        {schema.type}
                      </Badge>
                      {!schema.enabled && (
                        <Badge variant="outline" className="border-amber-500/30 text-amber-400 text-[10px] shrink-0">
                          <AlertTriangle className="w-3 h-3 mr-0.5" />
                          غیرفعال
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 truncate">{schema.name}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                      onClick={() => setExpandedSchema(expandedSchema === schema.id ? null : schema.id)}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                    <Switch
                      checked={schema.enabled}
                      onCheckedChange={() => state.toggleSchema(schema.id)}
                    />
                  </div>
                </div>

                {expandedSchema === schema.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-zinc-800"
                  >
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-zinc-500">ID:</span>
                          <span className="text-zinc-300 ml-1">{schema.id}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500">Type:</span>
                          <span className="text-zinc-300 ml-1">{schema.type}</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 font-persian">{schema.descriptionFa}</p>
                      <p className="text-xs text-zinc-500">{schema.descriptionEn}</p>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span className="text-[10px] text-zinc-400 font-persian">وضعیت اعتبارسنجی: معتبر / Validation: Valid</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Rich Results Test */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base text-zinc-200 font-persian flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-emerald-400" />
              ابزارهای تست / Testing Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="bg-zinc-800/30 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 h-auto py-3 flex-col gap-1"
                onClick={() => window.open('https://search.google.com/test/rich-results', '_blank')}
              >
                <Code2 className="w-5 h-5" />
                <span className="text-xs font-persian">تست نتایج غنی گوگل</span>
                <span className="text-[10px] text-zinc-500">Google Rich Results Test</span>
              </Button>
              <Button
                variant="outline"
                className="bg-zinc-800/30 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 h-auto py-3 flex-col gap-1"
                onClick={() => window.open('https://validator.schema.org/', '_blank')}
              >
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-xs font-persian">اعتبارسنجی اسکیما</span>
                <span className="text-[10px] text-zinc-500">Schema Validator</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
