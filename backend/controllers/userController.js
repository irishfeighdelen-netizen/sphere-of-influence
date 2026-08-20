import User from "../models/User.js";

const getMentors = async (req, res) => {
  try {
    const mentors = await User.find({
      role: "mentor",
      isDeleted: { $ne: true },
    }).select("-password");

    return res.status(200).json({
      success: true,
      count: mentors.length,
      data: mentors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMentorById = async (req, res) => {
  try {
    const mentor = await User.findOne({
      _id: req.params.id,
      role: "mentor",
      isDeleted: { $ne: true },
    }).select("-password");

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: mentor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getMentors, getMentorById };