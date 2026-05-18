import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Events() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const events = [
    {
      id: 1,
      name: "Tech Conference 2026",
      date: "20 June 2026",
      category: "Technology",
      location: "Chennai, India",
      seats: 120,
      price: "₹499",
      icon: "💻",
      color: "#e8c547",
      desc: "Explore the latest trends in software, cloud, and emerging tech with industry leaders.",
    },
    {
      id: 2,
      name: "AI Workshop",
      date: "15 July 2026",
      category: "Workshop",
      location: "Bangalore, India",
      seats: 60,
      price: "₹299",
      icon: "🤖",
      color: "#ff6b35",
      desc: "Hands-on session covering machine learning, LLMs, and real-world AI applications.",
    },
    {
      id: 3,
      name: "Startup Meetup",
      date: "10 August 2026",
      category: "Networking",
      location: "Mumbai, India",
      seats: 200,
      price: "Free",
      icon: "🚀",
      color: "#6ee7b7",
      desc: "Connect with founders, investors, and builders shaping the startup ecosystem.",
    },
  ];

  const handleRegister = (event) => {
    navigate("/register", { state: { event } });
  };

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
          min-height: 100vh;
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
          cursor: pointer;
        }
        .nav-back {
          background: transparent;
          color: var(--muted);
          border: 1px solid var(--border);
          padding: 0.5rem 1.2rem;
          border-radius: 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .nav-back:hover { color: var(--text); border-color: rgba(255,255,255,0.2); }

        /* PAGE */
        .events-page {
          min-height: 100vh;
          padding: 8rem 4rem 6rem;
          background: var(--bg);
          position: relative;
          overflow: hidden;
        }
        .events-page::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background:
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(232,197,71,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 10% 70%, rgba(255,107,53,0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        /* HEADER */
        .events-header {
          margin-bottom: 3.5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }
        .events-header.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .events-tag {
          display: inline-block;
          background: rgba(232,197,71,0.12);
          border: 1px solid rgba(232,197,71,0.3);
          color: var(--accent);
          padding: 0.35rem 1rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 1.2rem;
        }
        .events-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 4vw, 3.5rem);
          font-weight: 900;
          line-height: 1.1;
        }
        .events-title span { color: var(--accent); font-style: italic; }
        .events-sub {
          margin-top: 0.8rem;
          color: var(--muted);
          font-size: 1rem;
          font-weight: 300;
        }

        /* GRID */
        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.8rem;
        }

        /* EVENT CARD */
        .event-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 1.4rem;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(30px);
          position: relative;
        }
        .event-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .event-card:hover {
          transform: translateY(-6px);
          border-color: rgba(232,197,71,0.2);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        /* CARD TOP BANNER */
        .card-banner {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1.8rem;
          position: relative;
          overflow: hidden;
        }
        .card-banner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
        }
        .card-icon {
          font-size: 2.8rem;
          position: relative;
          z-index: 1;
        }
        .card-category {
          position: relative;
          z-index: 1;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          padding: 0.3rem 0.8rem;
          border-radius: 2rem;
          color: #fff;
        }

        /* CARD BODY */
        .card-body { padding: 1.6rem 1.8rem; }
        .card-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
          line-height: 1.3;
        }
        .card-desc {
          color: var(--muted);
          font-size: 0.88rem;
          line-height: 1.6;
          margin-bottom: 1.2rem;
        }

        /* META ROW */
        .card-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--muted);
        }
        .meta-icon { font-size: 0.9rem; }

        /* CARD FOOTER */
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.2rem;
          border-top: 1px solid var(--border);
        }
        .card-price {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--accent);
        }
        .card-seats {
          font-size: 0.78rem;
          color: var(--muted);
          margin-top: 0.1rem;
        }
        .register-btn {
          background: var(--accent);
          color: #0a0a0f;
          border: none;
          padding: 0.7rem 1.5rem;
          border-radius: 2rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.25s;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .register-btn:hover {
          background: #f5d55a;
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(232,197,71,0.3);
        }

        /* COUNT BADGE */
        .events-count {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--card);
          border: 1px solid var(--border);
          padding: 0.4rem 1rem;
          border-radius: 2rem;
          font-size: 0.85rem;
          color: var(--muted);
          margin-bottom: 2rem;
        }
        .count-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent);
        }

        @media (max-width: 768px) {
          .nav { padding: 1rem 1.5rem; }
          .events-page { padding: 7rem 1.5rem 4rem; }
          .events-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("/")}>Eventify</div>
        <button className="nav-back" onClick={() => navigate("/")}>← Back to Home</button>
      </nav>

      <div className="events-page">
        {/* HEADER */}
        <div className={`events-header ${visible ? "visible" : ""}`}>
          <div className="events-tag">✦ All Events</div>
          <h1 className="events-title">
            Upcoming <span>Events</span>
          </h1>
          <p className="events-sub">Find your next experience and register in seconds.</p>
        </div>

        {/* COUNT */}
        <div className="events-count">
          <span className="count-dot" />
          {events.length} events available
        </div>

        {/* GRID */}
        <div className="events-grid">
          {events.map((event, i) => (
            <div
              className={`event-card ${visible ? "visible" : ""}`}
              key={event.id}
              style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
              onMouseEnter={() => setHoveredId(event.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* BANNER */}
              <div
                className="card-banner"
                style={{ background: `linear-gradient(135deg, ${event.color}33, ${event.color}11)` }}
              >
                <span className="card-icon">{event.icon}</span>
                <span className="card-category">{event.category}</span>
              </div>

              {/* BODY */}
              <div className="card-body">
                <h2 className="card-name">{event.name}</h2>
                <p className="card-desc">{event.desc}</p>

                <div className="card-meta">
                  <div className="meta-item">
                    <span className="meta-icon">📅</span>
                    {event.date}
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">📍</span>
                    {event.location}
                  </div>
                </div>

                <div className="card-footer">
                  <div>
                    <div className="card-price">{event.price}</div>
                    <div className="card-seats">{event.seats} seats available</div>
                  </div>
                  <button
                    className="register-btn"
                    onClick={() => handleRegister(event)}
                  >
                    Register →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Events;