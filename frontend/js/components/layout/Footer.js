import React from "react";

const divStyle = {
    margin: '20px 0 20px 0'
};


export default class Footer extends React.Component {
  render() {
    return (
      <div>
        <footer style={divStyle}>
          <div class="container">
            IV UGR - Antonio de la Vega
          </div>
        </footer>
      </div>
    );
  }
}
