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
import { EventItem } from "./Event/EventItem";
import EventForm from "./Event/EventForm";
import { NewEvent } from "./Event/NewEvent";
import { useAuth } from "../firebase";
import styles from "./Events.module.css";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const Events = () => {
  const array = [1, 2, 4, 5, 6, 7, 8, 9, 10];
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [currentGroupID, setCurrentGroupID] = useState();
  const currentUser = useAuth();
  const currentGroup = currentGroupID
    ? groups.find((group) => group.id == currentGroupID)
    : undefined;

  useEffect(() => {
    const getgroups = async () => {
      const q = query(collection(db, "Teams-beta"));

      const querySnapshot = await getDocs(q);
      const requestedGroups = [];
      querySnapshot.forEach((doc) => {
        requestedGroups.push({ ...doc.data(), id: doc.id });
        console.log(doc.id, " => ", doc.data());
      });
      setGroups(requestedGroups);
      console.log(requestedGroups);
      const id = requestedGroups.length ? requestedGroups[0].id : undefined;
      setCurrentGroupID(id);
      setLoading(false);
    };
    getgroups();
  }, []);

  const handleChangeGroup = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setCurrentGroupID(value);
  };

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box sx={{ minWidth: 250, mt: 6, ml: 3 }}>
        <Sidebar />
      </Box>
      <Grid
        container
        spacing={10}
        direction="row"
        className={styles["events-container"]}
      >
        <Grid item xs={6} width={"100%"}>
          <Typography marginBottom={2}>
            Which group do you want to create an event for?
          </Typography>
          <FormControl sx={{ width: "100%", marginBottom: 3 }}>
            <InputLabel
              id="demo-simple-select-label"
              input={<OutlinedInput label="Group" />}
            >
              Group
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentGroupID}
              label="Group"
              onChange={handleChangeGroup}
            >
              {groups.length > 0 &&
                groups
                  .filter((group) =>
                    group.members.some(
                      (member) => member.id == currentUser?.uid
                    )
                  )
                  .map((group) => (
                    <MenuItem value={group.id}>{group.name}</MenuItem>
                  ))}
            </Select>
          </FormControl>
          <Typography marginBottom={2}>
            What kind of event are you planning to have?
          </Typography>
          <EventForm />
        </Grid>
        <Grid item xs={6}>
          <Typography>Upcoming events</Typography>
          {array.map((array) => (
            <Box
              sx={{
                marginBottom: 2,
                width: "100%",
                maxWidth: "600px",
              }}
            >
              <EventItem />
            </Box>
          ))}
          <Typography marginTop={2}>Earlier events</Typography>
          <Box sx={{ overflowY: "scroll" }}>
            {array.map((array) => (
              <Box
                sx={{
                  marginBottom: 2,
                  width: "100%",
                  maxWidth: "600px",
                }}
              >
                <EventItem />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Events;
