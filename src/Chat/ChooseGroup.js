import { ListItemButton } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { List } from "@mui/material";
import { Box } from "@mui/system";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import db from "../firebase";

export const ChooseGroups = () => {
  const [groups, setGroups] = useState([]);
  const { state } = useLocation();
  const { otherGroupID } = state;

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const getgroups = async () => {
      const q = query(collection(db, "Teams-beta"));

      const querySnapshot = await getDocs(q);
      const groupList = [];
      querySnapshot.forEach((doc) => {
        groupList.push({ ...doc.data(), id: doc.id });
        console.log(doc.id, " => ", doc.data());
      });
      setGroups(groupList);
      console.log(groups);
    };

    getgroups();
    console.log(groups);
  }, []);

  function handleClick(myGroupID, otherGroupID) {
    console.log("HER", otherGroupID);
    console.log(myGroupID);
    navigate("/chat", {
      state: { myGroupID, otherGroupID },
    });
  }

  // const checkGroup = () => {
  //   const mygroups = groups.filter((group) =>
  //     group.members.includes(auth.currentUser.uid)
  //   );
  //   if (mygroups.length) {
  //     setHasGroups(true);
  //   }
  // };

  const getGroup = (group) => {
    console.log("Group: ", group);

    return (
      <ListItemButton sx={{}}>
        <ListItemIcon></ListItemIcon>
        <ListItemText
          primary={group.name}
          onClick={() => handleClick(group.id, otherGroupID)}
        />
      </ListItemButton>
    );
  };

  return (
    <Box>
      <div>Choose Group:</div>
      {/* <nav aria-label="secondary mailbox folders"> */}
      <div>
        <List
          sx={
            {
              // overflow: "scroll",
              // overflowX: "hidden",
              // height: "60%",
              // maxHeight: 445,
              // minHeight: 300,
            }
          }
        >
          {groups
            .filter((group) => group.members.includes(auth.currentUser.uid))
            .map((group) => getGroup(group))}
        </List>
      </div>
      {/* </nav> */}
    </Box>
  );
};
