import { useEffect, useState } from "react";
import "./App.css";

const projects = [
  { number: "01", title: "CSS Magic", category: "FRONTEND DEVELOPMENT", description: "Creative CSS experiments, animations, responsive layouts, and interactive UI components.", technologies: ["HTML", "CSS", "JavaScript"], icon: "✳", color: "blue", link: "" },
  { number: "02", title: "Python Projects", category: "SOFTWARE DEVELOPMENT", description: "Practical Python applications designed to improve programming and problem-solving skills.", technologies: ["Python", "FastAPI"], icon: "Py", color: "purple", link: "" },
  { number: "03", title: "Data Analytics", category: "DATA & INSIGHTS", description: "Explore data, uncover patterns, and communicate insights through useful visualizations.", technologies: ["Python", "SQL", "Analytics"], icon: "↗", color: "green", link: "" },
];

const courses = [
  { number: "01", title: "Web Development", description: "Learn HTML, CSS, JavaScript, and React by building real projects.", level: "BEGINNER", lessons: "Practical learning", icon: "</>" },
  { number: "02", title: "Python Programming", description: "Master Python fundamentals, file handling, functions, and application development.", level: "BEGINNER", lessons: "Learn by coding", icon: "Py" },
  { number: "03", title: "Data Science", description: "Explore data analysis, visualization, statistics, and machine learning.", level: "LEARNING PATH", lessons: "Explore data", icon: "↗" },
];

const posts = [
  { category: "CSS TIPS", title: "Centering elements with Flexbox", description: "Understand how display, align-items, and justify-content work together.", icon: "</>", theme: "post-blue" },
  { category: "PYTHON", title: "Learn Python one step at a time", description: "Build a strong foundation through short examples and coding exercises.", icon: "print()", theme: "post-purple" },
  { category: "DEVELOPER HUMOR", title: "It works on my computer!", description: "A relatable reminder that debugging is part of every developer's journey.", icon: "{ 😅 }", theme: "post-green" },
];

const audioTracks = [
  { id: 1, title: "Welcome to RS Tech", category: "INTRODUCTION", description: "An introduction to the RS Tech learning journey.", src: "" },
  { id: 2, title: "Programming Notes", category: "PROGRAMMING", description: "Short audio lessons about programming concepts.", src: "" },
];

const links = [
  ["home", "Home"], ["about", "About"], ["projects", "Projects"],
  ["videos", "Videos"], ["audio", "Audio"], ["posts", "Posts"],
  ["courses", "Courses"], ["contact", "Contact"],
];

