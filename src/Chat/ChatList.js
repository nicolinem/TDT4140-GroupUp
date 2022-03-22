import React, { useEffect, useState } from "react";
import { getDocs, collection, query } from "firebase/firestore";
import { db, auth } from "../firebase";
import { List } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemText } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { Sidebar } from "../Dashboard/Sidebar";

const ChatList = () => {
  const [open, setOpen] = React.useState(false);
  const [group1Name, setGroup1Name] = useState("");
  const [group2Name, setGroup2Name] = useState("");
  const [group1ID, setGroup1ID] = useState("");
  const [group2ID, setGroup2ID] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return; // Only runs code if user is loaded, to make sure we have uid

    const getChats = async () => {
      console.log(user.uid);
      const q = query(collection(db, "Group-conversations"));
      const docSnap = await getDocs(q);

      const groupList = [];
      docSnap.forEach((doc) => {
        groupList.push({ ...doc.data(), id: doc.id });
        console.log(doc.id, " => ", doc.data());
      });
      setChats(groupList);
    };

    getChats();
  }, [user, loading]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
  };

  //Navigates to group chat page based on group information to see what group the user is member of
  function handleClick(
    group1ID,
    group2ID,
    group1Members,
    group2Members,
    group1Name,
    group2Name
  ) {
    const nav = (myGroupID, otherGroupID) => {
      navigate("/chat", {
        state: { myGroupID, otherGroupID },
      });
    };

    const ingroup1 = group1Members.includes(user.uid);
    const ingroup2 = group2Members.includes(user.uid);

    if (ingroup1 && ingroup2) {
      setGroup1Name(group1Name);
      setGroup2Name(group2Name);
      setGroup1ID(group1ID);
      setGroup2ID(group2ID);
      handleOpen(true);
      console.log(open);
    } else if (ingroup1) {
      nav(group1ID, group2ID);
    } else if (ingroup2) {
      nav(group2ID, group1ID);
    }
  }

  function handleModalClick(myGroupID, otherGroupID) {
    navigate("/chat", {
      state: { myGroupID, otherGroupID },
    });
  }

  const getChat = (chat) => {
    return (
      <ListItemButton
        key={chat.id}
        onClick={() =>
          handleClick(
            chat.group1ID,
            chat.group2ID,
            chat.membersgroup1,
            chat.membersgroup2,
            chat.group1Name,
            chat.group2Name
          )
        }
        sx={{}}
      >
        <ListItemText primary={chat.chatName} />
      </ListItemButton>
    );
  };

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
        <Box sx={{ display: "flex", minWidth: 250, mt: 6, ml: 3 }}>
          <Sidebar />
        </Box>
        <List
          sx={{
            overflow: "scroll",
            overflowX: "hidden",
          }}
        >
          {chats && (
            <>
              {" "}
              {chats
                .filter(
                  (chats) =>
                    chats.membersgroup1.includes(user.uid) ||
                    chats.membersgroup2.includes(user.uid)
                )
                .map((chat) => getChat(chat))}
            </>
          )}
        </List>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box>
              <List>
                <ListItemButton>
                  {/* <ListItemIcon></ListItemIcon> */}
                  <ListItemText
                    primary={group1Name}
                    onClick={() => handleModalClick(group1ID, group2ID)}
                  />
                </ListItemButton>
                <ListItemButton>
                  {/* <ListItemIcon></ListItemIcon> */}
                  <ListItemText
                    primary={group2Name}
                    onClick={() => handleModalClick(group2ID, group1ID)}
                  />
                </ListItemButton>
              </List>
            </Box>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default ChatList;
