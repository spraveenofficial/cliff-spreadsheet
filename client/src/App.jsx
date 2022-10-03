import { Navbar } from "./Components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Signup } from "./Pages";
import { useAuth } from "./Context/auth-context";
import { Spinner } from "@chakra-ui/react";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

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
