﻿var Tempids = '';
var IsClicked = false;

$(function () {
    if ($('#hdnPath').val() == '/') $('#hdnPath').val('');

    // call the template checkbox change event
    $('#tblTemplateList tr td input[type="checkbox"]').change(function () {
        TemplateChange();
    })

    function TemplateChange() {

        //$('#hdnExtraValues').val('');
        Tempids = '';
        $('#tblTemplateList tr td input:checked').each(function () {
            if ($(this).prop('checked')) {
                if (Tempids == '')
                    Tempids = $(this).val();
                else
                    Tempids = Tempids + ',' + $(this).val();
            }
        });

        tinymce.PluginManager.add('coursetemplatebuilder', function (editor, url) {
            // Add a button that opens a window
            editor.addButton('coursetemplatebuilder', {
                text: 'My button',
                icon: 'anchor',
                onclick: function () {
                }
            });

            // Adds a menu item to the tools menu
            editor.addMenuItem('coursetemplatebuilder', {
                text: 'insert/edit Course Builder',
                icon: 'anchor',
                onclick: CourseTemplateBuilder
            });
        });

        tinyMCE.triggerSave();
        for (var i = tinyMCE.editors.length - 1 ; i > -1 ; i--) {
            var ed_id = tinyMCE.editors[i].id;
            if (ed_id != "txtContent" && ed_id != "txtQuestionText") {
                tinyMCE.EditorManager.execCommand('mceFocus', false, ed_id);
                tinyMCE.EditorManager.execCommand('mceRemoveEditor', false, ed_id);
            }
        }
        //tinyMCE.triggerSave();
        //$("#divMetaContent .tab-pane").each(function () {
        //    $(this).find('textarea').each(function ()
        //    {
        //        if ($(this).attr('ControlType') == '8')
        //        {
        //            tinyMCE.EditorManager.execCommand('mceFocus', false, $(this).attr('id'));
        //            tinymce.EditorManager.execCommand('mceRemoveEditor', false, $(this).attr('id'));
        //      }
        //    })
        //})

        if (Tempids.length > 0) {
            $.ajax({
                type: "GET",
                url: $('#hdnPath').val() + $('#hdnMethod').val() + "&TemplateIds=" + Tempids + "&ExtraValues=" + $('#hdnExtraValues').val(),
                datatype: "JSON",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    if (data.Success) {
                        $('#tabcontainer').show();
                        var sMetaItems = data.sMetaKeys;
                        var sMetaData = data.sMetaData;
                        var sMetaGroup = data.lstMetaGroup;

                        var sMetaGroupHtml1 = '';
                        var sMetaGroupHtml2 = '';

                        $(sMetaGroup).each(function (i) {
                            sMetaGroupHtml2 += '<div id="Temp_' + sMetaGroup[i].Item1 + '" class="tab-pane';
                            if (i == 0) {
                                sMetaGroupHtml1 += '<li class="active">';
                                sMetaGroupHtml2 += ' in active">';
                            }
                            else {
                                sMetaGroupHtml1 += '<li>';
                                sMetaGroupHtml2 += '">';
                            }
                            sMetaGroupHtml1 += '<a data-toggle="tab" href="#Temp_' + sMetaGroup[i].Item1 + '">' +

                                            sMetaGroup[i].Item2 +
                                        '</a>' +
                                        '</li>';
                            sMetaGroupHtml2 += '</div>';
                        })

                        $("#divMetaGroup").empty();
                        $("#divMetaContent").empty();

                        $("#divMetaGroup").append(sMetaGroupHtml1);
                        $("#divMetaContent").append(sMetaGroupHtml2);

                        // show all the meta keys of each tab pane
                        $("#divMetaContent .tab-pane").each(function (i) {
                            $(this).empty();

                            var sGroupHtml = '';
                            var iMetaGroupId = $(this).attr('Id');
                            iMetaGroupId = iMetaGroupId.substr(5, iMetaGroupId.length - 5);
                            if (sMetaItems.length > 0) {
                                $(sMetaItems).each(function (i) {
                                    if (sMetaItems[i].MetaGroupId == iMetaGroupId) {
                                        var sMandatory = '';
                                        if (sMetaItems[i].Mandatory == true) {
                                            sMandatory = '&nbsp;<span style="color:red;">*</span>';
                                        }
                                        var sMetaVal = '';
                                        if (sMetaItems[i].KeyControlType == 1) {
                                            for (var k = 0; k < $(sMetaData).length; k++) {
                                                if (sMetaData[k].Item1 == sMetaItems[i].MetaId) {
                                                    sMetaVal = sMetaData[k].Item2;
                                                    break;
                                                }
                                            }
                                            sGroupHtml += '<label for="lblMeta' + sMetaItems[i].MetaId + '" class="control-label">' + sMetaItems[i].KeyDisplay + sMandatory + '</label>' +
                                            '<input type="text" id="Meta' + sMetaItems[i].MetaId + '" name="' + sMetaItems[i].KeyName + '" class="span12" maxlength="' + sMetaItems[i].MaxLength +
                                            '" value="' + sMetaVal.replace(/"/g, '&quot;') + '" datatype="' + sMetaItems[i].KeyDataType + '" />';
                                        }

                                        if (sMetaItems[i].KeyControlType == 2) {
                                            for (var k = 0; k < $(sMetaData).length; k++) {
                                                if (sMetaData[k].Item1 == sMetaItems[i].MetaId) {
                                                    sMetaVal = sMetaData[k].Item2;
                                                    break;
                                                }
                                            }
                                            sGroupHtml += '<label for="lblMeta' + sMetaItems[i].MetaId + '" class="control-label">' + sMetaItems[i].KeyDisplay + sMandatory + '</label>' +
                                            '<textarea id="Meta' + sMetaItems[i].MetaId + '" name="MetaValue" class="span12" maxlength="' + sMetaItems[i].MaxLength +
                                            '" datatype="' + sMetaItems[i].KeyDataType + '">' + sMetaVal + '</textarea>';
                                        }

                                        if (sMetaItems[i].KeyControlType == 3) {
                                            sGroupHtml += '<label class="control-label">' + sMetaItems[i].KeyDisplay + sMandatory +
                                                '</label><div class="controls"><select id="Meta' + sMetaItems[i].MetaId + '">';
                                            var sLookupDataValue = '';
                                            for (var k = 0; k < $(sMetaData).length; k++) {
                                                if (sMetaData[k].Item1 == sMetaItems[i].MetaId) {
                                                    sLookupDataValue = sMetaData[k].Item2;
                                                    break;
                                                }
                                            }
                                            sGroupHtml += '<option id="Meta' + sMetaItems[i].MetaId + '-1" value="0">Select</option>';
                                            $(sMetaItems[i].LookupValuesList).each(function (j) {
                                                sMetaVal = '';
                                                if (sLookupDataValue == sMetaItems[i].LookupValuesList[j].LookupDataValue) {
                                                    sMetaVal = 'selected="selected"';
                                                }
                                                sGroupHtml += '<option ' + sMetaVal + ' id="Meta' + sMetaItems[i].MetaId +
                                                sMetaItems[i].LookupValuesList[j].LookupGroupId + '" value="' +
                                                sMetaItems[i].LookupValuesList[j].LookupDataValue + '">' + sMetaItems[i].LookupValuesList[j].LookupDisplay + '</option>';
                                            })
                                            sGroupHtml += '</select></div><br/>';
                                        }

                                        if (sMetaItems[i].KeyControlType == 4) {
                                            sGroupHtml += '<label class="control-label">' + sMetaItems[i].KeyDisplay + sMandatory +
                                                '</label><div class="controls"><select id="Meta' + sMetaItems[i].MetaId + '" multiple="multiple">';
                                            var sLookupDataValue = '';
                                            var sArrLookup = '';
                                            for (var k = 0; k < $(sMetaData).length; k++) {
                                                if (sMetaData[k].Item1 == sMetaItems[i].MetaId) {
                                                    sLookupDataValue = sMetaData[k].Item2;
                                                    sArrLookup = sLookupDataValue.split(',');
                                                    break;
                                                }
                                            }
                                            $(sMetaItems[i].LookupValuesList).each(function (j) {
                                                sMetaVal = '';
                                                for (var k = 0; k < sArrLookup.length; k++) {
                                                    if (sArrLookup[k] == sMetaItems[i].LookupValuesList[j].LookupDataValue) {
                                                        sMetaVal = 'selected="selected"';
                                                        break;
                                                    }
                                                }
                                                sGroupHtml += '<option ' + sMetaVal + ' id="Meta' +
                                                sMetaItems[i].MetaId + sMetaItems[i].LookupValuesList[j].LookupGroupId + '" value="' +
                                                sMetaItems[i].LookupValuesList[j].LookupDataValue + '">' + sMetaItems[i].LookupValuesList[j].LookupDisplay + '</option>';
                                            })
                                            sGroupHtml += '</select></div><br/>';
                                        }

                                        if (sMetaItems[i].KeyControlType == 5) {
                                            sGroupHtml += '<label class="control-label">' + sMetaItems[i].KeyDisplay + sMandatory + '</label><div class="controls">';
                                            var sLookupDataValue = '';
                                            for (var k = 0; k < $(sMetaData).length; k++) {
                                                if (sMetaData[k].Item1 == sMetaItems[i].MetaId) {
                                                    sLookupDataValue = sMetaData[k].Item2;
                                                    break;
                                                }
                                            }
                                            $(sMetaItems[i].LookupValuesList).each(function (j) {
                                                sMetaVal = '';
                                                if (sLookupDataValue == sMetaItems[i].LookupValuesList[j].LookupDataValue) {
                                                    sMetaVal = 'checked="checked"';
                                                }
                                                sGroupHtml += '<label><input type="radio" ' + sMetaVal + ' id="Meta' + sMetaItems[i].MetaId +
                                                sMetaItems[i].LookupValuesList[j].LookupGroupId + '" name="Meta' + sMetaItems[i].MetaId + '" value="' +
                                                sMetaItems[i].LookupValuesList[j].LookupDataValue + '" style="opacity: 1; position: relative; margin-top: -3px;"/>' +
                                                '&nbsp;' + sMetaItems[i].LookupValuesList[j].LookupDisplay + '</label>';
                                            })
                                            sGroupHtml += '</div><br/>';
                                        }

                                        if (sMetaItems[i].KeyControlType == 6) {
                                            sGroupHtml += '<label class="control-label">' + sMetaItems[i].KeyDisplay + sMandatory + '</label><div class="controls">';
                                            var sLookupDataValue = '';
                                            var sArrLookup = '';
                                            for (var k = 0; k < $(sMetaData).length; k++) {
                                                if (sMetaData[k].Item1 == sMetaItems[i].MetaId) {
                                                    sLookupDataValue = sMetaData[k].Item2;
                                                    sArrLookup = sLookupDataValue.split(',');
                                                    break;
                                                }
                                            }
                                            $(sMetaItems[i].LookupValuesList).each(function (j) {
                                                sMetaVal = '';
                                                for (var k = 0; k < sArrLookup.length; k++) {
                                                    if (sArrLookup[k] == sMetaItems[i].LookupValuesList[j].LookupDataValue) {
                                                        sMetaVal = 'checked="checked"';
                                                        break;
                                                    }
                                                }
                                                sGroupHtml += '<label><input type="checkbox" ' + sMetaVal + ' id="Meta' + sMetaItems[i].MetaId +
                                                sMetaItems[i].LookupValuesList[j].LookupGroupId + '" name="Meta' + sMetaItems[i].MetaId + '" value="' +
                                                sMetaItems[i].LookupValuesList[j].LookupDataValue + '" style="opacity: 1; position: relative; margin-top: -3px;"/>' +
                                                '&nbsp;' + sMetaItems[i].LookupValuesList[j].LookupDisplay + '</label>';
                                            })
                                            sGroupHtml += '</div><br/>';
                                        }

                                        if (sMetaItems[i].KeyControlType == 7) {
                                            var sChkVal = '';
                                            sMetaVal = '';
                                            for (var k = 0; k < $(sMetaData).length; k++) {
                                                if (sMetaData[k].Item1 == sMetaItems[i].MetaId) {
                                                    if (sMetaData[k].Item2 != '' && sMetaData[k].Item2 > 0) {
                                                        sMetaVal = 'checked="checked"';
                                                        break;
                                                    }
                                                }
                                            }
                                            sGroupHtml += '<label><input type="checkbox" ' + sMetaVal + ' id="Meta' + sMetaItems[i].MetaId +
                                                '" name="Meta' + sMetaItems[i].MetaId + '" value="' + sMetaItems[i].MetaId + '" style="opacity: 1; position: relative; margin-top: -3px;"/>' +
                                                '&nbsp;' + sMetaItems[i].KeyDisplay + sMandatory + '</label>';
                                        }

                                        if (sMetaItems[i].KeyControlType == 8) {

                                            for (var k = 0; k < $(sMetaData).length; k++) {
                                                if (sMetaData[k].Item1 == sMetaItems[i].MetaId) {
                                                    sMetaVal = sMetaData[k].Item2;
                                                    break;
                                                }
                                            }
                                            sGroupHtml += '<label for="lblMeta' + sMetaItems[i].MetaId + '" class="control-label">' + sMetaItems[i].KeyDisplay + sMandatory + '</label>' +
                                            '<textarea id="Meta' + sMetaItems[i].MetaId + '" name="MetaValue" class="span12" maxlength="' + sMetaItems[i].MaxLength +
                                            '" datatype="' + sMetaItems[i].KeyDataType + '" ControlType="8">' + sMetaVal + '</textarea><br/>';
                                        }
                                    }

                                })

                                $(this).append(sGroupHtml);

                            }

                            $("#divMetaContent .tab-pane").each(function () {

                                $(this).find('textarea').each(function () {
                                    if ($(this).attr('ControlType') == '8') {
                                        //tinyMCE.EditorManager.execCommand('mceAddEditor', true, $(this).attr('id'));

                                        tinymce.init({
                                            selector: "#" + $(this).attr('id'),
                                            theme: "modern",
                                            menubar: "edit insert view format table tools",
                                            plugins: [
                                                "advlist autolink lists link image charmap preview hr anchor pagebreak",
                                                "searchreplace wordcount visualblocks visualchars code fullscreen",
                                                "insertdatetime media nonbreaking save table contextmenu directionality",
                                                "emoticons paste textcolor colorpicker textpattern coursetemplatebuilder"
                                            ],
                                            toolbar1: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                                            toolbar2: "preview media | forecolor backcolor emoticons",
                                            image_advtab: true,
                                            height: "300px",
                                            convert_urls: false,
                                            contextmenu: "link image coursetemplatebuilder",
                                            force_p_newlines: false,
                                            file_browser_callback: FileManager,
                                            setup: function (editor) {
                                                editor.on('init', function (args) {
                                                    editor = args.target;
                                                    editor.on('NodeChange', function (e) {
                                                        if (e && e.element.nodeName.toLowerCase() == 'img') {
                                                            tinyMCE.DOM.setAttribs(e.element, { 'id': $('#hdnResourceId').val() });
                                                            //if ($('#hdnImageSrc').length > 0) {
                                                            //    $('#hdnImageSrc').val(e.element.getAttribute('src'));
                                                            //}
                                                            //else {
                                                            //    $('#hdnImageSrc').val('');
                                                            //}
                                                            //if ($('#hdnImageWidth').length > 0) {
                                                            //    $('#hdnImageWidth').val(e.element.getAttribute('width'));
                                                            //}
                                                            //if ($('#hdnImageHeight').length > 0) {
                                                            //    $('#hdnImageHeight').val(e.element.getAttribute('height'));
                                                            //}
                                                        }
                                                    });
                                                });
                                            }
                                        });
                                    }
                                })
                            })
                        })

                        $('.tab-pane.in.active').find('input').each(function () {
                            if ($(this).attr('name') == 'Assessment_Id') {
                                $(this).hide();
                                $(this).prev().hide();
                            }
                            if ($(this).attr('name') == 'Card_Annotations') {
                                $(this).hide();
                                $(this).prev().hide();
                            }
                            if ($(this).attr('name') == 'Mappings') {
                                $(this).hide();
                                $(this).prev().hide();
                            }
                            if ($(this).attr('name') == 'Updated_Questions') {
                                $(this).hide();
                                $(this).prev().hide();
                            }
                        })
                    }
                    else {
                        $('.alert').text("Error in getting values. \n" + data.Message);
                    }
                },
                error: function (data) {
                    $('.alert').text("Error in getting values. \n" + data);
                    $('#tabcontainer').hide();
                }
            })
        }
        else {
            $("#divMetaContent").empty();
            $("#divMetaGroup").empty();
            $('#tabcontainer').hide();
        }
    }

    //call the change event for first template on page load
    //if (!IsClicked) {
    // $('#tblTemplateList tr td input[type="checkbox"]').trigger('change');
    //   IsClicked = true;
    //}
    TemplateChange();
    $('#hdnExtraValues').val('');

    function CourseTemplateBuilder(field_name, url, type, win) {
        if ($('#hdnImageSrc').val() == '') return true;
        var FileMan = $('#hdnPath').val() + '/Admin/CourseTemplateBuilder?CourseId=' + $('#hdnCourseId').val();
        tinyMCE.activeEditor.windowManager.open({
            file: FileMan,
            title: 'Certificate Template Editor',
            width: 850,
            height: 545,
            resizable: "yes",
            plugins: "media",
            inline: "no",
            close_previous: "no"
        }
      );
        return false;
    }

    function FileManager(field_name, url, type, win) {
        var FileMan = $('#hdnPath').val() + '/Admin/FileManager?field=' + field_name + '&type=' + type;
        tinyMCE.activeEditor.windowManager.open({
            file: FileMan,
            title: 'Resource Images',
            width: 850,
            height: 650,
            resizable: "yes",
            plugins: "media",
            inline: "no",
            close_previous: "no"
        }, {
            setUrl: function (url) {
                var j = 2;
                if (window.location.port != '') {
                    j = 1;
                }
                var SplitArr = url.split('/');
                var ImageUrl = '..';
                for (var i = j; i < SplitArr.length - 1; i++) {
                    ImageUrl += '/' + SplitArr[i];
                }
                win.document.getElementById(field_name).value = ImageUrl;
                $('#hdnResourceId').val(SplitArr[SplitArr.length - 1]);
            }
        });
        return false;
    }

})

