"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Calendar,
  Clock,
  Building2,
  Target,
  Users,
  Globe,
  Smartphone,
  Zap,
  Search,
  Wrench,
  Palette,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EnhancedCTA } from "@/components/ui/enhanced-cta";

const services = [
  { id: "web", name: "Web Design & Development", icon: Globe, description: "Responsive websites and web applications" },
  { id: "mobile", name: "Mobile App Development", icon: Smartphone, description: "iOS and Android applications" },
  { id: "automation", name: "Marketing Automation", icon: Zap, description: "Funnels, workflows, and integrations" },
  { id: "seo", name: "SEO Optimization", icon: Search, description: "Search engine visibility and traffic" },
  { id: "maintenance", name: "Website Maintenance", icon: Wrench, description: "Ongoing support and updates" },
  { id: "branding", name: "Branding & Design", icon: Palette, description: "Visual identity and brand strategy" },
];

const budgetRanges = [
  { id: "5k", label: "Under $5,000", description: "Small projects, landing pages" },
  { id: "10k", label: "$5,000 - $10,000", description: "Standard websites, basic apps" },
  { id: "25k", label: "$10,000 - $25,000", description: "Complex projects, custom solutions" },
  { id: "50k", label: "$25,000 - $50,000", description: "Enterprise solutions" },
  { id: "50k+", label: "$50,000+", description: "Large-scale projects" },
  { id: "unsure", label: "Not sure yet", description: "Let's discuss" },
];

