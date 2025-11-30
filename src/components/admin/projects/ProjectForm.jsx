import { useState, useEffect } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import { useFileUpload } from '../../../hooks/useFileUpload';
import toast from 'react-hot-toast';
import { FloppyDisk, Plus, X } from '@phosphor-icons/react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import FileUpload from '../ui/FileUpload';

/**
 * Project Form Component
 * Add or edit project
 * 
 * @param {Object} props
 * @param {Object} props.project - Project to edit (null for new)
 * @param {Function} props.onClose - Close handler
 */
const ProjectForm = ({ project, onClose }) => {
  const { create, update } = useFirestore('projects');
  const { data: skills } = useFirestore('skills');
  const { upload, uploading } = useFileUpload('projects');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Web',
    technologies: [],
    liveUrl: '',
    sourceUrl: '',
    imageUrl: '',
  });
  const [saving, setSaving] = useState(false);

  /**
   * Load project data if editing
   */
  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        technologies: project.technologies || []
      });
    }
  }, [project]);

  /**
   * Handle input change
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  /**
   * Handle thumbnail upload
   */
  const handleThumbnailUpload = async (file) => {
    try {
      const url = await upload(file);
      setFormData({
        ...formData,
        imageUrl: url
      });
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  /**
   * Handle technology selection
   */
  const handleTechAdd = (e) => {
    const tech = e.target.value;
    if (tech && !formData.technologies.includes(tech)) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, tech]
      });
    }
  };

  /**
   * Handle technology removal
   */
  const handleTechRemove = (techToRemove) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(tech => tech !== techToRemove)
    });
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const projectData = {
        ...formData
      };

      if (project) {
        await update(project.id, projectData);
        toast.success('Project updated successfully!');
      } else {
        await create(projectData);
        toast.success('Project created successfully!');
      }

      onClose();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Project Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="My Awesome Project"
        required
      />

      <Textarea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Describe your project..."
        rows={4}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={[
            { value: 'Web', label: 'Web Application' },
            { value: 'Mobile', label: 'Mobile Application' }
          ]}
        />

        <div className="w-full">
          <label className="block text-text-medium font-medium mb-3">
            Technologies
          </label>
          <div className="space-y-3">
            <div className="relative">
              <select
                onChange={handleTechAdd}
                value=""
                className="w-full px-6 py-4 rounded-xl bg-base-tint border border-white/10 text-text-bright focus:border-accent focus:outline-none cursor-pointer appearance-none"
              >
                <option value="" disabled>Select a technology to add...</option>
                {skills
                  .filter(skill => !formData.technologies.includes(skill.name))
                  .map(skill => (
                    <option key={skill.id} value={skill.name}>
                      {skill.name}
                    </option>
                  ))
                }
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                <Plus weight="bold" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 rounded-xl border border-white/5 bg-base-tint/50">
              {formData.technologies.length === 0 && (
                <span className="text-text-muted text-sm italic p-1">No technologies selected</span>
              )}
              {formData.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-accent/20 text-accent text-sm rounded-full"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleTechRemove(tech)}
                    className="hover:text-white transition-colors"
                  >
                    <X size={14} weight="bold" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Project URL"
          name="liveUrl"
          value={formData.liveUrl}
          onChange={handleChange}
          placeholder="https://example.com"
        />

        <Input
          label="Source URL"
          name="sourceUrl"
          value={formData.sourceUrl}
          onChange={handleChange}
          placeholder="https://github.com/username/repo"
        />
      </div>



      <div>
        <label className="block text-text-medium font-medium mb-3">
          Image URL
        </label>
        <FileUpload
          onUpload={handleThumbnailUpload}
          accept="image/*"
          currentUrl={formData.imageUrl}
        />
      </div>

      <div className="flex items-center justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={saving || uploading}
          icon={<FloppyDisk weight="bold" />}
        >
          {project ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