function SectionHeading({ label, title, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{label}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function Brand() {
  return (
    <a className="brand" href="#home" aria-label="RS Tech home">
      <span className="brand-logo">RS</span>
      <span className="brand-name">RS <strong>TECH</strong></span>
      <span className="brand-period">.</span>
    </a>
  );
}

function AudioCard({ track }) {
  const [audioError, setAudioError] = useState(false);

  return (
    <article className="audio-card">
      <div className="audio-artwork" aria-hidden="true">
        <span>♫</span>
        <small>RS TECH AUDIO</small>
      </div>
      <div className="audio-card-content">
        <span className="eyebrow">{track.category}</span>
        <h3>{track.title}</h3>
        <p>{track.description}</p>
        {track.src ? (
          <audio
            controls
            preload="metadata"
            src={track.src}
            onError={() => setAudioError(true)}
            onCanPlay={() => setAudioError(false)}
          >
            Your browser does not support audio playback.
          </audio>
        ) : (
          <p className="audio-placeholder">Audio file not added yet.</p>
        )}
        {audioError && <p className="audio-error" role="alert">Unable to load this audio file. Check its path or URL.</p>}
      </div>
    </article>
  );
}

function getInitialTheme() {
  try {
    const saved = localStorage.getItem("rs-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // Local storage may be unavailable.
  }
  return "light";
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const nextTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("rs-theme", theme);
    } catch {
      // Keep the selected theme for this session if storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return undefined;

    const items = document.querySelectorAll(
      ".section-heading, .about-card, .project-card, .post-card, .course-card, .video-feature, .contact-inner, .audio-card"
    );
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });

    items.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
      element.classList.add("reveal");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <Brand />
          <nav id="primary-nav" className={`nav-links${menuOpen ? " open" : ""}`} aria-label="Main navigation">
            {links.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              type="button"
              className="icon-button"
              onClick={() => setTheme(nextTheme)}
              aria-label={`Switch to ${nextTheme} mode`}
              title={`Switch to ${nextTheme} mode`}
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
            <a className="nav-contact" href="#contact">Let's Connect <span>↗</span></a>
            <button
              type="button"
              className={`menu-toggle${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="primary-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero container" id="home">
          <div className="hero-copy">
            <div className="availability"><span className="status-dot" /><span>WELCOME TO RS TECH</span></div>
            <h1>Learn. Build.<br /><span>Create.</span> With RS Tech.</h1>
            <p className="hero-description">Your space to explore technology, build real projects, learn programming, and discover what you can create with code.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore Projects <span>↗</span></a>
              <a className="button button-secondary" href="#courses">Start Learning <span>→</span></a>
            </div>
            <div className="hero-note"><span className="code-icon">&lt;/&gt;</span><span>LEARN BY DOING. KEEP IMPROVING.</span></div>
            <div className="hero-stats">
              <div><strong>01</strong><span>LEARN</span></div>
              <div><strong>02</strong><span>BUILD</span></div>
              <div><strong>03</strong><span>SHARE</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-label visual-label-top"><span className="status-dot" /> CREATIVITY IN PROGRESS</div>
            <div className="visual-grid" />
            <div className="code-window">
              <div className="window-bar">
                <div className="window-dots"><i /><i /><i /></div>
                <span>rs-tech.jsx</span><span className="window-menu">•••</span>
              </div>
              <div className="code-content">
                <div className="line-number">01</div><code><span className="syntax-purple">const</span> brand = {"{"}</code>
                <div className="line-number">02</div><code>&nbsp; name: <span className="syntax-green">"RS Tech"</span>,</code>
                <div className="line-number">03</div><code>&nbsp; focus: <span className="syntax-green">"Technology"</span>,</code>
                <div className="line-number">04</div><code>&nbsp; mission: <span className="syntax-green">"Keep Learning"</span></code>
                <div className="line-number">05</div><code>{"};"}</code>
                <div className="line-number">06</div><code className="syntax-comment">// Ideas become reality.</code>
                <div className="line-number">07</div><code><span className="syntax-purple">build</span>(brand);<span className="cursor">▋</span></code>
              </div>
            </div>
            <div className="floating-card floating-top"><span className="floating-icon">✳</span><span>Creative Thinking</span></div>
            <div className="floating-card floating-bottom"><span className="floating-number">03</span><span><strong>Build something real.</strong><small>One project at a time.</small></span></div>
            <div className="visual-caption">RS TECH / THE CREATIVE PROCESS</div>
          </div>
          <a className="scroll-cue" href="#about">DISCOVER RS TECH <span>↓</span></a>
        </section>

        <section className="technology-strip">
          <div className="container technology-inner">
            <span className="strip-label">EXPLORING</span><span>HTML & CSS</span><span>JavaScript</span><span>React</span><span>Python</span><span>PostgreSQL</span><span>Data & AI</span>
          </div>
        </section>

        <section className="section container" id="about">
          <SectionHeading label="ABOUT RS TECH" title="Curiosity turns into creation." description="A technology brand built around practical learning, creative experiments, and sharing knowledge." />
          <div className="about-grid">
            <article className="about-card about-card-featured">
              <span className="card-index">01 / THE MISSION</span><div className="about-icon">✳</div>
              <h3>Make technology easier to understand.</h3>
              <p>Explore coding concepts, build practical projects, and share useful knowledge with the technology community.</p>
            </article>
            <article className="about-card">
              <span className="card-index">02 / THE FOCUS</span><div className="about-icon">&lt;/&gt;</div>
              <h3>Learn through building.</h3>
              <p>Explore web development, Python, software engineering, data analytics, and emerging technologies.</p>
            </article>
            <article className="about-card">
              <span className="card-index">03 / THE MINDSET</span><div className="about-icon">↗</div>
              <h3>Keep moving forward.</h3>
              <p>Practice consistently, solve real problems, learn from mistakes, and improve with every project.</p>
            </article>
          </div>
        </section>

        <section className="section section-soft" id="projects">
          <div className="container">
            <div className="section-heading-row">
              <SectionHeading label="THE PROJECT LAB" title="Ideas into projects." description="A growing collection of experiments and applications built with technology." />
              <span className="section-number">01 — PROJECTS</span>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.number}>
                  <div className="project-card-top"><span className="card-index">{project.category}</span><span className="project-number">{project.number}</span></div>
                  <div className={`project-art ${project.color}`}>
                    <div className="art-decoration art-decoration-one" /><div className="art-decoration art-decoration-two" />
                    <span className="project-symbol">{project.icon}</span><span className="art-caption">RS TECH / LAB</span>
                  </div>
                  <div className="project-info">
                    <h3>{project.title}</h3><p>{project.description}</p>
                    <div className="tag-list">{project.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}</div>
                    {project.link ? <a className="card-link" href={project.link} target="_blank" rel="noreferrer">View project <span>↗</span></a> : <span className="coming-soon">PROJECT LINK TO BE ADDED</span>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section container" id="videos">
          <SectionHeading label="WATCH & LEARN" title="See the code in action." description="A place for coding tutorials, CSS experiments, programming demonstrations, and video lessons." />
          <div className="video-feature">
            <div className="video-art">
              <div className="video-grid" />
              <div className="video-code"><span>01</span> display: <b>flex</b>;<br /><span>02</span> justify-content: <b>center</b>;<br /><span>03</span> align-items: <b>center</b>;</div>
              <div className="video-play" aria-hidden="true">▶</div><span className="video-art-caption">CSS / VISUAL LEARNING</span>
            </div>
            <div className="video-copy">
              <span className="eyebrow">RS TECH VIDEO LAB</span><h3>Understand more. Memorize less.</h3>
              <p>Follow practical demonstrations that turn programming concepts into something you can see, test, and understand.</p>
              <div className="video-points"><span><i>✓</i> Practical coding examples</span><span><i>✓</i> Visual explanations</span><span><i>✓</i> Beginner-friendly lessons</span></div>
              <a className="button button-primary" href="#contact">Explore RS Tech <span>↗</span></a>
              <p className="content-note">Real video embeds and channel links can be added when you provide your video URLs.</p>
            </div>
          </div>
        </section>

        <section className="section section-soft" id="audio">
          <div className="container">
            <SectionHeading label="LISTEN & LEARN" title="Ideas worth listening to." description="Explore audio lessons, programming discussions, and future RS Tech audio content." />
            <div className="audio-grid">{audioTracks.map((track) => <AudioCard key={track.id} track={track} />)}</div>
            <p className="content-note">To add audio, place files in public/audio and set each track's src to /audio/your-file.mp3.</p>
          </div>
        </section>

        <section className="section section-soft" id="posts">
          <div className="container">
            <SectionHeading label="THE TECH JOURNAL" title="Useful ideas, simply explained." description="Coding tips, technology articles, mini tutorials, and relatable developer moments." />
            <div className="post-grid">
              {posts.map((post, index) => (
                <article className="post-card" key={post.title}>
                  <div className="post-card-header"><span className="post-category">{post.category}</span><span className="post-number">0{index + 1}</span></div>
                  <div className={`post-graphic ${post.theme}`}><span>{post.icon}</span><span className="post-watermark">RS TECH</span></div>
                  <div className="post-info"><h3>{post.title}</h3><p>{post.description}</p><span className="post-link">POST PREVIEW <span>↗</span></span></div>
                </article>
              ))}
            </div>
            <p className="content-note">These are sample post previews, not published articles. Actual posts and social media links can be connected next.</p>
          </div>
        </section>

        <section className="section container" id="courses">
          <SectionHeading label="THE LEARNING HUB" title="Build skills that matter." description="Learning paths designed to turn curiosity into practical technical skills." />
          <div className="course-grid">
            {courses.map((course) => (
              <article className="course-card" key={course.number}>
                <div className="course-top"><span className="course-number">{course.number}</span><span className="course-level">{course.level}</span></div>
                <div className="course-icon">{course.icon}</div><h3>{course.title}</h3><p>{course.description}</p>
                <div className="course-bottom"><span>{course.lessons}</span><span>↗</span></div>
              </article>
            ))}
          </div>
          <p className="content-note">Course cards are previews. Lessons, course materials, and enrollment links can be added when your content is ready.</p>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-inner">
            <span className="eyebrow">LET'S CONNECT</span><h2>Your next idea<br />starts <span>here.</span></h2>
            <p>Explore projects, discover new skills, and join the journey of learning and creating with RS Tech.</p>
            <div className="contact-actions">
              <a className="button button-primary" href="https://github.com/roshan-sampath-dev/rs-tech-website" target="_blank" rel="noreferrer">Visit GitHub <span>↗</span></a>
              <a className="button button-secondary" href="#home">Back to top ↑</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer container"><Brand /><p>Learn. Build. Create. Keep going.</p><span>© {new Date().getFullYear()} RS Tech</span></footer>
    </>
  );
}

export default App;
