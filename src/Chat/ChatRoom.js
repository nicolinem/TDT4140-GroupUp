import React, { useEffect, useRef, useState } from "react";
import { default as db } from "../firebase";
import "firebase/firestore";
import { ChatMessage } from "./ChatMessage";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { Sidebar } from "../Dashboard/Sidebar";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import { InputAdornment } from "@mui/material";

export const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { state } = useLocation();
  const [collectionReference, setCollectionReference] = useState();
  const currentUserGroupID = state.myGroupID;
  const bottomListRef = useRef();
  const inputRef = useRef();
  const auth = getAuth();
  const user = auth.currentUser;

  /**
   * Loads messages from database. Each message is a document in a collection. Each collection is a conversation. We listen to changes in the collection with onSnapchot to get updates on new messages.
   */
  useEffect(() => {
    const chatID = getGroupChatID();

    const reference = collection(db, "Group-conversations", chatID, "Message");

    setCollectionReference(reference);

    const q = query(reference, orderBy("createdAt"), limit(100));

    onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      bottomListRef.current.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  /**
   * Gets the ID for the group chat. It combines the two IDs of the group into one string, sorting them alphabetically
   * To be used to query the group chat
   * @returns string IDstring
   */
  function getGroupChatID() {
    const chatID = [state.myGroupID, state.otherGroupID];
    chatID.sort();
    const IDstring = chatID.join("");
    return IDstring;
  }

  /**
   * Updates the current new message when user types. When the send button is pushed, this message is sent to the database
   * @param {character typed by user} e
   */
  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();
    const { uid, photoURL, displayName } = auth.currentUser;
    if (trimmedMessage) {
      // Add new message in Firestore
      addDoc(collectionReference, {
        text: trimmedMessage,
        createdAt: Timestamp.now(),
        userGroupID: state.myGroupID,
        uid,
        displayName,
        photoURL,
      });

      // Clear input field
      setNewMessage("");

      // Scroll down to the bottom of the list
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "row", minWidth: 140 }}>
        {/* Sidebar */}
        <Box sx={{ display: "flex", minWidth: 250, mt: 6, ml: 3 }}>
          <Sidebar />
        </Box>
        <Container
          flex={1}
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignSelf: "flex-start",

            height: "80vh",
            // overflowX: "hidden",
          }}
        >
          <Box sx={{ overflow: "scroll" }}>
            {messages &&
              messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  currentUserGroupID={currentUserGroupID}
                ></ChatMessage>
              ))}
            <div ref={bottomListRef} />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form onSubmit={handleOnSubmit} display="inline-block">
              <TextField
                inputRef={inputRef}
                onChange={handleOnChange}
                value={newMessage}
                sx={{
                  isplay: "block",
                  width: "100% ",
                  padding: ".5rem .8rem .5rem .8rem",
                  margin: ".9vw 0 ",
                  // border: 0,
                  fontSize: "20px",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" type="submit">
                        <DoubleArrowIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              {/* <input
                ref={inputRef}
                onChange={handleOnChange}
                value={newMessage}
              /> */}

              {/* <IconButton aria-label="delete" size="large">
                <ArrowCircleUpIcon fontSize="large" verticalAlign="middle" />
              </IconButton> */}
              {/* <button type="submit">Send message</button> */}
            </form>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
