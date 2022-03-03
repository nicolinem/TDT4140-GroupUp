import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { default as db, storage } from "../firebase";
import { doc, getDoc, onSnapshot, collection, updateDoc } from "firebase/firestore";
import {useState, useEffect, useRef } from 'react';
import styles from "./BasicModal.module.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

  /* This is a component from the resource Material UI */
  export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const userSearchRef = useRef();
    const [, setChange] = useState();
    const [members, setMembers] = useState([]);
    const [users, setUsers] = useState([]);
    
    useEffect(
    () =>
      onSnapshot(collection(db, "Users"), (snapshot) =>
        setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
    );

    const inviteUser = (user) => {
        console.log("hey");
        console.log(user.id + ": " + user.firstName);
        setMembers((prevMembers) => [...prevMembers, user.id]);
        console.log(members);
      };

    const handleSearch = () => {
        setChange((prevValue) => !prevValue);
      };
  
    return (
      <div>
        <Button onClick={handleOpen}>Add members</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
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
                          <Button size="small" maxWidth={195} onClick={() => inviteUser(user)}>
                            {"Invite"}
                          </Button>
                        </CardActions>
                      </div>
                    </React.Fragment>
                  </Card>
                </li>
              ))}
          </ul>
          </Box>
        </Modal>
      </div>
    );
  }