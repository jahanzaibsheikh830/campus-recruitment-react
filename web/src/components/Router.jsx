import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Login from './login-signup/Login'
import Signup from './login-signup/Signup'
import StudentDashboard from './stdashboard/StudentDashboard'
import CompanyDashboard from './codashboard/CompanyDashboard'
import Jobs from './stdashboard/Jobs'
import Navbar from './Navbar'
import { useGlobalState } from '../context/globalState'
function RoutesConfig() {
    let state = useGlobalState()
    return (
        <div>
            <Router>
                {state.role === null ?
                    <div>
                        <Switch>
                            <Route exact path="/" component={Signup} />
                            <Route path="/login" component={Login} />
                            <Route path="*" component={Signup} />
                        </Switch>
                    </div> : null}

                {state.role === "student" ?
                    <>
                        <Navbar />
                        <Switch>
                            <Route exact path="/" component={StudentDashboard} />
                            <Route path="/jobs" component={Jobs} />
                            <Route path="*" component={StudentDashboard} />
                        </Switch>
                    </> : null
                }
                {state.role === "company" ?
                    <>
                        <Navbar />
                        <Switch>
                            <Route exact path="/" component={CompanyDashboard} />
                            <Route path="*" component={CompanyDashboard} />
                        </Switch>
                    </> : null
                }
            </Router>
        </div>
    );
}
export default RoutesConfig