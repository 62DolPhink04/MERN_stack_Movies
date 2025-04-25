import mongoose from "mongoose";
import modelOptions from "./model.options";

export default mongoose.model(
  "Review",
  new mongoose.Schema(
    {
      user: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      mediaTpye: {
        type: String,
        enum: ["movie", "tv"],
        required: true,
      },
      mediId: {
        type: String,
        required: true,
      },
      mediaTitle: {
        type: String,
        required: true,
      },
      mediaPoster: {
        type: String,
        required: true,
      },
    },
    modelOptions
  )
);
