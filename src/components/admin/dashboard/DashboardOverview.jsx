import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from '../../../hooks/useFirestore';
import { FolderOpen, Lightbulb, Envelope, Plus } from '@phosphor-icons/react';
import { format } from 'date-fns';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

/**
 * Dashboard Overview Component
 * Admin home page with stats and recent activity
 */
const DashboardOverview = () => {
  const { data: projects } = useFirestore('projects');
  const { data: skills } = useFirestore('skills');
  const { data: messages } = useFirestore('messages', { orderByField: 'createdAt', orderDirection: 'desc' });

  const [stats, setStats] = useState({
    totalProjects: 0,
    totalSkills: 0,
    unreadMessages: 0
  });

  /**
   * Calculate stats
   */
  useEffect(() => {
    setStats({
      totalProjects: projects.length,
      totalSkills: skills.length,
      unreadMessages: messages.filter(m => !m.read).length
    });
  }, [projects, skills, messages]);

  /**
   * Stats cards data
   */
  const statsCards = [
    {
      icon: FolderOpen,
      label: 'Total Projects',
      value: stats.totalProjects,
      color: 'text-accent',
      link: '/admin/projects'
    },
    {
      icon: Lightbulb,
      label: 'Total Skills',
      value: stats.totalSkills,
      color: 'text-secondary',
      link: '/admin/skills'
    },
    {
      icon: Envelope,
      label: 'Unread Messages',
      value: stats.unreadMessages,
      color: 'text-amber-400',
      link: '/admin/messages'
    }
  ];

  /**
   * Quick actions
   */
  const quickActions = [
    { label: 'Add Projects', icon: Plus, link: '/admin/projects', variant: 'primary' },
    { label: 'Edit Profile', icon: null, link: '/admin/profile', variant: 'secondary' },
    { label: 'View Messages', icon: Envelope, link: '/admin/messages', variant: 'ghost' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div>
        <h2 className="text-4xl font-bold text-text-bright mb-2">
          Welcome back! 👋
        </h2>
        <p className="text-text-muted text-lg">
          Here's what's happening with your portfolio
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link key={index} to={stat.link}>
              <Card variant="bordered" className="hover:border-accent/50 transition-all duration-300 group cursor-pointer">
                <Card.Body>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-muted text-sm mb-2">
                        {stat.label}
                      </p>
                      <p className="text-4xl font-bold text-text-bright group-hover:scale-110 transition-transform origin-left">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.color} opacity-50 group-hover:opacity-100 transition-opacity`}>
                      <Icon size={48} weight="bold" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <Card.Header>
          <h3 className="text-xl font-bold text-text-bright">
            Quick Actions
          </h3>
        </Card.Header>
        <Card.Body>
          <div className="flex flex-wrap gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <Button 
                  variant={action.variant}
                  icon={action.icon && <action.icon weight="bold" />}
                >
                  {action.label}
                </Button>
              </Link>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Recent Messages */}
      <Card>
        <Card.Header className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-text-bright">
            Recent Messages
          </h3>
          <Link to="/admin/messages">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </Card.Header>
        <Card.Body>
          {messages.length === 0 ? (
            <p className="text-text-muted text-center py-8">
              No messages yet
            </p>
          ) : (
            <div className="space-y-4">
              {messages.slice(0, 5).map((message) => (
                <div 
                  key={message.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-base-tint border border-white/10 hover:border-accent/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-bold text-text-bright">
                        {message.name}
                      </p>
                      {!message.read && (
                        <Badge variant="warning" size="sm">New</Badge>
                      )}
                    </div>
                    <p className="text-text-muted text-sm mb-1">
                      {message.email}
                    </p>
                    <p className="text-text-medium">
                      {message.subject}
                    </p>
                  </div>
                  <p className="text-text-muted text-sm">
                    {message.createdAt && format(message.createdAt.toDate(), 'MMM d, yyyy')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashboardOverview;
