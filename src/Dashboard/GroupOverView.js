import image from "./DSC06122-kopi.jpg";

import * as React from "react";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton, ListItemIcon, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { default as db } from "../firebase";
import { useLocation } from "react-router-dom";




export function GroupOverView() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = React.useState([]);
  const [groupsID, setGroupsID] = React.useState([]);



  // const getID = (idi) => {
  //   const { id } = idi;
  //   return id;
  // };

  useEffect(() => {
    const getgroups = async () => {
      const q = query(collection(db, "Users"), where);

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
        console.log(doc.id, " => ", doc.data());
      });

      setLoading(false);
    };
    getgroups();
  });
  return (
    <List component="div" disablePadding>
      {" "}
      {/* {groups
          .filter((group) => group.members.includes(auth.currentUser.uid))
          .map((group) => (
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={group.name} />
            </ListItemButton>
          ))} */}
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon></ListItemIcon>
        <ListItemText primary="Group1" />
      </ListItemButton>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon></ListItemIcon>
        <ListItemText primary="Group2" />
      </ListItemButton>
    </List>

    // <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
    //     <ListItem>
    //         <ListItemAvatar>
    //             <Avatar alt="Remy Sharp" src={image} sx={{ width: 40, height: 40 }} />
    //         </ListItemAvatar>
    //         <ListItemText primary="Gruppemedlem1" />
    //     </ListItem>
    //     <ListItem>
    //         <ListItemAvatar>
    //             <Avatar alt="Remy Sharp" src={image} sx={{ width: 40, height: 40 }} />
    //         </ListItemAvatar>
    //         <ListItemText primary="Gruppemedlem2" />
    //     </ListItem>
    //     <ListItem>
    //         <ListItemAvatar>
    //             <Avatar alt="Remy Sharp" src={image} sx={{ width: 40, height: 40 }} />
    //         </ListItemAvatar>
    //         <ListItemText primary="Gruppemedlem3" />
    //     </ListItem>
    //     <ListItem>
    //         <ListItemAvatar>
    //             <Avatar alt="Remy Sharp" src={image} sx={{ width: 40, height: 40 }} />
    //         </ListItemAvatar>
    //         <ListItemText primary="Gruppemedlem4" />
    //     </ListItem>
    // </List>
  );
}
