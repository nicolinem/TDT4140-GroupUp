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
import { Feed } from "../Dashboard/Feed";

const Matches = () => {
  const [groups, setGroups] = useState([]);

  return <Feed showMatches={true} />;
};

export default Matches;
