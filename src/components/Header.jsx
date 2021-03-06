import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Alert,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/userSlice";
import { setCurrMessage } from "../redux/messageSlice";

const Header = () => {
  const { username } = useSelector((state) => state.user);
  const { msg, type } = useSelector((state) => state.message);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetMessage = () => {
    dispatch(
      setCurrMessage({
        msg: "",
        type: "",
      })
    );
  };

  useEffect(() => {
    if (username !== "") {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [username]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorEl(null);

    dispatch(
      setCurrentUser({
        username: "",
        token: "",
      })
    );

    resetMessage();
    navigate("/");
  };

  const handleLogin = () => {
    resetMessage();
    navigate("/login");
  };

  const handleSignup = () => {
    resetMessage();
    navigate("/signup");
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Event List
        </Typography>

        {auth ? (
          <Toolbar style={{ paddingRight: 0 }}>
            <Typography component="div">Welcome, {username}</Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={() => {
                setAnchorEl(null);
              }}
            >
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          </Toolbar>
        ) : (
          <div>
            <Button color="inherit" onClick={handleLogin}>
              LOGIN
            </Button>
            <Button color="inherit" onClick={handleSignup}>
              SIGNUP
            </Button>
          </div>
        )}
      </Toolbar>
      {msg !== "" ? (
        <Alert
          sx={{
            width: "100%",
          }}
          severity={type}
        >
          {msg}
        </Alert>
      ) : null}
    </AppBar>
  );
};

export default Header;
