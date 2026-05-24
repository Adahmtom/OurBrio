"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isToday,
  isBefore,
  startOfDay,
  isSameDay,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Calendar,
  User,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

// ── Types ────────────────────────────────────────────────────────────────────

type Step = "info" | "date" | "time" | "confirm";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// ── Motion variants ──────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
};

const STEPS: Step[] = ["info", "date", "time", "confirm"];
const STEP_LABELS = ["Your Info", "Pick Date", "Pick Time"];

// ── Component ────────────────────────────────────────────────────────────────

export function BookingCalendar() {
  const [step, setStep] = useState<Step>("info");
  const [direction, setDirection] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // ── Convex queries ──────────────────────────────────────────────────────
  const monthStr = format(currentMonth, "yyyy-MM");
  const selectedDateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;

  const blockedDates = useQuery(api.calendar.getPublicBlockedDates, { month: monthStr });
  const activeDays = useQuery(api.calendar.getActiveDaysOfWeek, {});
  const availableSlots = useQuery(
    api.calendar.getPublicAvailability,
    selectedDateStr ? { date: selectedDateStr } : "skip",
  );
  const createBooking = useMutation(api.calendar.createBooking);

  // ── Calendar grid ───────────────────────────────────────────────────────
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPadding = monthStart.getDay();
  const paddedDays = [...Array(startPadding).fill(null), ...days];

  const blockedDateSet = useMemo(
    () => new Set((blockedDates ?? []).map((b) => b.date)),
    [blockedDates],
  );
  const activeDaySet = useMemo(() => new Set(activeDays ?? []), [activeDays]);

  const isDayAvailable = (day: Date) => {
    if (isBefore(day, startOfDay(new Date()))) return false;
    if (!activeDaySet.has(day.getDay())) return false;
    if (blockedDateSet.has(format(day, "yyyy-MM-dd"))) return false;
    return true;
  };

  // ── Navigation ──────────────────────────────────────────────────────────
  const navigate = (to: Step, dir: 1 | -1 = 1) => {
    setDirection(dir);
    setStep(to);
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("date", 1);
  };

  const handleDateSelect = (day: Date) => {
    setSelectedDate(day);
    setSelectedTime(null);
    navigate("time", 1);
  };

  const handleTimeSelect = async (time: string) => {
    if (!selectedDateStr) return;
    setSelectedTime(time);
    setIsSubmitting(true);
    try {
      await createBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        date: selectedDateStr,
        time,
        message: formData.message || undefined,
      });
      navigate("confirm", 1);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep("info");
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  // ── Step index for progress indicator ──────────────────────────────────
  const currentStepIndex = STEPS.indexOf(step);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress indicator */}
      {step !== "confirm" && (
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEP_LABELS.map((label, i) => {
            const isActive = currentStepIndex === i;
            const isDone = currentStepIndex > i;
            return (
              <div key={label} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={[
                      "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                      isActive
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                        : isDone
                          ? "bg-emerald-500/25 text-emerald-400"
                          : "bg-white/5 text-white/25 border border-white/10",
                    ].join(" ")}
                  >
                    {isDone ? "✓" : i + 1}
                  </div>
                  <span
                    className={[
                      "text-xs font-medium transition-colors hidden sm:block",
                      isActive ? "text-white" : "text-white/30",
                    ].join(" ")}
                  >
                    {label}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    className={[
                      "w-12 h-px mb-5 transition-all duration-300",
                      isDone ? "bg-emerald-500/40" : "bg-white/10",
                    ].join(" ")}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>

          {/* ── STEP 1: Info form ───────────────────────────────────────────── */}
          {step === "info" && (
            <motion.div
              key="info"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Tell us about yourself
                </h3>
                <p className="text-white/40 text-sm mb-7">
                  We&apos;ll use this to confirm your call and send you the details.
                </p>

                <form onSubmit={handleInfoSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="flex items-center gap-2 text-white/55 text-sm mb-2">
                        <User className="w-4 h-4" />
                        Full Name <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-emerald-500/50 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-white/55 text-sm mb-2">
                        <Mail className="w-4 h-4" />
                        Email <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-emerald-500/50 transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-white/55 text-sm mb-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                      <span className="text-white/25 text-xs ml-1">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-emerald-500/50 transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-white/55 text-sm mb-2">
                      <MessageSquare className="w-4 h-4" />
                      What would you like to discuss?
                      <span className="text-white/25 text-xs ml-1">(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                      placeholder="Briefly describe your business and what you're hoping to solve..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-base transition-colors shadow-lg shadow-emerald-500/20"
                  >
                    Select a Date
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Date picker ─────────────────────────────────────────── */}
          {step === "date" && (
            <motion.div
              key="date"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                {/* Back + greeting */}
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => navigate("info", -1)}
                    className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Hey {formData.name.split(" ")[0]}, pick a date
                    </h3>
                    <p className="text-white/35 text-sm">
                      Confirmation will be sent to {formData.email}
                    </p>
                  </div>
                </div>

                {/* Month nav */}
                <div className="flex items-center justify-between mb-5">
                  <button
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <h3 className="text-base font-semibold text-white">
                    {format(currentMonth, "MMMM yyyy")}
                  </h3>
                  <button
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Day labels */}
                <div className="grid grid-cols-7 gap-1 mb-1">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div
                      key={d}
                      className="text-center text-white/25 text-xs font-medium py-2"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {paddedDays.map((day, i) => {
                    if (!day) return <div key={`pad-${i}`} />;
                    const available = isDayAvailable(day);
                    const past = isBefore(day, startOfDay(new Date()));
                    const today = isToday(day);
                    const selected = selectedDate && isSameDay(day, selectedDate);

                    return (
                      <motion.button
                        key={day.toISOString()}
                        onClick={() => available && handleDateSelect(day)}
                        disabled={!available}
                        whileHover={available ? { scale: 1.1 } : {}}
                        whileTap={available ? { scale: 0.92 } : {}}
                        className={[
                          "aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all",
                          selected
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                            : available
                              ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/20 cursor-pointer"
                              : past
                                ? "text-white/12 cursor-not-allowed"
                                : "text-white/18 cursor-not-allowed",
                          today && !selected ? "ring-1 ring-emerald-500/50" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {format(day, "d")}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-6 mt-6 pt-5 border-t border-white/10 text-xs text-white/30">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/30" />
                    Available
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded ring-1 ring-emerald-500/50" />
                    Today
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-white/5" />
                    Unavailable
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Time picker ─────────────────────────────────────────── */}
          {step === "time" && selectedDate && (
            <motion.div
              key="time"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => navigate("date", -1)}
                    className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {format(selectedDate, "EEEE, MMMM d")}
                    </h3>
                    <p className="text-white/35 text-sm">
                      Select a time — 60 min session
                    </p>
                  </div>
                </div>

                {isSubmitting ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-white/40 text-sm">Confirming your booking…</p>
                  </div>
                ) : availableSlots === undefined ? (
                  <div className="flex justify-center py-16">
                    <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="w-12 h-12 text-white/15 mx-auto mb-4" />
                    <p className="text-white/50 mb-2">No slots available for this date.</p>
                    <button
                      onClick={() => navigate("date", -1)}
                      className="mt-2 text-emerald-400 text-sm hover:text-emerald-300 transition-colors"
                    >
                      ← Choose another date
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {availableSlots.map((slot, i) => (
                        <motion.button
                          key={slot}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.025 }}
                          onClick={() => handleTimeSelect(slot)}
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.93 }}
                          className="px-3 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/25 hover:border-emerald-500/50 transition-all text-center"
                        >
                          {slot}
                        </motion.button>
                      ))}
                    </div>
                    <p className="mt-5 text-center text-white/25 text-xs">
                      Clicking a time will confirm your booking instantly
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: Confirmation ────────────────────────────────────────── */}
          {step === "confirm" && (
            <motion.div
              key="confirm"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div className="p-10 md:p-14 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 220, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">
                    You&apos;re all set, {formData.name.split(" ")[0]}!
                  </h3>
                  <p className="text-white/45 mb-2">Your Diagnosis Call is booked for</p>
                  <p className="text-emerald-400 font-semibold text-xl mb-1">
                    {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </p>
                  <p className="text-emerald-300 font-medium text-lg mb-7">at {selectedTime}</p>

                  {/* What was sent */}
                  <div className="inline-flex flex-col items-start gap-3 text-left bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 mb-6 mx-auto">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <p className="text-white/60 text-sm">
                        Confirmation sent to{" "}
                        <span className="text-white font-medium">{formData.email}</span>
                      </p>
                    </div>
                    {formData.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <p className="text-white/60 text-sm">
                          We&apos;ll also reach you at{" "}
                          <span className="text-white font-medium">{formData.phone}</span>
                        </p>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <p className="text-white/60 text-sm">
                        Calendar invite will follow once confirmed
                      </p>
                    </div>
                  </div>

                  <p className="text-white/30 text-xs mb-8 max-w-sm mx-auto">
                    We review every booking personally. You&apos;ll hear from us within
                    a few hours to confirm the video link.
                  </p>

                  <button
                    onClick={handleReset}
                    className="text-white/30 hover:text-emerald-400 transition-colors text-sm"
                  >
                    Book another call
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
