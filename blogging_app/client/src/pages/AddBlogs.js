import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddBlogs = () => {
  const id = localStorage.getItem("userID");
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const navigate = useNavigate();

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

    if (!inputs.title) {
      setTitleError(true);
    }
    if (!inputs.content) {
      setContentError(true);
    }

    if (inputs.title && inputs.content) {
      try {
        const { data } = await axios.post("api/v1/blogs/add-blog", {
          title: inputs.title,
          content: inputs.content,
          user: id,
        });
        if (data?.success) {
          alert("Blog added successfully");
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
        }}
      >
        <Typography component="h1" variant="h5" sx={{ color: "#FFFFFF" }}>
          Add Blog
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box noValidate sx={{ mt: 3, width: "100%" }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="off"
              autoFocus
              value={inputs.title}
              onChange={handleChange}
              error={titleError}
              helperText={titleError ? "Title is required" : ""}
              InputLabelProps={{
                style: { color: "#FFFFFF" },
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
                style: { color: "#FFFFFF" },
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
              Add Blog
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
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddBlogs;
