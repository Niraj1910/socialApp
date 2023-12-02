import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../Actions/User";
import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, SetNewPassword] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const { error, message, loading } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, newPassword));
  };

  useEffect(() => {
    if (error) {
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <input
          type="password"
          placeholder="New Password"
          required
          className="resetPasswordInputs"
          value={newPassword}
          onChange={(e) => {
            SetNewPassword(e.target.value);
          }}
        />

        <Link to="/">
          <Typography>Login</Typography>
        </Link>
        <Typography>Or</Typography>

        <Link to="/forgot/password">
          <Typography>Request Another Token!!</Typography>
        </Link>

        <Button disabled={loading} type="submit">
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
