import DonationPage from "./DonationPage";
import DonationSuccess from "./DonationSuccess";

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";
import { useEffect, type ReactNode } from "react";
import "./App.css";

const photos = {
  hero: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1400&q=85",
  support:
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1000&q=85",
  volunteers:
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=85",
  healthcare:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85",
  community:
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1400&q=85",
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function Navbar() {
  return (
    <header className="navbar">
  <Link to="/" className="brand" aria-label="Hope in Bloom home">
    <span className="brand-flower" aria-hidden="true">✿</span>
    <span className="brand-name">
      <strong>hope in bloom</strong>
      <small>CANCER AWARENESS & SUPPORT</small>
    </span>
  </Link>

  <nav className="main-nav" aria-label="Main navigation">
    <NavLink to="/" end>Home</NavLink>
    <NavLink to="/about">About Us</NavLink>
    <NavLink to="/donate">Donate</NavLink>
  </nav>

  <Link to="/donate" className="nav-button">
    Donate Now <span aria-hidden="true">↗</span>
  </Link>
</header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="footer-brand">
        <span aria-hidden="true">✿</span> hope in bloom
      </Link>
      <p>Care for the journey. Hope for tomorrow.</p>
      <small>
        A cancer-awareness and support initiative concept based in the Philippines.
      </small>
      <a className="back-to-top" href="#top" onClick={(event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}>
        Back to top ↑
      </a>
    </footer>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow"><span className="eyebrow-dot" />{children}</span>;
}

function Home() {
  const programs = [
    {
      number: "01",
      tag: "AWARENESS & EDUCATION",
      title: "Knowledge can make a difference",
      description:
        "Share clear, reliable information about cancer, prevention, screening, and the importance of speaking with qualified healthcare professionals.",
      image: photos.healthcare,
      alt: "Healthcare professional in a clinical setting",
    },
    {
      number: "02",
      tag: "PATIENT & FAMILY SUPPORT",
      title: "A place to feel understood",
      description:
        "Help patients and loved ones discover emotional support, counseling, support groups, and organizations that understand their experiences.",
      image: photos.support,
      alt: "A group of people spending time and supporting one another",
    },
    {
      number: "03",
      tag: "COMMUNITY ACTION",
      title: "Small acts can reach far",
      description:
        "Encourage community participation, volunteer initiatives, and fundraising efforts that can help connect people with support.",
      image: photos.community,
      alt: "Community volunteers working together",
    },
  ];

  return (
    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <Eyebrow>ROOTED IN COMPASSION · PHILIPPINES</Eyebrow>
          <h1>
            In every
            <br />
            difficult season,
            <br />
            <em>hope can bloom.</em>
          </h1>
          <p className="hero-description">
            A cancer journey is never just about a diagnosis. It is about
            people, families, courage, and the support that helps them keep
            going. We believe no one should have to face it alone.
          </p>
          <div className="hero-actions">
            <Link to="/about" className="primary-button">
              Discover our purpose <span aria-hidden="true">↗</span>
            </Link>
            <a href="#our-work" className="text-link">
              Explore our focus <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-note">
            <span className="note-flower" aria-hidden="true">✿</span>
            <p>
              <strong>For every patient. For every family.</strong>
              <br />
              For every reason to keep hoping.
            </p>
          </div>
        </div>

        <div className="hero-visual">
          <img
            className="hero-photo"
            src={photos.hero}
            alt="People coming together in care and community"
            fetchPriority="high"
          />
          <div className="photo-caption">
            <span className="caption-flower" aria-hidden="true">✿</span>
            <div>
              <strong>Care makes a difference.</strong>
              <p>Sometimes, hope begins with being heard.</p>
            </div>
          </div>
          <span className="hero-side-note">CARE · COMMUNITY · HOPE</span>
        </div>
      </section>

      <section className="belief-strip" aria-label="Our belief">
        <span className="belief-mark" aria-hidden="true">“</span>
        <p>
          We may not be able to make every part of the journey easy.
          <strong> But we can help people feel less alone.</strong>
        </p>
      </section>

      <section className="work-section" id="our-work">
        <div className="section-heading">
          <Eyebrow>WHAT HOPE IN BLOOM STANDS FOR</Eyebrow>
          <h2>Care beyond<br /><em>the diagnosis.</em></h2>
          <p>
            Cancer support means caring for the whole person. From awareness
            and emotional care to community action, every thoughtful effort
            can make a difference.
          </p>
        </div>

        <div className="program-list">
          {programs.map((program) => (
            <article className="program-card" key={program.number}>
              <div className="program-image-wrap">
                <img src={program.image} alt={program.alt} loading="lazy" />
                <span className="image-number">{program.number}</span>
              </div>
              <div className="program-copy">
                <span className="program-tag">{program.tag}</span>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="awareness-section">
        <div className="awareness-copy">
          <Eyebrow>KNOWLEDGE IS ALSO CARE</Eyebrow>
          <h2>Awareness today.<br /><em>More informed choices tomorrow.</em></h2>
          <p>
            Learning about cancer and understanding recommended screening can
            help people make informed decisions about their health. We aim to
            make trustworthy information easier to find and encourage
            conversations with qualified health professionals.
          </p>
          <p className="disclaimer">
            Screening recommendations vary depending on age, personal and
            family history, and individual risk. A healthcare professional can
            help determine what is appropriate.
          </p>
        </div>
        <div className="awareness-steps">
          <div>
            <span>01</span>
            <p><strong>Learn</strong>Find information from reliable health organizations.</p>
          </div>
          <div>
            <span>02</span>
            <p><strong>Ask</strong>Talk with a qualified healthcare professional.</p>
          </div>
          <div>
            <span>03</span>
            <p><strong>Share</strong>Help others discover trustworthy information and support.</p>
          </div>
        </div>
      </section>

      <section className="local-resources">
        <div className="resource-intro">
          <Eyebrow>HERE IN THE PHILIPPINES</Eyebrow>
          <h2>Support starts<br /><em>with knowing where to turn.</em></h2>
          <p>
            Families should not have to navigate every question alone.
            Established organizations can help people learn about available
            programs, eligibility, and ways to ask for assistance.
          </p>
        </div>
        <div className="resource-links">
          <a href="https://www.philcancer.org.ph/" target="_blank" rel="noopener noreferrer">
            <span>
              <strong>Philippine Cancer Society</strong>
              <small>Cancer information and patient support resources</small>
            </span>
            <span className="resource-arrow" aria-hidden="true">↗</span>
          </a>
          <a href="https://kythe.org/" target="_blank" rel="noopener noreferrer">
            <span>
              <strong>Kythe Foundation</strong>
              <small>Psychosocial support for children with cancer and other illnesses</small>
            </span>
            <span className="resource-arrow" aria-hidden="true">↗</span>
          </a>
          <a href="https://www.philcancer.org.ph/support/patient-support/find-medical-assistance" target="_blank" rel="noopener noreferrer">
            <span>
              <strong>Find Medical Assistance</strong>
              <small>Explore patient assistance information in the Philippines</small>
            </span>
            <span className="resource-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
<section className="donation-section">
  <div className="donation-decoration" aria-hidden="true">✿</div>

  <div className="donation-content">
    <Eyebrow>BE PART OF SOMETHING MEANINGFUL</Eyebrow>

    <h2>
      Your kindness can help
      <br />
      <em>hope continue to bloom.</em>
    </h2>

    <p>
      Every act of generosity can help make a difference.
      Your support can contribute to our efforts in promoting
      cancer awareness, sharing helpful resources, and encouraging
      compassionate support for patients and their families.
    </p>

    <Link to="/donate" className="donation-button">
      Make a Donation <span aria-hidden="true">↗</span>
    </Link>

    <small>
      Every contribution matters. Thank you for being part of the journey.
    </small>
  </div>

  <div className="donation-flower" aria-hidden="true">✿</div>
</section>

      <section className="volunteer-section">
        <div className="volunteer-image">
          <img
            src={photos.community}
            alt="Volunteers joining hands in a community outreach activity"
            loading="lazy"
          />
          <span className="image-stamp">TOGETHER, WE CAN</span>
        </div>
        <div className="volunteer-copy">
          <Eyebrow>BE PART OF THE CIRCLE OF CARE</Eyebrow>
          <h2>There is always room<br /><em>for kindness.</em></h2>
          <p>
            Meaningful change can begin with a simple act: sharing reliable
            information, checking on a family, supporting a local initiative,
            or giving time to a community effort. Hope in Bloom believes that
            every helping hand can make someone feel seen.
          </p>
          <Link to="/about" className="text-link">
            Learn about our purpose <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="closing-section">
        <span className="closing-flower" aria-hidden="true">✿</span>
        <Eyebrow>A SMALL ACT CAN MEAN SO MUCH</Eyebrow>
        <h2>Let's help hope<br /><em>take root.</em></h2>
        <p>
          More understanding. More support. More reasons for people affected
          by cancer to feel seen, heard, and cared for.
        </p>
        <Link to="/about" className="light-button">
          Read our story <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}

function About() {
  const values = [
    {
      icon: "♡",
      title: "Compassion",
      text: "Listening to patients and families without judgment and treating every experience with care.",
    },
    {
      icon: "✿",
      title: "Dignity",
      text: "Respecting each person's story, choices, needs, and right to be heard.",
    },
    {
      icon: "✳",
      title: "Community",
      text: "Bringing people together to share knowledge, encouragement, and meaningful support.",
    },
    {
      icon: "☼",
      title: "Hope",
      text: "Helping people find trustworthy resources and reminding them that support matters.",
    },
  ];

  return (
    <main id="top">
      <section className="about-hero">
        <Eyebrow>GET TO KNOW HOPE IN BLOOM</Eyebrow>
        <h1>Our heart is in<br /><em>every story.</em></h1>
        <p>
          A cancer-awareness and support initiative shaped by a personal
          experience and the belief that care, understanding, and community
          can make difficult journeys feel less lonely.
        </p>
      </section>

      <section className="founder-section">
        <div className="founder-portrait">
  <img
    src="/AngelikaPic.png"
    alt="Angelika Renee L. Serrano, founder of Hope in Bloom"
  />
  <small>FOUNDER</small>
</div>
        <div className="founder-copy">
          <Eyebrow>MEET THE FOUNDER</Eyebrow>
          <h2>Angelika Renee L. Serrano</h2>
          <span className="founder-role">Founder of Hope in Bloom</span>
          <p>
            Hope in Bloom was inspired by my dad's experience battling cancer.
            Seeing someone you love go through such a difficult journey makes
            you realize that cancer affects more than a person's physical
            health. It also touches the emotions, routines, and lives of the
            people around them.
          </p>
          <p>
            I wanted to create something that could help bring awareness,
            understanding, and encouragement to people who are facing similar
            experiences. I know that being part of this battle is not easy,
            and even small forms of support can mean a lot along the way.
          </p>
          <p>
            The name Hope in Bloom reflects what I wish this initiative could
            represent: a little hope growing even in the middle of difficult
            seasons. My hope is to help people feel that they are seen,
            supported, and not alone.
          </p>
        </div>
      </section>

      <section className="story-section">
        <div className="story-label">
          <Eyebrow>01 / OUR STORY</Eyebrow>
          <span className="story-flower" aria-hidden="true">✿</span>
        </div>
        <div className="story-copy">
          <h2>A little more care.<br />A little less alone.</h2>
          <p>
            Cancer affects more than physical health. It can affect a family's
            emotions, finances, routines, and sense of security. The journey
            can feel overwhelming for patients and their loved ones.
          </p>
          <p>
            Hope in Bloom is built around the belief that support should reach
            beyond the hospital. Patients and families deserve reliable
            information, emotional care, practical resources, and a community
            that treats them with kindness.
          </p>
          <p>
            Our name represents the possibility of growth during difficult
            seasons. Hope does not always arrive all at once. Sometimes it
            begins with one person listening, one family receiving help, or
            one conversation that encourages someone to seek care.
          </p>
        </div>
      </section>

      <section className="mission-section">
        <article>
          <Eyebrow>OUR MISSION</Eyebrow>
          <h2>Make cancer support more compassionate and accessible.</h2>
          <p>
            We aim to promote cancer awareness, encourage support for
            research, connect people with trustworthy resources, and
            highlight the emotional and practical needs of patients and
            their families.
          </p>
        </article>
        <article>
          <Eyebrow>OUR VISION</Eyebrow>
          <h2>A world where no one feels forgotten.</h2>
          <p>
            We envision communities where people affected by cancer are
            treated with dignity, can find helpful information, and are
            surrounded by people who care.
          </p>
        </article>
      </section>

      <section className="values-section">
        <div className="section-heading">
          <Eyebrow>02 / WHAT GUIDES US</Eyebrow>
          <h2>The values at the<br /><em>heart of our work.</em></h2>
          <p>These principles shape the kind of support we believe every person deserves.</p>
        </div>
        <div className="values-grid">
          {values.map((value, index) => (
            <article className="value-card" key={value.title}>
              <span className="value-number">0{index + 1}</span>
              <span className="value-icon" aria-hidden="true">{value.icon}</span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-work">
        <Eyebrow>03 / HOW WE HOPE TO HELP</Eyebrow>
        <h2>Care that reaches<br /><em>beyond treatment.</em></h2>
        <div className="work-list">
          <article>
            <span className="work-number">01</span>
            <div>
              <h3>Research and progress</h3>
              <p>Encourage support for research into cancer prevention, diagnosis, treatments, and possible cures.</p>
            </div>
          </article>
          <article>
            <span className="work-number">02</span>
            <div>
              <h3>Patient and family support</h3>
              <p>Promote access to counseling, support groups, educational resources, and compassionate guidance.</p>
            </div>
          </article>
          <article>
            <span className="work-number">03</span>
            <div>
              <h3>Financial and practical assistance</h3>
              <p>Help people discover established organizations that may offer transportation, lodging, food assistance, or other support, subject to their current programs and eligibility.</p>
            </div>
          </article>
          <article>
            <span className="work-number">04</span>
            <div>
              <h3>Awareness and early detection</h3>
              <p>Share reliable information and encourage conversations with healthcare professionals about appropriate screening.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="team-belief-section">
        <div className="team-belief-mark" aria-hidden="true">✿</div>
        <div>
          <Eyebrow>THE PEOPLE BEHIND THE PURPOSE</Eyebrow>
          <h2>A shared purpose<br /><em>makes a stronger community.</em></h2>
          <p>
            Hope in Bloom is supported by a team that shares the same purpose
            of promoting cancer awareness, compassion, and support. We believe
            that meaningful work grows through cooperation, shared
            responsibility, and people who are willing to make a difference.
          </p>
        </div>
      </section>

      <section className="about-image-section">
        <img
          src={photos.community}
          alt="People coming together in a community support activity"
          loading="lazy"
        />
        <div>
          <Eyebrow>OUR BELIEF, ALWAYS</Eyebrow>
          <h2>Every person matters.<br /><em>Every act of care counts.</em></h2>
          <p>
            Thank you for learning about Hope in Bloom and the people who
            deserve care throughout their cancer journey.
          </p>
          <Link to="/" className="primary-button">Back to Home <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="website">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Navbar />
        <div id="main-content">
          <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/donate" element={<DonationPage />} />
  <Route path="/donation-success" element={<DonationSuccess />} />
  <Route path="*" element={<Home />} />
</Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
