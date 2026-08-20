import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["mentor", "mentee", "admin"],
      required: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    linkedin: {
      type: String,
      default: "",
    },

    jobTitle: {
      type: String,
      default: "",
    },

    company: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    photo: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    sphereOfInfluence: {
      type: [String],
      default: [],
    },

    meetingPlatform: {
      type: String,
      default: "",
    },

    meetingLink: {
      type: String,
      default: "",
    },

    // Soft deletion here
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;