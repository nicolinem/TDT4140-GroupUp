import React, { useRef, useState } from "react";
import { login, useAuth } from "../firebase";
import TextField from "@mui/material/TextField";
import { Button, Container, Box, Typography, Link } from "@mui/material";
import logo from "./Bilde1.png";
import { MainPage } from "../Dashboard/MainPage";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NewGroup } from "../NewGroup/NewGroup";
import image from "../Dashboard/logo.png";

export const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setloading] = useState(false);
  const currentUser = useAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      navigate("/");
    } else {
    }
  });

  function handleLogin(e) {
    setloading(true);
    try {
      login(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Something is wrong with your login");
    }
    setloading(false);
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          padding: 5,
        }}
      >
        <Box maxHeight="xs" margin="normal">
          <img src={image} width="170" />
        </Box>

        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            id="filled-basic"
            inputRef={emailRef}
            label="Email"
            type="email"
            variant="outlined"
            autoFocus
            fullWidth
            color="success"
          />

          <TextField
            id="outlined-basic"
            margin="normal"
            inputRef={passwordRef}
            label="Password"
            type="password"
            variant="outlined"
            color="success"
            fullWidth
          />

          <Button
            loading={loading}
            disabled={loading || currentUser}
            onClick={handleLogin}
            variant="contained"
            fullWidth
            color="success"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>
          {/* <Button
            disabled={loading || !currentUser}
            onClick={handleLogout}
            variant="contained"
            fullWidth
            color="success"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign out
          </Button> */}
        </Box>

        <Link href="/registration" variant="body2">
          {"Don't have an account? Sign Up"}
        </Link>
      </Box>
    </Container>
  );
};
