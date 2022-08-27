import React,{Component} from 'react'


export default class Home extends Component {
    render() {
      return (
        <div style={{overflowX: 'hidden'}}>
          <div id="et-slider-wrapper">
              <div className="slides">
                  <div className="featured ondemand" style={{'display': 'none', 'opacity': '0'}}>
                      <div className="container clearfix">
                          <div className="description">
                              <p className="subtitle">Welcome to</p>
                              <p className="subtitle">A.D.A.M. OnDemand™</p>
                              <p>A.D.A.M. OnDemand™ is the most comprehensive library of off-the-shelf medical eLearning programs for professionals in the pharmaceutical and healthcare industries, students, and patients.</p>
                              <h3>A.D.A.M. OnDemand™ is your first-line therapy!</h3>
                              <p className="btn-box visible-lg hidden-md hidden-sm hidden-xs">
                                  <a href="/AODHome/Page?code=trial" className="btn btn-success btn-lg trial">Register Now</a>
                                  <a href="/AODHome/catalog" className="btn btn-primary btn-lg readmore">Our Catalog</a>
                                  <a href="/AODHome/Page?code=about" className="btn btn-primary btn-lg readmore">Read More</a>
                              </p>
                              <p className="btn-box visible-xs visible-md visible-sm hidden-lg">
                                  <a href="/AODHome/Page?code=trial" className="btn btn-success btn-sm trial">Register Now</a>
                                  <a href="/AODHome/catalog" className="btn btn-primary btn-sm readmore">Our Catalog</a>
                                  <a href="/AODHome/Page?code=about" className="btn btn-primary btn-sm readmore">Read More</a>
                              </p>
                          </div>
                          <a href={{javascript:void(0)}} id="video_show" data-toggle="modal" data-target="#myModal3"><div className="featured-image"></div></a>
                      </div>
                  </div>
                  <div className="featured medicalEducation" style={{'display': 'block', 'opacity': '1'}}>
                      <div className="container clearfix">
                          <div className="description">
                              <h2>Medical Education for All Your Devices</h2>
                              <p className="subtitle">Desktops, Laptops, and Mobile Devices.</p>
                              <p>Our award-winning HTML5 eLearning programs are designed to work across different devices. Our programs are adapted to suit multiple platforms, whether they are viewed on a desktop, laptop, or mobile device.</p>
                              <p className="btn-box">
                                  <a href="/AODHome/Page?code=about" className="btn btn-primary btn-lg">Learn More</a>
                              </p>
                          </div>
                          <div className="featured-image featured-video"></div>
                      </div>
                  </div>
                  <div className="featured adamproduct">
                      <div className="container clearfix">
                          <div className="description">
                              <h2>Other A.D.A.M. Products</h2>
                              <p className="subtitle">Explore the Benefits of our Expanding Suite of Products.</p>
                              <p>A.D.A.M., the most credible source of health care information and multimedia visual learning assets for health care organizations, has the solutions you need to succeed in today’s competitive environment.</p>
                              <p className="btn-box">
                                  <a href="/AODHome/Page?code=Additional%20A.D.A.M.%20Products-1" className=" btn btn-primary btn-lg">Learn More</a>
                              </p>
                          </div>
                          <div className="featured-video"></div>
                      </div>
                  </div>
                  <div className="featured volumelicenses">
                      <div className="container clearfix">
                          <div className="description">
                              <h2>Volume Licenses</h2>
                              <p className="subtitle">You Need Multiple Licenses of A.D.A.M. OnDemand™ Programs?</p>
                              <p>Whether you already have a learning management system (LMS) or need assistance hosting your programs, we can help you deliver and track training today!</p>
                              <p className="btn-box">
                                  <a href="/AODHome/Page?code=Volume-Licenses" className=" btn btn-primary btn-lg">Learn More</a>
                              </p>
                          </div>
                          <div className="featured-image"></div>
                      </div>
                  </div>
                  <div className="featured shelfprograms">
                      <div className="container clearfix">
                          <div className="description">
                              <h2>Why Off-the-Shelf Programs?</h2>
                              <p className="subtitle">What are the benefits?</p>
                              <p>There are many advantages to using off-the-shelf medical education programs to meet your educational and training needs. A few of the benefits are their low cost, fast delivery, reliability, and consistently updated content.</p>
                              <p className="btn-box">
                                  <a href="/AODHome/Page?code=Why%20Off-the-Shelf%20Medical%20Programs" className="btn btn-primary btn-lg">Read More</a>
                              </p>
                          </div>
                          <div className="featured-image"></div>
                      </div>
                  </div>
                  <div className="featured pharmaLifeSciences" style={{'display': 'none', 'opacity':'0'}}>
                      <div className="container clearfix">
                          <div className="description">
                              <h2>Need Customized Education and Training?</h2>
                              <p className="subtitle">We are Your Training Partners</p>
                              <p>We have a 20-year track record of creating custom training and education for our clients in the pharmaceutical and healthcare industries. We design solutions that work for you.</p>
                              <p className="btn-box">
                                  <a rel='noopener noreferrer' href="http://www.ebixlifesciences.com/" target="_blank" className="btn btn-primary btn-lg">Read More</a>
                              </p>
                          </div>
                          <div className="featured-image"></div>
                      </div>
                  </div>

              </div>
              <div className="et-slider-arrows">
                  <a className="et-arrow-prev" href={{javascript:void(0)}}>Previous</a>
                  <a className="et-arrow-next" href={{javascript:void(0)}}>Next</a>
              </div>
          </div>
          <div className="jumbotron licenses-wrapper">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <div className="service">
                              <div className="icon">
                                  <img alt="" src="./assets/images/AOD/services/icon_trybeforeyoubuy.png" />
                              </div>
                              <h3>Continuing Education</h3>

                              The most comprehensive collection of health education programs to meet your continuing education needs.
                              <br />
                              <a href="/AODHome/Page?code=trial">Register Now</a>
                          </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <div className="service">
                              <div className="icon">
                                  <img alt="" src="./assets/images/AOD/services/icon_volume_licenses.png" />
                              </div>
                              <h3>Volume Licenses</h3>
                              We offer multiple user licenses with hosting, as well as site and global licenses for your own LMS.<br />

                              <a className="read-more2" href="/AODHome/Page?code=Volume-Licenses">Learn More</a>
                          </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" style={{'display':'none'}}>
                          <div className="service">
                              <div className="icon">
                                  <img alt="" src="./assets/images/AOD/services/icon_academic_licenses.png" />
                              </div>
                              <h3>Award Winning</h3>
                              We are proud to announce that two of our eLearning programs won Communicator Awards.<br />
                              <a className="read-more2" href="/AODHome/Page?code=Top%20Honors-1">View Details</a>

                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="container">
              <div className="page-header">
                  <div className="row">
                      <div className="col-sm-8 ">

                      </div>
                      <div className="row col-sm-12 col-lg-12 col-md-12  col-xs-12">
                          <a href="/AODHome/catalog" className="btn btn-success btn-lg pull-right margin-top-15">Program Catalog <i className="fa fa-angle-double-right"></i></a>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div id="productsummary" className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                      <div className="row" id="divReturntoCatlog">
                          <div className="modal fade" id="checkingpackage" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                              <div className="modal-dialog">
                                  <div className="modal-content">
                                      <div className="modal-header">
                                          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                          <h3 className="modal-title text-primary" id="myAlertModalLabel">model</h3>
                                      </div>
                                      <div className="modal-body">
                                          <p>Individual licenses are part of “Complete Library” and both can’t be purchased together. Please update your cart to choose your option.</p>
                                      </div>
                                      <div className="modal-footer">
                                          <button type="button" className="btn btn-primary " data-dismiss="modal">Cancel</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="modal fade" id="MonthlyCompleteLibrarydialog" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                              <div className="modal-dialog">
                                  <div className="modal-content">
                                      <div className="modal-header">
                                          <h3>Library Bundle Subscription</h3>
                                      </div>
                                      <div className="modal-body">
                                          <p>You’ve already purchased the Complete Library Subscription.</p>
                                      </div>
                                      <div className="modal-footer">
                                          <button type="button" className="btn btn-primary " data-dismiss="modal">Ok</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="modal fade" id="addProduct-dialog" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                              <div className="modal-dialog">
                                  <div className="modal-content">
                                      <div className="modal-header">
                                          <h3>Confirmation</h3>
                                      </div>
                                      <div className="modal-body">
                                          <p>
                                              You already have products in your cart, do you want to add "Complete Library <span id="PCode"></span>"
                                              in your cart.<span id="productcodep" style={{'display':'none'}}></span>
                                          </p>
                                      </div>

                                      <div className="modal-footer">
                                          <a href={{javascript:void(0)}} className="btn btn-primary btn-ok">Yes</a>
                                          <button type="button" className="btn btn-primary " data-dismiss="modal">No</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="modal fade" id="addbundle-dialog" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                              <div className="modal-dialog">
                                  <div className="modal-content">
                                      <div className="modal-header">
                                          <h3>Confirmation</h3>
                                      </div>
                                      <div className="modal-footer">
                                          <a href={{javascript:void(0)}} className="btn btn-primary  btn-ok">Yes</a>
                                          <button type="button" className="btn btn-primary " data-dismiss="modal">No</button>
                                      </div>

                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                              <div className="thumbnailhome">
                                  <img src="./assets/images/AOD/products/catalog/01011209.jpg" alt="Understanding the Physiology of the Cardiovascular System" title="Understanding the Physiology of the Cardiovascular System" className="dash-bottom-border img-responsive" />
                                  <div className="caption text-center dash-bottom-border">
                                      <p className="text-muted">
                                          <em>ID: 01011209  </em>
                                      </p>
                                      <p className="text-center">
                                      </p>
                                      <div className="program-title">
                                          <h4 className="fixed_height">
                                              <a href="/AODHome/AODProductDetails/UnderstandingthePhysiologyoftheCardiovascularSystem">
                                                  Understanding the Physiology of the Cardiovascular System
                                              </a>

                                          </h4>
                                      </div>
                                      <hr />
                                      <div className="row">
                                          <div className="col-xs-12">
                                              <span className="price pull-right">
                                              </span>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="caption-pad">
                                      <div className="pull-left">
                                          <i className="glyphicon glyphicon-user"></i>&nbsp;&nbsp;391 &nbsp;&nbsp;
                                          <span className="price pull-right" style={{marginTop: '-7px !important'}}>₹149.00 </span>
                                      </div>
                                      <div className="pull-right">
                                          <a href="/AODHome/AODProductDetails/UnderstandingthePhysiologyoftheCardiovascularSystem" className="btn btn-default">
                                              <i className="glyphicon glyphicon-eye-open"></i> Details
                                          </a>

                                      </div>
                                  </div>
                                  <div className="clearfix"></div>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                              <div className="thumbnailhome">
                                  <img src="./assets/images/AOD/products/catalog/01011109.jpg" alt="Understanding the Anatomy of the Cardiovascular System" title="Understanding the Anatomy of the Cardiovascular System" className="dash-bottom-border img-responsive" />
                                  <div className="caption text-center dash-bottom-border">
                                      <p className="text-muted">
                                          <em>ID: 01011109  </em>
                                      </p>
                                      <p className="text-center">
                                      </p>
                                      <div className="program-title">
                                          <h4 className="fixed_height">
                                              <a href="/AODHome/AODProductDetails/UnderstandingtheAnatomyoftheCardiovascularSystem">
                                                  Understanding the Anatomy of the Cardiovascular System
                                              </a>

                                          </h4>
                                      </div>
                                      <hr />
                                      <div className="row">
                                          <div className="col-xs-12">
                                              <span className="price pull-right">
                                              </span>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="caption-pad">
                                      <div className="pull-left">
                                          <i className="glyphicon glyphicon-user"></i>&nbsp;&nbsp;92 &nbsp;&nbsp;
                                          <span className="price pull-right" style={{marginTop: '-7px !important'}}>₹149.00 </span>
                                      </div>
                                      <div className="pull-right">
                                          <a href="/AODHome/AODProductDetails/UnderstandingtheAnatomyoftheCardiovascularSystem" className="btn btn-default">
                                              <i className="glyphicon glyphicon-eye-open"></i> Details
                                          </a>

                                      </div>
                                  </div>
                                  <div className="clearfix"></div>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                              <div className="thumbnailhome">
                                  <img src="./assets/images/AOD/products/catalog/01011009.jpg" alt="Introduction to the Cardiovascular System" title="Introduction to the Cardiovascular System" className="dash-bottom-border img-responsive" />
                                  <div className="caption text-center dash-bottom-border">
                                      <p className="text-muted">
                                          <em>ID: 01011009  </em>
                                      </p>
                                      <p className="text-center">
                                      </p>
                                      <div className="program-title">
                                          <h4 className="fixed_height">
                                              <a href="/AODHome/AODProductDetails/IntroductiontotheCardiovascularSystem">
                                                  Introduction to the Cardiovascular System
                                              </a>
                                          </h4>
                                      </div>
                                      <hr />
                                      <div className="row">
                                          <div className="col-xs-12">
                                              <span className="price pull-right">
                                              </span>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="caption-pad">
                                      <div className="pull-left">
                                          <i className="glyphicon glyphicon-user"></i>&nbsp;&nbsp;339 &nbsp;&nbsp;
                                          <span className="price pull-right" style={{marginTop: '-7px !important'}}>₹149.00 </span>
                                      </div>
                                      <div className="pull-right">
                                          <a href="/AODHome/AODProductDetails/IntroductiontotheCardiovascularSystem" className="btn btn-default">
                                              <i className="glyphicon glyphicon-eye-open"></i> Details
                                          </a>

                                      </div>
                                  </div>
                                  <div className="clearfix"></div>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                              <div className="thumbnailhome">
                                  <img src="./assets/images/AOD/products/catalog/01061509.jpg" alt="The Principles of Cardiac Catheterization Patient Experience" title="The Principles of Cardiac Catheterization Patient Experience" className="dash-bottom-border img-responsive" />
                                  <div className="caption text-center dash-bottom-border">
                                      <p className="text-muted">
                                          <em>ID: 01061509  </em>
                                      </p>
                                      <p className="text-center">
                                      </p>
                                      <div className="program-title">
                                          <h4 className="fixed_height">
                                              <a href="/AODHome/AODProductDetails/ThePrinciplesofCardiacCatheterizationPatientExperience">
                                                  The Principles of Cardiac Catheterization Patient Experience
                                              </a>
                                          </h4>
                                      </div>
                                      <hr />
                                      <div className="row">
                                          <div className="col-xs-12">
                                              <span className="price pull-right">
                                              </span>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="caption-pad">
                                      <div className="pull-left">
                                          <i className="glyphicon glyphicon-user"></i>&nbsp;&nbsp;50 &nbsp;&nbsp;
                                          <span className="price pull-right" style={{marginTop: '-7px !important'}}>₹149.00 </span>
                                      </div>
                                      <div className="pull-right">
                                          <a href="/AODHome/AODProductDetails/ThePrinciplesofCardiacCatheterizationPatientExperience" className="btn btn-default">
                                              <i className="glyphicon glyphicon-eye-open"></i> Details
                                          </a>

                                      </div>
                                  </div>
                                  <div className="clearfix"></div>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                              <div className="thumbnailhome">
                                  <img src="./assets/images/AOD/products/catalog/00016009.jpg" alt="Understanding Cell Biology" title="Understanding Cell Biology" className="dash-bottom-border img-responsive" />
                                  <div className="caption text-center dash-bottom-border">
                                      <p className="text-muted">
                                          <em>ID: 00016009  </em>
                                      </p>
                                      <p className="text-center">
                                      </p>
                                      <div className="program-title">
                                          <h4 className="fixed_height">
                                              <a href="/AODHome/AODProductDetails/UnderstandingCellBiology">
                                                  Understanding Cell Biology
                                              </a>
                                          </h4>
                                      </div>

                                      <hr />
                                      <div className="row">
                                          <div className="col-xs-12">
                                              <span className="price pull-right">
                                              </span>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="caption-pad">
                                      <div className="pull-left">
                                          <i className="glyphicon glyphicon-user"></i>&nbsp;&nbsp;1 &nbsp;&nbsp;
                                          <span className="price pull-right" style={{marginTop: '-7px !important'}}>₹149.00 </span>
                                      </div>
                                      <div className="pull-right">
                                          <a href="/AODHome/AODProductDetails/UnderstandingCellBiology" className="btn btn-default">
                                              <i className="glyphicon glyphicon-eye-open"></i> Details
                                          </a>

                                      </div>
                                  </div>
                                  <div className="clearfix"></div>
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                              <div className="thumbnailhome">
                                  <img src="./assets/images/AOD/products/catalog/01061109.jpg" alt="The Principles of Cardiac Catheterization" title="The Principles of Cardiac Catheterization" className="dash-bottom-border img-responsive" />
                                  <div className="caption text-center dash-bottom-border">
                                      <p className="text-muted">
                                          <em>ID: 01061109  </em>
                                      </p>
                                      <p className="text-center">
                                      </p>
                                      <div className="program-title">
                                          <h4 className="fixed_height">
                                              <a href="/AODHome/AODProductDetails/ThePrinciplesofCardiacCatheterization">
                                                  The Principles of Cardiac Catheterization
                                              </a>
                                          </h4>
                                      </div>
                                      <hr />
                                      <div className="row">
                                          <div className="col-xs-12">
                                              <span className="price pull-right">
                                              </span>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="caption-pad">
                                      <div className="pull-left">
                                          <i className="glyphicon glyphicon-user"></i>&nbsp;&nbsp;287 &nbsp;&nbsp;
                                          <span className="price pull-right"  style={{marginTop: '-7px !important'}}>₹149.00 </span>
                                      </div>
                                      <div className="pull-right">
                                          <a href="/AODHome/AODProductDetails/ThePrinciplesofCardiacCatheterization" className="btn btn-default">
                                              <i className="glyphicon glyphicon-eye-open"></i> Details
                                          </a>

                                      </div>
                                  </div>
                                  <div className="clearfix"></div>
                              </div>
                          </div>

                      </div>
                      {/* <form id="AlertForm" className="form-horizontal" role="form" method="post"> */}
                          <div className="modal modal-login fade" id="myAlertModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                              <div className="modal-dialog">
                                  <div className="modal-content">
                                      <div className="modal-header">
                                          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                          <h3 className="modal-title text-primary" id="myAlertModalLabel">Notification</h3>
                                      </div>
                                      <div className="modal-body">
                                          <div className="row">
                                              <strong>&nbsp;You have already subscribed this Course! You may choose many other options from A.D.A.M.'s library of in-depth courses. </strong>

                                              <div className="col-lg-6 text-center">

                                              </div>
                                          </div>
                                      </div>
                                      <div className="modal-footer">
                                          <div className="pull-right"></div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      {/* </form> */}
                      <div className="row">
                          <div className="col-xs-12">
                              <a href="catalog.html" className="btn btn-success btn-lg">Our Program Catalog</a>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-3 col-md-9 col-sm-12 col-xs-12 hidden-xs hiddem-sm hidden-md visible-lg">
                      <div id="SpecialOffer" className="col-lg-12">
                          <div className="visible-lg hidden-md hidden-sm hidden-xs" style={{width:'auto'}}>
                              <div className="panel panel-primary">
                                  <div className="panel-heading text-center">
                                      Complete Library Subscription
                                  </div>
                                  <div className="panel-body">
                                      <div style={{'color':'#383433','paddingBottom':'10px',borderBottom:'1px dotted #818181'}}>
                                          Subscribe to the
                                          <a href="/AODHome/catalog?pack=Complete%20Library">
                                              Complete Library
                                          </a>
                                          for as long as you want.
                                      </div>
                                      <div style={{'color':'#383433','paddingBottom':'10px',borderBottom:'1px dotted #818181'}}>
                                          <p style={{fontSize:'22px','color':'#818d43',fontWeight:'600'}}>₹749.00 / month</p>
                                      </div>
                                  </div>
                                  <div className="panel-footer text-center">
                                      <a href={{javascript:void(0)}}  className="btn btn-default btn-block">
                                          <i className="glyphicon glyphicon-shopping-cart"></i>&nbsp; <strong>Add to cart</strong>
                                      </a>
                                  </div>
                              </div>
                              <div className="panel panel-primary">
                                  <div className="panel-heading text-center">
                                      Complete Library Access
                                  </div>
                                  <div className="panel-body">
                                      <div style={{'color':'#383433','paddingBottom':'10px',borderBottom:'1px dotted #818181'}}>
                                          Purchase Access to the
                                          <a href="/AODHome/catalog?pack=Complete%20Library">
                                              Complete Library
                                          </a>
                                          <span>for 1 year.</span>
                                      </div>
                                      <div style={{'color':'#383433','paddingBottom':'10px',borderBottom:'1px dotted #818181'}}>
                                          <p style={{fontSize:'22px','color':'#818d43',fontWeight:'600'}}>₹5999.00 / year</p>
                                      </div>
                                  </div>
                                  <div className="panel-footer text-center">
                                      <a  href={{javascript:void(0)}}  className="btn btn-default btn-block">
                                          <i className="glyphicon glyphicon-shopping-cart"></i>&nbsp; <strong>Add to cart</strong>
                                      </a>
                                  </div>
                              </div>
                          </div>
                          <div className="visible-xs visible-sm visible-md hidden-lg col-md-12 col-sm-12 col-xs-12">
                              <div className="col-md-6 col-sm-6 col-xs-12" style={{left:'0px',right:'0px'}}>
                                  <div className="panel panel-primary" style={{height:'250px'}}>
                                      <div className="panel-heading text-center">
                                          Complete Library Subscription
                                      </div>
                                      <div className="panel-body" style={{height:'135px'}}>
                                          <div style={{'color':'#383433','paddingBottom':'10px',borderBottom:'1px dotted #818181'}}>
                                              <span>Subscribe to the <a href="/AODHome/catalog?pack=Complete%20Library">Complete Library</a> for as long as you want.</span>
                                          </div>
                                          <div style={{fontWeight:'bold',color:'#000'}}>
                                              <h4 className="color-blue">
                                                  <strong><span style={{color:'red'}}></span></strong>
                                              </h4>
                                              <p style={{fontSize:'22px','color':'#818d43',fontWeight:'600'}} className="text-center">₹749.00 / month</p>
                                          </div>
                                      </div>
                                      <div className="panel-footer text-center">
                                          <a href={{javascript:void(0)}}  className="btn btn-default btn-block">
                                              <i className="glyphicon glyphicon-shopping-cart"></i>&nbsp; <strong>Add to cart</strong>
                                          </a>

                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6 col-sm-6 col-xs-12" style={{left:'0px',right:'0px'}}>
                                  <div className="panel panel-primary" style={{height:'250px'}}>
                                      <div className="panel-heading text-center">
                                          Complete Library Access
                                      </div>
                                      <div className="panel-body" style={{height:'135px'}}>
                                          <div style={{'color':'#383433','paddingBottom':'10px',borderBottom:'1px dotted #818181'}}>
                                              <span>
                                                  Purchase Access to the <a href="/AODHome/catalog?pack=Complete%20Library">Complete Library</a>
                                                  <span>for 1 year.</span>
                                              </span>
                                          </div>
                                          <div style={{fontWeight:'bold',color:'#000'}}>
                                              <h4 className="color-blue">
                                                  <strong><span style={{color:'red'}}></span></strong>
                                              </h4>
                                              <p style={{fontSize:'22px','color':'#818d43',fontWeight:'600'}} className="text-center">₹5999.00 / year</p>
                                          </div>
                                      </div>
                                      <div className="panel-footer text-center">
                                          <a href={{javascript:void(0)}}  className="btn btn-default btn-block">
                                              <i className="glyphicon glyphicon-shopping-cart"></i>&nbsp; <strong>Add to cart</strong>
                                          </a>

                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <br />
                  </div>
                  <p style={{textAlign:'center'}} className="row col-lg-10 col-md-12 col-sm-12 col-xs-12">
                      <br /><a href={{javascript:void(0)}} title="loadmore" className="btn btn-primary">Load More<i id="wait" className="fa fa-spinner fa-spin large" style={{'display':'none'}}></i></a>
                  </p>
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12  hidden-lg visible-md visible-sm visible-xs">
                  <div id="SpecialOffer" className="col-sm-12 col-md-12  col-xs-12">
                      <div className="visible-lg hidden-md hidden-sm hidden-xs" style={{width:'auto'}}>
                          <div className="panel panel-primary">
                              <div className="panel-heading text-center">
                                  Complete Library Subscription
                              </div>
                              <div className="panel-body">
                                  <div style={{'color':'#383433','paddingBottom':'10px',borderBottom:'1px dotted #818181'}}>
                                      Subscribe to the
                                      <a href="/AODHome/catalog?pack=Complete%20Library">
                                          Complete Library
                                      </a>
                                      for as long as you want.
                                  </div>
                                  <div style={{'color':'#383433','paddingBottom':'10px',borderBottom:'1px dotted #818181'}}>
                                      <p style={{fontSize:'22px','color':'#818d43',fontWeight:'600'}}>₹749.00 / month</p>
                                  </div>
                              </div>
                              <div className="panel-footer text-center">
                                  <a href={{javascript:void(0)}}  className="btn btn-default btn-block">
                                      <i className="glyphicon glyphicon-shopping-cart"></i>&nbsp; <strong>Add to cart</strong>
                                  </a>
                              </div>
                          </div>
                          <div className="panel panel-primary">
                              <div className="panel-heading text-center">
                                  Complete Library Access
                              </div>
                              <div className="panel-body">
                                  <div style={{'color':'#383433','paddingBottom':'10px',borderBottom:'1px dotted #818181'}}>
                                      Purchase Access to the
                                      <a href="/AODHome/catalog?pack=Complete%20Library">
                                          Complete Library
                                      </a>
                                      <span>for 1 year.</span>
                                  </div>
                                  <div style={{'color':'#383433','paddingBottom':'10px',borderBottom:'1px dotted #818181'}}>
                                      <p style={{fontSize:'22px','color':'#818d43',fontWeight:'600'}}>₹5999.00 / year</p>
                                  </div>
                              </div>
                              <div className="panel-footer text-center">
                                  <a href={{javascript:void(0)}}  className="btn btn-default btn-block">
                                      <i className="glyphicon glyphicon-shopping-cart"></i>&nbsp; <strong>Add to cart</strong>
                                  </a>
                              </div>
                          </div>
                      </div>
                      <div className="visible-xs visible-sm visible-md hidden-lg col-md-12 col-sm-12 col-xs-12">
                          <div className="col-md-6 col-sm-6 col-xs-12" style={{left:'0px',right:'0px'}}>
                              <div className="panel panel-primary" style={{height:'250px'}}>
                                  <div className="panel-heading text-center">
                                      Complete Library Subscription
                                  </div>
                                  <div className="panel-body" style={{height:'135px'}}>
                                      <div style={{color:'#383433','paddingBottom':'10px',borderBottom:'1px dotted #818181'}}>
                                          <span>Subscribe to the <a href="/AODHome/catalog?pack=Complete%20Library">Complete Library</a> for as long as you want.</span>
                                      </div>
                                      <div style={{fontWeight:'bold','color':'#000'}}>
                                          <h4 className="color-blue">
                                              <strong><span style={{color:'red'}}></span></strong>
                                          </h4>
                                          <p style={{fontSize:'22px',color:'#818d43',fontWeight:'600'}} className="text-center" >₹749.00 / month</p>
                                      </div>
                                  </div>
                                  <div className="panel-footer text-center">
                                      <a href={{javascript:void(0)}} className="btn btn-default btn-block">
                                          <i className="glyphicon glyphicon-shopping-cart"></i>&nbsp; <strong>Add to cart</strong>
                                      </a>

                                  </div>
                              </div>
                          </div>
                          <div className="col-md-6 col-sm-6 col-xs-12" style={{left:'0px',right:'0px'}}>
                              <div className="panel panel-primary" style={{height:'250px'}}>
                                  <div className="panel-heading text-center">
                                      Complete Library Access
                                  </div>
                                  <div className="panel-body" style={{height:'135px'}}>
                                      <div style={{color:'#383433','paddingBottom':'10px',borderBottom:'1px dotted #818181'}}>
                                          <span>
                                              Purchase Access to the <a href="/AODHome/catalog?pack=Complete%20Library">Complete Library</a>
                                              <span>for 1 year.</span>
                                          </span>
                                      </div>
                                      <div style={{fontWeight:'bold','color':'#000'}}>
                                          <h4 className="color-blue">
                                              <strong><span style={{color:'red'}}></span></strong>
                                          </h4>

                                          <p style={{fontSize:'22px',color:'#818d43',fontWeight:'600'}} className="text-center">₹5999.00 / year</p>
                                      </div>
                                  </div>
                                  <div className="panel-footer text-center">
                                      <a href={{javascript:void(0)}}  className="btn btn-default btn-block">
                                          <i className="glyphicon glyphicon-shopping-cart"></i>&nbsp; <strong>Add to cart</strong>
                                      </a>

                                  </div>
                              </div>
                          </div>

                      </div>
                  </div>
                  <br />
              </div>           
              <div id="AlertForm" className="form-horizontal" role="form">
                  <div className="modal modal-login fade" id="myAlertModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                          <div className="modal-content">
                              <div className="modal-header">
                                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                  <h3 className="modal-title text-primary" id="myAlertModalLabel">Notification</h3>
                              </div>
                              <div className="modal-body">
                                  <div className="row">
                                      <strong>&nbsp;You have already subscribed this Pack! You may choose many other options from A.D.A.M.'s library of in-depth courses. </strong>
                                      <div className="col-lg-6 text-center">

                                      </div>
                                  </div>
                              </div>
                              <div className="modal-footer">
                                  <div className="pull-right"></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <hr />       
              <div className="page-header">
                  <h3 className="our-customer" align="center">Our Customers</h3>
              </div>
              <div className="row">
                  <div className="col-xs-12 text-center image-gap" id="block">
                      <div className="logos-animate" id="div1" style={{'display': 'none'}}>
                          <a rel='noopener noreferrer' href="https://www.einstein.yu.edu/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/einstein.png" /></a>
                          <a rel='noopener noreferrer' href="https://www.walgreens.com/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/wakgreens.png" /></a>
                          <a rel='noopener noreferrer' href="https://www.umd.edu/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/univ_maryland.png" /></a>
                          <a rel='noopener noreferrer' href="https://www.epic.com/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/customer4.png" /></a>
                          <a rel='noopener noreferrer' href="https://www.nytimes.com/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/customer5.png" /></a>
                          <a rel='noopener noreferrer' href="https://www.pennmedicine.org/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/customer6.png" /></a>
                          <a rel='noopener noreferrer' href="http://www.abiomed.com/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/Abiomed.png" /></a>
                      </div>
                      <div className="logos-animate" id="div2" style={{'display': 'block'}}>
                          <a rel='noopener noreferrer' href="https://www.google.co.in/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/google.png" /></a>
                          <a rel='noopener noreferrer' href="https://www.optum.com/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/optum_health.png" /></a>
                          <a rel='noopener noreferrer' href="https://www.swissre.com/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/swiss_re.png" /></a>
                          <a rel='noopener noreferrer' href="https://www.highmarkblueshield.com/home/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/highmark_bluecross_blueshield.png" /></a>
                          <a rel='noopener noreferrer' href="http://www.northwestern.edu/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/northwestern_university.png" /></a>
                          <a rel='noopener noreferrer' href="https://www.about.com/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/about.com.png" /></a>
                          <a rel='noopener noreferrer' href="http://www.gilead.com/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/Gilead.png" /></a>
                      </div>
                      <div className="logos-animate" id="div3" style={{'display': 'none'}}>
                          <a rel='noopener noreferrer' href="https://hms.harvard.edu/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/harvard_medical_school.png" /></a>
                          <a rel='noopener noreferrer' href="https://www.follettsoftware.com/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/follett.png" /></a>
                          <a rel='noopener noreferrer' href="https://www.nlm.nih.gov/medlineplus/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/medline_plus.png" /></a>
                          <a rel='noopener noreferrer' href="http://www.upmc.com/Pages/default.aspx" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/upmc.png" /></a>
                          <a rel='noopener noreferrer' href="https://www.umoncton.ca/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/univ_moncton.png" /></a>
                          <a rel='noopener noreferrer' href="https://www.griffith.edu.au/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/griffith_univ.png" /></a>
                          <a rel='noopener noreferrer' href="https://www.kitepharma.com/" target="_blank"><img alt="" className="img-responsive" src="../images/AOD/client_logos/KitePharma.png" /></a>
                      </div>
                  </div>
              </div>
          </div>
          <hr />
          
        </div>  
              
      );
    }
}