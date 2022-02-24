import { default as db} from "../firebase";
import React, { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { Box, Card, Typography, CardContent, CardActions, Button } from "@mui/material";
import { Sidebar } from "./Sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from "./MyGroups.module.css";

export const MyGroups = () => {

    const [groups, setGroups] = useState([]);
    const auth = getAuth();

    useEffect(
        () =>
          onSnapshot(collection(db, "Teams-beta"), (snapshot) =>
            
          setGroups(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
          ,
        []
      );

    return (
        <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box sx={{ minWidth: 250, mt: 6, ml: 3 }}>
        <Sidebar />
      </Box>
      <div className={styles.container}>
         {groups.filter(group => group.members.includes(auth.currentUser.uid)).map(group => 
             <Card sx={{ minWidth: 275, backgroundColor: '#dcedc8', maxHeight: 220}}>
             <CardContent>
               <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                 Group name
               </Typography>
               <Typography variant="h5" component="div">
               {group.name}
               </Typography>
               <Typography sx={{ mb: 1.5 }} color="text.secondary">
                 {`Since ${group.created.toDate().toISOString().slice(0,10)}`}
               </Typography>
               <Typography variant="body2">
                 {group.description}
                 
               </Typography>
             </CardContent>
             <CardActions>
               <Button  endIcon={<ArrowForwardIosIcon ></ArrowForwardIosIcon>} size="small">Details</Button>
             </CardActions>
           </Card>
         )}
    
         
        </div>
      </Box>
        
    );
}