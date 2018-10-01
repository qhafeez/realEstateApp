import React, {Component} from "react";
import classes from "./Results.module.css";
import Listing from "../Listing/Listing";
import * as actions from "../../store/actions/listingActions";
import {connect} from "react-redux";




class Results extends Component{

state={
	data:null
}


sortAction = (event) =>{

	let name = event.target.name;
	let value = event.target.value;

	this.props.sortAction(name, value);

}

componentDidUpdate(prevProps,prevState){
	console.log("Results CDU")
	console.log(this.props.selectedMarkerLatLng)

	console.log(prevProps);
	console.log(this.props);
// 	if(prevProps !== this.props){
// 	setTimeout(()=>{

// 		const data = this.props.filteredData.map(item=>{
			
// 							let a=null
// 							if(this.props.selectedMarkerLatLng !== null){
//  						if(JSON.stringify(item.position) === JSON.stringify(this.props.selectedMarkerLatLng)){
//  							a="y";
//  						}
// 							}

// 						return <Listing active={a}  listingInfo={item}   />
 						
 						

// 					});

// 	this.setState({
// 		data:data
// 	});	
// 	},10)
					

// }
}

	render(){

let data=null;			

 data = this.props.filteredData.map(item=>{
			
			let a=null
				if(this.props.selectedMarkerLatLng !== null){
 					if(JSON.stringify(item.position) === JSON.stringify(this.props.selectedMarkerLatLng)){
 							a="y";
 						}
					}

					return <Listing active={a}  listingInfo={item}   />
 				});




		

			let style={display:"none"};
				if(this.props.show ==="results"){
					style = {display:"block"}
				} 


		return(
					
					<div style={style}  className={classes.resultsContainer} >
						
						
						{data}	

					</div>
			)

	}

}

const mapStateToProps = state =>{

	return{
		
		filteredData: state.listings.filteredListings,
		selectedMarkerLatLng:state.listings.selectedListingLatLng
		
	}

}


const mapDispatchToProps = dispatch =>{

	return{
		sortAction:(name, value)=>{dispatch(actions.filterActionPlusData(name, value))}
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Results);