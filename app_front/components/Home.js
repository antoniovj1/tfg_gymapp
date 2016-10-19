import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';

import Session from './Session';

class Home extends React.Component {

  constructor() {
     super();
   }
   render() {
     return (
       <Session />
       //<h2>Click for details</h2>
     );
   }
 }

export default Home;
