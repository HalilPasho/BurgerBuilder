import React, {Component} from 'react'
import classes from './Layout.css'
import Aux from '../../hoc/Aux'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    closeSideHandler = () => {
        this.setState({showSideDrawer: false})
    };

    toggleSideHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    };

    render() {
        return (
            <Aux>
                <Toolbar toggle={this.toggleSideHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideHandler}/>
                <main className={classes.Content}> {this.props.children} </main>
            </Aux>
        )
    }

}


export default Layout;