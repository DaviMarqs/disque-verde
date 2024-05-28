import mongoose from "mongoose";

const OccurrenceSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    occurrence_type: {
      type: String,
      enum: ["BURNED", "TRASH", "VANDALISM", "INVASION", "OTHER"],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CONCLUDED"],
      default: "PENDING",
    },
    informer_name: {
      type: String,
    },
    informer_email: {
      type: String,
    },
    informer_phone: {
      type: String,
    },
    informer_address: {
      type: String,
    },
    informer_anonymous: {
      type: Boolean,
    },
    occurrence_date: {
      type: Date,
      required: true,
    },
    occurrence_time:{
      type: String,
      required: true,
    },
    occurrence_location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Occurrence ||
  mongoose.model("Occurrence", OccurrenceSchema);
