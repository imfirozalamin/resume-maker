const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const templates = ['modern', 'professional', 'creative', 'minimal', 'executive'];

async function generatePreviewPDFs() {
  console.log('Starting PDF generation...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (const template of templates) {
      console.log(`Generating preview for ${template} template...`);
      
      const page = await browser.newPage();
      
      // Set viewport to A4 size
      await page.setViewport({
        width: 794,  // A4 width in pixels at 96 DPI
        height: 1123, // A4 height in pixels at 96 DPI
        deviceScaleFactor: 2,
      });

      // Navigate to the demo page with the specific template
      const url = `http://localhost:3000?template=${template}&mode=print`;
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Wait for content to load
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate PDF
      const pdfPath = path.join(__dirname, '..', 'public', 'previews', `${template}.pdf`);
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      });

      console.log(`✓ Generated ${template}.pdf`);
      
      await page.close();
    }

    console.log('\n✓ All preview PDFs generated successfully!');
    console.log('PDFs saved to: public/previews/');
    
  } catch (error) {
    console.error('Error generating PDFs:', error);
  } finally {
    await browser.close();
  }
}

// Ensure previews directory exists
const previewsDir = path.join(__dirname, '..', 'public', 'previews');
if (!fs.existsSync(previewsDir)) {
  fs.mkdirSync(previewsDir, { recursive: true });
}

generatePreviewPDFs();
