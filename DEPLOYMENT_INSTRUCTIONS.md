# VeloxPay Landing Page - Deployment Instructions

The landing page is **production-ready**. Follow these steps to deploy:

## Option 1: Deploy to Vercel (Recommended) ⭐

1. **Install Vercel CLI locally:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from your local machine:**
   ```bash
   cd /root/velo
   vercel --prod
   ```

4. **Get your URL** - Vercel will display your live URL in the terminal

---

## Option 2: Deploy to Netlify

1. **Install Netlify CLI locally:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Build and deploy:**
   ```bash
   cd /root/velo
   npm run build
   netlify deploy --prod --dir=.next
   ```

---

## Option 3: Deploy via Git + GitHub

1. **Create a GitHub repository:**
   - Go to github.com/new
   - Create a public repo named `veloxpay`

2. **Connect and push:**
   ```bash
   cd /root/velo
   git remote add origin https://github.com/YOUR_USERNAME/veloxpay.git
   git branch -M main
   git push -u origin main
   ```

3. **Connect to Vercel/Netlify:**
   - Go to vercel.com or netlify.com
   - Click "Import from Git"
   - Select your GitHub repo
   - Deploy!

---

## Option 4: Docker Deployment

The project is a standard Next.js app. Deploy the `.next` folder after building:

```bash
npm install
npm run build
# Deploy the .next folder to any Node.js host
```

---

## Customization Before Deployment

Edit these files before deploying:

- **Company Name:** `app/layout.tsx` (line 16)
- **Colors:** `app/globals.css` (lines 3-8)
- **Copy:** Edit any component in `app/components/`

---

## Production Checklist

- ✅ All 10 components built
- ✅ Responsive design tested
- ✅ TypeScript compiled
- ✅ Animations smooth
- ✅ Forms working
- ✅ No console errors
- ✅ SEO metadata added

**Ready to deploy!**
