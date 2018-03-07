import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import { connect } from 'react-redux';

import Footer from '../components/layout/Footer';
import Nav from '../components/layout/Nav';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    paddingTop: 20
  }
});

class AppView extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { location, classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid item xs={12}>
          <Nav location={location} />
        </Grid>
        <Grid className={classes.container} container spacing={24}>
          <Grid item xs={12}>
            {this.props.children}
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}

AppView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null, null)(withStyles(styles)(AppView));
