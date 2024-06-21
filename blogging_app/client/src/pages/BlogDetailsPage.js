import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Avatar,
  CircularProgress,
} from "@mui/material";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`/api/v1/blogs/get-blog/${id}`);
        setBlogPost(response.data.blog);
        const userId = response.data.blog.user;
        fetchUser(userId);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    const fetchUser = async (userId) => {
      try {
        const userResponse = await axios.get(`/api/v1/user/get-user/${userId}`);
        setUser(userResponse.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchBlogPost();
  }, [id]);

  if (!blogPost || !user) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f0f0f0",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const { title, content, createdAt } = blogPost;
  const { username } = user;
  const formattedDate = new Date(createdAt).toLocaleDateString();
  const avatarLetter = username ? username.charAt(0).toUpperCase() : "";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 800,
          width: "100%",
          height: "50vh",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent sx={{ padding: 4, flexGrow: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Avatar
              sx={{ bgcolor: "#000000", color: "#ffffff", marginRight: 2 }}
            >
              {avatarLetter}
            </Avatar>
            <Typography variant="h5" sx={{ color: "#000000", flexGrow: 1 }}>
              {title}
            </Typography>
          </Box>
          <Divider sx={{ backgroundColor: "#000000", marginBottom: 2 }} />
          <Typography
            variant="body2"
            sx={{
              color: "#333333",
              marginBottom: 2,
              flexGrow: 1,
              overflowY: "auto",
            }}
          >
            {content}
          </Typography>
        </CardContent>
        <Box
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #e0e0e0",
            backgroundColor: "#f7f7f7",
          }}
        >
          <Typography variant="subtitle2" sx={{ color: "#555555" }}>
            Author: {username}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#555555" }}>
            Published: {formattedDate}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default BlogDetailsPage;
