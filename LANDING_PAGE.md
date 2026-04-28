# VeloxPay Landing Page

A modern, responsive landing page for VeloxPay - a fast, simple payment gateway built for Zambian startups.

## 🎨 Design Highlights

- **Modern Fintech Aesthetic**: Dark navy/deep blue palette with bright green and electric cyan accents
- **Mobile-First Responsive**: Optimized for all screen sizes
- **Smooth Animations**: Subtle gradients and transitions for a premium feel
- **Component-Based Architecture**: Clean, reusable React components
- **Fully Accessible**: Semantic HTML and keyboard navigation support

## 🛠 Tech Stack

- **Framework**: Next.js 15+ with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment Ready**: Optimized for Vercel or any Node.js host

## 📁 Project Structure

```
app/
├── components/
│   ├── hero.tsx              # Hero section with CTA
│   ├── trust-strip.tsx       # Trust indicators strip
│   ├── features.tsx          # 6-card features grid
│   ├── how-it-works.tsx      # 3-step onboarding process
│   ├── developer.tsx         # Developer-focused section with code
│   ├── use-cases.tsx         # 6 use case cards
│   ├── pricing.tsx           # Pricing teaser section
│   ├── waitlist-cta.tsx      # Final CTA section
│   ├── waitlist-form.tsx     # Modal email capture form
│   └── footer.tsx            # Footer with links
├── page.tsx                  # Main page component
├── layout.tsx                # Root layout
├── globals.css               # Global styles
└── favicon.ico              # Favicon
```

## 📋 Sections Included

1. **Hero Section**
   - Headline: "Payments built for Zambian startups"
   - Subheadline with value proposition
   - Primary CTA: "Join the waitlist"
   - Secondary CTA: "View docs"
   - Mock dashboard visual on desktop

2. **Trust Strip**
   - Mobile Money
   - Card Payments
   - Developer API
   - Fast Settlements
   - Built for Zambia

3. **Features** (6 cards)
   - Mobile money collections
   - Card payment acceptance
   - Simple API integration
   - Real-time payment status
   - Startup-friendly pricing
   - Secure transactions

4. **How It Works** (3 steps)
   - Create your VeloxPay account
   - Connect your business
   - Start collecting payments

5. **Developer Section**
   - Stripe-like code snippet display
   - Copy-to-clipboard functionality
   - Links to documentation

6. **Use Cases** (6 cards)
   - Online stores
   - SaaS platforms
   - Schools
   - Agencies
   - Event organizers
   - Subscription businesses

7. **Pricing Teaser**
   - Simple pricing messaging
   - Key benefits checklist
   - Call to action

8. **Final CTA**
   - Strong closing headline
   - Waitlist button

9. **Footer**
   - VeloxPay branding
   - Product, Company, and Developer links
   - Privacy & Terms
   - Copyright

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
# Navigate to http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Features

✅ **Fully Responsive** - Mobile, tablet, and desktop optimized
✅ **Dark Mode Ready** - Built for dark theme (can add light mode)
✅ **Smooth Scroll** - Scroll-behavior: smooth for better UX
✅ **Modal Waitlist Form** - Email capture with success state
✅ **Copy Code Snippet** - Interactive code block
✅ **Accessible** - Semantic HTML, proper contrast ratios
✅ **Fast Loading** - Optimized images and assets
✅ **SEO Friendly** - Proper metadata and structure

## 🎨 Color Palette

- **Background**: `#0f1629` (Dark Navy)
- **Secondary**: `#1a2847` (Deep Blue)
- **Primary Accent**: `#22c55e` / `#4ade80` (Green)
- **Secondary Accent**: `#06b6d4` / `#22d3ee` (Cyan)
- **Text**: `#ffffff` (White) / `#e5e7eb` (Light Gray)
- **Borders**: `#374151` (Gray-700)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🔧 Customization

### Update Colors
Edit the Tailwind color values in components:
```tsx
// Example in hero.tsx
from-cyan-400 to-green-400  // Change gradient colors
bg-[#0f1629]               // Change background
```

### Update Copy
All text is hardcoded in components. Search and replace:
- Company name: "VeloxPay"
- Tagline: "Payments built for Zambian startups"
- Features and benefits

### Add Backend Integration
The waitlist form currently shows a mock success state. To integrate with a backend:

1. Replace the setTimeout in `waitlist-form.tsx` with an API call
2. Add error handling for failed submissions
3. Consider using a service like Mailchimp or custom backend

## 📊 Performance Tips

- Images are lazy-loaded by Next.js Image component
- CSS is tree-shaken by Tailwind
- Icons from lucide-react are SVG-based (small)
- No external API calls on page load

## 🔐 Security

- All dependencies are from npm registry
- No sensitive data hardcoded
- Ready for environment variables
- CORS headers can be configured in Next.js

## 📄 License

This landing page is ready for production use. Customize with your brand colors and messaging.

## 🤝 Support

For questions about the design or implementation, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide React Icons](https://lucide.dev)

---

**Ready to deploy?** Push to GitHub and deploy to Vercel with one click.
