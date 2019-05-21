import React from 'react'
import classes from './Layout.css'
import Aux from '../../hoc/Aux'

const layout = (props) => (
    <Aux>
        <div>ToolBar, SideDrower, TestText</div>
        <main  className={classes.Content}> {props.children} </main>
    </Aux>

);

export default layout;