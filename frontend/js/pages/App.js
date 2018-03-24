import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import SessionList from './SessionList';
import Login from './Login';
import Profile from './Profile';
import SessionDetail from './SessionDetail';
import SessionNew from './SessionNew';
import Footer from '../components/layout/Footer';
import Nav from '../components/layout/Nav';
import Restricted from '../utils/restricted';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    paddingTop: 20
  }
});

const AppView = props => {
  const { location, classes } = props;

  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <Nav location={location} />
      </Grid>
      <Grid className={classes.container} container spacing={24}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path="/profile" component={Restricted(Profile)} />
            <Route exact path="/session/new" component={Restricted(SessionNew)} />
            <Route exact path="/session/:sessionid" component={Restricted(SessionDetail)} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={SessionList} />
          </Switch>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

/* eslint react/forbid-prop-types: 0 */
AppView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null, null)(withStyles(styles)(AppView));
