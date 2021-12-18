import React from "react";
import styled from "styled-components";
import { TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Signup = () => {
  return (
    <SignUpBody>
      <div className="container">
        <div className="icon-block">
          <LockOutlinedIcon />
        </div>
        <h1 className="title">Sign up</h1>
        <form className="signup-form" action="">
          <TextField label="Username" color="grey" required />
          <TextField label="Password" color="grey" required />
          <TextField label="Repeat password" color="grey" required />
          <Button variant="contained">SIGN UP</Button>
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
