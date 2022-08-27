
$(function () {

        $('.panel-heading span.clickable').on("click", function (e) {
            if ($(this).hasClass('panel-collapsed')) {
                // expand the panel
                $(this).parents('.panel').find('.panel-body').slideDown();
                $(this).removeClass('panel-collapsed');
                $(this).find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
            }
            else {
                // collapse the panel
                $(this).parents('.panel').find('.panel-body').slideUp();
                $(this).addClass('panel-collapsed');
                $(this).find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
            }
        });

        $('#ddlCountry').change(function () {

            var url = $("#hdnPath").val() + '/Admin/Country';
            var ddlsource = '#ddlCountry';
            var ddltarget = '#ddlState';
            $.getJSON(url, { id: $(ddlsource).val() }, function (data) {

                $(ddltarget).empty();
                $.each(data, function (index, optionData) {
                    $(ddltarget).append("<option value='" + optionData.Text + "'>" + optionData.Value + "</option>");
                });

            });
        });

        $('#ddlCountry').trigger('change');
    
        // read the values of various fields entered by user push into the json array and append in hidden field
        $('#btnSave').click(function () {

            var MetaData = new Array;
            var TemplateData = new Array;
            var ValidationMessage = new Array;
            var sValidationMessage = '';

            // validate the email entered
            if (!ValidateEmail($('#txtEmail').val().trim())) {
                sValidationMessage += 'Email is invalid. Please enter a valid email.';
            }

            // validate the inputs in metakey fields
            var iChkPanel = 0;
            $(".col-md-4 .form-group").each(function () {
                if (iChkPanel > 2) {
                    
                    $(this).find('input[type="text"]').each(function () {
                        if ($(this).attr('datatype') == '2') {
                           
                            if (!NumericValidation($(this).val())) {
                                sValidationMessage += 'Metakey ' + $(this).prev('span').text() + ' requires numeric values - ';
                            }
                        }
                        if ($(this).attr('datatype') == '3') {
                            if (!DateValidation($(this).val())) {
                                sValidationMessage += 'Metakey ' + $(this).prev('span').text() + ' requires valid date in mm/dd/yyyy format - ';
                            }
                        }
                    })
                }
                iChkPanel += 1;
            })

            // add validation messages to a json array
            ValidationMessage.push(sValidationMessage);

            iChkPanel = 0;
            $(".col-md-4 .form-group").each(function () {
                if (iChkPanel > 2) {
                    $(this).find('input[type="text"]').each(function () {
                        if ($(this).val().trim() != '') {
                            var Idtxt = $(this).attr('id');
                            MetaData.push({ Meta: { Id: Idtxt.substr(5, Idtxt.length - 5), Value: $(this).val().trim() } });
                          
                        }
                    })

                    $(this).find('textarea').each(function () {
                        if ($(this).val().trim() != '') {
                            var Idtxt = $(this).attr('id');
                            MetaData.push({ Meta: { Id: Idtxt.substr(5, Idtxt.length - 5), Value: $(this).val().trim() } });
                        }
                    })

                    $(this).find('input[type="radio"]').each(function () {
                        if ($(this).prop('checked') == true) {
                            var Idtxt = $(this).prop('name');
                            MetaData.push({ Meta: { Id: Idtxt.substr(5, Idtxt.length - 5), Value: $(this).val().trim() } });
                        }
                    })

                    var sIdTxt = '';
                    var sValues = '';
                    $(this).find('input[type="checkbox"]').each(function () {
                        if ($(this).prop('checked') == true) {
                            if (sIdTxt == $(this).prop('name')) {
                                sValues += $(this).val().trim() + ',';
                            }
                            else {
                                if (sIdTxt != '') {
                                    MetaData.push({ Meta: { Id: sIdTxt.substr(5, sIdTxt.length - 5), Value: sValues.substr(0, sValues.length - 1) } });
                                }
                                sIdTxt = $(this).prop('name');
                                sValues = $(this).val().trim() + ',';
                            }
                        }
                    })
                    if (sIdTxt != '') {
                        MetaData.push({ Meta: { Id: sIdTxt.substr(5, sIdTxt.length - 5), Value: sValues.substr(0, sValues.length - 1) } });
                    }

                    $(this).find('select[multiple!="multiple"]').each(function () {
                        var Idtxt = $(this).attr('Id');
                        if ($(this).val() != '0') {
                            MetaData.push({ Meta: { Id: Idtxt.substr(5, Idtxt.length - 5), Value: $(this).val() } });
                        }
                    })

                    $(this).find('select[multiple="multiple"]').each(function () {
                        var Idtxt = $(this).attr('Id');
                        var iValues = '';
                        $(this).find('option').each(function () {
                            if ($(this).prop('selected')) {
                                iValues += $(this).val() + ',';
                            }
                        })
                        if (iValues != '') {
                            MetaData.push({ Meta: { Id: Idtxt.substr(5, Idtxt.length - 5), Value: iValues.substr(0, iValues.length - 1) } });
                        }
                    })
                }
                iChkPanel += 1;

            })

            TemplateData.push({ TemplateData: { MetaData: MetaData, ValidationMessage: ValidationMessage } });

            $('#hdnExtraValues').val(JSON.stringify(TemplateData));

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

        function ValidateEmail(sValue) {
            var sFilter = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if (sFilter.test(sValue)) {
                return 1;
            }
            else {
                return 0;
            }
        }

    })

