"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  Mail,
  Phone,
  MessageSquare,
  StickyNote,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
  isWeekend,
} from "date-fns";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type BlockedDate = {
  _id: Id<"blockedDates">;
  date: string;
  reason?: string;
};

type Booking = {
  _id: Id<"bookings">;
  _creationTime: number;
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  message?: string;
  status: "pending" | "confirmed" | "cancelled";
  notes?: string;
};

type BookingStatus = "pending" | "confirmed" | "cancelled";

const STATUS_COLORS: Record<BookingStatus, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  confirmed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

const STATUS_ICONS: Record<BookingStatus, React.ReactNode> = {
  pending: <Clock size={12} />,
  confirmed: <CheckCircle size={12} />,
  cancelled: <XCircle size={12} />,
};

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [blockReason, setBlockReason] = useState("");
  const [bookingFilter, setBookingFilter] = useState<BookingStatus | "all">("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [activeTab, setActiveTab] = useState<"calendar" | "bookings">("calendar");

  const month = format(currentMonth, "yyyy-MM");
  const calendarData = useQuery(api.calendar.get, { month });
  const allBookings = useQuery(
    api.calendar.listBookings,
    bookingFilter === "all" ? {} : { status: bookingFilter },
  ) as Booking[] | undefined;

  const blockDateMutation = useMutation(api.calendar.blockDate);
  const unblockDateMutation = useMutation(api.calendar.unblockDate);
  const updateBookingMutation = useMutation(api.calendar.updateBooking);
  const deleteBookingMutation = useMutation(api.calendar.deleteBooking);

  const blockedDates = (calendarData?.blockedDates ?? []) as BlockedDate[];

  // ── Calendar handlers ──────────────────────────────────────────────────────
  const handleBlock = async () => {
    if (!selectedDate) return;
    try {
      await blockDateMutation({
        date: format(selectedDate, "yyyy-MM-dd"),
        reason: blockReason || undefined,
      });
      toast.success("Date blocked");
      setSelectedDate(null);
      setBlockReason("");
    } catch {
      toast.error("Failed to block date");
    }
  };

  const handleUnblock = async (id: Id<"blockedDates">) => {
    try {
      await unblockDateMutation({ id });
      toast.success("Date unblocked");
      setSelectedDate(null);
    } catch {
      toast.error("Failed to unblock date");
    }
  };

  // ── Booking handlers ───────────────────────────────────────────────────────
  const handleStatusChange = async (id: Id<"bookings">, status: BookingStatus) => {
    try {
      await updateBookingMutation({ id, status });
      toast.success(`Booking ${status}`);
      if (selectedBooking?._id === id) {
        setSelectedBooking({ ...selectedBooking, status });
      }
    } catch {
      toast.error("Failed to update booking");
    }
  };

  const handleSaveNote = async (id: Id<"bookings">) => {
    try {
      await updateBookingMutation({ id, notes: adminNote });
      toast.success("Note saved");
    } catch {
      toast.error("Failed to save note");
    }
  };

  const handleDeleteBooking = async (id: Id<"bookings">) => {
    if (!confirm("Permanently delete this booking?")) return;
    try {
      await deleteBookingMutation({ id });
      toast.success("Booking deleted");
      setSelectedBooking(null);
    } catch {
      toast.error("Failed to delete booking");
    }
  };

  // ── Calendar grid ──────────────────────────────────────────────────────────
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const isBlocked = (date: Date) =>
    blockedDates.some((b) => isSameDay(new Date(b.date + "T00:00:00"), date));
  const getBlockedInfo = (date: Date) =>
    blockedDates.find((b) => isSameDay(new Date(b.date + "T00:00:00"), date));

  const startPadding = monthStart.getDay();
  const paddedDays = [...Array(startPadding).fill(null), ...days];

  // Bookings on a given calendar date
  const bookingsOnDate = (date: Date) =>
    (allBookings ?? []).filter((b) => b.date === format(date, "yyyy-MM-dd") && b.status !== "cancelled");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Calendar & Bookings</h1>
        <p className="text-zinc-400 mt-1">
          Manage your availability and Diagnosis Call bookings
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["calendar", "bookings"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={[
              "px-5 py-2 rounded-xl text-sm font-medium transition-all capitalize",
              activeTab === tab
                ? "bg-emerald-500 text-black"
                : "bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-800",
            ].join(" ")}
          >
            {tab === "calendar" ? "📅 Calendar" : "📋 Bookings"}
            {tab === "bookings" && allBookings !== undefined && (
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-white/10 text-xs">
                {allBookings.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── CALENDAR TAB ──────────────────────────────────────────────────── */}
      {activeTab === "calendar" && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-xl font-semibold text-white">
                {format(currentMonth, "MMMM yyyy")}
              </h2>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-center text-zinc-500 text-sm font-medium py-2">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {paddedDays.map((day, i) => {
                if (!day) return <div key={`pad-${i}`} />;
                const blocked = isBlocked(day);
                const weekend = isWeekend(day);
                const past = day < new Date(new Date().setHours(0, 0, 0, 0));
                const bookingCount = bookingsOnDate(day).length;

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => !past && setSelectedDate(day)}
                    disabled={past}
                    className={[
                      "aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all relative",
                      past ? "text-zinc-700 cursor-not-allowed" : "hover:bg-zinc-800 cursor-pointer",
                      blocked ? "bg-red-500/20 text-red-400 border border-red-500/30" : "",
                      weekend && !blocked ? "text-zinc-500" : !blocked ? "text-white" : "",
                      isSameDay(day, new Date()) ? "ring-2 ring-emerald-500" : "",
                    ].filter(Boolean).join(" ")}
                  >
                    {format(day, "d")}
                    {bookingCount > 0 && (
                      <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-black text-[9px] font-bold flex items-center justify-center">
                        {bookingCount}
                      </span>
                    )}
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
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-emerald-500 flex items-center justify-center text-black text-[9px] font-bold">1</div>
                <span className="text-zinc-400 text-sm">Has bookings</span>
              </div>
            </div>
          </div>

          {/* Blocked dates list */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Blocked Dates</h3>
            {calendarData === undefined ? (
              <div className="flex justify-center py-8">
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : blockedDates.length === 0 ? (
              <p className="text-zinc-500 text-center py-8">No blocked dates this month</p>
            ) : (
              <div className="space-y-3">
                {blockedDates.map((b) => (
                  <div
                    key={b._id}
                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/50"
                  >
                    <div>
                      <p className="text-white font-medium">
                        {format(new Date(b.date + "T00:00:00"), "MMM d, yyyy")}
                      </p>
                      {b.reason && <p className="text-zinc-500 text-sm">{b.reason}</p>}
                    </div>
                    <button
                      onClick={() => handleUnblock(b._id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── BOOKINGS TAB ──────────────────────────────────────────────────── */}
      {activeTab === "bookings" && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Booking list */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filter */}
            <div className="flex gap-2 flex-wrap">
              {(["all", "pending", "confirmed", "cancelled"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setBookingFilter(f)}
                  className={[
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize",
                    bookingFilter === f
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-zinc-800/50 text-zinc-500 hover:text-zinc-300 border border-zinc-700",
                  ].join(" ")}
                >
                  {f}
                </button>
              ))}
            </div>

            {allBookings === undefined ? (
              <div className="flex justify-center py-16">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : allBookings.length === 0 ? (
              <div className="text-center py-16 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                <Calendar className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                <p className="text-zinc-500">No bookings found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {allBookings.map((booking) => (
                  <motion.button
                    key={booking._id}
                    onClick={() => {
                      setSelectedBooking(booking);
                      setAdminNote(booking.notes ?? "");
                    }}
                    whileHover={{ x: 2 }}
                    className={[
                      "w-full text-left p-4 rounded-2xl bg-zinc-900/50 border transition-all",
                      selectedBooking?._id === booking._id
                        ? "border-emerald-500/40 bg-emerald-500/5"
                        : "border-zinc-800 hover:border-zinc-700",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-white font-semibold truncate">{booking.name}</p>
                          <span className={[
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium",
                            STATUS_COLORS[booking.status],
                          ].join(" ")}>
                            {STATUS_ICONS[booking.status]}
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-zinc-400 text-sm truncate">{booking.email}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-emerald-400 text-sm font-medium">
                          {format(new Date(booking.date + "T00:00:00"), "MMM d")}
                        </p>
                        <p className="text-zinc-500 text-xs">{booking.time}</p>
                      </div>
                    </div>
                    {booking.message && (
                      <p className="text-zinc-600 text-xs mt-2 truncate">{booking.message}</p>
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Booking detail panel */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <AnimatePresence mode="wait">
              {selectedBooking ? (
                <motion.div
                  key={selectedBooking._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-white">Booking Details</h3>
                    <button
                      onClick={() => setSelectedBooking(null)}
                      className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-500"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Contact info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User size={14} className="text-zinc-500 flex-shrink-0" />
                      <span className="text-white text-sm">{selectedBooking.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={14} className="text-zinc-500 flex-shrink-0" />
                      <a href={`mailto:${selectedBooking.email}`} className="text-emerald-400 text-sm hover:underline truncate">
                        {selectedBooking.email}
                      </a>
                    </div>
                    {selectedBooking.phone && (
                      <div className="flex items-center gap-3">
                        <Phone size={14} className="text-zinc-500 flex-shrink-0" />
                        <a href={`tel:${selectedBooking.phone}`} className="text-white text-sm">
                          {selectedBooking.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Calendar size={14} className="text-zinc-500 flex-shrink-0" />
                      <span className="text-white text-sm">
                        {format(new Date(selectedBooking.date + "T00:00:00"), "EEEE, MMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={14} className="text-zinc-500 flex-shrink-0" />
                      <span className="text-white text-sm">{selectedBooking.time}</span>
                    </div>
                  </div>

                  {/* Message */}
                  {selectedBooking.message && (
                    <div className="pt-4 border-t border-zinc-800">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare size={14} className="text-zinc-500" />
                        <p className="text-zinc-500 text-xs">Client message</p>
                      </div>
                      <p className="text-zinc-300 text-sm leading-relaxed">
                        {selectedBooking.message}
                      </p>
                    </div>
                  )}

                  {/* Status actions */}
                  <div className="pt-4 border-t border-zinc-800">
                    <p className="text-zinc-500 text-xs mb-3">Update status</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(selectedBooking._id, "confirmed")}
                        disabled={selectedBooking.status === "confirmed"}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      >
                        <CheckCircle size={12} /> Confirm
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedBooking._id, "cancelled")}
                        disabled={selectedBooking.status === "cancelled"}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      >
                        <XCircle size={12} /> Cancel
                      </button>
                    </div>
                  </div>

                  {/* Admin note */}
                  <div className="pt-4 border-t border-zinc-800">
                    <div className="flex items-center gap-2 mb-2">
                      <StickyNote size={14} className="text-zinc-500" />
                      <p className="text-zinc-500 text-xs">Admin notes</p>
                    </div>
                    <textarea
                      rows={3}
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white text-sm resize-none focus:outline-none focus:border-emerald-500/50"
                      placeholder="Internal notes about this booking..."
                    />
                    <button
                      onClick={() => handleSaveNote(selectedBooking._id)}
                      className="mt-2 w-full py-2 rounded-xl bg-zinc-800 text-zinc-300 text-sm hover:bg-zinc-700 transition-colors"
                    >
                      Save Note
                    </button>
                  </div>

                  {/* Delete */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleDeleteBooking(selectedBooking._id)}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-red-500/60 hover:text-red-400 hover:bg-red-500/5 text-sm transition-all"
                    >
                      <Trash2 size={14} /> Delete Booking
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Calendar className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                  <p className="text-zinc-600 text-sm">Select a booking to view details</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Block date modal */}
      {selectedDate && activeTab === "calendar" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md"
          >
            <div className="border-b border-zinc-800 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Manage Date</h2>
              <button
                onClick={() => setSelectedDate(null)}
                className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="text-center p-4 rounded-xl bg-zinc-800/50">
                <p className="text-2xl font-bold text-white">{format(selectedDate, "EEEE")}</p>
                <p className="text-zinc-400">{format(selectedDate, "MMMM d, yyyy")}</p>
                {bookingsOnDate(selectedDate).length > 0 && (
                  <p className="text-emerald-400 text-sm mt-1">
                    {bookingsOnDate(selectedDate).length} active booking(s)
                  </p>
                )}
              </div>

              {isBlocked(selectedDate) ? (
                <div className="text-center">
                  <p className="text-zinc-400 mb-4">This date is blocked</p>
                  <button
                    onClick={() => {
                      const info = getBlockedInfo(selectedDate);
                      if (info) handleUnblock(info._id);
                    }}
                    className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                  >
                    Unblock This Date
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">
                      Reason for blocking (optional)
                    </label>
                    <input
                      value={blockReason}
                      onChange={(e) => setBlockReason(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50"
                      placeholder="e.g., Holiday, Out of office"
                    />
                  </div>
                  <button
                    onClick={handleBlock}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-400"
                  >
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
