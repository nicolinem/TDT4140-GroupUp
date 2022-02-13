import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image from './DSC06122-kopi.jpg';

export const GroupCard = () => {

  return (
    <Card sx={{ minWidth: 600 }}>
        <CardMedia 
            component="img"
            height="250"
           src={image}
            alt="green iguana"
        />
        <CardContent>
            <Typography>
                Groupname
            </Typography>
        </CardContent>
    </Card>

      );

}