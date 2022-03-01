import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { GroupInformation } from "./GroupInformation";
import { GroupInterests } from "./GroupInterests";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import image from "./DSC06122-kopi.jpg";
import { img, CardHeader, IconButton, Card } from "@mui/material";
import { GroupOverView } from "./GroupOverView";
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

import React from "react";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import { height } from "@mui/system";



export const GroupPage = () => {
  const { state } = useLocation();
  const { name, id, members } = state;

  const antallMedlemmer = members.length;
  console.log(antallMedlemmer);

  // const [groupName, setGroupName] = useState();

  // useEffect(() => {

  // })
  /*const antallPersoner = (members) = {
    return (
      members
    )
  }*/

  return (
    <Box sx={{ flexGrow: 1 }}>


      <Box sx={{ display: "flex", flexDirection: "row", minWidth: 140 }}>
        {/* Sidebar */}
        <Box sx={{ display: "flex", minWidth: 250, mt: 6, ml: 3 }}>
          <Sidebar />
        </Box>

        {/* Innhold */}
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {/* Toppbit */}

          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "2em" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Bilde */}
              <Box sx={{ display: "flex" }} >
                <Avatar
                  variant="rounded"
                  alt="Remy Sharp"
                  src={image}
                  sx={{
                    width: 400, height: 350, boxShadow: 1
                  }} />
              </Box>

              {/* Interessetags */}
              <div style={{ marginTop: "1em", maxWidth: 400 }}>
                <GroupInterests />
              </div>
            </div>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: 80, width: 360 }}>
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
                <Card alignItems="center" justify="center" sx={{
                  p: 1, pr: 2, pl: 2, ml: 1, mb: 1, backgroundColor: "#aed581", "&:hover": {
                    backgroundColor: "#c5e1a5"
                  },
                }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {antallMedlemmer}
                  </div>
                </Card>
              </div>
            </Box>
          </div>




          {/* Bunn */}
          <GroupInformation />

        </div>
      </Box>

    </Box >
  );
};
