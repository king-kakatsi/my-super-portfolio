import { Pencil, Trash, GithubLogo, Globe } from '@phosphor-icons/react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

/**
 * Project Card Component
 * Display project with edit/delete actions
 * 
 * @param {Object} props
 * @param {Object} props.project - Project data
 * @param {Function} props.onEdit - Edit handler
 * @param {Function} props.onDelete - Delete handler
 * @param {string} props.viewMode - 'grid' or 'list'
 */
const ProjectCard = ({ project, onEdit, onDelete, viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <Card>
        <Card.Body>
          <div className="flex items-center gap-6">
            {/* Thumbnail */}
            {project.imageUrl && (
              <img 
                src={project.imageUrl} 
                alt={project.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
            )}

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-text-bright">
                  {project.name}
                </h3>
              </div>
              <p className="text-text-muted mb-3 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="lg"
                icon={<Pencil weight="bold" />}
                onClick={onEdit}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="lg"
                icon={<Trash weight="bold" />}
                onClick={onDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  // Grid view
  return (
    <Card className="group hover:border-accent/50 transition-all duration-300">
      {/* Thumbnail */}
      {project.imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <Card.Body>
        {/* Title & Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-2xl font-bold text-text-bright flex-1">
            {project.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-text-muted text-xl mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.slice(0, 3).map((tech, index) => (
            <span 
              key={index}
              className="px-5 py-1 bg-purple-800/40 text-gray-300 text-md rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 3 && (
            <span className="px-2 py-1 bg-white/10 text-text-muted text-xs rounded-full">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 mb-4">
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors"
            >
              <Globe size={18} weight="bold" />
            </a>
          )}
          {project.sourceUrl && (
            <a 
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors"
            >
              <GithubLogo size={18} weight="bold" />
            </a>
          )}
        </div>
      </Card.Body>

      {/* Actions */}
      <Card.Footer className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="lg"
          icon={<Pencil weight="bold" />}
          onClick={onEdit}
          className="flex-1"
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="lg"
          icon={<Trash weight="bold" />}
          onClick={onDelete}
          className="flex-1"
        >
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ProjectCard;
