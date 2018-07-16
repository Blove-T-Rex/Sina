import React from "react"
import {HashRouter as Router,Route,Redirect,Switch} from "react-router-dom"
import App from "../App"

const router = (

    <Router>
        <App>
            <Switch>
                {/* <Route path="/hot" component={Hot}/>
                <Route path="/laugh" component={Laugh}/>
                <Route path="/love" component={Love}/>
                <Route path="/star" component={Star}/>
                <Route path="/social" component={Social}/>
                <Route path="/digital" component={Digital}/>
                <Redirect from="*" to="/hot" /> */}
            </Switch>
        </App>
    </Router>

)




export default router