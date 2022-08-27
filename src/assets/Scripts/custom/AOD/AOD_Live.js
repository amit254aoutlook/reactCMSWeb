var pathAr = window.location.pathname.split('/');

var newPath = "";
for (i = 1; i < pathAr.length; i++) {

    newPath = pathAr[i];
    break;
}
//alert('http://' + window.location.host + '/' + newPath + '/AODHome/LMSAction')
//window.AJAX_URL = function () { return 'http://192.168.84.169/AODHome/LMSAction'; };
//window.AJAX_URL = function () { return 'http://' + window.location.host + '/' + newPath + '/AODHome/LMSAction'; };
window.AJAX_URL = function () { return 'http://' + window.location.host + '/' + 'AODHome/LMSAction'; };
//alert(window.AJAX_URL())
//window.AJAX_URL = function () { 'http://' + window.location.host + '/' + newPath + '/AODHome/LMSAction'; };
//if (newPath == 'AODHome')
//{
//    alert(newPath);
//    alert('old');
//    window.AJAX_URL = function () { 'http://' + window.location.host + '/' + newPath + '/LMSAction'; };
//}
//else {
//    alert('new');
//    window.AJAX_URL = function () { 'http://' + window.location.host + '/' + newPath + '/AODHome/LMSAction'; };
//}

window._uID = '###############';

