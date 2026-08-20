import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    company: "",
    photo: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(storedUser);
    setFormData({
      firstName: storedUser.firstName || "",
      lastName: storedUser.lastName || "",
      jobTitle: storedUser.jobTitle || "",
      company: storedUser.company || "",
      photo: storedUser.photo || "",
    });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/users/${user.id}`,
        { 
        method: "PATCH",
        headers: {
          "Content-Type": "appliction/json",
          Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to update profile.");
        return;
      }

      console.log("Profile updated:", result);

      const updatedUser = {
        ...user,
        ...formData,
      };

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);

      alert("Profile updated successfully.");

    } catch (error) {
      console.error("Profile update error:", error);
      alert ("Something went wrong. Please try again.");
    }
  };

  if (!user) return null;

  return (
  <section className="max-w-3xl mx-auto px-6 py-10">

    <h1 className="heading text-5xl text-blue-900 mb-8">
      My Profile
    </h1>

    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <p className="text-gray-700">
        Profile: <span className="text-blue-900 font-medium">{ user.role }</span>
      </p>
    </div>

    <form
      onSubmit={ handleSave }
      className="bg-white rounded-2xl shadow-sm p-6 space-y-4"
    >

      <div>
        <label className="text-sm text-gray-600">First Name</label>
        <input
          name="firstName"
          value={ formData.firstName }
          onChange={ handleChange }
          className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Last Name</label>
        <input
          name="lastName"
          value={ formData.lastName }
          onChange={ handleChange }
          className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Job Title</label>
        <input
          name="jobTitle"
          value={formData.jobTitle}
          onChange={ handleChange }
          className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Company</label>
        <input
          name="company"
          value={ formData.company }
          onChange={ handleChange }
          className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"/>
      </div>

      <div>
        <label className="text-sm text-gray-600">Profile Photo Link</label>
        <input
          name="photo"
          value={ formData.photo }
          onChange={ handleChange }
          className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"/>
      </div>

      <button
        type="submit"
        className="bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
      >
        Save Changes
      </button>

    </form>

  </section>
);
};

export default Profile;