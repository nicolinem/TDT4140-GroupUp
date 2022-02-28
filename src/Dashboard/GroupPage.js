import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { GroupInformation } from "./GroupInformation";
import { GroupInterests } from "./GroupInterests";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import image from "./DSC06122-kopi.jpg";
import { img, CardHeader, IconButton } from "@mui/material";
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
  // const [groupName, setGroupName] = useState();

  // useEffect(() => {

  // })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", minWidth: 140 }}>
        <Box sx={{ display: "flex", minWidth: 250, mt: 6, ml: 3 }}>
          <Sidebar />
        </Box>

        <Box sx={{ display: "flex", mt: 7, ml: 10 }} >
          <Avatar
            variant="rounded"
            alt="Remy Sharp"
            src={image}
            sx={{
              width: 400, height: 350, boxShadow: 1
            }} />
        </Box>

        <Box sx={{ display: "flex", height: 80, width: 360, mt: 6, ml: 2, }}>
          <Typography
            sx={{ mt: 4, ml: 20, }}
            variant="h5"
            component="div"
            fontWeight="bold"
          >
            {name}
          </Typography>

          <Box sx={{ mt: 7, ml: -23 }}>
            <GroupOverView users={members} />
          </Box>
        </Box>
        <Box sx={{ display: "flex", minWidth: 250, mt: 55, ml: -78 }}>
          <GroupInterests />
        </Box>

        <Box sx={{ display: "flex", minWidth: 250, mt: 63, ml: -80 }}>
          <GroupInformation />
        </Box>




      </Box>
    </Box>
  );
};
