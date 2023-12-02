import "./UpdateProfile.css";
import { Avatar, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);

  const [name, SetName] = useState(user.name);
  const [email, SetEmail] = useState(user.email);
  const [avatar, SetAvatar] = useState("");
  const [avatarPrev, SetAvatarPrev] = useState(user.avatar.url);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        SetAvatarPrev(Reader.result);
        SetAvatar(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, avatar));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (updateError) {
      toast.error(updateError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, updateError, message]);

  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <Avatar
          src={avatarPrev}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          value={name}
          className="updateProfileInputs"
          placeholder="Name"
          required
          onChange={(e) => {
            SetName(e.target.value);
          }}
        />

        <input
          type="email"
          placeholder="Email"
          className="updateProfileInputs"
          required
          value={email}
          onChange={(e) => {
            SetEmail(e.target.value);
          }}
        />

        <Button type="submit" disabled={updateLoading}>
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
