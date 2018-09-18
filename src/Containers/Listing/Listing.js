import React, {Component} from "react";
import classes from "./Listing.module.css";
import * as actions from "../../store/actions/listingActions";
import {connect} from "react-redux";


class Listing extends Component{

state={
	
}


	render(){


const info = this.props.listingInfo;


		return(
					//mobileView
				<div className={classes.listingContainer}>
					<div onClick={()=>{this.props.openListingModal(info.image)}} className={classes.listingImgContainer} style={{backgroundImage:`url("${info.image}")`}}>
						
					</div>
					<div className={classes.listingInfoContainer}>
						
						<div className={classes.addressContainer}>
							<div>{info.address}</div>
							<div>{info.city}, {info.state} 33973</div>
						</div>
						
						<div className={classes.priceAndStatusContainer}>
							<div className={classes.price}>$ {info.price} </div>
							<div className={classes.status}> | Available</div>
						</div>
						
						<div className={classes.contactContainer}>
							<div className={classes.email}>Email Property </div>
							<div className={classes.phone}> | 888-888-8888</div>
						</div>
						
					</div>

				</div>








					
			/*<div className="col-md-3" >
              <div className="listing">
                
                <div className="listing-img" style={{
                  background:`url("${info.image}") `}}>
                  <span className="address">{info.address}</span>
                  
                    <div className="details">
                      <div className="user-img">

                      </div>

                      <div className="detail-inner-cont">
                          <div className="user-details">
                            <span className="user-name">Nina Smith</span>
                            <span className="post-date">Posted on 08-28-2018</span>

                          </div>
                          <div className="listing-details">
                            <div className="floor-space">
                                <i className="far fa-square"></i>
                                <span>{info.floorSpace} ft &sup2;</span>
                            </div>
                            <div className="bedrooms">
                                  <i className="fas fa-bed"></i>
                                  <span>{info.rooms} bedrooms</span>
                            </div>
                          </div>
                           <div className="view-btn">View Listing
                        
                            </div>

                      </div>

                    </div>




                </div>
                  <div className="bottom-info">
                      
                      <span className="price">$ {info.price} </span>
                      <span className="location"><i className="fas fa-map-marker-alt"></i> {info.city}, {info.state}</span>

                  </div>


              </div>
              </div>*/
			)

	}

}


const mapDispatchToProps = dispatch =>{
	return{
		openListingModal:(a)=>{dispatch(actions.selectPicAndToggleModal(a))}
	}
}

export default connect(null, mapDispatchToProps)(Listing);