# VeloxPay Landing Page - Setup Guide

## Quick Start

### 1. Project Setup ✅
The project is already initialized with Next.js, TypeScript, and Tailwind CSS.

```bash
cd /root/velo
```

### 2. Install Dependencies
All dependencies are configured in `package.json`. The project includes:
- ✅ Next.js 16.2.4
- ✅ React 19.2.4
- ✅ Tailwind CSS 4
- ✅ TypeScript 5
- ✅ Lucide React (for icons)

```bash
# Install all dependencies
npm install
```

### 3. Run Development Server

```bash
# Start the development server on http://localhost:3000
npm run dev
```

### 4. Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📂 Project Structure

```
/root/velo/
├── app/
│   ├── components/           # All landing page sections
│   │   ├── hero.tsx
│   │   ├── trust-strip.tsx
│   │   ├── features.tsx
│   │   ├── how-it-works.tsx
│   │   ├── developer.tsx
│   │   ├── use-cases.tsx
│   │   ├── pricing.tsx
│   │   ├── waitlist-cta.tsx
│   │   ├── waitlist-form.tsx
│   │   └── footer.tsx
│   ├── page.tsx              # Main landing page
│   ├── layout.tsx            # Root layout wrapper
│   ├── globals.css           # Global styles
│   └── favicon.ico
├── public/                   # Static assets
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind configuration
└── next.config.ts            # Next.js configuration
```

## 🎨 Landing Page Sections

The landing page is fully component-based with the following sections:

| Section | File | Purpose |
|---------|------|---------|
| Hero | `hero.tsx` | Main value proposition with CTA |
| Trust Strip | `trust-strip.tsx` | Key features display |
| Features | `features.tsx` | 6 feature cards |
| How It Works | `how-it-works.tsx` | 3-step onboarding |
| Developer | `developer.tsx` | API code example |
| Use Cases | `use-cases.tsx` | 6 use case examples |
| Pricing | `pricing.tsx` | Pricing information |
| Waitlist CTA | `waitlist-cta.tsx` | Final call-to-action |
| Waitlist Form | `waitlist-form.tsx` | Email capture modal |
| Footer | `footer.tsx` | Navigation links & info |

## 🎯 Key Features

✅ **Fully Responsive** - Mobile-first design
✅ **Dark Theme** - Modern fintech aesthetic
✅ **Interactive Modal** - Waitlist form with validation
✅ **Code Snippet** - Developer-friendly example with copy button
✅ **Smooth Animations** - Subtle gradients and transitions
✅ **Accessible** - Semantic HTML and keyboard navigation
✅ **TypeScript** - Full type safety
✅ **No External APIs** - All content is self-contained

## 🎨 Design System

### Colors
```
Primary Background: #0f1629 (Dark Navy)
Secondary Background: #1a2847 (Deep Blue)
Primary Accent: #22c55e (Green)
Secondary Accent: #06b6d4 (Cyan)
Text: #ffffff (White)
```

### Components Used
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - 50+ icons used throughout
- **Next.js** - React framework with optimizations

## 📝 Customization Guide

### Change Company Branding

1. **Search & Replace "VeloxPay"** in all components:
   ```bash
   grep -r "VeloxPay" app/
   ```

2. **Update Colors** - Modify Tailwind classes:
   ```tsx
   // Change from green/cyan to your brand colors
   from-cyan-400 to-green-400  → your-color-400
   ```

3. **Update Copy** - Edit text in each component:
   - Hero headline
   - Feature descriptions
   - Footer links

### Add New Sections

Create a new component in `app/components/`:

```tsx
'use client';

export default function NewSection() {
  return (
    <section className="w-full bg-[#0f1629] py-20">
      {/* Your content */}
    </section>
  );
}
```

Then import and add to `page.tsx`:

```tsx
import NewSection from './components/new-section';

export default function Home() {
  return (
    <main>
      {/* ... other sections ... */}
      <NewSection />
    </main>
  );
}
```

### Integrate Waitlist Backend

The waitlist form currently shows a success message. To integrate with a real backend:

**In `waitlist-form.tsx`, replace the setTimeout:**

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) throw new Error('Submission failed');
    
    setSubmitted(true);
  } catch (error) {
    console.error('Error:', error);
    // Handle error state
  } finally {
    setIsLoading(false);
  }
};
```

**Create `/app/api/waitlist/route.ts`:**

```typescript
export async function POST(request: Request) {
  const { email } = await request.json();
  
  // Add your backend logic here
  // e.g., save to database, send to email service
  
  return Response.json({ success: true });
}
```

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Deploy to Vercel
# Connect your GitHub repo at vercel.com
```

### Docker
```bash
# Create Dockerfile and deploy
docker build -t veloxpay .
docker run -p 3000:3000 veloxpay
```

### Traditional Server
```bash
npm install
npm run build
npm start
```

## 📊 Performance Optimizations

- ✅ Image optimization with Next.js
- ✅ CSS tree-shaking with Tailwind
- ✅ SVG icons (no image files)
- ✅ Code splitting automatic
- ✅ Static site generation ready

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Tailwind styles not applying
```bash
# Clear cache and rebuild
rm -rf .next
npm run dev
```

### TypeScript errors
```bash
# Check configuration
npx tsc --noEmit
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [React Documentation](https://react.dev)

## ✨ Next Steps

1. ✅ Review the landing page sections
2. ✅ Customize copy and branding
3. ✅ Update colors to match brand
4. ✅ Add backend integration for waitlist
5. ✅ Deploy to production

---

**Happy Building! 🚀**

For questions or issues, refer to the component files - each is well-commented and easy to modify.
