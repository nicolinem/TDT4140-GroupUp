import React, { useRef, useState } from "react";
import { Button, Container, Box, Link } from "@mui/material";
import { signUp } from "../firebase";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import nbLocale from "date-fns/locale/nb";
import db from "../firebase";


import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setDate } from "date-fns";

export const RegistrationPage = () => {
  const firstName = useRef();
  const lastName = useRef();

  const localeMap = {
    nb: nbLocale,
  };
  const emailRef = useRef();
  const passwordRef = useRef();
  const [value, setValue] = React.useState(null);
  const [locale, setLocale] = React.useState("nb");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      navigate("/");
    } else {
    }
  });

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleSignUpTest = () => {
    setFirstNameError(false)
    setLastNameError(false)
    setDateOfBirthError(false)
    setEmailError(false)
    setPasswordError(false)
    setConfirmPasswordError(false)

    if (firstNameError == '') {
      setFirstNameError(true)
    }
    if (lastNameError == '') {
      setLastNameError(true)
    }
    if (dateOfBirthError == '') {
      setDateOfBirthError(true)
    }
    if (emailError == '') {
      setEmailError(true)
    }
    if (passwordError == '') {
      setPasswordError(true)
    }
    if (confirmPasswordError == '') {
      setConfirmPasswordError(true)
    }
    else if (passwordError != confirmPasswordError) {
      setPasswordError(true)
      setConfirmPasswordError(true)
    }

  }

  const handleSignUp = async () => {
    setloading(true);
    console.log("check");

    setFirstNameError(false)
    setLastNameError(false)
    setDateOfBirthError(false)
    setEmailError(false)
    setPasswordError(false)
    setConfirmPasswordError(false)

    if (firstNameError == '') {
      setFirstNameError(true)
    }
    if (lastNameError == '') {
      setLastNameError(true)
    }
    if (dateOfBirthError == '') {
      setDateOfBirthError(true)
    }
    if (emailError == '') {
      setEmailError(true)
    }
    if (passwordError == '') {
      setPasswordError(true)
    }
    if (confirmPasswordError == '') {
      setConfirmPasswordError(true)
    }
    else if (passwordError != confirmPasswordError) {
      setPasswordError(true)
      setConfirmPasswordError(true)
    }


    try {
      signUp(emailRef.current.value, passwordRef.current.value);
      const userCollRef = collection(db, "Users");
      await addDoc(userCollRef, {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
      });
    } catch {
      alert("Something is wrong with your login");
    }
    setloading(false);
  };
  
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
        <TextField
          onChange={(e) => setFirstNameError(e.target.value)}
          id="outlined-basic"
          margin="normal"
          label="First Name"
          inputRef={firstName}
          variant="outlined"
          color="success"
          fullWidth
          error={firstNameError}
          
        />
        <TextField
          onChange={(e) => setLastNameError(e.target.value)}
          id="outlined-basic"
          margin="normal"
          label="Last Name"
          inputRef={lastName}
          variant="outlined"
          color="success"
          fullWidth
          error={lastNameError}
        />

        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          locale={localeMap[locale]}
        >
          <DatePicker
            label="Date of birth"
            value={value}
            color="success"
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                onChange={(e) => setDateOfBirthError(e.target.value)}
                margin="normal"
                color="success"
                fullWidth
                error={dateOfBirthError}
                {...params}
              />
            )}
          />
        </LocalizationProvider>

        <TextField
          onChange={(e) => setEmailError(e.target.value)}
          margin="normal"
          id="filled-basic"
          label="Email"
          type="email"
          variant="outlined"
          inputRef={emailRef}
          autoFocus
          fullWidth
          color="success"
          error={emailError}
        />

        <TextField
          onChange={(e) => setPasswordError(e.target.value)}
          id="outlined-basic"
          margin="normal"
          label="Password"
          type="password"
          variant="outlined"
          color="success"
          fullWidth
          error={passwordError}
        />

        <TextField //TODO: Create authentication that the two passwords match
          onChange={(e) => setConfirmPasswordError(e.target.value)}
          id="outlined-basic"
          margin="normal"
          label="Confirm Password"
          type="password"
          variant="outlined"
          inputRef={passwordRef}
          color="success"
          fullWidth
          error={confirmPasswordError}
          helperText={confirmPasswordError == true ? 'Passwords must match!': ''}
        />

        <Button
          variant="contained"
          fullWidth
          color="success"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSignUpTest}
        >
          Register
        </Button>

        <Link href="/login" variant="body2">
          {"Already a user? Sign in"}
        </Link>
      </Box>
    </Container>
  );
};
