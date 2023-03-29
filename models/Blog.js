import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorAvatar: {
      type: String,
      required: true,
    },
    sections: [
      {
        sectionType: {
          type: String,
          required: true,
        },
        sectionText: {
          type: String,
          required: true,
        },
        sectionCaption: {
          type: String,
        },
        sectionLink: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
