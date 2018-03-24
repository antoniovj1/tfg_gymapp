import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    margin: '0 auto',
    maxWidth: '80%'
  },
  media: {
    height: 200
  }
};

const Login = ({ classes } = props) => (
  <div>
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="http://www.calcuttarowingclub.org/assets/front/images/banner03n.jpg"
        title="Login"
      />
      <CardContent>
        <Typography variant="headline" component="h2">
          Please Login
        </Typography>
        <Typography component="p">If you want to continue using the App, please Login</Typography>
      </CardContent>
    </Card>
  </div>
);

export default withStyles(styles)(Login);
