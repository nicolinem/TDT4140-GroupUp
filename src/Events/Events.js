import React, { useEffect, useState } from "react";
import { Sidebar } from "../Dashboard/Sidebar";
import {
  Card,
  Button,
  Container,
  Box,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Grid,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
} from "@mui/material";

const Events = () => {
  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box sx={{ minWidth: 250, mt: 6, ml: 3 }}>
        <Sidebar />
      </Box>
      <Grid></Grid>
    </Box>
  );
};

export default Events;
