import React,{Component} from "react";
import Pagination from "@material-ui/lab/Pagination";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";

import AdminService from '../../../services/admin.service.js';
import Custom from './custom.jsx';
import ProductPrice from './productprice.jsx';
import Bundle from './productbundle.jsx';
import ProductCategory from './category.jsx';
import ProgramActivation from './programactivation.jsx';

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
};

export default class Product extends Component {
    constructor(props)
    {
        super(props);
        this.custom = React.createRef();
        this.productprice=React.createRef();
        this.state = {
            //screen open variables
            addvisible:false,
            ProgramInfoScreen:false,
            customScreen:false,
            programPriceScreen:false,
            programBundleScreen:false,
            CategoryScreen:false,
            ActivationScreen:false,

            programtypes:null,
            programs:[],
            merchantproduct:[],
            submitted:false,           
            currentIndex: -1,
            company:"1",
            searchTitle:"",
            //Paging Variable
            page: 1,
            count: 0,
            pageSize: 5,
            totalItems: 0,

            //Form variables
            ProductId:0,
            ProducName:"",
            ProductType:1,
            CompanyId:1,
            ProductUniqueCode:"",
            ProductUniqueName:"",
            ProductSummary:"",
            ProgramMerchantCPD:[
                {
                    MerchantId : 0,
                    MerchantCompany:"",
                    ProductId : 0,
                    CPDHour : 0,
                    IsActive : true
                }
            ],

            //File Upload Variable
            CatalogFile:null,
            CatalogMessage:"",
            catelogimage:"",
            ScreenShotImages:null,
            ScreenshotMessage:"",
            ScormPackageFile:null,
            ScormPackageMessage:"",
            scormpackagepath:""
        }
        this.pageSizes = [5, 10, 20, 50, 100];
        this.openAdd = this.openAdd.bind(this);
        this.openProgramInfoScreen = this.openProgramInfoScreen.bind(this);
        this.openCustomScreen = this.openCustomScreen.bind(this);
        this.openProgramPriceScreen = this.openProgramPriceScreen.bind(this);
        this.openProgramBundleScreen = this.openProgramBundleScreen.bind(this);
        this.openCategoryScreen= this.openCategoryScreen.bind(this);
        this.openActivationScreen= this.openActivationScreen.bind(this);        
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.onChangeCompany=this.onChangeCompany.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.retrievePrograms = this.retrievePrograms.bind(this);
        this.getprogramtype = this.getprogramtype.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getMerchant = this.getMerchant.bind(this);
        this.onChangeProductName=this.onChangeProductName.bind(this);
        this.onSelectProductsType=this.onSelectProductsType.bind(this);
        this.onSelectCompanyId=this.onSelectCompanyId.bind(this);
        this.onChangeProductUniqueCode=this.onChangeProductUniqueCode.bind(this);
        this.onChangeProductUniqueName=this.onChangeProductUniqueName.bind(this);
        this.onChangeProductSummary=this.onChangeProductSummary.bind(this);
        this.onChangeCPDHour=this.onChangeCPDHour.bind(this);
        this.onChnageMerchantcheck=this.onChnageMerchantcheck.bind(this);
        this.editProduct=this.editProduct.bind(this);
        // this.onFileChange=this.onFileChange.bind(this);
        // this.onChangeScreenShotImages=this.onChangeScreenShotImages.bind(this);
        // this.onChangeScormPackage=this.onChangeScormPackage.bind(this);
        
    }

    componentDidMount(){
        this.retrievePrograms();
        this.getprogramtype();
        this.getMerchant("");
    }

    openAdd(e) {      
        e.preventDefault();     
        const addvisible = !this.state.addvisible;
        this.setState({
            addvisible,
            ProgramInfoScreen:true,
            customScreen:false,
            programPriceScreen:false,
            programBundleScreen:false,
            CategoryScreen:false,
            ActivationScreen:false,
            ProductId:0,
            ProductName:"",
            ProductType:1,
            CompanyId:1,
            ProductUniqueName:"",
            ProductUniqueCode:"",
            ProductSummary:"",
            IsActive:true,
            merchantproduct:null  
        });
        this.getMerchant("");
        //this.getprogramtype();
    };

    openProgramInfoScreen(e){
        e.preventDefault();  
        this.setState({
            addvisible:true,
            ProgramInfoScreen:true,
            customScreen:false,
            programPriceScreen:false,
            programBundleScreen:false,
            CategoryScreen:false,
            ActivationScreen:false,
        });
    };

    openCustomScreen(e){
        e.preventDefault();     
        //const addvisible = this.state.addvisible;
        this.setState({
            addvisible : true,
            ProgramInfoScreen:false,
            customScreen:true,
            programPriceScreen:false,
            programBundleScreen:false,
            CategoryScreen:false,
            ActivationScreen:false
        });
    };

    openProgramPriceScreen(e){
        e.preventDefault();     
        //const addvisible = this.state.addvisible;
        this.setState({
            addvisible : true,
            ProgramInfoScreen:false,
            customScreen:false,
            programPriceScreen:true,
            programBundleScreen:false,
            CategoryScreen:false,
            ActivationScreen:false
        });
    };

