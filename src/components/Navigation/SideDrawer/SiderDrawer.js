import React, {Fragment} from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Blackdrop from '../../UI/Backdrop/Backdrop';

const siderDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open) {
        attachedClasses = [classes.SideDrawer,classes.Open]
    }
    return(
        <Fragment>
            <Blackdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}> 
                <div className={classes.Logo}>
                    <Logo/>        
                </div>
                
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>   
        </Fragment>
           );
};

export default siderDrawer