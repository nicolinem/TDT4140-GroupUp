import React, { useRef, useState } from "react";
import { Button, Container, Box, Link } from "@mui/material";
import { signUp } from "../firebase";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import nbLocale from "date-fns/locale/nb";

export const RegistrationPage = () => {
  const localeMap = {
    nb: nbLocale,
  };
  const emailRef = useRef();
  const passwordRef = useRef();
  const [value, setValue] = React.useState(null);
  const [locale, setLocale] = React.useState("nb");
  const [loading, setloading] = useState(false);

  function handleSignUp() {
    setloading(true);
    console.log("check");
    try {
      signUp(emailRef.current.value, passwordRef.current.value);
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
        <TextField
          id="outlined-basic"
          margin="normal"
          label="First Name"
          variant="outlined"
          color="success"
          fullWidth
        />
        <TextField
          id="outlined-basic"
          margin="normal"
          label="Last Name"
          variant="outlined"
          color="success"
          fullWidth
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
                margin="normal"
                color="success"
                fullWidth
                {...params}
              />
            )}
          />
        </LocalizationProvider>

        <TextField
          margin="normal"
          id="filled-basic"
          label="Email"
          type="email"
          variant="outlined"
          inputRef={emailRef}
          autoFocus
          fullWidth
          color="success"
        />

        <TextField
          id="outlined-basic"
          margin="normal"
          label="Password"
          type="password"
          variant="outlined"
          color="success"
          fullWidth
        />

        <TextField //TODO: Create authentication that the two passwords match
          id="outlined-basic"
          margin="normal"
          label="Confirm Password"
          type="password"
          variant="outlined"
          inputRef={passwordRef}
          color="success"
          fullWidth
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
          {"Back to login"}
        </Link>
      </Box>
    </Container>
  );
};