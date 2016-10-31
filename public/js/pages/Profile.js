import React from "react";
import UserLeft from "../components/profile/UserLeft";


export default class Session extends React.Component {
  render() {

    return (
      <div class="container">
          <div class="row  text-center">
            <div class="col-md-3 well">
              <UserLeft/>
      		  </div>
      		  <div class="col-md-9">
                <div >
                  <h1> Antonio de la Vega Jiménez </h1>
                 </div>
      		  </div>
      </div>
      </div>

    );
  }
}
