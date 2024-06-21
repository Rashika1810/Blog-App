const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Title is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      require: [true, "User id is required"],
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
