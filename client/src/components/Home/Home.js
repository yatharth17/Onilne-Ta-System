import React from 'react'
import FullWidthTabs from './TabPanel'
import Register from './Register'
// import { useHistory } from 'react-router-dom'

export default function Home({
     setStudentName, setStudentEmail,
     setTaName, setTaEmail, type, home, setHome, 
     setTeacherName, setTeacherEmail }) {
    
    // const history = useHistory;
    return (
        <div>
            {/* {console.log(home)} */}
            {
                // home !== '/'?
                // null://history.push(home):
                type === 'login'?
                    <FullWidthTabs 
                    setStudentName={setStudentName}
                    setStudentEmail={setStudentEmail}
                    setTaName={setTaName}
                    setTaEmail={setTaEmail}
                    setHome={setHome}
                    setTeacherName={setTeacherName}
                    setTeacherEmail={setTeacherEmail}
                    />:
                    <Register 
                    setHome={setHome}
                    />
            }
        </div>
    )
}
