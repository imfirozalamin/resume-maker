'use client';

import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function ExecutiveTemplate({ formData }) {
  return (
    <div className="bg-white text-gray-900 w-full min-h-[297mm]">
      {/* Premium Header with Gold Accent */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="relative flex gap-6 items-center">
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt={formData.fullName}
              className="w-28 h-28 rounded-full object-cover border-4 border-yellow-500 shadow-2xl"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 tracking-tight">
              {formData.fullName || 'Your Name'}
            </h1>
            <div className="h-1 w-20 bg-yellow-500 mb-3"></div>
            <h2 className="text-lg font-light text-gray-300 mb-4">
              {formData.jobTitle || 'Job Title'}
            </h2>
            <div className="flex flex-wrap gap-4 text-xs">
              {formData.email && (
                <div className="flex items-center gap-1.5">
                  <FiMail className="text-yellow-500" />
                  <span>{formData.email}</span>
                </div>
              )}
              {formData.phone && (
                <div className="flex items-center gap-1.5">
                  <FiPhone className="text-yellow-500" />
                  <span>{formData.phone}</span>
                </div>
              )}
              {formData.location && (
                <div className="flex items-center gap-1.5">
                  <FiMapPin className="text-yellow-500" />
                  <span>{formData.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Executive Summary */}
        {formData.summary && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-6 w-1 bg-yellow-500"></div>
              <h3 className="text-lg font-bold text-gray-900">Executive Summary</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm pl-4">{formData.summary}</p>
          </div>
        )}

        {/* Professional Experience */}
        {formData.experience?.length > 0 && formData.experience[0].company && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 w-1 bg-yellow-500"></div>
              <h3 className="text-lg font-bold text-gray-900">Professional Experience</h3>
            </div>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-6 last:mb-0 pl-4 border-l-2 border-gray-200">
                <div className="pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="text-base font-bold text-gray-900">{exp.position}</h4>
                      <p className="text-sm font-semibold text-yellow-600">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-600 font-medium bg-gray-100 px-3 py-0.5 rounded whitespace-nowrap ml-4">
                      {exp.duration}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-700 leading-relaxed mt-2">{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {formData.education?.length > 0 && formData.education[0].school && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 w-1 bg-yellow-500"></div>
              <h3 className="text-lg font-bold text-gray-900">Education</h3>
            </div>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-4 last:mb-0 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="text-base font-bold text-gray-900">{edu.degree}</h4>
                    <p className="text-sm font-semibold text-yellow-600">{edu.school}</p>
                  </div>
                  <span className="text-xs text-gray-600 font-medium whitespace-nowrap ml-4">
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

        {/* Core Competencies */}
        {formData.skills && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 w-1 bg-yellow-500"></div>
              <h3 className="text-lg font-bold text-gray-900">Core Competencies</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 pl-4">
              {formData.skills.split(',').map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-700 text-sm"
                >
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium">{skill.trim()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
