import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Grid,
  Link as MuiLink,
} from "@mui/material";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const [inputs, setInputs] = useState({ title: "", content: "" });
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const navigate = useNavigate();

  // Fetch blog details
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const { data } = await axios.get(`/api/v1/blogs/get-blog/${id}`);
        if (data?.success) {
          setBlog(data?.blog);
          setInputs({
            title: data.blog.title,
            content: data.blog.content,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogDetails();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError(false);
    setContentError(false);

    if (!inputs.title.trim()) {
      setTitleError(true);
    }
    if (!inputs.content.trim()) {
      setContentError(true);
    }

    if (inputs.title && inputs.content) {
      try {
        const { data } = await axios.put(`/api/v1/blogs/edit-blog/${id}`, {
          title: inputs.title,
          content: inputs.content,
        });
        if (data?.success) {
          alert("Blog edited successfully");
          navigate("/my-blogs");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#202020",
          padding: 4,
          borderRadius: 2,
          marginLeft: "auto",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ color: "#FFFFFF", marginBottom: 2 }}
        >
          Edit Blog
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="off"
            value={inputs.title}
            onChange={handleChange}
            error={titleError}
            helperText={titleError ? "Title is required" : ""}
            InputLabelProps={{
              shrink: true,
              style: {
                color: "#FFFFFF",
                transform: inputs.title
                  ? "translate(0, -6px) scale(0.75)"
                  : "translate(14px, 16px) scale(1)",
              },
            }}
            InputProps={{
              style: { color: "#FFFFFF" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: titleError ? "#f44336" : "#FFFFFF",
                },
                "&:hover fieldset": {
                  borderColor: titleError ? "#f44336" : "#FFFFFF",
                },
                "&.Mui-focused fieldset": {
                  borderColor: titleError ? "#f44336" : "#FFFFFF",
                },
              },
              "& .MuiFormHelperText-root": {
                color: "#f44336",
              },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            name="content"
            label="Content"
            id="content"
            value={inputs.content}
            onChange={handleChange}
            error={contentError}
            helperText={contentError ? "Content is required" : ""}
            InputLabelProps={{
              shrink: true,
              style: {
                color: "#FFFFFF",
                transform: inputs.content
                  ? "translate(0, -6px) scale(0.75)"
                  : "translate(14px, 16px) scale(1)",
              },
            }}
            InputProps={{
              style: { color: "#FFFFFF" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: contentError ? "#f44336" : "#FFFFFF",
                },
                "&:hover fieldset": {
                  borderColor: contentError ? "#f44336" : "#FFFFFF",
                },
                "&.Mui-focused fieldset": {
                  borderColor: contentError ? "#f44336" : "#FFFFFF",
                },
              },
              "& .MuiFormHelperText-root": {
                color: "#f44336",
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#FFFFFF",
              color: "#202020",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            Edit Blog
          </Button>
          <Grid container justifyContent="center">
            <Grid item sx={{ color: "#FFFFFF" }}>
              <MuiLink
                component={Link}
                to="/"
                variant="body2"
                sx={{ color: "#FFFFFF" }}
              >
                {"Back to Home"}
              </MuiLink>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default BlogDetails;
