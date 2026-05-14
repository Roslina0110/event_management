import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Event System</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/register">Register</Link>
        <Link to="/payment">Payment</Link>
        <Link to="/ticket">Ticket</Link>
      </div>
    </nav>
  );
}

export default Navbar;