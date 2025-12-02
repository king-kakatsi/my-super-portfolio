import { useState } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import { Plus, Pencil, Trash } from '@phosphor-icons/react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import SkillForm from './SkillForm';

/**
 * Skills Manager Component
 * Manage all skills
 */
const SkillsManager = () => {
  const { data: skills, loading, remove } = useFirestore('skills');
  const { data: categories } = useFirestore('categories');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  // Create category ID to name mapping
  const categoryIdToName = {};
  categories?.forEach(cat => {
    categoryIdToName[cat.id] = cat.name;
  });

  const handleAdd = () => {
    setEditingSkill(null);
    setIsModalOpen(true);
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      await remove(id);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <Card.Body>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-text-bright mb-2">
                Skills ({skills.length})
              </h2>
              <p className="text-text-muted">Manage your technical skills</p>
            </div>
            <Button variant="primary" icon={<Plus weight="bold" />} onClick={handleAdd}>
              Add Skill
            </Button>
          </div>
        </Card.Body>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <Card key={skill.id} className="group hover:border-accent/50 transition-all">
            <Card.Body>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-bold text-text-bright">{skill.name}</h3>
                <span className="px-3 py-1 bg-purple-800/50 text-gray-200 text-sm rounded-full">
                  {categoryIdToName[skill.category] || skill.category}
                </span>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-text-muted text-lg">Proficiency</span>
                  <span className="text-purple-600 font-bold">{skill.proficiency}%</span>
                </div>
                <div className="w-full h-2 bg-base-tint rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-800 transition-all"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" icon={<Pencil weight="bold" />} onClick={() => handleEdit(skill)} className="flex-1">
                  Edit
                </Button>
                <Button variant="danger" size="sm" icon={<Trash weight="bold" />} onClick={() => handleDelete(skill.id)} className="flex-1">
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="md">
        <Modal.Header>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</Modal.Header>
        <Modal.Body>
          <SkillForm skill={editingSkill} onClose={() => setIsModalOpen(false)} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SkillsManager;
