import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography, Card } from "@mui/material";
import { useLocation } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(12),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MaikenSinBoks = (props) => {
  return (<Card display="flex" alignItems="center" justify="center" jusstifyContent="center"
    sx={{
      width: 400,
      height: 50,
      p: 1, pr: 2, pl: 2, ml: 1, mb: 1,

      backgroundColor: "#dcedc8",
    }}
  >

    <div style={{ display: "flex", alignItems: "center", marginTop: 12, marginLeft: "32%" }}>
      <Typography sx={{}}
        fontStyle='italic'
      >
        {(props.description)}
      </Typography>
    </div>
    {/*(props.description)*/}

  </Card>);
}

export function GroupInformation() {
  const { state } = useLocation();
  const { description, /*time,*/ /*place*/ } = state;

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <MaikenSinBoks title="Beskrivelse" description={description} />

    </div>
  );
}
