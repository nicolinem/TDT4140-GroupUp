
import { Box, Stack } from '@mui/material';
import { Header } from './Header';
import { GroupCard} from './GroupCard';

import React from 'react';

export const  MainPage = () => {

  return (
    <Box>
      <Header />
      <Stack marginTop={4}
        justifyContent="center"
        alignItems="center"
        spacing={3}>
        <GroupCard />
        <GroupCard />
        <GroupCard />
      </Stack>
     
    </Box>

      );

}