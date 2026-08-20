import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    linkedin: "",
    password: "",
  })

  const handleUserType = (type) => {
    setFormData((prev) => ({
      ...prev,
      userType: type,
    }));
  };

  const handleChange = (e) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!formData.userType) {
      alert("Please select Mentor or Mentee.");
      return;
    }

    try {
      const response = await fetch (`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          linkedin: formData.linkedin,
          password: formData.password,
          role: formData.userType.toLowerCase(),
        }),
      });

      const result = await response.json();

      // Check registration
      if (!response.ok) {
        alert(result.message || "Registration failed. Please try again.");
        return;
      }

      console.log("Registration successful:", result);
      alert("Your account has been created successfully! Welcome to Sphere of Influence.");

      // Take user to login
      navigate("/login");
    } catch (error) {
        console.error("Registration error:", error);
        alert("Something went wrong. Please try again.");
    }
  
 };
 
 return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm p-8">

        <h1 className="heading text-5xl text-blue-900 text-center mb-8">
          Join the Sphere
        </h1>

        <div className="flex justify-center gap-4 mb-6">

          <button
            type="button"
            onClick={() => handleUserType("Mentor")}
            className={`px-6 py-2 rounded-lg transition ${
              formData.userType === "Mentor"
                ? "bg-violet-700 text-white"
                : "bg-violet-100 text-violet-900 hover:bg-violet-200"
            }`}
          >
            Mentor
          </button>

          <button
            type="button"
            onClick={() => handleUserType("Mentee")}
            className={`px-6 py-2 rounded-lg transition ${
              formData.userType === "Mentee"
                ? "bg-pink-700 text-white"
                : "bg-pink-100 text-pink-900 hover:bg-pink-200"
            }`}
          >
            Mentee
          </button>

        </div>

        {formData.userType && (
          <h3 className="text-center text-gray-600 mb-8">
            You are signing up as a{" "}
            <span className="font-semibold">
              {formData.userType}
            </span>.
          </h3>
        )}

        <form onSubmit = {handleSignUp} className="space-y-5">

          <div>
            <label className="text-sm text-gray-600">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange ={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange ={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange ={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange ={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">LinkedIn</label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange ={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Set Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange ={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Sign Up
          </button>

        </form>

      </div>

    </main>
  );
}

export default SignUp;