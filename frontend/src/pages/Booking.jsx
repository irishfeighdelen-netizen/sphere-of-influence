import { useNavigate, useParams } from "react-router-dom";
import {useState, useEffect} from "react";


const Booking = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();

  const [mentor, setMentor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
  const fetchMentor = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/users/mentors/${mentorId}`,
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

      console.log("Mentor:", result.data);
      setMentor(result.data);
    } catch (error) {
      console.error("Error fetching mentor:", error);
    }
  };

  fetchMentor();
}, [mentorId]);

useEffect(() => {
  const fetchAvailability = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/availability/mentor/${mentorId}`,
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

      console.log("Availability:", result.data);
      setAvailableSlots(
        result.data.filter((slot) => slot.status === "available")
      );
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  fetchAvailability();
}, [mentorId]);

  if (!mentor) {
    return <p>Loading...</p>;
  }




  const handleBookSession = async (slot) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          availabilityId: slot._id,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Booking failed.");
      return;
    }

    alert("Session booked successfully!");

    setAvailableSlots((previousSlots) =>
      previousSlots.filter((item) => item._id !== slot._id)
    );

  } catch (error) {
    console.error("Booking error:", error);
    alert("Something went wrong while booking.");
  }
};

  

  return (
  <section className="max-w-5xl mx-auto px-6 py-10">

    <button
      type="button"
      onClick={ () => navigate(-1) }
      className="text-blue-900 hover:text-blue-700 mb-6 font-medium transition"
    >
      ← Back to Discover Mentors
    </button>

    <h1 className="heading text-5xl text-blue-900 mb-10">
      Book a Session
    </h1>

    <div className="bg-white rounded-2xl shadow-md p-6 flex gap-6 items-center mb-10">
      <img
        src={ mentor.photo }
        alt={ `${mentor.firstName } ${ mentor.lastName }`}
        className="w-24 h-24 rounded-full object-cover"
      />

      <div className="flex flex-col gap-1">
        <h2 className="heading text-3xl text-blue-900">
          { mentor.firstName } { mentor.lastName }
        </h2>

        <p className="text-gray-700">{ mentor.jobTitle }</p>
        <p className="text-gray-500">{ mentor.company }</p>

        <p className="text-gray-600 mt-2 leading-relaxed">
          { mentor.bio }
        </p>
      </div>
    </div>

    <h3 className="heading text-2xl text-blue-900 mb-4">
      Available Sessions
    </h3>

  
    <div className="space-y-4">
      {availableSlots.map((slot) => (
        <div
          key={slot._id}
          className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-center hover:shadow-md transition-all"
        >
          <div>
            <p className="text-blue-900 font-medium">{ slot.date }</p>
            <p className="text-gray-600">
              { slot.startTime } - { slot.endTime }
            </p>
          </div>

          <button
            onClick={() => handleBookSession(slot)}
            className="bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Book Session
          </button>
        </div>
      ))}
    </div>

  </section>
);
}

export default Booking