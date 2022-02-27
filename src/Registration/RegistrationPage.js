import React, { useRef, useState } from "react";
import { Button, Container, Box, Link } from "@mui/material";
import { signUp } from "../firebase";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import nbLocale from "date-fns/locale/nb";
import { default as db} from "../firebase";
import { firebase } from '@firebase/app';
import '@firebase/firestore';

import { useEffect } from "react";


import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  serverTimestamp,
  setDoc,
  where, 
  getDocs,
  query
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setDate } from "date-fns";

export const RegistrationPage = () => {
  const firstName = useRef();
  const lastName = useRef();
  const dateOfBirth = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [value, setValue] = React.useState(null);
  const [locale, setLocale] = React.useState("nb");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const currentUser = getAuth();
  const localeMap = {
    nb: nbLocale,
  };

  onAuthStateChanged(currentUser, (user) => {
    if (user) {
    console.log(user.uid);
    console.log({
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: emailRef.current.value,
      dateOfBirth: dateOfBirth.current.value,
      password: passwordRef.current.value,
    });

    setDoc(doc(db, "Users", user.uid), {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: emailRef.current.value,
      dateOfBirth: dateOfBirth.current.value,
      password: passwordRef.current.value,
      invites: [],
    });
      navigate("/");
    } else {
    }
  });

  const [firstNameInput, setFirstName] = useState('');
  const [lastNameInput, setLastName] = useState('');
  const [emailInput, setEmail] = useState('');
  const [dateOfBirthInput, setDateOfBirth] = useState('');
  const [passwordInput, setPassword] = useState('');
  const [confirmPasswordInput, setConfirmPassword] = useState('');

  const [passwordMatch, setPasswordMatch] = useState(false);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);


  const handleSignUp = async () => {
    setloading(true);
    console.log("check");

    setPasswordMatch(false)
    setFirstNameError(false)
    setLastNameError(false)
    setEmailError(false)
    setDateOfBirthError(false)
    setPasswordError(false)
    setConfirmPasswordError(false)
    
    if (firstNameInput == '') {
      setFirstNameError(true)
    }
    if (lastNameInput == '') {
      setLastNameError(true)
    } 
    if (emailInput == '') {
      setEmailError(true)
    } 
    if (dateOfBirthInput == '') {
      setDateOfBirthError(true)
    } 
    if (passwordInput == ''  || confirmPasswordInput == '') {
      setPasswordError(true)
      setConfirmPasswordError(true)
    } else {
      if (passwordInput != confirmPasswordInput) {
        setPasswordError(true)
        setConfirmPasswordError(true)
        setPasswordMatch(true)
      }
    }

    if (firstNameError == false && lastNameError == false && emailError == false && passwordError == false && confirmPasswordError == false) {
      try {
        signUp(emailRef.current.value, passwordRef.current.value);
        const userCollRef = collection(db, "Users");
        await addDoc(userCollRef, {
          firstName: firstName.current.value,
          lastName: lastName.current.value,
          email: emailRef.current.value,
          dateOfBirth: dateOfBirth.current.value,
          password: passwordRef.current.value,
        });
      } catch {
        alert("Something is wrong with your login");
      }
      setloading(false);
    };
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
        <TextField
            onChange={(e) => setFirstName(e.target.value)}
            id="outlined-basic"s
            margin="normal"
            label="First Name"
            inputRef={firstName}
            variant="outlined"
            color="success"
            fullWidth
            error={firstNameError}
          
            
          />
          <TextField
            onChange={(e) => setLastName(e.target.value)}
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
                setValue(newValue) ;
              }}
              helperText={dateOfBirthError ? 'Enter date of birth!': ''}
              inputRef={dateOfBirth}
              renderInput={(params) => (
                <TextField
                  margin="normal"
                  color="success"
                  fullWidth
                  {...params}
                />
              )}
            />
          </LocalizationProvider>

          <TextField
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-basic"
            margin="normal"
            label="Password"
            type="password"
            variant="outlined"
            inputRef={passwordRef}
            color="success"
            fullWidth
            error={passwordError}
          />

          <TextField
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="outlined-basic"
            margin="normal"
            label="Confirm Password"
            type="password"
            variant="outlined"
            color="success"
            fullWidth
            error={confirmPasswordError}
            helperText={passwordMatch ? 'Passwords must match!': ''}
          />

          <Button
            variant="contained"
            fullWidth
            color="success"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignUp}
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
