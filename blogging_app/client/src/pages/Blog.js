import axios from "axios";
import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  //fetching all the blogs
  const getBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blogs/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogs();
  }, []);
  console.log(blogs);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        marginTop: "20px",
      }}
    >
      {blogs &&
        blogs.map((blog) => (
          <div key={blog?._id} style={{ marginBottom: "20px" }}>
            <BlogCard
              id={blog?._id}
              isUser={localStorage.getItem("userID") === blog?.user?._id}
              title={blog.title}
              content={blog.content}
              username={blog.user?.username}
              time={blog.createdAt}
              style={{ flex: "1 0 300px", margin: "10px" }}
            />
          </div>
        ))}
    </div>
  );
};

export default Blog;
