import { useState, useEffect } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import { useFileUpload } from '../../../hooks/useFileUpload';
import toast from 'react-hot-toast';
import { FloppyDisk } from '@phosphor-icons/react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
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
  const { upload, uploading } = useFileUpload('projects');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    projectUrl: '',
    githubUrl: '',
    thumbnail: '',
    status: 'draft',
    featured: false
  });
  const [saving, setSaving] = useState(false);

  /**
   * Load project data if editing
   */
  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        techStack: project.techStack?.join(', ') || ''
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
        thumbnail: url
      });
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Convert tech stack string to array
      const techStackArray = formData.techStack
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech);

      const projectData = {
        ...formData,
        techStack: techStackArray
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
        label="Project Title"
        name="title"
        value={formData.title}
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

      <Input
        label="Tech Stack"
        name="techStack"
        value={formData.techStack}
        onChange={handleChange}
        placeholder="React, Node.js, MongoDB (comma separated)"
        helperText="Separate technologies with commas"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Project URL"
          name="projectUrl"
          value={formData.projectUrl}
          onChange={handleChange}
          placeholder="https://example.com"
        />

        <Input
          label="GitHub URL"
          name="githubUrl"
          value={formData.githubUrl}
          onChange={handleChange}
          placeholder="https://github.com/username/repo"
        />
      </div>

      <Select
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={[
          { value: 'draft', label: 'Draft' },
          { value: 'published', label: 'Published' }
        ]}
      />

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="w-5 h-5 rounded border-white/10 bg-base-tint text-accent focus:ring-accent"
        />
        <label htmlFor="featured" className="text-text-medium font-medium">
          Featured Project
        </label>
      </div>

      <div>
        <label className="block text-text-medium font-medium mb-3">
          Thumbnail Image
        </label>
        <FileUpload
          onUpload={handleThumbnailUpload}
          accept="image/*"
          currentUrl={formData.thumbnail}
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
