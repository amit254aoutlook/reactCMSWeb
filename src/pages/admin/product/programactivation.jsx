import React,{Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
//import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";

export default class ProgramActivation extends Component {
    constructor(props){
        super(props);

        this.state={
        //   productId:0,
        //   productName:""
        }
    }


    render() { 
        return(
            <div className="widget-box">
                <div className="widget-header">
                    <h4>Program Activation</h4>
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
                                    <div className="control-group">
                                        <label className="control-label" for="MerchantProProductName">Program Name</label>
                                        <div className="controls">
                                            <input className="span12" disabled="disabled" id="txtProductActivationDisabled" name="MerchantProProductName" tabindex="1" type="text" value={this.props.productName}/>
                                        </div>
                                    </div>
                                    <div className="span8">
                                        <Form onSubmit={this.handleSubmit} ref={c => { this.form = c; }}>
                                            <div className="row-fluid">
                                                <div className="span8">
                                                    <div className="control-group">
                                                        <input type="hidden" value={this.props.productId} Id="ProductId"/>
                                                        <label className="control-label span5" for="PublishStatus">Publish Status</label>
                                                        <div className="controls span7">
                                                            <Select className="span12"  id="PublishStatus" name="PublishStatus" tabindex="8">
                                                                <option value="">Select Publish Status</option>
                                                                <option value="1">Status</option>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row-fluid">
                                                <div className="span8">
                                                    <div className="control-group">
                                                        <label className="control-label span5">Is Active</label>
                                                        <div className=" controls span7">
                                                            <Input className="checkbox" id="IsActive" name="IsActive" type="checkbox"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row-fluid">
                                                <div className="span12">
                                                    <div>
                                                        <button id="btnActivation" className="btn btn-primary btn-small" type="submit">
                                                            <i className="icon-ok bigger-110"></i>
                                                            Submit
                                                        </button>
                                                        <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c; }} />
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
            </div>
        )
    }

}