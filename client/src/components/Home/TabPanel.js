import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GoogleLogin from 'react-google-login';
import {Link} from "react-router-dom"
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { Grid, Avatar, Paper } from '@material-ui/core';
import CN from './download.jpg'


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1000,
    display:'block',
     marginLeft:'auto', 
     marginRight:'auto',
     marginTop:'50px',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: 'orange',
    marginTop: '10px',
  },
}));

export default function FullWidthTabs(props) {
  
  const { studentName, setStudentName, studentEmail, setStudentEmail, aName, setTaName, TaEmail, setTaEmail } = props;
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const responseGoogleStudent = response =>{
    setStudentName(response.profileObj.name);
    setStudentEmail(response.profileObj.email);
    history.push('/student')
  };

  const responseGoogleTa = response =>{
    setTaName(response.profileObj.name);
    setTaEmail(response.profileObj.email);
    history.push('/TA')
  };

  const paperStyles = {padding: 20, height: "390px", width: "400px", margin:"20vh auto"};
  const buttonStyle = {width: "70%",margin: "25px 0px 0px 0px", background: 'linear-gradient(to right, #A83279, #D38312)', color: "white", '&:hover': {backgroundColor: "#A93379"}};

  return (
    <div> 
      <Grid>
        <Paper elevation={10} style={paperStyles}>
          <Grid align='center'>
            <Avatar alt="CN" src={CN} className={classes.large} />
            <Typography gutterBottom variant="h4" style={{fontWeight:'500', color:'gray', paddingTop:'20px', paddingBottom:'20px'}}>
              Sign In
            </Typography>
            
            <GoogleLogin
              clientId="21474011308-mpfnvvv6fkl14cn6ok5vchgad888obsn.apps.googleusercontent.com"
              render={renderProps => (
                <Button size='large' variant="contained" style={buttonStyle} onClick={renderProps.onClick}>Login as Student</Button>
              )}
              buttonText="Login"
              onSuccess={responseGoogleStudent}
              onFailure={responseGoogleStudent}
              redirect_uri="http://localhost:3000/student"
              cookiePolicy={'single_host_origin'}
            />
            
            <GoogleLogin
              clientId="21474011308-mpfnvvv6fkl14cn6ok5vchgad888obsn.apps.googleusercontent.com"
              render={renderProps => (
                <Button size='large' variant="contained" style={buttonStyle} onClick={renderProps.onClick}>Login as TA</Button>
              )}
              buttonText="Login"
              onSuccess={responseGoogleTa}
              onFailure={responseGoogleTa}
              cookiePolicy={'single_host_origin'}
            />

            <Link to='/TeachersDashboard' style={{ textDecoration: 'none'}}>
              <Button size='large' variant="contained" style={buttonStyle}>Login as Teacher</Button>
            </Link>
          </Grid>
        </Paper>
      </Grid>

    </div>
  );
}
