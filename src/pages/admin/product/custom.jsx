import React,{Component} from "react";
//import Form from "react-validation/build/form";
//import Input from "react-validation/build/input";
//import Select from "react-validation/build/select";
//import Textarea from "react-validation/build/textarea";
//import CheckButton from "react-validation/build/button";

import AdminService from '../../../services/admin.service.js';

// const required = value => {
//     if (!value) {
//       return (
//         <div className="alert alert-danger" role="alert">
//           This field is required!
//         </div>
//       );
//     }
// };

export default class Custom extends Component {
    constructor(props){
        super(props);
        this.state={
            lstTemplate:[],
            lstMetaGroupKey:[],
            temid:0,
            lstMetaKey:[],
            message:"",
            loading:false,
            metagroupkeydata:[],
            lstCustomFieldRequiredError:[],
            showerrordiv:false,
            submitted:false,
            pid:this.props.productId,
            templatechecked:false
        }

        this.GetTemplateById = this.GetTemplateById.bind(this);
        this.opentemtab=this.opentemtab.bind(this);
        this.GetMetaGroupId=this.GetMetaGroupId.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    componentDidMount(){
        this.setState({           
            temid:1
        });
        // var prodid=(this.props.productId===0?this.state.productid:this.props.productId);
        // alert(prodid)
       this.GetTemplateById(1);
       this.GetMetaGroupId(1,this.state.productId);
    };

    GetTemplateById(templateid){
        AdminService.GetTemplateById(templateid)
        .then((response) => {               
            this.setState({
                lstTemplate: response.data
            });
            //console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    };

    GetMetaGroupId(TemplateId,productid){
        //alert(this.props.productId)
        AdminService.GetMetaGroupKey(TemplateId,productid)
        .then((response) => {   
            //console.log("First "+JSON.stringify(response.data));          
            for(let mr of response.data){  
                for(let mk of mr.MetaKeys){              
                    if(mk.ProductMetaData.length===0)
                    {
                        mk.ProductMetaData.push({ProductId:this.props.productId,MetaValue:""});
                    } 
                }             
            }  
            this.setState({
                lstMetaGroupKey: response.data
            });
            for(let mr of response.data){  
                for(let mk of mr.MetaKeys){              
                    if(mk.ProductMetaData[0].MetaValue!=="")
                    {
                        this.setState({templatechecked:true});
                        return;
                    } 
                }             
            }           
           
            console.log("Last "+JSON.stringify(this.state.lstMetaGroupKey));
          })
          .catch((e) => {
            console.log(e);
          });
    };

    opentemtab(e){
        e.preventDefault();
        console.log(e.target.id); 
        this.setState({
            temid:e.target.id
        })
    }

    handleChange(e){  
        //alert(grid)
        var strid=e.target.id.split('_');
        var mId=(strid[1]===undefined?e.target.id:strid[1]);
        //console.log(this.state.lstMetaGroupKey[0].MetaKeys.find(x => x.MetaId === mId).ProductMetaData.push({ProductId:this.props.productId,MetaValue:e.target.value}));
        //for(let i=0;i<this.state.lstMetaGroupKey.length;i++){  
            //alert(JSON.stringify(mr.MetaKeys.find(x => x.MetaId === mId))) 
            var splitmgid=mId.split('-');
            var mgid=splitmgid[0];
            var cmetaid=splitmgid[1];
            //console.log(this.state.lstMetaGroupKey.find(x => x.MetaGroupId === mgid).MetaKeys.find(x => x.MetaId === cmetaid))
            const productmetadatas=this.state.lstMetaGroupKey.find(x => x.MetaGroupId === mgid).MetaKeys.find(x => x.MetaId === cmetaid).ProductMetaData;
            //alert(JSON.stringify(productmetadatas))
            if(productmetadatas[0].ProductId!=="")
            {
                this.state.lstMetaGroupKey.find(x => x.MetaGroupId === mgid).MetaKeys.find(x => x.MetaId === cmetaid).ProductMetaData[0].ProductId = this.props.productId;
                this.state.lstMetaGroupKey.find(x => x.MetaGroupId === mgid).MetaKeys.find(x => x.MetaId === cmetaid).ProductMetaData[0].MetaValue = e.target.value;
            }
            else{
                this.state.lstMetaGroupKey.find(x => x.MetaGroupId === mgid).MetaKeys.find(x => x.MetaId === cmetaid).ProductMetaData.push({ProductId:this.props.productId,MetaValue:e.target.value});
            }
        //}
        // var strid=e.target.id.split('_');
        // const metagroupkeydatas = this.state.lstMetaGroupKey;
       
        // var mId=(strid[1]===undefined?e.target.id:strid[1]);
       
        // const metagroupkeydatass = metagroupkeydatas.find(x => x.metaid === mId);
        // if (metagroupkeydatass) {
        //     metagroupkeydatass.metavalue = e.target.value;
        // }
        // else 
        // {
        //     metagroupkeydatas.push({ metaid: mId, productid: this.props.productId,metavalue: e.target.value,  isActive:true });
        // }
        // this.setState(
        //   {
        //     metagroupkeydata:metagroupkeydatas
        //   }      
        // );
        this.setState({
             lstMetaGroupKey:this.state.lstMetaGroupKey
        });
        console.log(JSON.stringify(this.state.lstMetaGroupKey))
       
    };

    

    onSubmit(event){
        event.preventDefault();
        const CustomFieldRequiredError=[];
        console.log(JSON.stringify(this.state.lstMetaGroupKey))
        for(let mr of this.state.lstMetaGroupKey){    
            for(let mk of mr.MetaKeys){
                //alert(JSON.stringify(mk.ProductMetaData[0]))
                if(mk.Mandatory!==0 && mk.ProductMetaData[0]?.MetaValue==="")
                {                    
                    CustomFieldRequiredError.push(mk.KeyDisplay + " is required.");
                } 
                
            }            
                      
        } 
       
        //alert(CustomFieldRequiredError.length)
        if(CustomFieldRequiredError.length>0)
        {
            this.setState({
                showerrordiv:true,
                submitted:false,
                lstCustomFieldRequiredError:CustomFieldRequiredError
            })            
            return;
        }
        else{
            //alert("hi");
            var outputArray = [];
            for(let mr of this.state.lstMetaGroupKey){    
                for(let mk of mr.MetaKeys){              

                    outputArray.push({ 
                        ProductId: this.props.productId,
                        MetaId: mk.MetaId,
                        MetaValue: mk.ProductMetaData[0]?.MetaValue
                    })
                    
                }            
                        
            } 

            console.log(JSON.stringify(outputArray))
            if(outputArray.length>0){
                AdminService.createProductMetaData(outputArray)
                .then(response => {
                    this.setState({
                        message:"Product meta data is saved successfully.",  
                        showerrordiv:true,      
                        submitted: true
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
            }
        }
       
    }


    render() { 
        //alert(this.state.temid)
        const metagrId=this.state.temid;
        return(
            <div className="span12">
                <div className="widget-box">
                    <div className="widget-header">
                            <h4>Custom Fields Template</h4>
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
                                            <label className="control-label" for="ProductName">Program Name</label>
                                            <div className="controls">
                                                <input className="span12" disabled="disabled" id="txtCustProductDisabled" name="ProductName" tabIndex="1" type="text" value={this.props.productName}/>
                                            </div>
                                        </div>
                                        <div className="span10">
                                            <div className="row-fluid">
                                                <div id="divMetaKeys">
                                                    <input type="hidden" id="hdnMethod" value="/Admin/ProductTemplateMetaKeys?ProductId=0"/>
                                                    <input id="hdnExtraValues" name="ExtraValues" type="hidden" value=""/>
                                                    <div className="widget-box">
                                                        <div className="widget-header">
                                                            <h4>Custom Fields</h4>
                                                            <span className="widget-toolbar">
                                                                <a href={{}} data-action="collapse">
                                                                    <i className="icon-chevron-up"></i>
                                                                </a>
                                                            </span>
                                                        </div>
                                                        <div className="widget-body">
                                                            <div className="widget-body-inner">
                                                                <div className="widget-body-inner">
                                                                    <div className="widget-body-inner">
                                                                        <div className="widget-main padding-4">
                                                                            <div className="slimScrollDiv" style={{position: 'relative', overflow: 'hidden', width: 'auto'}}>
                                                                                <div className="slim-scroll" data-height="150" style={{overflow: 'hidden', width: 'auto'}}>
                                                                                    <div className="content">
                                                                                        <table id="tblTemplateList" className="table table-condensed table-bordered table-striped table-hover">
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th className="center" style={{width:'30px'}}>
                                                                                                        Select
                                                                                                    </th>
                                                                                                    <th>Template</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                {
                                                                                                    this.state.lstTemplate.map(tp =>(
                                                                                                        <tr key={tp.TemplateId}>
                                                                                                            <td style={{width:'30px'}}>
                                                                                                                <label>
                                                                                                                    <input type="checkbox" checked={this.state.templatechecked} value={tp.TemplateId}  style={{opacity: '1', position: 'relative', marginTop: '-3px'}}/>
                                                                                                                </label>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                {tp.TemplateName}
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    ))
                                                                                                
                                                                                                }
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>
                                                                                </div><div className="slimScrollBar ui-draggable" style={{background: 'rgb(0, 0, 0)', width:'7px', position: 'absolute', top: '0px', opacity: '0.4', display: 'block', borderRadius: '7px', zIndex: '99', right: '1px'}}></div>
                                                                                <div className="slimScrollRail" style={{width: '7px', height: '100%', position: 'absolute', top: '0px', display: 'none', borderRadius: '7px', background: 'rgb(51, 51, 51)', opacity: '0.2', zIndex: '90', right: '1px'}}></div>
                                                                            </div>
                                                                            <br/> 
                                                                           
                                                                                <div style={this.state.showerrordiv ? {display:'block'}:{display:'none'}} className={this.state.submitted===false ? "alert alert-danger alert-dismissable":"alert alert-success alert-dismissable"} role="alert">
                                                                                    <button type="button" class="close" data-dismiss="alert">
                                                                                        <span aria-hidden="true">×</span>
                                                                                    </button>
                                                                                    {this.state.submitted===false ?
                                                                                        (<ul>
                                                                                           {
                                                                                                this.state.lstCustomFieldRequiredError.map((err, index)=>(
                                                                                                <li style={{fontSize: '14px'}} key={index}>{err}</li>
                                                                                                ))
                                                                                            }
                                                                                        </ul>
                                                                                        ):(
                                                                                            <div>{this.state.message}</div>
                                                                                        )
                                                                                    }
                                                                                </div> 
                                                                                                                                                     
                                                                            <div id="tabcontainer" className="tabbable" style={{border: '1px solid rgb(197, 208, 220)', display: 'block'}}>
                                                                                <form onSubmit={(event) => this.onSubmit(event)}>
                                                                                    <ul className="nav nav-tabs" id="divMetaGroup">
                                                                                        {                                                                                      
                                                                                            this.state.lstMetaGroupKey.map(mgk =>(                                                                                            
                                                                                                <li key={mgk.MetaGroupId} className={mgk.MetaGroupId.toString()===metagrId.toString()?'active':''}><a id={mgk.MetaGroupId} onClick={this.opentemtab} data-toggle="tab" href={{}}>{mgk.MetaGroupName}</a></li>
                                                                                            ))
                                                                                        }
                                                                                        
                                                                                    </ul>
                                                                                    <div id="divMetaContent" className="tab-content">                                                                                   
                                                                                        {
                                                                                            this.state.lstMetaGroupKey.map((mgk,index) =>(                                                                                                                                                                                
                                                                                                <div key={index} className={mgk.MetaGroupId.toString()===metagrId.toString()?"tab-pane in active":"tab-pane in"}  id={mgk.MetaGroupId}>
                                                                                                    {mgk.MetaKeys &&
                                                                                                        mgk.MetaKeys.map((mk, index1) => (
                                                                                                            <div id={mgk.MetaGroupId} key={index1}>
                                                                                                                <label htmlFor={"lblMeta"+mk.MetaId} className="control-label">{mk.KeyDisplay}</label>
                                                                                                                <div> 
                                                                                                                {
                                                                                                                    (() => {
                                                                                                                    switch(mk.KeyControlType) {
                                                                                                                        case 1:
                                                                                                                            // if(mk.Mandatory===1){
                                                                                                                            //     return <input type="text" Id={mk.MetaId} value={mk.ProductMetaData[0]?.MetaValue}  name={"Meta_"+mk.MetaId} className="span12" onChange={(e)=>this.handleChange.bind(mgk.MetaGroupId,e)}  validations={[required]} maxLength={mk.MaxLength} />
                                                                                                                            // }
                                                                                                                            // else{
                                                                                                                                return <input type="text" Id={mgk.MetaGroupId+"-"+mk.MetaId} value={mk.ProductMetaData[0]?.MetaValue}  name={"Meta_"+mk.MetaId} className="span12" onChange={this.handleChange}  maxLength={mk.MaxLength} />
                                                                                                                            //}                                                                                                                            
                                                                                                                        // break;
                                                                                                                        case 2: 
                                                                                                                            // if(mk.Mandatory===1){
                                                                                                                            //     return <textarea Id={mk.MetaId} value={mk.ProductMetaData[0]?.MetaValue} name={"Meta_"+mk.MetaId}  className="span12" onChange={()=>this.handleChange.bind(this,mgk.MetaGroupId)} maxLength={mk.MaxLength} validations={[required]}></textarea>
                                                                                                                            // }
                                                                                                                            // else{
                                                                                                                                return <textarea Id={mgk.MetaGroupId+"-"+mk.MetaId} value={mk.ProductMetaData[0]?.MetaValue} name={"Meta_"+mk.MetaId}  className="span12" maxLength={mk.MaxLength} onChange={this.handleChange} ></textarea>
                                                                                                                           // } 
                                                                                                                        case 5:
                                                                                                                            return  <div className="controls">
                                                                                                                                        {mk.LookupGroup !==null &&
                                                                                                                                            mk.LookupGroup.LookupValues.map(lv=>(                                                                                                                       
                                                                                                                                                <label>
                                                                                                                                                    <input type="radio" value={lv.LookupDisplay} onChange={this.handleChange}  Id={"Meta_"+mgk.MetaGroupId+"-"+mk.MetaId+"_"+lv.LookupDisplay}  name={"Meta_"+mk.MetaId+"_"+mk.KeyDisplay}  style={{opacity: '1', position: 'relative', marginTop: '-3px'}}/>
                                                                                                                                                    &nbsp;{lv.LookupDisplay}
                                                                                                                                                </label>
                                                                                                                                            ))
                                                                                                                                        }
                                                                                                                                    </div>                                                                                                                        
                                                                                                                        default: return ""
                                                                                                                    
                                                                                                                    }
                                                                                                                    }).call(this)
                                                                                                                } 
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        )) 
                                                                                                    }
                                                                                                </div>
                                                                                            ))
                                                                                        }                                                                                        
                                                                                        <div className="span12">
                                                                                            <div>
                                                                                                <button   id="btncustomize" className="btn btn-primary btn-small" type="submit" onClick={this.handleSubmit}>
                                                                                                    <i className="icon-ok bigger-110"></i>
                                                                                                    Submit
                                                                                                </button>
                                                                                                {/* <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c; }} /> */}
                                                                                            </div>
                                                                                        </div>                                                                                   
                                                                                    </div>
                                                                                </form>
                                                                            </div>                                                                            
                                                                        </div>
                                                                        <br/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="span2">
                                        </div>
                                        <div className="row-fluid">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}