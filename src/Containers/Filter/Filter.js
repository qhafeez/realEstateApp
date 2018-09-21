import React, {Component} from "react";
import classes from "./Filter.module.css";
import {ToggleButtonGroup, ToggleButton} from "react-bootstrap/lib";
import { Icon } from 'react-icons-kit';
import {close} from 'react-icons-kit/ikons/close';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../../store/actions/listingActions";


class Filter extends Component{
	constructor(props){
		super(props);

		this.state={

			checkbox1:false,
			activeCSS:{
					backgroundColor:"#3697EE",
					color:"white"
					},
			filter:{
				city:null,
				homeType:null,
				rooms:null,
				min_price:null,
				max_price:null,
				min_floorspace:null,
				max_floorspace:null,
				elevator:false,
				swimming_pool:false,
				finished_basement:false,
				gym:false
			}

		}

		// this.props.populateFormsAction();


	}


	

	// filterHandler = (e) =>{
	// 		console.log(e);
	// 	this.setState({
	// 		[e.currentTarget.value]:e.currentTarget.checked
	// 	})

	// }

	bedsHandler =(e)=>{
		console.log(e);
		this.setState({
			rooms:e
		})
	}

	homeTypeHandler = (e)=>{
		console.log(e);
		this.setState({
			homeType:e
		})


	}

	urlFilterBuilder = () =>{

		let filterParams = {...this.state.filter};
		let urlString = "";
		for(let param in filterParams){
			
			if(filterParams[param]){
				urlString += filterParams[param]+"_"+param+"/";
			}

		}
		this.props.history.replace("/listings/"+urlString);

	}

	filterHandler =(event)=>{


		
		let name= event.target.type === "checkbox" ? event.target.value : event.target.name;
		let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
		console.log(event.target);

		// this.props.filterChange(name, value);
		let updatedFilter = {...this.state.filter};
			updatedFilter[name] = value;

		this.setState({
			filter:updatedFilter
		}, ()=>{
			this.urlFilterBuilder()
		})



	}
	
	componentDidMount(){
console.log("AAAAAAAAAAAAAAA")

		

	}




