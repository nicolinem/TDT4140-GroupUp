import React from "react";
import { Button, Box, Container, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import { default as db, auth, useAuth } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { Sidebar } from "../Dashboard/Sidebar";

export const NewGroup = () => {
  const groupRef = useRef();
  const currentUser = useAuth();

  const handleClick = async () => {
    console.log(currentUser?.uid);

     console.log(typeof currentUser?.uid);
    const groupCollRef = collection(db, "Teams-beta");
    const documentref = await addDoc(groupCollRef, {
      members: [{userID: currentUser?.uid, role: "admin"}],
    }); 

    /* const ref = documentref.id;
    const memberDocument = doc(
      db,
      "Teams",
      ref,
      "Memberships",
      currentUser.uid
    );

    await setDoc(memberDocument, {
      name: "Hi I am a Member",
    });

    console.log("check"); */
  };

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box sx={{ minWidth: 250, mt: 6, ml: 3 }}>
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
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "xs",
            padding: 5,
          }}
        >
          <Typography>Create a new group!</Typography>

          <TextField
            id="outlined-basic"
            inputRef={groupRef}
            margin="normal"
            label="Group Name"
            variant="outlined"
            color="success"
            fullWidth
          />

          <Button
            variant="contained"
            fullWidth
            color="success"
            onClick={handleClick}
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
