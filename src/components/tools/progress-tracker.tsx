'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  RotateCcw,
  Calendar,
  Activity,
  TrendingUp,
  Trash2,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLocale } from '@/components/layout/providers';
import { useToolStore } from '@/store/use-tool-store';
import { toolsEn } from '@/content/en/tools';
import { toolsFa } from '@/content/fa/tools';

/* ───────────── types ───────────── */
type SessionEntry = {
  id: string;
  area: string;
  sessionNumber: number;
  date: string;
  energyLevel: number;
  comfortLevel: number;
  notes: string;
};

type StoredData = Record<string, SessionEntry[]>;

type View = 'welcome' | 'log' | 'dashboard';

const STORAGE_KEY = 'mercury-progress-tracker';

/* ───────────── fade variants ───────────── */
const fadeVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

/* ───────────── helpers ───────────── */
function loadData(): StoredData {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredData) : {};
  } catch {
    return {};
  }
}

function saveData(data: StoredData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function daysBetween(a: string, b: string): number {
  const ms = Math.abs(new Date(a).getTime() - new Date(b).getTime());
  return Math.floor(ms / 86400000);
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/* ───────────── component ───────────── */
export default function ProgressTracker() {
  const { locale, direction } = useLocale();
  const { activeTool, closeTool } = useToolStore();
  const t = locale === 'fa' ? toolsFa : toolsEn;
  const pt = t.progressTracker;
  const isRtl = direction === 'rtl';

  const [data, setData] = useState<StoredData>(() => loadData());
  const [view, setView] = useState<View>(() => {
    const stored = loadData();
    const hasSessions = Object.values(stored).some((s) => s.length > 0);
    return hasSessions ? 'dashboard' : 'welcome';
  });
  const [selectedArea, setSelectedArea] = useState('');
  const [sessionNumber, setSessionNumber] = useState(1);
  const [date, setDate] = useState(todayISO());
  const [energyLevel, setEnergyLevel] = useState(0);
  const [comfortLevel, setComfortLevel] = useState(0);
  const [notes, setNotes] = useState('');
  const [dashboardArea, setDashboardArea] = useState<string | null>(null);

  const isOpen = activeTool === 'progress-tracker';

  /* ── compute areas with sessions ── */
  const areasWithSessions = useMemo(() => {
    return Object.keys(data).filter((k) => data[k].length > 0);
  }, [data]);

  /* ── compute next session number for an area ── */
  const getNextSessionNumber = useCallback(
    (areaId: string) => {
      const sessions = data[areaId];
      if (!sessions || sessions.length === 0) return 1;
      return Math.max(...sessions.map((s) => s.sessionNumber)) + 1;
    },
    [data]
  );

  /* ── filtered sessions for dashboard ── */
  const filteredSessions = useMemo(() => {
    if (!dashboardArea) {
      return Object.entries(data)
        .filter(([, sessions]) => sessions.length > 0)
        .sort(([, a], [, b]) => {
          const lastA = a[a.length - 1]?.date ?? '';
          const lastB = b[b.length - 1]?.date ?? '';
          return lastB.localeCompare(lastA);
        })
        .flatMap(([, sessions]) => sessions);
    }
    return (data[dashboardArea] ?? []).slice().sort((a, b) => a.date.localeCompare(b.date));
  }, [data, dashboardArea]);

  /* ── stats ── */
  const stats = useMemo(() => {
    const target = dashboardArea
      ? data[dashboardArea] ?? []
      : Object.values(data).flat();

    if (target.length === 0) return null;

    const total = target.length;
    const avgComfort = target.reduce((sum, s) => sum + s.comfortLevel, 0) / total;
    const energyCounts: Record<number, number> = {};
    for (const s of target) {
      energyCounts[s.energyLevel] = (energyCounts[s.energyLevel] ?? 0) + 1;
    }
    let commonEnergy = 3;
    let maxCount = 0;
    for (const [level, count] of Object.entries(energyCounts)) {
      if (count > maxCount) {
        maxCount = count;
        commonEnergy = Number(level);
      }
    }

    const sorted = [...target].sort((a, b) => a.date.localeCompare(b.date));
    const firstDate = sorted[0].date;
    const lastDate = sorted[sorted.length - 1].date;
    const daysSinceFirst = daysBetween(firstDate, todayISO());
    const daysSinceLast = daysBetween(lastDate, todayISO());

    return {
      total,
      avgComfort: avgComfort.toFixed(1),
      commonEnergy,
      daysSinceFirst,
      daysSinceLast,
      latestSessionNumber: sorted[sorted.length - 1].sessionNumber,
    };
  }, [data, dashboardArea]);

  /* ── handlers ── */
  const handleClose = useCallback(() => {
    closeTool();
    setTimeout(() => {
      setView('welcome');
      setSelectedArea('');
      setSessionNumber(1);
      setDate(todayISO());
      setEnergyLevel(0);
      setComfortLevel(0);
      setNotes('');
    }, 200);
  }, [closeTool]);

  const goToLog = useCallback(() => {
    setSelectedArea('');
    setSessionNumber(1);
    setDate(todayISO());
    setEnergyLevel(0);
    setComfortLevel(0);
    setNotes('');
    setView('log');
  }, []);

  const handleAreaSelect = useCallback(
    (areaId: string) => {
      setSelectedArea(areaId);
      setSessionNumber(getNextSessionNumber(areaId));
    },
    [getNextSessionNumber]
  );

  const handleSave = useCallback(() => {
    if (!selectedArea || energyLevel === 0 || comfortLevel === 0) return;

    const entry: SessionEntry = {
      id: generateId(),
      area: selectedArea,
      sessionNumber,
      date,
      energyLevel,
      comfortLevel,
      notes: notes.trim(),
    };

    const newData = { ...data };
    if (!newData[selectedArea]) newData[selectedArea] = [];
    newData[selectedArea] = [...newData[selectedArea], entry];
    saveData(newData);
    setData(newData);
    setDashboardArea(selectedArea);
    setView('dashboard');
  }, [selectedArea, sessionNumber, date, energyLevel, comfortLevel, notes, data]);

  const handleClearAll = useCallback(() => {
    saveData({});
    setData({});
    setDashboardArea(null);
    setView('welcome');
  }, []);

  const goToDashboard = useCallback(() => {
    if (areasWithSessions.length > 0) {
      if (!dashboardArea || !data[dashboardArea]) {
        setDashboardArea(areasWithSessions[0]);
      }
      setView('dashboard');
    }
  }, [areasWithSessions, dashboardArea, data]);

  /* ── get area label by id ── */
  const getAreaLabel = (areaId: string) => {
    const found = pt.areas.find((a) => a.id === areaId);
    return found ? found.label : areaId;
  };

  /* ── comfort icon color ── */
  const getComfortColor = (level: number) => {
    if (level <= 2) return 'bg-emerald-accent';
    if (level === 3) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const canSave = selectedArea !== '' && energyLevel > 0 && comfortLevel > 0;
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const BackIcon = isRtl ? ChevronRight : ChevronLeft;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent
        className="sm:max-w-2xl rounded-2xl bg-background p-0 overflow-hidden max-h-[85vh] overflow-y-auto"
        dir={direction}
      >
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-medical-blue font-semibold text-lg">
            {pt.title}
          </DialogTitle>
          <DialogDescription>{pt.description}</DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6">
          <AnimatePresence mode="wait">
            {/* ═══════ WELCOME VIEW ═══════ */}
            {view === 'welcome' && (
              <motion.div
                key="welcome"
                variants={fadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="mt-4"
              >
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-medical-blue/10 flex items-center justify-center mx-auto mb-4">
                    <Activity className="size-8 text-medical-blue" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {pt.welcomeTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
                    {pt.welcomeDescription}
                  </p>
                  <Button
                    onClick={goToLog}
                    className="bg-medical-blue text-white hover:bg-medical-blue/90 rounded-full gap-2"
                  >
                    <Plus className="size-4" />
                    {pt.getStartedLabel}
                  </Button>
                  {areasWithSessions.length > 0 && (
                    <div className="mt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={goToDashboard}
                        className="text-medical-blue gap-2"
                      >
                        <TrendingUp className="size-4" />
                        {pt.dashboardLabel}
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ═══════ LOG SESSION VIEW ═══════ */}
            {view === 'log' && (
              <motion.div
                key="log"
                variants={fadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="mt-4"
              >
                <button
                  type="button"
                  onClick={goToDashboard}
                  className={`flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 ${areasWithSessions.length === 0 ? 'invisible' : ''}`}
                >
                  <BackIcon className="size-4" />
                  {pt.dashboardLabel}
                </button>

                {/* Treatment Area */}
                <div className="mb-5">
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    {pt.areaLabel}
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {pt.areas.map((area) => {
                      const isSelected = selectedArea === area.id;
                      return (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => handleAreaSelect(area.id)}
                          className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                            isSelected
                              ? 'border-medical-blue/50 bg-medical-blue/10 text-medical-blue'
                              : 'border-border/50 bg-background text-muted-foreground hover:border-medical-blue/30 hover:text-foreground'
                          }`}
                        >
                          {area.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Session Number & Date */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">
                      {pt.sessionNumberLabel}
                    </Label>
                    <Input
                      type="number"
                      min={1}
                      value={sessionNumber}
                      onChange={(e) => setSessionNumber(Math.max(1, parseInt(e.target.value) || 1))}
                      className="rounded-xl border-border/50"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">
                      {pt.dateLabel}
                    </Label>
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="rounded-xl border-border/50"
                    />
                  </div>
                </div>

                {/* Energy Level */}
                <div className="mb-5">
                  <Label className="text-sm font-medium text-foreground mb-3 block">
                    {pt.energyLevelLabel}
                  </Label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {pt.energyLevels.map((label, idx) => {
                      const level = idx + 1;
                      const isSelected = energyLevel === level;
                      return (
                        <button
                          key={`energy-${idx}`}
                          type="button"
                          onClick={() => setEnergyLevel(level)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-all ${
                            isSelected
                              ? 'border-medical-blue/50 bg-medical-blue/10 text-medical-blue font-medium'
                              : 'border-border/50 bg-background text-muted-foreground hover:border-medical-blue/30'
                          }`}
                        >
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            isSelected
                              ? level <= 2
                                ? 'bg-emerald-accent'
                                : level <= 3
                                  ? 'bg-amber-500'
                                  : 'bg-medical-blue'
                              : 'bg-border'
                          }`} />
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Comfort Level */}
                <div className="mb-5">
                  <Label className="text-sm font-medium text-foreground mb-3 block">
                    {pt.comfortLevelLabel}
                  </Label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {pt.comfortLevels.map((label, idx) => {
                      const level = idx + 1;
                      const isSelected = comfortLevel === level;
                      return (
                        <button
                          key={`comfort-${idx}`}
                          type="button"
                          onClick={() => setComfortLevel(level)}
                          className={`px-3 py-2 rounded-xl border text-sm transition-all ${
                            isSelected
                              ? 'border-medical-blue/50 bg-medical-blue/10 text-medical-blue font-medium'
                              : 'border-border/50 bg-background text-muted-foreground hover:border-medical-blue/30'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    {pt.notesLabel}
                  </Label>
                  <Input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={pt.notesPlaceholder}
                    className="rounded-xl border-border/50"
                  />
                </div>

                {/* Save Button */}
                <Button
                  onClick={handleSave}
                  disabled={!canSave}
                  className={`w-full bg-medical-blue text-white hover:bg-medical-blue/90 rounded-full gap-2 disabled:opacity-40 disabled:pointer-events-none`}
                >
                  <Calendar className="size-4" />
                  {pt.saveLabel}
                </Button>
              </motion.div>
            )}

            {/* ═══════ DASHBOARD VIEW ═══════ */}
            {view === 'dashboard' && (
              <motion.div
                key="dashboard"
                variants={fadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="mt-4"
              >
                {/* Area Tabs */}
                {areasWithSessions.length > 1 && (
                  <div className="flex items-center gap-2 mb-5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setDashboardArea(null)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        dashboardArea === null
                          ? 'border-medical-blue/50 bg-medical-blue/10 text-medical-blue'
                          : 'border-border/50 text-muted-foreground hover:border-medical-blue/30 hover:text-foreground'
                      }`}
                    >
                      {pt.allAreas}
                    </button>
                    {areasWithSessions.map((areaId) => {
                      const isActive = dashboardArea === areaId;
                      return (
                        <button
                          key={areaId}
                          type="button"
                          onClick={() => setDashboardArea(areaId)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                            isActive
                              ? 'border-medical-blue/50 bg-medical-blue/10 text-medical-blue'
                              : 'border-border/50 text-muted-foreground hover:border-medical-blue/30 hover:text-foreground'
                          }`}
                        >
                          {getAreaLabel(areaId)}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Progress Indicator */}
                {stats && (
                  <div className="mb-5 p-4 rounded-xl bg-medical-blue/5 border border-medical-blue/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-medical-blue">
                        {pt.progressLabel}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {pt.sessionOf
                          .replace('{current}', String(stats.latestSessionNumber))
                          .replace('{min}', '8')
                          .replace('{max}', '12')}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-medical-blue/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-accent to-medical-blue rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (stats.latestSessionNumber / 12) * 100)}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                )}

                {/* Stats Grid */}
                {stats ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-background border border-border/40">
                      <p className="text-xs text-muted-foreground mb-1">{pt.stats.totalSessions}</p>
                      <p className="text-lg font-semibold text-foreground">{stats.total}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-background border border-border/40">
                      <p className="text-xs text-muted-foreground mb-1">{pt.stats.avgComfort}</p>
                      <p className="text-lg font-semibold text-foreground">{stats.avgComfort}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-background border border-border/40">
                      <p className="text-xs text-muted-foreground mb-1">{pt.stats.commonEnergy}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((lvl) => (
                            <span
                              key={lvl}
                              className={`w-2 h-2 rounded-full ${
                                lvl <= stats.commonEnergy
                                  ? lvl <= 2
                                    ? 'bg-emerald-accent'
                                    : lvl <= 3
                                      ? 'bg-amber-500'
                                      : 'bg-medical-blue'
                                  : 'bg-border'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-background border border-border/40">
                      <p className="text-xs text-muted-foreground mb-1">{pt.stats.daysSinceFirst}</p>
                      <p className="text-lg font-semibold text-foreground">{stats.daysSinceFirst}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-background border border-border/40">
                      <p className="text-xs text-muted-foreground mb-1">{pt.stats.daysSinceLast}</p>
                      <p className={`text-lg font-semibold ${stats.daysSinceLast > 14 ? 'text-amber-600' : 'text-emerald-accent'}`}>
                        {stats.daysSinceLast}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    {pt.stats.noData}
                  </p>
                )}

                {/* Session Timeline */}
                {filteredSessions.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Calendar className="size-4 text-medical-blue" />
                      {pt.sessionNumberLabel === 'شماره جلسه' ? 'تاریخچه جلسات' : 'Session History'}
                    </h4>
                    <div className="relative max-h-72 overflow-y-auto pr-6 sm:pr-8">
                      {/* Vertical connecting line */}
                      <div className={`absolute top-2 bottom-2 w-px bg-medical-blue/20 ${isRtl ? 'right-3 sm:right-4' : 'left-3 sm:left-4'}`} />

                      {filteredSessions.map((session, idx) => (
                        <div key={session.id} className="relative mb-4 last:mb-0">
                          {/* Timeline dot */}
                          <div className={`absolute top-3 w-3 h-3 rounded-full border-2 border-medical-blue bg-background ${isRtl ? 'right-[5px] sm:right-[11px]' : 'left-[5px] sm:left-[11px]'}`}>
                            <div className={`absolute inset-0.5 rounded-full ${idx === filteredSessions.length - 1 ? 'bg-medical-blue' : 'bg-medical-blue/40'}`} />
                          </div>

                          {/* Card */}
                          <div className={`ml-0 sm:ml-0 ${isRtl ? 'mr-6 sm:mr-8' : 'ml-6 sm:ml-8'} p-3 rounded-xl border border-border/40 bg-background hover:border-medical-blue/20 transition-colors`}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs font-medium bg-medical-blue/10 text-medical-blue border-0">
                                  {pt.sessionNumberLabel} {session.sessionNumber}
                                </Badge>
                                {(!dashboardArea || dashboardArea === session.area) && dashboardArea === null && (
                                  <span className="text-xs text-muted-foreground">
                                    {getAreaLabel(session.area)}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {new Date(session.date).toLocaleDateString(
                                  locale === 'fa' ? 'fa-IR' : 'en-US',
                                  { month: 'short', day: 'numeric', year: 'numeric' }
                                )}
                              </span>
                            </div>

                            {/* Energy dots */}
                            <div className="flex items-center gap-3 mb-1.5">
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-muted-foreground mr-1">
                                  {pt.energyLevelLabel === 'سطح انرژی' ? 'انرژی' : 'Energy'}
                                </span>
                                <div className="flex gap-0.5">
                                  {[1, 2, 3, 4, 5].map((lvl) => (
                                    <span
                                      key={lvl}
                                      className={`w-2 h-2 rounded-full transition-colors ${
                                        lvl <= session.energyLevel
                                          ? lvl <= 2
                                            ? 'bg-emerald-accent'
                                            : lvl <= 3
                                              ? 'bg-amber-500'
                                              : 'bg-medical-blue'
                                          : 'bg-border'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>

                              {/* Comfort dots */}
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-muted-foreground mr-1">
                                  {pt.comfortLevelLabel === 'سطح آسایش' ? 'آسایش' : 'Comfort'}
                                </span>
                                <div className="flex gap-0.5">
                                  {[1, 2, 3, 4, 5].map((lvl) => (
                                    <span
                                      key={lvl}
                                      className={`w-2 h-2 rounded-full transition-colors ${
                                        lvl <= session.comfortLevel
                                          ? getComfortColor(lvl)
                                          : 'bg-border'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>

                            {session.notes && (
                              <p className="text-xs text-muted-foreground mt-1.5 italic">
                                &ldquo;{session.notes}&rdquo;
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={goToLog}
                    className="text-medical-blue gap-2 hover:bg-medical-blue/10"
                  >
                    <Plus className="size-4" />
                    {pt.logSessionLabel}
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 gap-2 hover:bg-red-500/10"
                      >
                        <Trash2 className="size-4" />
                        {pt.clearDataLabel}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent dir={direction}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{pt.clearConfirmTitle}</AlertDialogTitle>
                        <AlertDialogDescription>{pt.clearConfirmDescription}</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{pt.cancelLabel}</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleClearAll}
                          className="bg-red-500 text-white hover:bg-red-500/90"
                        >
                          {pt.confirmLabel}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ========== DISCLAIMER ========== */}
          <p className="text-xs text-muted-foreground/50 mt-6 leading-relaxed text-center">
            {t.disclaimer[locale as 'en' | 'fa']}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
