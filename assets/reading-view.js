import { i as loadReact } from './framework-D_rUT4EX.js';
const React = loadReact();
const h = React.createElement;

// A text-first view of the same portfolio content, for reading on any screen.
export default function ReadingView({ projects, onBack }) {
  const backButton = React.useRef(null);
  React.useEffect(() => { backButton.current?.focus(); }, []);
  const external = (href, label) => h('a', { href, target: '_blank', rel: 'noopener noreferrer' }, label);
  return h('section', { className: 'reading-view', 'aria-label': 'Reading mode', tabIndex: 0 },
    h('article', { className: 'reading-document' },
      h('button', { type: 'button', className: 'reading-back retro-btn', onClick: onBack, ref: backButton }, '← Back to desktop'),
      h('h1', null, 'Reedhan Garg'),
      h('p', { className: 'reading-intro' }, 'I’m Reedhan Garg, a student at Delhi Technological University. I like understanding how things work—and then trying to build them myself.'),
      h('p', null, 'My interests live somewhere between web development, cybersecurity, competitive programming, and the universe. Currently learning, experimenting, and making things with Python and C.'),
      h('nav', { className: 'reading-links', 'aria-label': 'Contact and social links' },
        external('https://github.com/reedhan-g', 'GitHub'),
        external('https://www.linkedin.com/in/reedhan-garg/', 'LinkedIn'),
        h('a', { href: 'mailto:reedhangarg08@gmail.com' }, 'Email')),
      h('section', { className: 'reading-section' },
        h('h2', null, 'Education'),
        h('h3', null, 'B.Tech. in Computer Science and Engineering'),
        h('p', null, 'Delhi Technological University · New Delhi')),
      h('section', { className: 'reading-section' },
        h('h2', null, 'Projects'),
        ...projects.map(project => h('article', { className: 'reading-project', key: project.repo },
          h('h3', null, project.name),
          h('p', null, project.desc),
          h('p', { className: 'reading-project-tags' }, project.tags),
          h('div', { className: 'reading-links' },
            project.url && external(project.url, 'Visit live site'),
            project.repo && external('https://github.com/reedhan-g/' + project.repo, 'View on GitHub'))))),
      h('section', { className: 'reading-section' },
        h('h2', null, 'Skills & interests'),
        h('p', null, 'Python · C · HTML · Web development · Cybersecurity · Competitive programming')),
      h('section', { className: 'reading-section' },
        h('h2', null, 'Contact'),
        h('p', null, 'Want to get in touch?'),
        h('a', { href: 'mailto:reedhangarg08@gmail.com' }, 'reedhangarg08@gmail.com'))));
}
