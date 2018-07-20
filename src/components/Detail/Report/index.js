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
			<div id="report">
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
										</div>
									</div>
								</div>
								<div className="time">
									<div className="center-time">
										{item.created_at}
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
		axios.get(`/api/statuses/repostTimeline?id=${this.props.match.params.myid}&page=1`).then(res=>{
			this.setState({
				datalist:res.data.data.data
			})
		})
	}

}
export default Report 