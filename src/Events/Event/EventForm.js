import {
  Card,
  Button,
  Box,
  TextField,
  CardContent,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import React, { useState, useEffect } from "react";

const EventForm = () => {
  return (
    <Card
      sx={{ alignItems: "center", justifyContent: "center", padding: "40px" }}
    >
      <Box marginBottom={3} width="100%">
        <TextField
          id="filled-multiline-static"
          label="Title"
          variant="filled"
          color="success"
          fullWidth
        />
      </Box>
      <Box width="100%" marginBottom={3}>
        <TextField
          id="filled-multiline-static"
          label="Description"
          multiline
          rows={4}
          variant="filled"
          color="success"
          fullWidth
        />
      </Box>
      <Box textAlign={"right"}>
        <Button variant="contained" color="success">
          Submit
        </Button>
      </Box>
    </Card>
  );
};

export default EventForm;
