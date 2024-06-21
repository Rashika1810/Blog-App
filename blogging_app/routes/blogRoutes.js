const express = require("express");
const {
  getAllBlogController,
  addBlogController,
  editBlogController,
  getBlogByIdController,
  deleteBlogController,
  getAllUserBlogController,
} = require("../controllers/blogController");

//router object
const router = express.Router();

//routes
// Getting all blogs
router.get("/all-blog", getAllBlogController);

//Adding blogs
router.post("/add-blog", addBlogController);

//Editing blogs
router.put("/edit-blog/:id", editBlogController);

//Getting a single blog post
router.get("/get-blog/:id", getBlogByIdController);

//Deleting blogs
router.delete("/delete-blog/:id", deleteBlogController);

//Getting a user blogs
router.get("/user-all-blog/:id", getAllUserBlogController);

module.exports = router;
