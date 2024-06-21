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

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  //handling input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        alert("User Registered Sucessfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
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
          Sign Up
        </Typography>
        <>
          <form onSubmit={handleSubmit}>
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={inputs.username}
                onChange={handleChange}
                error={usernameError}
                helperText={usernameError ? "Username is required" : ""}
                InputLabelProps={{
                  style: { color: "#FFFFFF" },
                }}
                InputProps={{
                  style: { color: "#FFFFFF" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: usernameError ? "#f44336" : "#FFFFFF",
                    },
                    "&:hover fieldset": {
                      borderColor: usernameError ? "#f44336" : "#FFFFFF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: usernameError ? "#f44336" : "#FFFFFF",
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={inputs.email}
                onChange={handleChange}
                error={emailError}
                helperText={emailError ? "Email is required" : ""}
                InputLabelProps={{
                  style: { color: "#FFFFFF" },
                }}
                InputProps={{
                  style: { color: "#FFFFFF" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: emailError ? "#f44336" : "#FFFFFF",
                    },
                    "&:hover fieldset": {
                      borderColor: emailError ? "#f44336" : "#FFFFFF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: emailError ? "#f44336" : "#FFFFFF",
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={inputs.password}
                onChange={handleChange}
                error={passwordError}
                helperText={passwordError ? "Password is required" : ""}
                InputLabelProps={{
                  style: { color: "#FFFFFF" },
                }}
                InputProps={{
                  style: { color: "#FFFFFF" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: passwordError ? "#f44336" : "#FFFFFF",
                    },
                    "&:hover fieldset": {
                      borderColor: passwordError ? "#f44336" : "#FFFFFF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: passwordError ? "#f44336" : "#FFFFFF",
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
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item sx={{ color: "#FFFFFF" }}>
                  Already have an account?
                  <MuiLink
                    component={Link}
                    to="/login"
                    variant="body2"
                    sx={{ color: "#FFFFFF" }}
                  >
                    {" Sign In"}
                  </MuiLink>
                </Grid>
              </Grid>
            </Box>
          </form>
        </>
      </Box>
    </Container>
  );
};

export default Register;
