# Quick Setup Guide

## If you encounter disk space issues during npm install:

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

2. **Free up disk space on X: drive**

3. **Try installing again:**
   ```bash
   npm install
   ```

## Alternative: Install on a different drive

If X: drive has limited space, you can:

1. Move the project to a drive with more space (e.g., C: or D:)
2. Run npm install there
3. The project will work from any location

## Minimal Installation (if space is still an issue)

You can try installing dependencies one at a time:

```bash
npm install next@16.0.5 react@19.2.0 react-dom@19.2.0
npm install framer-motion
npm install @vercel/blob
npm install jspdf html2canvas
npm install react-icons
```

## Running the Development Server

Once installation is complete:

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Environment Setup

Before running, create a `.env.local` file:

```env
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here
CRON_SECRET=your_random_secret_here
```

Get your Vercel Blob token from: https://vercel.com/dashboard/stores

## Testing Without Vercel Blob (Local Development)

If you want to test locally without setting up Vercel Blob:

1. The app will still work, but image uploads will fail
2. You can skip the image upload and test the rest of the functionality
3. For production, you'll need to set up Vercel Blob storage

## Deployment

Deploy to Vercel for the best experience:

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The cron job for image cleanup will automatically work on Vercel.
