import React,{Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
//import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";

import AdminService from '../../../services/admin.service.js';

// const DatePickerField = ({ name, value, onChange }) => {
//     return (
//         <DatePicker
//             selected={(value && new Date(value)) || null}
//             onChange={val => {
//                 onChange(name, val);
//             }}
//         />
//     );
// };

export default class ProductPrice extends Component {
    constructor(props){
        super(props);

        this.state={
            lstPriceType:[],
            lstLicenseType:[],
            lstCyrrency:[],
            lstProductPrice:[],
            lstProductPriceId:[],

            //Form field in for product price
            CurrencyCode:0,
            MerchantId:24,
            PriceA:0,
            PriceB:0,
            PriceType:0,
            LicenseType:0,
            ActiveFrom:moment().format("mm/dd/yyyy"),
            ActiveTo:"",
            IsActive:true
        }

        this.handleActiveFrom = this.handleActiveFrom.bind(this);
        this.handleActiveTo = this.handleActiveTo.bind(this);
        //this.handleActiveFromChange = this.handleActiveFromChange.bind(this);
        //this.handleActiveToChange = this.handleActiveToChange.bind(this);
        this.getPriceType = this.getPriceType.bind(this);
        this.getLicenseType = this.getLicenseType.bind(this);
        this.getCurrency = this.getCurrency.bind(this);
        this.getProductPricebyId = this.getProductPricebyId.bind(this);
        this.getProductPrice = this.getProductPrice.bind(this);
        this.onChangeIsActive = this.onChangeIsActive.bind(this);
        this.onChangeCurrencyCode = this.onChangeCurrencyCode.bind(this);
        this.onChangePriceA = this.onChangePriceA.bind(this);
        this.onChangePriceB = this.onChangePriceB.bind(this);
        this.onChangePriceType = this.onChangePriceType.bind(this);
        this.onChangeLicenseType = this.onChangeLicenseType.bind(this);
        this.editProductPrice = this.editProductPrice.bind(this);
    }

    componentDidMount(){
        this.getPriceType();
        this.getLicenseType();
        this.getCurrency();
        this.getProductPrice(this.props.productId);
    }

    getPriceType(){
        AdminService.GetPriceType()
        .then((response) => {               
            this.setState({
                lstPriceType: response.data
            });
            //console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    };

    getLicenseType(){
        AdminService.GetLicenseType()
        .then((response) => {               
            this.setState({
                lstLicenseType: response.data
            });
            //console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    };

    getCurrency(){
        AdminService.GetCurrency()
        .then((response) => {               
            this.setState({
                lstCurrency: response.data
            });
            //console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    };

    getProductPricebyId(){
        AdminService.GetProductPricebyid()
        .then((response) => {               
            this.setState({
                lstProductPriceId: response.data
            });
            //console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    };

    getProductPrice(){
        console.log(this.props.productId)
        AdminService.GetProductPrice(this.props.productId)
        .then((response) => {               
            this.setState({
                lstProductPrice: response.data
            });
            //console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    }

    handleActiveFrom(e){
        e.preventDefault();
       // ActiveFrom = ActiveFrom || this.state.ActiveFrom;
        this.setState({ ActiveFrom:e.target.value })
    };

    handleActiveTo(ActiveTo){
        ActiveTo = ActiveTo || this.state.ActiveTo;
        this.setState({ ActiveTo })
    };

    // handleActiveFromChange(ActiveFrom){
    //     ActiveFrom = ActiveFrom || this.state.ActiveFrom;
    //     this.setState({ ActiveFrom })
    // };

    // handleActiveToChange(ActiveTo){
    //     ActiveTo = ActiveTo || this.state.ActiveTo;
    //     this.setState({ ActiveTo })
    // };

    onChangeIsActive(e){
        this.setState({
            IsActive:e.target.value
        })
    };

    onChangeCurrencyCode(e){
        this.setState({
            CurrencyCode:e.target.value
        })
    };

    onChangePriceA(e){
        this.setState({
            PriceA:e.target.value
        })
    };

    onChangePriceB(e){
        this.setState({
            PriceB:e.target.value
        })
    };

    onChangePriceType(e){
        this.setState({
            PriceType:e.target.value
        })
    };

    onChangeLicenseType(e){
        this.setState({
            LicenseType:e.target.value
        })
    };

    editProductPrice(ProductId,MerchantId,CurrencyCode,PriceType,LicenseType){
        //e.preventDefault();
       //alert(ProductId+","+MerchantId+","+CurrencyCode+","+PriceType+","+LicenseType)
       AdminService.GetProductPricebyid(ProductId,MerchantId,CurrencyCode,PriceType,LicenseType)
       .then(response => { 
            //console.log(response.data.CurrencyCode);
            this.setState({
                CurrencyCode : response.data.CurrencyCode,
                PriceA : response.data.PriceA,
                PriceB : response.data.PriceB,
                PriceType : response.data.PriceType,
                LicenseType : response.data.LicenseType,
                ActiveFrom : moment(response.data.ActiveFrom).format('L'),
                //ActiveTo: (response.data.ActiveTo!=="" ? moment(response.data.ActiveTo).format('MM/DD/YYYY'):""),
                IsActive : response.data.IsActive,
                MerchantId : 24,

            });
            //this.handleChange(response.data.ActiveFrom);
       })
       .catch(e => {
        console.log(e);
      });
    };    

    handleChange(value, e) {
        console.log(value); // this will be a moment date object
       this.setState({
           ActiveFrom:value
       });
    }

    render() { 
        //console.log(JSON.stringify(this.state.lstProductPrice))
       // const ActiveFromDate=this.state.ActiveFrom;
        return(
            <div>
                <Form onSubmit={this.handleSubmit} ref={c => { this.form = c; }}>
                    <div className="span8">
                    <div className="widget-box">
                            <div className="widget-header">
                                <h4>Program Price</h4>
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
                                                <label className="control-label" htmlfor="MerchantProductPriceProductName">Program Name</label>
                                                <div className="controls">
                                                    <Input className="span12" disabled="disabled" id="ProductName" name="ProductName" tabindex="1" type="text" value={this.props.productName}/>
                                                </div>
                                            </div>
                                            <div className="row-fluid">
                                                <div className="span12">
                                                    <div className="span6">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlfor="Select1">Currency Code</label>
                                                            <div className="controls">
                                                                <Select id="CurrencyCode" value={this.state.CurrencyCode} name="CurrencyCode" onChange={this.onChangeCurrencyCode}>
                                                                    <option key="0" value="0">Select CurrencyCode</option>
                                                                    {
                                                                        this.state.lstCurrency && this.state.lstCurrency.map((cur,index)=>(
                                                                           <option key={index} value={cur.CurrencyId}>{cur.CurrencyName}</option>
                                                                        ))
                                                                    }
                                                                    
                                                                </Select>                                           
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="span6" style={{display:'none'}}>
                                                        <div className="control-group">
                                                            <label className="control-label" htmlfor="htmlForm-field-6">Business Unit</label>
                                                            <div className="controls">
                                                                <Select id="MerchantId" value={this.state.MerchantId} name="MerchantId">
                                                                    <option value="24">Ebix Inc</option>
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
                                                            <label className="control-label" htmlfor="PriceA">Price A<span className="required">*</span></label>
                                                            <div className="controls">
                                                                <Input className="span12" value={this.state.PriceA} id="PriceA" onChange={this.onChangePriceA} name="PriceA" placeholder="Price A" tabindex="4" type="text"/>
                                                            </div>                                       
                                                        </div>
                                                    </div>
                                                    <div className="span6">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlfor="PriceB">Price B</label>
                                                            <div className="controls">
                                                                <Input className="span12" value={this.state.PriceB} id="PriceB" onChange={this.onChangePriceB} name="PriceB" placeholder="Price B" tabindex="5" type="text"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row-fluid">
                                                <div className="span12">
                                                    <div className="span6">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlfor="PriceType">Price Type</label>
                                                            <div className="controls">
                                                                <Select className="span12" value={this.state.PriceType} id="PriceType" onChange={this.onChangePriceType} name="PriceType" tabindex="2">
                                                                    <option key="0" value="0">Select PriceType</option>
                                                                    {
                                                                        this.state.lstPriceType && this.state.lstPriceType.map((pt,index)=>(
                                                                           <option key={index} value={pt.id}>{pt.name}</option>
                                                                        ))
                                                                    }
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="span6">
                                                        <div className="control-group">
                                                            <label className="control-label" htmlfor="License">License<span className="required">*</span></label>
                                                            <div className="controls">
                                                                <Select className="span12" value={this.state.LicenseType} id="LicenseType" name="LicenseType" onChange={this.onChangeLicenseType} tabindex="2">
                                                                    <option key="0" value="0">Select LicenseType</option>
                                                                    {
                                                                        this.state.lstLicenseType && this.state.lstLicenseType.map((lt,index)=>(
                                                                           <option key={index} value={lt.id}>{lt.name}</option>
                                                                        ))
                                                                    }
                                                                </Select>
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
                    <div className="span4">
                        <div className="widget-box">
                        <div className="widget-header">
                            <h4>Status</h4>
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
                                                <div className="control-group">
                                                    <label className="control-label span4" htmlfor="ActiveFrom">Active From<span className="required">*</span></label>
                                                    <div className="controls span8">
                                                        {/* <DatePicker className="span12" value={this.state.ActiveFrom}  selected={ActiveFromDate}   onSelect={this.handleActiveFrom}  />  */}                                                        
                                                        <Input type="date" className="span12" name="ActiveFrom" value={moment(this.state.ActiveFrom).format('L')}  onChange={this.handleActiveFrom} placeholder="ActiveFrom" />
                                                    </div>                                   
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-fluid">
                                            <div className="span12">
                                                <div className="control-group">
                                                    <label className="control-label span4" htmlfor="ActiveTo">ActiveTo</label>
                                                    <div className="controls span8">
                                                        <DatePicker className="span12"   selected={this.state.ActiveTo} onSelect={this.handleActiveTo}  />
                                                        {/* <Input type="text" className="span12" id="ActiveTo" name="ActiveTo" placeholder="ActiveTo"/> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-fluid">
                                            <div className="span12">
                                                <div className="control-group">
                                                    <label className="control-label span4">Is Active</label>
                                                    <div className=" controls span8">
                                                        <Input className="checkbox" checked={this.state.IsActive} id="IsActive" name="IsActive" onChange={this.onChangeIsActive} type="checkbox" value="true"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-fluid">
                                            <div className="span12">
                                                <div>
                                                    <button className="btn btn-primary btn-small" type="submit">
                                                        <i className="icon-ok bigger-110"></i>
                                                        Submit
                                                    </button>
                                                    <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c; }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </Form>
                <div className="row-fluid">
                <div className="span12">
                    <div className="row-fluid">
                        <div className="table-responsive">
                            <table className="table table-condensed table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th className="pdsa-action-button-column">
                                            Edit
                                        </th>
                                        <th>
                                            <a href={{}}>
                                                Program Name
                                            </a>
                                        </th>
                                        <th>
                                            <a href={{}}>
                                                Price A
                                            </a>
                                        </th>
                                        <th>
                                            <a href={{}}>
                                                Price B
                                            </a>
                                        </th>
            
                                        <th>
                                            <a href={{}}>
                                                Price Type
                                            </a>
                                        </th>
            
                                        <th>
                                            <a href={{}}>
                                                License Type
                                            </a>
                                        </th>
                                        <th>
                                            <a href={{}}>
                                                Currency
                                            </a>
                                        </th>
                                        <th>
                                            <a href={{}}>
                                                Status
                                            </a>
                                        </th>
                                        <th>
                                            <a href={{}}>
                                                Active From
                                            </a>
                                        </th>
                                        <th>
                                            <a href={{}}>
                                                Active To
                                            </a>
                                        </th>
            
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.lstProductPrice && this.state.lstProductPrice.map((pp,index)=>(
                                            <tr key={index}>
                                                <td className="pdsa-action-button-column">
                                                    <button  onClick={() => this.editProductPrice(pp.ProductId,pp.MerchantId,pp.CurrencyCode,pp.PriceType,pp.LicenseType)} className="btn-sm btn-color-primary" style={{textDecoration: 'none'}}>
                                                        <i className="icon icon-edit"></i>
                                                    </button>
                                                </td>
                                                <td>
                                                    {pp.ProductName}
                                                </td>
                                                <td>
                                                    {pp.PriceA}
                                                </td>
                                                <td>
                                                    {pp.PriceB}
                                                </td>
                                                <td>
                                                    {pp.PriceTypeName}
                                                </td>
                                                <td>
                                                    {pp.LicenseTypeName}
                                                </td>
                                                <td>
                                                    {pp.CurrencyCode}
                                                </td>
                                                <td>
                                                    {pp.IsActive?"True":"False"}
                                                </td>
                                                <td>
                                                    {moment(pp.ActiveFrom).format('MM/DD/YYYY')}
                                                </td>
                                                <td>
                                                    {moment(pp.ActiveTo).format('MM/DD/YYYY')}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}