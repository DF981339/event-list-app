import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/userSlice";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      console.error("password not match");
      return;
    }

    const requestBody = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:4000/api/user/signup", requestBody)
      .then((res) => {
        if (res.status === 201) {
          axios
            .post("http://localhost:4000/api/user/login", requestBody)
            .then((res) => {
              if (res.status === 200) {
                dispatch(
                  setCurrentUser({
                    username: res.data.data.username,
                    token: res.data.data.token,
                  })
                );
                navigate("/eventlist");
              }
            })
            .catch((err) => console.log(err));
        } else {
          console.log("user already exist");
        }
      })
      .catch((err) => console.log("user already exist"));
  };

  return (
    <SignUpBody>
      <div className="container">
        <div className="icon-block">
          <LockOutlinedIcon />
        </div>
        <h1 className="title">Sign up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            color="grey"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <TextField
            label="Password"
            color="grey"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <TextField
            label="Repeat password"
            color="grey"
            type="password"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
            required
          />
          <Button variant="contained" type="submit">
            SIGN UP
          </Button>
        </form>
      </div>
    </SignUpBody>
  );
};

export default Signup;

const SignUpBody = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;

  .container {
    display: flex;
    flex-direction: column;
    padding: 20px;

    h1 {
      margin: 10px 0 20px;
    }

    .icon-block {
      margin: 0 auto;
      padding: 10px;
      border-radius: 50%;
      background-color: rgb(158, 39, 176);
      color: white;
    }

    .title {
      text-align: center;
    }

    .signup-form {
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 300px;
      justify-content: space-between;
    }
  }
`;
