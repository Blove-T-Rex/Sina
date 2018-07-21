import React,{Component} from "react";
import "./index.css";
import axios from "axios";
import {NavLink} from "react-router-dom"
class Detail extends Component{
	constructor(){
		super();
		this.state = {
			detaillist:null,
			sum:1
		};
	}
	render(){
		return(
			<div>
				<div className="page-top">
					<a className="nav-left" href={`javascript:history.go(-${this.state.sum})`}><i className="iconfont icon-arrow-left"></i></a>
					<div className="nav-main">
						<h4>微博正文</h4>
					</div>
					<div className="nav-right"><i className="iconfont icon-more"></i></div>
				</div>

			{	
				this.state.detaillist?
				<div id="detail">
					<ul>
						<li>
							<div className="card-weibo">
								<div className="card-wrap">
									<header>
										<div className="left">
											<img src={this.state.detaillist.user.avatar_hd} alt={this.state.detaillist.user.avatar_hd}/>
										</div>
										<div className="center">
											<div className="text">
												<h3>
													{this.state.detaillist.user.screen_name}
												</h3>
												<h4>
													<span className="time">{this.state.detaillist.user.created_at}</span>
													{
														this.state.detaillist.source?<span className="from"> 来自 {this.state.detaillist.source}</span>
														:null
													}
												</h4>
											</div>
										</div>
									</header>
									
									<article>
										<div className="card-foot">
											<div className="content">
												<div className="weibo-text" dangerouslySetInnerHTML={{ __html:`${this.state.detaillist.text}`}}></div>
											</div>

											<div className="media">
												<ul className="auto-list">
												{
													this.state.detaillist.pics&&this.state.detaillist.pics.map(pic=>
														<li key={pic.url}>
															<img src={pic.url} alt={pic.url}/>
														</li>
													)
												}
												</ul>
											</div>
										</div>
									</article>

									<footer>
											<div className="icon">
												<NavLink to={'/detail/'+this.state.detaillist.id+'/report'} activeClassName="seleted" onClick={this.handleClick.bind(this)}>
													<i>转发</i>
													<h4>{this.state.detaillist.reposts_count}</h4>
												</NavLink>
											</div>
											<div className="icon">
												<NavLink to={'/detail/'+this.state.detaillist.id+'/comment'} activeClassName="seleted" onClick={this.handleClick.bind(this)}>
													<i>评论</i>
													<h4>{this.state.detaillist.comments_count}</h4>
												</NavLink>
											</div>
											<div className="icon">
												<NavLink to={'/detail/'+this.state.detaillist.id+'/attitude'} activeClassName="seleted" onClick={this.handleClick.bind(this)}>
													<i>赞</i>
													<h4>{this.state.detaillist.attitudes_count}</h4>
												</NavLink>
											</div>
									</footer>
								</div>
							</div>
						</li>
					</ul>

					{this.props.children}
				</div>
				:null
			}
			</div>
		)
	}

	
	componentDidMount(){ 
		axios.get(`/statuses/show?id=${this.props.reportId.match.params.myid}`).then(res=>{
			
			this.setState({
				detaillist:res.data.data
			})
		})
	}
	
	handleClick(){
		this.setState({
			sum:this.state.sum+1
		})
	}

}
export default Detail

