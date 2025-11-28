'use client';

import { motion } from 'framer-motion';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';

export default function ResumePreview({ formData, previewRef, selectedTemplate }) {
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate formData={formData} />;
      case 'professional':
        return <ProfessionalTemplate formData={formData} />;
      case 'creative':
        return <CreativeTemplate formData={formData} />;
      case 'minimal':
        return <MinimalTemplate formData={formData} />;
      case 'executive':
        return <ExecutiveTemplate formData={formData} />;
      default:
        return <ModernTemplate formData={formData} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full overflow-y-auto p-4"
    >
      <div ref={previewRef} className="shadow-2xl rounded-lg overflow-hidden" id="resume-content">
        {renderTemplate()}
      </div>
    </motion.div>
  );
}
