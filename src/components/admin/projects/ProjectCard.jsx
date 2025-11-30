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
            {project.thumbnail && (
              <img 
                src={project.thumbnail} 
                alt={project.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
            )}

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-text-bright">
                  {project.title}
                </h3>
                <Badge variant={project.status === 'published' ? 'success' : 'warning'}>
                  {project.status || 'draft'}
                </Badge>
                {project.featured && (
                  <Badge variant="info">Featured</Badge>
                )}
              </div>
              <p className="text-text-muted mb-3 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech, index) => (
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
                size="sm"
                icon={<Pencil weight="bold" />}
                onClick={onEdit}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
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
      {project.thumbnail && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={project.thumbnail} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <Card.Body>
        {/* Title & Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold text-text-bright flex-1">
            {project.title}
          </h3>
          <div className="flex flex-col gap-2">
            <Badge variant={project.status === 'published' ? 'success' : 'warning'} size="sm">
              {project.status || 'draft'}
            </Badge>
            {project.featured && (
              <Badge variant="info" size="sm">Featured</Badge>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-text-muted text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack?.slice(0, 3).map((tech, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.techStack?.length > 3 && (
            <span className="px-2 py-1 bg-white/10 text-text-muted text-xs rounded-full">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 mb-4">
          {project.projectUrl && (
            <a 
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors"
            >
              <Globe size={18} weight="bold" />
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
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
          size="sm"
          icon={<Pencil weight="bold" />}
          onClick={onEdit}
          className="flex-1"
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
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
