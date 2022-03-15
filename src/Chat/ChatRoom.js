import React, { useEffect, useRef, useState } from "react";
import { default as db } from "../firebase";
import "firebase/firestore";
import { ChatMessage } from "./ChatMessage";

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

export const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { state } = useLocation();
  const [collectionReference, setCollectionReference] = useState();
  const currentUserGroupID = state.myGroupID;

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

    const q = query(reference, orderBy("createdAt"), limit(40));

    onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
      // bottomListRef.current.scrollIntoView({ behavior: "smooth" });
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
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignSelf: "flex-start",
          }}
        >
          {messages &&
            messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                currentUserGroupID={currentUserGroupID}
              ></ChatMessage>
            ))}
          <form onSubmit={handleOnSubmit}>
            <input
              ref={inputRef}
              onChange={handleOnChange}
              value={newMessage}
            />
            <button type="submit">Send message</button>
          </form>
        </Container>
      </Box>
    </Box>
  );
};
