import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './Hoc/Layout';
import Home from './Components/Home';


const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/" exact component={Home}/>
      </Switch>
    </Layout>

  )
}


export default Routes;
