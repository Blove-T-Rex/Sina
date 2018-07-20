import React,{Component} from "react";
import "./index.css";
import axios from "axios";
import { PullToRefresh } from 'antd-mobile';
import ReactDOM from "react-dom";
import 'antd-mobile/dist/antd-mobile.css';


class Hot extends Component{

    constructor(){
        super()

        this.state = {

            bloglist:[],
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            page:1
            // data: []

        }
            

    }

    render(){

        return(

            <div className="all-card">
                <ul className="all-ulcard">
                <PullToRefresh
                distanceToRefresh={40}
                damping={60}
                ref={el => this.ptr = el}
                style={{
                    height: this.state.height,
                    overflow: 'auto',
                }}
                indicator={{  activate: "↑释放更新", deactivate: "↓下拉刷新", release: "加载中...", finish: "加载中..." }}
                direction={this.state.down ? 'down' : 'up'}
                refreshing={this.state.refreshing}
                onRefresh={() => {
                this.setState({ 
                    refreshing: true,
                    page:this.state.page + 1
                });
                axios.get(`/api/container/getIndex?containerid=102803&openApp=0&page=${this.state.page}`).then(res=>{

                    // console.log(res.data.data.cards)
                    
                    this.setState({
                        bloglist:[...res.data.data.cards,...this.state.bloglist],
                        refreshing: false
                    })
                })
                }}>
                    {
                        this.state.bloglist.length?
                        
                        this.state.bloglist.map(item=>
                            
                            item.card_type === 9?
                            <li key={item.mblog.id}>
                            <div>
                                <div className="card-top">
                                    <header>
                                        <div className="right-portrait">
                                            <aside href="#">
                                            <img src={item.mblog.user.avatar_hd} alt={item.mblog.user.screen_name}/>
                                            </aside>
                                        </div>
                                        <div className="center-infro">
                                            <div className="box">
                                                    <h3>{item.mblog.user.screen_name}</h3>
                                                <h4>
                                                    <span className="time">
                                                        {item.mblog.created_at}
                                                    </span>
                                                    {
                                                      item.mblog.source?
                                                    <span>
                                                        来自 {item.mblog.source}
                                                    </span>
                                                    :null  
                                                    }
                                                    
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="left-follow">
                                            <span>
                                                + 关注
                                            </span>
                                        </div>
                                    </header>
                                </div>
                                <div className="weibo-main">
                                    <div className="weibo-og">
                                            <div className="weibo-text" dangerouslySetInnerHTML={{__html:`${item.mblog.text}`}}></div>
                                            <div className="weibo-media">
                                                <ul>
                                                    {
                                                       item.mblog.pics?
                                                       item.mblog.pics.map(result=>
                                                        <li key={result.pid}>

                                                            <img src={result.large.url} alt={result.pid}/>
            
                                                        </li>
                                                        
                                                    ) 
                                                    :item.mblog.page_info?
                                                    <li className="vedio">
                                                        <img src={item.mblog.page_info.page_pic.url} alt={item.mblog.page_info.page_title}/>
                                                        <button>
                                                            <i className="iconfont icon-bofang"></i>
                                                        </button>
                                                    </li>
                                                    :null                                                 
                                                    }
                                                    
                                                </ul>
                                            </div>
                                    </div>
                                </div>
                                <footer>
                                    <div className="footer-content">
                                        <i className="iconfont icon-Fzhuanfa-"></i>
                                        <h4>
                                            {
                                                item.mblog.reposts_count > 9999?
                                                (item.mblog.reposts_count/10000).toFixed(1) + "万"
                                                :item.mblog.reposts_count                                             
                                            }
                                        </h4>
                                    </div>
                                    <div className="footer-content">
                                        <i className="iconfont icon-pinglun"></i>
                                        <h4>   
                                            {
                                                item.mblog.comments_count > 9999?
                                                (item.mblog.comments_count/10000).toFixed(1) + "万"
                                                :item.mblog.comments_count                                            
                                            }
                                        </h4>
                                    </div>
                                    <div className="footer-content">
                                        <i className="iconfont icon-dianzan"></i>
                                        <h4>
                                            {
                                                item.mblog.attitudes_count > 9999?
                                                (item.mblog.attitudes_count/10000).toFixed(1) + "万"
                                                :item.mblog.attitudes_count                                             
                                            }
                                        </h4>
                                    </div>
                                    <aside>
                                        <i className="iconfont icon-shenglve"></i>
                                    </aside>
                                </footer>
                            </div>
                        </li>
                        :null
                        

                        )
                        :null
                    }
                </PullToRefresh>
                </ul>
            </div>

        )

    }
    componentDidMount(){

        axios.get("/api/container/getIndex?containerid=102803&openApp=0").then(res=>{

            // console.log(res.data.data.cards)
            
            this.setState({
                bloglist:res.data.data.cards,
                height: hei
            })
        })
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        // setTimeout(() => this.setState({
        //   height: hei,
        //   data: genData(),
        // }), 0);

    }

}

export default Hot