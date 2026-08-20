import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicNavbar from "./components/PublicNavbar";
import RoleNavBar from "./components/RoleNavBar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MenteeDashboard from "./pages/MenteeDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import Profile from "./pages/Profile";
import DiscoverMentors from "./components/dashboard/DiscoverMentors";
import Booking from "./pages/Booking";
import Footer from "./components/Footer";

import "./App.css";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });

  return (
    <BrowserRouter>

      {loggedInUser ? (
        <RoleNavbar
          user={loggedInUser}
          setLoggedInUser={setLoggedInUser}
        />
      ) : (
        <PublicNavbar />
      )}

      <div className="min-h-screen bg-gradient-to-r from-pink-100 via-violet-50 to-sky-100 font-sans">

        <Routes>

          {/* Public Pages */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={
              <Login
                setLoggedInUser={setLoggedInUser}
              />
            }
          />

          <Route
            path="/signup"
            element={<SignUp />}
          />

          {/* Protected Routes */}

          <Route
            path="/mentee-dashboard"
            element={
              <ProtectedRoute>
                <MenteeDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mentor-dashboard"
            element={
              <ProtectedRoute>
                <MentorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/discover-mentors"
            element={
              <ProtectedRoute>
                <DiscoverMentors />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mentor/:mentorId"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />

        </Routes>

        <Footer />

      </div>

    </BrowserRouter>
  );
};

export default App;