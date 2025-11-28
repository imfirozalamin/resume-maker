'use client';

import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function MinimalTemplate({ formData }) {
  return (
    <div className="bg-white text-gray-900 w-full p-8 min-h-[297mm]">
      {/* Minimal Header */}
      <div className="mb-10 pb-6 border-b border-gray-300">
        <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
          {formData.fullName || 'Your Name'}
        </h1>
        <h2 className="text-lg font-normal text-gray-600 mb-4">
          {formData.jobTitle || 'Job Title'}
        </h2>
        <div className="flex flex-wrap gap-4 text-xs text-gray-600">
          {formData.email && (
            <div className="flex items-center gap-1.5">
              <FiMail size={12} />
              <span>{formData.email}</span>
            </div>
          )}
          {formData.phone && (
            <div className="flex items-center gap-1.5">
              <FiPhone size={12} />
              <span>{formData.phone}</span>
            </div>
          )}
          {formData.location && (
            <div className="flex items-center gap-1.5">
              <FiMapPin size={12} />
              <span>{formData.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {formData.summary && (
        <div className="mb-10">
          <h3 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-widest">
            Summary
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">{formData.summary}</p>
        </div>
      )}

      {/* Experience */}
      {formData.experience?.length > 0 && formData.experience[0].company && (
        <div className="mb-10">
          <h3 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-widest">
            Experience
          </h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <h4 className="text-base font-medium text-gray-900">{exp.position}</h4>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  {exp.duration}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{exp.company}</p>
              {exp.description && (
                <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {formData.education?.length > 0 && formData.education[0].school && (
        <div className="mb-10">
          <h3 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-widest">
            Education
          </h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <h4 className="text-base font-medium text-gray-900">{edu.degree}</h4>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  {edu.duration}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{edu.school}</p>
              {edu.description && (
                <p className="text-sm text-gray-700 leading-relaxed">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {formData.skills && (
        <div className="mb-10">
          <h3 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-widest">
            Skills
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {formData.skills.split(',').map(s => s.trim()).join(' • ')}
          </p>
        </div>
      )}

      {formData.imageUrl && (
        <div className="mt-8 pt-6 border-t border-gray-300">
          <img
            src={formData.imageUrl}
            alt={formData.fullName}
            className="w-20 h-20 rounded-sm object-cover grayscale opacity-80"
          />
        </div>
      )}
    </div>
  );
}
