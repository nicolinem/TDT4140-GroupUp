import "./App.css";

import { RegistrationPage } from "./Registration/RegistrationPage.js";

import "./App.css";
import { LoginPage } from "./Login/LoginPage";
import { MainPage } from "./Dashboard/MainPage";
import { GroupPage } from "./Dashboard/GroupPage";
import { NewGroup } from "./NewGroup/NewGroup";
import { ChatRoom } from "./Chat/ChatRoom";
import ChatList from "./Chat/ChatList";

import { db } from "./firebase";
import React, { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Feed } from "./Dashboard/Feed";
import { MyGroups } from "./Dashboard/MyGroups";
import { GroupRegistration } from "./Registration/GroupRegistration";
import { AddMembers } from "./Dashboard/AddMembers";
import { ChooseGroups } from "./Chat/ChooseGroup";
import Matches from "./Matches/Matches";
import Events from "./Events/Events";

function App() {
  useEffect(
    () =>
      onSnapshot(collection(db, "Users"), (snapshot) =>
        console.log(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<Feed showMatches={false} />} />
          <Route path="GroupPage" element={<GroupPage />} />
          <Route path="newgroup" element={<GroupRegistration />} />
          <Route path="MyGroups" element={<MyGroups />} />
          <Route path="AddMembers" element={<AddMembers />} />
          <Route path="chat" element={<ChatRoom />} />
          <Route path="choosegroup" element={<ChooseGroups />} />
          <Route path="matches" element={<Matches />} />
          <Route path="events" element={<Events />} />
          <Route path="chatlist" element={<ChatList />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route exact path="registration" element={<RegistrationPage />} />
      </Routes>
    </Box>
  );
}
//<MainPage />

export default App;
