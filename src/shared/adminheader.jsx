import React,{Component} from 'react';

import AuthService from "../services/auth.service";

export default class AdminHeader extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };

        this.menustate = {
            clicked: false
        };
        this.menuClick = this.menuClick.bind(this);
          
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          this.setState({
            currentUser: user
          });
        }
    }

    menuClick(e) {      
        e.preventDefault();     
        document.getElementById("divAccount").classList.toggle("open");
    }

    logOut() {       
        localStorage.removeItem("user");
        window.location.reload('/home');
        //alert(JSON.stringify(this.state.currentUser))
    }


    render() {
        const { currentUser } = this.state;
        return (
            <div className="navbar-inverse">
                <div className="navbar-inner">
                    <div className="container-fluid" style={{paddingBottom: '0', paddingTop: '0'}}>
                        <a className="navbar-brand hidden-xs hidden-sm"  href={{javascript:void(0)}}>
                            <img style={{maxWidth: '265px', width: '100%',paddingTop: '8px',paddingBottom: '8px'}} alt="" src='/images/client_logos/AOD/logo.png' />
                        </a>
                        <ul className="nav ace-nav pull-right" style={{paddingTop: '10px'}} id="ulLeftMenu">
                            <li className="grey" style={{display:'none'}}>
                                <a data-toggle="dropdown" className="dropdown-toggle"  href={{javascript:void(0)}}>
                                    <i className="icon-tasks"></i>
                                    <span className="badge badge-grey">4</span>
                                </a>
                                <ul className="pull-right dropdown-navbar dropdown-menu dropdown-caret dropdown-closer">
                                    <li className="nav-header">
                                        <i className="icon-ok"></i>
                                        4 Tasks to complete
                                    </li>
                                    <li>
                                        <a  href={{javascript:void(0)}}>
                                            <div className="clearfix">
                                                <span className="pull-left">Software Update</span>
                                                <span className="pull-right">65%</span>
                                            </div>

                                            <div className="progress progress-mini ">
                                                <div style={{width:'65%'}} className="bar"></div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={{javascript:void(0)}}>
                                            <div className="clearfix">
                                                <span className="pull-left">Hardware Upgrade</span>
                                                <span className="pull-right">35%</span>
                                            </div>

                                            <div className="progress progress-mini progress-danger">
                                                <div style={{width:'35%'}} className="bar"></div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={{javascript:void(0)}}>
                                            <div className="clearfix">
                                                <span className="pull-left">Unit Testing</span>
                                                <span className="pull-right">15%</span>
                                            </div>

                                            <div className="progress progress-mini progress-warning">
                                                <div style={{width:'15%'}} className="bar"></div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={{javascript:void(0)}}>
                                            <div className="clearfix">
                                                <span className="pull-left">Bug Fixes</span>
                                                <span className="pull-right">90%</span>
                                            </div>

                                            <div className="progress progress-mini progress-success progress-striped active">
                                                <div style={{width:'90%'}} className="bar"></div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={{javascript:void(0)}}>
                                            See tasks with details
                                            <i className="icon-arrow-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="purple" style={{display:'none'}}>
                                <a data-toggle="dropdown" className="dropdown-toggle" href={{}}>
                                    <i className="icon-bell-alt icon-only icon-animated-bell"></i>
                                    <span className="badge badge-important">8</span>
                                </a>
                                <ul className="pull-right dropdown-navbar navbar-pink dropdown-menu dropdown-caret dropdown-closer">
                                    <li className="nav-header">
                                        <i className="icon-warning-sign"></i>
                                        8 Notifications
                                    </li>
                                    <li>
                                        <a href={{javascript:void(0)}}>
                                            <div className="clearfix">
                                                <span className="pull-left">
                                                    <i className="btn btn-mini no-hover btn-pink icon-comment"></i>
                                                    New Comments
                                                </span>
                                                <span className="pull-right badge badge-info">+12</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={{javascript:void(0)}}>
                                            <i className="btn btn-mini btn-primary icon-user"></i>
                                            Bob just signed up as an editor ...
                                        </a>
                                    </li>
                                    <li>
                                        <a href={{javascript:void(0)}}>
                                            <div className="clearfix">
                                                <span className="pull-left">
                                                    <i className="btn btn-mini no-hover btn-success icon-shopping-cart"></i>
                                                    New Orders
                                                </span>
                                                <span className="pull-right badge badge-success">+8</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={{javascript:void(0)}}>
                                            <div className="clearfix">
                                                <span className="pull-left">
                                                    <i className="btn btn-mini no-hover btn-info icon-twitter"></i>
                                                    Followers
                                                </span>
                                                <span className="pull-right badge badge-info">+11</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={{javascript:void(0)}}>
                                            See all notifications
                                            <i className="icon-arrow-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="green" style={{display:'none'}}>
                                <a data-toggle="dropdown" className="dropdown-toggle" href={{}}>
                                    <i className="icon-envelope-alt icon-only icon-animated-vertical"></i>
                                    <span className="badge badge-success">5</span>
                                </a>
                                <ul className="pull-right dropdown-navbar dropdown-menu dropdown-caret dropdown-closer">
                                    <li className="nav-header">
                                        <i className="icon-envelope"></i>
                                        5 Messages
                                    </li>
                                    <li>
                                        <a href={{javascript:void(0)}}>
                                            <span className="msg-body">
                                                <span className="msg-title">
                                                    <span className="blue">Alex:</span>
                                                    Ciao sociis natoque penatibus et auctor ...
                                                </span>

                                                <span className="msg-time">
                                                    <i className="icon-time"></i>
                                                    <span>a moment ago</span>
                                                </span>
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={{javascript:void(0)}}>
                                            <span className="msg-body">
                                                <span className="msg-title">
                                                    <span className="blue">Susan:</span>
                                                    Vestibulum id ligula porta felis euismod ...
                                                </span>

                                                <span className="msg-time">
                                                    <i className="icon-time"></i>
                                                    <span>20 minutes ago</span>
                                                </span>
                                            </span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href={{javascript:void(0)}}>
                                            <span className="msg-body">
                                                <span className="msg-title">
                                                    <span className="blue">Bob:</span>
                                                    Nullam quis risus eget urna mollis ornare ...
                                                </span>

                                                <span className="msg-time">
                                                    <i className="icon-time"></i>
                                                    <span>3:15 pm</span>
                                                </span>
                                            </span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href={{javascript:void(0)}}>
                                            See all messages
                                            <i className="icon-arrow-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li  className="light-blue user-profile" id="divAccount">
                                <a onClick={this.menuClick} data-toggle="dropdown" href={{javascript:void(0)}} className="user-menu dropdown-toggle">
                                    <span id="user_info">
                                        Welcome {currentUser.firstname}
                                    </span>
                                    <i className="icon-caret-down"></i>
                                </a>
                                <ul className="pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-closer" id="user_menu">
                                    <li>
                                        <a href="/home">
                                            <i className="icon-home"></i>
                                            Home
                                        </a>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <a href="/home" onClick={this.logOut}>
                                            <i className="icon-off"></i>
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}