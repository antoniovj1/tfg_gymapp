import React from 'react';
import { connect } from 'react-redux';
import Tabs, { Tab } from 'material-ui/Tabs';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import { Doughnut } from 'react-chartjs-2';
import Exercise from '../components/Exercise';
import { dateFormat, secondsToHms } from '../utils/time';
import { fetchCompleteSession } from '../redux/actions/sessionsActions';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#B0171F', '#7FFF00', '#FFB90F', '#FF0000'];
const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit - 25,
    backgroundColor: theme.palette.background.paper
  }
});

const TabContainer = props => (
  <Typography component="div" style={{ padding: 8 * 3 }}>
    {props.children}
  </Typography>
);

const InfoCard = props => (
  <div style={styles.card}>
    <div style={styles.container}>
      <h4>
        <b>{props.cardText}</b>
      </h4>
      <p>{props.cardValue}</p>
    </div>
  </div>
);

const mapStateToProps = store => ({ completeSession: store.sessions.completeSession });

const mapDispatchToProps = dispatch => ({
  fetchCompleteSession: id => {
    dispatch(fetchCompleteSession(id));
  }
});

class SessionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0
    };
  }

  componentWillMount() {
    const id = this.props.match.params.sessionid;
    this.props.fetchCompleteSession(id);
  }

  handleChange = (event, value) => {
    this.setState({
      selectedTab: value
    });
  };

  render() {
    let completeSession;
    if (this.props.completeSession) {
      completeSession = this.props.completeSession;
    }

    if (completeSession) {
      const { exercises } = completeSession;
      const muscleStats = {};
      let { time } = completeSession;
      let { date } = completeSession;
      let pesoTot = 0;
      let nSets = 0;
      let norm = 0;

      if (time !== 'undefinded') time = secondsToHms(time);
      if (date !== 'undefinded') date = dateFormat(date);

      if (exercises) {
        exercises.forEach(exercise => {
          const { muscles } = exercise.movement;
          muscles.forEach(muscle => {
            if (muscle.name in muscleStats) {
              muscleStats[muscle.name] += muscle.percentage;
            } else {
              muscleStats[muscle.name] = muscle.percentage;
            }

            norm += muscle.percentage;
          });
        });

        const values = [];
        const labels = [];
        Object.keys(muscleStats).forEach(item => {
          values.push(Math.round(muscleStats[item] / norm * 100));
          labels.push(item.charAt(0).toUpperCase() + item.slice(1));
        });

        const data = {
          datasets: [
            {
              data: values,
              backgroundColor: COLORS
            }
          ],
          labels
        };

        exercises.forEach(exercise => {
          const { sets } = exercise;
          sets.forEach(set => {
            pesoTot += set.weight * set.repetitions;
            nSets += 1;
          });
        });

        const { selectedTab: value } = this.state;
        const { classes } = this.props;

        return (
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Resumen" />
                <Tab label="Detalles" />
              </Tabs>
            </AppBar>
            {value === 0 && (
              <TabContainer>
                <div className="row">
                  <div className="col-sm-1" />
                  <div className="col-sm-5">
                    <InfoCard cardText="Fecha" cardValue={date} />
                  </div>
                  <div className="col-sm-5">
                    <InfoCard cardText="Tiempo" cardValue={time} />
                    <div className="col-sm-1" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-1" />
                  <div className="col-sm-5">
                    <InfoCard cardText="Total Series" cardValue={nSets} />
                  </div>
                  <div className="col-sm-5">
                    <InfoCard cardText="Peso Total" cardValue={`${pesoTot}KG`} />
                    <div className="col-sm-1" />
                  </div>
                </div>

                <div className="col-sm-3" />
                <div
                  className="col-sm-6"
                  style={{
                    paddingTop: '3em',
                    width: '100%',
                    height: '35em'
                  }}
                >
                  <Doughnut data={data} width={100} height={20} />
                </div>
                <div className="col-sm-3" />
              </TabContainer>
            )}
            {value === 1 && (
              <TabContainer>
                <div className="row" style={styles.divStyle}>
                  {exercises.map(exercise => <Exercise key={exercise._id} exercise={exercise} />)}
                </div>
              </TabContainer>
            )}
          </div>
        );
      }
    }

    return (
      <div>
        <h1> Wops no information yet </h1>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SessionDetail));
