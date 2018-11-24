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
import UserCart from './Components/User/Cart';
import UpdateProfile from './Components/User/Update_Profile';
import ManageSite from './Components/User/Admin/Manage_Site';
import AddFile from './Components/User/Admin/Add_File';
import PageNotFound from './Components/Utils/Page_Not_Found';
import ResetUser from './Components/Reset_User';
import ResetPass from './Components/Reset_User/Reset_Pass';

const Routes = () => {
  return(
    <Layout>
      <Switch>
      <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)}/>
      <Route path="/user/cart" exact component={Auth(UserCart,true)}/>
        <Route path="/admin/add_product" exact component={Auth(AddProduct, true)} />
        <Route path="/user/user_profile" exact component={Auth(UpdateProfile,true)}/>
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories, true)} />
        <Route path="/admin/site_info" exact component={Auth(ManageSite, true)} />
        <Route path="/admin/add_file" exact component={Auth(AddFile, true)} />
        <Route path="/reset_password/:token" exact component={Auth(ResetPass, false)} />
        <Route path="/reset_user" exact component={Auth(ResetUser, false)} />
        <Route path="/product_detail/:id" exact component={Auth(ProductPage,null)}/>
        <Route path="/register" exact component={Auth(Register,false)}/>
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/Shop" exact component={Auth(Shop,null)}/>
        <Route path="/" exact component={Auth(Home,null)}/>
        <Route component={Auth(PageNotFound)}/>
      </Switch>
    </Layout>

  )
}


export default Routes;
