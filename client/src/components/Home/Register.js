import React,{useState} from 'react';
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

export default function Register(props) {

  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("")
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  const classes = useStyles();
  const history = useHistory();


  const _handleSubmit=(e)=>{
    
    console.log(e);

    e.preventDefault();
    Register();

    function Register() {
        axios.post("https://test-back-auth.herokuapp.com/register",{
            name: name,
            email: email,
            password: password,
            type: type
        })
        .then(res => {
            console.log(res);  
            alert(`Registration Successful ! \nPlease Login.`);
            history.push('/');
        })
        .catch(err => {
            console.log("Error: ", err);
            alert(`Could not register the given user !`);
            e.target.reset();
        });
    }
  }
  
  const paperStyles = {padding: 20, height: "550px", width: "400px", margin:"10vh auto"};
  const buttonStyle = {margin: "40px 0px 0px 0px", background: 'linear-gradient(to right, #A83279, #D38312)', color: "white", '&:hover': {backgroundColor: "#A93379"}};
  const fieldStyle = {margin: "10px 0px 5px 0px"};

  return (
    <div> 
      <Grid container>
        <Paper elevation={10} style={paperStyles}>
          <Grid align='center'>
            <Avatar alt="CN" src={CN} className={classes.large} />
            <Typography gutterBottom variant="h4" style={{fontWeight:'500', color:'grey', paddingTop:'20px', paddingBottom:'10px'}}>
              Registration 
            </Typography>
            
            <form style={{width: "93%"}} onSubmit={e => _handleSubmit(e)}>
          
              <TextField fullWidth style={fieldStyle} value={name} onChange={e=>setName(e.target.value)} variant='outlined' label='Name' size='medium' required></TextField>
              <TextField fullWidth style={fieldStyle} type="email" value={email} onChange={e=>setEmail(e.target.value)} variant='outlined' label='Email' size='medium' required></TextField>
              <TextField fullWidth style={fieldStyle} type="password" inputProps={{minlength:8}} value={password} onChange={e=>setPassWord(e.target.value)} variant='outlined' label='Password' size='medium' required></TextField>

              <FormControl style={{width: "100%", marginTop: '10px'}}>
                <InputLabel id='select-type' style={{ marginLeft: '10px'}}>Select the User Type</InputLabel>

                <Select fullWidth variant="standard" value={type} onChange={e=>setType(e.target.value)} labelId= 'select-type' required>
                  <MenuItem value="" />
                  <MenuItem value='student'>Student</MenuItem>
                  <MenuItem value='ta'>Teaching Assistant</MenuItem>
                  <MenuItem value='teacher'>Teacher</MenuItem>
                </Select>
              </FormControl>

              <FormControl style={{width: "100%"}}>
                <Button size='large' type='submit' fullWidth variant="contained" style={buttonStyle}>Register</Button>
                <FormHelperText style={{marginTop: "10px", marginRight: "5px", alignSelf: 'flex-end'}}>
                  Already Registered? 
                  <Link to='/' style={{marginLeft: "5px", color: "#D07D19"}}>
                    Sign In!
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
