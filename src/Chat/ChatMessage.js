import React, { Component, useEffect, useRef, useState } from "react";
import { db, useAuth, storage } from "../firebase";
import "firebase/firestore";

import {
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export const ChatMessage = (props) => {
  const inputRef = useRef();
  const auth = getAuth();
  const user = auth.currentUser;

  const userMessage = {
    display: "inline-flex",
    alignSelf: "flex-end",
    bgcolor: "lightgrey",
    // border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    mb: 0.5,
    p: 1,
  };
  const userUserMessage = {
    display: "inline-flex",
    alignSelf: "flex-end",
    bgcolor: "#b3e5cc",
    // border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    mb: 0.5,
    p: 1,
  };
  const externalUserMessage = {
    display: "inline-flex",
    alignSelf: "flex-start",
    bgcolor: "#79d2a6",
    // border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    mb: 0.5,
    p: 1,
  };
  const { text, uid, photoURL, userGroupID, displayName } = props.message;
  const currentUserGroupID = props.currentUserGroupID;
  const messageType =
    currentUserGroupID != userGroupID
      ? externalUserMessage
      : uid === auth.currentUser.uid
      ? userUserMessage
      : userMessage;
  const alignment =
    currentUserGroupID != userGroupID ? "flex-start" : "flex-end";
  // uid === auth.currentUser.uid ? userMessage : externalUserMessage;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 0,
      }}
    >
      <Box display="inline-flex" alignSelf={alignment}>
        <Typography
          sx={{ m: 0, p: 0, display: "inline-block" }}
          variant="caption"
        >
          {displayName}
        </Typography>
      </Box>
      <Box sx={messageType}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <Typography>{text}</Typography>
      </Box>
    </Box>
  );
};
