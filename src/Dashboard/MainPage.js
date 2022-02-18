import { Box } from "@mui/material";
import { Header } from "./Header";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import React from "react";

import { Outlet, useNavigate, } from "react-router-dom";


export const MainPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("hello");
    } else {
      navigate("/login");
    }
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />

      <Box sx={{ display: "flex", minWidth: 140 }}>
        <Box sx={{ px: 5, py: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
