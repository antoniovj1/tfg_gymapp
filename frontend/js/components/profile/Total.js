import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: theme.spacing.unit * 3,
    textAlign: 'center'
  }),
  title: {
    color: 'black',
    textShadow: '1px 0 #888888',
    letterSpacing: '1px',
    fontWeight: 'bold'
  },
  value: {
    color: '#888888',
    textShadow: '1px 0 #888888',
    letterSpacing: '1px',
    fontWeight: 'bold'
  }
});

const Total = props => {
  const { classes, title, value } = props;

  return (
    <Paper className={classes.root} elevation={4}>
      <h4 className={classes.title}>{title}</h4>
      <span className={classes.value}>{value}</span>
    </Paper>
  );
};

/* eslint react/forbid-prop-types: 0 */
Total.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default withStyles(styles)(Total);
