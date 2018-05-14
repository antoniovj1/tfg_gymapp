import React from 'react';
import { connect } from 'react-redux';
import UserLeft from '../components/profile/UserLeft';
import Total from '../components/profile/Total';
import LastMuscleStats from '../components/profile/LastMuscleStats';
import LastExersiceStats from '../components/profile/LastExersiceStats';
import { fetchActualUser } from '../redux/actions/userActions';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

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

const mapStateToProps = store => ({ user: store.user.user });
const mapDispatchToProps = dispatch => ({
  fetchActualUser: () => {
    dispatch(fetchActualUser());
  }
});
class Session extends React.Component {
  componentWillMount() {
    this.props.fetchActualUser();
  }
  render() {
    const { classes } = this.props;

    if (Array.isArray(this.props.user)) {
      return null;
    }
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <UserLeft user={this.props.user} />
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={24}>
              <Grid item xs={4}>
                <Total />
              </Grid>
              <Grid item xs={4}>
                <Total />
              </Grid>
              <Grid item xs={4}>
                <Total />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <LastMuscleStats />
                  </Grid>
                  <Grid item xs={6}>
                    <LastMuscleStats />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <LastExersiceStats />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Session.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Session));
