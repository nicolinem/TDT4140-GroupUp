import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import image from "./DSC06122-kopi.jpg";
import { Avatar, Box, CardActionArea, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ButtonBase } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { default as db, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const GroupCard = (props) => {
  const { name, id, description, interests, members, imageReference } = props;

  console.log("test: ", name, id, description, interests);

  const navigate = useNavigate();

  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return loading ? (
    <Card
      alignItems="center"
      justify="center"
      sx={{ display: "flex", padding: 0 }}
    >
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
    </Card>
  ) : (
    <Card
      alignItems="center"
      justify="center"
      sx={{ display: "flex", padding: 0 }}
    >
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
