
import { Avatar, Box, InputBase, Stack } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { AppBar, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import image from './Bilde1.png';

export const Header = () => {

    const Search = styled('div')(({ theme }) => ({
      position: 'relative',
  
      borderRadius: 28,
      backgroundColor: alpha(theme.palette.common.white, 1),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    }));
  
    const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));
  
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'primary',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
    }));
  
    return (
      <Box>
          <AppBar 
            position="static" 
            alignItems='center' 
            justifyContent='center' 
            style={{ background: '#9aca7c' }}>
          <Toolbar>
          <IconButton
                size="large"
              color="inherit"
              sx={{ mr: 1 }}>
            <Avatar alt="Remy Sharp" src={image} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}>
              GroupUp
          </Typography>
   
       
          <Search>
            <SearchIconWrapper>
            <SearchIcon color="disabled"/>
            </SearchIconWrapper>
            <StyledInputBase 
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }} />
  
            
          </Search>
          
          </Toolbar>
        </AppBar>
  
        <Stack>
          
        </Stack>
      </Box>
  
        
        );
  
  }