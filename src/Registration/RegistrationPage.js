import React, { useRef, useState } from "react";
import { Button, Container, Box, Link } from "@mui/material";
import { signUp } from "../firebase";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
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


export const RegistrationPage = () => {
  const firstName = useRef();
  const lastName = useRef();
  const dateOfBirth = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [value, setValue] = React.useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const currentUser = getAuth();

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
  const [passwordLengthNotValid, setPasswordLengthNotValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [emailNotValid, setEmailNotValid] = useState(false);
  const emailRegex = /\S+@\S+\.\S+/;

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  function validate() {

    var status = false;

    setPasswordLengthNotValid(false)
    setPasswordMatch(false)
    setFirstNameError(false)
    setLastNameError(false)
    setEmailError(false)
    setDateOfBirthError(false)
    setPasswordError(false)
    setConfirmPasswordError(false)
    
    if (firstNameInput === '') {
      setFirstNameError(true)
    }
    if (lastNameInput === '') {
      setLastNameError(true)
    } 
    if (emailInput === '') {
      setEmailError(true)
    } else {
      if (emailRegex.test(emailInput)) {
        setEmailNotValid(false);
      } else {
          setEmailNotValid(true);
          setEmailError(true);
      }
    }
    if (dateOfBirthInput === '') {
      setDateOfBirthError(true)
    } 
    if (passwordInput === ''  || confirmPasswordInput === '') {
      setPasswordError(true)
      setConfirmPasswordError(true)
    } else {
        if (passwordInput.length < 6 ) {
          setPasswordLengthNotValid(true)
          setPasswordError(true)
        }
        if (passwordInput !== confirmPasswordInput) {
          setPasswordError(true)
          setConfirmPasswordError(true)
          setPasswordMatch(true)
        }
      }
    if (firstNameInput !== '' && lastNameInput !== '' && emailInput !== '' && passwordInput !== '' && confirmPasswordInput !== '') {
      if ((passwordInput === confirmPasswordInput) && emailNotValid === false) {
        status = true;
      }
    } 
    return status;
  }

  const handleSignUp = async () => {
    setloading(true);
    console.log("check");
    console.log(validate());
    console.log(dateOfBirth);

    if (validate()) {
      try {
        signUp(emailRef.current.value, passwordRef.current.value);
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

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd/MM/yyyy"
              label="Date of birth"
              value={value}
              onChange={(newValue) => {
                setValue(newValue) ;
              }}
              inputRef={dateOfBirth}
              renderInput={(params) => (
                <TextField
                  margin="normal"
                  variant="outlined"
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
            helperText={emailNotValid ? 'Please enter a valid email!' : ''}
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
            helperText={passwordLengthNotValid ? 'Password must be six or more characters!': ''}
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
