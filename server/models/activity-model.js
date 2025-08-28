import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    action: {
      type: String,
    },
  },
  { timestamps: true }
);

activitySchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 30 }
); //30 days
const activityModel = mongoose.model("activities", activitySchema);
export default activityModel;
