import React,{Component} from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

export default class Header extends Component {

    constructor(props) {        
        console.log("Props - ", props);
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.modelstate = {
          modalVisible: false
        };

        this.menustate = {
            clicked: false
        };
        
       
        this.state = {
            LoginId: "",
            Password: "",
            loading: false,
            message: "",
            currentUser: AuthService.getCurrentUser() || undefined,
        };
        this.openModal = this.openModal.bind(this);
        this.menuClick = this.menuClick.bind(this);
        this.openAboutMenu=this.openAboutMenu.bind(this);
        this.logOut = this.logOut.bind(this);
        //alert("HI"+this.state.currentUser)
    }

    menuClick(e) {      
        e.preventDefault();     
        document.getElementById("divAccount").classList.toggle("open");
    }

    openAboutMenu(e){   
        e.preventDefault();     
        document.getElementById("navdrop").classList.toggle("open");
    }

    openModal() {
        //alert("Open modal called "+ this.state.modalVisible);
        const modalVisible = !this.modelstate.modalVisible;
        this.setState({
          modalVisible
        });
    }

    logOut() {       
        localStorage.removeItem("user");
        window.location.reload();
        //alert(JSON.stringify(this.state.currentUser))
    }

    onChangeUsername(e) {
        this.setState({
          LoginId: e.target.value
        });
    }
    
    onChangePassword(e) {
        this.setState({
            Password: e.target.value
        });
    }
    
