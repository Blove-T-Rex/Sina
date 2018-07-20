import React,{Component} from "react";
import "./index.css";
import axios from "axios";

class Attitude extends Component{
	constructor(){
		super();
		this.state={
			datalist:[]
		}
	}

	render(){
		return(
			<div id="attitude">
				<ul>
					{
					this.state.datalist.map(item=>
						<li key={item.id}>
						<div className="box">
							<a><img src={item.user.profile_image_url}/></a>
							<div className="box-text">
								<div className="m-box">
									<div className="m-box-dir">
										<div className="m-text-box">
											<h4>{item.user.screen_name}</h4>
										</div>
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
		axios.get(`/api/attitudes/show?id=${this.props.match.params.myid}&page=1`).then(res=>{
			this.setState({
				datalist:res.data.data.data
			})
		})
	}
}
export default Attitude 