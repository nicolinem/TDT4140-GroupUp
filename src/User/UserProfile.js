import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Sidebar } from "../Dashboard/Sidebar";
import { Feed } from "../Dashboard/Feed";

export const UserProfile = () => {
  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box sx={{ display: "flex", minWidth: 250, mt: 6, ml: 3, flexgrow: 0 }}>
        <Sidebar />
      </Box>
      <Box></Box>
    </Box>
  );
};
