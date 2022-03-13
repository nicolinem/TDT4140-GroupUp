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

export const ChatRoom = (props) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { state } = useLocation();
  const [collectionReference, setCollectionReference] = useState();

  const inputRef = useRef();
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();


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


  function ChatMessage(props) {
    const { text, uid } = props;
    return <p>{text}</p>;
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

    console.log(user.displayName);
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      addDoc(collectionReference, {
        text: trimmedMessage,
        createdAt: Timestamp.now(),
        uid: user.uid,
        displayName: user.displayName,
        // photoURL,
      });

      // Clear input field
      setNewMessage("");

      // Scroll down to the bottom of the list
      // bottomListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {messages &&
        messages.map((msg) => (
          <ChatMessage key={msg.id} text={msg.text}></ChatMessage>
        ))}
      <form onSubmit={handleOnSubmit}>
        <input ref={inputRef} onChange={handleOnChange} value={newMessage} />
        <button type="submit">Send message</button>
      </form>
    </div>
  );
};
