import { useState, useEffect } from "react";

const ScheduledMeetingsCard = ({ bookings = [], role = "mentee" }) => {
  const getMeetingDateTime = (meeting) => {
    if (!meeting?.availabilityId?.date || !meeting?.availabilityId?.startTime) {
      return null;
    }

    const date = new Date(meeting.availabilityId.date);

    const [time, modifier] =
      meeting.availabilityId.startTime.split(" ");

    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }

    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    date.setHours(hours, minutes, 0, 0);

    return date;
  };

  const currentTime = new Date();

  const upcomingMeetings = bookings.filter((meeting) => {
    const meetingDateTime = getMeetingDateTime(meeting);

    return (
      meetingDateTime &&
      meetingDateTime > currentTime &&
      meeting.status !== "cancelled"
    );
  });

  const sortedUpcomingMeetings = [...upcomingMeetings].sort(
    (meetingA, meetingB) =>
      getMeetingDateTime(meetingA) -
      getMeetingDateTime(meetingB)
  );

  const scheduledMeetings = sortedUpcomingMeetings.slice(1);

  const isMentor = role === "mentor";

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
      <h2 className="heading text-2xl text-blue-900 mb-4">
        Scheduled Meetings
      </h2>

      <div className="space-y-4">
        {scheduledMeetings.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No additional scheduled meetings.
          </p>
        ) : (
          scheduledMeetings.map((meeting) => {
            const counterpartUser = isMentor
              ? meeting.menteeId
              : meeting.mentorId;

            return (
              <div
                key={meeting._id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white hover:bg-blue-50 transition"
              >
                <div className="flex flex-col">
                  <p className="text-blue-900 font-medium">
                    {new Date(
                      meeting.availabilityId.date
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  <p className="text-gray-600 text-sm">
                    {meeting.availabilityId.startTime}
                  </p>

                  <p className="text-gray-800 mt-1">
                    {counterpartUser?.firstName}{" "}
                    {counterpartUser?.lastName}
                  </p>
                </div>

                <div className="w-2 h-2 rounded-full bg-blue-900"></div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ScheduledMeetingsCard;