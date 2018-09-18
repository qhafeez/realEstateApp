import listingsData from "../../listingsData.js";
import * as actions from "../actions/listingActions";

const initialState = {

	listingsData: listingsData,
	filteredListings:listingsData,
	sortBy:"ASC",
	city:"All",
	homeType:"All",
	rooms:0,
	min_price:0,
	max_price:10000000,
	min_floorspace:0,
	max_floorspace:50000,
	elevator:false,
	swimming_pool:false,
	finished_basement:false,
	gym:false,
	populateFormsData: "",
	modalShow:false,
	selectedListingPicture:null
	

}


const reducer = (state = initialState, action) =>{

	switch(action.type){

		case "MODAL_TOGGLE":

			if(state.modalShow){

				return{
					...state,
					modalShow:!state.modalShow,
					selectedListingPicture:null
				}

			}


			return{
				...state,
				modalShow:!state.modalShow,
				
			}


			

		case "SELECT_LISTING_PICTURE":

			return{
				...state,
				selectedListingPicture:action.image
			}

		case "FILTER_ACTION":

			return {
				...state,
				[action.filterObj.cat]:action.filterObj.value
			}


		case "FILTERED_DATA":
				console.log(state);

			  let newData = state.listingsData.filter((item)=>{
				    return item.price >= state.min_price && item.price <= state.max_price && item.floorSpace >= state.min_floorspace && item.floorSpace <= state.max_floorspace && item.rooms >= state.rooms
				  })

			  	console.log(newData);

				    if(state.city !== "All"){

				        newData = newData.filter((item)=>{
				              return item.city === state.city
				        })
				    }

				    if(state.homeType !== "All"){

				        newData = newData.filter((item)=>{
				              return item.homeType === state.homeType
				        })
				    }

				    if(state.sortBy === "ASC"){

				      newData = newData.sort((a,b)=>{

				        return a.price - b.price;

				      })

				    }

				    if(state.sortBy === "DSC"){

				      newData = newData.sort((a,b)=>{

				        return b.price - a.price;

				      })

				    }

				    if(state.elevator === true){
				      newData = newData.filter((item)=>{

				        return item.extras.includes("elevator")

				      })
				    }

				    if(state.swimming_pool === true){
				      newData = newData.filter((item)=>{

				        return item.extras.includes("swimming pool")

				      })
				    }

				    if(state.finished_basement === true){
				      newData = newData.filter((item)=>{

				        return item.extras.includes("finished basement")

				      })
				    }

				    if(state.gym === true){
				      newData = newData.filter((item)=>{

				        return item.extras.includes("gym")

				      })
				    }

		
			return {
				...state,
				filteredListings: newData
			}	

	}



	return state;



}

export default reducer;