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
import { db, useAuth, auth } from "../firebase";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { List } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemText } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatList = () => {
  // console.log(auth);
  // const uid = user.uid;
  const [chats, setChats] = useState();

  const [user, loading, error] = useAuthState(auth);
  // const user = auth.currentUser;

  useEffect(() => {
    if (loading) return;

    console.log("notLoading:");
    const getChats = async () => {
      console.log(user.uid);
      const q = query(
        collection(db, "Group-conversations")
        // ,
        // where("members", "array-contains", { id: user.uid })
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
  }, [user, loading]);

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

  const getChat = (chat) => {
    return (
      <ListItemButton key={chat.id} sx={{}}>
        {/* <ListItemIcon></ListItemIcon> */}
        <ListItemText
          primary={"Testing chat"}
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
        {chats && (
          <>
            {" "}
            {chats
              .filter((chats) => chats.members.includes(user.uid))
              .map((chat) => getChat(chat))}
          </>
        )}
      </List>
    </div>
  );
};

export default ChatList;