function NumericValidation(sValue) {
    if (sValue == '') return 1;
    var sCharArr = sValue.trim().split('');
    var retval = 1;
    var dotcount = 0;
    for (var i = 0; i < sCharArr.length; i++) {
        if (isNaN(sCharArr[i]) && sCharArr[i] != '.') {
            retval = 0;
            break;
        }
        if (sCharArr[i] == '.') dotcount++;
    }

    if (dotcount > 1) retval = 0;
    return retval;
}

function DateValidation(sValue) {
    if (sValue == '') return 1;
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = sValue.match(rxDatePattern);
    if (dtArray == null) return 0;
    dtMonth = dtArray[1];
    dtDay = dtArray[3];
    dtYear = dtArray[5];
    if (dtMonth < 1 || dtMonth > 12)
        return 0;
    else if (dtDay < 1 || dtDay > 31)
        return 0;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return 0;
    else if (dtMonth == 2) {
        var isLeap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isLeap))
            return 0;
    }
    return 1;
}

function SaveMetaData() {
    IsClicked = true;
    var Resources = new Array;
    var MetaData = new Array;
    var TemplateData = new Array;
    var ValidationMessage = new Array;
    var sValidationMessage = '';
    var ResourceIds = '';
    //if ($('#txtContent').length > 0) {
    //    $('#hdnContent').val(tinyMCE.get('txtContent').getContent());
    //}

    //if ($("#ddlTemplates").val() != '0')
    Tempids = '';
    $('#tblTemplateList tr td input:checked').each(function () {
        if (this.checked == true) {
            if (Tempids == '')
                Tempids = $(this).val();
            else
                Tempids = Tempids + ',' + $(this).val();
        }
    });

    if (Tempids.length > 0) {
        // validate the inputs in metakey fields
        $("#divMetaContent .tab-pane").each(function () {

            $(this).find('input[type="text"]').each(function () {
                if ($(this).attr('datatype') == '2') {
                    if (!NumericValidation($(this).val())) {
                        sValidationMessage +=  $(this).prev('label').text() + ' requires numeric values - ';
                    }
                }
                if ($(this).attr('datatype') == '3') {
                    if (!DateValidation($(this).val())) {
                        sValidationMessage +=  $(this).prev('label').text() + ' requires valid date in mm/dd/yyyy format - ';
                    }
                }
            })

        })

        $("#divMetaContent .tab-pane").each(function (e) {

            $(this).find('input[type="text"]').each(function () {
                var Idtxt = $(this).attr('id');
                MetaData.push({ Meta: { Id: Idtxt.substr(4, Idtxt.length - 4), Value: $(this).val().trim() } });
                var sSpan = $(this).prev('label').find('span');
                if (sSpan.length > 0) {
                    if ($(this).val().trim() == '') {
                if (Idtxt.substr(4, Idtxt.length - 4) == 7)
                        {
                            
                    sValidationMessage += 'Customize => Course Features => ' + $(this).prev('label').text() + ' is required.-'
                    
                        }
                if (Idtxt.substr(4, Idtxt.length - 4) == 12) {

                    sValidationMessage += 'Customize => Learning Objectives => ' + $(this).prev('label').text() + ' is required.-'
                            

                        }
                if(Idtxt.substr(4, Idtxt.length - 4)==11)
                        {
                    sValidationMessage +=  'Customize => Learning Objectives =>' + $(this).prev('label').text() + ' is required.-'
                    
                        }
                        
                    }
                }
            })

            $(this).find('textarea').each(function () {
                var Idtxt = $(this).attr('id');
                var divMceText = '';
                if ($(this).attr('ControlType') == '8') {
                    divMceText = $('#' + Idtxt + '_ifr').contents().find('body').html()
                    $(divMceText).find('img').each(function (i) {
                        if ($(this).attr('id') != undefined) {
                            var ResVal = $(this).attr('id').split('_')[1];
                            if (isNaN(ResVal) == false && ResVal != '') {
                                ResourceIds += $(this).attr('id').split('_')[1] + ',';
                            }
                        }
                    })
                    MetaData.push({ Meta: { Id: Idtxt.substr(4, Idtxt.length - 4), Value: divMceText } });
                }
                else {
                    MetaData.push({ Meta: { Id: Idtxt.substr(4, Idtxt.length - 4), Value: $(this).val().trim() } });
                }
                var sSpan = $(this).prev('label').find('span');
                if (sSpan.length > 0) {
                    if ($(this).attr('ControlType') == '8') {
                        if (divMceText == '') {
                            sValidationMessage +=  $(this).prev('label').text() + ' is required.';
                        }
                    }
                    else {
                        if ($(this).val().trim() == '') {
                            sValidationMessage +=  $(this).prev('label').text() + ' is required.';
                        }
                    }
                }
            })

            var sIdTxt = '';
            var sValues = '';
            $(this).find('input[type="radio"]').each(function () {
                if (sIdTxt == $(this).prop('name')) {
                    if ($(this).prop('checked') == true) {
                        sValues += $(this).val().trim() + ',';
                    }
                }
                else {
                    if (sIdTxt != '') {
                        MetaData.push({ Meta: { Id: sIdTxt.substr(4, sIdTxt.length - 4), Value: sValues.substr(0, sValues.length - 1) } });
                        var sSpan = $(this).prev('label').find('span');
                        if (sSpan.length > 0) {
                            if (sValues == '') {
                                sValidationMessage += $(this).prev('label').text() + ' is required.';
                            }
                        }
                        sValues = '';
                    }
                    sIdTxt = $(this).prop('name');
                    if ($(this).prop('checked') == true) {
                        sValues += $(this).val().trim() + ',';
                    }
                }
            })
            if (sIdTxt != '') {
                MetaData.push({ Meta: { Id: sIdTxt.substr(4, sIdTxt.length - 4), Value: sValues.substr(0, sValues.length - 1) } });
                var sSpan = $(this).prev('label').find('span');
                if (sSpan.length > 0) {
                    if (sValues == '') {
                        sValidationMessage += $(this).prev('label').text() + ' is required.';
                    }
                }
            }

            sIdTxt = '';
            sValues = '';
            $(this).find('input[type="checkbox"]').each(function () {
                if (sIdTxt == $(this).prop('name')) {
                    if ($(this).prop('checked') == true) {
                        sValues += $(this).val().trim() + ',';
                    }
                }
                else {
                    if (sIdTxt != '') {
                        MetaData.push({ Meta: { Id: sIdTxt.substr(4, sIdTxt.length - 4), Value: sValues.substr(0, sValues.length - 1) } });
                        var sSpan = $(this).prev('label').find('span');
                        if (sSpan.length > 0) {
                            if (sValues == '') {
                                sValidationMessage +=  $(this).prev('label').text() + ' is required.';
                            }
                        }
                        sValues = '';
                    }
                    sIdTxt = $(this).prop('name');
                    if ($(this).prop('checked') == true) {
                        sValues += $(this).val().trim() + ',';
                    }
                }
            })
            if (sIdTxt != '') {
                MetaData.push({ Meta: { Id: sIdTxt.substr(4, sIdTxt.length - 4), Value: sValues.substr(0, sValues.length - 1) } });
                var sSpan = $(this).prev('label').find('span');
                if (sSpan.length > 0) {
                    if (sValues == '') {
                        sValidationMessage +=  $(this).prev('label').text() + ' is required.';
                    }
                }
            }

            $(this).find('select').each(function () {
                var Idtxt = $(this).attr('Id');
                var iValues = '';
                $(this).find('option').each(function () {
                    if ($(this).prop('selected')) {
                        iValues += $(this).val() + ',';
                    }
                })
                MetaData.push({ Meta: { Id: Idtxt.substr(4, Idtxt.length - 4), Value: iValues.substr(0, iValues.length - 1) } });
                var sSpan = $(this).prev('label').find('span');
                if (sSpan.length > 0) {
                    if (sValues == '') {
                        sValidationMessage +=  $(this).prev('label').text() + ' is required.';
                    }
                }
            })

        })

        // add validation messages to a json array
        ValidationMessage.push(sValidationMessage);

        var ResArr1 = ResourceIds.split(',');
        var ResArr2 = ResourceIds.split(',');
        ResourceIds = '';
        for (var i = 0; i < ResArr1.length; i++) {
            var existno = 0;
            for (var j = 0; j < ResArr2.length; j++) {
                if (ResArr1[i] == ResArr2[j] && ResArr2[j] != '') {
                    existno++;
                    if (existno > 1) {
                        ResArr2[j] = '';
                    }
                }
            }
        }
        for (var i = 0; i < ResArr1.length; i++) {
            if (ResArr2[i] != '') {
                ResourceIds += ResArr2[i] + ',';
            }
        }
        Resources.push(ResourceIds);
        //TemplateData.push({ TemplateData: { Id: $('#ddlTemplates').val(), MetaData: MetaData, ValidationMessage: ValidationMessage, Resources: Resources } });
        TemplateData.push({ TemplateData: { Id: Tempids, MetaData: MetaData, ValidationMessage: ValidationMessage, Resources: Resources } });
        $('#hdnExtraValues').val(JSON.stringify(TemplateData));
        tinyMCE.triggerSave();
        //$('#EventCommand').val('save');
        //document.forms[0].submit();
    }
}
