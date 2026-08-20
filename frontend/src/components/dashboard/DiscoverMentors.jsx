import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DiscoverMentors = () => {
  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/users/mentors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          console.error(result.message);
          return;
        }

        console.log("Mentors:", result.data);
        setMentors(result.data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter((mentor) => {
    const searchText = search.toLowerCase();

    return (
      mentor.firstName?.toLowerCase().includes(searchText) ||
      mentor.lastName?.toLowerCase().includes(searchText) ||
      mentor.jobTitle?.toLowerCase().includes(searchText) ||
      mentor.company?.toLowerCase().includes(searchText) ||
      mentor.bio?.toLowerCase().includes(searchText) ||
      mentor.skills?.some((skill) =>
        skill.toLowerCase().includes(searchText)
      ) ||
      mentor.sphereOfInfluence?.some((tag) =>
        tag.toLowerCase().includes(searchText)
      )
    );
  });

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="heading text-5xl text-blue-900 mb-8">
        Discover Mentors
      </h1>

      <div className="mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, role, company, skill, or expertise..."
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {filteredMentors.length === 0 ? (
        <p className="text-gray-500">
          No mentors found matching your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor._id}
              onClick={() => navigate(`/mentor/${mentor._id}`)}
              className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-all cursor-pointer flex flex-col"
            >
              <img
                src={mentor.photo}
                alt={`${mentor.firstName} ${mentor.lastName}`}
                className="w-full h-100 object-cover object-top rounded-xl mb-4"
              />

              <h2 className="heading text-2xl text-blue-900">
                {mentor.firstName} {mentor.lastName}
              </h2>

              <p className="text-gray-700">
                {mentor.jobTitle}
              </p>

              <p className="text-gray-500">
                {mentor.company}
              </p>

              <p className="text-gray-600 mt-3 line-clamp-3">
                {mentor.bio}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {mentor.sphereOfInfluence?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                className="mt-5 bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DiscoverMentors;