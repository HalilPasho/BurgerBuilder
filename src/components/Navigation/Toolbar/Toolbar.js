import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../../Logo/Logo'
import Navigationitems from '../NavigationItems/NavigationItems'
import SideToggle from '../SideDrawer/SideToggle/SideToggle'

const toolbar = (props) => (
    <div>
        <header className={classes.Toolbar}>
            <SideToggle toggler={props.toggle}/>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav className={classes.DesktopOnly}>
                <Navigationitems/>
            </nav>
        </header>
    </div>
);


export default toolbar;