window.mobilecheck = function () {
    var check = false;

    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

(function($){

    var PlayerUtils = Class.extend({
        _playerDiv: null,
        openCourseInIFrame: false,
        courseId: null,
        userId: null,
        type:null,
        getCourseLocation: function (user, courseId,type) {
            //var pathArray = window.location.pathname.split('/');
            //var pathHost = window.location.host;            
            //var newPathname = "";
            //for (i = 1; i < pathArray.length; i++) {
               
            //    newPathname = pathArray[i];
            //    break;
            //}
            //if (newPathname == 'AODHome') {
            //    return 'http://' + pathHost + '/' + newPathname + '/CoursePlayer?courseid=' + courseId + '&userId=' + user;
            //}
            //else {
            //    return 'http://' + pathHost + '/' + newPathname + '/AODHome/CoursePlayer?courseid=' + courseId + '&userId=' + user;
            //}

            //'http://' + window.location.host + '/' + newPath + '/LMSAction';
           // return 'http://192.168.84.169/AODHome/CoursePlayer?courseid=' + courseId + '&userId=' + user;
            
           // return 'http://' + window.location.host + '/' + newPath + '/CoursePlayer?courseid=' + courseId + '&userId=' + user; 
           
            return 'http://' + window.location.host + '/AODHome/CoursePlayerAPP?courseid=' + courseId + '&userId=' + user + '&type=' + type;
           // return 'http://' + window.location.host + '/' + newPath + '/AODHome/CoursePlayerAPP?courseid=' + courseId + '&userId=' + user + '&type=' + type;
        },
        openCoursePlayer: function (userId, courseId,type) {
            
            var me = this;

            me.courseID = courseId;
            me.userId = userId;

            //Check if the user course data was reseted while doing a course update
            var was_reseted = false;
            
            jQuery.ajax({
                type: "POST",
                url: window.AJAX_URL(),
                async: false,
                data: {
                    action: 'ADAM_Ajax_isUserCourseDataWasReseted',
                    courseID: me.courseID,
                    uID: me.userId
                },
                success: function (response) {
                    was_reseted = response == "true";
                },
                fail: function (response) {
                }
            });
            
            this.showModalLayer();

            var launchPlayerFunc = function () {

                //Tracking
                jQuery.ajax({
                    type: "POST",
                    url: window.AJAX_URL(),
                    data: {
                        action: 'ADAM_Ajax_courseUsageStarted',
                        courseID: me.courseID,
                        uID: userId,
                        country: 'AU',
                        state: ''
                    },
                    success: function (response) {
                    },
                    fail: function (response) {
                    }
                });
                
                me._playerDiv = document.getElementById('playerDiv');

                if (Environment.isMobile() && courseId.substring(6, 8) == '28') { //When its flash only and its on mobile
                    me._playerDiv.innerHTML = '<div class="popup"><h2>The HTML5 version is coming soon!</h2><br>This learning program is currently available in Flash only. Please log-in from your desktop to continue. <br><br><br><input onclick="PlayerUtils.closeCoursePlayer();" type="submit" value="Continue" style="" class="button"/></div>';
                } else {
                   
                    window.playerWin = window.open(me.getCourseLocation(userId, courseId, type), courseId, "menubar=0,address=0,status=0,resizable=1,width=1000,height=600", true);
                   
                    //window.playerWin.onbeforeunload = function(e){ me.closeCoursePlayer(); return true; };
                    me.playerCheck = setInterval(function () {
                        if (window.playerWin.closed) {
                            me.closeCoursePlayer();
                            clearInterval(me.playerCheck);
                        }
                    }, 1000);

                    me._playerDiv.innerHTML = '<div class="popup"><h2>Course in progress...</h2><br>Please close the course in the opened popup window to continue navigating the site.</div>';
                }


                me._playerDiv.style.display = 'block';
                //me._playerDiv.style.width = "450px";
                //me._playerDiv.style.height = "200px";
                me._playerDiv.style.color = 'white';
                me._playerDiv.style.textShadow = '1px 1px 0px #000';
                me._playerDiv.style.textAlign = 'center';

                me.centerPlayer();

                window.playerWin.opened = true;
            };

            if (was_reseted) {

                var div = document.createElement('div'); //Here is the message for the data was reseted notification:
                div.id = "wasUpdatedDiv";
                div.innerHTML = '<div id="wasUpdatedPopUp" class="popup"><h2>Recent Update Notification</h2>The content of this course was recently updated, and as a result we have reset your bookmark and progress. Your status and score have not been changed.<br><br>Thank you!<br><br><input id="wasUpdatedPopUpBtn" type="submit" value="Continue" style="" class="button"/></div>';

                jQuery(document.body).append(div);

                this.centerPlayer(div.firstChild);

                jQuery(document.getElementById('wasUpdatedPopUpBtn')).click(function () {

                    jQuery.ajax({
                        type: "POST",
                        url: window.AJAX_URL(),
                        data: {
                            action: 'ADAM_Ajax_userCourseDataWasResetedAcknowledged',
                            uID: me.userId,
                            courseID: me.courseID
                        },
                        success: function (response) {
                        },
                        fail: function (response) {
                        }
                    });

                    jQuery(document.getElementById('wasUpdatedPopUp')).remove();
                    launchPlayerFunc();
                });

            }
            else {
                launchPlayerFunc();
            }
        },
        closeCoursePlayer: function () {

            var me = this;

            this._playerDiv.innerHTML = '';
            this._playerDiv.style.display = 'none';

            window.document.body.style.overflow = 'auto';

            this.hideModalLayer();

            //Tracking
            jQuery.ajax({
                type: "POST",
                url: window.AJAX_URL(),
                data: {
                    action: 'ADAM_Ajax_courseUsageFinished',
                    uID: me.userId,
                    courseID: me.courseID
                },
                success: function (response) {
                    setTimeout(function () {
                        window.location = window.location.toString().split('#')[0];
                        }, 0);
                },
                fail: function (response) {
                }
            });
        },
        showModalLayer: function () {

            var modalLayer = document.getElementById("modalLayer");
            modalLayer.style.display = 'block';
           // modalLayer.style.height = window.document.body.offsetHeight + 'px';
            $("body").css({ overflow: 'hidden' });
        },
        hideModalLayer: function () {

            var modalLayer = document.getElementById("modalLayer");
            modalLayer.style.display = 'none';
            $("body").css({ overflow: 'inherit' });
            window.location = window.location.href.split("#")[0];
          // window.location = window.location.href("#")[0];
        },
        onPlayerIFrameLoaded: function (e) {
            var iFrame = e.currentTarget ? e.currentTarget : e.target;
        },
        centerPlayer: function (div) {
           
            var pDiv = div ? $(div) : $("#playerDiv");
            var modalLayer = $("#modalLayer");

            pDiv.css("position", "absolute");
            pDiv.css("top", Math.max(0, (($(window).height() - $(pDiv).outerHeight()) / 2)) + "px");
            pDiv.css("left", Math.max(0, (($(window).width() - $(pDiv).outerWidth()) / 2) +
                $(window).scrollLeft()) + "px");

            modalLayer.css("position", "absolute");
            //modalLayer.css("top", Math.max(0, (($(window).height() - $(modalLayer).outerHeight()) / 2) +
            //    $(window).scrollTop()) + "px");
            modalLayer.css("top", Math.max(0, (($(window).height() - $(modalLayer).outerHeight()) / 2)));
            modalLayer.css("left", Math.max(0, (($(window).width() - $(modalLayer).outerWidth()) / 2) +
                $(window).scrollLeft()) + "px");

        },
        "printCertificate": function (courseid) {
            var me = this;
            me.showModalLayer();

            me._playerDiv = document.getElementById('playerDiv');
            me._playerDiv.innerHTML = '<b>Preparing your Certificate...</b><br><br>Please wait while the certificate is generating.';
            me._playerDiv.style.display = 'block';
            me._playerDiv.style.width = "400px";
            me._playerDiv.style.height = "200px";
            me._playerDiv.style.color = 'white';
            me._playerDiv.style.textShadow = '1px 1px 0px #000';

            me.centerPlayer();

            $('#form_' + courseid).submit();
            setTimeout(function () {
                $(me._playerDiv).hide();
                me.hideModalLayer();
            }, 6750);
        }
    });
    window.PlayerUtils = new PlayerUtils();

    var Environment = {
        isAndroid: function () {
            return navigator.userAgent.match(/Android/i);
        },
        isBlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        isIOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        isOpera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        isWindows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        isMobile: function () {
            return (Environment.isAndroid() || Environment.isBlackBerry() || Environment.isIOS() || Environment.isOpera() || Environment.isWindows());
        }
    };
    window.Environment = Environment;

})(jQuery);