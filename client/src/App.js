import React, {useState} from "react"
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Form from './components/Student/form'
import TA from './components/TA/TA'
import SolveDoubt from './components/TA/SolveDoubt'
import TeachersDashboard from './components/TeachersDashboard/TeachersDashboard'
import Home from './components/Home/Home'

const App = () => {

const [currentId, setCurrentId] = useState(null);
const [currentAcceptDoubtId, setCurrentAcceptDoubtId] = useState(null);
const [home, setHome] = useState('/');

const [studentName, setStudentName] = useState("");
const [studentEmail, setStudentEmail] = useState("");
const [TaName, setTaName] = useState("");
const [TaEmail, setTaEmail] = useState("");
const [TeacherName, setTeacherName] = useState("");
const [TeacherEmail, setTeacherEmail] = useState("");


const [taId, setTaId] = useState(null)
 
  return (

    <Router>
                
                    <Switch>
                        <Route exact 
                        path="/student" 
                        render={(props) => (
                          <Form {...props} 
                          currentId={currentId} 
                          setCurrentId={setCurrentId} 
                          studentName={studentName}
                          studentEmail={studentEmail}
                          setStudentEmail={setStudentEmail}
                          setHome={setHome}
                          />
                          
                        )}
                        />

                        <Route exact
                         path="/TA"
                         render={(props) => (
                          <TA {...props} 
                          currentAcceptDoubtId={currentAcceptDoubtId} 
                          setCurrentAcceptDoubtId={setCurrentAcceptDoubtId}
                          TaName={TaName}
                          setTaName={setTaName}
                          TaEmail={TaEmail}
                          setTaEmail={setTaEmail}
                          taId={taId}
                          setTaId={setTaId}
                          setHome={setHome}
                          />
                        )}
                        />

                        <Route exact
                         path="/TA/SolveDoubt"
                         render={(props) => (
                          <SolveDoubt {...props} 
                          currentAcceptDoubtId={currentAcceptDoubtId}
                          TaEmail={TaEmail}
                          setTaEmail={setTaEmail}
                          TaName={TaName}
                          taId={taId}
                          setTaId={setTaId}
                          setHome={setHome}
                          />
                        )}
                        />

                        <Route exact
                         path="/TeachersDashboard"
                         render={(props) => (
                          <TeachersDashboard {...props} 
                          TeacherEmail={TeacherEmail}
                          TeacherName={TeacherName}
                          setTeacherEmail={setTeacherEmail}
                          setTeacherName={setTeacherName}
                          home={home}
                          setHome={setHome}
                          />
                        )}
                        />

                        <Route exact
                         path="/"
                         render={(props) => (
                          <Home {...props}
                          setStudentName={setStudentName}
                          setStudentEmail={setStudentEmail}
                          setTaName={setTaName}
                          setTaEmail={setTaEmail}
                          home={home}
                          setHome={setHome}
                          setTeacherName={setTeacherName}
                          setTeacherEmail={setTeacherEmail}
                          type='login'
                          />
                        )}
                        />

                        <Route exact
                          path= "/login">
                            <Redirect to='/'></Redirect>
                        </Route>

                        <Route exact
                         path="/register"
                         render={(props) => (
                          <Home {...props}
                          setStudentName={setStudentName}
                          setStudentEmail={setStudentEmail}
                          setTaName={setTaName}
                          setTaEmail={setTaEmail}
                          home={home}
                          setHome={setHome}
                          setTeacherName={setTeacherName}
                          setTeacherEmail={setTeacherEmail}
                          type='register'
                          />
                        )}
                        />
                    </Switch>
                
    </Router>



    
  );
}

export default App;
