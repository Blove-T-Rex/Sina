import React from "react"
import {HashRouter as Router,Route,Redirect,Switch} from "react-router-dom"
import App from "../App"

import Hot from "../components/Hot"
import Laugh from "../components/Laugh"
import { CookiesProvider } from 'react-cookie';

import Love from "../components/Love";
import Detail from "../components/Detail";
import Report from "../components/Detail/Report";
import Comment from "../components/Detail/Comment";
import Attitude from "../components/Detail/Attitude";
import Star from "../components/Star";

import Social from '../components/Social'
import Digital from '../components/Digital'
import Home from '../components/Home'
import Factor from '../components/Factor'
import Ward from '../components/Ward'
import Praise from '../components/Praise'
import CommentYC from '../components/CommentYC'

const router = (

    <CookiesProvider>
    <Router>
        <App>
            <Switch>
                <Route path="/hot" component={Hot}/>
                <Route path="/laugh" component={Laugh}/>
                <Route path="/love" component={Love}/>
                <Route path="/star" component={Star}/>
                {/*  <Route path="/social" component={Social}/>
                <Route path="/digital" component={Digital}/>*/}
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

                <Route path="/social" component={Social}/>
                <Route path="/digital" component={Digital}/>
                <Route path="/home/:myid" component={Home}/>
                
                <Route path="/factor/:myid" render={(props)=>
                    <Factor shor={props}>
                    <Switch>
                    <Route path="/factor/:myid/ward" component={Ward}/>
                    <Route path="/factor/:myid/praise" component={Praise}/>
                    <Route path="/factor/:myid/comment" component={CommentYC}/>
                    <Redirect from="/factor/:myid" to="/factor/:myid/ward"/>
                    </Switch>
                    </Factor>
                }/>

                <Redirect from="*" to="/hot" /> 
            </Switch>
        </App>
    </Router>
    </CookiesProvider>

)




export default router