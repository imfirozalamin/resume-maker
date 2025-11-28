'use client';

import { motion } from 'framer-motion';
import { FiCheck, FiEye } from 'react-icons/fi';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with bold headers',
    color: '#667eea',
    thumbnail: '/templates/modern.svg',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional corporate style with elegant layout',
    color: '#764ba2',
    thumbnail: '/templates/professional.svg',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and artistic with vibrant colors',
    color: '#4facfe',
    thumbnail: '/templates/creative.svg',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and clean with maximum readability',
    color: '#43e97b',
    thumbnail: '/templates/minimal.svg',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Premium design for senior positions',
    color: '#f5576c',
    thumbnail: '/templates/executive.svg',
  },
];

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-center mb-8">Choose a Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-[1400px] mx-auto px-4">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-dark-card/80 backdrop-blur-lg border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-glow hover:-translate-y-1 ${
              selectedTemplate === template.id
                ? 'border-primary shadow-glow'
                : 'border-white/10'
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            {selectedTemplate === template.id && (
              <div className="absolute top-3 right-3 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center z-10 shadow-md">
                <FiCheck />
              </div>
            )}
            
            <div 
              className="h-64 flex items-center justify-center p-0 relative overflow-hidden bg-gray-200"
            >
              <iframe 
                src={`/previews/${template.id}.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                className="w-[calc(100%+20px)] h-[100%] absolute top-0 left-0 border-none pointer-events-none" 
                title={`${template.name} Preview`}
                scrolling="no"
              />
              <div className="absolute inset-0 bg-transparent z-10"></div>
            </div>
            
            <div className="p-4 bg-dark-tertiary">
              <h3 className="text-lg font-semibold mb-1 text-white">
                {template.name}
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                {template.description}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`/previews/${template.id}.pdf`, '_blank');
                }}
                className="w-full py-2 px-3 bg-dark-card border border-white/10 text-white rounded-lg text-sm transition-all duration-200 hover:bg-primary hover:border-primary flex items-center justify-center gap-2"
              >
                <FiEye size={16} />
                View Demo
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
