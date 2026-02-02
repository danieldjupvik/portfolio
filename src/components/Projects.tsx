import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, ExternalLink, Sparkles, Clapperboard } from 'lucide-react';
import { SpotlightCard } from './reactbits';
import profilePicture from '../assets/img/profile-picture.jpeg';
import bergenTekniske from '../assets/project-logo/BERGENS-TEKNISKE-MUSEUM.png';
import holidaze from '../assets/project-logo/Holidaze-logo-white.png';
import lasr from '../assets/project-logo/LASR-logo.png';
import movieWatch from '../assets/project-logo/MovieWatcht.png';
import eduplaytion from '../assets/project-logo/eduplay-logo.png';
import infracity from '../assets/project-logo/infracity.png';
import gameNow from '../assets/project-logo/semester-project-2-logo.png';

type Project = {
  name: string;
  logo?: string;
  icon?: 'ai' | 'mcu';
  url: string;
  internal?: boolean;
};

type ProjectCategory = {
  title: string;
  projects: Project[];
};

const projectCategories: ProjectCategory[] = [
  {
    title: 'Side Projects',
    projects: [
      {
        name: 'Daniel AI',
        icon: 'ai',
        url: '/ai',
        internal: true,
      },
      {
        name: 'MCU Timeline',
        icon: 'mcu',
        url: 'https://mcu-timeline.danieldjupvik.dev/',
      },
      {
        name: 'MovieWatcht',
        logo: movieWatch,
        url: '/moviewatcht',
        internal: true,
      },
    ],
  },
  // {
  //   title: 'Freelance',
  //   projects: [
  //     {
  //       name: 'Infracity',
  //       logo: infracity,
  //       url: 'https://www.infracity.ai/',
  //     },
  //   ],
  // },
  {
    title: 'School Work',
    projects: [
      {
        name: 'Holidaze',
        logo: holidaze,
        url: 'https://holidaze.danieldjupvik.dev/',
      },
      {
        name: 'GameNow',
        logo: gameNow,
        url: 'https://gamenow.danieldjupvik.dev',
      },
      {
        name: 'LASR',
        logo: lasr,
        url: 'https://lasr.danieldjupvik.dev',
      },
      // {
      //   name: 'Eduplaytion',
      //   logo: eduplaytion,
      //   url: 'https://eduplaytion.danieldjupvik.dev',
      // },
      // {
      //   name: 'Bergen Tekniske',
      //   logo: bergenTekniske,
      //   url: 'https://www.figma.com/proto/sMGkmJ7h6nQfLpTviN2e0U/Bergens-Tekniske-Museum-CA?node-id=53%3A21&viewport=432%2C514%2C0.6079582571983337&scaling=min-zoom',
      // },
    ],
  },
];

const Projects = () => {
  const born = 1998;
  const year = new Date().getFullYear();
  const myAge = year - born;

  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -100px 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  let globalIndex = 0;

  return (
    <div className='main-content'>
      {/* Projects Section */}
      <section
        className='section section--projects'
        ref={(el) => { sectionsRef.current[0] = el }}
      >
        <div className='section__header' id='projects'>
          <span className='section__label'>Portfolio</span>
          <h2 className='section__title'>
            <span className='section__title--accent'>Selected</span> Work
            <span className='section__title--dot'>.</span>
          </h2>
        </div>

        {projectCategories.map((category) => (
          <div key={category.title} className='project-category'>
            <h3 className='project-category__title'>{category.title}</h3>
            <div className='projects-grid'>
              {category.projects.map((project) => {
                const index = globalIndex++;
                const ProjectWrapper = project.internal ? Link : 'a';
                const linkProps = project.internal
                  ? { to: project.url }
                  : { href: project.url, target: '_blank', rel: 'noopener noreferrer' };

                return (
                  <SpotlightCard
                    key={project.name}
                    className='project-card-wrapper'
                    spotlightColor='rgba(116, 247, 217, 0.12)'
                  >
                    <ProjectWrapper
                      {...(linkProps as any)}
                      className='project-card'
                      style={{ '--index': index } as React.CSSProperties}
                    >
                      <span className='project-card__number'>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className='project-card__logo'>
                        {project.icon === 'ai' ? (
                          <Sparkles size={48} className='project-card__icon' />
                        ) : project.icon === 'mcu' ? (
                          <Clapperboard size={48} className='project-card__icon' />
                        ) : (
                          <img src={project.logo} alt={project.name} loading='lazy' />
                        )}
                      </div>
                      <h3 className='project-card__name'>{project.name}</h3>
                      <div className='project-card__arrow'>
                        <ExternalLink size={18} />
                      </div>
                    </ProjectWrapper>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section
        className='section section--about'
        ref={(el) => { sectionsRef.current[1] = el }}
      >
        <div className='section__header' id='about'>
          <span className='section__label'>About</span>
          <h2 className='section__title'>
            <span className='section__title--accent'>Who</span> I am
            <span className='section__title--dot'>.</span>
          </h2>
        </div>

        <div className='about-grid'>
          <div className='about-image'>
            <div className='about-image__wrapper'>
              <img src={profilePicture} alt='Daniel' loading='lazy' />
              <div className='about-image__border' />
            </div>
            <div className='about-image__decoration' />
          </div>

          <div className='about-content'>
            <p className='about-content__text'>
              I'm a <span className='about-content__highlight'>{myAge}-year-old developer</span> from
              Gursken, Sunnmøre, currently based in Ulsteinvik, Norway.
            </p>
            <p className='about-content__text'>
              With a background in Frontend Development from Noroff, I specialize in
              building <span className='about-content__highlight'>modern web applications</span> that
              combine clean code with thoughtful user experiences.
            </p>
            <p className='about-content__text'>
              Beyond work, I'm passionate about servers, home automation, and exploring
              the intersection of technology and everyday life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className='section section--contact'
        ref={(el) => { sectionsRef.current[2] = el }}
      >
        <div className='section__header'>
          <span className='section__label'>Connect</span>
          <h2 className='section__title'>
            <span className='section__title--accent'>Get</span> in touch
            <span className='section__title--dot'>.</span>
          </h2>
        </div>

        <p className='contact-subtitle'>
          Have a project in mind? Let's build something great together.
        </p>

        <div className='contact-links'>
          <a href='mailto:sockets.might-9b@icloud.com' className='contact-link'>
            <Mail size={24} />
            <span>Email</span>
          </a>

          <a
            href='https://www.linkedin.com/in/daniel-djupvik-sætre-4560a5181'
            target='_blank'
            rel='noopener noreferrer'
            className='contact-link'
          >
            <Linkedin size={24} />
            <span>LinkedIn</span>
          </a>

          <a
            href='https://github.com/danieldjupvik'
            target='_blank'
            rel='noopener noreferrer'
            className='contact-link'
          >
            <Github size={24} />
            <span>GitHub</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className='footer'>
        <p className='footer__copyright'>
          © {new Date().getFullYear()} Daniel Djupvik
        </p>
      </footer>
    </div>
  );
};

export default Projects;
