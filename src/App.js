import logo from './logo.svg';
import './App.css';
import { LoginPage } from './Login/LoginPage';
import { Colors } from './Colors';
import db from "./firebase";
import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, doc } from 'firebase/firestore';
import { Dot } from './Colors';

function App() {

  const [students, setStudents] = useState();

  console.log(students);

  useEffect(() =>
  onSnapshot(collection(db, "students"), (snapshot) => 
      setStudents(
        snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
        ))
        ,[]);

  return (<div>
      <LoginPage />
      </div>);
}

export default App;
