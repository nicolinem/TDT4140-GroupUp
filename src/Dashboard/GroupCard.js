import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import image from "./DSC06122-kopi.jpg";
import { Avatar, Box, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ButtonBase } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { default as db } from "../firebase";

const GroupCard = (props) => {
  const { name, id } = props;

  // const [group, setGroup] = React.useState([]);
  console.log("test: ", name, id);

  // console.log("test2: ", group);
  // const { name } = doc.data();
  // const { idi } = id;
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getgroups = async () => {
  //     const docRef = doc(db, "Teams", groupID);

  //     const group = await getDoc(docRef);
  //     setGroup(group.data());
  //     console.log("THIIIISSSS", group.id, " => ", group.data());
  //   };
  //   getgroups();
  // }, []);

  function run() {
    navigate("/GroupPage", { state: { name, id } });
    console.log("hello");
  }

  return (
    <Card
      alignItems="center"
      justify="center"
      sx={
        {
          // maxWidth: 300,
          // maxHeight: 350,
          // display: "flex",
          // flexDirection: "column",
          // borderTopRightRadius: "20%",
          // borderTopLeftRadius: "20%",
        }
      }
    >
      <CardActionArea
        onClick={run}
        sx={{
          maxWidth: 300,
          maxHeight: 350,
          display: "flex",
          flexDirection: "column",
          // borderTopRightRadius: "20%",
          // borderTopLeftRadius: "20%",
        }}
      >
        <Box
          sx={{
            maxHeight: 350,
            bgcolor: "#e3f0d3",
            "&:hover": {
              backgroundColor: "#c5e1a5",
              opacity: [0.9, 0.8, 0.7],
            },
            borderBottomRightRadius: "60%",
            borderBottomLeftRadius: "60%",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              mt: 1,
              flexDirection: "column",
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              bgcolor: "white",
            }}
          >
            <Box
              alignItems="center"
              justify="center"
              sx={{
                display: "flex",
                m: 0,
                flexDirection: "column",
                // borderTopRightRadius: "60%",
                // borderTopLeftRadius: "60%",
                // bgcolor: "white",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src={image}
                sx={{ width: 75, height: 75 }}
              />

              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species
              </Typography>
            </Box>
          </CardContent>
        </Box>
        {/* <CardActions
          alignItems="center"
          justifyContent="center"
          sx={{ display: "flex" }}
        >
          <Button color="success" size="small">
            Get to know
          </Button>
        </CardActions> */}
      </CardActionArea>
    </Card>
  );
};

export default GroupCard;
