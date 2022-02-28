import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { GroupInformation } from "./GroupInformation";
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

import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

export const GroupPage = () => {
  const { state } = useLocation();
  const { name, id, members, imageReference } = state;
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", minWidth: 140 }}>
        <Box sx={{ display: "flex", minWidth: 250, mt: 6, ml: 3 }}>
          <Sidebar />
        </Box>

        <Box sx={{ display: "flex", mt: 7, ml: 5 }}>
          <img src={url} height={350} width={500} />
        </Box>

        <Box sx={{ display: "flex", height: 250, width: 360, mt: 6, ml: -3 }}>
          <Typography
            sx={{ mt: 3, ml: 20 }}
            variant="h5"
            component="div"
            fontWeight="bold"
          >
            {name}
          </Typography>

          <Box sx={{ mt: 10, ml: -23 }}>
            <GroupOverView users={members} />
          </Box>
        </Box>

        <Box sx={{ display: "flex", minWidth: 250, mt: 58, ml: -96 }}>
          <GroupInformation />
        </Box>
      </Box>
    </Box>
  );
};
