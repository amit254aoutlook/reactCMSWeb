import React,{Component} from "react";

export default class Footer extends Component {
    render() {
        return (
            <footer id="footer">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <img src="/images/Common-logos/ebix-adam_logo.png" alt="A.D.A.M. On Demand" className="hidden-xs"/>
                        <img src="/images/Common-logos/mobile-footer-logo.png" alt="A.D.A.M. On Demand" className="visible-xs"/>
                    </div>
                </div>
                <div className="clearfix">&nbsp;</div>
                <div className="clearfix">&nbsp;</div>
                <div className="row">
                    <div className="col-lg-8">
                        <p>A.D.A.M. &mdash; The company that pioneered online health content, A.D.A.M. is dedicated to creating and offering the most effective and innovative educational solutions possible for teaching medical science and improving health literacy.</p>
                        <p>
                            <a rel='noopener noreferrer' target="_blank" className="read-more-fotter" href="http://www.adam.com/">READ MORE</a>
                        </p>
                        <p style={{lineHeight: '10px'}}>&nbsp;</p>
                        <p>EBIX &mdash; A leading international supplier of OnDemand software and E-commerce services to the insurance industry, Ebix, Inc., (NASDAQ: EBIX) provides end-to-end solutions ranging from infrastructure exchanges, carrier systems, agency systems and BPO services to custom software development for all entities involved in the insurance industry.</p>
                        <p>
                            <a rel='noopener noreferrer' target="_blank" className="read-more-fotter" href="http://www.ebix.com/">READ MORE</a>
                        </p>
                    </div>
                    <div className="col-lg-1 white-left-border hidden-xs hidden-sm hidden-md">&nbsp;</div>
                    <div className="col-lg-3">
                        <h4>Inquiries:</h4>
                        <p>
                            <a style={{textDecoration:'none'}} href="mailto:aod-info@ebix.com">aod-info@ebix.com</a>
                        </p>
                        <h4>Support:</h4>
                        <p>rel='noopener noreferrer'
                            <a style={{textDecoration:'none'}} href="mailto:aod-support@ebix.com">aod-support@ebix.com</a>
                        </p>
                        <p className="sociallinks">
                           {/* <a rel='noopener noreferrer' className="fb" href="https://www.facebook.com/adamondemand" target="_blank"></a>
                            <a rel='noopener noreferrer' className="tw" href="https://twitter.com/ADAM_Health" target="_blank"></a>
                            <a  className="lin" href="https://www.linkedin.com/company/a-d-a-m--inc-/" rel='noopener noreferrer' target="_blank"></a>
                             <a className="feed" href="https://www.adamondemand.com/feed/" target="_blank"></a> */}
    
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <ul className="footer-link">
                            <li>
                                <a className="white-text-border" href={{javascript:void(0)}}>Privacy Policy</a>
                                |
    
                                <a className="white-text-border" href={{javascript:void(0)}}> Terms & Conditions</a>
                                |
                                <a className="white-text-border" href={{javascript:void(0)}}>Website Use Policy</a>
                                |
                                <a className="white-text-border" href={{javascript:void(0)}}>Site Map</a>
                                |
                                <a className="white-text-border" href={{javascript:void(0)}}>Contact Us</a>
                            </li>
                        </ul>
                        <p id="copyright">
                            &copy;
                            <script>document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()))</script>
                            Ebix, Inc. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
        );
    }
}