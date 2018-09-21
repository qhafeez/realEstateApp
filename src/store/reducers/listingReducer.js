import listingsData from "../../listingsData.js";
import * as actions from "../actions/listingActions";

const initialState = {

	listingsData: listingsData,
	filteredListings:listingsData,
	sortBy:"ASC",
	// city:"All",
	// homeType:"All",
	// rooms:0,
	// min_price:0,
	// max_price:10000000,
	// min_floorspace:0,
	// max_floorspace:50000,
	// elevator:false,
	// swimming_pool:false,
	// finished_basement:false,
	// gym:false,
	populateFormsData: "",
	modalShow:false,
	selectedListingPicture:null,
	filter:{
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
		gym:false
	}
	

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

			let updatedFilter = {...state.filter};
				updatedFilter.elevator=false;
				updatedFilter["swimming_pool"]=false;
				updatedFilter["finished_basement"]=false;
				updatedFilter.gym=false;


				for(let param in action.filterObj){
					if(action.filterObj[param]){
						
						let prop = action.filterObj[param].substring(action.filterObj[param].indexOf("_")+1);
						let val = action.filterObj[param].substring(0, action.filterObj[param].indexOf("_"));

							if(val==="true"){
								val = true
							}


						if(updatedFilter.hasOwnProperty(prop)){
						
							updatedFilter[prop] = val;
						
						}


					}
				}
				// updatedFilter[action.filterObj.cat] = action.filterObj.value;



			return {
				...state,
				filter: updatedFilter
			}


		case "FILTERED_DATA":
				console.log(state);

			  let newData = state.listingsData.filter((item)=>{
				    return item.price >= Number(state.filter.min_price) && item.price <= Number(state.filter.max_price) && item.floorSpace >= Number(state.filter.min_floorspace) && item.floorSpace <= Number(state.filter.max_floorspace) && item.rooms >= Number(state.filter.rooms)
				  })

			  	console.log(newData);

				    if(state.filter.city !== "All"){

				        newData = newData.filter((item)=>{
				              return item.city === state.filter.city
				        })
				    }

				    if(state.filter.homeType !== "All"){

				        newData = newData.filter((item)=>{
				              return item.homeType === state.filter.homeType
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

				    if(state.filter.elevator === true){
				      newData = newData.filter((item)=>{

				        return item.extras.includes("elevator");



				        /*
							newData = newData.filter((item)=>{
								let aaa = item.extras.map(extra=>{
										return state.filter.extras.includes(extra)
								}).every(item=>item===true)
							})
					
				        */

				      })
				    }

				    if(state.filter.swimming_pool === true){
				      newData = newData.filter((item)=>{

				        return item.extras.includes("swimming pool")

				      })
				    }

				    if(state.filter.finished_basement === true){
				      newData = newData.filter((item)=>{

				        return item.extras.includes("finished basement")

				      })
				    }

				    if(state.filter.gym === true){
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