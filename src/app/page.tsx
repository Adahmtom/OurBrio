"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { TestimonialsColumn, Testimonial } from "@/components/ui/testimonials-column";
import { GlowingFeatureSection } from "@/components/ui/glowing-card";
import { TiltCard } from "@/components/ui/tilt-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TypingAnimation, CountUp } from "@/components/ui/typing-animation";
import { EnhancedCTA, GlowingCTA } from "@/components/ui/enhanced-cta";
import { AnimatedBorderCard, SectionShadow } from "@/components/ui/animated-border-card";
import { ContactFormSection } from "@/components/ui/contact-form-section";

const crmPlatforms = [
  { name: "HubSpot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hubspot/hubspot-original.svg" },
  { name: "Salesforce", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/salesforce/salesforce-original.svg" },
  { name: "Mailchimp", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mailchimp/mailchimp-original.svg" },
  { name: "Zapier", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zapier/zapier-original.svg" },
  { name: "Slack", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg" },
  { name: "Notion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
];

const services = [
  { title: "Web Design & Development", description: "Responsive websites that deliver consistent performance and stunning visuals across all devices.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" },
  { title: "Mobile App Development", description: "Intuitive mobile applications with enterprise-level performance and security standards.", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop" },
  { title: "Marketing Automation", description: "Funnels and workflows that run on autopilot to drive sustainable growth.", image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&h=400&fit=crop" },
  { title: "Platform Integrations", description: "Connect your tools into a unified ecosystem for seamless data flow.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop" },
  { title: "SEO Optimization", description: "Strategic optimization for sustainable visibility and qualified traffic.", image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=600&h=400&fit=crop" },
  { title: "Maintenance & Support", description: "Ongoing optimization to keep your systems secure and performant.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop" },
];

const processSteps = [
  { step: "01", title: "Discovery & Strategy", description: "We analyze your goals, audience, and systems to define a clear roadmap that sets the foundation for success.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop" },
  { step: "02", title: "Design & Planning", description: "User-centered UX/UI design and technical planning aligned with your brand identity and business objectives.", image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500&h=350&fit=crop" },
  { step: "03", title: "Development & Integration", description: "Building scalable systems, automations, and integrations using cutting-edge technologies.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=350&fit=crop" },
  { step: "04", title: "Testing & Optimization", description: "Rigorous testing to ensure performance, usability, and reliability before launch.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=350&fit=crop" },
  { step: "05", title: "Launch & Support", description: "Deployment, monitoring, and ongoing optimization to ensure long-term success.", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=350&fit=crop" },
];

const testimonials: Testimonial[] = [
  { text: "OurBrio transformed our digital presence. Their strategic approach delivered results beyond our expectations.", image: "https://randomuser.me/api/portraits/women/1.jpg", name: "Sarah Chen", role: "CEO, TechStart Inc" },
  { text: "The automation systems they built have saved us countless hours. Highly recommend for any business looking to scale.", image: "https://randomuser.me/api/portraits/men/2.jpg", name: "Michael Torres", role: "Operations Director" },
  { text: "Professional, responsive, and incredibly skilled. OurBrio understood our vision and brought it to life perfectly.", image: "https://randomuser.me/api/portraits/women/3.jpg", name: "Emily Watson", role: "Marketing Manager" },
  { text: "Our mobile app launch was flawless thanks to the OurBrio team. Their attention to detail is unmatched.", image: "https://randomuser.me/api/portraits/men/4.jpg", name: "David Kim", role: "Product Manager" },
  { text: "The SEO improvements alone have doubled our organic traffic. A truly strategic partner for digital growth.", image: "https://randomuser.me/api/portraits/women/5.jpg", name: "Lisa Johnson", role: "E-commerce Director" },
  { text: "From concept to launch, OurBrio delivered excellence at every stage.", image: "https://randomuser.me/api/portraits/men/6.jpg", name: "James Wilson", role: "Founder" },
  { text: "The integration work connected all our systems seamlessly. Game-changer for operations.", image: "https://randomuser.me/api/portraits/women/7.jpg", name: "Amanda Lee", role: "CTO" },
  { text: "Exceptional communication and project management throughout.", image: "https://randomuser.me/api/portraits/men/8.jpg", name: "Robert Martinez", role: "VP Technology" },
  { text: "Our conversion rates increased by 150% since the redesign.", image: "https://randomuser.me/api/portraits/women/9.jpg", name: "Jennifer Brown", role: "Growth Manager" },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const caseStudies = [
  { title: "E-Commerce Platform Redesign", category: "Web Development", result: "+150% Conversions", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" },
  { title: "FinTech Mobile Application", category: "Mobile App", result: "50K+ Downloads", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop" },
  { title: "Marketing Automation System", category: "Automation", result: "3x Lead Generation", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section data-section="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-green-500/[0.05]" />
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-80 h-80 border border-emerald-500/20 rounded-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-60 h-60 border border-green-500/20 rounded-3xl"
          />
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 w-40 h-40 bg-emerald-500/10 rounded-3xl blur-xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-green-500/10 rounded-full blur-xl"
          />
        </div>

        {/* Hero content */}
        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-emerald-400 font-medium">OurBrio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="text-white">Digital Solutions</span>
            <br />
            <TypingAnimation
              words={["Built to Perform", "Built to Scale", "Built to Convert", "Built for You"]}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            We design, build, and automate digital systems that help brands stand out and scale. 
            No templates. No generic systems. Just solutions built for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton>
              <EnhancedCTA href="/services" variant="primary" size="xl">
                Explore Our Services
              </EnhancedCTA>
            </MagneticButton>
            <MagneticButton>
              <GlowingCTA href="/start-project">
                Start a Project
              </GlowingCTA>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <SectionShadow />

      {/* CRM Platforms Section */}
      <section data-section="platforms" className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Platforms & Tools We Work With</h2>
              <p className="text-white/50 text-lg">Seamless integrations with industry-leading CRM and marketing platforms</p>
            </div>
          </ScrollReveal>
          
          <InfiniteSlider gap={40} duration={20} className="py-8">
            {crmPlatforms.map((platform, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 relative">
                  <Image src={platform.logo} alt={platform.name} width={40} height={40} className="w-full h-full object-contain" />
                </div>
                <span className="text-white/80 font-semibold text-lg whitespace-nowrap">{platform.name}</span>
              </motion.div>
            ))}
          </InfiniteSlider>
        </div>
      </section>

      <SectionShadow />

      {/* About Section */}
      <section data-section="about" className="py-24 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 section-accent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-sm text-emerald-400 font-medium">About Us</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  We are a digital agency where <span className="gradient-text">strategy meets execution</span>
                </h2>
                <p className="text-white/60 text-xl leading-relaxed">
                  At OurBrio, we help brands transform ideas into functional digital systems. From websites and mobile apps to automations and integrations — everything we build is designed to grow with you.
                </p>
                <MagneticButton>
                  <EnhancedCTA href="/about" variant="primary" size="lg">
                    Learn More About Us
                  </EnhancedCTA>
                </MagneticButton>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right" delay={0.2}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: 96, suffix: "+", label: "Projects Delivered" },
                  { value: 30, suffix: "+", label: "Global Clients" },
                  { value: 17, suffix: "+", label: "Years Experience" },
                  { value: 100, suffix: "%", label: "Client Satisfaction" },
                ].map((stat, index) => (
                  <TiltCard key={index}>
                    <div className="p-8 rounded-2xl bg-black border border-white/10 hover:border-emerald-500/30 transition-colors">
                      <div className="text-5xl md:text-6xl font-bold text-emerald-400 mb-3 text-glow">
                        <CountUp end={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-white/50 text-lg">{stat.label}</div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionShadow />

      {/* Services Section */}
      <GlowingFeatureSection className="py-24 md:py-32 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <span className="text-sm text-emerald-400 font-medium">Our Services</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">What We Do</h2>
              <p className="text-white/60 text-xl">Solutions designed to simplify operations, improve user experience, and drive sustainable growth.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <AnimatedBorderCard>
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <Image src={service.image} alt={service.title} width={600} height={400} className="w-full h-56 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-white/60 text-lg leading-relaxed">{service.description}</p>
                  </div>
                </AnimatedBorderCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="text-center mt-16">
              <MagneticButton>
                <EnhancedCTA href="/services" variant="outline" size="xl">
                  View All Services
                </EnhancedCTA>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </GlowingFeatureSection>

      <SectionShadow />

      {/* Case Studies Section */}
      <section data-section="case-studies" className="py-24 md:py-32 bg-black relative">
        <div className="absolute inset-0 section-accent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <span className="text-sm text-emerald-400 font-medium">Case Studies</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Real Projects. Real Results.</h2>
              <p className="text-white/60 text-xl">See how we help brands solve problems and scale through smart digital solutions.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <AnimatedBorderCard>
                  <div className="group">
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <Image src={study.image} alt={study.title} width={600} height={400} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">{study.category}</span>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">{study.title}</h3>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-semibold text-lg">{study.result}</span>
                      </div>
                    </div>
                  </div>
                </AnimatedBorderCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="text-center mt-16">
              <MagneticButton>
                <EnhancedCTA href="/case-studies" variant="primary" size="xl">
                  View All Case Studies
                </EnhancedCTA>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionShadow />

      {/* Process Section */}
      <section data-section="process" className="py-24 md:py-32 bg-black relative">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <span className="text-sm text-emerald-400 font-medium">Our Process</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">From Idea to Execution</h2>
              <p className="text-white/60 text-xl">A structured, transparent approach to delivering exceptional results.</p>
            </div>
          </ScrollReveal>

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ x: 10 }}
                  className={`flex flex-col lg:flex-row items-center gap-12 p-8 rounded-3xl border border-white/5 hover:border-emerald-500/20 transition-all bg-white/[0.01] ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className="w-full lg:w-2/5">
                    <div className="relative rounded-2xl overflow-hidden">
                      <Image src={step.image} alt={step.title} width={500} height={350} className="w-full h-64 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <span className="absolute bottom-6 left-6 text-7xl font-bold text-emerald-500/40">{step.step}</span>
                    </div>
                  </div>
                  <div className="w-full lg:w-3/5 text-center lg:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-white/60 text-xl leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionShadow />

      {/* Testimonials Section */}
      <section data-section="testimonials" className="py-24 md:py-32 bg-black relative">
        <div className="absolute inset-0 section-accent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <span className="text-sm text-emerald-400 font-medium">Testimonials</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">What Our Clients Say</h2>
              <p className="text-white/60 text-xl">Trusted by brands worldwide for clarity, execution, and results.</p>
            </div>
          </ScrollReveal>

          <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[650px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
          </div>
        </div>
      </section>

      <SectionShadow />

      <ContactFormSection />
    </>
  );
}
