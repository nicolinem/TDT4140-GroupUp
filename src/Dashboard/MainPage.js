
import { Box, Grid, Stack } from '@mui/material';
import { Header } from './Header';
import { GroupCard} from './GroupCard';
import { sizing } from '@mui/system';

import React from 'react';
import { Sidebar } from './Sidebar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Outlet,

} from "react-router-dom";
import { Feed } from './Feed';

export const  MainPage = () => {

  return (
    <Box sx={{ flexGrow: 1, }}>
      <Header />
      
      <Box sx={{ display: 'flex', minWidth: 140}}>
      
        
        <Box sx={{ px:5, py: 4 }}>
          <Outlet />
        </Box>
      </Box>
     
    </Box>

      );

}