import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    items: {
      type: [Object],
      default : []
    },
  },
  { timestamps: true }
);

const sectionModel =
  mongoose.models.sections || mongoose.model("section", sectionSchema);

export default sectionModel;
