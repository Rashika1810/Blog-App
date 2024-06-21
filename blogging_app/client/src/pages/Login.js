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
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  //making a variable for use dispatch
  const dispatch = useDispatch();

  //handling input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    if (!inputs.email) {
      setEmailError(true);
    }
    if (!inputs.password) {
      setPasswordError(true);
    }

    if (inputs.email && inputs.password) {
      try {
        const { data } = await axios.post("/api/v1/user/login", {
          email: inputs.email,
          password: inputs.password,
        });
        if (data.success) {
          localStorage.setItem("userID", data?.user?._id);
          localStorage.setItem("username", data?.user?.username);
          dispatch(authActions.login());
          alert("Login Successful");
          navigate("/");
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
          Sign In
        </Typography>
        <>
          <form onSubmit={handleSubmit}>
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                Sign In
              </Button>
              <Grid container justifyContent="center">
                <Grid item sx={{ color: "#FFFFFF" }}>
                  Don't have an account?
                  <MuiLink
                    component={Link}
                    to="/register"
                    variant="body2"
                    sx={{ color: "#FFFFFF" }}
                  >
                    {" Sign Up"}
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

export default Login;
