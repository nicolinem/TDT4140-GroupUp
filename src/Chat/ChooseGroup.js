import { ListItemButton } from "@mui/material";
import { ListItem } from "@mui/material";
import { Typography } from "@mui/material";
import { ListItemText } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { List } from "@mui/material";
import { Box } from "@mui/system";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../Dashboard/Sidebar";
import { db } from "../firebase";

export const ChooseGroups = (props) => {
  const { otherGroupID } = props;
  const [groups, setGroups] = useState([]);
  const { state } = useLocation();

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
        console.log("TEST");
      });
      setGroups(groupList);
    };

    getgroups();
  }, []);

  function handleClick(myGroupID, otherGroupID) {
    console.log("TEST", myGroupID, otherGroupID);
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
    <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
      <div>
        <Typography>Choose group:</Typography>
      </div>
      <nav aria-label="secondary mailbox folders">
        <Box sx={{ flexgrow: 1 }}>
          <List
            sx={{
              overflow: "scroll",
              overflowX: "hidden",
            }}
          >
            {groups
              .filter((group) =>
                group.members.find((c) => c.id === auth.currentUser.uid)
              )
              .map((group) => getGroup(group))}
          </List>
        </Box>
      </nav>
    </Box>
  );
};
