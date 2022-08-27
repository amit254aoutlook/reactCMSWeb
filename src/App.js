import React from 'react';
import { BrowserRouter as Router, Route,  Switch } from 'react-router-dom';  
import './App.css';
import Home from '../src/pages/home.jsx';
import Dashboard from '../src/pages/admin/dashboard.jsx';
import Category from '../src/pages/admin/category/categories.jsx';
import Product from '../src/pages/admin/product/product.jsx';
import HomeLayout from '../src/layouts/homelayout.jsx';
import AdminLayout from '../src/layouts/adminlayout.jsx';
//https://stackoverflow.com/questions/33062830/using-react-router-with-a-layout-page-or-multiple-components-per-page

const AppRoute = ({ component: Component, layout: Layout }) => (
  <Route  render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
)
function App() {
  return (
    <Router>
    <Switch>
      <AppRoute exact path={["/", "/home"]} layout={HomeLayout} component={Home} />
      <AppRoute exact path={["/admin", "/admin/dashborad"]} layout={AdminLayout} component={Dashboard}/>
      <AppRoute exact path={["/admin/category", "/admin/category"]} layout={AdminLayout} component={Category}/>
      <AppRoute exact path={["/admin/product", "/admin/product"]} layout={AdminLayout} component={Product}/>
      {/* <HomeLayout>
       <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
        </Switch> 
      </HomeLayout>
      <AdminLayout>
         <Switch> 
          <Route exact path={["/admin", "/admin/dashborad"]} component={Dashboard} isPrivate/>
       </Switch> 
      </AdminLayout> */}
    </Switch>
    </Router>
  );
}

export default App;
