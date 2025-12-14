import { useState, useEffect } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import { useFileUpload } from '../../../hooks/useFileUpload';
import toast from 'react-hot-toast';
import { FloppyDisk } from '@phosphor-icons/react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import SearchableSelect from '../ui/SearchableSelect';
import MultiSelect from '../ui/MultiSelect';
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
   * Handle technology selection change
   * 
   * **Multi-Select Handler**
   * Updates technologies array when MultiSelect selection changes.
   * 
   * @param {Array} selectedValues - Array of selected technology IDs
   */
  const handleTechChange = (selectedValues) => {
    setFormData({
      ...formData,
      technologies: selectedValues
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
        <SearchableSelect
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={[
            { value: 'Web', label: 'Web Application' },
            { value: 'Mobile', label: 'Mobile Application' }
          ]}
          placeholder="Search and select category..."
        />

        <MultiSelect
          label="Technologies"
          options={skills.map(skill => ({
            value: skill.id,
            label: skill.name
          }))}
          value={formData.technologies}
          onChange={handleTechChange}
          placeholder="Search and select technologies..."
        />
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