    handleLogin(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          loading: true
        });
    
        this.form.validateAll();
    
        if (this.checkBtn.context._errors.length === 0) {
          AuthService.login(this.state.LoginId, this.state.Password).then(
            () => {  
                const user = AuthService.getCurrentUser(); 
                if (user) {
                    this.setState({                   
                        currentUser: user,
                    });
                }          
                this.setState({
                    modalVisible: false
                })
    ;              //alert(JSON.stringify(this.state.currentUser))
                //this.props.history.push("/home");
                //window.location.reload();
            },
            error => {
              const resMessage = (error.response && error.response.data &&  error.response.data.message) ||
                error.message ||
                error.toString();    
              this.setState({
                loading: false,
                message: resMessage
              });
            }
          );
        } else {
          this.setState({
            loading: false
          });
        }
      }

    render() {
        let styles = this.state.modalVisible  ? { display: "block" }  : { display: "none" };
        const  currentUser = this.state.currentUser;
        //alert(currentUser)
        return (
            <header className="navbar navbar-inverse navbar-fixed-top" role="navigation">
              <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle mobile-menu" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand hidden-xs hidden-sm desktop-logo" href={{javascript:void(0)}}>
                        <img alt="" src='/images/client_logos/AOD/logo.png' />
                    </a>
                    {/* <a className="navbar-brand visible-xs visible-sm mobile-logo logomargin" href="#">
                        <img src="#"></a>
                    <a className="navbar-brand hidden-xs  hidden-sm" href="#">
                        <img src="#"></a>
                    <a className="navbar-brand visible-xs visible-sm logomargin" href="#">
                        <img src="#"></a>  */}
                    <div className="dropdown pull-right margin-right-5 visible-xs" id="CartMessagemob">
                        <a data-toggle="dropdown" className="btn btn-primary shoppingcart visible-sm visible-xs" href={{javascript:void(0)}}><i className='glyphicon glyphicon-user'></i></a>
                        <ul className="dropdown-menu btn-block login-width user-detail" role='menu' >
                            <li>
                                <a href={{javascript:void(0)}}>
                                    <i className="glyphicon glyphicon-user"></i>My Account
                                </a>
                            </li>
                            <li>
                                <a href={{javascript:void(0)}}>
                                    <i className="glyphicon glyphicon-book"></i>My Programs
                                </a>
                            </li>
                            <li>
                                <a href={{javascript:void(0)}}>
                                    <i className="glyphicon glyphicon-cog"></i>Admin Dashboard
                                </a>
                            </li>
                            <li><a href="/home" onClick={this.logOut}><i className="glyphicon glyphicon-log-out"></i>Logout</a></li>
                        </ul>
                        <div id="divuserinfo">
                            <a href={{}} onClick={this.openModal}  className="btn btn-primary shoppingcart login-btn">
                                <i className="glyphicon glyphicon-log-in"></i>
                                <span className="hidden-xs hidden-sm">Login</span>      
                            </a>
                        </div>
                    </div>
                    <div className="dropdown pull-right visible-xs" style={{'marginRight': '5px'}}>
                        <a data-toggle="dropdown" className="btn btn-primary shoppingcart-mobile" href={{javascript:void(0)}}>
                            <i className="glyphicon glyphicon-shopping-cart"></i>
                            <span className="badge" id="CartMessageMob"></span>
                        </a>
                        <div className="dropdown-menu cart-detail-dropdown" role="menu" id="cartdropdownmob">
                        </div>
                    </div>
                </div>
                <div className="navbar-collapse collapse header-navigation">
                    <ul className="nav navbar-nav nav-margin-top-20 nav-margin-left-10">
                        <li className="dropdown" id="navdrop">
                            <a href={{}} onClick={this.openAboutMenu} className="" data-toggle="dropdown">About<span className="caret"></span></a>
                            <ul className="dropdown-menu" role="menu" >
                                <li className="">
                                    <a href={{javascript:void(0)}}> About A.D.A.M. OnDemand </a>
                                </li>
                                <li className="divider"></li>
                                <li className="">
                                    <a href={{javascript:void(0)}}>Contact Us</a>
                                </li>
                                <li className="divider"></li>
                                <li className="">
                                    <a href={{javascript:void(0)}}>Volume Licenses</a>
                                </li>
                                <li className="divider"></li>
                                <li className="">
                                    <a href={{javascript:void(0)}}>Academic Licenses</a>
                                </li>
                                <li className="divider"></li>
                            </ul>
                        </li>
                        <li><a href={{javascript:void(0)}}>FAQ </a></li>
                        <li><a href={{javascript:void(0)}}>Catalog </a></li>
                    </ul>    
                    {/* className={this.menustate.clicked ? "dropdown pull-right margin-right-5 hidden-xs open" : "dropdown pull-right margin-right-5 hidden-xs" }                 */}
                    <div  className= "dropdown pull-right margin-right-5 hidden-xs " style={{'marginRight': '-70px'}}>
                        {currentUser ?  (
                            <div id="divAccount">
                                <a href={{javascript:void(0)}} data-toggle='dropdown' className="btn btn-primary shoppingcart hidden-sm visible-xs hidden-md visible-lg"  onClick={this.menuClick}>
                                    Welcome {currentUser.firstname}
                                    <span className="caret"></span>
                                </a>
                                <a data-toggle="dropdown" className="btn btn-primary shoppingcart visible-sm visible-xs visible-md" href={{}}  ><i className='glyphicon glyphicon-user'></i></a>
                                <ul className="dropdown-menu btn-block login-width user-detail" role='menu'>
                                    <li>
                                        <a href={{javascript:void(0)}}>
                                            <i className="glyphicon glyphicon-user"></i>My Account
                                        </a>
                                    </li>
                                    <li>
                                        <a href={{javascript:void(0)}}>
                                            <i className="glyphicon glyphicon-book"></i>My Programs
                                        </a>
                                    </li>
                                    <li >
                                        <a href="/admin">
                                            <i className="glyphicon glyphicon-cog"></i>Admin Dashboard
                                        </a>
                                    </li>
        
                                    <li className="divider"></li>
                                    <li><a href="/home" onClick={this.logOut}><i className="glyphicon glyphicon-log-out"></i>Logout</a></li>
                                </ul>
                            </div>
                        ):(
                            <div id="divuserinfoweb">                       
                                <button type="button" onClick={this.openModal}  className="btn btn-primary shoppingcart login-btn">
                                    <i className="glyphicon glyphicon-log-in"></i>
                                    <span className="hidden-xs hidden-sm">Login</span>
                                </button>                            
                            </div>
                        )}
                    </div>
                    <div className="dropdown pull-right hidden-xs" style={{ marginRight : '5px'}}>
                        <a data-toggle="dropdown" className="btn btn-primary shoppingcart" href={{javascript:void(0)}}>
                            <i className="glyphicon glyphicon-shopping-cart"></i>
                            <span className="hidden-xs" id="CartMessage">0 item(s)</span>
                        </a>
                        <div className="dropdown-menu cart-detail-dropdown" role="menu" id="CartDropDown">
                        </div>
                    </div>
                </div>
            </div>
            <div id="myModal" className="modal fade in" role="dialog" style={styles}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" onClick={this.openModal} className="close"> &times;</button>
                            <h3 className="modal-title text-primary" id="myModalLabel">Members Login</h3>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <Form style={{marginTop:'-30px'}} onSubmit={this.handleLogin} ref={c => { this.form = c; }}>
                                        <div className="form-group">
                                            <label htmlFor="inputEmail3" className="col-sm-4 control-label">Username</label>
                                            <div className="col-sm-8">
                                            <Input type="text" className="form-control" name="LoginId" placeholder="username" value={this.state.LoginId} onChange={this.onChangeUsername} validations={[required]} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputPassword3" className="col-sm-4 control-label">Password</label>
                                            <div className="col-sm-8">
                                            <Input type="password" className="form-control" name="Password" value={this.state.Password}  onChange={this.onChangePassword}  validations={[required]}  placeholder="Password" />                                  
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-sm-4">&nbsp;</div>
                                            <div className="col-sm-8">
                                                    <label htmlFor="inputRemeberMe" className="control-label text-right">
                                                    <input  id="chkRemeberMe" name="chkRemeberMe" style={{display:'block !important','margin':'11px 11px 11px 0'}} type="checkbox" value="true"/>
                                                    Remember Me
                                                    </label>
                                            </div>
                                        </div>
                                        {this.state.message && (
                                            <div className="form-group">
                                                <div className="alert alert-danger" role="alert">
                                                    {this.state.message}
                                                </div>
                                            </div>
                                        )}
                                        <div className="form-group">
                                            <div className="col-sm-offset-4 col-sm-8">
                                                <button className="btn btn-primary" disabled={this.state.loading}>
                                                    {this.state.loading && ( <span className="spinner-border spinner-border-sm"></span>)}
                                                    <span>Sign In</span>
                                                </button>
                                                
                                                &nbsp;
                                                <br/><br/>
                                                <a className="btn btn-primary btn-md" tabIndex="13" href={{}}><span>Lost your activation email?</span></a>&nbsp;
                                                <br/><a href={{}} data-target="#forgotPasswordModal" className="forgotpass" tabIndex="15">Forgot Password?</a>
                                            </div>
                                        </div>
                                        <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c; }} />

                                    </Form>
                                </div>
                                <div className="col-lg-6 text-center">
                                    <h3 className="text-primary">No, I am a new customer.</h3>
                                    <a href={{}} className="btn btn-success btn-lg register">Register Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">                            
                        </div>
                    </div>
                </div>
            </div>
          </header>          
                                                                                                                                                                                                     
        );
    }
}