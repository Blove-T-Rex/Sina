import React,{Component} from "react";
import "./index.css";
import axios from "axios";

class Report extends Component{
	constructor(){
		super();
		this.state={
			datalist:[]
		}
	}

	render(){
		return(
			<div id="comment">
				<ul>
					{
					this.state.datalist.map(item=>
						<li key={item.id}>
						<div className="box">
							<a><img src={item.user.avatar_hd}/></a>
							<div className="box-text">
								<div className="m-box">
									<div className="m-box-dir">
										<div className="m-text-box">
											<h4>{item.user.screen_name}</h4>
											<h3>
												<span dangerouslySetInnerHTML={{ __html:`${item.text}`}}></span>
											</h3>
											<div className="sub-txt">
												<ul>
												{
													item.comments&&item.comments.map(pic=>
														<li key={pic.id}>
															<p>
																<a>{pic.user.screen_name}</a>
																<span> : </span>
																<span dangerouslySetInnerHTML={{ __html:`${pic.text}`}}></span>
															</p>
														</li>
													)
												}													
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div className="time">
									<div className="center-time">
										{this.GMTToStr(item.created_at)}
									</div>
								</div>
							</div>
						</div>
					</li>
					)
					}
				</ul>
			</div>
		)
	}

	componentDidMount(){ 
		axios.get(`/comments/hotflow?id=${this.props.match.params.myid}&mid=${this.props.match.params.myid}&max_id_type=0`).then(res=>{
			this.setState({
				datalist:res.data.data.data
			})
		})

	}

	GMTToStr(time){
	    let date = new Date(time)
	    let Str=date.getFullYear() + '-' +
	    (date.getMonth() + 1) + '-' + 
	    date.getDate() + ' ' + 
	    date.getHours() + ':' + 
	    date.getMinutes() + ':' + 
	    date.getSeconds()
	    return Str
	}

}
export default Report 