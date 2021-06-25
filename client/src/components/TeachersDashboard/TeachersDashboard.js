import React, {useEffect} from "react";
import classes1 from './TeachersDashboard.module.css'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LongTextSnackbar from './SnackBar'
import {useDispatch, useSelector} from 'react-redux';
import {getPosts, getTaData} from '../../actions/posts'
import { useHistory } from "react-router-dom";
import NavBar from "../Ui/NavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    paddingLeft: '70px',
    paddingRight: '70px',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(5),
      width: theme.spacing(28),
      height: theme.spacing(28),
    },
  },
}));

const TeachersDashboard = (props) => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(()=>{
        dispatch(getPosts())
    },[dispatch])
    const type = useSelector(state => state.setuser.type);
    const home = useSelector(state => state.setuser.home);
    const taS = useSelector((state)=> state.ta);
    const posts=useSelector(state=>state.posts)
    const average_time=(posts)=>{
        var ans=0;
        for(let i=0;i<posts.length;i++){
            let x=posts[i].postTime
            let y=posts[i].ansTime
            let d1=new Date(x);
            let d2=new Date(y);
            // console.log(d1,d2)
            ans+=Math.abs(d1.getMinutes()-d2.getMinutes())
        }
        return Math.floor(ans/posts.length)

    } 
    const ans=average_time(posts)
    var doubtsAsked = taS.reduce(function(tot, arr) { 
        // return the sum with previous value
        return tot + arr.doubtsAccepted;
    
    },0);

    var doubtsResolved = taS.reduce(function(tot, arr) { 
        // return the sum with previous value
        return tot + arr.doubtsResolved;
    
    },0);

    var doubtsEscalated = taS.reduce(function(tot, arr) { 
        // return the sum with previous value
        return tot + arr.doubtsEscalated;
    
    },0);
    

    useEffect(() => {
        dispatch(getTaData());

    }, [dispatch]);
 
  return (
    <>
        {(type !== "teacher") ? history.push('/') : (
    
        <div>
            <NavBar />
            <Typography gutterBottom variant="h4" style={{color:'white', marginLeft:'100px', marginBottom:'10px', marginTop:'40px'}}>
                Dashboard
            </Typography>
            
            <div className={classes.root}>
                
                <Paper elevation={3} >
                    <div className={classes1.card2}>
                        <div className={classes1.card3}>
                            <div className={classes1.first}>{posts.length}</div>
                            <div className={classes1.second}>Doubts Asked</div>
                        </div>
                    </div>
                </Paper>
                <Paper elevation={3} >
                    <div className={classes1.card2}>
                        <div className={classes1.card3}>
                            <div className={classes1.first}>{doubtsResolved}</div>
                            <div className={classes1.second}>Doubts Resolved</div>
                        </div>
                    </div>
                </Paper>
                <Paper elevation={3} >
                    <div className={classes1.card2}>
                        <div className={classes1.card3}>
                            <div className={classes1.first}>{doubtsEscalated}</div>
                            <div className={classes1.second}>Doubts Escalated</div>
                        </div>
                    </div>
                </Paper>
                <Paper elevation={3} >
                    <div className={classes1.card2}>
                        <div className={classes1.card3}>
                            <div className={classes1.first}>{ans}</div>
                            <div className={classes1.second}>Avg. Doubt Resolution Time(Minutes)</div>
                        </div>
                    </div>
                </Paper>
                
            </div>

            <div className={classes1.container}>
                <div className={classes1.content}>
                    <div className={classes1.dashboard}>
                        
                        <LongTextSnackbar/>
                        
                    </div>
                </div>
            </div>
        </div>
        
        )}
    </>

  );
}

export default TeachersDashboard;



