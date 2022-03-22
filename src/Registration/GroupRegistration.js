import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
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
import TextField from "@mui/material/TextField";
import { Sidebar } from "../Dashboard/Sidebar";
import { db, auth, useAuth, storage } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import styles from "./GroupRegistration.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export const GroupRegistration = () => {
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const userSearchRef = useRef();
  const [, setChange] = useState();
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(
    () =>
      onSnapshot(collection(db, "Users"), (snapshot) =>
        setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const interests = ["Løpe", "Gå tur", "Vorse", "Spille brettspill", "Progge"];

  const theme = useTheme();
  const [groupInterests, setGroupInterests] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setGroupInterests(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const groupNameRef = useRef();
  const groupDescriptionRef = useRef();

  const currentUser = useAuth();

  const handleClick = async () => {
    console.log(currentUser?.uid);
    console.log(typeof currentUser?.uid);

    const storageRef = ref(storage, `/images/${image.name}`);

    if (image == null) return;
    uploadBytes(storageRef, image).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    const groupCollRef = collection(db, "Teams-beta");
    const creatingUser = users.find((user) => user.id === currentUser?.uid);
    console.log(groupNameRef.current.value);
    console.log([...groupInterests]);
    console.log([...members, creatingUser]);
    const documentref = await addDoc(groupCollRef, {
      name: groupNameRef.current.value,
      description: groupDescriptionRef.current.value,
      interests: [...groupInterests],
      members: [...members, creatingUser],
      created: serverTimestamp(),
      imageReference: `/images/${image.name}`,
      eventDate: [],
    });
    const name = groupNameRef.current.value;
    const description = groupDescriptionRef.current.value;
    setMembers([...members, creatingUser]);
    const imageReference = `/images/${image.name}`;
    const id = documentref.id;
    navigate("/GroupPage", {
      state: {
        name,
        id,
        description,
        interests,
        members: [...members, creatingUser],
        imageReference,
      },
    });
  };

  const handleSearch = () => {
    setChange((prevValue) => !prevValue);
  };

  const inviteUser = (user) => {
    console.log("hey");
    console.log(user.id + ": " + user.firstName);
    setMembers((prevMembers) => [...prevMembers, user]);
    console.log(members);
  };

  const uninviteUser = (user) => {
    console.log(user);
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== user.id)
    );
  };

  const upload = () => {};

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box sx={{ minWidth: 250, mt: 6, ml: 3 }}>
        <Sidebar />
      </Box>
      <Grid container spacing={2} flexGrow={1}>
        <Grid item sm={3}>
          <Container>
            <Box
              sx={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography size={"h1"}>Group Information</Typography>
              <TextField
                margin="normal"
                id="filled-basic"
                label="Gruppenavn"
                variant="outlined"
                autoFocus
                width="200px"
                color="success"
                inputRef={groupNameRef}
              />

              <TextField
                margin="normal"
                id="filled-basic"
                label="Gruppebeskrivelse"
                variant="outlined"
                autoFocus
                width="200px"
                color="success"
                inputRef={groupDescriptionRef}
              />
            </Box>

            <Typography marginBottom={2} marginTop={2} size={"h1"}>
              Add image
            </Typography>
            <div style={{ marginTop: "5px" }}>
              <input
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>

            <Box
              sx={{
                marginTop: 2,
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Button variant="contained" color="success" onClick={handleClick}>
                Opprett gruppe
              </Button>
            </Box>
            <Box
              sx={{
                marginTop: 10,
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            ></Box>
          </Container>
        </Grid>
        <Grid item sm={3}>
          <div style={{ marginTop: "75px" }}>
            <Typography marginBottom={2} size={"h1"}>
              Add interests
            </Typography>

            <FormControl
              sx={{ width: 190 }}
              id="filled-basic"
              label="Gruppebeskrivelse"
              variant="outlined"
              autoFocus
              color="success"
            >
              <InputLabel id="demo-multiple-name-label">Interests</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={groupInterests}
                onChange={handleChange}
                input={<OutlinedInput label="Interests" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {interests.map((interests) => (
                  <MenuItem
                    key={interests}
                    value={interests}
                    style={getStyles(interests, groupInterests, theme)}
                  >
                    {interests}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item sm={3}>
          <div style={{ marginTop: "75px" }}>
            <Typography marginBottom={2} size={"h1"}>
              Add Members
            </Typography>
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
              onChange={handleSearch}
              inputRef={userSearchRef}
              width={"100%"}
            />
            <ul
              style={{
                listStyleType: "none",
                marginLeft: 0,
                paddingLeft: 0,
                flexDirection: "column",
                maxWidth: 195,
              }}
            >
              {users
                .filter(
                  (user) =>
                    user.firstName &&
                    user.firstName.includes(userSearchRef.current.value)
                )
                .map((user) => (
                  <li style={{ marginBottom: "10px" }}>
                    <Card variant="outlined">
                      <React.Fragment>
                        <div className={styles.userCard}>
                          <CardContent>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              {user.firstName}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              maxWidth={195}
                              onClick={() => inviteUser(user)}
                            >
                              {"Invite"}
                            </Button>
                          </CardActions>
                        </div>
                      </React.Fragment>
                    </Card>
                  </li>
                ))}
            </ul>
          </div>
        </Grid>
        <Grid item sm={3}>
          <div style={{ marginTop: "70px" }}>
            <Typography marginBottom={2} size={"h1"}>
              Current Members
            </Typography>
            {users
              .filter((user) => members.includes(user))
              .map((member) => (
                <Button
                  endIcon={<CloseIcon></CloseIcon>}
                  onClick={() => uninviteUser(member)}
                >
                  {member.firstName}
                </Button>
              ))}
          </div>
        </Grid>

        {/* <Button onClick={handleUpload}>Upload a file</Button>
      <input
        type="file"
        ref={imageRef}
        onChange={handleChange}
        style={{ display: "none" }}
      /> */}
        <Grid item sm={3}>
          {/* <div style={{ marginTop: "70px" }}>
            <Typography marginBottom={2} size={"h1"}>
              Add image
            </Typography>
            <div style={{ marginTop: "5px" }}>
              <input
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>
          </div> */}

          {/* <button onClick={upload}>Upload</button> */}
        </Grid>
      </Grid>
    </Box>
  );
};
