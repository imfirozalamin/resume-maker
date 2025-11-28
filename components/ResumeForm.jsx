'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase, FiBook, FiX } from 'react-icons/fi';
import imageCompression from 'browser-image-compression';

export default function ResumeForm({ onSubmit, formData, setFormData }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      try {
        // Compression options
        const options = {
          maxSizeMB: 1, // Maximum file size in MB
          maxWidthOrHeight: 1024, // Max width or height
          useWebWorker: true,
          fileType: 'image/jpeg', // Convert to JPEG for better compression
          initialQuality: 0.9, // High quality (0.9 = 90%)
        };

        // Compress the image
        const compressedFile = await imageCompression(file, options);
        
        console.log(`Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);

        // Create preview from compressed file
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(compressedFile);

        // Upload compressed file
        const formDataUpload = new FormData();
        formDataUpload.append('file', compressedFile, compressedFile.name || 'compressed-image.jpg');

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formDataUpload,
        });

        const data = await response.json();
        if (data.url) {
          setFormData({ ...formData, imageUrl: data.url });
        }
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload image. Please try again.');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (index, field, value, arrayName) => {
    const newArray = [...formData[arrayName]];
    newArray[index] = { ...newArray[index], [field]: value };
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const addItem = (arrayName, template) => {
    setFormData({
      ...formData,
      [arrayName]: [...formData[arrayName], template],
    });
  };

  const removeItem = (index, arrayName) => {
    const newArray = formData[arrayName].filter((_, i) => i !== index);
    setFormData({ ...formData, [arrayName]: newArray });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Personal Information */}
      <div className="card mb-8">
        <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
          <FiUser className="text-primary" />
          Personal Information
        </h2>

        {/* Image Upload */}
        <div className="flex justify-center mb-8">
          <label
            htmlFor="image-upload"
            className="w-40 h-40 rounded-full border-4 border-dashed border-white/20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-primary hover:scale-105 overflow-hidden relative"
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <FiUpload size={32} />
                <span className="text-sm">Upload Photo</span>
              </div>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="loader"></div>
              </div>
            )}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-white font-medium mb-2">
              <FiUser className="text-primary" />
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="input-field"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-white font-medium mb-2">
              <FiBriefcase className="text-primary" />
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="input-field"
              placeholder="Software Engineer"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-white font-medium mb-2">
              <FiMail className="text-primary" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-white font-medium mb-2">
              <FiPhone className="text-primary" />
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="flex items-center gap-2 text-white font-medium mb-2">
            <FiMapPin className="text-primary" />
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input-field"
            placeholder="New York, NY"
          />
        </div>

        <div className="mt-6">
          <label className="text-white font-medium mb-2 block">Professional Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="input-field"
            placeholder="Brief professional summary..."
            rows="4"
          />
        </div>
      </div>

      {/* Experience Section */}
      <div className="card mb-8">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            <FiBriefcase className="text-primary" />
            Work Experience
          </h2>
          <button
            type="button"
            onClick={() =>
              addItem('experience', {
                company: '',
                position: '',
                duration: '',
                description: '',
              })
            }
            className="btn btn-secondary text-sm py-2 px-4"
          >
            + Add Experience
          </button>
        </div>

        {formData.experience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-dark-tertiary border border-white/10 rounded-xl p-6 mb-6 last:mb-0 relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-white font-medium mb-2 block">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    handleArrayChange(index, 'company', e.target.value, 'experience')
                  }
                  className="input-field"
                  placeholder="Company Name"
                />
              </div>

              <div>
                <label className="text-white font-medium mb-2 block">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) =>
                    handleArrayChange(index, 'position', e.target.value, 'experience')
                  }
                  className="input-field"
                  placeholder="Job Title"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-white font-medium mb-2 block">Duration</label>
              <input
                type="text"
                value={exp.duration}
                onChange={(e) =>
                  handleArrayChange(index, 'duration', e.target.value, 'experience')
                }
                className="input-field"
                placeholder="Jan 2020 - Present"
              />
            </div>

            <div className="mb-4">
              <label className="text-white font-medium mb-2 block">Description</label>
              <textarea
                value={exp.description}
                onChange={(e) =>
                  handleArrayChange(index, 'description', e.target.value, 'experience')
                }
                className="input-field"
                placeholder="Job responsibilities and achievements..."
                rows="3"
              />
            </div>

            <button
              type="button"
              onClick={() => removeItem(index, 'experience')}
              className="bg-error hover:bg-error/80 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            >
              <FiX /> Remove
            </button>
          </motion.div>
        ))}
      </div>

      {/* Education Section */}
      <div className="card mb-8">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            <FiBook className="text-primary" />
            Education
          </h2>
          <button
            type="button"
            onClick={() =>
              addItem('education', {
                school: '',
                degree: '',
                duration: '',
                description: '',
              })
            }
            className="btn btn-secondary text-sm py-2 px-4"
          >
            + Add Education
          </button>
        </div>

        {formData.education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-dark-tertiary border border-white/10 rounded-xl p-6 mb-6 last:mb-0 relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-white font-medium mb-2 block">School/University</label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) =>
                    handleArrayChange(index, 'school', e.target.value, 'education')
                  }
                  className="input-field"
                  placeholder="University Name"
                />
              </div>

              <div>
                <label className="text-white font-medium mb-2 block">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) =>
                    handleArrayChange(index, 'degree', e.target.value, 'education')
                  }
                  className="input-field"
                  placeholder="Bachelor of Science"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-white font-medium mb-2 block">Duration</label>
              <input
                type="text"
                value={edu.duration}
                onChange={(e) =>
                  handleArrayChange(index, 'duration', e.target.value, 'education')
                }
                className="input-field"
                placeholder="2016 - 2020"
              />
            </div>

            <div className="mb-4">
              <label className="text-white font-medium mb-2 block">Description (Optional)</label>
              <textarea
                value={edu.description}
                onChange={(e) =>
                  handleArrayChange(index, 'description', e.target.value, 'education')
                }
                className="input-field"
                placeholder="Achievements, GPA, etc..."
                rows="2"
              />
            </div>

            <button
              type="button"
              onClick={() => removeItem(index, 'education')}
              className="bg-error hover:bg-error/80 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            >
              <FiX /> Remove
            </button>
          </motion.div>
        ))}
      </div>

      {/* Skills Section */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <div>
          <label className="text-white font-medium mb-2 block">
            Skills (comma separated)
          </label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="input-field"
            placeholder="JavaScript, React, Node.js, Python"
          />
        </div>
      </div>
    </motion.div>
  );
}
