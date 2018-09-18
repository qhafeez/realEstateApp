import React, {Component} from "react";
import classes from "./HomePage.module.css";
import {DropdownButton, MenuItem, Button} from "react-bootstrap/lib";
import {withRouter} from "react-router-dom";


class HomePage extends Component{

	constructor(){
		super()

		this.state={

			buttonTitle:"Choose a city"

		}

	}

	onTargetSelect = (city) =>{

		this.setState({
			buttonTitle:city
		})

	}

	redirectToListings = () =>{
		if(this.state.buttonTitle !== "Choose a city"){

			this.props.history.push("/listings?city="+this.state.buttonTitle);

		}

	}

	render(){

		return(
				<div className={classes.container}>
					<div className={classes.mainSection}>

						<div className={classes.titleAndSearchContainer}>
							<div className={classes.titleContainer}>
								<h2>Find your new home!</h2>
							</div>
							<div className={classes.searchSectionContainer}>

								<DropdownButton 
										bsSize="large"
      									title={this.state.buttonTitle}
      									id="dropdown-size-large" >

									<MenuItem onSelect={()=>{this.onTargetSelect("Miami")}}>Miami</MenuItem>
									<MenuItem onSelect={()=>{this.onTargetSelect("Atlanta")}}>Atlanta</MenuItem>
									<MenuItem onSelect={()=>{this.onTargetSelect("Tampa")}}>Tampa</MenuItem>
									<MenuItem onSelect={()=>{this.onTargetSelect("New York")}}>New York</MenuItem>

								</DropdownButton>

								<Button bsStyle="success" bsSize="large" onClick={this.redirectToListings}>Go!</Button>
								
							</div>
						</div>
						

					</div>
					

				</div>


			)


	}




}

export default withRouter(HomePage);