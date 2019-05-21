import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './Buildcontrol/BuildControl'

const controls = [
    {label: "Meat", type: "meat"},
    {label: "Salad", type: "salad"},
    {label: "Cheese", type: "cheese"},
    {label: "Bacon", type: "bacon"}
];


const buildControls = (props) => {
    return (
        <div className={classes.BuildControl}>
            <p> Current Price: <strong>{props.price.toFixed(2)} $</strong></p>
            {controls.map(ctrl => (
                <BuildControl key={ctrl.label}
                              label={ctrl.label}
                              added={()=>props.ingAdded(ctrl.type)}
                              removed = {()=>props.ingRemoved(ctrl.type)}
                              disabled = {props.disInfo[ctrl.type]}
                />
            ))}
        </div>
    )
};

export default buildControls;