import { db } from "../firebase";
import {
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import BlenderIcon from "@mui/icons-material/Blender";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import GroupsIcon from "@mui/icons-material/Groups";
import React, { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EventIcon from "@mui/icons-material/Event";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [groups, setGroups] = useState([]);
  const auth = getAuth();

  useEffect(
    () =>
      onSnapshot(collection(db, "Teams-beta"), (snapshot) =>
        setGroups(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 500,
        bgcolor: "background.paper",
        backgroundColor: "hsl(0, 0%, 98%)",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton component="button" href="/" sx={{ borderRadius: 8 }}>
        <ListItemIcon>
          <DynamicFeedIcon />
        </ListItemIcon>
        <ListItemText primary="Main page" />
      </ListItemButton>

      <ListItemButton
        component="button"
        href="/MyGroups"
        sx={{ borderRadius: 8 }}
      >
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="My groups" />
      </ListItemButton>

      {/* <ListItemButton
        component="button"
        href="/AddMembers"
        sx={{ borderRadius: 8 }}
      >
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Add members" />
      </ListItemButton> */}

      <ListItemButton
        component="button"
        href="/newgroup"
        sx={{ borderRadius: 8 }}
      >
        <ListItemIcon>
          <GroupAddIcon />
        </ListItemIcon>
        <ListItemText primary="Add a group" />
      </ListItemButton>

      <ListItemButton
        component="button"
        href="/matches"
        sx={{ borderRadius: 8 }}
      >
        <ListItemIcon>
          <FavoriteIcon />
        </ListItemIcon>
        <ListItemText primary="Matches" />
      </ListItemButton>

      <ListItemButton
        component="button"
        href="/events"
        sx={{ borderRadius: 8 }}
      >
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Events" />
      </ListItemButton>

      <ListItemButton
        component="button"
        href="/chatlist"
        sx={{ borderRadius: 8 }}
      >
        <ListItemIcon>
          <MailOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Chats" />
      </ListItemButton>
    </List>
  );
};
