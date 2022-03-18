import { Box, CircularProgress, Grid } from "@mui/material";

import GroupCard from "./GroupCard";

import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import {  db } from "../firebase";

export const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = React.useState([]);

  // const getID = (idi) => {
  //   const { id } = idi;
  //   return id;
  // };

  useEffect(() => {
    const getgroups = async () => {
      const q = query(collection(db, "Teams-beta"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        groups.push({ ...doc.data(), id: doc.id });
        console.log(doc.id, " => ", doc.data());
      });

      setLoading(false);
    };
    getgroups();
  }, []);

  const getGroupCard = (groupObj) => {
    return (
      <Grid item sm={4} key={groupObj.name}>
        {/* {new GroupCard(groupObj, id)} */}
        <GroupCard {...groupObj} />
      </Grid>
    );
  };

  return loading ? (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box sx={{ display: "flex", minWidth: 250, mt: 6, ml: 3, flexgrow: 0 }}>
        <Sidebar />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="success" />
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box sx={{ display: "flex", minWidth: 250, mt: 6, ml: 3 }}>
        <Sidebar />
      </Box>
      <Box sx={{ px: 5, py: 4, flexGrow: 1 }}>
        <Grid container spacing={1}>
          {groups.map((groupsID) => getGroupCard(groupsID))}
        </Grid>
      </Box>
    </Box>
  );
};
