'use client';

import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function ProfessionalTemplate({ formData }) {
  return (
    <div className="bg-white text-gray-900 w-full flex min-h-[297mm]">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-800 text-white p-6">
        {formData.imageUrl && (
          <img
            src={formData.imageUrl}
            alt={formData.fullName}
            className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-gray-700"
          />
        )}
        
        <div className="mb-8">
          <h3 className="text-lg font-bold border-b border-gray-600 pb-2 mb-4 uppercase tracking-wider">
            Contact
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            {formData.email && (
              <div className="flex items-center gap-2">
                <FiMail />
                <span className="break-all">{formData.email}</span>
              </div>
            )}
            {formData.phone && (
              <div className="flex items-center gap-2">
                <FiPhone />
                <span>{formData.phone}</span>
              </div>
            )}
            {formData.location && (
              <div className="flex items-center gap-2">
                <FiMapPin />
                <span>{formData.location}</span>
              </div>
            )}
          </div>
        </div>

        {formData.skills && (
          <div className="mb-8">
            <h3 className="text-lg font-bold border-b border-gray-600 pb-2 mb-4 uppercase tracking-wider">
              Skills
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {formData.skills.split(',').map((skill, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                  {skill.trim()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {formData.fullName || 'Your Name'}
          </h1>
          <h2 className="text-xl font-semibold text-gray-600">
            {formData.jobTitle || 'Job Title'}
          </h2>
        </div>

        {formData.summary && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3 uppercase tracking-wider">
              Profile
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm">{formData.summary}</p>
          </div>
        )}

        {formData.experience?.length > 0 && formData.experience[0].company && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4 uppercase tracking-wider">
              Experience
            </h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-base font-bold text-gray-900">{exp.position}</h4>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-2">{exp.company}</p>
                {exp.description && (
                  <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {formData.education?.length > 0 && formData.education[0].school && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4 uppercase tracking-wider">
              Education
            </h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-base font-bold text-gray-900">{edu.degree}</h4>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {edu.duration}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-2">{edu.school}</p>
                {edu.description && (
                  <p className="text-sm text-gray-600 leading-relaxed">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
