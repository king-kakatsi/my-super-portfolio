import { useState, useEffect } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import toast from 'react-hot-toast';
import { FloppyDisk } from '@phosphor-icons/react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const SkillForm = ({ skill, onClose }) => {
  const { create, update } = useFirestore('skills');
  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend',
    proficiency: 50
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (skill) {
      setFormData(skill);
    }
  }, [skill]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (skill) {
        await update(skill.id, formData);
        toast.success('Skill updated!');
      } else {
        await create(formData);
        toast.success('Skill created!');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to save skill');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input label="Skill Name" name="name" value={formData.name} onChange={handleChange} required />
      <Select
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        options={[
          { value: 'frontend', label: 'Frontend' },
          { value: 'backend', label: 'Backend' },
          { value: 'mobile', label: 'Mobile' },
          { value: 'fullstack', label: 'Fullstack' },
          { value: 'tools', label: 'Tools' },
          { value: 'soft', label: 'Soft Skills' }
        ]}
      />
      <div>
        <label className="block text-text-medium font-medium mb-3">
          Proficiency: {formData.proficiency}%
        </label>
        <input
          type="range"
          name="proficiency"
          min="0"
          max="100"
          value={formData.proficiency}
          onChange={handleChange}
          className="w-full"
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="primary" loading={saving} icon={<FloppyDisk weight="bold" />}>
          {skill ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default SkillForm;
