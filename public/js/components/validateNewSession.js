const validate = values => {
    const errors = {}

    if (!values.date) {
        errors.date = 'Required'
    }

    if (!values.time) {
        errors.time = 'Required'

    } else {
        var regex = /([01]\d|2[0-3]):([0-5]\d)/;

        if (!regex.test(values.time))
            errors.time = 'HH:MM'
    }

    if (!values.exercises || !values.exercises.length) {
        errors.exercises = { _error: 'At least one exercise must be entered' }
    } else {
        const exercisesArrayErrors = []
        values.exercises.forEach((exercise, exerciseIndex) => {

            const exerciseErrors = {}

            //Si hay errror en el ejercicio
            if (!exercise || !exercise.exerciseName) {
                exerciseErrors.exerciseName = 'Required'
                exercisesArrayErrors[exerciseIndex] = exerciseErrors
                //Si no se han añadido series
            } else if (!exercise.set) {
                if (!exerciseErrors.set) {
                    exerciseErrors.set = []
                }
                exerciseErrors.set._error = 'At least one set must be entered'
                exercisesArrayErrors[exerciseIndex] = exerciseErrors
                //Si hay ejercicio y series
            } //else {
            const setArrayErrors = []
            if (exercise.set) {
                exercise.set.forEach((s, sIndex) => {
                    setArrayErrors[sIndex] = {}

                    if (!s.repetitions) {
                        setArrayErrors[sIndex].repetitions = 'Required'
                    } else {
                        var reg = /^\d+$/;
                        if (!reg.test(s.repetitions))
                            setArrayErrors[sIndex].repetitions = 'Integer'
                    }

                    if (!s.weight) {
                        setArrayErrors[sIndex].weight = 'Required'
                    } else {
                        var reg = /^-?\d*(\.\d+)?$/;
                        if (!reg.test(s.weight))
                            setArrayErrors[sIndex].weight = 'Number'
                    }

                    if (!s.rest) {
                        setArrayErrors[sIndex].rest = 'Required'
                    } else {
                        var reg = /^\d+$/;
                        if (!reg.test(s.rest))
                            setArrayErrors[sIndex].rest = 'Integer'
                    }
                })
            }

            if (setArrayErrors.length) {
                exerciseErrors.set = setArrayErrors
                exercisesArrayErrors[exerciseIndex] = exerciseErrors
            }

            //  }
        })
        if (exercisesArrayErrors.length) {
            errors.exercises = exercisesArrayErrors
        }
    }
    return errors
}

export default validate