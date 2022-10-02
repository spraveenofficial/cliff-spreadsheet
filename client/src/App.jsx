import { Navbar } from "./Components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Signup } from "./Pages";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
