import React from "react";
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '16px 32px 16px 0',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
};

export default class Session extends React.Component {
  constructor() {
    super(...arguments);

    this.constructor.childContextTypes = {
      muiTheme: React.PropTypes.object.isRequired,
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    return (
      <div>
        <div>
          <Paper style={style.paper}>
            <div>
              <img src="http://www.freeimageslive.com/galleries/space/planets/pics/vg1_p22830.gif" width="100" height="100" class="img-circle" alt=""></img>
            </div>
            <Menu>
              <MenuItem primaryText="Preview" leftIcon={<RemoveRedEye />} />
              <MenuItem primaryText="Share" leftIcon={<PersonAdd />} />
              <MenuItem primaryText="Get links" leftIcon={<ContentLink />} />
              <Divider />
              <MenuItem primaryText="Make a copy" leftIcon={<ContentCopy />} />
              <MenuItem primaryText="Download" leftIcon={<Download />} />
              <Divider />
              <MenuItem primaryText="Remove" leftIcon={<Delete />} />
            </Menu>
          </Paper>
        </div>
      </div>
    );
  }
}
