import { useEffect, useState } from "react";

export const useNextMeeting = (userId, role) => {
  const [nextMeeting, setNextMeeting] = useState(null);

  useEffect(() => {
    const fetchNextMeeting = async () => {
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
          console.error("Error fetching bookings:", result.message);
          setNextMeeting(null);
          return;
        }

        console.log("Bookings received:", result.data);

        if (!Array.isArray(result.data) || result.data.length === 0) {
          setNextMeeting(null);
          return;
        }

        setNextMeeting(result.data[0]);
      } catch (error) {
        console.error("Error fetching next meeting:", error);
        setNextMeeting(null);
      }
    };

    if (userId) {
      fetchNextMeeting();
    }
  }, [userId, role]);

  return nextMeeting;
};