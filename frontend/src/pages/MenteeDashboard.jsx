import { useEffect, useState } from "react";

import NextMeetingCard from "../components/dashboard/NextMeetingCard";
import ScheduledMeetingsCard from "../components/dashboard/ScheduledMeetingsCard";
import MyConnectionsCard from "../components/dashboard/MyConnectionsCard.jsx";

import AIAssistant from "../components/dashboard/AIAssistant.jsx";

const MenteeDashboard = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const currentUserId =
    currentUser?._id ||
    currentUser?.userId ||
    currentUser?.id;

  const [user, setUser] = useState(currentUser);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5000/api/users/${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          console.error("Error fetching user:", result.message);
          return;
        }

        setUser(result.data);

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(result.data)
        );
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (currentUserId) {
      fetchUser();
    }
  }, [currentUserId]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          console.error(
            "Error fetching bookings:",
            result.message
          );
          return;
        }

        console.log("My bookings:", result.data);

        setBookings(
          Array.isArray(result.data) ? result.data : []
        );
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (currentUserId) {
      fetchBookings();
    }
  }, [currentUserId]);

  const mentors = bookings
    .map((booking) => booking.mentorId)
    .filter(Boolean)
    .filter(
      (mentor, index, self) =>
        index ===
        self.findIndex(
          (person) => person._id === mentor._id
        )
    );

  if (!currentUser) {
    return <p>Please log in.</p>;
  }

  if (!currentUserId) {
    return (
      <p className="text-red-600">
        User ID is missing. Please log in again.
      </p>
    );
  }

  

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="heading text-5xl text-blue-900 mb-10">
        Hello, Mentee {user?.firstName}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
          <NextMeetingCard
            userId={currentUserId}
            role="mentee"
          />
        </div>

        <MyConnectionsCard
          title="My Mentor/s"
          people={mentors}
        />

        <ScheduledMeetingsCard
          bookings={bookings}
          role="mentee"
        />

        <AIAssistant />
        
      </div>
    </section>
  );
};

export default MenteeDashboard;