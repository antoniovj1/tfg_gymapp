import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#00C49F',
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    fontSize: 14
  },
  table: {
    minWidth: 700
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
});

const CustomizedTable = props => {
  const { classes } = props;
  const { sets } = props.exercise;
  const { movement } = props.exercise;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>{`#${movement.name}`}</CustomTableCell>
            <CustomTableCell numeric>Reps</CustomTableCell>
            <CustomTableCell numeric>Weight</CustomTableCell>
            <CustomTableCell numeric>Rest</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sets.map((set, index) => (
            <TableRow className={classes.row} key={index}>
              <CustomTableCell>{`Serie número ${index + 1}`}</CustomTableCell>
              <CustomTableCell numeric>{set.repetitions}</CustomTableCell>
              <CustomTableCell numeric>{set.weight}</CustomTableCell>
              <CustomTableCell numeric>{set.rest}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedTable);
