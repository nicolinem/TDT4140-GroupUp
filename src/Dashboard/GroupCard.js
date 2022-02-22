import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import image from "./DSC06122-kopi.jpg";
import { Avatar, Box } from "@mui/material";


const GroupCard = (props) => {
  const { name } = props;

  return (
    <Card
      alignItems="center"
      justifyContent="center"
      sx={{
        maxWidth: 300,
        maxHeight: 350,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: 30,
          bgcolor: "#e3f0d3",
          "&:hover": {
            backgroundColor: "#c5e1a5",
            opacity: [0.9, 0.8, 0.7],
          },
          borderBottomRightRadius: "60%",
          borderBottomLeftRadius: "60%",
        }}
      ></Box>
      <CardContent>
        <Box
          alignItems="center"
          justifyContent="center"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Avatar alt="Remy Sharp" src={image} sx={{ width: 75, height: 75 }} />

          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        alignItems="center"
        justifyContent="center"
        sx={{ display: "flex" }}
      >
        <Button color="success" size="small">
          Get to know
        </Button>
        <Button color="success" size="small">
          Fuck off
        </Button>
      </CardActions>
    </Card>
  );
};

export default GroupCard;
