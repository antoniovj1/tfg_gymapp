import React from 'react';
import { connect } from 'react-redux';
import Tabs, { Tab } from 'material-ui/Tabs';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import Exercise from '../components/Exercise';
import { dateFormat, secondsToHms } from '../utils/time';
import { fetchCompleteSession } from '../redux/actions/sessionsActions';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#B0171F', '#7FFF00', '#FFB90F', '#FF0000'];

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper
  }
});

@connect(store => ({
  completeSession: store.sessions.completeSession
}))
class SessionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'a'
    };
  }

  componentDidMount() {
    const url = this.props.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);
    this.props.dispatch(fetchCompleteSession(id));
  }

  handleChange = (event, value) => {
    this.setState({
      selectedTab: value
    });
  };

  render() {
    const { completeSession } = this.props;
    let time;
    let date;
    let exercises;
    let pesoTot = 0;
    let nSets = 0;
    const muscleStats = {};
    let norm = 0;
    const muscleStatsNorm = [];

    if (completeSession) {
      const { session } = completeSession;
      const { id } = session;
      ({ exercises, date, time } = session);

      if (session) {
        if (time !== 'undefinded') time = secondsToHms(time);

        if (date !== 'undefinded') date = dateFormat(date);
      }

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

        let muscleStat;
        for (muscleStat in muscleStats) {
          const val = Math.round(muscleStats[muscleStat] / norm * 100);
          muscleStatsNorm.push({ name: muscleStat, value: val });
        }
      }

      if (exercises) {
        exercises.forEach(exercise => {
          const { sets } = exercise;
          sets.forEach(set => {
            pesoTot += set.weight * set.repetitions;
            nSets += 1;
          });
        });
      }
    }

    if (exercises) {
      return (
        <div>
          <Tabs value={this.state.selectedTab} onChange={this.handleChange}>
            <Tab label="Resumen" value="a">
              <div className="row">
                <div className="col-sm-1" />

                <div className="col-sm-5">
                  <div style={styles.card}>
                    <div style={styles.container}>
                      <h4>
                        <b>Fecha</b>
                      </h4>
                      <p>{date}</p>
                    </div>
                  </div>
                </div>

                <div className="col-sm-5">
                  <div style={styles.card}>
                    <div style={styles.container}>
                      <h4>
                        <b>Tiempo</b>
                      </h4>
                      <p>{time}</p>
                    </div>
                  </div>
                  <div className="col-sm-1" />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-1" />

                <div className="col-sm-5">
                  <div style={styles.card}>
                    <div style={styles.container}>
                      <h4>
                        <b>Total Series</b>
                      </h4>
                      <p>{nSets}</p>
                    </div>
                  </div>
                </div>

                <div className="col-sm-5">
                  <div style={styles.card}>
                    <div style={styles.container}>
                      <h4>
                        <b>Peso Total</b>
                      </h4>
                      <p>{pesoTot} KG</p>
                    </div>
                  </div>
                  <div className="col-sm-1" />
                </div>
              </div>

              <div className="col-sm-3" />
              <div
                className="col-sm-6"
                style={{
                  paddingTop: '3em',
                  width: '100%',
                  height: '25em'
                }}
              >
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={muscleStatsNorm}
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                      nameKey="name"
                      fill="#8884d8"
                      paddingAngle={5}
                      label
                    >
                      {muscleStatsNorm.map((entry, index) => (
                        <Cell
                          name={entry.name.toUpperCase()}
                          key={`cell-${entry.index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend align="center" layout="horizontal" verticalAlign="top" height={100} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="col-sm-3" />
            </Tab>

            <Tab label="Detalles" value="b">
              <div className="row" style={styles.divStyle}>
                {exercises.map(exercise => <Exercise key={exercise._id} exercise={exercise} />)}
              </div>
            </Tab>
          </Tabs>
        </div>
      );
    }
    return (
      <div>
        <h1> Wops no information yet </h1>
      </div>
    );
  }
}

export default withStyles(styles)(SessionDetail);
