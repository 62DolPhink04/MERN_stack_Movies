import mongoose from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "Favorite",
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
      mediaRate: {
        type: Number,
        required: true,
      },
    },
    modelOptions
  )
);