	render(){

		
		return(
				<section  style={this.props.show ? {bottom:"0" }: {}} className={[classes.filter, classes.filterDesktop].join(" ")}>
             <div className={classes.mobileContainer}>

            <div onClick={this.props.closeModal} className={classes.closeButtonContainer}>
            	<Icon icon={close}/>
            </div>
            <div className={classes.filterItemsContainer}>
            <label htmlFor="city">City</label>
            <select name="city" className="filters city" onChange={(e)=>this.filterHandler(e)}>
              <option  value="All">All</option>
              <option value="Miami">Miami</option>
              <option value="Atlanta">Atlanta</option>
              <option value="Charleston">Charleston</option>
              <option value="Dallas">Dallas</option>
              <option value="Pembroke Pines">Pembroke Pines</option>
              <option value="New York">New York</option>
              
              {/*this.cities()*/}


             
            </select>

           
            <div className={classes.containerPadding}>
            	<span>Home Type</span>
	            <ToggleButtonGroup style={{display:"flex",
	         								flexWrap:"wrap",
	         								}}  
	         						type="radio" 
	         						name="homeType" 
	         						defaultValue={"All"}
	         						
	         						
	         						>
				      <ToggleButton
				      			name="beds" 
				      			style={{width:"49%",margin:"1px"}} 
				      			value={"All"}
				      			onChange={(e)=>{this.filterHandler(e)}}
				      			>All

				      </ToggleButton>
				      <ToggleButton 
				      				
				      			style={{width:"49%",margin:"1px"}} 
				      			value={"Studio"}
				      			onChange={(e)=>{this.filterHandler(e)}}>Studio
				      </ToggleButton>
				      <ToggleButton
				      		name="beds" 
				      		style={{width:"49%",margin:"1px"}} 
				      		value={"Apartment"}
				      		onChange={(e)=>{this.filterHandler(e)}}>Apartment

				      </ToggleButton>
				      <ToggleButton 
				      		style={{width:"49%",margin:"1px"}} 
				      		value={"Home"}
				      		onChange={(e)=>{this.filterHandler(e)}}>Home 
				      </ToggleButton>
				      
				      
	   		 	 </ToggleButtonGroup>
   		 	 </div>

            
   		 	 <div className={classes.containerPadding}>
   		 	 	<span>Bedrooms</span>
             <ToggleButtonGroup style={{display:"flex",
         								flexWrap:"wrap",
         								}}  
         						type="radio" 
         						name="rooms" 
         						defaultValue={0}
         						
         						
         						>
			      <ToggleButton
			      			name="beds" 
			      			style={{width:"49%",margin:"1px"}}
			      			onChange={(e)=>{this.filterHandler(e)}} 
			      			value={0}
			      			>All Beds

			      </ToggleButton>
			      <ToggleButton 
			      				
			      			style={{width:"49%",margin:"1px"}} 
			      			onChange={(e)=>{this.filterHandler(e)}}
			      			value={1}>1+ Beds
			      </ToggleButton>
			      <ToggleButton
			      		name="beds" 
			      		style={{width:"49%",margin:"1px"}}
			      		onChange={(e)=>{this.filterHandler(e)}} 
			      		value={2}>2+ Beds

			      </ToggleButton>
			      <ToggleButton 
			      		style={{width:"49%",margin:"1px"}}
			      		onChange={(e)=>{this.filterHandler(e)}} 
			      		value={3}>3+ Beds
			      </ToggleButton>
			      <ToggleButton 
			      		style={{width:"49%",margin:"1px"}}
			      		onChange={(e)=>{this.filterHandler(e)}} 
			      		value={4}>4+ Beds
			      </ToggleButton>
			      <ToggleButton 
			      		style={{width:"49%",margin:"1px"}}
			      		onChange={(e)=>{this.filterHandler(e)}} 
			      		value={5}>5+ Beds
			      </ToggleButton>
			      
   		 	 </ToggleButtonGroup>
   		 	 
   		 	 </div>


            <div className={classes.containerPadding}>
                <span className="title">Price</span>
                <div className={classes.filterInputTextContainer} onChange={(e)=>{this.filterHandler(e)}}  >
                  <input type="text" name="min_price" className="min-price" value={this.props.minPrice/*this.props.globalState.min_price*/} />
                  <input type="text" name="max_price" className="max-price" value={this.props.maxPrice/*this.props.globalState.max_price*/}/>
                </div>

            </div>

            <div className="filters floorSpace inputText">
             
                <span className="title">Floor Space</span>
              <div className={classes.floorSpaceInputContainer}  onChange={(e)=>{this.filterHandler(e)}}>
                <input type="text" name="min_floorspace" className="min-floorspace" value={this.props.minFloorspace/*this.props.globalState.min_floorspace*/} />
                <input type="text" name="max_floorspace" className="max-floorspace" value={this.props.maxFloorspace/*this.props.globalState.max_floorspace*/} />
              </div>

            </div>

            <div className={classes.extras}>

                <span className="title">Extras</span>
                
                

                

                <ToggleButtonGroup vertical block type="checkbox"  >
			      <ToggleButton 
			      			// onChange={(e)=>{this.filterHandler(e)}} 
			      			title="elevators"
			      			className={classes.checkboxButtonMargin} 
			      			style={this.state.Elevators ? this.state.activeCSS : null }
			      			onChange={(e)=>{this.filterHandler(e)}}
			      			name="elevator"
			      			value={"elevator"}>Elevators

			      </ToggleButton>
			      <ToggleButton
			      			onChange={(e)=>{this.filterHandler(e)}}
			      			name="swimming_pool"
			      			className={classes.checkboxButtonMargin}
			      			style={this.state["Swimming Pool"] ? this.state.activeCSS: null} 
			      			value={"swimming_pool"}>Swimming Pool
			      </ToggleButton>
			      <ToggleButton 
			      			name="finished_basement"
			      			onChange={(e)=>{this.filterHandler(e)}}
			      			className={classes.checkboxButtonMargin}
			      			style={this.state["Finished Basement"] ? this.state.activeCSS : null }  
			      			value={"finished_basement"}>Finished Basement
			      </ToggleButton>
			      <ToggleButton 
			      			name="gym"
			      			onChange={(e)=>{this.filterHandler(e)}}
			      			style={this.state.Gym ? this.state.activeCSS : null } 
			      			className={classes.checkboxButtonMargin} 
			      			value={"gym"}>Gym
			      </ToggleButton>
    			</ToggleButtonGroup>

    		</div>



            </div>

           
            <div className={classes.bottomButtons}>
            		<ToggleButtonGroup style={{display:"flex",
            									width:"100%"
         								
         								}}  
         					
         						name="rooms" 
         						
         						
         						onChange={(e)=>{this.bedsHandler(e)}}
         						>
			     
			      <ToggleButton 
			      		style={{width:"49%",margin:"1px"}} 
			      		>Clear
			      </ToggleButton>
			      <ToggleButton onChange={this.props.closeModal}
			      		style={{width:"49%",margin:"1px"}} 
			      		>Done
			      </ToggleButton>
			      
   		 	 </ToggleButtonGroup>


            	</div>

            </div>
            	

            </section>)
			

	}

}

const mapStateToProps = state =>{

	return{

		minPrice:state.listings.filter.min_price,
		maxPrice:state.listings.filter.max_price,
		minFloorspace:state.listings.filter.min_floorspace,
		maxFloorspace:state.listings.filter.max_floorspace

	}

}

const mapDispatchToProps = dispatch =>{

	return {

		filterChange:(cat, value)=>{dispatch(actions.filterActionPlusData(cat, value))}

	}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter));