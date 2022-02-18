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

export const NewGroup = () => {
  const groupRef = useRef();
  const currentUser = useAuth();

  const handleClick = async () => {
    const groupCollRef = collection(db, "Teams");
    const documentref = await addDoc(groupCollRef, {
      name: groupRef.current.value,
    });

    const ref = documentref.id;
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

    console.log("check");
  };

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
