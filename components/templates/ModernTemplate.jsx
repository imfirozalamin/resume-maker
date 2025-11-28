'use client';

import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function ModernTemplate({ formData }) {
  return (
    <div className="bg-white text-gray-900 max-w-[850px] mx-auto p-12 min-h-[1100px]">
      {/* Header with gradient */}
      <div className="flex gap-8 items-start mb-8 pb-8 border-b-4 border-primary">
        {formData.imageUrl && (
          <img
            src={formData.imageUrl}
            alt={formData.fullName}
            className="w-32 h-32 rounded-full object-cover border-4 border-primary flex-shrink-0"
          />
        )}
        <div className="flex-1">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-2 leading-tight">
            {formData.fullName || 'Your Name'}
          </h1>
          <h2 className="text-2xl font-semibold text-primary mb-4">
            {formData.jobTitle || 'Job Title'}
          </h2>
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            {formData.email && (
              <div className="flex items-center gap-2">
                <FiMail className="text-primary" />
                <span>{formData.email}</span>
              </div>
            )}
            {formData.phone && (
              <div className="flex items-center gap-2">
                <FiPhone className="text-primary" />
                <span>{formData.phone}</span>
              </div>
            )}
            {formData.location && (
              <div className="flex items-center gap-2">
                <FiMapPin className="text-primary" />
                <span>{formData.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {formData.summary && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
            Professional Summary
          </h3>
          <p className="text-gray-700 leading-relaxed">{formData.summary}</p>
        </div>
      )}

      {/* Experience */}
      {formData.experience?.length > 0 && formData.experience[0].company && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
            Work Experience
          </h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{exp.position}</h4>
                  <p className="text-lg font-semibold text-primary">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-600 font-medium whitespace-nowrap ml-4">
                  {exp.duration}
                </span>
              </div>
              {exp.description && (
                <p className="text-gray-700 leading-relaxed mt-2">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {formData.education?.length > 0 && formData.education[0].school && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
            Education
          </h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{edu.degree}</h4>
                  <p className="text-lg font-semibold text-primary">{edu.school}</p>
                </div>
                <span className="text-sm text-gray-600 font-medium whitespace-nowrap ml-4">
                  {edu.duration}
                </span>
              </div>
              {edu.description && (
                <p className="text-gray-700 leading-relaxed mt-2">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {formData.skills && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
            Skills
          </h3>
          <div className="flex flex-wrap gap-3">
            {formData.skills.split(',').map((skill, index) => (
              <span
                key={index}
                className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium"
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
