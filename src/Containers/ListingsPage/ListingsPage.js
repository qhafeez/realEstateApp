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
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Aux from "../../HOC/Aux/Aux";
import axiosInstance from "axios";


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={props.center}
   	center={props.center}
  >
  

  {props.children}
  
  
  </GoogleMap>
))




class ListingsPage extends Component{



		state={
			
			
			filter:null,
			markers:[],
			show:false,
			mapOrResults:"results",
			selectedListingLatLng:null

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
	console.log(this.props);

	if(prevProps.match.params !== this.props.match.params){
		this.props.sortAction(this.props.match.params);
		console.log("listing page did update");
		console.log(this.props.match.params);

	}

	if(prevProps.filteredData !== this.props.filteredData){


		///this timeout is needed because fetching the data from the api
		//caused a problem where the position object is created slightly too
		//slowly and turns up undefined
	setTimeout(()=>{

		let markers = [...this.props.filteredData];



	// console.log(this.props.filteredData[0].position.lat);
		this.setState({
			markers:markers,
			center:markers[0].position
		})


	}, 1)
	
		

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
	this.props.sortAction(this.props.match.params);

	


}

toggle=()=>{

	let current = this.state.mapOrResults;

	if(current === "map"){
		current = "results";
	} else{
		current = "map"
	}

	this.setState({
		mapOrResults:current
	}, ()=>{
		console.log(this.state);
	})


}

getMP=(e)=>{

	console.log(e);
	let selectedListingLatLng={

		lat:Number(e.latLng.lat().toFixed(7)),
		lng:Number(e.latLng.lng().toFixed(7))
	
	}
	

		this.props.selectedListing(selectedListingLatLng);

	
	
}

	render(){

		
		// this.props.hello();

		// const markers = this.props.filteredData.map(item=>{

		// 	let address= item.address+",+"+item.city+",+"+item.state;
		// 		address=address.split(" ").join("+");

		// 	axiosInstance.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyBBEq3v-DeflY5kVZMpIqSFByY4X-GPONY")
		// 		.then((response)=>{
		// 			console.log(response);
		// 		})
		// 		.catch((error)=>{
		// 			console.log(error);
		// 		})

		// })

			// // console.log(this.props.filteredData);
			let markers = null;
		
			
				if(this.state.markers.length >0){
				 markers = this.state.markers.map(item=>{
				 	// console.log(item.position.lat);
					return <Marker  onClick={(e)=>{this.getMP(e)}} position={{lat:item.position.lat, lng:item.position.lng} } ref={this.props.getPosition}  />
				})
				}

			
			
			



		return(
					<Aux>
					<div   className={classes.listingsPageContainer} >
						<div className={classes.sortFilterContainer}>
							<div className={classes.sortFilter}>
								<div onClick={this.handler}>FILTER</div>
								<div className={classes.mapList} onClick={this.toggle} >{this.state.mapOrResults ==="map"? "RESULTS":"MAP"}</div>
								<select name="sortBy" onChange={this.sortHandler}>
									<option value="ASC">Price: Low to High</option>
									<option value="DSC">Price: High to Low</option>
								</select>
							</div>
						</div>

						<div className={classes.mainContainer}>
						<div className={classes.appContainer}>
						<div style={this.state.mapOrResults ==="map" ? {display:"block"}:{display:"none"}} className={classes.mapContainer}>
							<MyMapComponent
								defaultCenter={this.state.markers.length>0 ? this.state.center:null}
								center={this.state.markers.length>0 ? this.state.center:null}
	  							isMarkerShown
	  							googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBBEq3v-DeflY5kVZMpIqSFByY4X-GPONY&v=3.exp&libraries=geometry,drawing,places"
	  							loadingElement={<div style={{ height: `100%` }} />}
	  							containerElement={<div style={{ height: `100%` }} />}
	  							mapElement={<div style={{ height: `100%` }} />}
							>
								{markers}

							</MyMapComponent>
						</div>
						<div className={classes.filterAndResultsContainer}>
							<Filter populateFormsAction={this.populateForms} closeModal={this.handler} show={this.state.show} />
							<Results  show={this.state.mapOrResults} />
						</div>
						</div>
						</div>
						
						<Modal show={this.props.modalStatus} modalClosed={this.props.modalToggle}  >
							<div className={classes.modalContainer}>
								<div className={classes.closeContainer} onClick={this.props.modalToggle} ><Icon icon={close} size={48} /></div>
								<div className={classes.imgContainer} style={{backgroundImage:'url("'+this.props.selectedPicture +'")'}}>
									
								</div>
							</div>
						</Modal>

					</div>
					
					</Aux>
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
		selectedListing:(value)=>{dispatch(actions.selectedLatLng(value))},
		filteredDataFunction:()=>{dispatch(actions.filterData())},
		modalToggle:()=>{dispatch(actions.listingModalToggle())}
	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListingsPage));
