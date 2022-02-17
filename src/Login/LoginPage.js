import React, { useRef } from 'react';
import { signUp } from '../firebase';
import TextField from '@mui/material/TextField';
import { Button, Container, Box } from '@mui/material';
import Bilde1 from './Bilde1.png';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import db from "../firebase";


export const LoginPage = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleSignUp() {
        console.log("check");
        await signUp(emailRef.current.value, passwordRef.current.value);
        
        const usersRef = collection(db, "Users");
        return addDoc(usersRef, {
        created: serverTimestamp(),
        name: "username",
    });
    }



    return (
        <Container maxWidth='xs'>
            <Box sx={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                
                padding: 5
                
            }}
            >
            <Box maxHeight='xs' margin='normal'> 
            <img src={Bilde1} width="170" />
            </Box>
             
                {/* <Typography component="h1" variant="h5" >
                        Sign in
                </Typography> */}

                <Box component='form'  sx={{ mt: 1}}>

                    
                        <TextField 
                            
                            margin="normal"
                            id="filled-basic" 
                            inputRef={emailRef} 
                            label="Email" 
                            type="email" 
                            variant="outlined" 
                            autoFocus
                            fullWidth
                            color='success'

                            />
                    
                        <TextField id="outlined-basic" 
                            margin="normal"
                            inputRef={passwordRef} 
                            label="Password" 
                            type="password" 
                            variant="outlined" 
                            color='success'
                            fullWidth
                            />


                        
                    <Button variant="contained" fullWidth color="success" onClick={handleSignUp} sx={{ mt: 3, mb: 2,}}>Sign in</Button>
                    </Box> 
                    
                    <footer>
                            <p>First time? Create an account.</p>
                    </footer>

        
            </Box>
        </Container>
    );
}



// import React, { useRef } from 'react';
// import { signUp } from '../firebase';

// export const LoginPage = () => {
//     const emailRef = useRef();
//     const passwordRef = useRef();

//     async function handleSignUp() {
//         console.log("check");
//         await signUp(emailRef.current.value, passwordRef.current.value);
//     }

//     return (
//         <div>
//         <div>
//             <input ref={emailRef} placeholder='Email' />
//             <input ref={passwordRef} type="password" placeholder='Password' />
//         </div>
//         <button onClick={handleSignUp}>Sign up</button>
//         </div>
//     );
// }