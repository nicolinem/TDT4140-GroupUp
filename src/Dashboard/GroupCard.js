import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import image from "./DSC06122-kopi.jpg";
import {
  Avatar,
  Box,
  CardActionArea,
  CircularProgress,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ButtonBase } from "@mui/material";
import {
  doc,
  getDoc,
  onSnapshot,
  collection,
  updateDoc,
} from "firebase/firestore";
import { default as db, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const GroupCard = (props) => {
  const {
    name,
    id,
    description,
    interests,
    members,
    imageReference,
    likedGroups,
    isLiked,
  } = props;

  console.log("test: ", name, id, description, interests);

  const navigate = useNavigate();
  console.log(props.isLiked);
  const [liked, setLiked] = useState(props.isLiked);
  const handleIconClick = () => {
    /* if (liked) {

          } else  */

    props.handleLikeGroup(id, likedGroups);

    setLiked((prev) => !prev);
  };

  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const auth = getAuth();

  useEffect(
    () =>
      onSnapshot(collection(db, "Users"), (snapshot) =>
        setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  console.log(users);

  const leaveGroup = async () => {
    const groupRef = doc(db, "Teams-beta", id);
    await updateDoc(groupRef, {
      members: members.filter((member) => member != auth.currentUser.uid),
    });
    navigate("/MyGroups");
  };

  useEffect(() => {
    const getImage = async () => {
      console.log(imageReference);
      getDownloadURL(ref(storage, imageReference)).then((url) => {
        console.log(url);
        const img = React.createElement(
          "img",
          {
            src: url,
          },
          null
        );

        setUrl(url);
        setLoading(false);
      });
    };
    getImage();
  }, []);

  function handleClick() {
    navigate("/GroupPage", {
      state: { name, id, description, interests, members, imageReference },
    });
    console.log("hello");
  }

  function handleClose() {}

  return loading ? (
    <Card
      alignItems="center"
      justify="center"
      sx={{ display: "flex", padding: 0, width: "100%", flexgrow: 1 }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{
          display: "flex",
          flexgrow: 1,
          maxHeight: 350,
          padding: 0,
          flexDirection: "column",
          "&:hover": {
            backgroundColor: "#c5e1a5",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <Box
          sx={{
            width: 1,
            display: "flex",
            flexgrow: 1,
            maxHeight: 350,
            padding: 0,
            // bgcolor: "#e3f0d3",
            "&:hover": {
              // backgroundColor: "#e3f0d3",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              width: "90%",
              padding: 0,
              flexDirection: "column",
              width: 1,
              borderRadius: 10,
              bgcolor: "white",
            }}
          >
            <Box
              alignItems="center"
              justify="center"
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box flexrgrow="1" padding="0">
                <CircularProgress color="success" />
              </Box>

              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ fontFamily: "Avenir" }}
              >
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </CardActionArea>
      ¨
    </Card>
  ) : (
    <Card
      alignItems="center"
      justify="center"
      sx={{ display: "flex", padding: 0 }}
    >
      <IconButton aria-label="add to favorites" onClick={handleIconClick}>
        {props.isLiked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
      </IconButton>
      <Modal
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // BackdropComponent={Backdrop}
      ></Modal>
      <CardActionArea
        onClick={handleClick}
        sx={{
          display: "flex",
          flexgrow: 1,
          maxHeight: 350,
          padding: 0,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: 1,
            display: "flex",
            flexgrow: 1,
            maxHeight: 350,
            padding: 0,
            // bgcolor: "#e3f0d3",
            "&:hover": {
              // backgroundColor: "#e3f0d3",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              width: "90%",
              padding: 0,
              flexDirection: "column",
              width: 1,
              borderRadius: 10,
              bgcolor: "white",
            }}
          >
            <Box
              alignItems="center"
              justify="center"
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                flexrgrow="1"
                padding="0"
                overflow="hidden"
                maxHeight="220px"
              >
                <img src={url} width="100%" />
              </Box>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ fontFamily: "Avenir" }}
              >
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default GroupCard;
