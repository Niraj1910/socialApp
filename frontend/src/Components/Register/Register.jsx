import "./Register.css";
import { Avatar, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../Actions/User";

const Register = () => {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [avatar, SetAvatar] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        SetAvatar(Reader.result);
      }
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password, avatar));
  };

  useEffect(() => {
    if (error) {
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error]);

  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          value={name}
          className="registerInputs"
          placeholder="Name"
          required
          onChange={(e) => {
            SetName(e.target.value);
          }}
        />

        <input
          type="email"
          placeholder="Email"
          className="registerInputs"
          required
          value={email}
          onChange={(e) => {
            SetEmail(e.target.value);
          }}
        />

        <input
          type="password"
          placeholder="Password"
          className="registerInputs"
          required
          value={password}
          onChange={(e) => {
            SetPassword(e.target.value);
          }}
        />

        <Link to="/">
          <Typography>Already Signed Up? Login Now</Typography>
        </Link>

        <Button type="submit" disabled={loading}>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
