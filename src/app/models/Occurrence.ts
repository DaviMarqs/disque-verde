import mongoose from "mongoose";

const OccurrenceSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    occurrence_type: {
      type: String,
      enum: ["BURNED", "TRASH", "VANDALISM", "INVASION"],
      required: true,
    },
    image: {
      type: String,
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
    offender_name: {
      type: String,
    },
    offender_email: {
      type: String,
    },
    offender_phone: {
      type: String,
    },
    offender_address: {
      type: String,
    },
    occurrence_date_and_time: {
      type: String,
    },
    occurrence_location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Occurrence ||
  mongoose.model("Occurrence", OccurrenceSchema);
