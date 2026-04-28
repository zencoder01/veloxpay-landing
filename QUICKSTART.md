# VeloxPay Landing Page - Quick Start Guide

## 🚀 Start in 30 Seconds

### 1. Install Dependencies
```bash
cd /root/velo
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Browser
```
http://localhost:3000
```

**Done! 🎉**

---

## 📝 What You'll See

A beautiful, fully responsive landing page with:
- ✅ Hero section with CTA buttons
- ✅ Trust indicators strip
- ✅ 6 feature cards
- ✅ 3-step how it works
- ✅ Developer code snippet
- ✅ 6 use cases
- ✅ Pricing section
- ✅ Waitlist modal form
- ✅ Professional footer

## 🎨 Quick Customizations

### Change Company Name
Search and replace `VeloxPay` in:
```bash
grep -r "VeloxPay" app/
```

### Change Colors
Edit Tailwind classes. Example:
```tsx
// In any component
from-green-400 to-cyan-400  // Primary colors
bg-[#0f1629]                // Dark background
```

### Change Copy
Edit text in each component:
- `app/components/hero.tsx` - Main headline
- `app/components/features.tsx` - Feature descriptions
- `app/components/footer.tsx` - Links and info

## 🏗️ Project Structure

```
app/components/
├── hero.tsx              ← Main hero section
├── trust-strip.tsx       ← Trust indicators
├── features.tsx          ← Feature cards (edit here)
├── how-it-works.tsx      ← Process steps
├── developer.tsx         ← Code snippet
├── use-cases.tsx         ← Use cases
├── pricing.tsx           ← Pricing info
├── waitlist-cta.tsx      ← Final CTA
├── waitlist-form.tsx     ← Email form modal
└── footer.tsx            ← Footer links
```

## 🔗 Key Interactions

| Action | Location |
|--------|----------|
| Waitlist Button | Hero (top) |
| Copy Code | Developer section |
| Form Submit | Modal (any button) |
| Success Message | Form closes after 3s |

## 📱 Test Responsiveness

Open browser DevTools (F12) and test:
- Mobile: 375px wide
- Tablet: 768px wide
- Desktop: 1920px wide

## 📦 Build for Production

```bash
npm run build
npm start
```

The site will be optimized and ready to deploy!

## 🚢 Deploy Instantly (Vercel)

```bash
# 1. Push to GitHub
git push origin main

# 2. Visit vercel.com and connect your repo
# Done! Gets a production URL automatically
```

## 📚 Full Documentation

For more details, see:
- `SETUP_GUIDE.md` - Full setup instructions
- `LANDING_PAGE.md` - Design details
- `PROJECT_SUMMARY.md` - Complete overview
- `DEPLOYMENT_CHECKLIST.md` - Pre-launch checklist

## 🎯 Common Tasks

### Edit Hero Headline
```tsx
// In app/components/hero.tsx
"Payments built for{' '}"
<span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
  Zambian startups
</span>
```

### Add New Feature
```tsx
// In app/components/features.tsx
{
  icon: SomeIcon,
  title: 'Feature Title',
  description: 'Feature description here.',
}
```

### Change Primary Color
```bash
# Replace all green accents with your color
sed -i 's/green-400/blue-400/g' app/components/*.tsx
sed -i 's/green-500/blue-500/g' app/components/*.tsx
```

## ✨ Next Steps

1. ✅ Run the project locally
2. 📝 Customize copy and colors
3. 🧪 Test on mobile devices
4. 🚀 Deploy to production
5. 📊 Set up analytics

## 💡 Pro Tips

- Use `npm run lint` to check code quality
- Use browser DevTools to inspect styles
- Modify Tailwind theme in `tailwind.config.ts` for consistent changes
- All components are self-contained - easy to modify individually

## 🆘 Need Help?

- Check component comments for guidance
- Review component props and structure
- See `SETUP_GUIDE.md` for detailed instructions
- All code is TypeScript with IntelliSense support

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [React Documentation](https://react.dev)

---

**Happy Building! 🚀**

Estimated time to customize: **1-2 hours**
Estimated time to deploy: **5 minutes**

That's it! You now have a production-ready landing page.
