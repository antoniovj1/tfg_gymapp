import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const colors = [
  { solid: '#1823f2', trans: '#bcbffb' },
  { solid: '#18f226', trans: '#c0fbc4' },
  { solid: '#f21818', trans: '#fccaca' },
  { solid: '#9318f2', trans: '#e4c5fc' },
  { solid: '#fff314', trans: '#fffbb3' }
];

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: theme.spacing.unit / 2.5
  })
});

const LastExersiceStats = props => {
  const { classes, topn } = props;
  const datasets = [];
  let labels = [];

  if (topn) {
    topn.forEach((element, index) => {
      const obj = {};
      obj.label = element.name;
      const data = [];
      element.values.forEach(value => {
        const date = format(new Date(value.timestamp), 'DD-MM-YY');
        const obj2 = {};
        obj2.t = date;
        obj2.y = value.maxWeight;

        if (!(date in labels)) {
          labels.push(date);
        }
        data.push(obj2);
      });
      obj.data = data;
      obj.backgroundColor = colors[index % 5].trans;
      obj.borderColor = colors[index % 5].solid;
      datasets.push(obj);
    });

    labels = labels.filter((item, pos) => labels.indexOf(item) === pos);

    const data = {
      labels,
      datasets
    };

    const options = {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          fontSize: 10,
          padding: 6
        }
      }
    };

    return (
      <Paper className={classes.root} elevation={4}>
        <Line data={data} height={80} options={options} />
      </Paper>
    );
  }
  return null;
};

/* eslint react/forbid-prop-types: 0 */
LastExersiceStats.propTypes = {
  classes: PropTypes.object.isRequired,
  topn: PropTypes.object.isRequired
};

export default withStyles(styles)(LastExersiceStats);
