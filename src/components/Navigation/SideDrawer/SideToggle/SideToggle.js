import React from 'react';
import classes from './SideToggle.css'

const sideToggle = (props) =>  (
        <div className={classes.DrawerToggle} onClick={props.toggler}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );


export default sideToggle;