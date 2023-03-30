import mongoose from "mongoose";

const newsletterSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.NewsLetter ||
  mongoose.model("NewsLetter", newsletterSchema);
