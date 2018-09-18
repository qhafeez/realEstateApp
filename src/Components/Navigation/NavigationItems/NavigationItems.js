import React, {Component} from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

// import {NavLink} from "react-router-dom";



class NavigationItems extends Component  {


	


	render(){
		console.log(this.props)

		return(
			<ul className={classes.NavigationItems}>

					
					<NavigationItem cursor="" link="/">Home</NavigationItem>
					<NavigationItem cursor="not-allowed" link="/#">Log In</NavigationItem>
					<NavigationItem cursor="not-allowed" link="/#">Sign Up</NavigationItem>


				
				
			</ul>
		)

	}

}



export default NavigationItems;