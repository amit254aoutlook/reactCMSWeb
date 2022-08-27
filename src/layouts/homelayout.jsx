import React from 'react'
import PropTypes from 'prop-types'

import Header from '../shared/header.jsx';
import Footer from '../shared/footer.jsx';
import AuthService from "../services/auth.service";


export default class HomeLayout extends React.PureComponent {
  constructor(props)
  {
    super(props);
    this.state = {
      // showModeratorBoard: false,
      // showAdminBoard: false,
      currentUser: undefined,
    };    
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  render() {
        require('../assets/bootstrap/bootstrap.min.css')
        require('../assets/bootstrap/bootstrap-select.css')
        require('../assets/custom/AOD/adam-stylesheet.css')
        require('../assets/bootstrap/featuredslider.css')
        require('../assets/css/font-awesome.min.css')
        //require('https://fonts.googleapis.com/css?family=Open+Sans:400,300')
        return (
          <div>
            <Header />
            {this.props.children}
            <Footer />            
          </div>
        );
    }
}

HomeLayout.propTypes = {
    children: PropTypes.node.isRequired,
}