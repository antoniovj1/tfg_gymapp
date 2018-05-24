import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import UserLeft from '../components/profile/UserLeft';
import Total from '../components/profile/Total';
import LastMuscleStats from '../components/profile/LastMuscleStats';
import LastExersiceStats from '../components/profile/LastExersiceStats';
import { fetchActualUser, fetchStats } from '../redux/actions/userActions';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

const mapStateToProps = store => ({ user: store.user.user, stats: store.user.stats });
const mapDispatchToProps = dispatch => ({
  fetchActualUser: () => {
    dispatch(fetchActualUser());
  },
  fetchStats: () => {
    dispatch(fetchStats());
  }
});
class Profile extends React.Component {
  componentWillMount() {
    this.props.fetchActualUser();
    this.props.fetchStats();
  }
  render() {
    const { classes } = this.props;
    const { user } = this.props;
    const { totals, musclestats: muscleStats, topn } = this.props.stats;

    if (Array.isArray(user) || !topn) {
      return null;
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <UserLeft user={user} />
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={24}>
              <Grid item xs={4}>
                <Total title="Total weight (Kg)" value={totals && totals.weight} />
              </Grid>
              <Grid item xs={4}>
                <Total title="Total time (s)" value={totals && totals.time} />
              </Grid>
              <Grid item xs={4}>
                <Total title="Total repetitions" value={totals && totals.repetitions} />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <LastMuscleStats key="sevenDaysStats" range={7} muscleStats={muscleStats} />
                  </Grid>
                  <Grid item xs={6}>
                    <LastMuscleStats key="thirtyDaysStats" range={30} muscleStats={muscleStats} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <LastExersiceStats topn={topn} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

/* eslint react/forbid-prop-types: 0 */
Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.any.isRequired,
  stats: PropTypes.object.isRequired,
  fetchActualUser: PropTypes.func.isRequired,
  fetchStats: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));
