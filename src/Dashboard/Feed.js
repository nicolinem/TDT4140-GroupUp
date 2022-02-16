
import { Box, Grid,  } from '@mui/material';
import { GroupCard} from './GroupCard';
import React from 'react';
import { Sidebar } from './Sidebar';



export const  Feed = () => {

  return (
    <Box sx={{ display: 'flex', flexGrow: 1, }}>

        <Box sx={{ display: 'flex', minWidth: 250, mt: 6, ml: 3}}>
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

    );

}