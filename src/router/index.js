import React from "react"
import {HashRouter as Router,Route,Redirect,Switch} from "react-router-dom"
import App from "../App";
import Love from "../components/Love";
import Detail from "../components/Detail";
import Report from "../components/Detail/Report";
import Comment from "../components/Detail/Comment";
import Attitude from "../components/Detail/Attitude";
import Star from "../components/Star";

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
                <Route path="/love" component={Love}/>
                <Route path="/star" component={Star}/>
                <Route path="/detail/:myid" render={(res)=>                   
                    <Detail reportId={res}>
                        <Switch>
                        <Route path="/detail/:myid/report" component={Report}/>
                        <Route path="/detail/:myid/comment" component={Comment}/>
                        <Route path="/detail/:myid/attitude" component={Attitude}/>
                        <Redirect from="/detail/:myid" to="/detail/:myid/report"/>
                        </Switch>
                    </Detail>
                }/>
            </Switch>
        </App>
    </Router>

)




export default router