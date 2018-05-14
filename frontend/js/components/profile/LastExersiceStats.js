import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

const LastExersiceStats = props => {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={4}>
      AQUI EVOLUCION PESOS TOP 5 EJERCIOS
    </Paper>
  );
};

/* eslint react/forbid-prop-types: 0 */
LastExersiceStats.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LastExersiceStats);
