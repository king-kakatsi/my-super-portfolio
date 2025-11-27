import { User, CheckCircle } from '@phosphor-icons/react';

const achievements = [
  { number: '40+', label: 'Happy clients' },
  { number: '2+', label: 'Years of experience' },
  { number: '50+', label: 'Projects completed' }
];

const services = [
  'Web Development',
  'UI/UX Design',
  'Mobile Apps',
  'Brand Identity'
];

/**
 * About Section
 * Displays personal information, achievements, and services
 */
const About = () => {
  return (
    <section id="about" className="py-20 md:py-32">
      
      {/* Section Title */}
      <div className="mb-16 md:mb-24">
        <div className="animate-in-up flex items-center gap-3 mb-6 text-text-muted">
          <User weight="bold" className="text-accent" />
          <span className="uppercase tracking-widest text-sm font-medium">About Me</span>
        </div>
        <h2 className="animate-in-up text-4xl md:text-6xl font-bold text-text-bright max-w-3xl">
          Turning complex problems into simple design
        </h2>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {achievements.map((item, index) => (
          <div 
            key={index} 
            className="animate-card-3 opacity-0 translate-y-[100px] p-8 rounded-3xl bg-base-tint/30 border border-white/5 hover:border-accent/30 transition-all duration-300 group"
          >
            <p className="text-5xl md:text-6xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform origin-left">
              {item.number}
            </p>
            <p className="text-text-muted uppercase tracking-wider text-sm font-medium">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Bio & Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Bio */}
        <div className="animate-in-up">
          <h3 className="text-2xl font-bold text-text-bright mb-6">
            I wonder if I've been changed in the night? Let me think. Was I the same when I got up this morning?
          </h3>
          <p className="text-text-muted leading-relaxed mb-8">
            I am a creative designer and developer, who aims to work with small businesses and marginalized communities to bring their passions to life. I offer both design and development services of web applications or websites!
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
            {services.map((service, index) => (
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
