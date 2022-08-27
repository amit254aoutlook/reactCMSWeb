/*
  AUTHOR: Dany Ellement
*/

//var blogurl = '';

//window.SITE_URL = blogurl;
//window.SITE_URL = window.blogurl;

(function () {
    var initializing = false, fnTest = /xyz/.test(function () { xyz; }) ? /\b_super\b/ : /.*/;

    this.Class = function () { };

    Class.extend = function (prop) {
        var _super = this.prototype;

        initializing = true;
        var prototype = new this();
        initializing = false;

        for (var name in prop) {
            prototype[name] = typeof prop[name] === "function" &&
              typeof _super[name] === "function" && fnTest.test(prop[name]) ?
              (function (name, fn) {
                  return function () {
                      var tmp = this._super;
                      this._super = _super[name];
                      var ret = fn.apply(this, arguments);
                      this._super = tmp;
                      return ret;
                  };
              })(name, prop[name]) :
              prop[name];
        }

        function Class() {
            if (!initializing && this.init)
                this.init.apply(this, arguments);
        }

        Class.prototype = prototype;
        Class.prototype.constructor = Class;
        Class.extend = arguments.callee;

        return Class;
    };
})();

window.mobilecheck = function () {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

(function ($) {



    /**
     * Handle UI Tabs Functionalities
     **/
    var TabsController = Class.extend({
        id: null,
        tabs: null,
        init: function (id) {

            var me = this;

            this.id = id;
            this.tabs = $("#" + id + ".tabsControl > ul li");
            this.tabsContent = $("#" + id + ".tabsControl > div");
            this.tabsLink = $("#" + id + ".tabsControl > ul li a");

            $(this.tabs.get(0)).addClass('selected');
            $(this.tabsContent.get(0)).addClass('selected');

            for (var i = 0; i < this.tabs.length; i++) {
                this.tabsLink.get(i).tabIndex = i;
                this.tabsLink.get(i).href = 'javascript:void(0);';
                $(this.tabsLink.get(i)).click(function () { me.onTabClick(this); });

            }
        },
        onTabClick: function (sender) {

            for (var i = 0; i < this.tabs.length; i++) {
                $(this.tabs.get(i)).removeClass('selected');
                $(this.tabsContent.get(i)).removeClass('selected');
            }

            $(this.tabs.get(sender.tabIndex)).addClass('selected');
            $(this.tabsContent.get(sender.tabIndex)).addClass('selected');
        }
    });
    window.TabsController = TabsController;

    /**
     * On-Demand Widget Functionalities
     **/
    var OnDemandWidgetController = Class.extend({
        userQty: null,
        costPerUserPrice: null,
        costPerUserDiv: null,
        totalDiv: null,
        init: function (pricePerUser) {

            var me = this;

            this.pricePerUser = pricePerUser;

            this.userQty = $('.adamOnDemandWidget #quantity')[0];
            this.costPerUserDiv = $('.adamOnDemandWidget #costPerUser')[0];
            this.totalDiv = $('.adamOnDemandWidget #total')[0];

            $('.adamOnDemandWidget #quantity').keyup(function () { me.doCalcul(); });
            $('.adamOnDemandWidget #userQtyUp').click(function () { me.onUserQtyUpClick(); });
            $('.adamOnDemandWidget #userQtyDown').click(function () { me.onUserQtyDownClick(); });
        },
        onUserQtyUpClick: function () {

            this.userQty.value = parseInt(this.userQty.value) + 1;

            this.doCalcul();
        },
        onUserQtyDownClick: function () {

            var currentValue = parseInt(this.userQty.value);

            if (currentValue == 1)
                return;

            this.userQty.value = currentValue - 1;

            this.doCalcul();
        },
        doCalcul: function () {

            var currentValue = parseInt(this.userQty.value);
            var total = Math.round((currentValue * this.pricePerUser) * 100) / 100;

            if (total == 0 || total.toString() === 'NaN') {
                this.totalDiv.innerHTML = '???';
                return;
            }
            var dollars = total.toString().split(".")[0];
            var cents = total.toString().split(".")[1];

            if (cents == undefined)
                cents = '00';
            else if (cents < 10)
                cents += '0';

            this.totalDiv.innerHTML = '$' + dollars + '<sup>.' + cents + '</sup>';
        }
    });
    window.OnDemandWidgetController = OnDemandWidgetController;





    /**
     * ThumbnailSlider
     */
    var ProductGalleryController = Class.extend({
        _courseThumbnailsThumbsDiv: null,
        viewportWidth: 0,
        numSlide: 0,
        numThumbs: 0,
        numThumbsBySlide: 0,
        thumbWidth: 127,
        thumbBorderWidth: 1,
        init: function () {

            var me = this;

            if (!$(".courseThumbnails")[0])
                return;

            this.numThumbs = $(".courseThumbnails .thumbs a").length;
            this.viewportWidth = $(".courseThumbnails").width();
            this._courseThumbnailsThumbsDiv = $(".courseThumbnails .thumbs");

            this.thumbWidth += this.thumbBorderWidth;
            this.numSlide = Math.ceil((this.numThumbs * (this.thumbWidth)) / this.viewportWidth);
            this.numThumbsBySlide = Math.floor(this.viewportWidth / (this.thumbWidth));

            this.leftArrow = $(".courseThumbnails .left_arrow");
            this.rightArrow = $(".courseThumbnails .right_arrow");

            this.leftArrow.click(function () {
                me.onLeftArrowClick();
            });
            this.rightArrow.click(function () {
                me.onRightArrowClick();
            });

            if ($(".courseThumbnails")[0].addEventListener)
                $(".courseThumbnails")[0].addEventListener("selectstart", function (e) { return false; });
            else
                $(".courseThumbnails")[0].onselectstart = function (e) { return false; };

            this.leftArrow.css('display', 'none');

        },
        onLeftArrowClick: function () {
            var me = this;
            this._courseThumbnailsThumbsDiv.stop(true, true);

            if (parseInt(this._courseThumbnailsThumbsDiv.css("left").replace("px", "")) >= 0) {
                this._courseThumbnailsThumbsDiv.css({ left: "0px" });
                me.calculateNextAndPrev();
                return;
            }

            this._courseThumbnailsThumbsDiv.animate({ left: "+=" + (this.numThumbsBySlide * this.thumbWidth) + "px" }, 500, "swing", function () { me.calculateNextAndPrev(); });
        },
        onRightArrowClick: function () {

            var me = this;
            this._courseThumbnailsThumbsDiv.stop(true, true);

            if (-parseInt(this._courseThumbnailsThumbsDiv.css("left").replace("px", "")) >= (this.numSlide * (this.numThumbsBySlide * this.thumbWidth))) {
                this._courseThumbnailsThumbsDiv.css({ left: -(this.numSlide * (this.numThumbsBySlide * this.thumbWidth)) + "px" });
                me.calculateNextAndPrev();
                return;
            }

            this._courseThumbnailsThumbsDiv.animate({ left: "-=" + (this.numThumbsBySlide * this.thumbWidth) + "px" }, 500, "swing", function () { me.calculateNextAndPrev(); });
        },
        calculateNextAndPrev: function () {

            this.leftArrow.css('display', 'block');
            this.rightArrow.css('display', 'block');

            if (-parseInt(this._courseThumbnailsThumbsDiv.css("left").replace("px", "")) >= (this.numSlide * (this.numThumbsBySlide * this.thumbWidth))) {
                this.leftArrow.css('display', 'block');
                this.rightArrow.css('display', 'none');
            }
            if (parseInt(this._courseThumbnailsThumbsDiv.css("left").replace("px", "")) >= 0) {
                this.leftArrow.css('display', 'none');
                this.rightArrow.css('display', 'block');
            }

        }
    });
    window.ProductGalleryController = ProductGalleryController;

    /**
     * Login panel Functionnalities
     */

    var LoginPanelController = Class.extend({
        _userInput: null,
        init: function () {

            var me = this;

            this._userInput = $("#user_login")[0];
            if (this._userInput.addEventListener) {
                this._userInput.addEventListener("mousedown", function (e) { me.onLoginUserFocus(); });
                this._userInput.addEventListener("touchstart", function (e) { me.onLoginUserFocus(); });
            } else {
                this._userInput.onmousedown = function (e) { me.onLoginUserFocus(); };
                this._userInput.ontouchstart = function (e) { me.onLoginUserFocus(); };
            }
        },
        onLoginUserFocus: function () {
            if (this._userInput.value.indexOf('Email') >= 0) {
                this._userInput.value = '';
            }
        }
    });
    window.LoginPanelController = LoginPanelController;

    /**
     * CoursesSortByDropDownListController
     */
    var CoursesSortByDropDownListController = Class.extend({
        _controlID: null,
        init: function (controlID, selectedValue) {

            var me = this;

            this._controlID = controlID;

            document.getElementById(controlID).onchange = function () { me.onChange(); };
        },
        onChange: function () {

            var url = window.location.toString().split('#')[0];

            if (url.indexOf('?') == -1) {
                window.location = url + "?SortCoursesBy=" + document.getElementById(this._controlID).value;
                return;
            }

            var queryString = url.split('?')[1].split("&");
            for (var i = queryString.length - 1 ; i >= 0; i--) {
                if (queryString[i].indexOf("SortCoursesBy=") >= 0) {
                    queryString.splice(i, 1);
                    break;
                }
            }
            queryString.push("SortCoursesBy=" + document.getElementById(this._controlID).value);

            window.location = url.split("?")[0] + "?" + queryString.join('&');
        }
    });
    window.CoursesSortByDropDownListController = CoursesSortByDropDownListController;



    /*
    Aggregate of custom Html Custom Control
    */
    var ADAMCustomControls = Class.extend({
        closeSelectCtrl: function () {
            $(".customSelect .options").css("display", "none");

            setTimeout(function () {
                $(".customSelect .options").css("display", "");
                $(".customSelect").removeClass("hover_effect");
            }, 200);
        },
        selectOptionFromSelectCtrl: function (id, index) {

            var selectCtrl = jQuery("#" + id);
            if (selectCtrl[0].selectedIndex != index) {
                selectCtrl.val(selectCtrl[0].options[index].value).change();
            }

            $("#_" + id + " ul li").removeClass("selected");
            $("#_" + id + " ul li").eq(index).addClass("selected");
            var div = $("#_" + id + " > .label > div")[0];
            if (window.IEVersion == 8)
                div.innerText = selectCtrl[0].options[index].text;
            else
                div.innerHTML = (selectCtrl[0].options[index].label != '' || selectCtrl[0].options[index].label != '0') ? selectCtrl[0].options[index].label : selectCtrl[0].options[index].text;

            this.closeSelectCtrl();
        },
        createSelectCtrl: function (id) {

            $("#_" + id).remove();

            var me = this;
            var selectCtrl = $("#" + id)[0];
            selectCtrl.style.display = 'none';

            var div = document.createElement("div");
            div.id = "_" + id;
            div.className = "customSelect";

            var currentLabel = "";
            if (selectCtrl.selectedIndex >= 0)
                currentLabel = selectCtrl.options[selectCtrl.selectedIndex].text;


            var html = '<div class="label"><div>' + currentLabel + '</div><div class="arrow"></div></div><div class="options"><ul>';

            for (var i = 0 ; i < selectCtrl.options.length; i++)
                html += '<li ' + (selectCtrl.selectedIndex == i ? 'class="selected"' : '') + '><a href="javascript:void(0)"; ' + 'onclick="ADAMCustomControls.selectOptionFromSelectCtrl(\'' + id + '\',\'' + i + '\');" ontouchstart="ADAMCustomControls.selectOptionFromSelectCtrl(\'' + id + '\',\'' + i + '\');">' + selectCtrl.options[i].text + '</a></li>';

            html += '</ul></div></div>';
            div.innerHTML = html;
            selectCtrl.parentNode.appendChild(div);

            $(div).click(function () { $(this).addClass('hover_effect'); });

            function handleDocumentClick(e) {

                var $bubbleParents = $(e.target).parents();
                for (var i = 0 ; i < $bubbleParents.length; i++) {
                    if ($bubbleParents[i].className.indexOf('customSelect') >= 0) {
                        return;
                    }
                }

                me.closeSelectCtrl();
            }
            if (window.IEVersion == -1 || window.IEVersion > 8) {
                document.addEventListener("touchstart", handleDocumentClick);
                document.addEventListener("touchend", handleDocumentClick);
            }
            $(window.document).click(handleDocumentClick);
        },
        resetAllSelect: function () {
            jQuery('select').each(function () { window.ADAMCustomControls.selectOptionFromSelectCtrl(this.id, 0); });
        }
    });

    window.ADAMCustomControls = new ADAMCustomControls();

    /**
    *  Handle home page featured Slider
    * */
    var ADAMFeatureSlider = Class.extend({
        currentIndex: 0,
        totalSlides: 0,
        delay: 5000,
        timeoutId: null,
        init: function () {

            this.currentIndex = -1;
            this.delay = 50000;
            this.totalSlides = $('.slides .featured').length;

            var me = this;

            $('.et-arrow-prev').click(function () { me.showPreviousSlide(); });
            $('.et-arrow-next').click(function () { me.showNextSlide(); });
            $('.et-controllers a').click(function (e) { me.showSlide(parseInt(e.target.innerHTML) - 1); });

            me.showNextSlide();
        },
        showNextSlide: function () {

            clearTimeout(this.timeoutId);

            $($('.featured').get(this.currentIndex)).hide();
            $($('.featured').get(this.currentIndex)).css('opacity', 0);
            $($('.et-controllers a').get(this.currentIndex)).removeClass('et-active-control');

            this.currentIndex++;
            if (this.currentIndex >= this.totalSlides)
                this.currentIndex = 0;

            this.showSlide(this.currentIndex);
        },
        showPreviousSlide: function () {

            clearTimeout(this.timeoutId);

            $($('.featured').get(this.currentIndex)).hide();
            $($('.featured').get(this.currentIndex)).css('opacity', 0);
            $($('.et-controllers a').get(this.currentIndex)).removeClass('et-active-control');

            this.currentIndex--;
            if (this.currentIndex < 0)
                this.currentIndex = this.totalSlides - 1;

            this.showSlide(this.currentIndex);
        },
        showSlide: function (index) {

            clearTimeout(this.timeoutId);

            if (index != this.currentIndex) {
                $($('.featured').get(this.currentIndex)).hide();
                $($('.featured').get(this.currentIndex)).css('opacity', 0);
                $($('.et-controllers a').get(this.currentIndex)).removeClass('et-active-control');
            }
            var me = this;
            this.currentIndex = index;

            $featured = $($('.featured').get(this.currentIndex));
            $featured.show();
            $featured.animate({ opacity: 1 });
            $($('.et-controllers a').get(this.currentIndex)).addClass('et-active-control');

            this.timeoutId = setTimeout(function () {
                me.showNextSlide();
            }, this.delay);
        }
    });
    window.ADAMFeatureSlider = ADAMFeatureSlider;

    var FAQController = Class.extend({
        init: function () {
            var me = this;
            $(".faq ul h4").click(function (e) {
                me.toggleAnswer(e.target);
            });
        },
        toggleAnswer: function (h4) {

            var p = $(h4.parentNode).find('p')[0];

            var li = h4.parentNode;
            if (p.style.display == 'block')
                li.className = '';
            else
                li.className = 'expanded';

            p.style.display = p.style.display == 'block' ? 'none' : 'block';

        }
    });
    window.FAQController = FAQController;

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    window.validateSignUpAndSubmitForm = function () {

        var billingFirstName = document.getElementById('billing-first_name');
        var billingLastName = document.getElementById('billing-last_name');
        /*var billingCompany = document.getElementById('billing-company');
        var billingAddress = document.getElementById('billing-address');
        var billingAddress2 = document.getElementById('billing-address-2');
        var billingCity = document.getElementById('billing-city');
        var billingState = document.getElementById('billing-state');
        var billingPostCode = document.getElementById('billing-postcode');
        var billingCountry = document.getElementById('billing-country'); */
        var billingEmail = document.getElementById('billing-email');
        /*var billingPhone = document.getElementById('billing-phone');*/
        var accountPassword = document.getElementById('account-password');
        var accountPassword2 = document.getElementById('account-password-2');

        var pageValid = true;
        var errorSummary = "* Some of the fields are required:<br><ul>";

        if (billingFirstName.value == '') {
            pageValid = false;
            errorSummary += "<li>Please enter your first name</li>";
        }
        if (billingLastName.value == '') {
            pageValid = false;
            errorSummary += "<li>Please enter your last name</li>";
        }
        /*if(billingAddress.value == ''){
            pageValid = false;
            errorSummary += "<li>Please enter your address</li>";
        }
        if(billingCity.value == ''){
            pageValid = false;
            errorSummary += "<li>Please enter your city</li>";
        }
        if(billingState.value == ''){
            pageValid = false;
            errorSummary += "<li>Please enter your state name</li>";
        }
        if(billingPostCode.value == ''){
            pageValid = false;
            errorSummary += "<li>Please enter your post code</li>";
        }
        if(billingCountry.value == ''){
            pageValid = false;
            errorSummary += "<li>Please enter your country name</li>";
        }        */
        if (billingEmail.value == '') {
            pageValid = false;
            errorSummary += "<li>Please enter your email</li>";
        }
        if (billingEmail.value != '' && !validateEmail(billingEmail.value)) {
            pageValid = false;
            errorSummary += "<li>Please enter a valid email</li>";
        }
        /*if(billingPhone.value == ''){
            pageValid = false;
            errorSummary += "<li>Please enter your phone number</li>";
        }    */
        if (accountPassword.value == '') {
            pageValid = false;
            errorSummary += "<li>Please enter a password for your account</li>";
        }
        if (accountPassword.value != accountPassword2.value) {
            pageValid = false;
            errorSummary += "<li>Passwords need to match in both fields</li>";
        }

        if (!pageValid) {

            var errorSummaryDiv = document.getElementById('errorSummaryDiv');
            errorSummaryDiv.innerHTML = errorSummary + "</ul>";
            errorSummaryDiv.style.display = 'block';
            errorSummaryDiv.scrollIntoView(true);

        } else {
            document.getElementById('trialSubscriptionForm').submit();
        }
        return pageValid;
    }


    var createCustomControls = function () {

        if (window.Environment.isMobile())
            return;

        $('select').each(function () {
            if (this.id == "" && this.name != "")
                this.id = this.name;

            window.ADAMCustomControls.createSelectCtrl(this.id);
        });
    };


    /*
     About us link hack
    */
    var aboutUsLinkHack = function () {
        if ($('a[title="about"]').length > 0) {
            $('a[title="about"]')[0].href = 'javascript:void(0);';
            $('a[title="about"]').attr("aria-haspopup", "true");
            $('a[title="about"]').bind("click touchstart touchend", function (e) {
                $('a[title="about"]').toggleClass('hover_effect');
            });
        }
    }

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




    /////////
    /// Run Scripts when page is ready
    ////////////////////////////////////////

    jQuery(document).ready(function () {



        //var clientLogosInstance = new ClientLogos(12);
        //$($('#logos .container').get(0)).fadeIn(500);
        var featuredSlider = new window.ADAMFeatureSlider();

        //if (blogurl.length > 0) {
       // createCustomControls();
        //}
        //aboutUsLinkHack();
        //   printVersion();
       // fixHoverTouchMobile();

        //Fix the ol li
        if ($('html#ie8').length > 0) {
            $('html#ie8').removeClass("js");
        }

        //Search Box focus
        $('#search_input').focus(function () {
            if ($(this).val() == 'Search this site...')
                $(this).val('');
        });
        $('#search_input').blur(function () {
            if ($(this).val() == '')
                $(this).val('Search this site...');
        });

        //Handle user last interaction time
        // $(window).bind("beforeunload", handleOnBeforeUnLoad);

        if (window.Environment.isMobile()) {
            $('html').addClass('mobile');
        }
    });

})(jQuery);
