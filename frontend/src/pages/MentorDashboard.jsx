import { useEffect, useState } from "react";

import NextMeetingCard from "../components/dashboard/NextMeetingCard";
import ScheduledMeetingsCard from "../components/dashboard/ScheduledMeetingsCard";
import MyConnectionsCard from "../components/dashboard/MyConnectionsCard.jsx";
import AvailabilityCard from "../components/dashboard/AvailabilityCard.jsx";

const MentorDashboard = () => {
  const storedUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const currentUser =
    storedUser?.user ||
    storedUser;

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
          `${import.meta.env.VITE_API_URL}/api/users/${currentUserId}`,
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

        const fetchedUser = result.data || result.user || result;

        setUser(fetchedUser);

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(fetchedUser)
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
          `${import.meta.env.VITE_API_URL}/api/bookings`,
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

        const bookingData =
          result.data ||
          result.bookings ||
          result;

        console.log("Mentor bookings:", bookingData);

        setBookings(
          Array.isArray(bookingData)
            ? bookingData
            : []
        );
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (currentUserId) {
      fetchBookings();
    }
  }, [currentUserId]);

  const mentees = bookings
    .map((booking) => booking.menteeId)
    .filter(Boolean)
    .filter((mentee, index, self) => {
      const menteeId =
        mentee?._id ||
        mentee?.id ||
        mentee;

      return (
        index ===
        self.findIndex((person) => {
          const personId =
            person?._id ||
            person?.id ||
            person;

          return personId === menteeId;
        })
      );
    });

  if (!storedUser) {
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
    <section className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <h1 className="heading text-5xl text-blue-900">
        Hello Mentor, {user?.firstName}!
      </h1>

      <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
        <NextMeetingCard
          userId={currentUserId}
          role="mentor"
        />
      </div>

      <AvailabilityCard />

      <ScheduledMeetingsCard
        bookings={bookings}
        role="mentor"
      />

      <MyConnectionsCard
        title="My Mentees"
        people={mentees}
      />
    </section>
  );
};

export default MentorDashboard;