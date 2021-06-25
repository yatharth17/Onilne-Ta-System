import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {setUser} from '../../actions/user'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import GoogleLogin from 'react-google-login';
import {Link} from "react-router-dom"
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { Grid, Avatar, Paper, TextField, InputLabel, Select, MenuItem, FormControl, FormHelperText } from '@material-ui/core';
import CN from './download.jpg'
import axios from 'axios'

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

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("")
  const [type, setType] = useState("");

  const classes = useStyles();
  const history = useHistory();
  
  const dispatch = useDispatch();

  const _handleSubmit=(e)=>{
    
    e.preventDefault();
    Login();

    function Login() {
      axios.post("https://test-back-auth.herokuapp.com/login",{
        email: email,
        password: password,
        type: type
      })
        .then(res => {
          
          const dispatchState = (data, home, type) => {
              dispatch(setUser({
                name: data.name,
                email: data.email,
                type: type,
                home: home,
            }))
          }
          
          if (type === 'ta') {
            dispatchState(res.data, '/TA', type);
            history.push('/TA');
          }

          else if (type === 'student') {
            dispatchState(res.data, '/student', type);
            history.push('/student');
          }
          
          else {
            dispatchState(res.data, '/TeachersDashboard', type);
            history.push('/TeachersDashboard');
          }

        })
        .catch(err => {
          console.log("Error: ", err);
          alert(`Given account does not exist !`)
        });
    }
  }
  
  const paperStyles = {padding: 20, height: "500px", width: "400px", margin:"10vh auto"};
  const buttonStyle = {margin: "40px 0px 0px 0px", background: 'linear-gradient(to right, #A83279, #D38312)', color: "white", '&:hover': {backgroundColor: "#A93379"}};
  const fieldStyle = {margin: "10px 0px 0px 0px"};

  return (
    <div> 
      <Grid container>
        <Paper elevation={10} style={paperStyles}>
          <Grid align='center'>
            <Avatar alt="CN" src={CN} className={classes.large} />
            <Typography gutterBottom variant="h5" style={{fontWeight:'600', color:'grey', paddingTop:'20px', paddingBottom:'40px'}}>
              Doubts Resolution System
            </Typography>
            
            <form style={{width: "93%"}} onSubmit={e => _handleSubmit(e)}>
          
              <TextField fullWidth style={fieldStyle} type="email" value={email} onChange={e=>setEmail(e.target.value)} variant='outlined' label='Email' size='medium' required></TextField>
              <TextField fullWidth style={fieldStyle} type="password" inputProps={{minlength:8}} value={password} onChange={e=>setPassWord(e.target.value)} variant='outlined' label='Password' size='medium' required></TextField>

              <FormControl style={{width: "100%", marginTop: "20px"}}>
                <InputLabel id='select-type' style={{ marginLeft: '10px'}}>Select the User Type</InputLabel>

                <Select fullWidth variant="standard" value={type} onChange={e=>setType(e.target.value)} labelId= 'select-type' required>
                  <MenuItem value="" />
                  <MenuItem value='student'>Student</MenuItem>
                  <MenuItem value='ta'>Teaching Assistant</MenuItem>
                  <MenuItem value='teacher'>Teacher</MenuItem>
                </Select>
              </FormControl>

              <FormControl style={{width: "100%"}}>
                <Button size='large' type='submit' fullWidth variant="contained" style={buttonStyle}>Login</Button>
                <FormHelperText style={{marginTop: "10px", marginRight: "5px", alignSelf: 'flex-end'}}>
                  Not Registered? 
                  <Link to='/register' style={{marginLeft: "5px", color: "#D07D19"}}>
                    Sign Up!
                  </Link>
                </FormHelperText>
              </FormControl>
            
            </form>
          </Grid>
        </Paper>
      </Grid>

    </div>
  );
}
