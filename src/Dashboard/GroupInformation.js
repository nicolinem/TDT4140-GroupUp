import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(12),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MaikenSinBoks = (props) => {
  return (<Box
    sx={{
      width: 400,
      height: 200,
      mt: 3,
      backgroundColor: "#dcedc8",
      border: 6,
      borderColor: "#9aca7c",
    }}
  >
    <Typography
      variant="h8"
      component="h2"
      sx={{
        padding: 1,
        backgroundColor: "#9aca7c",
        color: "#fafafa",
      }}
    >
      {props.title}
    </Typography>

    <Typography
      variant="h10"
      component="h10"
      sx={{
        padding: 1,
        paddingTop: 3,
      }}
    >
      {(props.description)}

    </Typography>
  </Box>);
}

export function GroupInformation() {
  const { state } = useLocation();
  const { description, /*time,*/ /*place*/ } = state;

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <MaikenSinBoks title="Beskrivelse" description={description} />
      <MaikenSinBoks title="Tidspunkt" description="12. mars" />

      {/*
    <Box sx={{}}>
      <Grid container spacing={55}>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={1}>
          <Box
            sx={{
              width: 400,
              height: 200,
              mt: 3,
              ml: 10,
              backgroundColor: "#dcedc8",
              border: 6,
              borderColor: "#9aca7c",
            }}
          >
            <Typography
              variant="h8"
              component="h2"
              sx={{
                padding: 1,
                backgroundColor: "#9aca7c",
                color: "#fafafa",
              }}
            >
              Beskrivelse
            </Typography>

            <Typography
              variant="h10"
              component="h10"
              sx={{
                padding: 1,
                paddingTop: 3,
              }}
            >
              {(description)}

            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box
            sx={{
              width: 400,
              height: 200,
              mt: 3,
              ml: 10,
              backgroundColor: "#dcedc8",
              border: 6,
              borderColor: "#9aca7c",
            }}
          >
            <Typography
              variant="h8"
              component="h2"
              sx={{
                padding: 1,
                backgroundColor: "#9aca7c",
                color: "#fafafa",
              }}
            >
              Tidspunkt
            </Typography>

            <Typography
              variant="h10"
              component="h10"
              sx={{
                padding: 1,
                paddingTop: 3,
              }}
            >


            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>*/}
    </div>
  );
}
