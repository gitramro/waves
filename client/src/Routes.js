import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './Hoc/Layout';
import Auth from './Hoc/Auth';
import Home from './Components/Home';
import ProductPage from './Components/Product';


import RegisterLogin from './Components/Register_Login';
import Register from './Components/Register_Login/Register';
import UserDashboard from './Components/User';
import Shop from './Components/Shop';
import AddProduct from './Components/User/Admin/Add_Product'
import ManageCategories from './Components/User/Admin/Manage_Categories';

const Routes = () => {
  return(
    <Layout>
      <Switch>
      <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)}/>
        <Route path="/admin/add_product" exact component={Auth(AddProduct, true)} />
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories, true)} />
        <Route path="/product_detail/:id" exact component={Auth(ProductPage,null)}/>
      <Route path="/register" exact component={Auth(Register,false)}/>
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/Shop" exact component={Auth(Shop,null)}/>
        <Route path="/" exact component={Auth(Home,null)}/>
      </Switch>
    </Layout>

  )
}


export default Routes;
