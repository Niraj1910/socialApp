import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Actions/User";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [oldPassword, SetOldPassword] = useState("");
  const [newPassword, SetNewPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <input
          type="password"
          placeholder="Old Password"
          required
          className="updatePasswordInputs"
          value={oldPassword}
          onChange={(e) => {
            SetOldPassword(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="New Password"
          required
          className="updatePasswordInputs"
          value={newPassword}
          onChange={(e) => {
            SetNewPassword(e.target.value);
          }}
        />

        <Button disabled={loading} type="submit">
          Change Passwod
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
