import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Avatar,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClickableCard from "./ClickableCard";

const BlogCard = ({ title, content, username, time, id, isUser }) => {
  const formattedDate = new Date(time).toLocaleDateString();
  const avatarLetter = username ? username.charAt(0).toUpperCase() : "";

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/one-blog-details/${id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const { data } = await axios.delete(`/api/v1/blogs/delete-blog/${id}`);
      if (data?.success) {
        alert("Blog Deleted Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <ClickableCard onClick={handleCardClick}>
      <StyledCard>
        <CardContent
          sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          {/* Avatar and Title */}
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Avatar sx={{ bgcolor: "#FF9800", marginRight: 2 }}>
              {avatarLetter}
            </Avatar>
            <Typography variant="h5" sx={{ color: "#FFFFFF", flexGrow: 1 }}>
              {title}
            </Typography>
          </Box>
          {/* Divider */}
          <Divider sx={{ backgroundColor: "#FFFFFF", marginBottom: 2 }} />
          {/* Content */}
          <Typography
            variant="body2"
            sx={{ color: "#E0E0E0", marginBottom: 2 }}
          >
            {content.substring(0, 60)}...
          </Typography>
          {/* Author */}
          <Typography sx={{ color: "#BDBDBD", fontWeight: "bold" }}>
            By: {username}
          </Typography>
          {/* Date */}
          <Typography
            sx={{ color: "#BDBDBD", marginTop: 1, fontWeight: "bold" }}
          >
            {formattedDate}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {isUser && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "auto",
                marginBottom: 2,
              }}
            >
              <Button
                startIcon={<Edit sx={{ color: "#FFFFFF" }} />}
                variant="contained"
                color="primary"
                sx={{ marginRight: 1 }}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                startIcon={<Delete sx={{ color: "#FFFFFF" }} />}
                variant="contained"
                color="error"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
          )}
        </CardContent>
      </StyledCard>
    </ClickableCard>
  );
};

// Styled component
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#303030",
  borderRadius: 10,
  boxShadow: "0px 14px 28px rgba(0,0,0,0.25), 0px 10px 10px rgba(0,0,0,0.22)",
  padding: theme.spacing(2),
  color: "#FFFFFF",
  width: 350,
  height: 350,
  flex: "0 0 auto",
  margin: theme.spacing(1),
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

export default BlogCard;
