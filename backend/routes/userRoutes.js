import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getMentors,
  getMentorById } from "../controllers/userController.js";

const router = express.Router();

router.get("/mentors", authMiddleware, getMentors);
router.get("/mentors/:id", authMiddleware, getMentorById);


// GET ONE USER
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const getUserById = await User.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!getUserById) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: getUserById,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// update user
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const updateUserById = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        $or: [
          { isDeleted: false },
          { isDeleted: { $exists: false } },
        ],
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateUserById) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updateUserById,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// soft deletion
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleteUser = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        isDeleted: false,
      },
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      {
        new: true,
      }
    );

    if (!deleteUser) {
      return res.status(404).json({
        success: false,
        message: "User not found or already deleted",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deleteUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// SEARCH AND FILTER USERS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { search, ...filters } = req.query;

    // Always hide soft-deleted users
    const query = {
      ...filters,
      isDeleted: false,
    };

    if (search) {
      query.$or = [
        {
          firstName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          username: {
            $regex: search,
            $options: "i",
          },
        },
        {
          role: {
            $regex: search,
            $options: "i",
          },
        },
        {
          jobTitle: {
            $regex: search,
            $options: "i",
          },
        },
        {
          company: {
            $regex: search,
            $options: "i",
          },
        },
        {
          skills: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const users = await User.find(query);

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


export default router;