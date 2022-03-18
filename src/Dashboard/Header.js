import { Avatar, Box, InputBase, Menu, MenuItem, Tooltip, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { logout } from "../firebase";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect } from "react";
import image from "./logo.png";
import avatar from "./356-3562377_personal-user.png";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { default as db, useAuth } from "../firebase";
import { onSnapshot, collection, arrayUnion, arrayRemove } from "firebase/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";


export const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorNotification, setAnchorNotification] = useState(null);
  const [groups, setGroups] = useState([]);
  const currentUser = useAuth();
  const [user, setUser] = useState();

  

  useEffect(
    () =>
      {onSnapshot(collection(db, "Teams"), (snapshot) =>
        setGroups(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      )
      },
    []
  );

  const getUserData = async () => {

    const docRef = doc(db, "Users", currentUser?.uid);
    const docSnap = await getDoc(docRef);
    setUser({...docSnap.data()});

  }
    
  useEffect(() => {
    getUserData();
  },
  [currentUser]);

  const acceptInvitation = async (groupThatInvites) => {
    console.log(groupThatInvites);

    const groupRef = doc(db, "Teams", groupThatInvites.id);
    /* const currentInvitedUsers = groups.find(group => group.id == groupThatInvites.id).invitedUsers;
    console.log(currentInvitedUsers); */

    /* const [invitedUser] = groupThatInvites.invitedUsers.filter(user => user.id == currentUser?.uid);
    const memberConvertion = {...invitedUser, isMember: true};
    console.log(invitedUser);
    console.log(memberConvertion);

    const updatedInvitedUsers = groupThatInvites.invitedUsers.filter(user => user.id !== currentUser?.uid);
    updatedInvitedUsers.push(memberConvertion); */

    const updatedInvitedUsers = groupThatInvites.invitedUsers.filter(user => user == currentUser?.uid);
    const updatedMembers =  groupThatInvites.members.push(user);

    const userToAdd = groupThatInvites.invitedUsers.find(user => user.id == currentUser?.uid);

  await updateDoc(groupRef, {
    invitedUsers: arrayRemove(userToAdd),
    members: arrayUnion(userToAdd),
    });
    
    const userRef = doc(db, "Users", currentUser?.uid);
  await updateDoc(userRef, {
    invites: user.invites.filter(invite => invite !== groupThatInvites.id),
    });
  }
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNotificationMenu = () => {
    setAnchorNotification(null);
  };
  const handleOpenNotificationMenu = (event) => {
    setAnchorNotification(event.currentTarget);
  };

  function handleLogout() {
    //  setloading(true);
    try {
      logout();
    } catch {
      alert("Something is wrong with your logout");
    }
    //  setloading(false);
  }

  const Search = styled("div")(({ theme }) => ({
    position: "relative",

    borderRadius: 28,
    backgroundColor: alpha(theme.palette.common.white, 1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "primary",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  console.log(user ? user.invites : "user undefined") ;
  console.log(groups);

  return (
    <Box>
      <AppBar
        position="static"
        alignitems="center"
        justifycontent="center"
        style={{ background: "#9aca7c" }}
      >
        <Toolbar>
          <IconButton href="/" size="large" color="inherit" sx={{ mr: 1 }}>
            <Avatar
              alt="Remy Sharp"
              src={image}
              sx={{ width: 60, height: 40 }}
            />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block", flexGrow: 1 } }}
          >
            GroupUp
          </Typography>

          {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon color="disabled" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box> */}

            <Box sx={{ flexGrow: 0, mr: 3 }}>
            <Tooltip title="Open notifications">
              <IconButton onClick={handleOpenNotificationMenu} sx={{ p: 0 }}>
              <Badge badgeContent={4} color="primary">
                  <MailIcon color="action" />
              </Badge>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorNotification}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorNotification)}
              onClose={handleCloseNotificationMenu}
            >
              {/* <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>My account</MenuItem> */}

              {user ? groups.filter(group => user.invites.some(groupInvitation => groupInvitation == group.id)).map(group =>
                  <MenuItem sx={{display: 'flex'}} onClick={() => {}}>Invitation from {group.name} <Button onClick={() => acceptInvitation(group)}>Accept</Button></MenuItem>
              ) : <MenuItem>No invites </MenuItem>}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0, mr: 3 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={avatar} />o
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>My account</MenuItem> */}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
