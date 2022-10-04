import { Navbar } from "./Components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashBoard, Login, Signup, Subscriptions } from "./Pages";
import { useAuth } from "./Context/auth-context";
import { Spinner } from "@chakra-ui/react";
import { GuestRoutes, ProtectedRoutes } from "./Utils/routes";

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
        <Route element={<ProtectedRoutes />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="subscriptions" element={<Subscriptions />} />
        </Route>
        <Route element={<GuestRoutes />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
        </Route>
        <Route path="*" element={<GuestRoutes to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
