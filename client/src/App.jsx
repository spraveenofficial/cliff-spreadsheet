import { Navbar } from "./Components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashBoard, Login, Signup, Subscriptions } from "./Pages";
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
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="subscriptions" element={<Subscriptions />} />
      </Routes>
    </Router>
  );
}

export default App;
