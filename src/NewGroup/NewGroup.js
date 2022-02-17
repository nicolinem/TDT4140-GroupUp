import React from "react";
import { Button, Box, Container, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import db from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

export const NewGroup = () => {
  const groupRef = useRef();

  const handleClick = (e) => {
    const groupDocRef = collection(db, "Teams");
    const docRef = addDoc(groupDocRef, {
      name: groupRef.current.value,
    });

    addDoc(collection(db, "Teams", docRef, "Memberships"), {
      created: serverTimestamp(),
      name: groupRef.current.value,
    });
    console.log("check");
  };

  const addGroup = () => {
    // const teamsRef = collection(db, "Teams");
  };

  const addmember = () => {};
  // const docRef = addDoc(teamsRef, {
  //   created: serverTimestamp(),
  //   name: groupRef.current.value,
  // });

  return (
    <Container maxWidth="xs">
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
    </Container>
  );
};
