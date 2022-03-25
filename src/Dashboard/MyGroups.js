import {  db } from "../firebase";
import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  doc,
  updateDoc,
  query,
  getDocs,
} from "firebase/firestore";
import {
  Box,
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Sidebar } from "./Sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./MyGroups.module.css";
import CloseIcon from "@mui/icons-material/Close";
import GroupCard from "./GroupCard";

export const MyGroups = () => {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [hasGroups, setHasGroups] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const getgroups = async () => {
      const q = query(collection(db, "Teams"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        groups.push({ ...doc.data(), id: doc.id });
        console.log(doc.id, " => ", doc.data());
      });
      checkGroup();
      setLoading(false);
    };
    getgroups();
  }, []);

  const leaveGroup = async (group) => {
    const groupRef = doc(db, "Teams", group.id);

    await updateDoc(groupRef, {
      members: group.members.filter(
        (member) => member.id != auth.currentUser.uid
      ),
    });
  };

  const getGroupCard = (groupObj) => {
    return (
      <Grid item sm={4} key={groupObj.name}>
        {/* {new GroupCard(groupObj, id)} */}
        <GroupCard {...groupObj} />
      </Grid>
    );
  };

  const checkGroup = () => {
    console.log("GRPOUPS: ", groups);
    const mygroups = groups.filter((group) =>
      group.members.find((c) => c.id === auth.currentUser.uid)
    );
    console.log(mygroups);
    if (mygroups.length) {
      setHasGroups(true);
    }
  };

  return loading ? (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box sx={{ display: "flex", minWidth: 250, mt: 6, ml: 3 }}>
        <Sidebar />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="success" />
      </Box>
    </Box>
  ) : hasGroups ? (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box sx={{ display: "flex", minWidth: 250, mt: 6, ml: 3 }}>
        <Sidebar />
      </Box>
      <Box sx={{ px: 5, py: 4, flexGrow: 1 }}>
        <Grid container spacing={1}>
          {groups
            .filter((group) => group.members.some(user => user.id == auth.currentUser.uid))
            .map((groupsID) => getGroupCard(groupsID))}
        </Grid>
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box sx={{ display: "flex", minWidth: 250, mt: 6, ml: 3 }}>
        <Sidebar />
      </Box>
      <Box sx={{ px: 5, py: 4 }}>You have no groups</Box>
    </Box>
  );
};

//   return (
//     <Box sx={{ display: "flex", flexGrow: 1 }}>
//       <Box sx={{ minWidth: 250, mt: 6, ml: 3 }}>
//         <Sidebar />
//       </Box>
//       <div className={styles.container}>
//         {groups
//           .filter((group) => group.members.includes(auth.currentUser.uid))
//           .map((group) => (
//             <Card
//               sx={{ minWidth: 275, backgroundColor: "#dcedc8", maxHeight: 220 }}
//             >
//               <CardContent>
//                 <Typography
//                   sx={{ fontSize: 14 }}
//                   color="text.secondary"
//                   gutterBottom
//                 >
//                   Group name
//                 </Typography>
//                 <Typography variant="h5" component="div">
//                   {group.name}
//                 </Typography>
//                 <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                   {`Since ${group.created.toDate().toISOString().slice(0, 10)}`}
//                 </Typography>
//                 <Typography variant="body2">{group.description}</Typography>
//               </CardContent>
//               <CardActions>
//                 <Button
//                   onClick={() => leaveGroup(group)}
//                   endIcon={<CloseIcon></CloseIcon>}
//                   size="small"
//                 >
//                   Leave
//                 </Button>
//                 <Button
//                   endIcon={<ArrowForwardIosIcon></ArrowForwardIosIcon>}
//                   size="small"
//                 >
//                   Go to group
//                 </Button>
//               </CardActions>
//             </Card>
//           ))}
//       </div>
//     </Box>
//   );
// };
