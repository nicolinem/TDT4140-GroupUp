import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
  CardContent,
} from "@mui/material";
import Card from "@mui/material/Card";

export const EventItem = (props) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent sx={{ width: "100%" }}>
        <Box>
          <Typography>Hey, this is an EventItem</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
