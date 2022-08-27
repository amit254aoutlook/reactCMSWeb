import React,{Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
//import Select from "react-validation/build/select";
//import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";

export default class Bundle extends Component {
    constructor(props){
        super(props);

        this.state={
        //   productId:0,
        //   productName:""
        }
    }

    handleSubmit(e)
    {
        e.preventDefault();
    }


    render() { 
        return(
            <div className="span12">
               <div className="widget-box">
                    <div className="widget-header">
                    <h4>Bundle Selection</h4>
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
                                        <label className="control-label" for="MerchantProProductName">Program Name</label>
                                        <div className="controls">
                                            <input className="span12" disabled="disabled" id="txtProductBundleDisabled" name="MerchantProProductName" tabIndex="1" type="text" value={this.props.productName}/>
                                        </div>
                                    </div>
                                    <Form onSubmit={this.handleSubmit} ref={c => { this.form = c; }}>
                                        <div className="span6">
                                            <div className="row-fluid">
                                                <div className="table-responsive">
                                                    <table id="tbl" className="table table-condensed table-bordered table-striped table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th className="pdsa-action-button-column">
                                                                    Select
                                                                </th>
                                                                <th>
                                                                    <a href={{}}>
                                                                        Bundle
                                                                    </a>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <Input className="checkbox" id="IsActive" name="IsActive" type="checkbox" />
                                                                </td>
                                                                <td>
                                                                    BundleName
            
                                                                </td>
                                                            </tr>
            
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="span6">
                                        </div>
                                        <div className="row-fluid">
                                            <div className="span12">
                                                <div>
                                                    <button className="btn btn-primary btn-small" type="submit" id="btnproductbundle">
                                                        <i className="icon-ok bigger-110"></i>
                                                        Submit
                                                    </button>
                                                    <CheckButton style={{ display: 'none' }} ref={c => { this.checkBtn = c; }} />
                                                </div>
                                            </div>            
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        )
    }

}