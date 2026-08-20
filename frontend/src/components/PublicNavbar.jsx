import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">

      <div>
        <Link
          to="/"
          className="heading text-2xl text-blue-900 hover:text-blue-700 transition"
        >
          Sphere of Influence
        </Link>
      </div>

      <div className="flex items-center gap-8">

        <Link
          to="/"
          className="text-blue-900 font-medium hover:text-blue-700 transition"
          >
          Home
        </Link>

        <Link
          to="/login"
          className="text-blue-900 font-medium hover:text-blue-700 transition"
        >
          Log In
        </Link>

        <Link
          to="/signup"
          className="bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Sign Up
        </Link>

      </div>

    </nav>
  );
  };

export default PublicNavbar;