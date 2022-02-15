
import { Box, Grid,  } from '@mui/material';
import { GroupCard} from './GroupCard';
import React from 'react';



export const  Feed = () => {

  return (
    <Box sx={{ flexGrow: 1, }}>
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