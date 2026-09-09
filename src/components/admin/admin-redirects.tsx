'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRightLeft,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAdminStore, type RedirectRule } from '@/store/use-admin-store';

export function AdminRedirects() {
  const state = useAdminStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newFrom, setNewFrom] = useState('');
  const [newTo, setNewTo] = useState('');
  const [newStatus, setNewStatus] = useState<'301' | '302'>('301');
  const [newPattern, setNewPattern] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFrom, setEditFrom] = useState('');
  const [editTo, setEditTo] = useState('');

  const handleAdd = () => {
    if (!newFrom.trim() || !newTo.trim()) return;
    state.addRedirect({
      id: Date.now().toString(),
      from: newFrom.trim(),
      to: newTo.trim(),
      statusCode: parseInt(newStatus) as 301 | 302,
      isPattern: newPattern,
      enabled: true,
    });
    setNewFrom('');
    setNewTo('');
    setShowAdd(false);
  };

  const startEdit = (redirect: RedirectRule) => {
    setEditingId(redirect.id);
    setEditFrom(redirect.from);
    setEditTo(redirect.to);
  };

  const saveEdit = () => {
    if (!editingId) return;
    state.updateRedirect(editingId, { from: editFrom, to: editTo });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 font-persian">تغییر مسیرها</h2>
        <p className="text-sm text-zinc-400 mt-1">Redirects — Manage 301/302 redirect rules</p>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <ArrowRightLeft className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-lg font-bold text-zinc-100">{state.redirects.length}</p>
                  <p className="text-xs text-zinc-400 font-persian">قانون تغییر مسیر / Redirect Rules</p>
                </div>
              </div>
              <Button
                onClick={() => setShowAdd(!showAdd)}
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="font-persian">افزودن قانون / Add Rule</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add Form */}
      {showAdd && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-4 space-y-3">
              <p className="text-sm font-medium text-zinc-200 font-persian">قانون جدید / New Redirect Rule</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-zinc-400 font-persian">از / From</Label>
                  <Input
                    value={newFrom}
                    onChange={(e) => setNewFrom(e.target.value)}
                    placeholder="/old-path"
                    className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-600"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-zinc-400 font-persian">به / To</Label>
                  <Input
                    value={newTo}
                    onChange={(e) => setNewTo(e.target.value)}
                    placeholder="/new-path"
                    className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-600"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Select value={newStatus} onValueChange={(v) => setNewStatus(v as '301' | '302')}>
                  <SelectTrigger className="w-32 bg-zinc-800/50 border-zinc-700 text-zinc-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    <SelectItem value="301" className="text-zinc-200">301 (Permanent)</SelectItem>
                    <SelectItem value="302" className="text-zinc-200">302 (Temporary)</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Switch checked={newPattern} onCheckedChange={setNewPattern} />
                  <Label className="text-xs text-zinc-400 font-persian">الگو / Pattern</Label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleAdd}
                  disabled={!newFrom.trim() || !newTo.trim()}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1"
                >
                  <Check className="w-4 h-4" />
                  <span className="font-persian">ذخیره / Save</span>
                </Button>
                <Button
                  onClick={() => setShowAdd(false)}
                  variant="outline"
                  className="border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Redirects List */}
      <div className="space-y-2">
        {state.redirects.map((redirect, i) => (
          <motion.div
            key={redirect.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.03 * i }}
          >
            <Card className={('bg-zinc-900/50 border-zinc-800 ' + (!redirect.enabled ? 'opacity-60' : ''))}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {editingId === redirect.id ? (
                      <>
                        <Input
                          value={editFrom}
                          onChange={(e) => setEditFrom(e.target.value)}
                          className="bg-zinc-800/50 border-zinc-700 text-zinc-100 flex-1 min-w-0"
                        />
                        <ArrowRightLeft className="w-4 h-4 text-zinc-500 shrink-0" />
                        <Input
                          value={editTo}
                          onChange={(e) => setEditTo(e.target.value)}
                          className="bg-zinc-800/50 border-zinc-700 text-zinc-100 flex-1 min-w-0"
                        />
                      </>
                    ) : (
                      <>
                        <code className="text-sm text-zinc-200 truncate flex-1 min-w-0 font-mono">{redirect.from}</code>
                        <ArrowRightLeft className="w-4 h-4 text-zinc-500 shrink-0" />
                        <code className="text-sm text-emerald-400 truncate flex-1 min-w-0 font-mono">{redirect.to}</code>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" className={('text-[10px] ' + (redirect.statusCode === 301 ? 'border-emerald-500/30 text-emerald-400' : 'border-amber-500/30 text-amber-400'))}>
                      {redirect.statusCode}
                    </Badge>
                    {redirect.isPattern && (
                      <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px]">
                        <AlertCircle className="w-3 h-3 mr-0.5" />
                        Pattern
                      </Badge>
                    )}
                    <Switch
                      checked={redirect.enabled}
                      onCheckedChange={(v) => state.updateRedirect(redirect.id, { enabled: v })}
                    />
                    {editingId === redirect.id ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-emerald-400 hover:bg-emerald-400/10"
                        onClick={saveEdit}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                        onClick={() => startEdit(redirect)}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-zinc-500 hover:text-red-400 hover:bg-red-400/10"
                      onClick={() => state.removeRedirect(redirect.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {state.redirects.length === 0 && (
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-8 text-center">
              <ArrowRightLeft className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
              <p className="text-sm text-zinc-500 font-persian">هیچ قانون تغییر مسیری وجود ندارد / No redirect rules</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
