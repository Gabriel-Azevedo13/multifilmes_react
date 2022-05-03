import { Grid, Typography } from '@mui/material';
import React, { FC } from 'react';

interface IHeaderProps {
  isEdit: boolean;
}

const Header: FC<IHeaderProps> = ({ isEdit }) => {
  return (
    <>
      <Grid mt={5} px={2} container direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          {isEdit ? 'Edição filme/série' : 'Criação filme/série'}
        </Typography>
      </Grid>
    </>
  );
};

export default Header;
