import { useNextMeeting } from "../../hooks/useNextMeeting";

const NextMeetingCard = ({ userId, role }) => {
  const meeting = useNextMeeting(userId, role);

  const formatTime = (time) => {
    if (!time) return "";

    // Already in AM/PM format
    if (time.includes("AM") || time.includes("PM")) {
      return time;
    }

    // 24-hour format, e.g. 14:30
    const [hours, minutes] = time.split(":");

    if (hours === undefined || minutes === undefined) {
      return time;
    }

    const date = new Date();
    date.setHours(Number(hours), Number(minutes), 0, 0);

    if (Number.isNaN(date.getTime())) {
      return time;
    }

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (!meeting) {
    return (
      <>
        <h2 className="heading text-2xl text-blue-900 mb-4">
          Your next meeting
        </h2>

        <p className="text-gray-600">
          No upcoming meetings. Connect and continue your journey!
        </p>
      </>
    );
  }

  const person =
    role === "mentor"
      ? meeting.menteeId
      : meeting.mentorId;

  if (!person || !meeting.availabilityId) {
    return (
      <>
        <h2 className="heading text-2xl text-blue-900 mb-4">
          Your next meeting
        </h2>

        <p className="text-gray-600">
          Meeting data is incomplete.
        </p>
      </>
    );
  }

  return (
    <>
      <h2 className="heading text-2xl text-blue-900 mb-4">
        Your next meeting
      </h2>

      <div className="flex items-center gap-4 mb-5">
        {person.photo && (
          <img
            src={person.photo}
            alt={`${person.firstName || ""} ${person.lastName || ""}`}
            className="w-14 h-14 rounded-xl object-cover"
          />
        )}

        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {person.firstName} {person.lastName}
          </h3>

          {person.jobTitle && (
            <p className="text-gray-600">
              {person.jobTitle}
            </p>
          )}

          {person.company && (
            <p className="text-gray-500 text-sm">
              {person.company}
            </p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          <p>
            <span className="font-medium text-blue-900">
              Date:
            </span>{" "}
            {meeting.availabilityId.date
              ? new Date(
                  meeting.availabilityId.date
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "No date"}
          </p>

          <p>
            <span className="font-medium text-blue-900">
              Time:
            </span>{" "}
            {formatTime(meeting.availabilityId.startTime)}
          </p>
        </div>

        {person.meetingLink && (
          <a
            href={person.meetingLink}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition text-sm"
          >
            Join session
          </a>
        )}
      </div>
    </>
  );
};

export default NextMeetingCard;