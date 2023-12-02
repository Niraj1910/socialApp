import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followerAndUnfollowUser,
  getUserPosts,
  getUserProfile,
} from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import Post from "../Post/Post";
import User from "../User/User";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userProfile);
  const { user: me } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.like);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followerAndUnfollowUser(user._id));
    dispatch(getUserProfile(params.id));
  };

  useEffect(() => {
    dispatch(getUserProfile(params.id));
    dispatch(getUserPosts(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user, params.id, me._id]);

  useEffect(() => {
    if (error) {
      dispatch({ type: "clearErrors" });
    }

    if (followError) {
      dispatch({ type: "clearErrors" });
    }

    if (userError) {
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, followError, userError, dispatch]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerId={post.owner._id}
              ownerName={post.owner.name}
              ownerImage={post.owner.avatar.url}
              page={"user/profile"}
            />
          ))
        ) : (
          <Typography variant="h6">
            {user && user.name} Have Not Made Any Posts Yet
          </Typography>
        )}
      </div>

      <div className="accountright">
        {user && (
          <>
            <Avatar
              src={user.avatar.url}
              sx={{ height: "8vmax", width: "8vmax" }}
            />
            <Typography variant="h5"> {user.name} </Typography>

            <div>
              <button onClick={() => setFollowersToggle(!followersToggle)}>
                <Typography>Followers</Typography>
              </button>
              <Typography>{user.followers.length}</Typography>
            </div>

            <div>
              <button onClick={() => setFollowingToggle(!followingToggle)}>
                <Typography>Following</Typography>
              </button>
              <Typography>{user.following.length}</Typography>
            </div>

            <div>
              <Typography>Posts</Typography>
              <Typography>{user.posts.length}</Typography>
            </div>

            {myProfile ? null : (
              <Button
                variant="contained"
                onClick={followHandler}
                disabled={followLoading}
                style={{ background: following ? "red" : "green" }}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
            )}
          </>
        )}

        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>

            {user && user.followers.length > 0 ? (
              user.followers.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                {user?.name} Have No Followers
              </Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>

            {user && user.following.length > 0 ? (
              user.following.map((follow) => (
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                {user?.name} Do Not Follow Anyone
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default UserProfile;
