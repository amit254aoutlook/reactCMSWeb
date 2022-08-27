
import React,{Component} from 'react';

//import AuthService from "../services/auth.service";

export default class LeftMenu extends Component {
   

    render() {
        return (
            <div className="container-fluid" id="main-container">
                <a id="menu-toggler" href={{javascript:void(0)}}>
                    <span></span>
                </a>
                <div id="sidebar">
                    <div id="sidebar-shortcuts" style={{display:'none'}}>
                        <div id="sidebar-shortcuts-large">
                            <a href="/Home/AdminDashboard">
                                <button type="button" className="btn btn-small btn-success">
                                    <i className="icon-signal"></i>
                                </button>
                            </a>


                            <a href="/Admin/UsersInformation">
                                <button type="button" className="btn btn-small btn-info">
                                    <i className="icon-pencil"></i>
                                </button>
                            </a>
                            <a href="/Admin/Subscription">
                                <button type="button" className="btn btn-small btn-warning">
                                    <i className="icon-group"></i>
                                </button>
                            </a>
                            <a href="/Admin/GroupSubscription">
                                <button type="button" className="btn btn-small btn-danger">
                                    <i className="icon-cogs"></i>
                                </button>
                            </a>
                        </div>

                        <div id="sidebar-shortcuts-mini">
                            <span className="btn btn-success"></span>

                            <span className="btn btn-info"></span>

                            <span className="btn btn-warning"></span>

                            <span className="btn btn-danger"></span>
                        </div>
                    </div>

                    <ul id="uladminmenu" className="nav nav-list">
                        <li className="active">
                            <a href='/admin/dashboard'>
                                <i className="icon-dashboard"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        {/* <!-- [ngClass]="(isOpen ? 'open' : '')"  [style.display] = "isOpen ? 'block' : 'none'"--> */}
                        <li>
                            <a href={{javascript:void(0)}} className="dropdown-toggle" >
                                <i className="icon-shopping-cart"></i>
                                <span>Program Setup</span>
                                <b className="arrow icon-angle-down"></b>
                            </a>
                            <ul className="submenu">
                                <li>
                                    <a href='/admin/products'>
                                        <i className="icon-double-angle-right"></i>
                                        Program Setup
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/bundle">
                                        <i className="icon-double-angle-right"></i>
                                        Bundles
                                    </a>
                                </li>
                                <li>
                                    <a href='/admin/categories'>
                                        <i className="icon-double-angle-right"></i>
                                        Categories
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href={{javascript:void(0)}} className="dropdown-toggle">
                                <i className="icon-envelope-alt"></i>
                                <span>Content Setup</span>
                                <b className="arrow icon-angle-down"></b>
                            </a>
                            <ul className="submenu">
                                <li>
                                    <a href="/Admin/ConfigPosts?ContentType=2">
                                        <i className="icon-double-angle-right"></i>
                                        Manage Pages
                                    </a>
                                </li>
                                <li>
                                    <a href="/Admin/ConfigPosts?ContentType=1">
                                        <i className="icon-double-angle-right"></i>
                                        Manage  Blogs
                                    </a>
                                </li>
                                <li>
                                    <a href="/Admin/ConfigPosts?ContentType=3">
                                        <i className="icon-double-angle-right"></i>
                                        Email Templates
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href={{javascript:void(0)}} className="dropdown-toggle">
                                <i className="icon-user"></i>
                                <span>Users</span>
                                <b className="arrow icon-angle-down"></b>
                            </a>
                            <ul className="submenu">
                                <li>
                                    <a href='/admin/user'>
                                        <i className="icon-double-angle-right"></i>
                                        Manage Users
                                    </a>
                                </li>
                                <li>
                                    <a href="/Admin/MerchantUserGroup">
                                        <i className="icon-double-angle-right"></i>
                                        Manage User Groups
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href={{javascript:void(0)}} className="dropdown-toggle">
                                <i className="icon-bar-chart"></i>
                                <span>Reports</span>
                                <b className="arrow icon-angle-down"></b>
                            </a>
                            <ul className="submenu">
                                <li>
                                    <a href="/Admin/LMSAccess">
                                        <i className="icon-double-angle-right"></i>
                                        LMS Access Report
                                    </a>
                                </li>
                                <li>
                                    <a href="/Admin/ModuleAccessReport">
                                        <i className="icon-double-angle-right"></i>
                                        Program Access Report
                                    </a>
                                </li>
                                <li>
                                    <a href="/Admin/UserModuleSubscription">
                                        <i className="icon-double-angle-right"></i>
                                        User Program Subscription Report
                                    </a>
                                </li>
                                <li>
                                    <a href="/Admin/PromoCodeUsage">
                                        <i className="icon-double-angle-right"></i>
                                        Promo Code Usage
                                    </a>
                                </li>
                                <li>
                                    <a href="/Admin/ProductKeywordsRPT">
                                        <i className="icon-double-angle-right"></i>
                                        Products Keywords Report
                                    </a>
                                </li>
                                <li>
                                    <a href="/Admin/RevenueReport">
                                        <i className="icon-double-angle-right"></i>
                                        Revenue Report
                                    </a>
                                </li>
                                <li>
                                    <a href="/admin/CompleteLibrarySubscriptionRpt">
                                        <i className="icon-double-angle-right"></i>
                                        Complete Library Subscription Report
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href={{javascript:void(0)}} className="dropdown-toggle">
                                <i className="icon-key"></i>
                                <span>Configuration</span>
                                <b className="arrow icon-angle-down"></b>
                            </a>
                            <ul className="submenu">
                                <li>
                                    <a href='/admin/metakeyinfo'>
                                        <i className="icon-double-angle-right"></i>
                                        Custom Fields
                                    </a>
                                </li>
                                <li>
                                    <a href="/Admin/ConfMenus">
                                        <i className="icon-double-angle-right"></i>
                                        Menu
                                    </a>
                                </li>
                                <li>
                                    <a href="/Admin/SetMenuAccess">
                                        <i className="icon-double-angle-right"></i>
                                        Role Access Rights
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href={{javascript:void(0)}} className="dropdown-toggle">
                                <i className="icon-book"></i>
                                <span>Categories</span>
                                <b className="arrow icon-angle-down"></b>
                            </a>
                            <ul className="submenu">
                                <li>
                                    <a href="/Admin/CategoryProductAssign">
                                        <i className="icon-double-angle-right"></i>
                                        Assign Products
                                    </a>
                                </li>
                                <li>
                                    <a href="/Admin/Import">
                                        <i className="icon-double-angle-right"></i>
                                        Import User List
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href={{javascript:void(0)}} className="dropdown-toggle">
                                <i className="icon-qrcode"></i>
                                <span>Promo Codes</span>
                                <b className="arrow icon-angle-down"></b>
                            </a>
                            <ul className="submenu">
                                <li>
                                    <a href="/Admin/PromoCode">
                                        <i className="icon-double-angle-right"></i>
                                        Manage Promo Codes
                                    </a>
                                </li>
                                <li>
                                    <a href="/Admin/Discount">
                                        <i className="icon-double-angle-right"></i>
                                        Manage Discount
                                    </a>
                                </li>
                                <li>
                                    <a href="/Admin/Licenses">
                                        <i className="icon-double-angle-right"></i>
                                        Manage License
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div id="sidebar-collapse">
                        <i className="icon-double-angle-left"></i>
                    </div>
                </div>
            </div>
        );
    }
}