import React, { useRef } from 'react';
import { signUp } from '../firebase';

export const LoginPage = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleSignUp() {
        console.log("check");
        await signUp(emailRef.current.value, passwordRef.current.value);
    }

    return (
        <div>
        <div>
            <input ref={emailRef} placeholder='Email' />
            <input ref={passwordRef} type="password" placeholder='Password' />
        </div>
        <button onClick={handleSignUp}>Sign up</button>
        </div>
    );
}