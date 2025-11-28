'use client';

import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function ModernTemplate({ formData }) {
  return (
    <div className="bg-white text-gray-900 max-w-[850px] mx-auto p-6">
      {/* Header with gradient */}
      <div className="flex gap-6 items-start mb-6 pb-6 border-b-4 border-primary">
        {formData.imageUrl && (
          <img
            src={formData.imageUrl}
            alt={formData.fullName}
            className="w-24 h-24 rounded-full object-cover border-4 border-primary flex-shrink-0"
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-1 leading-tight">
            {formData.fullName || 'Your Name'}
          </h1>
          <h2 className="text-xl font-semibold text-primary mb-3">
            {formData.jobTitle || 'Job Title'}
          </h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {formData.email && (
              <div className="flex items-center gap-1.5">
                <FiMail className="text-primary" />
                <span>{formData.email}</span>
              </div>
            )}
            {formData.phone && (
              <div className="flex items-center gap-1.5">
                <FiPhone className="text-primary" />
                <span>{formData.phone}</span>
              </div>
            )}
            {formData.location && (
              <div className="flex items-center gap-1.5">
                <FiMapPin className="text-primary" />
                <span>{formData.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {formData.summary && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-200 uppercase tracking-wider">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">{formData.summary}</p>
        </div>
      )}

      {/* Experience */}
      {formData.experience?.length > 0 && formData.experience[0].company && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-200 uppercase tracking-wider">
            Work Experience
          </h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h4 className="text-base font-bold text-gray-900">{exp.position}</h4>
                  <p className="text-sm font-semibold text-primary">{exp.company}</p>
                </div>
                <span className="text-xs text-gray-600 font-medium whitespace-nowrap ml-4 bg-gray-100 px-2 py-1 rounded">
                  {exp.duration}
                </span>
              </div>
              {exp.description && (
                <p className="text-sm text-gray-700 leading-relaxed mt-1">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {formData.education?.length > 0 && formData.education[0].school && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-200 uppercase tracking-wider">
            Education
          </h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h4 className="text-base font-bold text-gray-900">{edu.degree}</h4>
                  <p className="text-sm font-semibold text-primary">{edu.school}</p>
                </div>
                <span className="text-xs text-gray-600 font-medium whitespace-nowrap ml-4 bg-gray-100 px-2 py-1 rounded">
                  {edu.duration}
                </span>
              </div>
              {edu.description && (
                <p className="text-sm text-gray-700 leading-relaxed mt-1">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {formData.skills && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-200 uppercase tracking-wider">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {formData.skills.split(',').map((skill, index) => (
              <span
                key={index}
                className="bg-gradient-primary text-white px-3 py-1 rounded-full text-xs font-medium"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
