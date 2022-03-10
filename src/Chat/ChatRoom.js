import React, { Component, useEffect, useRef, useState } from "react";
import { default as db, auth, useAuth, storage } from "../firebase";
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
import { useNavigate } from "react-router-dom";

export const ChatRoom = (props) => {
  // const { state } = useLocation();
  // const { id } = state;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const inputRef = useRef();
  const collectionReference = collection(
    db,
    "Group-conversations",
    "GCSOrMl8y7y9NZGNFXsx",
    "Message2"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collectionReference, orderBy("createdAt"), limit(25));
    onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  console.log(messages);

  function ChatMessage(props) {
    const { text, uid } = props;
    return <p>{text}</p>;
  }

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      addDoc(collectionReference, {
        text: trimmedMessage,
        createdAt: Timestamp.now(),
      });

      // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      // uid,
      // displayName,
      // photoURL,
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
