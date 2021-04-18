import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Layout: React.FC = ({children}) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Desenvolvedores
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box m={2} color="text.primary">
          {children}
        </Box>
      </Container>
        
    </>
  );
};

export default Layout;