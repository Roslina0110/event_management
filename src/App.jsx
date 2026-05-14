import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/events" element={<Events />} />

        <Route path="/register" element={<Register />} />

        <Route path="/payment" element={<Payment />} />

        <Route path="/ticket" element={<Ticket />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;