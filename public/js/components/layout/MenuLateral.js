import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import { Link } from "react-router";
import AppBar from 'material-ui/AppBar';


export default class MenuLateral extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    render() {
        return (
            <div>
                <IconButton>
                <NavigationMenu
                    onClick={this.handleToggle}
                />
                </IconButton>
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <AppBar title="Navigation" onClick={this.handleClose}/>

                    <Link to='/'>  <MenuItem onClick={this.handleClose}>Home</MenuItem> </Link>
                    <Link to='/profile'> <MenuItem onClick={this.handleClose}>Profile</MenuItem> </Link>
                </Drawer>
            </div>
        );
    }
}