'use client';

import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function MinimalTemplate({ formData }) {
  return (
    <div className="bg-white text-gray-900 max-w-[850px] mx-auto p-16 min-h-[1100px]">
      {/* Minimal Header */}
      <div className="mb-12 pb-8 border-b border-gray-300">
        <h1 className="text-5xl font-light text-gray-900 mb-3 tracking-tight">
          {formData.fullName || 'Your Name'}
        </h1>
        <h2 className="text-xl font-normal text-gray-600 mb-6">
          {formData.jobTitle || 'Job Title'}
        </h2>
        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          {formData.email && (
            <div className="flex items-center gap-2">
              <FiMail size={14} />
              <span>{formData.email}</span>
            </div>
          )}
          {formData.phone && (
            <div className="flex items-center gap-2">
              <FiPhone size={14} />
              <span>{formData.phone}</span>
            </div>
          )}
          {formData.location && (
            <div className="flex items-center gap-2">
              <FiMapPin size={14} />
              <span>{formData.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {formData.summary && (
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-widest">
            Summary
          </h3>
          <p className="text-gray-700 leading-loose">{formData.summary}</p>
        </div>
      )}

      {/* Experience */}
      {formData.experience?.length > 0 && formData.experience[0].company && (
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-gray-900 mb-6 uppercase tracking-widest">
            Experience
          </h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-lg font-medium text-gray-900">{exp.position}</h4>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  {exp.duration}
                </span>
              </div>
              <p className="text-base text-gray-600 mb-2">{exp.company}</p>
              {exp.description && (
                <p className="text-gray-700 leading-loose">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {formData.education?.length > 0 && formData.education[0].school && (
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-gray-900 mb-6 uppercase tracking-widest">
            Education
          </h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-lg font-medium text-gray-900">{edu.degree}</h4>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  {edu.duration}
                </span>
              </div>
              <p className="text-base text-gray-600 mb-2">{edu.school}</p>
              {edu.description && (
                <p className="text-gray-700 leading-loose">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {formData.skills && (
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-widest">
            Skills
          </h3>
          <p className="text-gray-700 leading-loose">
            {formData.skills.split(',').map(s => s.trim()).join(' • ')}
          </p>
        </div>
      )}

      {formData.imageUrl && (
        <div className="mt-12 pt-8 border-t border-gray-300">
          <img
            src={formData.imageUrl}
            alt={formData.fullName}
            className="w-24 h-24 rounded-sm object-cover grayscale opacity-80"
          />
        </div>
      )}
    </div>
  );
}
