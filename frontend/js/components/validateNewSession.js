const validate = values => {
  const errors = {};

  if (!values.date) {
    errors.date = 'Required';
  } else {
    const regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

    if (!regex.test(values.date)) errors.date = 'DD-MM-YYYY';
  }

  if (!values.time) {
    errors.time = 'Required';
  } else {
    const regex = /([01]\d|2[0-3]):([0-5]\d)/;

    if (!regex.test(values.time)) errors.time = 'HH:MM';
  }

  if (!values.exercises || !values.exercises.length) {
    errors.exercises = { _error: 'At least one exercise must be entered' };
  } else {
    const exercisesArrayErrors = [];

    values.exercises.forEach((exercise, exerciseIndex) => {
      const exerciseErrors = {};

      // Si hay errror en el ejercicio
      if (!exercise || !exercise.exerciseName) {
        exerciseErrors.exerciseName = 'Required';
        exercisesArrayErrors[exerciseIndex] = exerciseErrors;
        // Si no se han añadido series
      }
      if (!exercise.set) {
        if (!exerciseErrors.set) {
          exerciseErrors.set = [];
        }
        exerciseErrors.set._error = 'At least one set must be entered';
        exercisesArrayErrors[exerciseIndex] = exerciseErrors;
        // Si hay ejercicio y series
      }

      const setArrayErrors = [];

      if (exercise.sets) {
        exercise.sets.forEach((s, sIndex) => {
          setArrayErrors[sIndex] = {};

          if (!s.repetitions) {
            setArrayErrors[sIndex].repetitions = 'Required';
          } else {
            const reg = /^\d+$/;
            if (!reg.test(s.repetitions)) setArrayErrors[sIndex].repetitions = 'Integer';
          }

          if (!s.weight) {
            setArrayErrors[sIndex].weight = 'Required';
          } else {
            const reg = /^-?\d*(\.\d+)?$/;
            if (!reg.test(s.weight)) setArrayErrors[sIndex].weight = 'Number';
          }

          if (!s.rest) {
            setArrayErrors[sIndex].rest = 'Required';
          } else {
            const reg = /^\d+$/;
            if (!reg.test(s.rest)) setArrayErrors[sIndex].rest = 'Integer';
          }
        });
      }

      if (setArrayErrors.length) {
        exerciseErrors.sets = setArrayErrors;
        exercisesArrayErrors[exerciseIndex] = exerciseErrors;
      }
    });
    if (exercisesArrayErrors.length) {
      errors.exercises = exercisesArrayErrors;
    }
  }
  return errors;
};

export default validate;