const timelines = [
  { id: "asap", label: "ASAP", description: "Within 2 weeks" },
  { id: "1month", label: "1 Month", description: "Flexible timeline" },
  { id: "2months", label: "2-3 Months", description: "Standard timeline" },
  { id: "6months", label: "3-6 Months", description: "Long-term project" },
  { id: "flexible", label: "Flexible", description: "No rush" },
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

interface FormData {
  // Step 1: About Business
  businessName: string;
  industry: string;
  businessDescription: string;
  targetAudience: string;
  currentWebsite: string;
  
  // Step 2: Services
  selectedServices: string[];
  
  // Step 3: Project Details
  projectGoals: string;
  competitors: string;
  inspirationSites: string;
  uniqueFeatures: string;
  
  // Step 4: Budget & Timeline
  budget: string;
  timeline: string;
  
  // Step 5: Schedule
  preferredDate: string;
  preferredTime: string;
  
  // Step 6: Contact
  contactName: string;
  email: string;
  phone: string;
  howDidYouHear: string;
  additionalNotes: string;
}

const initialFormData: FormData = {
  businessName: "",
  industry: "",
  businessDescription: "",
  targetAudience: "",
  currentWebsite: "",
  selectedServices: [],
  projectGoals: "",
  competitors: "",
  inspirationSites: "",
  uniqueFeatures: "",
  budget: "",
  timeline: "",
  preferredDate: "",
  preferredTime: "",
  contactName: "",
  email: "",
  phone: "",
  howDidYouHear: "",
  additionalNotes: "",
};

export default function StartProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const totalSteps = 6;

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleService = (serviceId: string) => {
    const current = formData.selectedServices;
    if (current.includes(serviceId)) {
      updateFormData("selectedServices", current.filter((id) => id !== serviceId));
    } else {
      updateFormData("selectedServices", [...current, serviceId]);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit");
      }
      
      setIsSubmitted(true);
    } catch (error) {
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate calendar dates for next 30 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  const availableDates = generateDates();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Tell Us About Your Business</h2>
              <p className="text-white/60">Help us understand your brand better</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Business/Brand Name *</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => updateFormData("businessName", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="Your Company Name"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Industry *</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => updateFormData("industry", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="e.g., Technology, Healthcare, E-commerce"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Describe Your Business *</label>
                <textarea
                  value={formData.businessDescription}
                  onChange={(e) => updateFormData("businessDescription", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                  placeholder="What does your business do? What products or services do you offer?"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Target Audience *</label>
                <textarea
                  value={formData.targetAudience}
                  onChange={(e) => updateFormData("targetAudience", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                  placeholder="Who are your ideal customers? Demographics, interests, pain points..."
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Current Website (if any)</label>
                <input
                  type="url"
                  value={formData.currentWebsite}
                  onChange={(e) => updateFormData("currentWebsite", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Target className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Select Services</h2>
              <p className="text-white/60">Choose all that apply to your project</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service) => {
                const isSelected = formData.selectedServices.includes(service.id);
                return (
                  <motion.button
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleService(service.id)}
                    className={cn(
                      "p-5 rounded-xl border text-left transition-all duration-300",
                      isSelected
                        ? "bg-emerald-500/10 border-emerald-500/50"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        isSelected ? "bg-emerald-500 text-black" : "bg-white/10 text-white/60"
                      )}>
                        <service.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{service.name}</h3>
                        <p className="text-white/50 text-sm">{service.description}</p>
                      </div>
                      {isSelected && (
                        <Check className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Project Details</h2>
              <p className="text-white/60">Help us understand your vision</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Project Goals *</label>
                <textarea
                  value={formData.projectGoals}
                  onChange={(e) => updateFormData("projectGoals", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                  placeholder="What do you want to achieve with this project? Increase sales, improve brand awareness, streamline operations..."
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Main Competitors</label>
                <textarea
                  value={formData.competitors}
                  onChange={(e) => updateFormData("competitors", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                  placeholder="List your main competitors and what you like/dislike about their digital presence"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Inspiration Websites</label>
                <textarea
                  value={formData.inspirationSites}
                  onChange={(e) => updateFormData("inspirationSites", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                  placeholder="Share URLs of websites you admire and what you like about them"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Unique Features or Requirements</label>
                <textarea
                  value={formData.uniqueFeatures}
                  onChange={(e) => updateFormData("uniqueFeatures", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                  placeholder="Any specific features, integrations, or technical requirements?"
                />
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Target className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Budget & Timeline</h2>
              <p className="text-white/60">Help us plan your project effectively</p>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-4">Budget Range *</label>
              <div className="grid md:grid-cols-2 gap-3">
                {budgetRanges.map((range) => (
                  <motion.button
                    key={range.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateFormData("budget", range.id)}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all duration-300",
                      formData.budget === range.id
                        ? "bg-emerald-500/10 border-emerald-500/50"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    )}
                  >
                    <h3 className="font-semibold text-white">{range.label}</h3>
                    <p className="text-white/50 text-sm">{range.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-4">Preferred Timeline *</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {timelines.map((timeline) => (
                  <motion.button
                    key={timeline.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateFormData("timeline", timeline.id)}
                    className={cn(
                      "p-4 rounded-xl border text-center transition-all duration-300",
                      formData.timeline === timeline.id
                        ? "bg-emerald-500/10 border-emerald-500/50"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    )}
                  >
                    <h3 className="font-semibold text-white text-sm">{timeline.label}</h3>
                    <p className="text-white/50 text-xs mt-1">{timeline.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Schedule a Consultation</h2>
              <p className="text-white/60">Pick a date and time that works for you</p>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-4">Select Date *</label>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2 max-h-[300px] overflow-y-auto p-1">
                {availableDates.map((date) => {
                  const dateStr = date.toISOString().split("T")[0];
                  const isSelected = formData.preferredDate === dateStr;
                  return (
                    <motion.button
                      key={dateStr}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateFormData("preferredDate", dateStr)}
                      className={cn(
                        "p-3 rounded-lg border text-center transition-all duration-300",
                        isSelected
                          ? "bg-emerald-500 border-emerald-500 text-black"
                          : "bg-white/5 border-white/10 hover:border-white/20 text-white"
                      )}
                    >
                      <div className="text-xs opacity-60">
                        {date.toLocaleDateString("en-US", { weekday: "short" })}
                      </div>
                      <div className="font-semibold">{date.getDate()}</div>
                      <div className="text-xs opacity-60">
                        {date.toLocaleDateString("en-US", { month: "short" })}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-4">Select Time *</label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {timeSlots.map((time) => (
                  <motion.button
                    key={time}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateFormData("preferredTime", time)}
                    className={cn(
                      "p-3 rounded-lg border text-center transition-all duration-300 flex items-center justify-center gap-2",
                      formData.preferredTime === time
                        ? "bg-emerald-500 border-emerald-500 text-black"
                        : "bg-white/5 border-white/10 hover:border-white/20 text-white"
                    )}
                  >
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{time}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            key="step6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Send className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Contact Information</h2>
              <p className="text-white/60">How can we reach you?</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Your Name *</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => updateFormData("contactName", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
                    placeholder="+1 (234) 567-890"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">How Did You Hear About Us?</label>
                <select
                  value={formData.howDidYouHear}
                  onChange={(e) => updateFormData("howDidYouHear", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-black">Select an option</option>
                  <option value="google" className="bg-black">Google Search</option>
                  <option value="social" className="bg-black">Social Media</option>
                  <option value="referral" className="bg-black">Referral</option>
                  <option value="linkedin" className="bg-black">LinkedIn</option>
                  <option value="other" className="bg-black">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Additional Notes</label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => updateFormData("additionalNotes", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                  placeholder="Anything else you'd like us to know before our meeting?"
                />
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-emerald-500/20 flex items-center justify-center"
          >
            <Check className="w-12 h-12 text-emerald-400" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Thank You!</h1>
          <p className="text-white/60 text-lg mb-8">
            Your project inquiry has been submitted. We&apos;ll review your details and confirm your consultation within 24 hours.
          </p>
          <p className="text-emerald-400 font-medium mb-8">
            Scheduled: {formData.preferredDate && new Date(formData.preferredDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {formData.preferredTime}
          </p>
          <EnhancedCTA href="/" variant="primary" size="lg">
            Back to Home
          </EnhancedCTA>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60 text-sm">Step {currentStep} of {totalSteps}</span>
            <span className="text-emerald-400 text-sm font-medium">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={prevStep}
            disabled={currentStep === 1}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
              currentStep === 1
                ? "opacity-50 cursor-not-allowed text-white/40"
                : "text-white hover:bg-white/10"
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </motion.button>

          {currentStep < totalSteps ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-3 rounded-full font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition-colors"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 rounded-full font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                  />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Request
                  <Send className="w-4 h-4" />
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
