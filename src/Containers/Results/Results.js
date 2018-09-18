import React, {Component} from "react";
import classes from "./Results.module.css";
import Listing from "../Listing/Listing";
import * as actions from "../../store/actions/listingActions";
import {connect} from "react-redux";




class Results extends Component{

state={
	
}


sortAction = (event) =>{

	let name = event.target.name;
	let value = event.target.value;

	this.props.sortAction(name, value);

}


	render(){

		const data = this.props.data.map(item=>{
						return <Listing listingInfo={item}   />
					})


		return(
					
					<div  className={classes.resultsContainer} >
						<div className={classes.sortContainer}>
							<select name="sortBy" onChange={(e)=>{this.sortAction(e)}}>
								<option value="ASC">Price: Low to High</option>
								<option value="DSC">Price: High to Low</option>
							</select>
						</div>
						
						{data}	

					</div>
			)

	}

}

const mapDispatchToProps = dispatch =>{

	return{
		sortAction:(name, value)=>{dispatch(actions.filterActionPlusData(name, value))}
	}

}

export default connect(null, mapDispatchToProps)(Results);