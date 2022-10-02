import { Navbar } from "./Components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./Pages";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
