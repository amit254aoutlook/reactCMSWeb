import React,{Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import Pagination from "@material-ui/lab/Pagination";
// import { Link } from "react-router-dom";

import './category.css';
import AdminService from '../../../services/admin.service.js';

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };


export default class Category extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
           categoryTypes:null,
           categoryGroups:null,
           categories:[],
           addvisible: false,
           CategoryId:0,
           CategoryName:"",
           CategoryType:0,
           CategoryGroupId:0,
           IsActive:true,
           loading: false,
           message: "",
           submitted:false,
           currentIndex: -1,
           searchTitle: "",

           page: 1,
           count: 0,
           pageSize: 5,
           totalItems: 0
        };

        this.pageSizes = [5, 10, 20, 50, 100];

        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveCategories = this.retrieveCategories.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.editCategory=this.editCategory.bind(this);
        this.openAdd = this.openAdd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.getCategoryType();
    }

    componentDidMount() {        
        this.retrieveCategories();
        AdminService.GetCategotyType().then(response => {
            //alert(JSON.stringify(response))
            this.setState({
                categoryTypes: response.data
            });
          },
          error => {
            this.setState({
                categoryTypes:
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString()
            });
          }
        );


        AdminService.GetCategoryGroup().then(response => {
            //alert(JSON.stringify(response))
            this.setState({
                categoryGroups: response.data
            });
          },
          error => {
            this.setState({
                categoryGroups:
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString()
            });
          }
        );
    };

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;
    
        this.setState({
          searchTitle: searchTitle,
        });
    }
    
    getRequestParams(searchTitle, page, pageSize) {
        let params = {};
    
        if (searchTitle) {
          params["title"] = searchTitle;
        }
    
        if (page) {
          params["page"] = page - 1;
        }
    
        if (pageSize) {
          params["size"] = pageSize;
        }
    
        return params;
    };

    retrieveCategories() {
        const { searchTitle, page, pageSize } = this.state;
        const params = this.getRequestParams(searchTitle, page, pageSize);
    
        AdminService.GetCategory(params)
          .then((response) => {
            const { categories, totalPages, totalItems } = response.data;
    
            this.setState({
              categories: categories,
              count: totalPages,
              totalItems: totalItems
            });
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    };

    handlePageChange(event, value) {
        this.setState(
          {
            page: value,
          },
          () => {
            this.retrieveCategories();
          }
        );
    };
    
    handlePageSizeChange(event) {
        this.setState(
          {
            pageSize: event.target.value,
            page: 1
          },
          () => {
            this.retrieveCategories();
          }
        );
    };
    

    openAdd(e) {      
        e.preventDefault();     
        const addvisible = !this.state.addvisible;
        this.setState({
            addvisible,
            CategoryId:0,
            CategoryName:"",
            CategoryType:0,
            CategoryGroupId:0,
            IsActive:true,
        });
    };

    onChangeCategoryName(e) {
        this.setState({
          CategoryName: e.target.value
        });
    };
    
    onSelectCategoryType(e) {
        this.setState({
            CategoryType: e.target.value
        });
    };

    onSelectCategoryGroupId(e) {
        this.setState({
            CategoryGroupId: e.target.value
        });

    }

    handleSubmit(e)
    {
        e.preventDefault();
    
        this.setState({
          message: "",
          loading: true
        });
    
        this.form.validateAll();
    
        if (this.state.CategoryId===0) {
            var data = {
                CategoryName: this.state.CategoryName,
                CategoryType: this.state.CategoryType,
                CategoryGroupId: this.state.CategoryGroupId,
                IsActive: this.state.IsActive
            };
            AdminService.CreateCategory(data)
            .then(response => {
                this.setState({
                    message:response.message,        
                    submitted: true
                });
                console.log(response.data);
              })
              .catch(e => {
                console.log(e);
              });
        }
        else {
            var udata = {
                CategoryId: this.state.CategoryId,
                CategoryName: this.state.CategoryName,
                CategoryType: this.state.CategoryType,
                CategoryGroupId: this.state.CategoryGroupId,
                IsActive: this.state.IsActive
            };
            AdminService.UpdateCategory(udata)
            .then(response => {
                this.setState({
                    message:response.message,        
                    submitted: true
                });
                console.log(response.data);
              })
              .catch(e => {
                console.log(e);
              });
        }

    }

    editCategory(id){
        //alert(id)
        this.setState({
            addvisible : !this.state.addvisible            
        })
       
        AdminService.GetCategoryById(id)
            .then(response => {
                //alert(JSON.stringify(response.data))
                this.setState({
                  CategoryId: response.data.CategoryId,
                  CategoryName: response.data.CategoryName,
                  CategoryType:response.data.CategoryType,
                  CategoryGroupId:response.data.CategoryGroupId,
                  IsActive:response.data.IsActive
                });
                //console.log(response.data);
              })
              .catch(e => {
                console.log(e);
              });
        

    }

    render() {
        const {
            searchTitle,           
            //currentIndex,
            page,
            count,
            pageSize,
            totalItems,
          } = this.state;
        const categoryTypes = this.state.categoryTypes;
        const categoryGroups=this.state.categoryGroups;
        const categories=this.state.categories;
        //alert(JSON.stringify(categories))
        return (
            <div className="row-fluid"> 
                {!this.state.addvisible ? (  
                <div id="divSearchList">
                        <div className="row-fluid">
                            <div className="span12">
                                <div className="widget-box">
                                    <div className="widget-header">
                                        <h4>Search Categories</h4>
                                        <span className="widget-toolbar">
                                            <a data-action="collapse" href={{}}>
                                                <i className="icon-chevron-up"></i>
                                            </a>
                                        </span>
                                    </div>
                                    <div className="widget-body">
                                        <div className="widget-body-inner">
                                            <div className="widget-main">
                                                <label className="control-label" htmlFor="CategoriesSearch">Category Name</label>
                                                <input className="span12" id="txtSearchText" name="CategoriesSearch" value={searchTitle} onChange={this.onChangeSearchTitle} placeholder="Category Name" style={{color:'#000 !important'}} type="text"/>
                                                <button id="btnSearch" onClick={this.retrieveCategories} className="btn btn-primary btn-small" style={{width: '100px', margin: '5px'}}>
                                                    Search
                                                </button>
                                                <a id="btnReset" href={{}} className="btn btn-primary btn-small" data-pdsa-action="resetsearch" style={{width: '100px', margin: '5px'}}>
                                                    Reset
                                                </a>
                                                <a id="btnAdd"  href={{}} onClick={this.openAdd} className="btn btn-primary btn-small" style={{width: '100px',  margin: '5px'}}>
                                                    Add
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row-fluid">
                            <div className="span12">
                                <div className="widget-box">
                                    <div className="widget-header widget-header-small">
                                        <h4>Categories</h4>
                                        <span className="widget-toolbar">
                                            <a href={{}} data-action="collapse">
                                                <i className="icon-chevron-up"></i>
                                            </a>
                                        </span>
                                    </div>
                                    <div className="widget-body">
                                        <div className="widget-body-inner">
                                            <div className="widget-main padding-4">
                                                <div id="divPageLength" className="dataTables_length">
                                                    <span>
                                                        Display &nbsp;
                                                        <select name="table_report_length" onChange={this.handlePageSizeChange} value={pageSize} aria-controls="table_report" style={{marginTop: '5px'}}>
                                                        {this.pageSizes.map((size) => (
                                                            <option key={size} value={size}>
                                                            {size}
                                                            </option>
                                                        ))}
                                                        </select>
                                                        &nbsp; records
                                                    </span>
                                                </div>
                                                <div className="table-responsive">
                                                    <table id="tblCategories" className="table table-condensed table-bordered table-striped table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    <a href={{}} >
                                                                        Category Name
                                                                    </a>
                                                                </th>
                                                                <th>
                                                                    <a href={{}} >
                                                                        Category Type
                                                                    </a>
                                                                </th>
                                                                <th>
                                                                    <a href={{}} >
                                                                        Category Group
                                                                    </a>
                                                                </th>
                                                                <th>
                                                                    <a href={{}} >
                                                                        Is Active
                                                                    </a>
                                                                </th>
                                                                <th className="center" style={{width:'40px'}}>
                                                                    Actions
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                categories.map(category=>(
                                                                    <tr >
                                                                        <td>
                                                                           {category.CategoryName}
                                                                        </td>
                                                                        <td>
                                                                           Product
                                                                        </td>
                                                                        <td>
                                                                          {category.CategoryGroup.CategoryGroupName} 
                                                                        </td>
                                                                        <td>
                                                                          {category.IsActive ? 'True' : 'False'}
                                                                        </td>
                                                                        <td className="td-actions" style={{width:'70px'}}>
                                                                            <button  onClick={() => this.editCategory(category.CategoryId)} className="btn-sm btn-color-primary" style={{textDecoration:'none'}} title="Edit">
                                                                                <i className="icon-edit"></i>
                                                                            </button>&nbsp;
                                                                            {/* <Link to={"/tutorials/" + category.CategoryId}  className="badge badge-warning"><i className="icon-edit"></i></Link>
                                                                             */}
                                                                            <button href={{javascript:void(0)}} className="btn-sm btn-color-primary" style={{color: 'red', textDecoration:'none'}} title="Delete">
                                                                                <i className="icon-trash"></i>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                            
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div id="divPager" className="row-fluid">
                                                    <div className="span6">
                                                        <div className="dataTables_info" id="table_report_info">Showing {((page-1)*pageSize)+1} to {totalItems<((page)*pageSize)?totalItems:((page)*pageSize)} of {totalItems} entries</div>
                                                    </div>
                                                    <div className="span6">
                                                        <div className="dataTables_paginate paging_bootstrap pagination">
                                                            <Pagination
                                                                className="my-3"
                                                                count={count}
                                                                page={page}
                                                                siblingCount={1}
                                                                boundaryCount={1}
                                                                variant="outlined"
                                                                shape="rounded"
                                                                onChange={this.handlePageChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ):(
                <div className="row-fluid"  id="divAddCategories">
                        <div className="span12">
                            <div id="divControlGroup">
                                <div className="widget-box">
                                    <div className="widget-header">
                                        <h4>
                                            <span>Add Category</span>
                                        </h4>
                                        <span className="widget-toolbar">
                                            <a href={{}} data-action="collapse">
                                                <i className="icon-chevron-up"></i>
                                            </a>                        
                                        </span>
                                    </div>
                                    <div className="widget-body">
                                        <div className="widget-body-inner">                                           
                                           <div className="widget-main">
                                                <Form onSubmit={this.handleSubmit} ref={c => { this.form = c; }}>
                                                    <div style={{width:'520px'}}>
                                                        {this.state.message && (
                                                            <div className="form-group">
                                                                <div className="alert alert-danger span6" role="alert">
                                                                    {this.state.message}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="control-group">
                                                        <Input id="CategoryId"  name="CategoryId" type="hidden" value={this.state.CategoryId}/>
                                                        <label className="control-label" htmlFor="CategoryName">Category Name<span className="required">*</span></label>
                                                        <Input className="span6" id="CategoryName" value={this.state.CategoryName} name="CategoryName"  onChange={this.onChangeCategoryName} validations={[required]} maxLength="50" placeholder="Category Name" tabIndex="1" type="text"/>
                                                    
                                                        <br/>
                                                        <label className="control-label" htmlFor="CategoryType">Category Type</label>
                                                        <Select className="span6" id="CategoryType" value={this.state.CategoryType}  name="CategoryType" onSelect={this.onSelectCategoryType}>
                                                            {
                                                               categoryTypes.map(cat=>(
                                                                    <option  key={cat.CategoryTypeId} value={cat.CategoryTypeId}>{cat.CategoryType}</option>
                                                                ))
                                                            }                                                           
                                                        </Select>
                                                        <br/>                                                        
                                                        <label className="control-label" htmlFor="CategoryGroupId">Category Group Name</label>
                                                        <Select className="span6" id="CategoryGroupId" value={this.state.CategoryGroupId} name="CategoryGroupId" onSelect={this.onSelectCategoryGroupId} validations={[required]}>
                                                            <option key="0" value="0">Select</option>
                                                            {
                                                                categoryGroups.map(catg=>(
                                                                    <option key={catg.CategoryGroupId} value={catg.CategoryGroupId}>{catg.CategoryGroupName}</option>
                                                                ))
                                                            }                                                            
                                                        </Select>                                                        
                                                        {/* <a  id="btnCategoryGroup" className="btn btn-primary btn-small" href={{javascript:void(0)}} style={{marginBottom: '9px',width: '150px',marginLeft: '5px'}}>
                                                            Add Category Group
                                                        </a> */}
                                                        <br/><br/>
                                                        <div className="row-fluid control-group">
                                                            <label className="control-label span12">
                                                                Is Active
                                                                <input className="checkbox"  checked={this.state.IsActive===1? 'checked' : ''} id="isActive" name="isActive" style={{marginLeft:'10px',marginTop:'0px'}} type="checkbox"/>
                                                            </label>
                                                        </div>
                                                        <button id="btnSave"  className="btn btn-primary btn-small" style={{width:'115px',margin:'5px'}}>
                                                          Save
                                                        </button>                                                       
                                                        <a id="btnBack" href={{}} onClick={this.openAdd} className="btn btn-primary btn-small" style={{width: '115px',margin:'5px'}}>
                                                            Back
                                                        </a>
                                                        <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c; }} />
                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>          
        );
    }
}