'use client';

import { useEffect, useState } from 'react';
import ResumePreview from './ResumePreview';

export default function PrintView({ template, isDemo, userData, demoData, isLoaded }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isDemo || isLoaded) {
      // Wait a moment for images and layout to stabilize
      const timer = setTimeout(() => {
        setReady(true);
        setTimeout(() => {
          window.print();
        }, 500);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isDemo, isLoaded]);

  const data = isDemo ? demoData : userData;

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-500 font-medium">
        Preparing your resume for printing...
      </div>
    );
  }

  return (
    <div style={{ 
      width: '210mm', 
      height: '297mm', 
      maxHeight: '297mm',
      background: 'white', 
      margin: 0, 
      padding: 0,
      overflow: 'hidden',
      position: 'relative'
    }}>
      <ResumePreview formData={data} previewRef={null} selectedTemplate={template} />
    </div>
  );
}
