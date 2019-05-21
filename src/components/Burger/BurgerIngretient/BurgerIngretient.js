import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngretient.css';

class BurgerIngretient extends Component {
    render() {
        let ingretient = null;

        switch (this.props.type) {
            case ('bread-bottom'):
                ingretient = <div className={classes.BreadBottom}></div>;
                break;
            case('bread-top') :
                ingretient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>

                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case ('bacon'):
                ingretient = <div className={classes.Bacon}></div>;
                break;
            case ('meat'):
                ingretient = <div className={classes.Meat}></div>;
                break;
            case ('cheese'):
                ingretient = <div className={classes.Cheese}></div>;
                break;
            case ('salad'):
                ingretient = <div className={classes.Salad}></div>;
                break;
            default :
                ingretient = null
        }
        return ingretient;
    };
};

BurgerIngretient.propTypes = {
    type: PropTypes.string.isRequired
}


export default BurgerIngretient;