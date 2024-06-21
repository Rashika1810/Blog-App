import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { authActions } from "../redux/store";

const Navbar = () => {
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userID");
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  //handle logout functionality
  const handleLogout = () => {
    try {
      localStorage.clear();
      dispatch(authActions.logout());
      alert("Logout Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ width: 250, backgroundColor: "#202020", height: "100%" }}
    >
      <List>
        {isLogin ? (
          <>
            <ListItem button component={Link} to="/blogs">
              <ListItemText primary="Blogs" sx={{ color: "#FFFFFF" }} />
            </ListItem>
            <ListItem button component={Link} to="/my-blogs">
              <ListItemText primary="My Collection" sx={{ color: "#FFFFFF" }} />
            </ListItem>
            <ListItem button component={Link} to="/add-blogs">
              <ListItemText primary="Add Blogs" sx={{ color: "#FFFFFF" }} />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Sign In" sx={{ color: "#FFFFFF" }} />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <ListItemText primary="Sign Up" sx={{ color: "#FFFFFF" }} />
            </ListItem>
          </>
        )}
        {isLogin && (
          <ListItem button>
            <ListItemText
              onClick={handleLogout}
              primary="Logout"
              sx={{ color: "#FFFFFF" }}
            />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#202020" }}>
        <Toolbar>
          <Typography variant="h3" sx={{ flexGrow: 1 }}>
            Blog
          </Typography>
          {isMobile ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              {isLogin && (
                <Box display="flex" marginLeft="auto" marginRight="auto">
                  <Tabs
                    textColor="inherit"
                    value={value}
                    onChange={(e, val) => setValue(val)}
                    sx={{
                      ".MuiTabs-flexContainer": {
                        justifyContent: "center",
                      },
                      "& .Mui-selected": {
                        color: "#FFFFFF",
                      },
                      "& .MuiTabs-indicator": {
                        display: "none",
                      },
                    }}
                  >
                    <Tab
                      label="Blogs"
                      LinkComponent={Link}
                      to="/blogs"
                      sx={{
                        color: "#FFFFFF",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    />
                    <Tab
                      label="My Collection"
                      LinkComponent={Link}
                      to="/my-blogs"
                      sx={{
                        color: "#FFFFFF",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    />
                    <Tab
                      label="Add Blogs"
                      LinkComponent={Link}
                      to="/add-blogs"
                      sx={{
                        color: "#FFFFFF",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    />
                  </Tabs>
                </Box>
              )}
              <Box display="flex" marginLeft="auto">
                {!isLogin && (
                  <>
                    <Button
                      sx={{
                        margin: 1,
                        color: "#FFFFFF",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                        "&:active": {
                          backgroundColor: "transparent",
                        },
                      }}
                      LinkComponent={Link}
                      to="/login"
                    >
                      Sign In
                    </Button>
                    <Button
                      sx={{
                        margin: 1,
                        color: "#FFFFFF",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                        "&:active": {
                          backgroundColor: "transparent",
                        },
                      }}
                      LinkComponent={Link}
                      to="/register"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
                {isLogin && (
                  <Button
                    onClick={handleLogout}
                    sx={{
                      margin: 1,
                      color: "#FFFFFF",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                      "&:active": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    Logout
                  </Button>
                )}
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#202020",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
