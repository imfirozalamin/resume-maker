# Resume Maker 📄

A modern, responsive resume builder application built with Next.js, featuring beautiful UI animations with Framer Motion, image upload to Vercel Blob storage, and PDF export functionality.

## ✨ Features

- 🎨 **Modern UI Design** - Beautiful dark theme with gradients and glassmorphism effects
- 📱 **Fully Responsive** - Works seamlessly on desktop and mobile devices
- 🎭 **Multiple Templates** - Choose from different professional resume templates
- 🖼️ **Image Upload** - Upload profile photos with Vercel Blob storage
- 📥 **PDF Export** - Download your resume as a high-quality PDF
- ⚡ **Smooth Animations** - Powered by Framer Motion for delightful interactions
- 🔄 **Auto-cleanup** - Images are automatically deleted after 8 hours (requires cron job setup)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Vercel account (for Blob storage)

### Installation

1. **Clone or navigate to the project directory**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here
   ```

   To get your Vercel Blob token:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to Storage → Blob
   - Create a new Blob store or use an existing one
   - Copy the `BLOB_READ_WRITE_TOKEN`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript (JSX)
- **Styling**: CSS Modules with CSS Variables
- **Animations**: Framer Motion
- **Icons**: React Icons
- **PDF Generation**: jsPDF + html2canvas
- **Image Storage**: Vercel Blob
- **Fonts**: Google Fonts (Inter, Outfit)

## 🎯 How to Use

1. **Choose a Template** - Select from Modern, Professional, or Creative templates
2. **Fill in Your Information** - Add personal details, work experience, education, and skills
3. **Upload Your Photo** - Optional profile picture upload
4. **Preview** - See how your resume looks in real-time
5. **Download** - Export your resume as a PDF

## 📁 Project Structure

```
resume-maker/
├── app/
│   ├── api/
│   │   └── upload/
│   │       └── route.js          # Image upload API endpoint
│   ├── globals.css               # Global styles and design system
│   ├── layout.js                 # Root layout
│   └── page.js                   # Main page component
├── components/
│   ├── ResumeForm.jsx            # Form for user input
│   ├── ResumePreview.jsx         # Resume preview component
│   └── TemplateSelector.jsx      # Template selection component
├── public/                       # Static assets
└── package.json
```

## 🎨 Design System

The app uses a comprehensive design system with:
- Custom CSS variables for colors, spacing, and typography
- Dark theme with vibrant gradients
- Glassmorphism effects
- Smooth transitions and animations
- Responsive breakpoints

## 🔧 Configuration

### Image Auto-Deletion (8 hours)

To implement automatic image deletion after 8 hours, you'll need to:

1. Create a cron job API route (e.g., `/api/cleanup`)
2. Set up Vercel Cron Jobs in `vercel.json`:
   ```json
   {
     "crons": [{
       "path": "/api/cleanup",
       "schedule": "0 */1 * * *"
     }]
   }
   ```
3. Implement cleanup logic to delete blobs older than 8 hours

### Customization

- **Colors**: Edit CSS variables in `app/globals.css`
- **Templates**: Add new templates in `components/TemplateSelector.jsx`
- **Resume Layout**: Modify `components/ResumePreview.jsx`

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token | Yes |

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The app is optimized for Vercel deployment with Edge Runtime support.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from modern web applications
- Icons by React Icons
- Fonts by Google Fonts

---

Built with ❤️ using Next.js and Framer Motion
