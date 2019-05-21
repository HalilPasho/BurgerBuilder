import React from 'react'
import BurgerIngretient from './BurgerIngretient/BurgerIngretient'
import classes from './Burger.css'


const burger = (props) => {

    // turns object in array
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngretient key={igKey + i} type={igKey}/>
        })
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p> Please start adding ingrediens..</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngretient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngretient type="bread-bottom"/>
        </div>
    )
};

export default burger;