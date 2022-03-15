import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import image from "./DSC06122-kopi.jpg";
import { Avatar, Box, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ButtonBase } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { default as db } from "../firebase";
import { useLocation } from "react-router-dom";


export function GroupInterests() {
    const { state } = useLocation();
    const { interests, /*time,*/ /*place*/ } = state;

/*     const interestList = ["Løpe", "Progge", "Trond", "Viggo", "Torgersen", "Netflix"];
 */ const elementer = [];
    interests.forEach(element => {
        elementer.push(
            <Card alignItems="center" justify="center" sx={{
                p: 1, pr: 2, pl: 2, ml: 1, mb: 1, backgroundColor: "#aed581", "&:hover": {
                    backgroundColor: "#c5e1a5"
                },
            }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {element}
                </div>
            </Card>
        );
    });


    return (
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap " }}>
            {

                <div style={{ display: "flex", alignItems: "center" }}>
                    {elementer}
                </div>

            }
            {/*<Card alignItems="center" justify="center" sx={{
            minHeight: 40, maxHeight: 40, width: 100, backgroundColor: "#aed581", "&:hover": {
                backgroundColor: "#c5e1a5",
            },
        }}>
            <div style={{ height: "100%", display: "grid", placeContent: "center" }}>
                <Typography gutterBottom component="div" textAlign="center" sx={{ verticalAlign: "middle" }}>
                    {interests}
                </Typography>
            </div>
            {/* <CardActions
          alignItems="center"
          justifyContent="center"
          sx={{ display: "flex" }}
        >
          <Button color="success" size="small">
            Get to know
          </Button>
        </CardActions> *}
        </Card>*/}
        </div>
    );
};
