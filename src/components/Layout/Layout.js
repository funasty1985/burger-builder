import React from 'react';
import Aux from '../../HOC/Aux'
import classes from './Layout.css'

const layout = ( props ) => (
    <Aux>
        <div>ToolBar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
    
);

export default layout;
