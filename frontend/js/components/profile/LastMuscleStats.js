import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Doughnut } from 'react-chartjs-2';
import Palette from 'google-palette';
import Capitalize from 'capitalize';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 8,
    paddingBottom: 16,
    marginTop: theme.spacing.unit / 2.5
  }),
  center: {
    textAlign: 'center'
  }
});

const LastMuscleStats = props => {
  const { classes, muscleStats, range } = props;

  if (muscleStats) {
    const val = [];
    const label = [];
    Object.entries(muscleStats).forEach(([key, value]) => {
      val.push(value);
      label.push(Capitalize.words(key));
    });

    const colors = Palette('mpn65', val.length);
    for (let i = 0; i < colors.length; i += 1) {
      colors[i] = `#${colors[i]}`;
    }

    const pie = {
      datasets: [
        {
          data: val,
          backgroundColor: colors
        }
      ],
      labels: label
    };
    return (
      <Paper className={`${classes.root} ${classes.center}`} elevation={4}>
        <h4> Stats from last {range} days </h4>
        <Doughnut data={pie} />
      </Paper>
    );
  }
  return null;
};

/* eslint react/forbid-prop-types: 0 */
LastMuscleStats.propTypes = {
  classes: PropTypes.object.isRequired,
  muscleStats: PropTypes.object.isRequired,
  range: PropTypes.number.isRequired
};

export default withStyles(styles)(LastMuscleStats);
