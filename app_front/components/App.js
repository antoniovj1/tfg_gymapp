import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Footer from './Footer';
import Navbar from './Navbar';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar history={this.props.history} />
        <Grid>
          <Row>
            <Col xs={12} md={2}>
            </Col>

            <Col xs={12} md={8}>
              {this.props.children}
            </Col>

            <Col xs={12} md={2}>
            </Col>
          </Row>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default App;
