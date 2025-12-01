import { useState } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import { Plus, SquaresFour, List } from '@phosphor-icons/react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import Modal from '../ui/Modal';
import ProjectDetailsModal from './ProjectDetailsModal';

/**
 * Projects List Component
 * Manage all projects with grid/table views
 */
const ProjectsList = () => {
  const { data: projects, loading, remove } = useFirestore('projects', { 
    orderByField: 'createdAt', 
    orderDirection: 'desc' 
  });
  
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  /**
   * Handle add new project
   */
  const handleAdd = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  /**
   * Handle edit project
   */
  const handleEdit = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  /**
   * Handle delete project
   */
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await remove(id);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  /**
   * Handle modal close
   */
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  /**
   * Handle view project details
   */
  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };

  /**
   * Handle details modal close
   */
  const handleDetailsModalClose = () => {
    setIsDetailsModalOpen(false);
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <Card.Body>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-text-bright mb-2">
                Projects ({projects.length})
              </h2>
              <p className="text-text-muted">
                Manage your portfolio projects
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-base-tint rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white/10 text-accent' 
                      : 'text-text-muted hover:text-text-bright'
                  }`}
                >
                  <SquaresFour size={20} weight="bold" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white/10 text-accent' 
                      : 'text-text-muted hover:text-text-bright'
                  }`}
                >
                  <List size={20} weight="bold" />
                </button>
              </div>

              {/* Add Button */}
              <Button
                variant="primary"
                icon={<Plus weight="bold" />}
                onClick={handleAdd}
              >
                Add Project
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Projects Grid/List */}
      {projects.length === 0 ? (
        <Card>
          <Card.Body>
            <div className="text-center py-12">
              <p className="text-text-muted text-lg mb-4">
                No projects yet
              </p>
              <Button
                variant="primary"
                icon={<Plus weight="bold" />}
                onClick={handleAdd}
              >
                Add Your First Project
              </Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
            : 'space-y-4'
        }>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => handleEdit(project)}
              onDelete={() => handleDelete(project.id)}
              onViewDetails={() => handleViewDetails(project)}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        size="lg"
      >
        <Modal.Header>
          {editingProject ? 'Edit Project' : 'Add New Project'}
        </Modal.Header>
        <Modal.Body>
          <ProjectForm
            project={editingProject}
            onClose={handleModalClose}
          />
        </Modal.Body>
      </Modal>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleDetailsModalClose}
        project={selectedProject}
      />
    </div>
  );
};

export default ProjectsList;

