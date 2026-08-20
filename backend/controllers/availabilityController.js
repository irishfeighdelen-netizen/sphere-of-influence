import Availability from "../models/Availability.js";

const createAvailability = async (req, res) => {
  try {
    const mentorAvailability = await Availability.create({
      mentorId: req.user.userId,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });
    return res.status(201).json({
      success: true,
      data: mentorAvailability,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  };
};

// get my availability
const getAvailability = async (req,res) => {
  try {
    const mentorAvailabilityList = await Availability.find({
      mentorId: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      count: mentorAvailabilityList.length,
      data: mentorAvailabilityList
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

  const updateAvailability = async (req, res) => {
    try {
      const updatedMentorAvailability = await Availability.findOneAndUpdate(
        {
          _id: req.params.id,
          mentorId: req.user.userId,
        },
        {
          date: req.body.date,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          status: req.body.status
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedMentorAvailability) {
        return res.status(404).json({
          success: false,
          message: "Availability not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: updatedMentorAvailability,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:  error.message 
      });
    }
  };

const deleteAvailability = async (req, res) => {
  try {
    const deletedAvailability = await Availability.findOneAndDelete({
      _id: req.params.id,
      mentorId: req.user.userId,
    });

    if (!deletedAvailability) {
      return res.status(404).json({
        success:false,
        message: "Slot not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Slot deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};

// mentee view: see specific mentor's availability
const getMentorAvailability = async (req, res) => {
  try {
    const mentorAvailability = await Availability.find({
      mentorId: req.params.mentorId,
      status: "available",
    });

    return res.status(200).json({
      success: true,
      count: mentorAvailability.length,
      data: mentorAvailability,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  };
};

export {createAvailability, getAvailability, updateAvailability, deleteAvailability, getMentorAvailability};