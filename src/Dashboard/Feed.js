import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../firebase";
import { updateDoc } from "firebase/firestore";

import Slider from "@mui/material/Slider";

import GroupCard from "./GroupCard";

import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
//import { default as db } from "../firebase";
import { db } from "../firebase";
export const Feed = (props) => {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState();
  const currentUser = useAuth();
  groups.forEach((group) => {
    console.log(`${group.id}`);
    console.log(group.likedGroups);
  });

  // const getID = (idi) => {
  //   const { id } = idi;
  //   return id;
  // };

  useEffect(() => {
    const getgroups = async () => {
      const q = query(collection(db, "Teams-beta"));

      const querySnapshot = await getDocs(q);
      const requestedGroups = [];
      querySnapshot.forEach((doc) => {
        requestedGroups.push({ ...doc.data(), id: doc.id });
        console.log(doc.id, " => ", doc.data());
      });
      setGroups(requestedGroups);
      setLoading(false);
    };
    getgroups();
  }, []);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const allInterests = [
    "Løpe",
    "Gå tur",
    "Vorse",
    "Spille brettspill",
    "Progge",
  ];
  const dateNotUsing = ["Denne uken"];

  const theme = useTheme();
  const [groupInterests, setGroupInterests] = React.useState([]);

  const handleChangeGroup = (event) => {
    const {
      target: { value },
    } = event;
    setCurrentGroup(groups.find((group) => group.id == value));
  };

  const handleChangeInterests = (event) => {
    const {
      target: { value },
    } = event;
    setGroupInterests(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const minDistance = 1;

  function valuetext(value) {
    return `${value}`;
  }

  const [numberPreference, setNumberPreference] = React.useState([1, 5]);
  const [agePreference, setAgePreference] = React.useState([1, 35]);

  // ANTALL

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setNumberPreference([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setNumberPreference([clamped - minDistance, clamped]);
      }
    } else {
      setNumberPreference(newValue);
    }
  };

  // ALDER

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 30 - minDistance);
        setAgePreference([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setAgePreference([clamped - minDistance, clamped]);
      }
    } else {
      setAgePreference(newValue);
    }
  };

  function filterGroups() {
    let filteredGroups = groups;

    if (groupInterests.length !== 0) {
      filteredGroups = filteredGroups.filter((groups) =>
        groups.interests.some((v) => groupInterests.includes(v))
      );
    }

    //AGE
    //
    //console.log(groups[0].members[0].dateOfBirth)

    // formatterer dato til riktig format

    if (currentGroup) {
      filteredGroups = filteredGroups.filter(
        (group) => group.id !== currentGroup.id
      );
    }
    // The code below filters the groups on which are liked of the current group
    /* if (currentGroup) {
      filteredGroups = filteredGroups.filter((group) =>
        currentGroup.likedGroups.includes(group.id)
      ); 
    }
    */
    return filteredGroups.map((group) => getGroupCard(group));
  }

  function formatDateString(membersDateList) {
    const correctFormatList = [];
    let correctValue = "";
    for (let i = 0; i < membersDateList.length; i++) {
      const splitList = membersDateList[i].split("/");
      correctValue = splitList[2] + "-" + splitList[1] + "-" + splitList[0];
      correctFormatList.push(correctValue);
    }
    return correctFormatList;
  }

  const handleLikeGroup = async (id) => {
    const groupRef = doc(db, "Teams-beta", currentGroup.id);

    if (!currentGroup.likedGroups.includes(id)) {
      const updatedLikedGroups = [...currentGroup.likedGroups, id];
      setCurrentGroup((prevCurrentGroup) => ({
        ...prevCurrentGroup,
        likedGroups: [...prevCurrentGroup.likedGroups, id],
      }));
      await updateDoc(groupRef, {
        likedGroups: updatedLikedGroups,
      });

      console.log(currentGroup);
    }
  };

  const handleDislikeGroup = async (id) => {
    const groupRef = doc(db, "Teams-beta", currentGroup.id);

    if (currentGroup.likedGroups.includes(id)) {
      const updatedLikedGroups = currentGroup.likedGroups.filter(
        (groupID) => groupID !== id
      );
      setCurrentGroup((prevCurrentGroup) => ({
        ...prevCurrentGroup,
        likedGroups: prevCurrentGroup.likedGroups.filter(
          (groupID) => groupID !== id
        ),
      }));
      await updateDoc(groupRef, {
        likedGroups: updatedLikedGroups,
      });
    }
  };

  // henter ut alder
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // henter ut gjennomsnittsalder
  function getAverageAge(listOfDateStrings) {
    let sumAlder = 0;
    for (let i = 0; i < listOfDateStrings.length; i++) {
      sumAlder += getAge(listOfDateStrings[i]);
    }
    return sumAlder / listOfDateStrings.length;
  }

  function getAverageAgeOfGroup(medlemmer) {
    let liste = [];
    medlemmer.forEach((medlem) => liste.push(medlem.dateOfBirth));
    liste = formatDateString(liste);
    return getAverageAge(liste);
  }

  function filterByInterests(groups) {
    return groups.filter(
      (group) =>
        group.interests.some((v) => groupInterests.includes(v)) ||
        groupInterests.length === 0
    );
  }

  function filterByNumber(groups, min, max) {
    return groups.filter(
      (group) => group.members.length >= min && group.members.length <= max
    );
  }

  function filterByAge(groups, min, max) {
    return groups.filter(
      (group) =>
        getAverageAgeOfGroup(group.members) >= min &&
        getAverageAgeOfGroup(group.members) <= max
    );
  }

  function filterByCurrentGroup(groups) {
    let filteredGroups;
    filteredGroups = currentGroup
      ? groups.filter((group) => group.id !== currentGroup.id)
      : groups;

    if (currentGroup && props.showMatches) {
      filteredGroups = filteredGroups.filter(
        (group) =>
          group.likedGroups.includes(currentGroup.id) &&
          currentGroup.likedGroups.includes(group.id)
      );
    }
    return filteredGroups;
  }

  function makeCards(groups) {
    return groups.map((groupsID) => getGroupCard(groupsID));
  }

  function makeCardsFilteredByAgeNumberInterest() {
    const ageGroup = filterByAge(groups, agePreference[0], agePreference[1]);
    const ageNumberGroup = filterByNumber(
      ageGroup,
      numberPreference[0],
      numberPreference[1]
    );
    const ageNumberInterestGroup = filterByInterests(ageNumberGroup);
    const currentGroupAgeNumberInterestGroup = filterByCurrentGroup(
      ageNumberInterestGroup
    );

    return makeCards(currentGroupAgeNumberInterestGroup);
  }

  const getGroupCard = (groupObj) => {
    const isLiked = currentGroup
      ? currentGroup.likedGroups.includes(groupObj.id)
      : false;
    console.log(isLiked);
    return (
      <Grid item sm={4} key={groupObj.name}>
        {/* {new GroupCard(groupObj, id)} */}
        <GroupCard
          {...groupObj}
          isLiked={isLiked}
          handleLikeGroup={handleLikeGroup}
          handleDislikeGroup={handleDislikeGroup}
          key={groupObj.id}
        />
      </Grid>
    );
  };

  return loading ? (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box sx={{ display: "flex", minWidth: 250, mt: 6, ml: 3, flexgrow: 0 }}>
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
  ) : (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box sx={{ display: "flex", minWidth: 250, mt: 6, ml: 3 }}>
        <Sidebar />
      </Box>
      <Box sx={{ px: 5, py: 4, flexGrow: 1 }}>
        <FormControl sx={{ width: 600, marginBottom: 7 }}>
          <InputLabel
            id="demo-simple-select-label"
            input={<OutlinedInput label="Group" />}
          >
            Group
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentGroup}
            label="Group"
            onChange={handleChangeGroup}
          >
            {groups.length > 0 &&
              groups
                .filter((group) =>
                  group.members.some((member) => member.id == currentUser?.uid)
                )
                .map((group) => (
                  <MenuItem value={group.id}>{group.name}</MenuItem>
                ))}
          </Select>
        </FormControl>
        <Grid container spacing={2} flexGrow={1}>
          {/*VELG INTERESSER*/}
          <Grid item sm={6}>
            <div style={{ marginTop: "5px", marginBottom: "5px" }}>
              <FormControl
                sx={{ width: 400 }}
                id="filled-basic"
                label="Gruppebeskrivelse"
                variant="outlined"
                autoFocus
                color="success"
              >
                <InputLabel id="demo-multiple-name-label">Interests</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={groupInterests}
                  onChange={handleChangeInterests}
                  input={<OutlinedInput label="Interests" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {allInterests.map((allInterests) => (
                    <MenuItem
                      key={allInterests}
                      value={allInterests}
                      style={getStyles(allInterests, groupInterests, theme)}
                    >
                      {allInterests}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {/*VELG ALDER*/}

            <div style={{ marginTop: "10px", marginBottom: "5px" }}>
              <Typography>Aldersspenn</Typography>
              <Box sx={{ width: 300 }}>
                <Slider
                  sx={{ color: "#558b2f", marginTop: "35px" }}
                  getAriaLabel={() => "Minimum distance shift"}
                  value={agePreference}
                  onChange={handleChange2}
                  valueLabelDisplay="on"
                  getAriaValueText={valuetext}
                  disableSwap
                />
              </Box>
            </div>
          </Grid>

          {/*VELG DATO*/}
          <Grid item sm={3}>
            {/*VELG ANTALL*/}

            <div style={{ marginTop: "5px", marginBottom: "5px" }}>
              <Typography>Antall</Typography>
              <Box sx={{ width: 300 }}>
                <Slider
                  sx={{ color: "#558b2f", marginTop: "35px" }}
                  getAriaLabel={() => "Minimum distance shift"}
                  value={numberPreference}
                  onChange={handleChange1}
                  valueLabelDisplay="on"
                  getAriaValueText={valuetext}
                  disableSwap
                  max={30}
                  min={1}
                />
              </Box>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {makeCardsFilteredByAgeNumberInterest()}
          {/*filterGroupsByInterests()*/}
          {/*filterGroupsByNumber()*/}
          {/*filterGroupsByAge()*/}
          {/*groups.map((groupsID) => getGroupCard(groupsID))}
          {groups
            .filter((groups) => groups.interests.some(v => groupInterests.includes(v)))
            .map((groupsID) => getGroupCard(groupsID))*/}
        </Grid>
      </Box>
    </Box>
  );
};
