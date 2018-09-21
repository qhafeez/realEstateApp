import React, {Component} from "react";
import classes from "./ListingsPage.module.css";
import Filter from "../Filter/Filter";
import Results from "../Results/Results";
import listingsData from "../../listingsData.js";
import {withRouter} from "react-router-dom";
import * as actions from "../../store/actions/listingActions";
import Modal from "../../Components/UI/Modal/Modal";
import {connect} from "react-redux";
import { Icon } from 'react-icons-kit'
import {close} from 'react-icons-kit/ikons/close'

class ListingsPage extends Component{



		state={
			
			// sortBy:"ASC",
			// listingsData: listingsData,
			// city:"All",
			// homeType:"All",
			// rooms:"All",
			// min_price:0,
			// max_price:10000000,
			// min_floorspace:0,
			// max_floorspace:50000,
			// elevator:false,
			// swimming_pool:false,
			// finished_basement:false,
			// gym:false,
			// filteredData:listingsData,
			// populateFormsData: "",
			// view:"long",
			filter:null

		}

		




handler =()=>{
	this.setState({
		show:!this.state.show
	})
}

sortHandler = (event) =>{

	let name = event.target.name;
	let sortDirection = event.target.value;
	
	this.props.sortAction(name, sortDirection);

}

// filteredData = () =>{

//   let newData = this.state.listingsData.filter((item)=>{
//     return item.price >= this.state.min_price && item.price <= this.state.max_price && item.floorSpace >= this.state.min_floorspace && item.floorSpace <= this.state.max_floorspace && item.rooms >= this.state.rooms
//   })


//     if(this.state.city !== "All"){

//         newData = newData.filter((item)=>{
//               return item.city === this.state.city
//         })
//     }

//     if(this.state.homeType !== "All"){

//         newData = newData.filter((item)=>{
//               return item.homeType === this.state.homeType
//         })
//     }

//     if(this.state.sortBy === "price-dsc"){

//       newData = newData.sort((a,b)=>{

//         return a.price - b.price;

//       })

//     }

//     if(this.state.sortBy === "price-asc"){

//       newData = newData.sort((a,b)=>{

//         return b.price - a.price;

//       })

//     }

//     if(this.state.elevator === true){
//       newData = newData.filter((item)=>{

//         return item.extras.includes("elevator")

//       })
//     }

//     if(this.state.swimming_pool === true){
//       newData = newData.filter((item)=>{

//         return item.extras.includes("swimming pool")

//       })
//     }

//     if(this.state.finished_basement === true){
//       newData = newData.filter((item)=>{

//         return item.extras.includes("finished basement")

//       })
//     }

//     if(this.state.gym === true){
//       newData = newData.filter((item)=>{

//         return item.extras.includes("gym")

//       })
//     }


//     this.setState({
//       filteredData: newData
//     })
// }

// populateForms = () =>{

//   let cities = this.state.listingsData.map((item)=>{
//     return item.city;
//   })

//     cities = new Set(cities);
//     cities = [...cities].sort();

  
//      let homeTypes = this.state.listingsData.map((item)=>{
//     return item.homeType;
//   })

//     homeTypes = new Set(homeTypes);
//     homeTypes = [...homeTypes].sort();


//      let bedrooms = this.state.listingsData.map((item)=>{
//     return item.rooms;
//   })

//     bedrooms = new Set(bedrooms);
//     bedrooms = [...bedrooms].sort();




//     this.setState({
//       populateFormsData:{
//         cities,
//         homeTypes,
//         bedrooms
//       }
//     }, ()=>{
//         console.log(this.state)})

// }
componentDidUpdate(prevProps, prevState){

	// if(prevState.filter !== this.props.filter){
	// 	this.setState({
	// 		filter:this.props.filter
	// 	}, ()=>{
	// 		console.log(this.state.filter)
	// 	})
	// }
	if(prevProps.match.params !== this.props.match.params){
		this.props.sortAction(this.props.match.params);
		console.log("listing page did update");
		console.log(this.props.match.params);

	}

}

componentDidMount(){

	// let city;
	// let value;
	// let params = new URLSearchParams(this.props.location.search);

	// for(let item of params.entries()){

	// 	console.log(item);

	// 	if(item[0] === "city"){
			
	// 		city=item[0];
	// 		value=item[1];
	// 	}

	// }

	// this.props.sortAction(city, value);

	// console.log(city + " " + value);


	// this.props.filteredDataFunction();
	// this.setState({
	// 	filter:this.props.filter
	// },()=>{
	// 	console.log(this.state.filter);
	// })
	// // console.log(this.props);

	// let aaa = "500_minPrice";
	// 	console.log(aaa.substring(0, aaa.indexOf("_")));
	// 	console.log(aaa.substring(aaa.indexOf("_")+1));

	console.log(this.props.match.params);
	this.props.sortAction(this.props.match.params)


}



	render(){

		
		// this.props.hello();

		return(
					
					<div   className={classes.listingsPageContainer} >
						<div className={classes.sortFilterContainer}>
							<div className={classes.sortFilter}>
								<div onClick={this.handler}>FILTER</div>
								<select name="sortBy" onChange={this.sortHandler}>
									<option value="ASC">Price: Low to High</option>
									<option value="DSC">Price: High to Low</option>
								</select>
							</div>
						</div>
						<Filter populateFormsAction={this.populateForms} closeModal={this.handler} show={this.state.show} />
						<Results data={this.props.filteredData} />
						
						<Modal show={this.props.modalStatus} modalClosed={this.props.modalToggle}  >
							<div className={classes.modalContainer}>
								<div className={classes.closeContainer} onClick={this.props.modalToggle} ><Icon icon={close} size={48} /></div>
								<div className={classes.imgContainer} style={{backgroundImage:'url("'+this.props.selectedPicture +'")'}}>
									
								</div>
							</div>
						</Modal>

					</div>
			)

	}

}


const mapStateToProps = state =>{

	return{
		filter:state.listings.filter,
		filteredData: state.listings.filteredListings,
		modalStatus:state.listings.modalShow,
		selectedPicture:state.listings.selectedListingPicture
	}

}


const mapDispatchToProps = dispatch =>{

	return{
		sortAction: (value)=>{dispatch(actions.filterActionPlusData(value))},
		// sortAction: (name, value)=>{dispatch(actions.filterActionPlusData(name, value))},
		filteredDataFunction:()=>{dispatch(actions.filterData())},
		modalToggle:()=>{dispatch(actions.listingModalToggle())}
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListingsPage));
