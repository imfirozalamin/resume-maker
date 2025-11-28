'use client';

import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function CreativeTemplate({ formData }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900 max-w-[850px] mx-auto p-12 min-h-[1100px]">
      {/* Creative Header */}
      <div className="relative mb-8">
        <div className="absolute -left-6 -top-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"></div>
        <div className="relative bg-white rounded-3xl p-8 shadow-xl">
          <div className="flex gap-6 items-center">
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt={formData.fullName}
                className="w-28 h-28 rounded-2xl object-cover shadow-lg border-4 border-white ring-4 ring-purple-200"
              />
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {formData.fullName || 'Your Name'}
              </h1>
              <h2 className="text-xl font-bold text-gray-700 mb-3">
                {formData.jobTitle || 'Job Title'}
              </h2>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {formData.email && (
                  <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
                    <FiMail className="text-blue-600" />
                    <span>{formData.email}</span>
                  </div>
                )}
                {formData.phone && (
                  <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
                    <FiPhone className="text-purple-600" />
                    <span>{formData.phone}</span>
                  </div>
                )}
                {formData.location && (
                  <div className="flex items-center gap-2 bg-pink-100 px-3 py-1 rounded-full">
                    <FiMapPin className="text-pink-600" />
                    <span>{formData.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {formData.summary && (
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-900">About Me</h3>
          </div>
          <p className="text-gray-700 leading-relaxed pl-5">{formData.summary}</p>
        </div>
      )}

      {/* Experience */}
      {formData.experience?.length > 0 && formData.experience[0].company && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-900">Experience</h3>
          </div>
          <div className="space-y-4">
            {formData.experience.map((exp, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{exp.position}</h4>
                    <p className="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                    {exp.duration}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-gray-700 leading-relaxed mt-2">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {formData.education?.length > 0 && formData.education[0].school && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-900">Education</h3>
          </div>
          <div className="space-y-4">
            {formData.education.map((edu, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{edu.degree}</h4>
                    <p className="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {edu.school}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                    {edu.duration}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-gray-700 leading-relaxed mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {formData.skills && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-900">Skills</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {formData.skills.split(',').map((skill, index) => {
              const colors = [
                'from-blue-500 to-blue-600',
                'from-purple-500 to-purple-600',
                'from-pink-500 to-pink-600',
                'from-indigo-500 to-indigo-600',
              ];
              const color = colors[index % colors.length];
              return (
                <span
                  key={index}
                  className={`bg-gradient-to-r ${color} text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md`}
                >
                  {skill.trim()}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
