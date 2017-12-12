import React from "react";
import { IndexLink, Link } from "react-router";
import { connect } from "react-redux"
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import IconMenu from 'material-ui/IconMenu';

import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { logoutUser } from "../../actions/loginActions"


const Login = (props) => (
  <FlatButton {...props} label="Login" containerElement={<Link to="/"/>} />  
);

Login.muiName = 'FlatButton';

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Home" containerElement={<Link to="/"/>}/>
    <MenuItem primaryText="Profile" containerElement={<Link to="/profile"/>}/>
    <MenuItem primaryText="Sign out" onClick={() => props.dispatch.dispatch(logoutUser())}/>
  </IconMenu>
);

Logged.muiName = 'IconMenu';


@connect((store) => {
  return { login: store.login, };
})

export default class Nav extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  render() {
    const {dispatch,login} = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>        
  
      <AppBar
        title="Training App"
        iconElementLeft={<IconButton><NavigationMenu /></IconButton>}
        iconElementRight={login.isAuthenticated ? <Logged dispatch ={{dispatch}}/> : <Login />}        
         />
      </MuiThemeProvider>        
    );
  }
}
