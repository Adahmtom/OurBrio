# OurBrio Website

A modern, animated tech agency website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

![OurBrio Preview](preview.png)

## ✨ Features

- **Animated Hero Section** - Floating geometric shapes with gradient effects (inspired by 21st.dev)
- **Adaptive Navbar** - Color-adapts based on scroll position and current section
- **Scroll Animations** - Smooth reveal animations on scroll using Framer Motion
- **Dark Mode First** - Professional dark theme with emerald green accents
- **Fully Responsive** - Optimized for all device sizes
- **SEO Optimized** - Meta tags, Open Graph, structured data ready
- **5 Complete Pages**:
  - Home
  - Services
  - About
  - Case Studies
  - Contact

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or download the project**

```bash
cd OurBrio
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
sitetact/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles & CSS variables
│   │   ├── layout.tsx           # Root layout with navbar/footer
│   │   ├── page.tsx             # Home page
│   │   ├── about/
│   │   │   └── page.tsx         # About page
│   │   ├── services/
│   │   │   └── page.tsx         # Services page
│   │   ├── case-studies/
│   │   │   └── page.tsx         # Case Studies page
│   │   └── contact/
│   │       └── page.tsx         # Contact page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Adaptive navigation
│   │   │   └── Footer.tsx       # Site footer
│   │   └── ui/
│   │       ├── button.tsx       # Button component
│   │       ├── button-colorful.tsx  # Gradient button
│   │       ├── shape-landing-hero.tsx  # Animated hero
│   │       ├── infinite-slider.tsx  # Logo slider
│   │       ├── testimonials-column.tsx  # Testimonial cards
│   │       ├── scroll-reveal.tsx  # Scroll animation wrapper
│   │       └── section.tsx      # Section wrapper
│   └── lib/
│       └── utils.ts             # Utility functions (cn)
├── public/                      # Static assets
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🎨 Customization

### Colors

The color scheme is defined in `src/app/globals.css`. The primary accent color is emerald green:

```css
.dark {
  --primary: 142 76% 46%;  /* Emerald green */
  --accent: 142 76% 46%;
}
```

To change the accent color, modify the HSL values for `--primary` and `--accent`.

### Content

- **Home Page**: Edit `src/app/page.tsx`
- **Services**: Edit `src/app/services/page.tsx`
- **About**: Edit `src/app/about/page.tsx`
- **Case Studies**: Edit `src/app/case-studies/page.tsx`
- **Contact**: Edit `src/app/contact/page.tsx`

### Logo

The logo is a text-based placeholder in `src/components/layout/Navbar.tsx`. Replace with your actual logo:

```tsx
<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-green-600">
  {/* Replace with <Image src="/logo.png" ... /> */}
</div>
```

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| next | React framework |
| react | UI library |
| framer-motion | Animations |
| motion | Additional motion utils |
| lucide-react | Icons |
| tailwind-merge | Tailwind class merging |
| clsx | Conditional classes |
| class-variance-authority | Component variants |
| @radix-ui/react-slot | Primitive components |
| react-use-measure | Element measurements |

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect your repository
4. Build command: `npm run build`
5. Publish directory: `.next`

### GitHub Pages

Not recommended for Next.js apps. Use Vercel or Netlify instead.

## 🔧 Next Steps (Phase 2-4)

### Phase 2: UI Polish
- [ ] Add more micro-interactions
- [ ] Implement page transitions
- [ ] Add loading states
- [ ] Custom 404 page

### Phase 3: Backend & Dashboard
- [ ] Set up database (Prisma + PostgreSQL)
- [ ] Create admin authentication
- [ ] Build dashboard for managing:
  - Services
  - Case Studies
  - Bookings/Inquiries
  - Email templates
- [ ] Integrate contact form with database

### Phase 4: SEO & Performance
- [ ] Add sitemap.xml
- [ ] Add robots.txt
- [ ] Implement structured data (JSON-LD)
- [ ] Optimize images
- [ ] Add analytics (Google Analytics / Plausible)
- [ ] Performance audit (Lighthouse)

## 📝 Environment Variables (For Phase 3+)

Create a `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# Email Service (future)
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASS=""
```

## 🤝 Support

For questions or issues, please open an issue on GitHub or contact [hello@sitetact.com](mailto:hello@sitetact.com).

## 📄 License

MIT License - feel free to use this for your own projects!

---

Built with ❤️ by SiteTact Tech Agency
