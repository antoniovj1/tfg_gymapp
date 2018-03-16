import React from "react";
import Paper from "material-ui/Paper";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import List, { ListItem, ListItemText } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import AccountCircle from "material-ui-icons/AccountCircle";
import FitnessCenter from "material-ui-icons/FitnessCenter";
import CommunicationEmail from "material-ui-icons/Email";
import Schedule from "material-ui-icons/Schedule";
import Straighten from "material-ui-icons/Straighten";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

const mapStateToProps = store => ({ login: store.login });

class Session extends React.Component {
  render() {
    const { classes, user } = this.props;
    let jsx;

    if (user) {
      let { created_at: createdAt } = user;

      if (createdAt) {
        createdAt = createdAt.substring(0, 10);
      }

      jsx = (
        <Paper className={classes.root} elevation={4}>
          <div>
            <img
              src={user.picture}
              width="100"
              height="100"
              className="img-circle"
              alt=""
            />
          </div>

          <List>
            <ListItem>
              <Avatar>
                <AccountCircle />
              </Avatar>
              <ListItemText primary={user.name} secondary="Nombre usuario" />
            </ListItem>
            <ListItem>
              <Avatar>
                <FitnessCenter />
              </Avatar>
              <ListItemText primary="74" secondary="Peso (kg)" />
            </ListItem>
            <ListItem>
              <Avatar>
                <Straighten />
              </Avatar>
              <ListItemText primary="172" secondary="Altura (cm)" />
            </ListItem>
            <ListItem>
              <Avatar>
                <CommunicationEmail />
              </Avatar>
              <ListItemText primary={user.email} secondary="Email" />
            </ListItem>
            <ListItem>
              <Avatar>
                <Schedule />
              </Avatar>
              <ListItemText primary={createdAt} secondary="Fecha registro" />
            </ListItem>
          </List>
        </Paper>
      );
    } else {
      jsx = <h1> Cargando </h1>;
    }

    return jsx;
  }
}

/* eslint react/forbid-prop-types: 0 */
Session.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, null)(withStyles(styles)(Session));
