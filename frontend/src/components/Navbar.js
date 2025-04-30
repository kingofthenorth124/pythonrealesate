import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <HomeIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Real Estate
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Properties
          </Button>
          <Button color="inherit" component={Link} to="/add-property">
            Add Property
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 