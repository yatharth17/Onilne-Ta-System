import React, {useEffect} from "react"
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import StandardCard from "./standardCard"
import FormDialog from "./doubt"
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from '../../actions/posts'
import NavBar from "../Ui/NavBar";
 

const useStyles = makeStyles((theme)=>({
    grid:{
        width:'100%',
        margin:'0px',
        marginTop:'70px',
    }
}));


const Form = ({ currentId, setCurrentId }) => {
    
    const posts = useSelector((state)=> state.posts);
    const type = useSelector(state => state.setuser.type);
    const name = useSelector(state => state.setuser.name);
    const email = useSelector(state => state.setuser.email);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0,0)
        dispatch(getPosts());
    }, [ dispatch ]);
    

    const classes = useStyles();
    return (
        <>
            {(type !== "student") ? history.push('/') : (

            <Container>
                
                <NavBar />    
                                        
                <FormDialog studentName={name} studentEmail={email} />
                <Grid container spacing={2} className={classes.grid} >
                    {
                        posts.map(post=>(
                             (
                                <Grid item xs={12} md={12}> 
                                    <StandardCard post={post} currentId={currentId} setCurrentId={setCurrentId} />
                                </Grid>
                             )
                        ))
                    }  
                </Grid>
            </Container> 
            )}  
        </>
    );

}


export default Form;