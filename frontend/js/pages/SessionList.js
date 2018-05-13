import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import ContentAdd from 'material-ui-icons/Add';
import Grid from 'material-ui/Grid';

import SessionItem from '../components/SessionItem';

import { fetchSessions } from '../redux/actions/sessionsActions';

// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

const mapStateToProps = store => ({ sessions: store.sessions.sessions });
class Session extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchSessions());
  }
  render() {
    const { classes, sessions } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center">
          <Grid item xs={6}>
            <Link to="/session/new">
              <Button variant="fab">
                {' '}
                <ContentAdd />{' '}
              </Button>{' '}
            </Link>
            <div>
              {' '}
              {typeof sessions !== 'undefined' &&
              sessions !== null &&
              sessions.length !== null &&
              sessions.length > 0 ? (
                sessions.map(session => <SessionItem key={session._id} session={session} />)
              ) : (
                <h1> No sessions found </h1>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

/* eslint react/forbid-prop-types: 0 */
Session.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Session));
