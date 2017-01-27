import React from "react";
import { connect } from "react-redux"
import Exercise from "../components/Exercise"
import { secondsToHms, dateFormat } from "../utils"
import { fetchCompleteSession } from "../actions/sessionsActions"
import { Tabs, Tab } from 'material-ui/Tabs';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { ResponsiveContainer, PieChart, Pie, Sector, Cell, Legend } from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#B0171F", "#7FFF00", "#FFB90F", "#FF0000",];

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  divStyle: {
    color: 'blue',
    width: 95 + '%',
    margin: '0 auto',
    textAlign: 'center',
  },
  card: {
    "boxShadow": "0 4px 8px 0 rgba(0,0,0,0.2)",
    "transition": "0.3s",
    "width": "100%",
    "borderRadius": "5px",
    textAlign: "center"
  },
  card_hover: {
    "boxShadow": "0 8px 16px 0 rgba(0,0,0,0.2)"
  },
  img: {
    "borderRadius": "5px 5px 0 0"
  },
  container: {
    "padding": "2px 16px"
  },
}



@connect((store) => {
  return {
    completeSession: store.sessions.completeSession,
  };
})

export default class SessionDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
    this.constructor.childContextTypes = {
      muiTheme: React.PropTypes.object.isRequired,
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  componentDidMount() {
    var url = this.props.location.pathname;
    var id = url.substring(url.lastIndexOf("/") + 1);
    this.props.dispatch(fetchCompleteSession(id));
  }


  render() {
    const {completeSession} = this.props;

    if (completeSession) {
      var {session} = completeSession;
      var {id, date, time, exercises} = session;

      if (session) {
        if (time != 'undefinded')
          time = secondsToHms(time);

        if (typeof date != 'undefinded')
          date = dateFormat(date);
      }


      var muscleStats = {}
      var norm = 0;
      var muscleStatsNorm = []

      if (exercises) {
        exercises.forEach(function (exercise) {
          var muscles = exercise.movement.muscles;
          muscles.forEach(function (muscle) {

            if (muscle.name in muscleStats) {
              muscleStats[muscle.name] += muscle.percentage;
            } else {
              muscleStats[muscle.name] = muscle.percentage;
            }

            norm += muscle.percentage;

          });
        });

        for (var muscleStat in muscleStats) {
          var val = Math.round((muscleStats[muscleStat] / norm) * 100);
          muscleStatsNorm.push({ name: muscleStat, value: val })
        }
      }

      var pesoTot = 0;
      var nSets = 0;

      if (exercises) {
        exercises.forEach(function (exercise) {
          var sets = exercise.sets;
          sets.forEach(function (set) {
            pesoTot += set.weight * set.repetitions;
            nSets++;
          });
        });
      }
    }

    if (exercises) {
      return (

        <Tabs value={this.state.value} onChange={this.handleChange} >
          <Tab label="Resumen" value="a" >

            <div class="row">

              <div class="col-sm-1" ></div>

              <div class="col-sm-5" >
                <div style={styles.card}>
                  <div style={styles.container}>
                    <h4><b>Fecha</b></h4>
                    <p>{date}</p>
                  </div>
                </div>
              </div>

              <div class="col-sm-5" >
                <div style={styles.card}>
                  <div style={styles.container}>
                    <h4><b>Tiempo</b></h4>
                    <p>{time}</p>
                  </div>
                </div>
                <div class="col-sm-1" ></div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-1" ></div>

              <div class="col-sm-5" >
                <div style={styles.card}>
                  <div style={styles.container}>
                    <h4><b>Total Series</b></h4>
                    <p>{nSets}</p>
                  </div>
                </div>
              </div>

              <div class="col-sm-5" >
                <div style={styles.card}>
                  <div style={styles.container}>
                    <h4><b>Peso Total</b></h4>
                    <p>{pesoTot} KG</p>
                  </div>
                </div>
                <div class="col-sm-1" ></div>
              </div>
            </div>

            <div class="col-sm-3"></div>
            <div class="col-sm-6" style={{ paddingTop: 3 + "em", width: 100 + "%", height: 25 + "em" }}>
              <ResponsiveContainer>
                <PieChart >
                  <Pie
                    data={muscleStatsNorm}
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    label
                    >
                    {
                      muscleStatsNorm.map((entry, index) =>
                        <Cell name={entry.name.toUpperCase()} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      )
                    }
                  </Pie>
                  <Legend align="center" layout="horizontal" verticalAlign="top" height={100} />

                </PieChart>
              </ResponsiveContainer>
            </div>
            <div class="col-sm-3"></div>
          </Tab>

          <Tab label="Detalles" value="b">
            <div class="row" style={styles.divStyle}>
              {exercises.map(function (exercise) {
                return <Exercise key={exercise._id} exercise={exercise} />;
              })}
            </div>
          </Tab>
        </Tabs>
      );

    } else {
      return null;
    }

  }
}
