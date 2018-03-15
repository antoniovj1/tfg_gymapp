import React from 'react';
import Drawer from 'material-ui/Drawer';
import { MenuItem } from 'material-ui/Menu';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

const styles = {
  list: {
    width: 250
  },
  listFull: {
    width: 'auto'
  }
};

class MenuLateral extends React.Component {
  componentWillMount() {
    this.setState({ open: false });
  }

  toggleDrawer = isOpen => () => this.setState({ open: isOpen });

  render() {
    const { classes } = this.props;

    return (
      <div>
        <IconButton
          onClick={this.toggleDrawer(true)}
          color="inherit"
          aria-label="open drawer"
          className={classNames(
            classes.menuButton,
            this.state.open && classes.hide
          )}
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <Link to="/" style={{ textDecoration: 'none' }}>
              {' '}
              <MenuItem onClick={this.handleClose}>Home</MenuItem>{' '}
            </Link>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              {' '}
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>{' '}
            </Link>
          </div>
        </Drawer>
      </div>
    );
  }
}

/* eslint react/forbid-prop-types: 0 */
MenuLateral.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuLateral);
