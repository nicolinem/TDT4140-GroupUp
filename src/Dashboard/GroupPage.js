
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { GroupInformation } from './GroupInformation';
import { Box, Grid, Stack, TextField, Typography } from '@mui/material';
import image from './DSC06122-kopi.jpg';
import { img, CardHeader, IconButton } from '@mui/material';
import { GroupOverView } from './GroupOverView';
import { Demo, List, ListItem, ListItemAvatar, ListItemText, Avatar, Item, FolderIcon, } from '@mui/material';



import React from 'react';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';



export const GroupPage = () => {
    return (
        <Box sx={{ flexGrow: 1, }}>
            <Header />
            <Box sx={{ display: 'flex', minWidth: 140 }}>

                <Box sx={{ display: 'flex', minWidth: 250, mt: 5, ml: 3 }}>
                    <Sidebar />
                </Box>



                <Box sx={{ display: 'flex', mt: 7, ml: 5, }}>
                    <img src={image} height={350} width={500} />

                </Box>

                <Box sx={{ display: 'flex', height: 250, width: 360, mt: 6, ml: -3 }}>
                    <Typography sx={{ mt: 3, ml: 20 }} variant="h5" component="div" fontWeight='bold'>
                        Gruppenavn
                    </Typography>

                    <Box sx={{ mt: 10, ml: -23 }}>
                        <GroupOverView />
                    </Box>

                </Box>

                <Box sx={{ display: 'flex', minWidth: 250, mt: 58, ml: -96 }}>
                    <GroupInformation />
                </Box>

            </Box>
        </Box>

    );

}
