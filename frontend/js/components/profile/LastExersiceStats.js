import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Line } from 'react-chartjs-2';
import * as zoom from 'chartjs-plugin-zoom';
import { format } from 'date-fns';

function removeDuplicates(arr, prop) {
  const obj = {};
  return Object.keys(
    arr.reduce((prev, next) => {
      if (!obj[next[prop]]) {
        obj[next[prop]] = next;
      } else if (obj[next[prop]].y < next.y) {
        obj[next[prop]] = next;
      }
      return obj;
    }, obj)
  ).map(i => obj[i]);
}

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
  let maxAbs = 0;

  if (topn) {
    topn.forEach((element, index) => {
      const obj = {};
      obj.label = element.name;
      const data = [];
      element.values.forEach(value => {
        const date = new Date(value.timestamp);
        const obj2 = {};

        if (!(date in obj2)) obj2.t = date;
        obj2.y = value.maxWeight;

        if (value.maxWeight > maxAbs) maxAbs = value.maxWeight;

        if (!(date in labels)) {
          labels.push(date);
        }
        data.push(obj2);
      });

      obj.data = removeDuplicates(data, 't');
      obj.fill = false;
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
      },
      pan: {
        enabled: true,
        mode: 'x'
      },
      zoom: {
        enabled: true,
        mode: 'x'
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              displayFormats: {
                millisecond: "MMM DD 'YY",
                second: "MMM DD 'YY",
                minute: "MMM DD 'YY",
                hour: "MMM DD 'YY",
                day: "MMM DD 'YY",
                week: "MMM DD 'YY",
                month: "MMM DD 'YY",
                quarter: "MMM DD 'YY",
                year: "MMM DD 'YY"
              },
              tooltipFormat: "MMMM D 'YY"
            },
            position: 'bottom'
          }
        ],
        yAxes: [
          {
            ticks: {
              max: maxAbs + 5,
              min: 0
            }
          }
        ]
      },
      hover: {
        mode: 'nearest', // only hovers items under the mouse
        intersect: false
      },
      responsive: true,
      maintainAspectRatio: false
    };

    return (
      <Paper className={classes.root} elevation={4}>
        <Line data={data} height={200} options={options} />
      </Paper>
    );
  }
  return null;
};

/* eslint react/forbid-prop-types: 0 */
LastExersiceStats.propTypes = {
  classes: PropTypes.object.isRequired,
  topn: PropTypes.any.isRequired
};

export default withStyles(styles)(LastExersiceStats);
