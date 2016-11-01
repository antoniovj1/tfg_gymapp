import React from "react";
import UserLeft from "../components/profile/UserLeft";
import { connect } from "react-redux"


import { fetchActualUser } from "../actions/userActions"

@connect((store) => {
  return {
    user: store.user.user,
  };
})

export default class Session extends React.Component {

  componentWillMount() {
      this.props.dispatch(fetchActualUser())
    }

  render() {
    const {user} = this.props;
    var datos;

    if(this.props.user.length){
      const {username,name,birthday,height,weight} = user[0];
      datos = (   <div class = "row text-left">
                      <h4> Nombre usuario: {username} </h4>
                      <h4> Nombre: {name} </h4>
                      <h4> Peso: {weight} </h4>
                      <h4> Altura: {height} </h4>
                      <h4> Nacimiento: {birthday} </h4>
                  </div>
              );
    } else {
      <h4> Cargando </h4>
    }

    return (
      <div class="container">
          <div class="row  text-center">
            <div class="col-md-3 well">
              <UserLeft/>
              {datos}
      		  </div>
      		  <div class="col-md-9">

      		  </div>
      </div>
      </div>

    );
  }
}
