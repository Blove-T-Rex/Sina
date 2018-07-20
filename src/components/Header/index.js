import React,{Component} from "react";
import "./index.css";
import {NavLink} from "react-router-dom";
import axios from "axios";

class Header extends Component{

    constructor(){
        super()

        this.state = {

            menulist:[
                {
                    path:"/hot",
                    name:"热门"

                },
                {
                    path:"/laugh",
                    name:"搞笑"

                },
                {
                    path:"/love",
                    name:"情感"

                },
                {
                    path:"/star",
                    name:"明星"

                },
                {
                    path:"/social",
                    name:"社会"

                },
                {
                    path:"/digital",
                    name:"数码"

                },
            ],

            isshow:false,

            hotWord:null

        }

    }


    render(){

        return(

            <div className="header">

                <header>

                    <div className="top">
                        <div className="top-top">
                            <div className="left l">
                                <div className="logo"></div>
                            </div>
                            <div className="center l">
                                <i className="iconfont icon-sousuo"></i>
                                {
                                    this.state.hotWord?
                                    <input type="text" placeholder={`大家都在搜：${this.state.hotWord}`} />
                                    :null
                                }
                                

                            </div>
                            <div className="right r">
                                <i className="iconfont icon-qianbipencil84"></i>
                            </div>
                        </div>
                        <div className="top-bottom">
                           <ul className="menu">
                            {
                               this.state.menulist.map(item=>
                                
                                    <li key={item.path}>
                                        <NavLink to={item.path} key={item.path} activeClassName="active">
                                            {item.name}
                                                <em></em>
                                        </NavLink>
                                        
                                    </li>
                               )
                            }  
                           </ul>
                            <div className={this.state.isshow?"more show":"more"} onClick={()=>{
                                this.setState({
                                    isshow:!this.state.isshow
                                })
                            }}>
                                <i className="iconfont icon-jiantouarrow483"></i>
                            </div>
                        </div>

                    </div>
                    

                </header>

            </div>

        )

    }

    componentDidMount(){

        axios.get("/api/config/list").then(res=>{

            this.setState({

                hotWord:res.data.data.hot.hotWord

            })

        })
    }


}






export default Header