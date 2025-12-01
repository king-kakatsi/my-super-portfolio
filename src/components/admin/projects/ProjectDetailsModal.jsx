import { X, Globe, GithubLogo, Calendar, Tag } from '@phosphor-icons/react';
import Button from '../ui/Button';

/**
 * Project Details Modal Component
 * Beautiful rounded modal to display full project information
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal open state
 * @param {Function} props.onClose - Close handler
 * @param {Object} props.project - Project data
 */
const ProjectDetailsModal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  // Format date
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-500/30 rounded-3xl shadow-2xl shadow-purple-500/20 max-h-[90vh] overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors z-10 group"
          aria-label="Close modal"
        >
          <X size={24} className="text-gray-400 group-hover:text-white transition-colors" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
          {/* Project Image */}
          {project.imageUrl && (
            <div className="relative h-72 overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Title */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">
                {project.name}
              </h2>
              {project.featured && (
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                  <Tag size={16} weight="fill" />
                  Featured Project
                </span>
              )}
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400">
              {project.createdAt && (
                <div className="flex items-center gap-2">
                  <Calendar size={20} weight="bold" className="text-purple-400" />
                  <span>{formatDate(project.createdAt)}</span>
                </div>
              )}
              {project.category && (
                <div className="flex items-center gap-2">
                  <Tag size={20} weight="bold" className="text-purple-400" />
                  <span>{project.category}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">About This Project</h3>
              <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-purple-500/20 text-purple-200 rounded-xl text-sm font-medium border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Key Highlights</h3>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            {(project.liveUrl || project.sourceUrl) && (
              <div className="flex flex-wrap gap-4 pt-4">
                {project.liveUrl && (
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<Globe size={20} weight="bold" />}
                    onClick={() => window.open(project.liveUrl, '_blank')}
                    className="flex-1 min-w-[200px]"
                  >
                    Visit Live Site
                  </Button>
                )}
                {project.sourceUrl && (
                  <Button
                    variant="secondary"
                    size="lg"
                    icon={<GithubLogo size={20} weight="bold" />}
                    onClick={() => window.open(project.sourceUrl, '_blank')}
                    className="flex-1 min-w-[200px]"
                  >
                    View Source Code
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.6);
        }
      `}</style>
    </div>
  );
};

export default ProjectDetailsModal;
