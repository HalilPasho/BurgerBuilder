import React from 'react';
import classes from './Button.css'

const button = (props) => (
    <div className={classes.ButtonPosition}>
        <button onClick={props.clicked}
                className={[classes.Button, classes[props.btnType]].join(' ')}>{props.children}</button>
    </div>
);


export default button;