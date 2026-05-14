import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: "50+", label: "Events Hosted" },
    { number: "2K+", label: "Registrations" },
    { number: "98%", label: "Satisfaction" },
  ];

  const features = [
    {
      icon: "⚡",
      title: "Instant Registration",
      desc: "Register for any event in under 60 seconds",
    },
    {
      icon: "🎟️",
      title: "Digital Tickets",
      desc: "Get your ticket instantly after payment",
    },
    {
      icon: "🔒",
      title: "Secure Payments",
      desc: "Your data is always safe with us",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --bg: #0a0a0f;
          --surface: #13131a;
          --card: #1a1a24;
          --accent: #e8c547;
          --accent2: #ff6b35;
          --text: #f0ede6;
          --muted: #7a7a8c;
          --border: rgba(255,255,255,0.07);
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        /* NAV */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 4rem;
          background: rgba(10,10,15,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          color: var(--accent);
          letter-spacing: 0.05em;
        }
        .nav-btn {
          background: var(--accent);
          color: #0a0a0f;
          border: none;
          padding: 0.6rem 1.6rem;
          border-radius: 2rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .nav-btn:hover { background: #f5d55a; transform: translateY(-1px); }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 8rem 4rem 4rem;
          position: relative;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 60% 40%, rgba(232,197,71,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 20% 80%, rgba(255,107,53,0.06) 0%, transparent 50%);
          pointer-events: none;
        }
        .hero-img {
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 48%;
          object-fit: cover;
          opacity: 0.18;
          mask-image: linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%);
          -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 100%);
        }
        .hero-tag {
          display: inline-block;
          background: rgba(232,197,71,0.12);
          border: 1px solid rgba(232,197,71,0.3);
          color: var(--accent);
          padding: 0.4rem 1rem;
          border-radius: 2rem;
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 2rem;
          width: fit-content;
          animation: fadeUp 0.6s ease both;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 900;
          line-height: 1.05;
          max-width: 700px;
          animation: fadeUp 0.6s ease 0.1s both;
        }
        .hero-title span {
          color: var(--accent);
          font-style: italic;
        }
        .hero-sub {
          margin-top: 1.5rem;
          font-size: 1.1rem;
          color: var(--muted);
          max-width: 480px;
          line-height: 1.7;
          font-weight: 300;
          animation: fadeUp 0.6s ease 0.2s both;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2.5rem;
          flex-wrap: wrap;
          animation: fadeUp 0.6s ease 0.3s both;
        }
        .btn-primary {
          background: var(--accent);
          color: #0a0a0f;
          border: none;
          padding: 0.9rem 2.2rem;
          border-radius: 3rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-primary:hover {
          background: #f5d55a;
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(232,197,71,0.25);
        }
        .btn-secondary {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--border);
          padding: 0.9rem 2rem;
          border-radius: 3rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.25s;
        }
        .btn-secondary:hover {
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.04);
        }

        /* STATS */
        .stats-bar {
          display: flex;
          gap: 3rem;
          margin-top: 4rem;
          padding-top: 3rem;
          border-top: 1px solid var(--border);
          animation: fadeUp 0.6s ease 0.4s both;
        }
        .stat-item { }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent);
        }
        .stat-label {
          font-size: 0.85rem;
          color: var(--muted);
          margin-top: 0.2rem;
        }

        /* FEATURES */
        .features {
          padding: 6rem 4rem;
          position: relative;
        }
        .section-label {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1rem;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 700;
          max-width: 500px;
          line-height: 1.2;
          margin-bottom: 3rem;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
        }
        .feature-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 1.2rem;
          padding: 2rem;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent), var(--accent2));
          opacity: 0;
          transition: opacity 0.3s;
        }
        .feature-card:hover { transform: translateY(-4px); border-color: rgba(232,197,71,0.2); }
        .feature-card:hover::before { opacity: 1; }
        .feature-icon { font-size: 2rem; margin-bottom: 1rem; }
        .feature-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          margin-bottom: 0.6rem;
        }
        .feature-desc { color: var(--muted); font-size: 0.9rem; line-height: 1.6; }

        /* CTA */
        .cta {
          margin: 2rem 4rem 6rem;
          background: linear-gradient(135deg, rgba(232,197,71,0.1) 0%, rgba(255,107,53,0.08) 100%);
          border: 1px solid rgba(232,197,71,0.15);
          border-radius: 1.5rem;
          padding: 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 700;
          max-width: 450px;
        }
        .cta-title span { color: var(--accent); font-style: italic; }

        /* REVEAL ANIMATION */
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .nav { padding: 1rem 1.5rem; }
          .hero { padding: 7rem 1.5rem 3rem; }
          .hero-img { display: none; }
          .features { padding: 4rem 1.5rem; }
          .cta { margin: 1rem 1.5rem 4rem; padding: 2.5rem 1.5rem; }
          .stats-bar { gap: 1.5rem; flex-wrap: wrap; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">Eventify</div>
        <button className="nav-btn" onClick={() => navigate("/events")}>
          Browse Events →
        </button>
      </nav>

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg" />
        <img
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
          alt="event"
          className="hero-img"
        />

        <div className="hero-tag">✦ Event Registration Platform</div>

        <h1 className="hero-title">
          Discover &amp; Join <span>Extraordinary</span> Events
        </h1>

        <p className="hero-sub">
          From tech conferences to startup meetups — register, pay, and get your
          ticket in minutes.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate("/events")}>
            View All Events <span>→</span>
          </button>
          <button className="btn-secondary">Learn More</button>
        </div>

        <div className="stats-bar">
          {stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <div className="stat-num">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="reveal">
          <p className="section-label">Why choose us</p>
          <h2 className="section-title">Everything you need, nothing you don't</h2>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta reveal">
        <h2 className="cta-title">
          Ready to find your next <span>great event?</span>
        </h2>
        <button className="btn-primary" onClick={() => navigate("/events")} style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>
          Browse Events →
        </button>
      </section>
    </>
  );
}

export default Home;