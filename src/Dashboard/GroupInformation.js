import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(12),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export function GroupInformation() {
    return (
        <Box sx={{ width: '100%', ml: -15 }}>
            <Grid container spacing={36}>
                <Grid item xs={1}>
                    <Box sx={{
                        width: 250,
                        height: 400,
                        mt: 3,
                        ml: 10,
                        backgroundColor: '#dcedc8',
                        border: 6,
                        borderColor: '#9aca7c',

                    }}>
                        <Typography
                            variant="h8"
                            component="h2"
                            sx={{
                                padding: 1,
                                backgroundColor: '#9aca7c',
                                color: '#fafafa',
                            }}
                        >
                            Interesser
                        </Typography>

                        <Typography
                            variant="h10"
                            component="h10"
                            sx={{
                                padding: 1,
                                paddingTop: 3,
                            }

                            }
                        >
                            Gå på tur
                            Vors
                            Drikke vin
                        </Typography>


                    </Box>
                </Grid>
                <Grid item xs={1}>
                    <Box sx={{
                        width: 250,
                        height: 400,
                        mt: 3,
                        ml: 10,
                        backgroundColor: '#dcedc8',
                        border: 6,
                        borderColor: '#9aca7c',

                    }}>
                        <Typography
                            variant="h8"
                            component="h2"
                            sx={{
                                padding: 1,
                                backgroundColor: '#9aca7c',
                                color: '#fafafa',
                            }}
                        >
                            Beskrivelse
                        </Typography>

                        <Typography
                            variant="h10"
                            component="h10"
                            sx={{
                                padding: 1,
                                paddingTop: 3,
                            }

                            }
                        >
                            Heihei,

                            Vi er en gjeng på 5 personer som vil gjøre noe med deg hvis dere er like kule som oss:DD
                        </Typography>


                    </Box>
                </Grid>
                <Grid item xs={1}>
                    <Box sx={{
                        width: 250,
                        height: 400,
                        mt: 3,
                        ml: 10,
                        backgroundColor: '#dcedc8',
                        border: 6,
                        borderColor: '#9aca7c',

                    }}>
                        <Typography
                            variant="h8"
                            component="h2"
                            sx={{
                                padding: 1,
                                backgroundColor: '#9aca7c',
                                color: '#fafafa',
                            }}
                        >
                            Våre planer
                        </Typography>

                        <Typography
                            variant="h10"
                            component="h10"
                            sx={{
                                padding: 1,
                                paddingTop: 3,
                            }

                            }
                        >
                            Hva:
                            Når:
                        </Typography>


                    </Box>
                </Grid>

            </Grid>
        </Box>
    );
}