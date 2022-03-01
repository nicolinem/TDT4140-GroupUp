import React, { useRef, useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Box,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Sidebar } from "../Dashboard/Sidebar";
import { default as db, auth, useAuth, storage } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import styles from "./GroupRegistration.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { ref, uploadBytes } from "firebase/storage";

export const GroupRegistration = () => {
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const userSearchRef = useRef();
  const [, setChange] = useState();
  const [image, setImage] = useState("");

  useEffect(
    () =>
      onSnapshot(collection(db, "Users"), (snapshot) =>
        setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  const groupNameRef = useRef();
  const groupDescriptionRef = useRef();
  const interestsRef = useRef();

  const currentUser = useAuth();

  const handleClick = async () => {
    console.log(currentUser?.uid);
    console.log(typeof currentUser?.uid);

    const storageRef = ref(storage, `/images/${image.name}`);
    console.log(storageRef);

    if (image == null) return;
    uploadBytes(storageRef, image).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    const groupCollRef = collection(db, "Teams-beta");
    const documentref = await addDoc(groupCollRef, {
      name: groupNameRef.current.value,
      description: groupDescriptionRef.current.value,
      interests: interestsRef.current.value,
      members: [...members, currentUser?.uid],
      created: serverTimestamp(),
      imageReference: `/images/${image.name}`,
    });
  };

  const handleSearch = () => {
    setChange((prevValue) => !prevValue);
  };

  const inviteUser = (user) => {
    console.log("hey");
    console.log(user.id + ": " + user.firstName);
    setMembers((prevMembers) => [...prevMembers, user.id]);
    console.log(members);
  };

  const uninviteUser = (user) => {
    console.log(user);
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member !== user.id)
    );
  };

  const upload = () => {};

  // const handleChange = (event) => {
  //   uploadBytes(storageRef, imageRef).then((snapshot) => {
  //     console.log("Uploaded a blob or file!");
  //   });
  //   console.log("testing");
  // };

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box sx={{ minWidth: 250, mt: 6, ml: 3 }}>
        <Sidebar />
      </Box>
      <div className={styles.container}>
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

            <TextField
              margin="normal"
              id="filled-basic"
              label="Interesser"
              variant="outlined"
              autoFocus
              width="200px"
              color="success"
              inputRef={interestsRef}
            />

            <TextField
              margin="normal"
              id="filled-basic"
              label="Medlemmer"
              variant="outlined"
              autoFocus
              width="200px"
              color="success"
            />
          </Box>

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
          />
          <ul
            style={{
              listStyleType: "none",
              marginLeft: 0,
              paddingLeft: 0,
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
                          <Button size="small" onClick={() => inviteUser(user)}>
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

        <div style={{ marginTop: "95px" }}>
          {users
            .filter((user) => members.includes(user.id))
            .map((member) => (
              <Button
                endIcon={<CloseIcon></CloseIcon>}
                onClick={() => uninviteUser(member)}
              >
                {member.firstName}
              </Button>
            ))}
        </div>
      </div>
      {/* <Button onClick={handleUpload}>Upload a file</Button>
      <input
        type="file"
        ref={imageRef}
        onChange={handleChange}
        style={{ display: "none" }}
      /> */}
      <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      {/* <button onClick={upload}>Upload</button> */}
    </Box>
  );
};
