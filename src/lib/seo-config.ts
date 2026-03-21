// SEO Configuration for OurBrio
// Update these values with your actual information

export const siteConfig = {
    name: "OurBrio",
    description: "We design, build, and automate digital systems that help brands stand out and scale. Strategic design, development, and automation solutions tailored to your business objectives.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://ourbrio.com",
    ogImage: "/og-image.jpg",
    links: {
      twitter: "https://twitter.com/ourbrio",
      linkedin: "https://linkedin.com/company/ourbrio",
      github: "https://github.com/ourbrio",
    },
    creator: "OurBrio",
    keywords: [
      "web development",
      "web design",
      "mobile app development",
      "digital agency",
      "SEO optimization",
      "marketing automation",
      "branding",
      "UI/UX design",
      "Next.js development",
      "React development",
      "full-stack development",
      "custom software",
      "business automation",
      "digital transformation",
    ],
  };
  
  // Page-specific SEO data
  export const pageSEO = {
    home: {
      title: "OurBrio | Digital Solutions Built to Perform",
      description: "We design, build, and automate digital systems that help brands stand out and scale. Strategic design, development, and automation solutions.",
    },
    about: {
      title: "About Us | OurBrio",
      description: "Learn about OurBrio - a team of passionate developers, designers, and strategists dedicated to creating exceptional digital experiences.",
    },
    services: {
      title: "Our Services | OurBrio",
      description: "Web development, mobile apps, marketing automation, SEO optimization, and more. Discover how we can help transform your digital presence.",
    },
    caseStudies: {
      title: "Case Studies | OurBrio",
      description: "Explore our portfolio of successful projects. See how we've helped businesses achieve their digital goals with measurable results.",
    },
    contact: {
      title: "Contact Us | OurBrio",
      description: "Ready to start your project? Get in touch with our team. We'd love to hear about your ideas and discuss how we can help.",
    },
    startProject: {
      title: "Start a Project | OurBrio",
      description: "Tell us about your project and schedule a free consultation. Let's discuss how we can bring your vision to life.",
    },
  };
  
  // Structured data for organization
  export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OurBrio",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://ourbrio.com",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://ourbrio.com"}/logo.svg`,
    description: "Digital agency specializing in web development, mobile apps, and marketing automation.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Remote",
      addressCountry: "Global",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-234-567-890",
      contactType: "sales",
      email: "OurBrio@gmail.com",
    },
    sameAs: [
      "https://twitter.com/ourbrio",
      "https://linkedin.com/company/ourbrio",
      "https://github.com/ourbrio",
    ],
  };
  
  // Structured data for services
  export const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Digital Agency Services",
    provider: {
      "@type": "Organization",
      name: "OurBrio",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Design & Development",
            description: "Custom websites and web applications built with modern technologies.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            description: "Native and cross-platform mobile applications for iOS and Android.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Marketing Automation",
            description: "Automated workflows, funnels, and integrations to scale your marketing.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO Optimization",
            description: "Search engine optimization to improve visibility and organic traffic.",
          },
        },
      ],
    },
  };
  