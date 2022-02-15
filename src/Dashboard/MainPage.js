
import { Box, Grid, Stack } from '@mui/material';
import { Header } from './Header';
import { GroupCard} from './GroupCard';
import { sizing } from '@mui/system';

import React from 'react';
import { Sidebar } from './Sidebar';

export const  MainPage = () => {

  return (
    <Box sx={{ flexGrow: 1, }}>
      <Header />
      <Box sx={{ display: 'flex', minWidth: 140}}>
      
      <Box sx={{ display: 'flex', minWidth: 250, mt: 5, ml: 3}}>
        <Sidebar />
      </Box>

      <Box sx={{ px:5, py: 4 }}>
      <Grid container spacing={1}>
       

          <Grid item sm={3}>
            <GroupCard />
          </Grid>
          <Grid item xs={3}>
            <GroupCard />
          </Grid>
          <Grid item sm={3}>
            <GroupCard />
          </Grid>
          <Grid item sm={3}>
            <GroupCard />
          </Grid>
          
      </Grid>
      </Box>
      </Box>
     
    </Box>

      );

}