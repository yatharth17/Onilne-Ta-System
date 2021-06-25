import React, {useEffect} from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import StandardCard from "./standardCard"
import Typography from '@material-ui/core/Typography';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts, getTaData, createTaData} from '../../actions/posts'
import NavBar from '../Ui/NavBar'

const useStyles = makeStyles((theme)=>({
    grid:{
        width:'100%',
        margin:'0px',
        marginTop:'70px',
    }
}));

const TA = ({currentAcceptDoubtId, setCurrentAcceptDoubtId,
      taId, setTaId }) => {
    
    ;
    const posts = useSelector((state)=> state.posts);
    const type = useSelector(state => state.setuser.type);
    const email = useSelector(state => state.setuser.email);
    const name = useSelector(state => state.setuser.name);

    console.log(email)
    const dispatch = useDispatch();
    const history = useHistory();  

    async function auth(email, name) {
        const { data } = await axios.patch(`https://test-back-auth.herokuapp.com/posts/${email}/checkEmail`);
        if(data === null) 
            dispatch(createTaData({ email: email, name: name }));
        else 
            setTaId(data._id);
    }
    
    if(type === "ta")
        auth(email, name);     
    
    useEffect(() => {
        dispatch(getPosts());
        dispatch(getTaData());

    }, [dispatch]);
    
    const classes = useStyles();
    
    return (
        <>
            {(type !== "ta") ? history.push('/') : (

                <Container>
                    <NavBar  />
                    <Grid container spacing={2} className={classes.grid} >
                        <Typography gutterBottom variant="h4" style={{color:'white', marginLeft:'90px', marginBottom:'40px'}}>
                            Solve Doubts 
                        </Typography>
                        {
                            posts.map(post=>(
                                ( post.answer === "" ) ?
                                (<Grid item xs={12} md={12}> 
                                    <StandardCard 
                                        post={post} 
                                        currentAcceptDoubtId={currentAcceptDoubtId} 
                                        setCurrentAcceptDoubtId={setCurrentAcceptDoubtId}
                                        taId={taId}
                                    />
                                </Grid>) : (null)
                            ))
                        }  
                    </Grid>
                </Container>
            )}              
        </>
    );
}

export default TA;