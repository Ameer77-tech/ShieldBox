import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    sections: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "section-model",
      default: [],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.models.users || mongoose.model("user", userSchema);

export default userModel;
