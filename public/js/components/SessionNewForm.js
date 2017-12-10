import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import validate from './validateNewSession'

const style = {
  margin: 12,
};


var movementsArray = [];

const renderField = ({ input, label, meta: { touched, error }}) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    />
)


const renderExercise = ({ fields, meta: { touched, error } }) => (
  <ul>

    {touched && error && <span>{error}</span>}

    {fields.map((exercise, index) =>
      <div key={index}>
        <h4>exercise #{index + 1}</h4>

        <Field name={`${exercise}.exerciseName`} component="select" label="Name" >

          <option value="" key="">Select an exercise...</option >
          {movementsArray.map((colorOption, index2) =>
            <option value={colorOption} key={index2} >{colorOption}</option >)
          }

        </Field>

        <FlatButton label="Remove exercise" secondary={true} onClick={() => fields.remove(index)} />

        <FieldArray name={`${exercise}.sets`} component={renderSet} />
      </div>
    )}

    <FlatButton label="Add Exercise" primary={true} onClick={() => fields.push({})} />
  </ul>
)

const renderSet = ({ fields, meta: { touched, error } }) => (
  <ul>
    {touched && error && <span>{error}</span>}
    {fields.map((set, index) =>
      <div>
        <div class="form-group">

          <Field
            name={`${set}.repetitions`}
            type="text"
            component={renderField}
            label={`Repeticiones #${index + 1}`} />
          <Field
            name={`${set}.weight`}
            type="text"
            component={renderField}
            label={`Peso #${index + 1}`} />
          <Field
            name={`${set}.rest`}
            type="text"
            component={renderField}
            label={`Descanso #${index + 1}`} />
          <FlatButton label="Remove set" secondary={true} onClick={() => fields.remove(index)} />
        </div>
      </div>
    )}

    <FlatButton label="Add Set" primary={true} onClick={() => fields.push({})} />

    {error && <li className="error">{error}</li>}
  </ul>
)


import { fetchMovements } from "../actions/movementsActions"
import { connect } from "react-redux"



@connect((store) => {
  return {
    movements: store.movements.movements,
  };
})


class SessionNewForm extends React.Component {

  constructor() {
    super(...arguments);
  }

  componentWillMount() {
    this.props.dispatch(fetchMovements());
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }


  render() {
    const {handleSubmit, pristine, reset, submitting } = this.props

    const {movements} = this.props;


    if (movementsArray.length != movements.length) {
      movements.map(function (session) {
        movementsArray.push(session.name);
      })
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <form onSubmit={handleSubmit}>
          <Field name="date" type="text" component={renderField} label="Date" />
          <Field name="time" type="text" component={renderField} label="Time" />

          <FieldArray name="exercises" component={renderExercise} />
          <div>
            <RaisedButton label="Submit" primary={true} style={style} disabled={submitting} type="submit" />
            <RaisedButton label="Reset" style={style} disabled={pristine || submitting} onClick={reset} />
          </div>
        </form>
      </MuiThemeProvider>

    )
  }
}

export default reduxForm({
  form: 'newSessionForm',     // a unique identifier for this form
  validate,
})(SessionNewForm)