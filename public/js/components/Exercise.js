import React from "react";
import { Link } from 'react-router'

export default class Exercise extends React.Component {

  render() {

    const {exercise} = this.props;

    const {movement, sets} = exercise;

    var i = 1;
    if (sets) {
      const mappedSets = sets.map(set =>
        <tr key={set._id}>
          <th scope="row">{i++}</th>
          <td>{set.repetitions}</td>
          <td>{set.weight}</td>
          <td>{set.rest}</td>
        </tr>
      )

      return (
        <div class="row well text-center" key={movement._id}>
          <div>
            <h4> <strong> {movement.name} </strong> </h4>
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Reps</th>
                  <th>Peso</th>
                  <th>Rest</th>
                </tr>
              </thead>
              <tbody>
                {mappedSets}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
