import React from 'react';
import {Link} from 'react-router';


class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-3'>
              <h3><strong>Infraestructura Virtual UGR</strong></h3>
            </div>
            <div className='col-sm-6'> </div>
            <div className='col-sm-3'>
              <h4><strong>Antonio de la Vega</strong></h4>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
