import { User, CheckCircle } from '@phosphor-icons/react';

/**
 * About Section
 * Displays personal information, achievements, and services
 */
const About = ({ about: aboutProp, skills }) => {
  // Fallback data if Firestore data is missing
  const fallbackAbout = {
    stats: [
      { number: '10+', label: 'Happy clients' },
      { number: '3+', label: 'Years of experience' },
      { number: '15+', label: 'Projects completed' }
    ],
    bio: {
      headline: "Turning complex problems into simple design",
      description: "I am a creative designer and developer, who aims to work with small businesses and marginalized communities to bring their passions to life. I offer both design and development services of web applications or websites!"
    },
    services: [
      'Web Development',
      'UI/UX Design',
      'Mobile Apps',
      'Brand Identity'
    ]
  };

  const about = aboutProp || fallbackAbout;

  return (
    <section id="about" className="py-20 md:py-32">
      
      {/* Achievements Grid with adaptive background for light/dark modes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 bg-accent/5 dark:bg-gray-800/80 p-16 rounded-lg border border-accent/10">
        {about.stats.map((stat, index) => (
          <div 
            key={index} 
            className="animate-card-3 opacity-0 translate-y-[100px] p-8 rounded-3xl bg-white/50 dark:bg-base-tint/30 border border-accent/20 dark:border-white/50 hover:border-accent/50 dark:hover:border-accent/30 transition-all duration-300 group"
          >
            <p className="text-5xl md:text-6xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform origin-left">
              {stat.number}
            </p>
            <p className="text-text-muted uppercase tracking-wider text-sm font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Bio & Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Bio */}
        <div className="animate-in-up">
          <div className="flex items-center gap-3 mb-6 text-text-muted">
            <User weight="bold" className="text-wine" />
            <span className="uppercase tracking-widest text-sm font-medium">About Me</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-text-bright max-w-3xl mb-8">
            {about.bio.headline}
          </h2>
          <p className="text-text-medium leading-relaxed mb-8">
            {about.bio.description}
          </p>
          <a 
            href="#contact" 
            className="inline-block px-8 py-4 rounded-xl bg-accent text-white font-bold hover:bg-accent-dark transition-colors"
          >
            My Services
          </a>
        </div>

        {/* Services List */}
        <div className="animate-in-up">
          <h3 className="text-2xl font-bold text-text-bright mb-6">What I do</h3>
          <ul className="space-y-4">
            {about.services.map((service, index) => (
              <li key={index} className="flex items-center gap-4 text-text-medium group">
                <span className="w-8 h-8 rounded-full bg-base-tint flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <CheckCircle weight="bold" />
                </span>
                <span className="text-lg">{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </section>
  );
};

export default About;
