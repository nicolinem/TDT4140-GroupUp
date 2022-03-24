import { Box } from "@mui/material";
import { Header } from "./Header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import {
  collectionGroup,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";

import React, { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export const MainPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");

    console.log("USER: ", auth);
    // fetchUserName();
  }, [user, loading]);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     console.log("USERLOGGEDIN: ", auth);
  //   } else {
  //     navigate("/login");
  //   }
  // });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />

      <Box sx={{ display: "flex", minWidth: 140, flexGrow: 1, px: 5, py: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
