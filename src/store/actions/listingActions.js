import store from "../reducers/listingReducer";

export const filterAction =(name, value)=>{


console.log(name, value);
	

	return{
			type:"FILTER_ACTION",
			filterObj:{
				cat:name,
				value:value
			}
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

