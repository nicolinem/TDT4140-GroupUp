import React, { useRef } from 'react';
import { signUp } from '../firebase';
import { Button, Container, Box } from '@mui/material';
import TextField from '@mui/material/TextField';


export const RegistrationPage = () => {

    
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

                <TextField id="outlined-basic"
                    margin="normal"
                    helperText="Date of birth"
                    label="dd.mm.yyyy"
                    type="password"
                    variant="outlined"
                    color='success'
                    fullWidth
                />

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