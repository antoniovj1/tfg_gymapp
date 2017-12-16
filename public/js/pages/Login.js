import React from 'react';
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Login = () => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>

    <Card>
        <CardMedia overlay={<CardTitle title="Please Login" subtitle="Please Login" />} >
        <img src="http://www.calcuttarowingclub.org/assets/front/images/banner03n.jpg"  />
        </CardMedia>
    </Card>
    </MuiThemeProvider>
);

export default Login;
