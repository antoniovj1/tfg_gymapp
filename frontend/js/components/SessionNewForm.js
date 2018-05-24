import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import injectTapEventPlugin from 'react-tap-event-plugin';

import validate from './validateNewSession';
import fetchMovements from '../redux/actions/movementsActions';

injectTapEventPlugin();

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

const movementsArray = [];

const ExampleCustomInput = () => ({
  render() {
    console.log(this.props.value);
    return (
      <button
        style={{
          borderLeftWidth: '0px',
          borderTopWidth: '0px',
          borderRightWidth: '0px',
          borderBottomWidth: '1px',
          width: '127px',
          height: '11px',
          paddingTop: '6px',
          paddingBottom: '7px'
        }}
        onClick={this.props.onClick}
      >
        {this.props.value.substring(0, 10)}
      </button>
    );
  }
});

ExampleCustomInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};

const renderDatePicker = ({ input, placeholder, defaultValue, meta: { touched, error } }) => (
  <div style={{ marginTop: '15px' }}>
    <DatePicker
      customInput={<ExampleCustomInput />}
      {...input}
      dateForm="DD/MM/YYYY"
      selected={input.value ? moment(input.value) : null}
      todayButton="Today"
      placeholderText="Click to select a date"
    />
    {touched && error && <span>{error}</span>}
  </div>
);

const renderSet = ({ fields, meta: { touched, error } }) => (
  <ul>
    {touched && error && <span>{error}</span>}
    {fields.map((set, index) => (
      <div>
        <div className="form-group">
          <Field
            name={`${set}.repetitions`}
            type="text"
            component={TextField}
            label={`Repeticiones #${index + 1}`}
          />
          <Field name={`${set}.weight`} type="text" component={TextField} label={`Peso #${index + 1}`} />
          <Field name={`${set}.rest`} type="text" component={TextField} label={`Descanso #${index + 1}`} />
          <Button variant="flat" color="secondary" onClick={() => fields.remove(index)}>
            Remove Set
          </Button>
        </div>
      </div>
    ))}
    <Button
      variant="raised"
      color="primary"
      // className={classes.button}
      onClick={() => fields.push({})}
      type="submit"
    >
      Add Set
    </Button>

    {error && <li className="error">{error}</li>}
  </ul>
);

const renderExercise = ({ fields, meta: { touched, error } }) => (
  <ul>
    {touched && error && <span>{error}</span>}

    {fields.map((exercise, index) => (
      <div key={exercise.index}>
        <h4>exercise #{index + 1}</h4>
        <Field name={`${exercise}.exerciseName`} component="select" label="Name">
          <option value="" key="movOpt">
            Select an exercise...
          </option>
          {movementsArray.map((movement, index2) => (
            <option value={movement} key={movement.index2}>
              {movement}
            </option>
          ))}
        </Field>
        <Button variant="flat" color="secondary" onClick={() => fields.remove(index)}>
          Remove Exercise
        </Button>
        <FieldArray name={`${exercise}.sets`} component={renderSet} />{' '}
      </div>
    ))}

    <Button variant="flat" color="primary" onClick={() => fields.push({})}>
      Add Exercise
    </Button>
  </ul>
);

const mapStateToProps = store => ({ movements: store.movements.movements });
class SessionNewForm extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchMovements());
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, movements, classes } = this.props;

    if (movementsArray.length !== movements.length) {
      movements.forEach(session => {
        movementsArray.push(session.name);
      });
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center">
          <Grid item xs={6}>
            <form onSubmit={handleSubmit}>
              <Grid container justify="center" spacing={40}>
                <Grid item>
                  <Field name="date" type="text" component={renderDatePicker} label="Date" />
                </Grid>
                <Grid item>
                  <Field name="time" type="text" component={TextField} label="Time" />
                </Grid>
              </Grid>
              <Grid container justify="center" spacing={40}>
                <FieldArray name="exercises" component={renderExercise} />
              </Grid>

              <Grid container justify="center" spacing={40}>
                <Grid item>
                  <Button
                    variant="raised"
                    color="primary"
                    className={classes.button}
                    disabled={submitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="raised"
                    className={classes.button}
                    disabled={pristine || submitting}
                    onClick={reset}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

/* eslint react/forbid-prop-types: 0 */
SessionNewForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'newSessionForm', // a unique identifier for this form
  validate,
  touchOnBlur: false
})(connect(mapStateToProps, null)(withStyles(styles)(SessionNewForm)));
