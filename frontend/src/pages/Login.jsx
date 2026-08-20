import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setLoggedInUser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(
          result.message ||
            "Invalid email or password."
        );
        return;
      } 

      const { data: user, token } = result;

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
      );

      localStorage.setItem("token", token);

      setLoggedInUser(user);

      if (user.role === "mentee") {
        navigate("/mentee-dashboard");
      } else if (user.role === "mentor") {
        navigate("/mentor-dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        <h1 className="heading text-4xl text-blue-900 mb-8 text-center">
          Return to Your Orbit
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div>
            <label className="text-sm text-gray-600">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-sm text-blue-700 hover:underline"
          >
            ← Return to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;