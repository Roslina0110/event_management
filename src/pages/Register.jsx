import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

<<<<<<< HEAD
// Use environment variable for API URL - falls back to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

=======
>>>>>>> 46f457172239a81233c93f8bc57ef3946d8e8075
function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedEvent = location.state?.event;

  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
<<<<<<< HEAD
      await axios.post(`${API_URL}/registration`, {
=======
      await axios.post('http://localhost:3000/registration', {
>>>>>>> 46f457172239a81233c93f8bc57ef3946d8e8075
        ...formData,
        eventName: selectedEvent?.name
      });
      navigate("/payment", { state: { event: selectedEvent, user: formData } });
    } catch (error) {
      if (error.response) {
        alert(`Registration Failed: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
<<<<<<< HEAD
        alert("Cannot reach server. Please try again later.");
=======
        alert("Cannot reach server. Is NestJS running on port 3000?");
>>>>>>> 46f457172239a81233c93f8bc57ef3946d8e8075
      } else {
        alert("Registration Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!selectedEvent) {
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
          <h2>No event selected</h2>
          <button onClick={() => navigate("/events")}>Browse Events</button>
        </div>
      </>
    );
  }

  const fields = [
    { name: 'name',  label: 'Full Name',     type: 'text',  placeholder: 'John Doe',          icon: '👤' },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com',  icon: '✉️' },
    { name: 'phone', label: 'Phone Number',  type: 'text',  placeholder: '+91 98765 43210',   icon: '📱' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --bg: #0a0a0f;
          --card: #1a1a24;
          --accent: #e8c547;
          --accent2: #ff6b35;
          --text: #f0ede6;
          --muted: #7a7a8c;
          --border: rgba(255,255,255,0.07);
          --input-bg: #13131a;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
        }

<<<<<<< HEAD
=======
        /* NAV */
>>>>>>> 46f457172239a81233c93f8bc57ef3946d8e8075
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
        .step.active {
          background: rgba(232,197,71,0.12);
          color: var(--accent);
          border: 1px solid rgba(232,197,71,0.3);
        }
        .step-sep { color: var(--border); }

<<<<<<< HEAD
=======
        /* PAGE */
>>>>>>> 46f457172239a81233c93f8bc57ef3946d8e8075
        .register-page {
          min-height: 100vh;
          padding: 7rem 4rem 4rem;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 2.5rem;
          position: relative;
          overflow: hidden;
        }
        .register-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 50% 40% at 20% 30%, rgba(232,197,71,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 80% 70%, rgba(255,107,53,0.05) 0%, transparent 50%);
          pointer-events: none;
        }

<<<<<<< HEAD
=======
        /* EVENT CARD (left) */
>>>>>>> 46f457172239a81233c93f8bc57ef3946d8e8075
        .event-sidebar {
          width: 300px;
          flex-shrink: 0;
          position: sticky;
          top: 7rem;
          animation: fadeUp 0.5s ease both;
        }
        .event-info-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 1.4rem;
          overflow: hidden;
        }
        .event-info-banner {
          padding: 2rem 1.8rem;
          background: linear-gradient(135deg, rgba(232,197,71,0.15), rgba(255,107,53,0.08));
          border-bottom: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }
        .event-info-banner::after {
          content: '🎫';
          position: absolute;
          right: 1rem;
          bottom: -0.5rem;
          font-size: 4rem;
          opacity: 0.15;
        }
        .event-info-tag {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.8rem;
        }
        .event-info-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 0.5rem;
        }
        .event-info-date {
          color: var(--muted);
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .event-info-body { padding: 1.5rem 1.8rem; }
        .info-row {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.7rem 0;
          border-bottom: 1px solid var(--border);
          font-size: 0.88rem;
        }
        .info-row:last-child { border-bottom: none; }
        .info-row .info-icon { font-size: 1rem; }
        .info-row .info-label { color: var(--muted); font-size: 0.78rem; display: block; }
        .info-row .info-val { font-weight: 500; }

<<<<<<< HEAD
=======
        /* FORM (right) */
>>>>>>> 46f457172239a81233c93f8bc57ef3946d8e8075
        .register-form-wrap {
          flex: 1;
          max-width: 480px;
          animation: fadeUp 0.5s ease 0.1s both;
        }
        .form-tag {
          display: inline-block;
          background: rgba(232,197,71,0.12);
          border: 1px solid rgba(232,197,71,0.3);
          color: var(--accent);
          padding: 0.35rem 1rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .form-sub {
          color: var(--muted);
          font-size: 0.9rem;
          margin-bottom: 2rem;
          font-weight: 300;
        }

        .form-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 1.4rem;
          padding: 2rem;
        }

<<<<<<< HEAD
=======
        /* INPUT GROUP */
>>>>>>> 46f457172239a81233c93f8bc57ef3946d8e8075
        .input-group { margin-bottom: 1.3rem; }
        .input-label {
          display: block;
          font-size: 0.78rem;
          color: var(--muted);
          margin-bottom: 0.5rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 1rem;
          font-size: 1rem;
          pointer-events: none;
          z-index: 1;
        }
        .input-field {
          width: 100%;
          background: var(--input-bg);
          border: 1px solid var(--border);
          border-radius: 0.7rem;
          padding: 0.85rem 1rem 0.85rem 2.8rem;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          transition: all 0.2s;
          outline: none;
        }
        .input-field:focus {
          border-color: rgba(232,197,71,0.4);
          background: #16161f;
          box-shadow: 0 0 0 3px rgba(232,197,71,0.07);
        }
        .input-field.focused { border-color: rgba(232,197,71,0.3); }
        .input-field::placeholder { color: #3a3a4a; }

<<<<<<< HEAD
=======
        /* SUBMIT BUTTON */
>>>>>>> 46f457172239a81233c93f8bc57ef3946d8e8075
        .submit-btn {
          width: 100%;
          margin-top: 0.5rem;
          background: var(--accent);
          color: #0a0a0f;
          border: none;
          padding: 1rem;
          border-radius: 0.8rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .submit-btn:hover:not(:disabled) {
          background: #f5d55a;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(232,197,71,0.25);
        }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(0,0,0,0.3);
          border-top-color: #0a0a0f;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .form-note {
          margin-top: 1rem;
          text-align: center;
          font-size: 0.8rem;
          color: var(--muted);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 860px) {
          .nav { padding: 1rem 1.5rem; }
          .nav-step { display: none; }
          .register-page { flex-direction: column; align-items: center; padding: 7rem 1.5rem 3rem; }
          .event-sidebar { width: 100%; position: static; }
          .register-form-wrap { width: 100%; }
        }
      `}</style>

<<<<<<< HEAD
=======
      {/* NAV */}
>>>>>>> 46f457172239a81233c93f8bc57ef3946d8e8075
      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("/")}>Eventify</div>
        <div className="nav-step">
          <span className="step active">Register</span>
          <span className="step-sep">›</span>
          <span className="step">Payment</span>
          <span className="step-sep">›</span>
          <span className="step">Ticket</span>
        </div>
      </nav>

      <div className="register-page">
<<<<<<< HEAD
=======

        {/* EVENT SIDEBAR */}
>>>>>>> 46f457172239a81233c93f8bc57ef3946d8e8075
        <div className="event-sidebar">
          <div className="event-info-card">
            <div className="event-info-banner">
              <div className="event-info-tag">✦ You're registering for</div>
              <div className="event-info-name">{selectedEvent.name}</div>
              <div className="event-info-date">📅 {selectedEvent.date}</div>
            </div>
            <div className="event-info-body">
              <div className="info-row">
                <span className="info-icon">📍</span>
                <div>
                  <span className="info-label">Location</span>
                  <span className="info-val">{selectedEvent.location || 'India'}</span>
                </div>
              </div>
              <div className="info-row">
                <span className="info-icon">🎟️</span>
                <div>
                  <span className="info-label">Entry Fee</span>
                  <span className="info-val">{selectedEvent.price || '₹500'}</span>
                </div>
              </div>
              <div className="info-row">
                <span className="info-icon">💺</span>
                <div>
                  <span className="info-label">Seats Available</span>
                  <span className="info-val">{selectedEvent.seats || '100'} seats</span>
                </div>
              </div>
            </div>
          </div>
        </div>

<<<<<<< HEAD
=======
        {/* FORM */}
>>>>>>> 46f457172239a81233c93f8bc57ef3946d8e8075
        <div className="register-form-wrap">
          <div className="form-tag">✦ Step 1 of 3</div>
          <h1 className="form-title">Register for Event</h1>
          <p className="form-sub">Fill in your details to secure your spot.</p>

          <div className="form-card">
            <form onSubmit={handleSubmit}>
              {fields.map((field) => (
                <div className="input-group" key={field.name}>
                  <label className="input-label">{field.label}</label>
                  <div className="input-wrap">
                    <span className="input-icon">{field.icon}</span>
                    <input
                      className={`input-field ${focused === field.name ? 'focused' : ''}`}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onFocus={() => setFocused(field.name)}
                      onBlur={() => setFocused('')}
                      required
                    />
                  </div>
                </div>
              ))}

              <button className="submit-btn" type="submit" disabled={loading}>
                {loading ? (
                  <><div className="spinner" /> Saving Registration...</>
                ) : (
                  <>Proceed to Payment →</>
                )}
              </button>

              <div className="form-note">
                🔒 Your information is safe and secure
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

<<<<<<< HEAD
export default Register;
=======
export default Register;
>>>>>>> 46f457172239a81233c93f8bc57ef3946d8e8075
