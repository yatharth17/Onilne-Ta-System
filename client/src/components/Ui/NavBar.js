import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  temp:{
      color:"black",
      backgroundColor:"white"
  }
}));

export default function NavBar(props) {
  const classes = useStyles();
  const { setUserEmail, setHome } = props;

  const handleChange = () => {
    setUserEmail('');
    setHome('/');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.temp}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Coding Ninjas
          </Typography>
          <Button onClick={handleChange} startIcon={<ExitToAppIcon />} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}