import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './Hoc/Layout';
import Auth from './Hoc/Auth';
import Home from './Components/Home';

import RegisterLogin from './Components/Register_Login';
import Register from './Components/Register_Login/Register';
import UserDashboard from './Components/User';
import Shop from './Components/Shop';

const Routes = () => {
  return(
    <Layout>
      <Switch>
      <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)}/>
      <Route path="/register" exact component={Auth(Register,false)}/>
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/Shop" exact component={Auth(Shop,null)}/>
        <Route path="/" exact component={Auth(Home,null)}/>
      </Switch>
    </Layout>

  )
}


export default Routes;
