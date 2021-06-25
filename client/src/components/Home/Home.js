import React from 'react'
import { useSelector } from 'react-redux'
import Login from './Login'
import Register from './Register'
import { useHistory } from 'react-router-dom'

export default function Home({ type }) {
    
    const history = useHistory();
    const user_type=useSelector(state=>state.setuser.type)
    console.log(user_type)
    if(user_type==="student") history.push('/student')
    if(user_type==="ta") history.push('/TA')
    if(user_type==="teacher") history.push('/TeachersDashboard')
    
    return (
        <div>
            {
                // home !== '/'?
                // null://history.push(home):
                type === 'L'?
                    <Login />:
                    <Register />
            }
        </div>
    )
}
