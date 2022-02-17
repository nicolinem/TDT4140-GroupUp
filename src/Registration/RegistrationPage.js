import React, { useRef } from 'react';
import { Button, Container, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import nbLocale from 'date-fns/locale/nb';


export const RegistrationPage = () => {

    const localeMap = {
        nb: nbLocale,
      };
      

    const [value, setValue] = React.useState(null);
    const [locale, setLocale] = React.useState('nb');
    
    return (
        <Container>
            <Box sx={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

                padding: 5

            }}>

                <TextField id="outlined-basic"
                    margin="normal"
                    label="First Name"
                    type="password"
                    variant="outlined"
                    color='success'
                    fullWidth
                />
                <TextField id="outlined-basic"
                    margin="normal"
                    label="Last Name"
                    type="password"
                    variant="outlined"
                    color='success'
                    fullWidth
                />


                <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
                    <DatePicker
                        label="Date of birth"
                        value={value}
                        color='success'
                        onChange={(newValue) => {
                        setValue(newValue);
                        }}
                        renderInput={(params) => <TextField margin='normal' color='success' fullWidth {...params} />}
                    />
                </LocalizationProvider>

                <TextField
                    margin="normal"
                    id="filled-basic"
                    label="Email"
                    type="email"
                    variant="outlined"
                    autoFocus
                    fullWidth
                    color='success'

                />

                <TextField id="outlined-basic"
                    margin="normal"
                    label="Password"
                    type="password"
                    variant="outlined"
                    color='success'
                    fullWidth
                />

                <TextField id="outlined-basic"
                    margin="normal"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    color='success'
                    fullWidth
                />

            <Button variant="contained" fullWidth color="success" sx={{ mt: 3, mb: 2, }}>Register</Button>
            </Box>
              
            

        </Container>
    )
}