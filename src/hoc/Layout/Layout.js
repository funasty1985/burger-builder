import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SiderDrawer';

class Layout extends Component {
    state = {
        showSiderDrawer: false
    }

    siderDrawerCloseHandler = () => {
        this.setState({showSiderDrawer: false})
    }

    siderDrawerToggleHandler = ()=> {
        // this.setState({showSiderDrawer: !this.state.showSiderDrawer}) this is not good as it will cause unexpected result
        this.setState((preState) => {
            return {showSiderDrawer: !preState.showSiderDrawer}
        })
    }

    render () {
        return (
            <Aux >
                <Toolbar drawerToggleClicked={this.siderDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSiderDrawer} closed={this.siderDrawerCloseHandler}/>
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
            </Aux>
        )
    }
}
export default Layout;