    openProgramBundleScreen(e){
        e.preventDefault();     
        //const addvisible = this.state.addvisible;
        this.setState({
            addvisible : true,
            ProgramInfoScreen:false,
            customScreen:false,
            programPriceScreen:false,
            programBundleScreen:true,
            CategoryScreen:false,
            ActivationScreen:false
        });
    };

    openCategoryScreen(e){
        e.preventDefault();     
        //const addvisible = this.state.addvisible;
        this.setState({
            addvisible : true,
            ProgramInfoScreen:false,
            customScreen:false,
            programPriceScreen:false,
            programBundleScreen:false,
            CategoryScreen:true,
            ActivationScreen:false
        });
    };

    openActivationScreen(e){
        e.preventDefault();     
        //const addvisible = this.state.addvisible;
        this.setState({
            addvisible : true,
            ProgramInfoScreen:false,
            customScreen:false,
            programPriceScreen:false,
            programBundleScreen:false,
            CategoryScreen:false,
            ActivationScreen:true
        });
    };

    getprogramtype()
    {
        AdminService.GetProgramType()
        .then((response) => {               
            this.setState({
                programtypes: response.data
            });
            //console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    }

    getMerchant(prodid){
        //alert(prodid)
        AdminService.GetMerchantProduct(prodid)
        .then((response) => { 
            console.log(response.data); 
            var a=[];
            for(let mr of response.data){
                var merchantproductcpdhour={
                  MerchantId:mr.MerchantId,
                  MerchantCompany:mr.MerchantCompany,
                  ProductId:0,
                  CPDHours:"",
                  IsActive:false
                }
               a.push(merchantproductcpdhour);
                
            };
            
            console.log(JSON.stringify(a));
            this.setState({
                merchantproduct:a
            });
            console.log("Add "+ JSON.stringify(this.state.merchantproduct))
          })
          .catch((e) => {
            console.log(e);
          });
    }


    getRequestParams(company, searchTitle, page, pageSize) {
        let params = {};        

        if (company) {
            params["company"] = company;
        }

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

    handlePageChange(event, value) {
        this.setState(
          {
            page: value,
          },
          () => {
            this.retrievePrograms();
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
            this.retrievePrograms();
          }
        );
    };

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;
        //alert(searchTitle)
        this.setState({
          searchTitle: searchTitle,
        });
    };

    onChangeCompany(e) {
        const company = e.target.value;
    
        this.setState({
            company: company,
        });
    };
    

    retrievePrograms()
    {        
        const { company, searchTitle,  page, pageSize } = this.state;
        //alert(this.state.searchTitle)
        const params = this.getRequestParams(company, searchTitle, page, pageSize);
       
        AdminService.GetPrograms(params)
          .then((response) => {
              //alert(JSON.stringify(response.data))
            const { categories, totalPages, totalItems } = response.data;
    
            this.setState({
                programs: categories,
                count: totalPages,
                totalItems: totalItems
            });
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    };

    handleSubmit(e){
        e.preventDefault();
    
        this.setState({
          message: "",
          loading: true
        });

        if(this.state.ScreenShotImages===null  && this.state.ProductId===0)
        {
            
            this.setState({
               ScreenshotMessage:"Screenshot image is required."
            });
            return;
        }

        //this.catelogForm.controls['catelogfile'].value==''  &&
        if(this.state.CatalogFile===null)
        {   
            this.setState({         
              CatalogMessage:"Catelog image is required."
            })
            return;
        }
        //this.scormpackageForm.controls['spfile'].value=='' &&
        if(this.state.ScormPackageFile===null)
        {            
            this.setState({
              ScormPackageMessage:"Package is required."
            });
            return;
        }
    
        this.form.validateAll();


        if (this.state.ProductId===0) {
            var cdata = {
                ProductName: this.state.ProductName,
                ProductType: this.state.ProductType,
                CompanyId: this.state.CompanyId,
                ProductUniqueCode:this.state.ProductUniqueCode,
                ProductUniqueName:this.state.ProductUniqueName,
                ProductSummary:this.state.ProductSummary,
                DisplayOrder:0,
                IsFeatured:false,
                PublishStatus:true,
                IsActive: true,
                merchantproduct:this.state.ProgramMerchantCPD
            };
            //alert(JSON.stringify(cdata));
            AdminService.CreateProduct(cdata)
            .then(response => {
                this.setState({
                    message:"Product is created successfully",        
                    submitted: true
                });
                console.log(response.data);
              })
              .catch(e => {
                console.log(e);
              });
        }
        else
        {
            var udata = {
                ProductId:this.state.ProductId,
                ProductName: this.state.ProductName,
                ProductType: this.state.ProductType,
                CompanyId: this.state.CompanyId,
                ProductUniqueCode:this.state.ProductUniqueCode,
                ProductUniqueName:this.state.ProductUniqueName,
                ProductSummary:this.state.ProductSummary,
                DisplayOrder:0,
                IsFeatured:false,
                PublishStatus:false,
                IsActive: true,
                merchantproduct:this.state.ProgramMerchantCPD
            };
            //alert(JSON.stringify(udata));
            AdminService.UpdateProduct(udata)
            .then(response => {
                this.setState({
                    message:"Product is Updated successfully",        
                    submitted: true
                });
                console.log(response.data);
              })
              .catch(e => {
                console.log(e);
              });
        }
    };

    onChangeProductName(e) {
        this.setState({
            ProductName: e.target.value
        });
    };

    onSelectProductsType(e)
    {
        this.setState({
            ProductType: e.target.value
        });
    };

    onSelectCompanyId(e){
        this.setState({
            CompanyId: e.target.value
        });
    }

    onChangeProductUniqueCode(e){
        this.setState({
            ProductUniqueCode: e.target.value
        });
    }

    onChangeProductUniqueName(e){
        this.setState({
            ProductUniqueName: e.target.value
        });
    }

    onChangeProductSummary(e){
        this.setState({
            ProductSummary: e.target.value
        });
    }

    onChangeCPDHour(i, event) {
        var ProgramMerchantCPD = this.state.merchantproduct;
      
        ProgramMerchantCPD[i].CPDHours = event.target.value;
      
        this.setState({
            merchantproduct: ProgramMerchantCPD
        });
        console.log(JSON.stringify(this.state.merchantproduct))
    }

    onChnageMerchantcheck(i,event)
    {
        var ProgramMerchantCPD = this.state.merchantproduct;
      
        ProgramMerchantCPD[i].MerchantId = event.target.value;
        ProgramMerchantCPD[i].IsActive=true;
      
        this.setState({
            merchantproduct: ProgramMerchantCPD
        });
        console.log(JSON.stringify(this.state.merchantproduct))

        
    }

    // On file select (from the pop up)
    onFileChange = event => {    
        // Update the state
        this.setState({ CatalogFile: event.target.files[0] });
      
    };

    UploadCatalog = () => { 
        if(this.state.CatalogFile==="")
        {
            this.setState({
                CatalogMessage:"Please Select Catalog Image.",        
                submitted: false
            });
             return;
        }
        
        if(this.state.ProductUniqueCode==="")
        {
            this.setState({
                CatalogMessage:"Please fill product unique code.",        
                submitted: false
            });
             return;
        }

        // Create an object of formData
        const formData = new FormData();
      
        // Details of the uploaded file
        console.log(this.state.CatalogFile);
        // Update the formData object
        formData.append("image", this.state.CatalogFile);
          //this.state.selectedFile.name
        
      
       
      
        // Request made to the backend api
        // Send formData object
        AdminService.UploadCatelog(formData, this.state.ProductUniqueCode)
        .then(response => {
            this.setState({
                CatalogMessage:"Catalog image is uploaded successfully.",        
                submitted: true
            });
            //console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    };

    onChangeScreenShotImages=event=>{
        this.setState({ ScreenShotImages: event.target.files });
    };

    onScreenShotUpload=()=>{
        if(this.state.CatalogFile==="")
        {
            this.setState({
                ScreenshotMessage:"Please Select Screenshot Image(s).",        
                submitted: false
            });
             return;
        }
        
        if(this.state.ProductUniqueCode==="")
        {
            this.setState({
                ScreenshotMessage:"Please fill product unique code.",        
                submitted: false
            });
             return;
        }

       
        // // Update the formData object
        // const files: [] = this.state.ScreenShotImages;
        // // console.log(files);
        // for(let i =0; i < files.length; i++){
        //     console.log(files[i])
        //    formData.append("uploads", files[i]);
        // }
        var formData = new FormData();
        for (const key of Object.keys(this.state.ScreenShotImages)) {
            formData.append('uploads', this.state.ScreenShotImages[key])
        }

        //console.log(formData);
        AdminService.UploadScreenShot(formData, this.state.ProductUniqueCode)
        .then(response => {
            this.setState({
                ScreenshotMessage:"Screenshot uploaded successfully.",        
                submitted: true
            });
            //console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      
    };

    onChangeScormPackage=event=>{
        this.setState({ ScormPackageFile: event.target.files[0] });
    };

    UploadScormPackage=()=>{
        if(this.state.ScormPackageFile==="")
        {
            this.setState({
                ScormPackageMessage:"Please Select Scorm Package zip file.",        
                submitted: false
            });
             return;
        }
        
        if(this.state.ProductUniqueCode==="")
        {
            this.setState({
                ScormPackageMessage:"Please fill product unique code.",        
                submitted: false
            });
             return;
        }

        // Create an object of formData
        const pformData = new FormData();
      
        // Details of the uploaded file
        console.log(this.state.ScormPackageFile);
        // Update the formData object
        pformData.append("package", this.state.ScormPackageFile);
          //this.state.selectedFile.name
        
       
        // Request made to the backend api
        // Send formData object

        AdminService.UploadPackage(pformData,this.state.ProductUniqueCode)
        .then(response => {
            this.setState({
                ScormPackageMessage:response.message,        
                submitted: true
            });
            //console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    };

    editProduct(Prodid){
        this.setState({
            addvisible : !this.state.addvisible, 
            ProgramInfoScreen:true,
            customScreen:false,
            programPriceScreen:false,
            programBundleScreen:false,
            CategoryScreen:false,
            ActivationScreen:false,
            merchantproduct:null          
        })

        AdminService.GetProgramById(Prodid)
        .then(response => {          
            var a=[];
            for(let mr of response.data.MerchantProducts){
                var merchantproductcpdhour={
                  MerchantId:mr.MerchantId,
                  MerchantCompany:mr.Merchant.MerchantCompany,
                  ProductId:mr.ProductId,
                  CPDHours:mr.CPDHours,
                  IsActive:mr.IsActive
                }
                a.push(merchantproductcpdhour);
                
            };
            this.setState({
              ProductId: response.data.ProductId,
              ProductName: response.data.ProductName,
              ProductType:response.data.ProductType,
              CompanyId:response.data.CompanyId,
              ProductUniqueCode:response.data.ProductUniqueCode,
              ProductUniqueName:response.data.ProductUniqueName,
              ProductSummary:response.data.ProductSummary,
              //ScreenShotImages=`http://localhost:1337` + response.data.screenshotimage,
              catelogimage:"http://localhost:1337" + response.data.catelogimage,
              scormpackagepath:response.data.packagefile,
                //this.productForm.controls['isActive'].setValue(prd.IsActive);

              merchantproduct:a
            });
            //this.getMerchant(Prodid);
            this.custom.current.GetMetaGroupId(1,Prodid);
            this.productprice.current.getProductPrice(Prodid);
            console.log("Edit " + JSON.stringify(this.state.merchantproduct));
          })
          .catch(e => {
            console.log(e);
          });

    }

    render() { 
        const programs=this.state.programs;
        const programtypes=this.state.programtypes;  
        const merchantproduct=this.state.merchantproduct;    
        //console.log("Hi " + JSON.stringify(merchantproduct))   
        const {
            searchTitle, 
            company,          
            //currentIndex,
            page,
            count,
            pageSize,
            totalItems,
          } = this.state;
         // var context = this;   
         //alert(JSON.stringify(programtypes)) 
        return(
            <div>
             {!this.state.addvisible ? ( 
                <div id="divSearchList">
                    <div className="row-fluid">
                        <div className="span12">
                            <div className="widget-box">
                                <div className="widget-header">
                                    <h4>Search Program</h4>
                                    <span className="widget-toolbar"><a href={{}}><i className="icon-chevron-up"></i></a></span>
                                </div>
                                <div className="widget-body">
                                    <div className="widget-body-inner">
                                        <div className="widget-main">
                                            <label htmlFor="form-field-6" className="control-label">Filter By Business Unit</label>
                                            <select  value={company} onChange={this.onChangeCompany} id="ddlMerchants" name="MerchantId" className="ng-untouched ng-pristine ng-valid">
                                                <option  value="0">All</option>
                                                <option value="1">Ebix Inc</option>
                                            </select>
                                            <label htmlFor="Search" className="control-label">Program Name/Program Unique Code</label>
                                            <input id="txtSearchText" name="Search" placeholder="Program Name" type="text"  value={searchTitle} onChange={this.onChangeSearchTitle} className="span12 ng-untouched ng-pristine ng-valid" />
                                            <button id="btnSearch" onClick={this.retrievePrograms} className="btn btn-primary btn-small" style={{width: '100px' , margin :'5px' }}>Search</button>
                                            <a id="btnReset" href={{javascript:void(0)}}  className="btn btn-primary btn-small" style={{width: '100px' , margin: '5px' }}>Reset</a>
                                            <a id="btnAdd" onClick={this.openAdd} href={{javascript:void(0)}}  className="btn btn-primary btn-small" style={{width: '100px' , margin: '5px' }}>Add</a>
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
                                    <h4>Program</h4>
                                    <span className="widget-toolbar">
                                        <a href={{javascript:void(0)}}  ><i className="icon-chevron-up"></i></a>
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
                                                <table id="tblProducts" className="table table-condensed table-bordered table-striped table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                <a href={{javascript:void(0)}} >Program Unique Code</a>
                                                            </th>
                                                            <th><a href={{javascript:void(0)}} >Program Name</a></th>
                                                            <th className="center" style={{width: '40px'}}>Edit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            programs.map(pr=>(
                                                                <tr key={pr.ProductName}>
                                                                    <td> {pr.ProductUniqueCode} </td>
                                                                    <td> {pr.ProductName} </td>
                                                                    <td className="td-actions" style={{width: '60px' }}>
                                                                        <button  onClick={() => this.editProduct(pr.ProductId)} title="Edit" className="btn btn-mini btn-primary" style={{textDecoration: 'none'}}>
                                                                            <i className="icon-pencil">&nbsp;Edit</i>
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
                                                    <div id="table_report_info" className="dataTables_info">
                                                    Showing {((page-1)*pageSize)+1} to {totalItems<((page)*pageSize)?totalItems:((page)*pageSize)} of {totalItems} entries
                                                    </div>
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
                )
                :
                (
                    <div className="row-fluid">
                        <div className="row">
                            {this.state.message && (
                                <div className="form-group">
                                    <div className="alert alert-danger span6" role="alert">
                                        <span aria-hidden="true">×</span>
                                        {this.state.message}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="span12">                        
                            <div className="widget-box">
                            <div className="widget-header">
                                <h4>Program</h4>
                                <span className="widget-toolbar">
                                    <a href={{javascript:void(0)}} data-action="collapse">
                                        <i className="icon-chevron-up"></i>
                                    </a>
                                </span>
                            </div>
                            <div className="widget-body">
                                <div className="widget-body-inner">
                                    <div className="widget-main">
                                        <div className="tabbable">
                                            <ul className="nav nav-tabs" id="myTab">
                                                <li className={this.state.ProgramInfoScreen ? 'active':''}>
                                                    <a data-toggle="tab" href={{javascript:void(0)}}  onClick={this.openProgramInfoScreen}>
                                                        Program Info
                                                    </a>
                                                </li>
                                                <li className={this.state.customScreen ? 'active':''}>
                                                    <a data-toggle="tab" href={{javascript:void(0)}} onClick={this.openCustomScreen}>        
                                                        Customize
                                                    </a>
                                                </li>
                                                <li className={this.state.programPriceScreen ? 'active':''}>
                                                    <a data-toggle="tab" href={{javascript:void(0)}} onClick={this.openProgramPriceScreen}>
                                                        Program  Pricing        
                                                    </a>
                                                </li>
                                                <li className={this.state.programBundleScreen ? 'active':''}>
                                                    <a data-toggle="tab" href={{javascript:void(0)}} onClick={this.openProgramBundleScreen}>
                                                        Program  Bundle Selection        
                                                    </a>
                                                </li>
                                                <li className={this.state.CategoryScreen ? 'active':''}>
                                                    <a data-toggle="tab" href={{javascript:void(0)}} onClick={this.openCategoryScreen}>
                                                        Category
                                                    </a>
                                                </li>
                                                <li className={this.state.ActivationScreen ? 'active':''}>
                                                    <a data-toggle="tab" href={{javascript:void(0)}} onClick={this.openActivationScreen}>
                                                        Activation
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="tab-content">
                                                <div id="Product" className={this.state.ProgramInfoScreen ? 'tab-pane in active':'tab-pane in '}>
                                                    <div className="row-fluid">
                                                            <Form onSubmit={this.handleSubmit} ref={c => { this.form = c; }}>
                                                                <div className="span8">                                                       
                                                                    <div className="widget-box">
                                                                        <div className="widget-header">
                                                                            <h4>Program Information</h4>
                                                                            <span className="widget-toolbar">
                                                                                <a href={{javascript:void(0)}} data-action="collapse">
                                                                                    <i className="icon-chevron-up"></i>
                                                                                </a>
                                                                            </span>
                                                                        </div>
                                                                        <div className="widget-body">
                                                                            <div className="widget-body-inner">
                                                                                <div className="widget-body-inner">
                                                                                    <div className="widget-main">
                                                                                        {/* <validation-summary [form]="productForm"></validation-summary> */}
                                                                                        <div className="control-group">
                                                                                            <label className="control-label" htmlFor="ProductName">Program Name<span className="required">*</span></label>
                                                                                            <div className="controls">
                                                                                            <Input id="ProductId"  name="ProductId" type="hidden" value={this.state.ProductId}/>
                                                                                            <Input className="span12" value={this.state.ProductName} onChange={this.onChangeProductName} validations={[required]} name="ProductName" placeholder="Program Name" tabIndex="1" type="text"/>                                                                                 
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="row-fluid">
                                                                                            <div className="span12">
                                                                                                <div className="span6">
                                                                                                    <div className="control-group">
                                                                                                        <label className="control-label" htmlFor="ProductType">Program Type<span className="required">*</span></label>
                                                                                                        <div className="controls">
                                                                                                        <Select className="span12" value={this.state.ProductType} onSelect={this.onSelectProductsType} validations={[required]}  name="ProductType" tabIndex="2">
                                                                                                            <option key="0" value="0">Select</option>
                                                                                                            {
                                                                                                                programtypes.map(pt=>(
                                                                                                                    <option key={pt.Id} value={pt.Id}>{pt.name}</option>
                                                                                                                ))
                                                                                                            }                                                                                                        
                                                                                                        </Select>        
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="span6">
                                                                                                <div className="control-group">
                                                                                                    <label className="control-label" htmlFor="CompanyId">Company<span className="required">*</span></label>
                                                                                                    <div className="controls">
                                                                                                        <Select className="span12" value={this.state.CompanyId} onSelect={this.onSelectCompanyId} name="CompanyId">
                                                                                                            <option key="1" value="1">EBIX.INC</option>
                                                                                                        </Select>
                                                                                                    </div>
                                                                                                </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="row-fluid">
                                                                                            <div className="span12">
                                                                                                <div className="span6">
                                                                                                    <div className="control-group">
                                                                                                    <label className="control-label" htmlFor="ProductUniqueCode">Program Code<span className="required">*</span></label>
                                                                                                    <div className="controls">
                                                                                                        <Input className="span12" value={this.state.ProductUniqueCode} onChange={this.onChangeProductUniqueCode} validations={[required]} name="ProductUniqueCode" placeholder="Program Code" tabIndex="4" type="text"/>                                                                                             
                                                                                                    </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="span6">
                                                                                                    <div className="control-group">
                                                                                                    <label className="control-label" htmlFor="ProductUniqueName">Program URL</label>
                                                                                                    <div className="controls">
                                                                                                        <Input className="span12" value={this.state.ProductUniqueName} onChange={this.onChangeProductUniqueName} name="ProductUniqueName" placeholder="Program Url" tabIndex="5" type="text"/>
                                                                                                    </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="row-fluid">
                                                                                            <div className="span12">
                                                                                                <div className="control-group">
                                                                                                <label className="control-label" htmlFor="ProductSummary">Program Summary</label>
                                                                                                <div className="controls">
                                                                                                    <Textarea className="span12" cols="20" value={this.state.ProductSummary} onChange={this.onChangeProductSummary} name="ProductSummary" placeholder="Program Summary" rows="2" tabIndex="6"></Textarea>
                                                                                                </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row-fluid">
                                                                    <div className="span12">
                                                                        <div className="row-fluid">
                                                                            <div className="span12">
                                                                                <div className="widget-box">
                                                                                    <div className="widget-header">
                                                                                        <h4>Business Units</h4>
                                                                                        <span className="widget-toolbar">
                                                                                            <a href={{}} data-action="collapse">
                                                                                                <i className="icon-chevron-up"></i>
                                                                                            </a>
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="widget-body">
                                                                                        <div className="widget-body-inner">
                                                                                            <div className="widget-body-inner">
                                                                                                <div className="widget-main">
                                                                                                    <div className="row-fluid">
                                                                                                        <div className="span12">
                                                                                                            <div className="table-responsive" style={{overflow:'auto',height:'118px'}}>
                                                                                                                <table id="tblmerchantss" className="table table-condensed table-bordered table-striped table-hover">
                                                                                                                    <thead>
                                                                                                                        <tr>
                                                                                                                            <th className="pdsa-action-button-column">
                                                                                                                                Select
                                                                                                                            </th>
                                                                                                                            <th>
                                                                                                                                Business Unit
                                                                                                                            </th>
                                                                                                                            <th>
                                                                                                                                CPD Hours
                                                                                                                            </th>
                                                                                                                        </tr>
                                                                                                                    </thead>
                                                                                                                    <tbody>
                                                                                                                        {merchantproduct &&                                                                                                                        
                                                                                                                           merchantproduct.map(                                                                                                                              
                                                                                                                               (MP,index)=>(  
                                                                                                                                                                                                                                                               
                                                                                                                                    <tr key={index}>
                                                                                                                                        <td>
                                                                                                                                            <input className="checkbox" checked={MP.IsActive} value={MP.MerchantId} onChange={this.onChnageMerchantcheck.bind(this, index)}  name="IsscreenActive" type="checkbox"/>
                                                                                                                                        </td>
                                                                                                                                        <td>
                                                                                                                                            {MP.MerchantCompany!=="" ? MP.MerchantCompany  : MP.Merchant.MerchantCompany} 
                                                                                                                                            <input  name="MerchantId" type="hidden" value="{MP.MerchantId}"/>
                                                                                                                                            <input  id="mProductId" name="mProductId" type="hidden" />
                                                                                                                                        </td>
                                                                                                                                        <td>
                                                                                                                                            <input className="span12" value={MP.CPDHours}  name="CPDHours" onChange={this.onChangeCPDHour.bind(this, index)}   type="text"/>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                )
                                                                                                                            )
                                                                                                                        }
                                                                                                                        
                                                                                                                    </tbody>
                                                                                                                </table>
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
                                                                        <div  className="row-fluid">
                                                                            <div className="span12">
                                                                            <button id="btnSave" className="btn btn-primary btn-small" style={{width:'115px',margin:'5px'}}>
                                                                                Save
                                                                            </button>
                                                                                <a id="btnBack" href={{}} onClick={this.openAdd} className="btn btn-primary btn-small" style={{width:'115px',margin:'5px'}}>
                                                                                    Back
                                                                                </a>
                                                                                <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c; }} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            </Form>
                                                            <div className="span4">
                                                                <div className="widget-box">
                                                                    <div className="widget-header">
                                                                        <h4>Program Screenshots</h4>
                                                                        <span className="widget-toolbar">
                                                                            <a href={{javascript:void(0)}} data-action="collapse">
                                                                                <i className="icon-chevron-up"></i>
                                                                            </a>
                                                                        </span>
                                                                    </div>
                                                                    <div className="widget-body">
                                                                        <div className="widget-body-inner">
                                                                            <div className="widget-body-inner">
                                                                                <div className="widget-main">
                                                                                    <div id="ScreenShot">
                                                                                        {/* <form className="login_form_wrp" [formGroup]="screenshotForm" (ngSubmit)="onUploadScreenShot()"> */}
                                                                                            <div className="control-group">
                                                                                                <label className="control-label" htmlFor="ProductName">Screen Shot<span className="required">*</span></label>
                                                                                                <div className="controls">
                                                                                                    <input  type="file" multiple="multiple" onChange={this.onChangeScreenShotImages} name="screenfile"/>
                                                                                                
                                                                                                </div>
                                                                                                {this.state.ScreenshotMessage && (
                                                                                            
                                                                                                    <div className="alert alert-danger" role="alert">
                                                                                                        <span aria-hidden="true">×</span>
                                                                                                        {this.state.ScreenshotMessage}
                                                                                                    </div>
                                                                                                
                                                                                                )}
                                                                                            </div>
                
                                                                                            <div>
                                                                                                <button onClick={this.onScreenShotUpload} className="btn btn-primary btn-small" type="submit">Upload</button>
                                                                                                <a style={{cursor: 'pointer',textAlign: 'center',color: '#08c',textDecoration: 'solid',marginLeft: '10px',fontSize: '15px',fontWeight: '600',fontStyle: 'bold'}}  href={{javascript:void(0)}}>View Screenshots</a>

                                                                                            </div>
                                                                                        {/*</form>*/}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="widget-box">
                                                                    <div className="widget-header">
                                                                        <h4>Catalog Image</h4>
                                                                        <span className="widget-toolbar">
                                                                            <a href={{javascript:void(0)}} data-action="collapse">
                                                                                <i className="icon-chevron-up"></i>
                                                                            </a>
                                                                        </span>
                                                                    </div>
                
                                                                    <div className="widget-body">
                                                                        <div className="widget-body-inner">
                                                                            <div className="widget-body-inner">
                                                                                <div className="widget-main">
                                                                                    <div id="Catalog">                                                                                    
                                                                                        <div className="control-group">
                                                                                            <label className="control-label" htmlFor="ProductName">Catalog<span className="required">*</span></label>
                                                                                            <input type="file" onChange={this.onFileChange}  style={{color: 'transparent'}} />
                                                                                            
                                                                                        </div>
                                                                                        {this.state.catelogimage && (
                                                                                        <img src={this.state.catelogimage} alt="" style={{height: '100px', width:'200px'}}/>
                                                                                        )}
                                                                                        {this.state.CatalogMessage && (
                                                                                            
                                                                                            <div className="alert alert-danger" role="alert">
                                                                                                <span aria-hidden="true">×</span>
                                                                                                {this.state.CatalogMessage}
                                                                                            </div>
                                                                                           
                                                                                        )}
                                                                                        <div>
                                                                                           <button onClick={this.UploadCatalog} className="btn btn-primary btn-small" type="submit">Upload</button>
                                                                                        </div>                                                                                  
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="widget-box">
                                                                    <div className="widget-header">
                                                                        <h4>SCORM Package</h4>
                                                                        <span className="widget-toolbar">
                                                                            <a href={{}} data-action="collapse">
                                                                                <i className="icon-chevron-up"></i>
                                                                            </a>
                                                                        </span>
                                                                    </div>        
                                                                    <div className="widget-body">
                                                                        <div className="widget-body-inner">
                                                                            <div className="widget-body-inner">
                                                                                <div className="widget-main">
                                                                                    <div id="ProductPack1">
                                                                                        {/* <form className="login_form_wrp" [formGroup]="scormpackageForm" (ngSubmit)="onUploadScormPackage()"> */}
                                                                                            <div className="control-group">
                                                                                                <label className="control-label" htmlFor="ProductName">Package<span className="required">*</span></label>
                                                                                                <input type="file" onChange={this.onChangeScormPackage}  name="uplpackage" style={{color: 'transparent'}} />
                                                                                                
                                                                                            </div>
                                                                                            {this.state.ScormPackageMessage && (                                                                                            
                                                                                                <div className="alert alert-danger" role="alert">
                                                                                                    <span aria-hidden="true">×</span>
                                                                                                    {this.state.ScormPackageMessage}
                                                                                                </div>
                                                                                            
                                                                                            )}

                                                                                            {this.state.scormpackagepath && (
                                                                                                <div>{this.state.scormpackagepath}</div>
                                                                                            )}
                                                                                            
                                                                                            <div>
                                                                                              <button onClick={this.UploadScormPackage} className="btn btn-primary btn-small" type="submit">Upload</button>
                                                                                            </div>
                                                                                        {/* </form> */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    </div>
                                                </div>
                                                <div id="Merchant" className="tab-pane in active" style={{display:'none'}}>
                                                    <div className="row-fluid">
                                                        <div className="span12">
                                                            <div className="widget-box">
                                                                <div className="widget-header">
                                                                    <h4>Business Units</h4>
                                                                    <span className="widget-toolbar">
                                                                        <a href={{}} data-action="collapse">
                                                                            <i className="icon-chevron-up"></i>
                                                                        </a>
                                                                    </span>
                                                                </div>
                                                                <div className="widget-body">
                                                                    <div className="widget-body-inner">
                                                                        <div className="widget-body-inner">
                                                                            <div className="widget-main">
                                                                                <div className="control-group">
                                                                                    <label className="control-label" htmlFor="MerchantProProductName">Module Name</label>
                                                                                    <div className="controls">
                                                                                        <input className="span12" disabled="disabled" id="MerchantProProductName" name="MerchantProProductName" tabIndex="1" type="text" value=""/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="span10">
                                                                                    <div className="row-fluid">
                                                                                        <div className="table-responsive">
                                                                                            <table id="tblmerchant" className="table table-condensed table-bordered table-striped table-hover">
                                                                                                <thead>
                                                                                                    <tr>
                                                                                                        <th className="pdsa-action-button-column">
                                                                                                            Select
                                                                                                        </th>
                                                                                                        <th>
                                                                                                            <a href={{javascript:void(0)}}>
                                                                                                                Business Unit
                                                                                                            </a>
                                                                                                        </th>            
                                                                                                        <th>
                                                                                                            <a href={{javascript:void(0)}}>
                                                                                                                CPD Hours
                                                                                                            </a>
                                                                                                        </th>
                                                                                                        <th>
                                                                                                            <a href={{javascript:void(0)}}>
                                                                                                                Active From
                                                                                                            </a>
                                                                                                        </th>
                                                                                                        <th>
                                                                                                            <a href={{javascript:void(0)}}>
                                                                                                                Active To
                                                                                                            </a>
                                                                                                        </th>
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>  
                                                                                                    <tr>
                                                                                                        <td> 
                                                                                                            <input className="checkbox" id="MerchantProList_0__IsActive" name="MerchantProList[0].IsActive" type="checkbox" value="true"/>
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            Ebix Inc
                                                                                                            <input id="MerchantProList_0__MerchantName" name="MerchantProList[0].MerchantName" type="hidden" value="Ebix Inc"/>
                                                                                                            <input id="MerchantProList_0__MerchantId" name="MerchantProList[0].MerchantId" type="hidden" value="3"/>
                                                                                                            <input id="MerchantProList_0__ProductId" name="MerchantProList[0].ProductId" type="hidden" value="0"/>
                                                                                                        </td>
                
                                                                                                        <td>
                                                                                                            <input className="span12" id="txtCPD" name="MerchantProList[0].CPDHours" tabIndex="2" type="text" value="0"/>
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            <input className="span12" data-val="true" data-val-date="The field Active From must be a date." data-val-required="The Active From field is required." id="txtActiveFrom1" name="MerchantProList[0].ActiveFrom" tabIndex="3" type="text" value="12/14/2020"/>
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            <input className="span12" data-val="true" data-val-date="The field Active To must be a date." id="txtActiveTo1" name="MerchantProList[0].ActiveTo" tabIndex="4" type="text" value=""/>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>        
                                                                                    </div>
                                                                                </div>
                                                                                <div className="span2">
                                                                                </div>
                                                                                <div className="row-fluid">
                                                                                    <div className="span12">
                                                                                        <div>
                                                                                            <button className="btn btn-primary btn-small" type="submit" data-pdsa-action="merchantmapping">
                                                                                                <i className="icon-ok bigger-110"></i>
                                                                                                Submit
                                                                                            </button>
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
                                                </div>
                
                                                <div id="Customize" className={this.state.customScreen? 'tab-pane in active':'tab-pane in '}>
                                                    <div id="CustomizeStatus" style={{display:'none'}} className="span12">
                
                                                    </div>
                                                    <div className="row-fluid">
                                                        <Custom ref={this.custom} productId={this.state.ProductId} productName={this.state.ProductName}></Custom>
                                                    </div>
                                                </div>
                
                                                <div id="category" className={this.state.CategoryScreen ? 'tab-pane in  active':'tab-pane in '}>
                                                    <div id="ProductCategoryStatus" style={{display:'none'}} className="span12"></div>
                                                    <div className="row-fluid">
                                                       <ProductCategory  productId={this.state.ProductId} productName={this.state.ProductName}></ProductCategory>
                                                    </div>
                                                </div>
                
                                                <div id="Price" className={this.state.programPriceScreen ? 'tab-pane in active':'tab-pane in '}>
                                                    <div id="ProductPriceStatus" style={{display:'none'}} className="span12"></div>
                                                    <div className="row-fluid">
                                                        <ProductPrice ref={this.productprice} productId={this.state.ProductId} productName={this.state.ProductName}></ProductPrice>
                                                    </div>
                                                </div>
                                                <div id="Bundle" className={this.state.programBundleScreen ? 'tab-pane in active':'tab-pane in '}>
                                                    <div id="ProductBundleStatus" style={{display:'none'}} className="span12"></div>
                                                    <div className="row-fluid">
                                                        <Bundle productId={this.state.ProductId} productName={this.state.ProductName}></Bundle>
                                                    </div>
                                                </div>
                                                <div id="Activation" className={this.state.ActivationScreen ? 'tab-pane in active':'tab-pane in '}>
                                                    <div id="ProductActivation" style={{display:'none'}} className="span12"></div>
                                                    <br/>
                                                    <ProgramActivation productId={this.state.ProductId} productName={this.state.ProductName}></ProgramActivation>
                                                </div>
                                                <div id="commentedcode">
                                                </div>
                                            </div>
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

