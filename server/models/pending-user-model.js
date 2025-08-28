import mongoose from "mongoose";

const pendingUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    code: {
      type: String,
      default: "",
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 600 },
    },
  },

  { timestamps: true }
);

const pendingUserModel =
  mongoose.models.pendingUser ||
  mongoose.model("pendingUser", pendingUserSchema);

export default pendingUserModel;
