import React, { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import db, { auth, useAuth, useAuthState } from "../firebase";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { getAuth } from "firebase/auth";
import { List } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemText } from "@mui/material";

const ChatList = () => {
  console.log(auth);
  // const uid = user.uid;
  const [chats, setChats] = useState();

  useEffect(() => {
    const getChats = async () => {
      // console.log(uid);

      const q = query(
        collection(db, "Group-conversations"),
        where("members", "array-contains", { id: auth.currentUser.uid })
      );
      const docSnap = await getDocs(q);

      const groupList = [];
      docSnap.forEach((doc) => {
        groupList.push({ ...doc.data(), id: doc.id });
        console.log(doc.id, " => ", doc.data());
      });
      setChats(groupList);

      // setChats(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      //   for (c in docSnap.data().chats) {
      //     const chats = await getDoc(c);
      //     setChats(...chats, chats);
      //   }

      // const messages = await getDocs(
      //   collection(docSnap.data().chats, "Message")
      // );

      // messages.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data().text);
      // });
    };
    getChats();
  }, []);

  //   if (!loading) {
  //     for (const key in value.chats) {
  //       console.log(key);
  //     }
  //     const [value, loading, error] = useDocumentData(
  //       doc(db, "Users", "nsD74cX5IbX2lxawNQ3jUmbMMbo1")
  //     );
  //   }

  //   const [value2, loading2, error2] = useDocumentData(value.chats[0].path);

  //   console.log(value.getData());
  //   console.log(value);

  console.log(chats);

  const getChat = (chat) => {
    return (
      <ListItemButton sx={{}}>
        {/* <ListItemIcon></ListItemIcon> */}
        <ListItemText
          primary={chat.id}
          // onClick={() => handleClick(group.id, otherGroupID)}
        />
      </ListItemButton>
    );
  };

  return (
    <div>
      <List
        sx={{
          overflow: "scroll",
          overflowX: "hidden",
        }}
      >
        {/* {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Document: Loading...</span>} */}
        {chats && <> {chats.map((chat) => getChat(chat))}</>}
      </List>
    </div>
  );
};

export default ChatList;
