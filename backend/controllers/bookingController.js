import Booking from "../models/Booking.js";
import Availability from "../models/Availability.js";

// create booking (mentee books mentor availability)
const createBooking = async (req, res) => {
  try {
    // Only mentees can book
    if (req.user.role !== "mentee") {
      return res.status(403).json({
        success: false,
        message: "Only mentees can create bookings.",
      });
    }

    // Find availability
    const availability = await Availability.findById(
      req.body.availabilityId
    );

    if (!availability) {
      return res.status(404).json({
        success: false,
        message: "Availability not found.",
      });
    }

    // Prevent booking own availability
    if (availability.mentorId.toString() === req.user.userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot book your own availability.",
      });
    }

    // Check if available
    if (availability.status !== "available") {
      return res.status(400).json({
        success: false,
        message: "This slot is no longer available.",
      });
    }

    // Create booking
    const booking = await Booking.create({
      availabilityId: availability._id,
      mentorId: availability.mentorId,
      menteeId: req.user.userId,
    });

    // Update availability
    availability.status = "booked";
    await availability.save();

    return res.status(201).json({
      success: true,
      data: booking,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// view mentor/mentee bookings
const getBookings = async (req, res) => {
  try {
    let bookings;

    if (req.user.role === "mentor") {
      bookings = await Booking.find({
        mentorId: req.user.userId,
        status: "confirmed",
      })
        .populate("mentorId", "firstName lastName email photo jobTitle company meetingLink")
        .populate("menteeId", "firstName lastName email photo jobTitle company meetingLink")
        .populate("availabilityId", "date startTime endTime status");

    } else if (req.user.role === "mentee") {
      bookings = await Booking.find({
        menteeId: req.user.userId,
        status: "confirmed",
      })
        .populate("mentorId", "firstName lastName email photo jobTitle company meetingLink")
        .populate("menteeId", "firstName lastName email photo jobTitle company meetingLink")
        .populate("availabilityId", "date startTime endTime status");

    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// mentor cancels booking
const cancelBooking = async (req, res) => {
  try {
    // Only mentors can cancel
    if (req.user.role !== "mentor") {
      return res.status(403).json({
        success: false,
        message: "Only mentors can cancel bookings.",
      });
    }

    const booking = await Booking.findOne({
      _id: req.params.id,
      mentorId: req.user.userId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    booking.status = "cancelled";
    await booking.save();

    // Make availability available again
    await Availability.findByIdAndUpdate(
      booking.availabilityId,
      {
        status: "available",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully.",
      data: booking,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export {createBooking, getBookings, cancelBooking,};