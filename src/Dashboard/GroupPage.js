import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { GroupInformation } from "./GroupInformation";
import { GroupInterests } from "./GroupInterests";
import { Button, Box, Grid, Stack, TextField, Typography } from "@mui/material";
import image from "./DSC06122-kopi.jpg";
import { img, CardHeader, IconButton, Card } from "@mui/material";
import { GroupOverView } from "./GroupOverView";
import BasicModal from "./BasicModal";
import {
  Demo,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Item,
  FolderIcon,
} from "@mui/material";

import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { height } from "@mui/system";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import { Modal } from "@mui/material";
import { ChooseGroups } from "../Chat/ChooseGroup";

export const GroupPage = () => {
  const { state } = useLocation();
  const { name, id, members, imageReference, eventDate, invitedUsers } = state;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const antallMedlemmer = members.length;

  console.log(antallMedlemmer);

  const [url, setUrl] = useState(null);

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
      });
    };
    getImage();
  }, []);

  function handleClick() {
    const otherGroupID = id;
    navigate("/choosegroup", {
      state: { otherGroupID },
    });
    console.log("hello");
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "row", minWidth: 140 }}>
        {/* Sidebar */}
        <Box sx={{ display: "flex", minWidth: 250, mt: 6, ml: 3 }}>
          <Sidebar />
        </Box>

        {/* Innhold */}
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          {/* Toppbit */}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: "2em",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Bilde */}
              <Box sx={{ display: "flex" }}>
                <Avatar
                  variant="rounded"
                  alt="Remy Sharp"
                  src={url}
                  sx={{
                    width: 400,
                    height: 350,
                    boxShadow: 1,
                  }}
                />
              </Box>

              {/* Interessetags */}
              <div style={{ marginTop: "1em", maxWidth: 400 }}>
                <GroupInterests />
              </div>
            </div>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: 80,
                width: 360,
              }}
            >
              <Typography
                sx={{}}
                variant="h5"
                component="div"
                fontWeight="bold"
              >
                {name}
              </Typography>

              {/*<div style={{ display: "flex", flexDirection: "column" }}>*/}
              <GroupOverView users={members} />

              <div style={{ marginTop: "1em", maxWidth: 400 }}>
                <Card
                  alignItems="center"
                  justify="center"
                  sx={{
                    p: 1,
                    pr: 2,
                    pl: 2,
                    ml: 1,
                    mb: 1,
                    backgroundColor: "#aed581",
                    "&:hover": {
                      backgroundColor: "#c5e1a5",
                    },
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {antallMedlemmer}
                  </div>
                </Card>
              </div>
            </Box>
          </div>
        </div>

        {/* Bunn */}
        {/*}
        <button onClick={handleOpen}></button>
        */}
      </Box>
      {/* <Grid container justify="center"> */}
      {/* <Button
          // Button for starting chat
          onClick={handleOpen}
          variant="contained"
          //size="rg"
          fullWidth
          color="success"
          sx={{ mt: 3, mb: 2 }}
          onClose={handleClose}
          //alignItems="center"
        >
          Start chat
        </Button>
      </Grid>
      <Modal
        // The popup that shows up when pressing chat button
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <ChooseGroups otherGroupID={id} />
        </Box>
      </Modal> */}
    </Box>
  );
};
