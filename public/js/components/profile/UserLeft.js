import React from "react";
import Paper from 'material-ui/Paper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import {indigo500} from 'material-ui/styles/colors';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import Face from 'material-ui/svg-icons/action/face';
import Schedule from 'material-ui/svg-icons/action/schedule';
import Straighten from 'material-ui/svg-icons/image/straighten';
import Fitness from 'material-ui/svg-icons/places/fitness-center';
import {connect} from "react-redux"

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

      let jsx;

      if (user) {
        let created_at = user.created_at;

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
