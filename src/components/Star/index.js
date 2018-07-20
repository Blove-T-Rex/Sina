import React,{Component} from "react";
import "./index.css";
import axios from "axios";
import { PullToRefresh, Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css'; 

class Love extends Component{

	constructor(props){
		super(props);
		this.state = {
			datalist:[],
			 refreshing: false,
		     down: true,
		     height: document.documentElement.clientHeight,
		     data: [],
		     page:1
		};
	}


	render(){
		return(
			<div id="star">
				<ul>
					
					<PullToRefresh
					        damping={60}
					        ref={el => this.ptr = el}
					        style={{
					          height: this.state.height,
					          overflow: 'auto',         
					        }}
					        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
					        direction={this.state.down ? 'down' : 'up'}
					        refreshing={this.state.refreshing}
					        onRefresh={() => {
					          this.setState({ 
					          	refreshing: true,
					          	page:this.state.page + 1 
					          });
					          axios.get(`/api/container/getIndex?containerid=102803_ctg1_4288_-_ctg1_4288&openApp=0&since_id=${this.state.page}`).then(res=>{
					          	console.log(res.data.data.cards)
					          	this.setState({
					          		datalist:[...res.data.data.cards,...this.state.datalist],
					          		refreshing:false
					          	})

					          })
					        }}
					 >
					{
						this.state.datalist.map(item=>
							<li key={item.mblog.id} onClick={this.handleClick.bind(this,item.mblog.id)}>
								<div className="card-weibo">
									<div className="card-wrap">
										<header>
											<div className="left">
												<img src={item.mblog.user.avatar_hd}/>
											</div>
											<div className="center">
												<div className="text">
													<h3>
														{item.mblog.user.screen_name}
													</h3>
													<h4>
														<span className="time">{item.mblog.created_at}</span>
														{
															item.mblog.source?<span className="from"> 来自 {item.mblog.source}</span>
															:null
														}
													</h4>
												</div>
											</div>
											<div className="followBtn">
												<span className="add-box">
													<i className="iconfont icon-plus"></i>
													<h4>关注</h4>
												</span>
											</div>
										</header>

										<article>
											<div className="card-foot">
												<div className="content">
													<div className="weibo-text" dangerouslySetInnerHTML={{ __html:`${item.mblog.text}`}}></div>
												</div>

												<div className="media">
													<ul className="auto-list">
													{
														item.mblog.pics&&item.mblog.pics.map(pic=>
															<li key={pic.url}>
																<img src={pic.url}/>
															</li>
														)
													}
													</ul>
												</div>
											</div>
										</article>

										<footer>
											<div className="icon">
												<i className="iconfont icon--zhuanfa"></i>
												<h4>{item.mblog.reposts_count}</h4>
											</div>
											<div className="icon">
												<i className="iconfont icon-home_ic_comments"></i>
												<h4>{item.mblog.comments_count}</h4>
											</div>
											<div className="icon">
												<i className="iconfont icon-iconfontlike"></i>
												<h4>{item.mblog.attitudes_count}</h4>
											</div>
											<aside>
												<i className="iconfont icon-more"></i>
											</aside>
										</footer>
									</div>
								</div>
							</li>
						)
					}
					</PullToRefresh>
				</ul>
			</div>
		)
	}

	componentDidMount(){
		axios.get("/api/container/getIndex?containerid=102803_ctg1_4288_-_ctg1_4288&openApp=0").then(res=>{
			this.setState({
				datalist:res.data.data.cards
			})
		})
	
	}

	handleClick(item){
		this.props.history.push(`/detail/${item}`);
	}
	
}

export default Love