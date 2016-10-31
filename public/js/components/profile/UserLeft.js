import React from "react";


export default class Session extends React.Component {
  render() {

    return (
      <div>
        <div>
          <img src="https://pixabay.com/static/uploads/photo/2016/10/15/12/01/dog-1742295_960_720.jpg" class="img-responsive img-circle" alt=""></img>
        </div>

        <div class="profile-usermenu">
          <ul class="nav">
            <li class="active">
              <a href="#">
              <i class="glyphicon glyphicon-home"></i>
                Principal </a>
            </li>
            <li>
              <a href="#">
              <i class="glyphicon glyphicon-user"></i>
                 Ajustes </a>
            </li>
            <li>
              <a href="#" target="_blank">
              <i class="glyphicon glyphicon-ok"></i>
                Notificaciones </a>
            </li>
            <li>
              <a href="#">
              <i class="glyphicon glyphicon-flag"></i>
                Help </a>
            </li>
          </ul>
        </div>
      </div>

    );
  }
}
