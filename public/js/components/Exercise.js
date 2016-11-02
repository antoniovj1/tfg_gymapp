import React from "react";
import { Link } from 'react-router'

export default class Exercise extends React.Component {

  render() {

    const {group} = this.props;
    const {movement,set} = group;

    var i = 1;
    if(set){
      const mappedSets = set.map(set =>
        <div key= {set._id}>
        <div class="col-lg-3"> {i++} </div>
        <div class="col-lg-3"> {set.repetitions} </div>
        <div class="col-lg-3"> {set.weight}  </div>
        <div class="col-lg-3"> {set.rest}  </div>
        </div>
      )

      return (
        <div>
        <div class="row well text-center" key = {movement._id}>
        <h4> {movement.name} </h4>
        <div class="col-lg-3"># </div>
        <div class="col-lg-3">Reps </div>
        <div class="col-lg-3">Peso </div>
        <div class="col-lg-3">Rest </div>
        {mappedSets}
        </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
