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
              />
              
            )}
          />

          <Route exact
            path="/TA"
            render={(props) => (
              <TA {...props} 
                currentAcceptDoubtId={currentAcceptDoubtId} 
                setCurrentAcceptDoubtId={setCurrentAcceptDoubtId}
                taId={taId}
                setTaId={setTaId}
              />
            )}
          />

          <Route exact
            path="/TA/SolveDoubt"
            render={(props) => (
            <SolveDoubt {...props} 
              currentAcceptDoubtId={currentAcceptDoubtId}
              taId={taId}
            />
          )}
          />

          <Route exact
            path="/TeachersDashboard"
            render={(props) => (
            <TeachersDashboard {...props} />
          )}
          />

          <Route exact
            path="/"
            render={(props) => (
            <Home {...props} type='L' />
          )}
          />

          <Route exact
            path= "/login">
              <Redirect to='/'></Redirect>
          </Route>

          <Route exact
            path="/register"
            render={(props) => (
            <Home {...props} type='R' />
          )}
          />
      </Switch>  
    </Router>
  );
}

export default App;
