import { useEffect, useState } from "react";

const AvailabilityCard = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const currentUserId =
    currentUser?._id ||
    currentUser?.userId ||
    currentUser?.id;

  const [availability, setAvailability] = useState([]);

  const [newSlot, setNewSlot] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/availability/mentor/${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          console.error(
            "Error fetching availability:",
            result.message
          );
          return;
        }

        setAvailability(
          Array.isArray(result.data) ? result.data : []
        );
      } catch (error) {
        console.error(
          "Error fetching availability:",
          error
        );
      }
    };

    if (currentUserId) {
      fetchAvailability();
    }
  }, [currentUserId]);

  const handleChange = (event) => {
    setNewSlot((previousSlot) => ({
      ...previousSlot,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddAvailability = async () => {
    if (
      !newSlot.date ||
      !newSlot.startTime ||
      !newSlot.endTime
    ) {
      alert("Please complete all availability fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/availability`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newSlot),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(
          result.message ||
            "Could not add availability."
        );
        return;
      }

      setAvailability((previous) => [
        ...previous,
        result.data,
      ]);

      setNewSlot({
        date: "",
        startTime: "",
        endTime: "",
      });
    } catch (error) {
      console.error(
        "Error adding availability:",
        error
      );
    }
  };

  const handleDeleteAvailability = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/availability/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(
          result.message ||
            "Could not delete availability."
        );
        return;
      }

      setAvailability((previous) =>
        previous.filter(
          (slot) => slot._id !== id
        )
      );
    } catch (error) {
      console.error(
        "Error deleting availability:",
        error
      );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    return new Date(dateString).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  const formatTime = (time) => {
    if (!time) return "";

    if (
      time.includes("AM") ||
      time.includes("PM")
    ) {
      return time;
    }

    const [hours, minutes] = time.split(":");

    const date = new Date();

    date.setHours(
      Number(hours),
      Number(minutes),
      0,
      0
    );

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const availableSlots = availability.filter(
    (slot) => slot.status === "available"
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
      <h2 className="heading text-2xl text-blue-900 mb-6">
        Available to Connect
      </h2>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm text-gray-600">
            Date
          </label>

          <input
            type="date"
            name="date"
            value={newSlot.date}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">
            Start Time
          </label>

          <input
            type="time"
            name="startTime"
            value={newSlot.startTime}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">
            End Time
          </label>

          <input
            type="time"
            name="endTime"
            value={newSlot.endTime}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <button
          type="button"
          onClick={handleAddAvailability}
          className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Add Availability
        </button>
      </div>

      <div className="space-y-3">
        {availableSlots.length === 0 ? (
          <p className="text-sm text-gray-500">
            No open availability slots.
          </p>
        ) : (
          availableSlots.map((slot) => (
            <div
              key={slot._id}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white hover:bg-blue-50 transition"
            >
              <div className="flex flex-col">
                <p className="text-blue-900 font-medium">
                  {formatDate(slot.date)}
                </p>

                <p className="text-gray-600 text-sm">
                  {formatTime(slot.startTime)} -{" "}
                  {formatTime(slot.endTime)}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleDeleteAvailability(
                    slot._id
                  )
                }
                className="text-sm text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AvailabilityCard;