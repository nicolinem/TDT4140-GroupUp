import "./App.css";

import { RegistrationPage } from "./Registration/RegistrationPage.js";

import "./App.css";
import { LoginPage } from "./Login/LoginPage";
import { MainPage } from "./Dashboard/MainPage";
import { GroupPage } from "./Dashboard/GroupPage";

import db from "./firebase";
import React, { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Feed } from "./Dashboard/Feed";

function App() {
  const [students, setStudents] = useState();

  console.log(students);

  useEffect(
    () =>
      onSnapshot(collection(db, "students"), (snapshot) =>
        setStudents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<Feed />} />

          <Route path="GroupPage" element={<GroupPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
      </Routes>
    </Box>
  );
}
//<MainPage />

export default App;
