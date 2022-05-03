import { Button, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Plus } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const Header: FC = () => {
  const navigate = useNavigate();

  return (
      <Grid mt={5} px={2} container direction="row" justifyContent="space-around" alignItems="center">
        <Grid container justifyContent="center" alignItems="center" xs={7}>
          <Typography variant="h4" style={{ fontWeight: 'bold' }}>
            MultiFilmes - Lista
          </Typography>
        </Grid>
        <Grid container direction="row" justifyContent="center" alignItems="center" xs={5}>
          <Button onClick={() => navigate('movies/add')} variant="outlined" endIcon={<Plus />} color='secondary'>
            Add Item
          </Button>
        </Grid>
      </Grid>
  );
};

export default Header;
