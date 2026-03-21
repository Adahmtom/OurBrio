"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, Plus, Trash2 } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isWeekend } from "date-fns";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface BlockedDate {
  id: string;
  date: string;
  reason?: string;
}

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [blockReason, setBlockReason] = useState("");

  useEffect(() => { fetchCalendar(); }, [currentMonth]);

  const fetchCalendar = async () => {
    try {
      const month = format(currentMonth, "yyyy-MM");
      const res = await fetch(`/api/calendar?month=${month}`);
      const data = await res.json();
      setBlockedDates(data.blockedDates || []);
    } catch { toast.error("Failed to load"); }
    finally { setLoading(false); }
  };

  const blockDate = async () => {
    if (!selectedDate) return;
    try {
      await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: format(selectedDate, "yyyy-MM-dd"), reason: blockReason })
      });
      toast.success("Date blocked");
      setSelectedDate(null);
      setBlockReason("");
      fetchCalendar();
    } catch { toast.error("Failed to block"); }
  };

  const unblockDate = async (id: string) => {
    try {
      await fetch(`/api/calendar?id=${id}`, { method: "DELETE" });
      toast.success("Date unblocked");
      fetchCalendar();
    } catch { toast.error("Failed to unblock"); }
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const isBlocked = (date: Date) => blockedDates.some(b => isSameDay(new Date(b.date), date));
  const getBlockedInfo = (date: Date) => blockedDates.find(b => isSameDay(new Date(b.date), date));

  // Pad days to start on Sunday
  const startPadding = monthStart.getDay();
  const paddedDays = [...Array(startPadding).fill(null), ...days];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Calendar Management</h1>
        <p className="text-zinc-400 mt-1">Block dates when you&apos;re unavailable for consultations</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white">
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-xl font-semibold text-white">{format(currentMonth, "MMMM yyyy")}</h2>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-zinc-500 text-sm font-medium py-2">{day}</div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-2">
            {paddedDays.map((day, i) => {
              if (!day) return <div key={`pad-${i}`} />;
              const blocked = isBlocked(day);
              const weekend = isWeekend(day);
              const past = day < new Date(new Date().setHours(0,0,0,0));

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => !past && setSelectedDate(day)}
                  disabled={past}
                  className={`
                    aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all
                    ${past ? "text-zinc-700 cursor-not-allowed" : "hover:bg-zinc-800 cursor-pointer"}
                    ${blocked ? "bg-red-500/20 text-red-400 border border-red-500/30" : ""}
                    ${weekend && !blocked ? "text-zinc-500" : "text-white"}
                    ${isSameDay(day, new Date()) ? "ring-2 ring-emerald-500" : ""}
                  `}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500/30" />
              <span className="text-zinc-400 text-sm">Blocked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded ring-2 ring-emerald-500" />
              <span className="text-zinc-400 text-sm">Today</span>
            </div>
          </div>
        </div>

        {/* Blocked dates list */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Blocked Dates</h3>
          {blockedDates.length === 0 ? (
            <p className="text-zinc-500 text-center py-8">No blocked dates this month</p>
          ) : (
            <div className="space-y-3">
              {blockedDates.map((b) => (
                <div key={b.id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/50">
                  <div>
                    <p className="text-white font-medium">{format(new Date(b.date), "MMM d, yyyy")}</p>
                    {b.reason && <p className="text-zinc-500 text-sm">{b.reason}</p>}
                  </div>
                  <button onClick={() => unblockDate(b.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Block date modal */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md">
            <div className="border-b border-zinc-800 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Block Date</h2>
              <button onClick={() => setSelectedDate(null)} className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="text-center p-4 rounded-xl bg-zinc-800/50">
                <p className="text-2xl font-bold text-white">{format(selectedDate, "EEEE")}</p>
                <p className="text-zinc-400">{format(selectedDate, "MMMM d, yyyy")}</p>
              </div>

              {isBlocked(selectedDate) ? (
                <div className="text-center">
                  <p className="text-zinc-400 mb-4">This date is already blocked</p>
                  <button
                    onClick={() => {
                      const info = getBlockedInfo(selectedDate);
                      if (info) unblockDate(info.id);
                      setSelectedDate(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                  >
                    Unblock This Date
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Reason (optional)</label>
                    <input
                      value={blockReason}
                      onChange={(e) => setBlockReason(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50"
                      placeholder="e.g., Holiday, Out of office"
                    />
                  </div>
                  <button onClick={blockDate} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-400">
                    <X size={20} /> Block This Date
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
