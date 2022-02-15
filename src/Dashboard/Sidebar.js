import React from 'react';
import { Button, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import GroupsIcon from '@mui/icons-material/Groups';
import BlenderIcon from '@mui/icons-material/Blender';
import CheckroomIcon from '@mui/icons-material/Checkroom';



export const Sidebar = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      >
        <ListItemButton component="button"
          href="/LoginPage"
          sx={{borderRadius: 8}}>
            <ListItemIcon>
             <BlenderIcon />
            </ListItemIcon>
          <ListItemText primary="Mixer" />
        </ListItemButton>

      <ListItemButton onClick={handleClick} sx={{borderRadius: 8}}>
        <ListItemIcon>
          <CheckroomIcon />
        </ListItemIcon>
        <ListItemText primary="Mine grupper" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
         <List component="div" disablePadding> {/* TODO: Legge til slik at den oppdateres basert på brukerens grupper */}
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="FuckFriends" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="FuckFriendsVol2" />
          </ListItemButton>
        </List>
      </Collapse>

    </List>

    );

}