import React,{Component} from "react";
import "./index.css";
import axios from "axios";
import { PullToRefresh } from 'antd-mobile';
import ReactDOM from "react-dom";
import 'antd-mobile/dist/antd-mobile.css';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Header from "../Header"
// function genData() {
//     const dataArr = [];
//     for (let i = 0; i < 20; i++) {
//       dataArr.push(i);
//     }
//     return dataArr;
//   }

class Laugh extends Component{

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };

    constructor(props){
        super(props)

        const { cookies } = props;
        this.state = {


            bloglist:[],
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            page:0,
            _T_WM: cookies.get('_T_WM') || '750e670c6818d55d4e61f01d1ff98bc8',
            WEIBOCN_FROM: cookies.get('WEIBOCN_FROM') || '1110003030',
            MLOGIN: cookies.get('MLOGIN') || '0',
            M_WEIBOCN_PARAMS: cookies.get('M_WEIBOCN_PARAMS') || 'luicode%3D10000011%26lfid%3D102803_ctg1_4388_-_ctg1_4388%26fid%3D102803_ctg1_4388_-_ctg1_4388%26uicode%3D10000011'
            // data: []

        }
            

    }

    render(){

        return(

            <div className="all-card">
                <Header></Header>
                <ul className="all-ulcard">
                <PullToRefresh
                damping={60}
                ref={el => this.ptr = el}
                style={{
                    height: this.state.height,
                    overflow: 'auto',
                }}
                indicator={{  activate: "↓下拉刷新", deactivate: "↓下拉刷新"}}
                direction={this.state.down ? 'down' : 'up'}
                refreshing={this.state.refreshing}
                onRefresh={() => {
                this.setState({ 
                    refreshing: true,
                    page:this.state.page + 1 
                });
                const { cookies } = this.props;
                cookies.set('_T_WM', this.state._T_WM, { path: '/' });
                cookies.set('WEIBOCN_FROM', this.state.WEIBOCN_FROM, { path: '/' });
                cookies.set('MLOGIN',this.state.MLOGIN, { path: '/' });
                cookies.set('M_WEIBOCN_PARAMS',this.state.M_WEIBOCN_PARAMS, { path: '/' });

                axios.get(`/api/container/getIndex?containerid=102803_ctg1_4388_-_ctg1_4388&openApp=0&since_id=${this.state.page}`,
            ).then(res=>{

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
                            <li key={item.mblog.id} onClick={this.handleClick.bind(this,item.mblog.id)}>
                            <div>
                                <div className="card-top">
                                    <header>
                                        <div className="right-portrait">
                                            <aside>
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

        axios.get("/api/container/getIndex?containerid=102803_ctg1_4388_-_ctg1_4388&openApp=0").then(res=>{

            // console.log(res.data.data.cards)
            
            this.setState({
                bloglist:res.data.data.cards,
                height:hei
            })
        })
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        // setTimeout(() => this.setState({
        //   height: hei,
        //   data: genData(),
        // }), 0);

    }
    // handleCookieChange(_T_WM,WEIBOCN_FROM,MLOGIN,M_WEIBOCN_PARAMS) {
    //     const { cookies } = this.props;
    
    //     cookies.set('_T_WM', _T_WM, { path: '/' });
    //     cookies.set('WEIBOCN_FROM', WEIBOCN_FROM, { path: '/' });
    //     cookies.set('MLOGIN', MLOGIN, { path: '/' });
    //     cookies.set('M_WEIBOCN_PARAMS', M_WEIBOCN_PARAMS, { path: '/' });
    //     this.setState({ 
    //         _T_WM,
    //         WEIBOCN_FROM,
    //         MLOGIN,
    //         M_WEIBOCN_PARAMS
    //     });
    //   }
    handleClick(item){
		this.props.history.push(`/detail/${item}`);
	}
}

export default withCookies(Laugh);