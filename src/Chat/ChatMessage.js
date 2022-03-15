import React, { Component, useEffect, useRef, useState } from "react";
import { default as db, useAuth, storage } from "../firebase";
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
    m: 1,
    p: 1,
  };
  const externalUserMessage = {
    display: "inline-flex",
    alignSelf: "flex-start",
    bgcolor: "orange",
    // border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    m: 1,
    p: 1,
  };
  const { text, uid, photoURL, userGroupID } = props.message;
  const currentUserGroupID = props.currentUserGroupID;
  const messageType =
    currentUserGroupID === userGroupID ? userMessage : externalUserMessage;
  // uid === auth.currentUser.uid ? userMessage : externalUserMessage;
  return (
    <Box sx={messageType}>
      <img
        src={
          photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
        }
      />
      <Typography>{text}</Typography>
    </Box>
  );
};
