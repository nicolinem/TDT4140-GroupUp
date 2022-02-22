import React, { useRef } from 'react';
import { Button, Container, Box } from '@mui/material';
import TextField from '@mui/material/TextField';


export const GroupRegistration = () => {
    return (

        <Container>
            <Box sx={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',

            }}>
                <TextField
                    margin="normal"
                    id="filled-basic"
                    label="Gruppenavn"
                    variant="outlined"
                    autoFocus
                    width="200px"
                    color='success'
                />

                <TextField
                    margin="normal"
                    id="filled-basic"
                    label="Gruppebeskrivelse"
                    variant="outlined"
                    autoFocus
                    width="200px"
                    color='success'
                />

                <TextField
                    margin="normal"
                    id="filled-basic"
                    label="Interesser"
                    variant="outlined"
                    autoFocus
                    width="200px"
                    color='success'
                />

                <TextField
                    margin="normal"
                    id="filled-basic"
                    label="Medlemmer"
                    variant="outlined"
                    autoFocus
                    width="200px"
                    color='success'
                />

            </Box>

            <Box sx={{
                marginTop: 2,
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}
            >
                <Button variant="contained" color="success">
                    Opprett gruppe
                 </Button>
            </Box>
            <Box sx={{
                marginTop: 10,
                flexDirection: 'column',
                alignItems: 'flex-end',
            }}>



            </Box>

        </Container>
    )

}