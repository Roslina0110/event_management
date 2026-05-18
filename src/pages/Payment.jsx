import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const event = location.state?.event;
  const user = location.state?.user;

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [paying, setPaying] = useState(false);
  const [method, setMethod] = useState("card"); // card | upi

  if (!event || !user) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');
          body { background: #0a0a0f; color: #f0ede6; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
          .err { text-align: center; }
          .err h2 { font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 1rem; }
          .err button { background: #e8c547; color: #0a0a0f; border: none; padding: 0.8rem 2rem; border-radius: 2rem; cursor: pointer; font-size: 1rem; }
        `}</style>
        <div className="err">
          <h2>No payment data found</h2>
          <button onClick={() => navigate("/events")}>Browse Events</button>
        </div>
      </>
    );
  }

  const fee = event.price && event.price !== "Free" ? event.price : "₹500";

  const formatCard = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const handlePayment = () => {
    if (method === "card" && (!cardNumber || !expiry || !cvv || !cardName)) {
      alert("Please fill all card details.");
      return;
    }
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      navigate("/ticket", { state: { event, user } });
    }, 2000);
  };

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
        .step.active { background: rgba(232,197,71,0.12); color: var(--accent); border: 1px solid rgba(232,197,71,0.3); }
        .step-sep { color: var(--border); }

        /* PAGE */
        .payment-page {
          min-height: 100vh;
          padding: 7rem 4rem 4rem;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 2rem;
          position: relative;
          overflow: hidden;
        }
        .payment-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 50% 40% at 80% 30%, rgba(232,197,71,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 10% 70%, rgba(255,107,53,0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        /* ORDER SUMMARY */
        .order-summary {
          width: 340px;
          flex-shrink: 0;
          position: sticky;
          top: 7rem;
          animation: fadeUp 0.5s ease both;
        }
        .summary-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 1.4rem;
          overflow: hidden;
        }
        .summary-banner {
          padding: 1.8rem;
          background: linear-gradient(135deg, rgba(232,197,71,0.15), rgba(255,107,53,0.08));
          border-bottom: 1px solid var(--border);
        }
        .summary-label {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.8rem;
        }
        .summary-event {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
        }
        .summary-date {
          color: var(--muted);
          font-size: 0.88rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .summary-body { padding: 1.5rem 1.8rem; }
        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.65rem 0;
          font-size: 0.9rem;
          border-bottom: 1px solid var(--border);
        }
        .summary-row:last-child { border-bottom: none; }
        .summary-row .label { color: var(--muted); }
        .summary-row .value { font-weight: 500; }
        .summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(232,197,71,0.2);
        }
        .total-label { font-size: 0.85rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
        .total-amount {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          color: var(--accent);
          font-weight: 700;
        }
        .secure-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.2rem;
          padding: 0.6rem 1rem;
          background: rgba(110,231,183,0.07);
          border: 1px solid rgba(110,231,183,0.15);
          border-radius: 0.6rem;
          font-size: 0.8rem;
          color: #6ee7b7;
        }

        /* PAYMENT FORM */
        .payment-form-wrap {
          flex: 1;
          max-width: 520px;
          animation: fadeUp 0.5s ease 0.1s both;
        }
        .form-header { margin-bottom: 2rem; }
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
        }

        /* METHOD TABS */
        .method-tabs {
          display: flex;
          gap: 0.8rem;
          margin-bottom: 2rem;
        }
        .method-tab {
          flex: 1;
          padding: 0.8rem;
          border-radius: 0.8rem;
          border: 1px solid var(--border);
          background: var(--input-bg);
          color: var(--muted);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .method-tab.active {
          border-color: rgba(232,197,71,0.4);
          background: rgba(232,197,71,0.08);
          color: var(--accent);
        }

        /* FORM CARD */
        .form-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 1.4rem;
          padding: 2rem;
        }

        /* CREDIT CARD VISUAL */
        .credit-card-visual {
          background: linear-gradient(135deg, #1e1e2e, #2a1a3e);
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 1.8rem;
          position: relative;
          overflow: hidden;
          height: 140px;
          border: 1px solid rgba(232,197,71,0.1);
        }
        .credit-card-visual::before {
          content: '';
          position: absolute;
          top: -30px; right: -30px;
          width: 150px; height: 150px;
          border-radius: 50%;
          background: rgba(232,197,71,0.06);
        }
        .credit-card-visual::after {
          content: '';
          position: absolute;
          bottom: -40px; left: 40px;
          width: 120px; height: 120px;
          border-radius: 50%;
          background: rgba(255,107,53,0.06);
        }
        .card-chip { font-size: 1.5rem; margin-bottom: 0.8rem; }
        .card-num-display {
          font-size: 1.1rem;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.7);
          margin-bottom: 0.8rem;
          font-family: 'Courier New', monospace;
        }
        .card-bottom {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.5);
        }
        .card-holder-display { text-transform: uppercase; letter-spacing: 0.08em; }

        /* INPUTS */
        .input-group { margin-bottom: 1.2rem; }
        .input-label {
          display: block;
          font-size: 0.8rem;
          color: var(--muted);
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .input-field {
          width: 100%;
          background: var(--input-bg);
          border: 1px solid var(--border);
          border-radius: 0.7rem;
          padding: 0.85rem 1.1rem;
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
        .input-field::placeholder { color: #3a3a4a; }
        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        /* UPI */
        .upi-wrap { text-align: center; padding: 1rem 0; }
        .upi-icon { font-size: 3rem; margin-bottom: 1rem; }
        .upi-text { color: var(--muted); font-size: 0.9rem; margin-bottom: 1.5rem; }
        .upi-input-wrap { position: relative; }
        .upi-suffix {
          position: absolute;
          right: 1rem; top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          font-size: 0.85rem;
          pointer-events: none;
        }

        /* PAY BUTTON */
        .pay-btn {
          width: 100%;
          margin-top: 1.5rem;
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
        .pay-btn:hover:not(:disabled) {
          background: #f5d55a;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(232,197,71,0.25);
        }
        .pay-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(0,0,0,0.3);
          border-top-color: #0a0a0f;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .payment-page { flex-direction: column; align-items: center; padding: 7rem 1.5rem 3rem; }
          .order-summary { width: 100%; position: static; }
          .payment-form-wrap { width: 100%; }
          .nav { padding: 1rem 1.5rem; }
          .nav-step { display: none; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("/")}>Eventify</div>
        <div className="nav-step">
          <span className="step done">✓ Register</span>
          <span className="step-sep">›</span>
          <span className="step active">Payment</span>
          <span className="step-sep">›</span>
          <span className="step">Ticket</span>
        </div>
      </nav>

      <div className="payment-page">

        {/* ORDER SUMMARY */}
        <div className="order-summary">
          <div className="summary-card">
            <div className="summary-banner">
              <div className="summary-label">✦ Order Summary</div>
              <div className="summary-event">{event.name}</div>
              <div className="summary-date">📅 {event.date}</div>
            </div>
            <div className="summary-body">
              <div className="summary-row">
                <span className="label">Attendee</span>
                <span className="value">{user.name}</span>
              </div>
              <div className="summary-row">
                <span className="label">Email</span>
                <span className="value" style={{ fontSize: '0.82rem' }}>{user.email}</span>
              </div>
              <div className="summary-row">
                <span className="label">Phone</span>
                <span className="value">{user.phone}</span>
              </div>
              <div className="summary-row">
                <span className="label">Event Fee</span>
                <span className="value">{fee}</span>
              </div>
              <div className="summary-row">
                <span className="label">Service Fee</span>
                <span className="value">₹0</span>
              </div>
              <div className="summary-total">
                <span className="total-label">Total</span>
                <span className="total-amount">{fee}</span>
              </div>
              <div className="secure-badge">
                🔒 Secured by 256-bit SSL encryption
              </div>
            </div>
          </div>
        </div>

        {/* PAYMENT FORM */}
        <div className="payment-form-wrap">
          <div className="form-header">
            <div className="form-tag">✦ Checkout</div>
            <h1 className="form-title">Complete Payment</h1>
          </div>

          {/* METHOD TABS */}
          <div className="method-tabs">
            <button
              className={`method-tab ${method === "card" ? "active" : ""}`}
              onClick={() => setMethod("card")}
            >
              💳 Credit / Debit Card
            </button>
            <button
              className={`method-tab ${method === "upi" ? "active" : ""}`}
              onClick={() => setMethod("upi")}
            >
              📱 UPI
            </button>
          </div>

          <div className="form-card">
            {method === "card" ? (
              <>
                {/* CARD VISUAL */}
                <div className="credit-card-visual">
                  <div className="card-chip">💳</div>
                  <div className="card-num-display">
                    {cardNumber || "•••• •••• •••• ••••"}
                  </div>
                  <div className="card-bottom">
                    <div className="card-holder-display">
                      {cardName || "YOUR NAME"}
                    </div>
                    <div>{expiry || "MM/YY"}</div>
                  </div>
                </div>

                {/* CARD NAME */}
                <div className="input-group">
                  <label className="input-label">Name on Card</label>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>

                {/* CARD NUMBER */}
                <div className="input-group">
                  <label className="input-label">Card Number</label>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCard(e.target.value))}
                    maxLength={19}
                  />
                </div>

                {/* EXPIRY + CVV */}
                <div className="input-row">
                  <div className="input-group">
                    <label className="input-label">Expiry Date</label>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      maxLength={5}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">CVV</label>
                    <input
                      className="input-field"
                      type="password"
                      placeholder="•••"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                      maxLength={3}
                    />
                  </div>
                </div>
              </>
            ) : (
              /* UPI */
              <div className="upi-wrap">
                <div className="upi-icon">📱</div>
                <p className="upi-text">Enter your UPI ID to pay instantly</p>
                <div className="input-group upi-input-wrap">
                  <input
                    className="input-field"
                    type="text"
                    placeholder="yourname@upi"
                    style={{ paddingRight: "4rem" }}
                  />
                </div>
              </div>
            )}

            <button className="pay-btn" onClick={handlePayment} disabled={paying}>
              {paying ? (
                <>
                  <div className="spinner" /> Processing...
                </>
              ) : (
                <>🔒 Pay {fee} Securely</>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;