import logo from './logo.svg';
import './App.css';
import { LoginPage } from './Login/LoginPage';
import { MainPage } from './Dashboard/MainPage';

import db from "./firebase";
import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, doc } from 'firebase/firestore';
import { Box } from '@mui/material';
import { NewGroup } from './NewGroup/NewGroup';

function App() {

  const [students, setStudents] = useState();

  console.log(students);

  useEffect(() =>
  onSnapshot(collection(db, "students"), (snapshot) => 
      setStudents(
        snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
        ))
        ,[]);

  return (<Box sx={{ maxWidth: '100%' }}>
      <MainPage />
      </Box>);
}

export default App;
