var pathAr = window.location.pathname.split('/');

var newPath = "";
for (i = 1; i < pathAr.length; i++) {

    newPath = pathAr[i];
    break;
}

//alert('http://' + window.location.host + '/' + newPath + '/AODHome/LMSAction')
//window.AJAX_URL = function () { return 'http://192.168.84.169/AODHome/LMSAction'; };

//window.AJAX_URL = function () { return 'http://' + window.location.host + '/' + newPath + '/AODHome/LMSAction'; };
window.AJAX_URL = function () { return 'http://' + window.location.host + '/AODHome/LMSActionAIA'; };
//alert(window.AJAX_URL());
//window.AJAX_URL = function () { 'http://' + window.location.host + '/' + newPath + '/AODHome/LMSAction'; };
//if (newPath == 'AOD') {
//    alert(newPath);
//      alert('old');
//    window.AJAX_URL = function () { 'http://' + window.location.host + '/' + newPath + '/LMSAction'; };
//}
//else {
//    alert('new');
//    window.AJAX_URL = function () { 'http://' + window.location.host + '/' + newPath + '/AODHome/LMSAction'; };
//}

//window.AJAX_URL = function () { return 'http://192.168.84.169/AODHome/LMSAction'; };
/**
 * Handle AJAX LMS Calls
 **/
var ADAM_LMS_API = Class.extend({
    _uID: null,
    _courseID: null,
    _commitValues: [],
    init: function(uID, courseID){
        this._uID = uID;
        this._courseID = courseID;

        window.beforeunload = function(){
            window.top.PlayerUtils.closeCoursePlayer();
        };
    }
    ,
    /**
     * Example usage:
     * this._getUserData('cmi.core.lesson_location','10000');
     * @return the value
     */
    _getUserData: function(api_fn, courseid){

        var me = this;

        var returnValue = null;

        jQuery.ajax({
            type: "POST",
            async: false,
            url: window.AJAX_URL(),
            data:{
                action:'ADAM_Ajax_LMS_get_user_data',
                api_fn: api_fn,
                courseID: me._courseID,
                uID: me._uID
            },
            success: function(response) {
                returnValue =  response;
            },
            fail: function(response){
                return "";
            }
        });

        return returnValue || "";
    },
    /**
     * Example usage:
     * this._updateUserData('cmi.core.lesson_location', 3, '10000');
     * @private
     */
    _updateUserData: function(api_fn, value, courseid){
        var me = this;
        jQuery.ajax({
            type: "POST",
            url: window.AJAX_URL(),
            data:{
                action:'ADAM_Ajax_LMS_update_user_data',
                api_fn: api_fn,
                value: value,
                courseID: me._courseID,
                uID: me._uID
            },
            success: function(response) {
            },
            fail: function(response){
            }
        });
    },
    /**
     * Example usage:
     * this._updateUserDatas([{name:'cmi.core.lesson_location', value: 3},{name:'cmi.core.lesson_status', value: 'Incomplete'}]);
     * @param valuesToCommit
     * @private
     */
    _updateUserDatas: function(valuesToCommit, courseID){
        var me = this;
        jQuery.ajax({
            type: "POST",
            url: window.AJAX_URL(),
            data:{
                action:'ADAM_Ajax_LMS_update_user_datas',
                values: valuesToCommit,
                courseID: me._courseID,
                uID: me._uID
            },
            success: function(response) {
                me._commitValues = [];
            },
            fail: function(response){
            }
        });
    },
    "LMSInitialize": function(){
        return "true";
    },
    "LMSGetValue" : function(name){
        return "true";// this._getUserData(name, this._courseID);
    },
    "LMSSetValue" : function(name, value){
        this._commitValues.push({name: name, value: value});
    },
    "LMSCommit" : function(){
        //this._updateUserDatas(this._commitValues, this._courseID);
    },
    "LMSFinish" : function(){
        return "true";
    },
    "LMSGetLastError": function(){
        //console.log("LMSGetLastError");
    },
    "LMSGetErrorString": function(){
        //console.log("LMSGetErrorString");
    },
    "LMSGetDiagnostic": function(){
        //console.log("LMSGetDiagnostic");
    }
});