import * as React from 'react'
import PropTypes from 'prop-types'

import AdminHeader from '../shared/adminheader.jsx';
import LeftMenu from '../shared/leftmenu.jsx';

// import Footer from '../shared/footer.jsx';
//import AuthService from "../services/auth.service";


export default class AdminLayout extends React.PureComponent {

  constructor(props)
  {
    super(props);
    this.state = {
      // showModeratorBoard: false,
      // showAdminBoard: false,
      currentUser: undefined,
    };    
  }

  // componentDidMount() {
  //   const user = AuthService.getCurrentUser();

  //   if (user) {
  //     this.setState({
  //       currentUser: user
  //     });
  //   }
  // }

  render() {
      require('../assets/css/bootstrap.min.css')
      require('../assets/css/bootstrap.min.css')
      require('../assets/css/bootstrap-responsive.min.css')
      require('../assets/css/font-awesome.min.css')
      // require('https://fonts.googleapis.com/css?family=Open+Sans:400,300')
      require('../assets/css/ace.min.css')
      require('../assets/css/ace-responsive.min.css')
      require('../assets/css/ace-skins.min.css')
      require('../assets/css/datepicker.css')
      require('../assets/css/jquery.tag-editor.css')
      require('../assets/css/docs.min.css')
      require('../assets/css/jqcloudstyle.css')
      require('../assets/css/jqcloud.css')
      require('../assets/css/custom.css')
      require('../assets/utilities/slider/sliderkit-site.css')
      require('../assets/utilities/slider/sliderkit-demos.css')
      // require('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.css')
      require('../assets/css/font-awesome.min.css')
      return (
        <div>
          <AdminHeader />
          <LeftMenu />
          <div id="main-content" className="clearfix">
            <div id="spinner" className="spinner">
                <i className="fa fa-spinner fa-spin fa-3x"></i>
            </div>
            <div id="breadcrumbs">
                <ul className="breadcrumb">
                    <li>
                        <i className="icon-home"></i>
                        <a href={{}}>Admin</a>
                        <span className="divider">
                            <i className="icon-angle-right"></i>
                        </span>
                    </li>
                    <li className="">
                        <a href={{}}>Dashboard</a><span className="divider">
                            <i className="icon-angle-right"></i>
                        </span>
                    </li>
                    <li className=""></li>
                </ul>
            </div>
            <div id="page-content" className="clearfix" style={{minHeight:'600px'}}>
                <div className="row-fluid">
                    <div>
                      {this.props.children}
                    </div>
                </div> <hr />
            </div>
          </div>          
        </div>
      );
    }
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
}