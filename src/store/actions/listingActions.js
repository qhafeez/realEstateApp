import store from "../reducers/listingReducer";
import axiosInstance from "axios";

export const filterAction =(value)=>{


// console.log(name, value);
	

	return{
			type:"FILTER_ACTION",
			// filterObj:{
			// 	cat:name,
			// 	value:value
			// }
			filterObj:value
	}

}

export const filterData =()=>{

	return{
		type:"FILTERED_DATA"

	}

}



export const filterActionPlusData=(name, value)=>{

	return dispatch =>{

		dispatch(filterAction(name, value));
		dispatch(filterData());


	}
	


}

export const selectListingPicture = (image) =>{

	return {
		type:"SELECT_LISTING_PICTURE",
		image:image

	}

}

export const listingModalToggle=()=>{
		
		

	return{

		type:"MODAL_TOGGLE"


	}

}

export const selectPicAndToggleModal = (image) =>{

	return dispatch =>{

		dispatch(selectListingPicture(image));
		dispatch(listingModalToggle());

	}

}

export const aaaa = (listings)=>{
	return{
					type:"ADD_LAT_LNG",
					listings:listings
				}
}

export const  addLatLng = (listings) =>{

	return async dispatch =>{


			const listingsWithCoord = await Promise.all(listings.map(async  item=>{

				let address= item.address+",+"+item.city+",+"+item.state;
				address=address.split(" ").join("+");

				

		 let response = await axiosInstance.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyBBEq3v-DeflY5kVZMpIqSFByY4X-GPONY");
		 					
		 					let obj ={
		 						lat:Number(response.data.results[0].geometry.location.lat.toFixed(7)),
		 						lng:Number(response.data.results[0].geometry.location.lng.toFixed(7))
		 					}

			
			return 	{...item,position:obj};

			}))



			// let aaa = await Promise.all(listingsWithCoord);
			
			// const newListings = listings.map( (listing, index) =>{
				
			// 		return {
			// 			...listing,
			// 			position:aaa[index]
			// 		}
				
			// });

				// console.log(newListings);

						dispatch(aaaa(listingsWithCoord));
								
					
				
			// console.log(JSON.parse(JSON.stringify(listingsWithCoord)));

			
			

			
			


		}		

	}

export const selectedLatLng = (position)=>{
	return{
					type:"SELECTED_LAT_LNG",
					selectedListingLatLng:position
				}
}



