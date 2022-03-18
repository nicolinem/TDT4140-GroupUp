import {
  Box, CircularProgress, Grid, Typography, FormControl, InputLabel,
  Select, MenuItem, OutlinedInput, Chip

} from "@mui/material";
import { useTheme } from '@mui/material/styles';

import Slider from '@mui/material/Slider';

import GroupCard from "./GroupCard";

import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { collection, doc, getDocs, query, where, } from "firebase/firestore";
import { default as db } from "../firebase";



export const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = React.useState([]);

  // const getID = (idi) => {
  //   const { id } = idi;
  //   return id;
  // };

  useEffect(() => {
    const getgroups = async () => {
      const q = query(collection(db, "Teams-beta"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        groups.push({ ...doc.data(), id: doc.id });
        console.log(doc.id, " => ", doc.data());
      });

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
  ]
  const dateNotUsing = [
    "Denne uken",
  ]


  console.log(allInterests);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setGroupInterests(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const minDistance = 1;
  const [value1, setValue1] = React.useState([20, 37]);
  const [value2, setValue2] = React.useState([20, 37]);

  function valuetext(value) {
    return `${value}`;
  }

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue1([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue1([clamped - minDistance, clamped]);
      }
    } else {
      setValue1(newValue);
    }


  };



  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }

  };

  function filterGroups() {
    if (groupInterests.length === 0) {
      return groups.map((groupsID) => getGroupCard(groupsID));
    } else {
      return groups
        .filter((groups) => groups.interests.some(v => groupInterests.includes(v)))
        .map((groupsID) => getGroupCard(groupsID));
    }

  };


  const theme = useTheme();
  const [groupInterests, setGroupInterests] = React.useState([]);
  const [numberPreference, setNumberPreference] = React.useState([]);
  const [agePreference, setAgePreference] = React.useState([]);


  //const chosenInterests = groupInterests.split(",");
  console.log(groupInterests);

  console.log(value1);
  console.log(value2);



  const getGroupCard = (groupObj) => {
    return (
      <Grid item sm={4} key={groupObj.name}>
        {/* {new GroupCard(groupObj, id)} */}
        <GroupCard {...groupObj} />
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

        <Grid container spacing={2} flexGrow={1}>

        <FormControl sx={{ width: 500 }}
                id="filled-basic"
                label="Gruppebeskrivelse"
                variant="outlined"
                autoFocus
                color="success"
              >
                <InputLabel id="demo-multiple-name-label">Current group</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={groupInterests}
                  onChange={handleChange}
                  input={<OutlinedInput label="Interests" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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

          {/*VELG INTERESSER*/}
          <Grid item sm={6}>
            <div style={{ marginTop: "5px", marginBottom: "5px" }}>


              <FormControl sx={{ width: 400 }}
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
                  onChange={handleChange}
                  input={<OutlinedInput label="Interests" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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

            <div style={{ marginTop: "20px", marginBottom: "5px" }}>
              <Typography >
                Aldersspenn
              </Typography>
              <Box sx={{ width: 300 }}>
                <Slider
                  sx={{ color: "#558b2f" }}
                  getAriaLabel={() => 'Minimum distance shift'}
                  value={value1}
                  onChange={handleChange1}
                  valueLabelDisplay="on"
                  getAriaValueText={valuetext}
                  disableSwap
                />
              </Box>
            </div>
          </Grid>


          {/*VELG DATO*/}
          <Grid item sm={3}>
            <div style={{ marginTop: "5px", marginBottom: "5px" }}>
              <FormControl sx={{ width: 400 }}
                id="filled-basic"
                label="Gruppebeskrivelse"
                variant="outlined"
                autoFocus
                color="success"
              >
                <InputLabel id="demo-multiple-name-label">Datetime</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"

                  //onChange={handleChange}
                  input={<OutlinedInput label="Interests" />}

                  MenuProps={MenuProps}
                >
                  {allInterests.map((allInterests) => (
                    <MenuItem
                      key={allInterests}
                      value={allInterests}
                      style={getStyles(allInterests, [], theme)}
                    >
                      {allInterests}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {/*VELG ANTALL*/}

            <div style={{ marginTop: "20px", marginBottom: "5px" }}>
              <Typography>
                Antall
              </Typography>
              <Box sx={{ width: 300 }}>
                <Slider
                  sx={{ color: "#558b2f" }}
                  getAriaLabel={() => 'Minimum distance shift'}
                  value={value2}
                  onChange={handleChange2}
                  valueLabelDisplay="on"
                  getAriaValueText={valuetext}
                  disableSwap
                />
              </Box>
            </div>
          </Grid>
        </Grid>


        <Grid container spacing={3} marginTop={1} >
          {filterGroups()}
          {/*groups.map((groupsID) => getGroupCard(groupsID))}
          {groups
            .filter((groups) => groups.interests.some(v => groupInterests.includes(v)))
            .map((groupsID) => getGroupCard(groupsID))*/}
        </Grid>
      </Box>
    </Box>
  );
};

