import image from "./DSC06122-kopi.jpg";

import * as React from "react";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton, ListItemIcon, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { default as db, storage } from "../firebase";
import PersonIcon from "@mui/icons-material/Person";

export const GroupOverView = (props) => {
  const { users, id } = props;
  const [loading, setLoading] = useState(true);
  const [usersList, setUsersList] = React.useState([]);
  const [groupsID, setGroupsID] = React.useState([]);


  const getGroupMember = (member) => {
    console.log("member: ", member);
    if (member.firstName != "") {
      return (
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={member.firstName} />
        </ListItemButton>
      );
    }
  };

  return (
    <List
      component="div"
      disablePadding
      sx={{ height: 250, width: 250, mt: 6, ml: -3, overflow: "scroll" }}
    >
      {users.map((user) => getGroupMember(user))};
    </List>
  );
};
