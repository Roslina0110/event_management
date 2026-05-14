import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Ticket() {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;
  const user = location.state?.user;
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const bookingId = `EVT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const qrData = `${event?.name}-${user?.name}-${bookingId}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(qrData)}&bgcolor=1a1a24&color=e8c547&margin=12`;

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => window.print();

  if (!event || !user) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500&display=swap');
          body { background: #0a0a0f; color: #f0ede6; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
          .err { text-align: center; }
          .err h2 { font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 1rem; }
          .err button { background: #e8c547; color: #0a0a0f; border: none; padding: 0.8rem 2rem; border-radius: 2rem; cursor: pointer; font-size: 1rem; }
        `}</style>
        <div className="err">
          <h2>No Ticket Data Found</h2>
          <button onClick={() => navigate("/events")}>Browse Events</button>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --bg: #0a0a0f;
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
          cursor: pointer;
        }
        .nav-step {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: var(--muted);
        }
        .step { padding: 0.3rem 0.8rem; border-radius: 2rem; }
        .step.done { color: var(--accent); }
        .step.active {
          background: rgba(232,197,71,0.12);
          color: var(--accent);
          border: 1px solid rgba(232,197,71,0.3);
        }
        .step-sep { color: var(--border); }

        /* PAGE */
        .ticket-page {
          min-height: 100vh;
          padding: 7rem 2rem 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .ticket-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 50% 30%, rgba(232,197,71,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 20% 80%, rgba(255,107,53,0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        /* SUCCESS BADGE */
        .success-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2.5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }
        .success-badge.visible { opacity: 1; transform: translateY(0); }
        .success-icon {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: rgba(110,231,183,0.12);
          border: 2px solid rgba(110,231,183,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          margin-bottom: 1rem;
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s both;
        }
        .success-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.3rem;
        }
        .success-sub { color: var(--muted); font-size: 0.95rem; }

        /* TICKET CARD — boarding pass style */
        .ticket-wrap {
          width: 100%;
          max-width: 640px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease 0.2s;
        }
        .ticket-wrap.visible { opacity: 1; transform: translateY(0); }

        .ticket-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 1.6rem;
          overflow: hidden;
          position: relative;
        }

        /* TOP SECTION */
        .ticket-top {
          padding: 2rem 2.2rem;
          background: linear-gradient(135deg, rgba(232,197,71,0.12) 0%, rgba(255,107,53,0.06) 100%);
          border-bottom: none;
          position: relative;
          overflow: hidden;
        }
        .ticket-top::after {
          content: '🎫';
          position: absolute;
          right: 1.5rem;
          bottom: -0.5rem;
          font-size: 6rem;
          opacity: 0.07;
        }
        .ticket-org {
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.6rem;
        }
        .ticket-event-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 900;
          line-height: 1.15;
          margin-bottom: 0.5rem;
        }
        .ticket-date-loc {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .ticket-meta-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.88rem;
          color: var(--muted);
        }

        /* TEAR LINE */
        .tear-line {
          display: flex;
          align-items: center;
          position: relative;
          margin: 0;
        }
        .tear-circle {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: var(--bg);
          flex-shrink: 0;
        }
        .tear-circle.left { margin-left: -14px; }
        .tear-circle.right { margin-right: -14px; }
        .tear-dashes {
          flex: 1;
          border-top: 2px dashed rgba(255,255,255,0.08);
          margin: 0 0.5rem;
        }

        /* MIDDLE SECTION */
        .ticket-middle {
          padding: 1.8rem 2.2rem;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1.5rem;
          border-bottom: none;
        }
        .ticket-field { }
        .field-label {
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.35rem;
        }
        .field-value {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text);
        }
        .field-value.mono {
          font-family: 'Space Mono', monospace;
          font-size: 0.85rem;
          color: var(--accent);
        }

        /* BOOKING ID ROW */
        .booking-row {
          padding: 1.2rem 2.2rem;
          background: rgba(232,197,71,0.04);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.8rem;
        }
        .booking-id-wrap { display: flex; align-items: center; gap: 0.8rem; }
        .booking-label {
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .booking-id {
          font-family: 'Space Mono', monospace;
          font-size: 1.1rem;
          color: var(--accent);
          letter-spacing: 0.12em;
        }
        .copy-btn {
          background: rgba(232,197,71,0.1);
          border: 1px solid rgba(232,197,71,0.2);
          color: var(--accent);
          padding: 0.3rem 0.8rem;
          border-radius: 1rem;
          font-size: 0.78rem;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .copy-btn:hover { background: rgba(232,197,71,0.18); }

        /* QR SECTION */
        .ticket-bottom {
          padding: 1.8rem 2.2rem;
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .qr-wrap {
          flex-shrink: 0;
          background: #1a1a24;
          border: 1px solid var(--border);
          border-radius: 1rem;
          padding: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .qr-wrap img { border-radius: 0.5rem; display: block; }
        .qr-info { flex: 1; }
        .qr-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        .qr-desc {
          color: var(--muted);
          font-size: 0.85rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .valid-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(110,231,183,0.08);
          border: 1px solid rgba(110,231,183,0.2);
          color: #6ee7b7;
          padding: 0.3rem 0.8rem;
          border-radius: 2rem;
          font-size: 0.78rem;
        }
        .valid-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #6ee7b7;
          animation: pulse 1.5s ease-in-out infinite;
        }

        /* ACTIONS */
        .ticket-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .btn-primary {
          background: var(--accent);
          color: #0a0a0f;
          border: none;
          padding: 0.85rem 2rem;
          border-radius: 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s;
        }
        .btn-primary:hover {
          background: #f5d55a;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(232,197,71,0.25);
        }
        .btn-outline {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--border);
          padding: 0.85rem 2rem;
          border-radius: 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.25s;
        }
        .btn-outline:hover {
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.04);
        }

        @keyframes popIn {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* PRINT */
        @media print {
          .nav, .ticket-actions, .nav-step { display: none !important; }
          .ticket-page { padding: 1rem; }
          body { background: white; color: black; }
          .ticket-card { border: 1px solid #ccc; }
        }

        @media (max-width: 600px) {
          .nav { padding: 1rem 1.5rem; }
          .nav-step { display: none; }
          .ticket-page { padding: 6rem 1rem 3rem; }
          .ticket-top, .ticket-middle, .ticket-bottom, .booking-row { padding: 1.4rem; }
          .ticket-middle { grid-template-columns: 1fr 1fr; }
          .ticket-bottom { flex-direction: column; align-items: flex-start; }
          .ticket-event-name { font-size: 1.4rem; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("/")}>Eventify</div>
        <div className="nav-step">
          <span className="step done">✓ Register</span>
          <span className="step-sep">›</span>
          <span className="step done">✓ Payment</span>
          <span className="step-sep">›</span>
          <span className="step active">Ticket</span>
        </div>
      </nav>

      <div className="ticket-page">

        {/* SUCCESS */}
        <div className={`success-badge ${visible ? "visible" : ""}`}>
          <div className="success-icon">✓</div>
          <h1 className="success-title">You're Registered!</h1>
          <p className="success-sub">Your ticket has been confirmed. See you there!</p>
        </div>

        {/* TICKET */}
        <div className={`ticket-wrap ${visible ? "visible" : ""}`}>
          <div className="ticket-card">

            {/* TOP */}
            <div className="ticket-top">
              <div className="ticket-org">✦ Eventify · Official Ticket</div>
              <div className="ticket-event-name">{event.name}</div>
              <div className="ticket-date-loc">
                <div className="ticket-meta-item">📅 {event.date}</div>
                <div className="ticket-meta-item">📍 {event.location || "Trivandrum, India"}</div>
              </div>
            </div>

            {/* TEAR LINE */}
            <div className="tear-line">
              <div className="tear-circle left" />
              <div className="tear-dashes" />
              <div className="tear-circle right" />
            </div>

            {/* MIDDLE */}
            <div className="ticket-middle">
              <div className="ticket-field">
                <div className="field-label">Attendee</div>
                <div className="field-value">{user.name}</div>
              </div>
              <div className="ticket-field">
                <div className="field-label">Email</div>
                <div className="field-value" style={{ fontSize: '0.82rem', wordBreak: 'break-all' }}>{user.email}</div>
              </div>
              <div className="ticket-field">
                <div className="field-label">Phone</div>
                <div className="field-value">{user.phone}</div>
              </div>
              <div className="ticket-field">
                <div className="field-label">Event Type</div>
                <div className="field-value">{event.category || "Conference"}</div>
              </div>
              <div className="ticket-field">
                <div className="field-label">Amount Paid</div>
                <div className="field-value" style={{ color: '#6ee7b7' }}>{event.price || "₹500"}</div>
              </div>
              <div className="ticket-field">
                <div className="field-label">Status</div>
                <div className="field-value" style={{ color: '#6ee7b7' }}>✓ Confirmed</div>
              </div>
            </div>

            {/* BOOKING ID */}
            <div className="booking-row">
              <div className="booking-id-wrap">
                <div>
                  <div className="booking-label">Booking ID</div>
                  <div className="booking-id">{bookingId}</div>
                </div>
              </div>
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? "✓ Copied!" : "Copy ID"}
              </button>
            </div>

            {/* TEAR LINE */}
            <div className="tear-line">
              <div className="tear-circle left" />
              <div className="tear-dashes" />
              <div className="tear-circle right" />
            </div>

            {/* QR */}
            <div className="ticket-bottom">
              <div className="qr-wrap">
                <img src={qrUrl} alt="QR Code" width={160} height={160} />
              </div>
              <div className="qr-info">
                <div className="qr-title">Scan at Entry</div>
                <div className="qr-desc">
                  Show this QR code at the event entrance. Each ticket is valid for one person only.
                </div>
                <div className="valid-badge">
                  <div className="valid-dot" />
                  Valid Ticket
                </div>
              </div>
            </div>

          </div>

          {/* ACTIONS */}
          <div className="ticket-actions">
            <button className="btn-primary" onClick={handlePrint}>🖨️ Print Ticket</button>
            <button className="btn-outline" onClick={() => navigate("/events")}>Browse More Events</button>
          </div>
        </div>

      </div>
    </>
  );
}

export default Ticket;