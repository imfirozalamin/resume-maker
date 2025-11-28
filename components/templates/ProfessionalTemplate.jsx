'use client';

import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function ProfessionalTemplate({ formData }) {
  return (
    <div className="bg-white text-gray-900 max-w-[850px] mx-auto min-h-[1100px] flex">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-800 text-white p-8">
        {formData.imageUrl && (
          <div className="mb-6">
            <img
              src={formData.imageUrl}
              alt={formData.fullName}
              className="w-full aspect-square rounded-lg object-cover"
            />
          </div>
        )}

        {/* Contact */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-600">
            CONTACT
          </h3>
          <div className="space-y-3 text-sm">
            {formData.email && (
              <div className="flex items-start gap-2">
                <FiMail className="mt-0.5 flex-shrink-0" />
                <span className="break-all">{formData.email}</span>
              </div>
            )}
            {formData.phone && (
              <div className="flex items-center gap-2">
                <FiPhone className="flex-shrink-0" />
                <span>{formData.phone}</span>
              </div>
            )}
            {formData.location && (
              <div className="flex items-start gap-2">
                <FiMapPin className="mt-0.5 flex-shrink-0" />
                <span>{formData.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {formData.skills && (
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-600">
              SKILLS
            </h3>
            <div className="space-y-2">
              {formData.skills.split(',').map((skill, index) => (
                <div key={index} className="text-sm">
                  • {skill.trim()}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 p-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {formData.fullName || 'Your Name'}
          </h1>
          <h2 className="text-xl font-semibold text-gray-600 mb-4">
            {formData.jobTitle || 'Job Title'}
          </h2>
        </div>

        {/* Summary */}
        {formData.summary && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Profile
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm">{formData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {formData.experience?.length > 0 && formData.experience[0].company && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Experience
            </h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-base font-bold text-gray-900">{exp.position}</h4>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-4">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2">{exp.company}</p>
                {exp.description && (
                  <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {formData.education?.length > 0 && formData.education[0].school && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Education
            </h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-base font-bold text-gray-900">{edu.degree}</h4>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-4">
                    {edu.duration}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2">{edu.school}</p>
                {edu.description && (
                  <p className="text-sm text-gray-700 leading-relaxed">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
