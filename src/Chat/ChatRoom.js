import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import "firebase/firestore";
import { ChatMessage } from "./ChatMessage";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
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
  const [members, setMembers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { state } = useLocation();
  const [collectionReference, setCollectionReference] = useState();
  const currentUserGroupID = state.myGroupID;
  const bottomListRef = useRef("");
  const inputRef = useRef();
  const auth = getAuth();
  const user = auth.currentUser;
  const [newChat, setNewChat] = useState(false);
  const [chatReference, setChatReference] = useState();

  /**
   * Loads messages from database. Each message is a document in a collection. Each collection is a conversation. We listen to changes in the collection with onSnapchot to get updates on new messages.
   */
  useEffect(() => {
    const getChatRoom = async () => {
      const chatID = getGroupChatID();

      const reference = collection(
        db,
        "Group-conversations",
        chatID,
        "Message"
      );

      setChatReference(doc(db, "Group-conversations", chatID));
      setCollectionReference(reference);

      const q = query(reference, orderBy("createdAt"), limit(100));

      onSnapshot(q, (snapshot) => {
        console.log(snapshot.docs.length);

        if (snapshot.docs.length === 0) {
          setNewChat(true);
          console.log("New chat set");
          console.log();
          updateDocument(doc(db, "Group-conversations", chatID));
        }

        setMessages(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        bottomListRef.current.scrollIntoView({ behavior: "smooth" });
      });
    };
    getChatRoom();
    console.log(newChat);
  }, []);

  const updateDocument = async (reference) => {
    console.log(reference);
    console.log(chatReference);
    // const groupList = [];
    const group1 = await getDoc(doc(db, "Teams-beta", currentUserGroupID));

    console.log({ ...group1.data().members });
    const groupList1 = group1.data().members.map((member) => {
      return member.id;
    });
    // .push({ ...group1.data().members.id });

    const group2 = await getDoc(doc(db, "Teams-beta", state.otherGroupID));
    for (const member of group1.data().members) {
      console.log("Medlem: ", member.id);
    }
    const groupList2 = group2.data().members.map((member) => {
      return member.id;
    });

    // console.log("GRUPPER: ", group1.data());
    console.log("GRUPPER: ", group2.data());

    setMembers(groupList1, groupList2);
    // const users = [...group1.members.id, ...group2.members.id];
    console.log(currentUserGroupID);
    console.log(state.otherGroupID);
    console.log(`${group1.data().name} + ${group2.data().name}`);
    console.log(groupList1);
    console.log(groupList2);

    setDoc(reference, {
      group1ID: currentUserGroupID,
      group2ID: state.otherGroupID,
      group1Name: group1.data().name,
      group2Name: group2.data().name,
      chatName: `${group1.data().name} + ${group2.data().name}`,
      membersgroup1: groupList1,
      membersgroup2: groupList2,
    });
    updateDoc(doc(db, "Users", user.uid), {
      chats: arrayUnion(reference.path),
    });
  };

  console.log(newChat);
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
                color="primary"
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
            </form>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
