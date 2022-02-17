
import image from './DSC06122-kopi.jpg';


import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { Typography } from '@mui/material';

export function GroupOverView() {
    return (

        <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={image} sx={{ width: 40, height: 40 }} />
                </ListItemAvatar>
                <ListItemText primary="Gruppemedlem1" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={image} sx={{ width: 40, height: 40 }} />
                </ListItemAvatar>
                <ListItemText primary="Gruppemedlem2" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={image} sx={{ width: 40, height: 40 }} />
                </ListItemAvatar>
                <ListItemText primary="Gruppemedlem3" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={image} sx={{ width: 40, height: 40 }} />
                </ListItemAvatar>
                <ListItemText primary="Gruppemedlem4" />
            </ListItem>
        </List>

    );
}


