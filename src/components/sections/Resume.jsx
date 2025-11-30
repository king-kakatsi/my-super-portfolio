import { Article, GraduationCap, Briefcase } from '@phosphor-icons/react';

/**
 * Resume Component
 * Displays education and experience timeline with enhanced visual design
 * Features gradient background and blur effects for better visual appeal
 */
const Resume = ({ resume: resumeProp }) => {
  // Fallback data for when Firestore data is not available
  const fallbackResume = {
    education: [
      {
        period: '2018 - 2022',
        title: 'Bachelor of Computer Science',
        institution: 'University of Technology',
        description: 'Focused on software engineering, web development, and UI/UX design principles.'
      },
      {
        period: '2016 - 2018',
        title: 'High School Diploma',
        institution: 'Central High School',
        description: 'Specialized in Mathematics and Computer Science.'
      }
    ],
    experience: [
      {
        period: '2022 - Present',
        title: 'Senior Frontend Developer',
        company: 'Tech Solutions Inc.',
        description: 'Leading frontend development for enterprise applications using React, TypeScript, and modern web technologies.'
      },
      {
        period: '2020 - 2022',
        title: 'UI/UX Designer',
        company: 'Creative Agency',
        description: 'Designed user interfaces and experiences for various clients, focusing on modern and accessible design.'
      }
    ]
  };

  const resume = resumeProp || fallbackResume;

  return (
    <section id="resume" className="py-20 md:py-32 relative">
      
      {/* Background gradient with blur effect for visual appeal */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 pointer-events-none"></div>
      <div className="absolute inset-0 backdrop-blur-3xl opacity-30 pointer-events-none"></div>
      
      {/* Content container with adaptive background for light/dark modes */}
      <div className="relative z-10 bg-accent/5 dark:bg-gray-800/90 p-16 rounded-lg border border-accent/10">
        {/* Section Title */}
        <div className="mb-16 md:mb-24">
          <div className="animate-in-up flex items-center gap-3 mb-6 text-text-muted">
            <Article weight="bold" className="text-accent" />
            <span className="uppercase tracking-widest text-sm font-medium">Resume</span>
          </div>
          <h2 className="animate-in-up text-4xl md:text-6xl font-bold text-text-bright max-w-3xl">
            Educations & Experiences
          </h2>
        </div>

        {/* Timeline grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          
          {/* Educations Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap weight="bold" className="text-3xl text-accent" />
              <h3 className="text-2xl font-bold text-text-bright">Educations</h3>
            </div>
            
            {/* Education timeline items */}
            <div className="space-y-8">
              {resume.education.map((item, index) => (
                <div 
                  key={index} 
                  className="animate-card-3 opacity-0 translate-y-[100px] relative pl-8 border-l-2 border-white/10 hover:border-accent/50 transition-colors duration-300"
                >
                  {/* Timeline dot indicator */}
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent"></div>
                  
                  {/* Timeline content */}
                  <span className="text-sm text-accent font-medium mb-2 block">{item.period}</span>
                  <h4 className="text-xl font-bold text-text-bright mb-2">{item.title}</h4>
                  <p className="text-text-medium font-medium mb-3">{item.institution}</p>
                  <p className="text-text-muted leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experiences Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Briefcase weight="bold" className="text-3xl text-accent" />
              <h3 className="text-2xl font-bold text-text-bright">Experiences</h3>
            </div>
            
            {/* Experience timeline items */}
            <div className="space-y-8">
              {resume.experience.map((item, index) => (
                <div 
                  key={index} 
                  className="animate-card-3 opacity-0 translate-y-[100px] relative pl-8 border-l-2 border-white/10 hover:border-accent/50 transition-colors duration-300"
                >
                  {/* Timeline dot indicator */}
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent"></div>
                  
                  {/* Timeline content */}
                  <span className="text-sm text-accent font-medium mb-2 block">{item.period}</span>
                  <h4 className="text-xl font-bold text-text-bright mb-2">{item.title}</h4>
                  <p className="text-text-medium font-medium mb-3">{item.company}</p>
                  <p className="text-text-muted leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Resume;
