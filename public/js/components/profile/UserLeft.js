import React from "react";
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import { indigo500 } from 'material-ui/styles/colors';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import Face from 'material-ui/svg-icons/action/face';
import Schedule from 'material-ui/svg-icons/action/schedule';
import Home from 'material-ui/svg-icons/action/home';
import Stats from 'material-ui/svg-icons/action/timeline';
import LogOut from 'material-ui/svg-icons/action/power-settings-new';
import Straighten from 'material-ui/svg-icons/image/straighten';
import Fitness from 'material-ui/svg-icons/places/fitness-center';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import { Link } from 'react-router';
import { connect } from "react-redux"
import { logoutUser } from "../../actions/loginActions"

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '16px 32px 16px 0',
  }
};

@connect((store) => {
  return {
    login: store.login,
  };
})

export default class Session extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const user = this.props.user;

    var jsx;

    if (user) {
      var created_at = user.created_at;

      if (created_at) {
        created_at = created_at.substring(0, 10);
      }

      jsx = (
        
    <MuiThemeProvider muiTheme={getMuiTheme()}>        
      <div>
        <div>
          <Paper style={style.paper}>
            <div>
              <img src={user.picture} width="100" height="100" class="img-circle" alt=""></img>
            </div>
            <Menu>
              <Link to={`/`}>
                <MenuItem primaryText="Home" leftIcon={<Home />} />
              </Link>
              <MenuItem primaryText="Stats" leftIcon={<Stats />} />
              <MenuItem primaryText="Edit" leftIcon={<Edit />} />
              <Link to={`/`}>
                <MenuItem primaryText="Logout" leftIcon={<LogOut />} onClick={() => this.props.dispatch(logoutUser())} />
              </Link>
            </Menu>
            <Divider inset={true} />
            <List>
              <ListItem
                leftIcon={<Face color={indigo500} />}
                primaryText={user.name}
                secondaryText="Nombre usuario"
              />
              <ListItem
                leftIcon={<Fitness color={indigo500} />}
                primaryText="74"
                secondaryText="Peso (kg)"
              />
              <ListItem
                leftIcon={<Straighten color={indigo500} />}
                primaryText="172"
                secondaryText="Altura (cm)"
              />
              <ListItem
                leftIcon={<CommunicationEmail color={indigo500} />}
                primaryText={user.email}
                secondaryText="Email"
              />
              <ListItem
                leftIcon={<Schedule color={indigo500} />}
                primaryText={created_at}
                secondaryText="Fecha registro"
              />
            </List>
          </Paper>
        </div>
      </div>
      </MuiThemeProvider>
      );

    } else {
      jsx = (
        <MuiThemeProvider muiTheme={getMuiTheme()}>        
         <h1> Cargando </h1>
        </MuiThemeProvider>
    )
    }

    return (jsx);
  }
}
