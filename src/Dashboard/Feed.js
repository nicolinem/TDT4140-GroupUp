import { Box, Grid } from "@mui/material";

import GroupCard from "./GroupCard";

import React, { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { default as db } from "../firebase";

export const Feed = () => {
  const [groups, setGroups] = React.useState([]);

  useEffect(() => {
    const getgroups = async() => {
      const q = query(collection(db, "Teams"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        groups.push(doc.data());
        console.log(doc.id, " => ", doc.data());
      });
    }
    getgroups();
  });

  const getGroupCard = (groupObj) => {
    return (
      <Grid item sm={3}>
        <GroupCard {...groupObj} />
      </Grid>
    );
  };

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box sx={{ display: "flex", minWidth: 250, mt: 6, ml: 3 }}>
        <Sidebar />
      </Box>
      <Box sx={{ px: 5, py: 4 }}>
        <Grid container spacing={1}>
          {groups.map((groupObj) => getGroupCard(groupObj))}
        </Grid>
      </Box>
    </Box>
  );
};
