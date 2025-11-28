'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiEye, FiEdit3, FiX } from 'react-icons/fi';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import TemplateSelector from '@/components/TemplateSelector';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useSearchParams } from 'next/navigation';

const demoData = {
  fullName: 'Sarah Johnson',
  jobTitle: 'Senior Product Designer',
  email: 'sarah.johnson@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  summary: 'Creative and results-driven Product Designer with 8+ years of experience crafting user-centered digital experiences. Proven track record of leading design teams and delivering innovative solutions that drive business growth and user satisfaction.',
  imageUrl: '',
  experience: [
    {
      company: 'Tech Innovations Inc.',
      position: 'Senior Product Designer',
      duration: 'Jan 2020 - Present',
      description: 'Lead design initiatives for flagship products, managing a team of 5 designers. Increased user engagement by 45% through redesigned user flows and interface improvements.',
    },
    {
      company: 'Digital Solutions Co.',
      position: 'Product Designer',
      duration: 'Mar 2017 - Dec 2019',
      description: 'Designed and shipped 15+ features for mobile and web applications. Collaborated with cross-functional teams to deliver user-centric solutions.',
    },
  ],
  education: [
    {
      school: 'California Institute of Design',
      degree: 'Bachelor of Fine Arts in Graphic Design',
      duration: '2013 - 2017',
      description: 'Graduated with Honors. Focus on UX/UI Design and Human-Computer Interaction.',
    },
  ],
  skills: 'Figma, Adobe Creative Suite, Sketch, Prototyping, User Research, Wireframing, Design Systems, HTML/CSS, React',
};

export default function Home() {
  const searchParams = useSearchParams();
  const printMode = searchParams.get('mode') === 'print';
  const printTemplate = searchParams.get('template');

  const [step, setStep] = useState('template');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    imageUrl: '',
    experience: [
      {
        company: '',
        position: '',
        duration: '',
        description: '',
      },
    ],
    education: [
      {
        school: '',
        degree: '',
        duration: '',
        description: '',
      },
    ],
    skills: '',
  });

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    setIsGenerating(true);
    try {
      const element = previewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        'PNG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      pdf.save(`${formData.fullName || 'resume'}_resume.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'template':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-[1400px] mx-auto px-4"
          >
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
            />
            <div className="flex justify-center gap-6 mt-12 pb-12">
              <button
                onClick={() => setStep('form')}
                className="btn btn-primary"
                disabled={!selectedTemplate}
              >
                Continue to Form
              </button>
            </div>
          </motion.div>
        );

      case 'form':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto px-4"
          >
            <ResumeForm formData={formData} setFormData={setFormData} />
            <div className="flex justify-center gap-6 mt-12 pb-12 flex-wrap">
              <button onClick={() => setStep('template')} className="btn btn-secondary">
                Back
              </button>
              <button onClick={() => setStep('preview')} className="btn btn-primary">
                <FiEye />
                Preview Resume
              </button>
            </div>
          </motion.div>
        );

      case 'preview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-5xl mx-auto px-4"
          >
            <ResumePreview formData={formData} previewRef={previewRef} selectedTemplate={selectedTemplate} />
            <div className="flex justify-center gap-6 mt-12 pb-12 flex-wrap">
              <button onClick={() => setStep('form')} className="btn btn-secondary">
                <FiEdit3 />
                Edit
              </button>
              <button
                onClick={handleDownloadPDF}
                className="btn btn-primary"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <FiDownload />
                    Download PDF
                  </>
                )}
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (printMode && printTemplate) {
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
        <div style={{ 
          height: '100%'
        }}>
          <ResumePreview formData={demoData} previewRef={null} selectedTemplate={printTemplate} />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 px-4"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
          Create Your <span className="gradient-text">Perfect Resume</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Professional resume builder with modern templates and instant PDF download
        </p>
      </motion.div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center max-w-2xl mx-auto mb-12 px-4">
        <div className={`flex flex-col items-center gap-2 ${step === 'template' ? 'text-primary' : step !== 'template' ? 'text-success' : 'text-gray-500'}`}>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
            step === 'template' ? 'bg-gradient-primary text-white shadow-glow' : 
            step !== 'template' ? 'bg-success text-white' : 
            'bg-dark-tertiary border-2 border-white/10'
          }`}>
            1
          </div>
          <span className="text-sm font-medium">Template</span>
        </div>
        
        <div className="w-24 h-0.5 bg-white/10 mx-4"></div>
        
        <div className={`flex flex-col items-center gap-2 ${step === 'form' ? 'text-primary' : step === 'preview' ? 'text-success' : 'text-gray-500'}`}>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
            step === 'form' ? 'bg-gradient-primary text-white shadow-glow' : 
            step === 'preview' ? 'bg-success text-white' : 
            'bg-dark-tertiary border-2 border-white/10'
          }`}>
            2
          </div>
          <span className="text-sm font-medium">Information</span>
        </div>
        
        <div className="w-24 h-0.5 bg-white/10 mx-4"></div>
        
        <div className={`flex flex-col items-center gap-2 ${step === 'preview' ? 'text-primary' : 'text-gray-500'}`}>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
            step === 'preview' ? 'bg-gradient-primary text-white shadow-glow' : 
            'bg-dark-tertiary border-2 border-white/10'
          }`}>
            3
          </div>
          <span className="text-sm font-medium">Preview</span>
        </div>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </main>
  );
}
