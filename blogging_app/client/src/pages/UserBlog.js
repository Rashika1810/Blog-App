import axios from "axios";
import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userID");
      const { data } = await axios.get(`/api/v1/blogs/user-all-blog/${id}`);
      console.log(data);
      if (data?.success) {
        setBlogs(data?.blogOfUser?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        marginTop: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            content={blog.content}
            username={localStorage.getItem("username")}
            time={blog.createdAt}
            style={{ flex: "1 0 300px", margin: "10px" }}
          />
        ))
      ) : (
        <h1>Start Writing your Blogs...</h1>
      )}
    </div>
  );
};

export default UserBlog;
