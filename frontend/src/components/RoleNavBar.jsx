import { Link, useNavigate } from "react-router-dom";

const RoleNavbar = ({
  user,
  setLoggedInUser,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");

    setLoggedInUser(null);

    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 px-8 py-4 flex items-center justify-between">

      <Link
        to="/"
        className="heading text-3xl text-blue-900 hover:text-blue-700 transition"
      >
        Sphere of Influence
      </Link>

      <div className="flex items-center gap-8 text-blue-900 font-medium">

        {user.role === "mentor" ? (
          <Link
            to="/mentor-dashboard"
            className="hover:text-violet-700 transition"
          >
            My Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/mentee-dashboard"
              className="hover:text-pink-700 transition"
            >
              My Dashboard
            </Link>

            <Link
              to="/discover-mentors"
              className="hover:text-pink-700 transition"
            >
              Discover Mentors
            </Link>
          </>
        )}

        <Link
          to="/profile"
          className="hover:text-blue-700 transition"
        >
          Edit Profile
        </Link>

      </div>

      <div className="flex items-center">
        <button
          type="button"
          onClick={handleLogout}
          className="bg-blue-900 text-white px-5 py-2 rounded-xl hover:bg-blue-800 transition shadow-sm"
        >
          Exit Orbit
        </button>
      </div>

    </nav>
  );
};

export default RoleNavbar;