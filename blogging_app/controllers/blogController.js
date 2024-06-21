const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

// get all blogs
exports.getAllBlogController = async (req, resp) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return resp.status(200).send({
        success: false,
        message: "No Blogs Found",
      });
    }
    return resp.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).send({
      success: false,
      message: "Error getting blogs",
      error,
    });
  }
};

//Add blogs
exports.addBlogController = async (req, resp) => {
  try {
    const { title, content, user } = req.body;
    //validation
    if (!title || !content || !user) {
      return resp.status(400).send({
        success: false,
        message: "All fields are required.",
      });
    }
    const exisitingUser = await userModel.findById(user);
    //check for user exists or not
    if (!exisitingUser) {
      return resp.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const newBlog = new blogModel({ title, content, user });

    //adding blog to the user
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    exisitingUser.blogs.push(newBlog);
    await exisitingUser.save({ session });
    await session.commitTransaction();

    // saving the blog
    await newBlog.save();
    return resp.status(201).send({
      success: true,
      message: "New Blog Added",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return resp.status(400).send({
      success: false,
      message: "Error adding blogs",
      error,
    });
  }
};

//edit blog
exports.editBlogController = async (req, resp) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return resp.status(200).send({
      success: true,
      message: "Blog Edited!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return resp.status(400).send({
      success: false,
      message: "Error in editing blog",
      error,
    });
  }
};

//delete blog
exports.deleteBlogController = async (req, resp) => {
  try {
    const blog = await blogModel
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return resp.status(200).send({
      success: true,
      message: "Blog Deleted!",
    });
  } catch (error) {
    console.log(error);
    return resp.status(400).send({
      success: false,
      message: "Error in deleting blog",
      error,
    });
  }
};
//get the particular blog
exports.getBlogByIdController = async (req, resp) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return resp.status(404).send({
        success: false,
        message: "No Blog available with this id",
      });
    }
    return resp.status(200).send({
      success: true,
      message: "Blog Fetched",
      blog,
    });
  } catch (error) {
    console.log(error);
    return resp.status(400).send({
      success: false,
      message: "error while getting single blog",
      error,
    });
  }
};

exports.getAllUserBlogController = async (req, resp) => {
  try {
    const blogOfUser = await userModel
      .findById(req.params.id)
      .populate("blogs");

    if (!blogOfUser) {
      return resp.status(404).send({
        success: false,
        message: "User has no blogs",
      });
    }
    return resp.status(200).send({
      success: true,
      message: "Fetched User blogs",
      blogOfUser,
    });
  } catch (error) {
    console.log(error);
    return resp.status(400).send({
      success: false,
      message: "error in fetching blogs",
      error,
    });
  }
};
