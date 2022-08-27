import React,{Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
//import Select from "react-validation/build/select";
//import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";

export default class ProductCategory extends Component {
    constructor(props){
        super(props);

        this.state={
        //   productId:0,
        //   productName:""
        }
    }


    render() { 
        return(
            <div className="span12">
                <div className="widget-box">
                    <div className="widget-header">
                        <h4>Categories</h4>
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
                                    <Form>
                                        <div className="control-group">
                                            <label className="control-label" for="ProductName">Program Name</label>
                                            <div className="controls">
                                                <Input className="span12" disabled="disabled" id="txtProductCategoryDisabled" name="ProductName" tabindex="1" type="text" value={this.props.productName}/>

                                            </div>
                                        </div>
                                        <div className="span10">
                                            <div className="row-fluid">
                                                <div className="table-responsive" style={{overflow:'auto',height:'300px'}}>
                                                    <p className="error">
                                                        Checkbox is required, select atleast one value.
                                                    </p>
                                                    <table id="tblcategory" className="table table-condensed table-bordered table-striped table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th className="pdsa-action-button-column">
                                                                    Select
                                                                </th>
                                                                <th>
                                                                    Category
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <input className="checkbox" type="checkbox" />
                                                                </td>
                                                                <td>
                                                                    CategoryName
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
                                                    <button id="btncategory" className="btn btn-primary btn-small" type="submit">
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
        )
    }
}