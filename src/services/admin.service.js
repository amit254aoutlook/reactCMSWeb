import axios from "axios";
import authHeader from './auth-header';
import http from "../http-common";


const API_URL = "http://localhost:1337/api/";

class AdminService {  
  GetCategotyType(){
    return axios.get(API_URL + "categorytype/getall", { headers: authHeader() });
  }

  GetCategoryGroup(){
    return axios.get(API_URL + "categorygroup/Get", { headers: authHeader() });
  }

  CreateCategory(data){
    return http.post("category/create",data);
  }

  UpdateCategory(data){
    return http.post("category/update",data);
  }

  GetCategory(params){
    return http.get("category/getall", {params});
  }

  GetCategoryById(catid){
    return http.get("category/"+catid);
  }

  GetProgramType(){
    return http.get("programtype/get");
  }

  GetPrograms(params){
    return http.get("product/Get", {params});
  }

  GetMerchantProduct(prodid){
    return http.get("merchantproduct/get?pid="+prodid)
  }

  UploadScreenShot(data,productcode){
    //console.log(JSON.stringify(data))
    return http.post("uploadScreenshot/"+productcode,data);
  }

  UploadCatelog(data,productcode){
    return http.post("uploadCatalog/"+productcode,data);
  }

  UploadPackage(data,productcode){
    return http.post("uploadscormpackage/"+productcode,data);
  }

  CreateProduct(data){
    return http.post("product/create",data);
  }

  UpdateProduct(data){
    return http.post("product/update",data);
  }

  GetProgramById(id){
    return http.get("product/get/"+id)
  }

  //product custom page service

  GetTemplateById(templateid){
    return http.get("template/get/"+templateid)
  }

  GetMetaGroupKey(TemplateId,productid){
     return http.get("metagroupkey/get?templateid="+TemplateId+"&productid="+productid)
  }

  createProductMetaData(data)
  {
    var jsonData={
      'ProductId':data[0].ProductId,
      'metaData':data
    }
    return http.post("/productmetadata/create",JSON.stringify(jsonData));
  }

  GetPriceType(){
    return http.get("pricetype/get");
  }

  GetLicenseType(){
    return http.get("licensetype/get");
  }

  GetCurrency(){
    return http.get("currency/get");
  }

  GetProductPricebyid(productid,merchantid,currencycode,pricetype,licensetype){   
    return http.get("productprice/getbyid?MerchantId="+merchantid+"&ProductId="+productid+"&CurrencyCode="+currencycode+"&PriceType="+pricetype+"&LicenseType="+licensetype);
  }

  GetProductPrice(productid){   
    return http.get("productprice/get/"+productid);
  }
}

export default new AdminService();