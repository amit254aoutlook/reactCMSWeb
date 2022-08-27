        
    $(function () {

        // global variables to hold current window's width and related width of menu item widgets
        var MaxMargin = 0; // margin of menu items
        var MaxWidth = 0; // width of menu items

        var ScrWidth = $(window).width(); // current window size
        if (ScrWidth < 1000) {
            MaxMargin = 0;
            MaxWidth = 0;
        }
        else {
            MaxMargin = 40;
            MaxWidth = 350;
        }

        // set the width of menu items and orientation according to window size
        SetControls();

        // merchants assigned to current menu group
        var sMenuGroupMerchants = '';
        // merchants not assigned to current menu group
        var sOtherMerchants = '';
        // merchants assigned to current menu group active/inactive status array
        var sIsActiveArr = ''; 
        var sMenuGroups = '';
        // menu group array
        var sMenuGroupArr = JSON.parse($("#hdnMenuGroups").val()); 
        // get menu types array
        var sMenuTypeArr = JSON.parse($("#hdnMenuTypes").val());

        // append menu groups to create option elements html
        $.each(sMenuGroupArr, function (i) {
            sMenuGroups += '<option value=' + sMenuGroupArr[i].MenuGroupId + '>' + sMenuGroupArr[i].MenuGroupName + '</option>';
        })

        // empty, append and select first menu group in the menu group combo box
        $("#selectmenugroups").empty();
        $("#selectmenugroups").append(sMenuGroups);
        $("#txtselectmenu").val(sMenuGroupArr[0].MenuGroupName);
        if (sMenuGroupArr[0].IsActive) {
            $("#lblMenuActive input").prop('checked', true);
        }

        // make the menu items panel on the right sortable
        $("#sortable").sortable();

        // empty the message boxes
        $("#divMessagesuccess").hide();
        $("#divMessage1success").hide();
        $("#divMessage2success").hide();
        $("#divMessage3success").hide();
        $("#divMessagedanger").hide();
        $("#divMessage1danger").hide();
        $("#divMessage2danger").hide();
        $("#divMessage3danger").hide();
        $("#divMessageAssignsuccess").hide();
        $("#divMessageAssigndanger").hide();

        // show dialog box for deleting the menu group
        $('#btnDeleteMenuGroup').click(function () {
            $("#divMessagesuccess").hide();
            $("#divMessage1success").hide();
            $("#divMessage2success").hide();
            $("#divMessage3success").hide();
            $("#divMessagedanger").hide();
            $("#divMessage1danger").hide();
            $("#divMessage2danger").hide();
            $("#divMessage3danger").hide();
            $("#divMessageAssignsuccess").hide();
            $("#divMessageAssigndanger").hide();
            $("#dlgDelMenu").modal('show');
        });

        if ($('#hdnPath').val() == '/') $('#hdnPath').val('');
        
        // deleting the selected menu group
        $("#btnDelMenuOk").click(function () {
            $("#divMessagesuccess").hide();
            $("#divMessage1success").hide();
            $("#divMessage2success").hide();
            $("#divMessage3success").hide();
            $("#divMessagedanger").hide();
            $("#divMessage1danger").hide();
            $("#divMessage2danger").hide();
            $("#divMessage3danger").hide();
            $("#divMessageAssignsuccess").hide();
            $("#divMessageAssigndanger").hide();
            $.ajax({
                type: "GET",
                url: $('#hdnPath').val() + "/Admin/DeleteMenus?MenuGroupId=" + $('#selectmenugroups').val(),
                datatype: "JSON",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.Success) {
                        // remove the selected menu group in combo box
                        $('#selectmenugroups option[value=' + $('#selectmenugroups').val() + ']').remove();
                        // select the first menu group in the combo
                        $('#selectmenugroups option').first().css('selected', 'selected'); 
                        $("#selectmenugroups").trigger("change");
                        $('#lblMessage1success').text("Menus group deleted successfully.");
                        $('#divMessage1success').css("display", "block");
                    } else {
                        $('#lblMessage1danger').text("Menus group can not be deleted , its assigned to the customer.");
                        $('#divMessage1danger').css("display", "block");
                    }
                },
                error: function (data) {
                    $('#lblMessage1danger').text("Menus group can not be deleted, its assigned to the customer.");
                    $('#divMessage1danger').css("display", "block");
                }
            });
        });

        // set the menu items after drag and drop
        $(document).on('mouseup', '#sortable .widget-box', function () {
            $("#divMessagesuccess").hide();
            $("#divMessage1success").hide();
            $("#divMessage2success").hide();
            $("#divMessage3success").hide();
            $("#divMessagedanger").hide();
            $("#divMessage1danger").hide();
            $("#divMessage2danger").hide();
            $("#divMessage3danger").hide();
            $("#divMessageAssignsuccess").hide();
            $("#divMessageAssigndanger").hide();
            var CurEl = $(this);
            var CurLeft = parseInt(CurEl.offset().left);
            var PrevLeft = 0;
            var SetLevel = -1;
            var DivArr = $("#sortable .widget-box");
            var cnt = -1;

            // find the place of the current dragdropped menu item
            for (var i = 0; i < DivArr.length; i++) {
                if (DivArr[i].style.visibility == 'hidden') {
                    cnt = i;
                    break;
                }
            }
            if (cnt == -1) {
                $(this).trigger('mousedown'); // call the mouse down event
                return 0;
            }

            // set the mneu level of dragdropped menu item
            for (var i = cnt - 1; i > -1; i--) {
                PrevLeft = DivArr[i].offsetLeft;
                if (PrevLeft < CurLeft) {
                    SetLevel = parseInt(DivArr[i].children[0].value) + 1;
                    break;
                }
            }
            CurEl.find('input[type="hidden"]:eq(0)').val(SetLevel);
            $('.ui-sortable-placeholder').append('<input type="text" value="' + SetLevel + '" />');
            if (SetLevel == -1) {
                CurEl.find('input[type="hidden"]:eq(0)').val("0");
                $('.ui-sortable-placeholder input').val("0");
            }

            // set the menu level of each menu item 
            var knt = 0;
            if (DivArr[0].className == 'widget-box collapsed ui-sortable-helper') knt = 1;
            DivArr[knt].children[0].value = 0;
            PrevLeft = 0;
            CurLeft = 0;
            for (var i = knt; i < DivArr.length; i++) {
                if (DivArr[i].className == 'widget-box collapsed ui-sortable-helper') continue;
                CurLeft = parseInt(DivArr[i].children[0].value);
                if (CurLeft - PrevLeft > 1) {
                    for (var j = i; j < DivArr.length; j++) {
                        if (DivArr[j].className == 'widget-box collapsed ui-sortable-helper') continue;
                        PrevLeft++;
                        if (DivArr[j].children[0].value > PrevLeft) {
                            DivArr[j].children[0].value = PrevLeft;
                        }
                        if (DivArr[j].className == 'widget-box collapsed ui-sortable-placeholder') $('.ui-sortable-helper input[type="hidden"]:eq(0)').val(PrevLeft);
                    }
                    break;
                }
                PrevLeft = CurLeft;
            }

            // set margins for menu items on the basis of their menu level
            for (var i = 0; i < DivArr.length; i++) {
                if (DivArr[i].className == 'widget-box collapsed ui-sortable-helper') continue;
                CurLeft = parseInt(DivArr[i].children[0].value) * MaxMargin;
                if (DivArr[i].className == 'widget-box collapsed ui-sortable-placeholder') $('.ui-sortable-helper').css('margin-left', CurLeft + 'px');
                DivArr[i].style['margin-left'] = CurLeft + 'px';
            }

        });

        // add the mneu item to the right panel
        $("#btnAddMenuItem").click(function () {
            $("#divMessagesuccess").hide();
            $("#divMessage1success").hide();
            $("#divMessage2success").hide();
            $("#divMessage3success").hide();
            $("#divMessagedanger").hide();
            $("#divMessage1danger").hide();
            $("#divMessage2danger").hide();
            $("#divMessage3danger").hide();
            $("#divMessageAssignsuccess").hide();
            $("#divMessageAssigndanger").hide();

            if ($("#txtMenuText").val().trim() == '') {
                $('#lblMessage1danger').text("Enter menu name.");
                $('#divMessage1danger').css("display", "block");
                return 0;
            }

            // set the menu types and append the new menu item to the right panel
            var sMenuTypes = '';
            var i = 0;
            $.each(sMenuTypeArr, function (idx) {
                if (i == 1) {
                    sMenuTypes += '<option value=' + idx + ' selected="selected">' + sMenuTypeArr[idx] + '</option>';
                }
                else {
                    sMenuTypes += '<option value=' + idx + '>' + sMenuTypeArr[idx] + '</option>';
                }
                i++;
            })

            $("#sortable").append(
                        '<div style="margin-left:0px; width:' + MaxWidth + 'px" class="widget-box collapsed">' +
                            '<input type="hidden" value="0" />' +
                            '<input type="hidden" value="0" />' +
                            '<div class="widget-header">' +
                                '<h5>' + $("#txtMenuText").val() + '</h5>' +
                                '<div class="widget-toolbar">' +
                                    '<a data-action="collapse" href="#">' +
                                        '<i class="icon-chevron-down"></i>' +
                                    '</a>' +
                                '</div>' +
                            '</div>' +
                            '<div class="widget-body">' +
                                '<div class="widget-main">' +
                                    '<form class="form-horizontal">' +
                                        '<div class="control-group">' +
                                            '<br />' +
                                         'Link Text&nbsp;&nbsp;' +
                                         '<input type="text" maxlength="50" value="' + $("#txtMenuText").val() + '" />' +
                                            '<br /><br />' +
                                          'URL &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                                           '<input type="text" maxlength="500" value="' + $("#txtMenuUrl").val() + '" />' +
                                         '<br /><br />' +
                                          'Icon Class' +
                                         '<input type="text" maxlength="50" value="" />' +
                                          '<br /><br />' +
                                          'Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                                           '<select>' + sMenuTypes + '</select>' +
                                           '<label>' +
                                           '<br /><br />' +
                                           '<input name="form-field-checkbox" type="checkbox" checked="checked">' +
                                           '<span class="lbl">&nbsp;&nbsp;&nbsp;&nbsp;Is Active</span>' +
                                           '</label>' + '<br />' +
                                    '<button class="btn btn-small" type="button">' +
                                  'Remove' +
                             '</button>' +
                    '</div>' +
                '</form>' +
            '</div>' +
            '</div>' +
            '</div>'
            );
        });

        // get the changed menu group in combo box and its related menu items and show them
        $("#selectmenugroups").change(function () {
            $("#divMessagesuccess").hide();
            $("#divMessage1success").hide();
            $("#divMessage2success").hide();
            $("#divMessage3success").hide();
            $("#divMessagedanger").hide();
            $("#divMessage1danger").hide();
            $("#divMessage2danger").hide();
            $("#divMessage3danger").hide();
            $("#divMessageAssignsuccess").hide();
            $("#divMessageAssigndanger").hide();

            // change the selected menu group and remove the selected property from previous menu group
            $(this).find("option[selected=selected]").removeAttr("selected");
            $("#selectmenugroups option[value=" + $(this).val() + "]").attr("selected", "selected");
            var selText = $(this).find("option[selected=selected]").text();
            $("#txtselectmenu").val(selText.trim());

            // set the active/inactive status of the selected menu group
            $("#lblMenuActive input").prop('checked', false);
            var MnuGrpId = parseInt($(this).val());
            $.each(sMenuGroupArr, function(i) {
                if(sMenuGroupArr[i].MenuGroupId == MnuGrpId && sMenuGroupArr[i].IsActive == 1) {
                    $("#lblMenuActive input").prop('checked', true)
                };
            })

            // empty and fill up the right panel with the selected menu group's menu items
            $("#sortable").empty();
            var MnuItems = '';
            var sMenuTypes = '';
            $.ajax({
                type: "GET",
                url: $('#hdnPath').val() + "/Admin/MenuGroupChanged?MenuGroupId=" + $('#selectmenugroups').val(),
                datatype: "JSON",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.Success) {
                        var sMenuItems = data.sGroupMenuMenuItems;
                        $.each(sMenuItems, function (index) {
                            var margin = (sMenuItems[index].MenuLevel * MaxMargin) + "px"; // set the margin of menu item

                            // fill the menutypes string with html of menutypes
                            sMenuTypes = '';
                            $.each(sMenuTypeArr, function (idx) {
                                if (sMenuItems[index].sMenuType == idx) {
                                    sMenuTypes += '<option value=' + idx + ' selected="selected">' + sMenuTypeArr[idx] + '</option>';
                                }
                                else {
                                    sMenuTypes += '<option value=' + idx + '>' + sMenuTypeArr[idx] + '</option>';
                                }
                            })

                            // set the active/inactive status of menu item
                            var chkActiveTxt = '';
                            if (sMenuItems[index].IsActive) {
                                chkActiveTxt = 'checked="checked"';
                            }

                            // append the html for menu items
                            MnuItems += '<div style="margin-left:' + margin + '; width:' + MaxWidth + 'px" class="widget-box collapsed">' +
                                                    '<input type="hidden" value="' + sMenuItems[index].MenuLevel + '" />' +
                                                    '<input type="hidden" value="' + sMenuItems[index].MenuItemId + '" />' +
                                                        '<div class="widget-header">' +
                                                            '<h5>' + sMenuItems[index].MenuName + '</h5>' +
                                                            '<div class="widget-toolbar">' +
                                                                '<a data-action="collapse" href="#">' +
                                                                    '<i class="icon-chevron-down"></i>' +
                                                                '</a>' +
                                                            '</div>' +
                                                        '</div>' +
                                                        '<div class="widget-body">' +
                                                            '<div class="widget-main">' +
                                                                '<form class="form-horizontal">' +
                                                                    '<div class="control-group">' +
                                                                        '<br />' +
                                                                            'Link Text&nbsp;&nbsp;' +
                                                        '<input type="text" maxlength="50" value="' + sMenuItems[index].MenuName + '" />' +
                                                        '<br /><br />' +
                                                        'URL &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                                                        '<input type="text" maxlength="500" value="' + sMenuItems[index].MenuLink + '" />' +
                                                        '<br /><br />' +
                                                        'Icon Class' +
                                                        '<input type="text" maxlength="50" value="' + sMenuItems[index].MenuIconClass + '" />' +
                                                        '<br /><br />' +
                                                        'Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                                                        '<select>' + sMenuTypes + '</select>' +
                                                        '<br /><br />' +
                                                        '<label>' +
                                                        '<input name="form-field-checkbox" type="checkbox" ' + chkActiveTxt + '>' +
                                                        '<span class="lbl">&nbsp;&nbsp;&nbsp;&nbsp;Is Active</span>' +
                                                        '</label>' +
                                                        '<br />' +
                                                        '<button class="btn btn-small" type="button">' +
                                                        'Remove' +
                                                                            '</button>' +
                                                                    '</div>' +
                                                                '</form>' +
                                                            '</div>' +
                                                            '</div>' +
                                                            '</div>'
                        });
                        $("#sortable").append(MnuItems);
                    }
                    else {
                        $('#lblMessage1danger').text("Error occured. \n" + data.Message);
                        $('#divMessage1danger').css("display", "block");
                    }
                },
                error: function (data) {
                    $('#lblMessage1danger').text("Error occured. \n" + data);
                    $('#divMessage1danger').css("display", "block");
                }
            });

        });

        // call the menu group change on for load event
        $("#selectmenugroups").change();

        // save the assigned merchants to current selected menu group
        $("#btnSaveAssign").click(function () {
            $("#divMessagesuccess").hide();
            $("#divMessage1success").hide();
            $("#divMessage2success").hide();
            $("#divMessage3success").hide();
            $("#divMessagedanger").hide();
            $("#divMessage1danger").hide();
            $("#divMessage2danger").hide();
            $("#divMessage3danger").hide();
            $("#divMessageAssignsuccess").hide();
            $("#divMessageAssigndanger").hide();

            // check if a merchant row availabe in grid
            var sMerchant = $("#table-assign tbody tr:eq(1)");
            if(sMerchant==undefined){
                $('#lblMessageAssigndanger').text("No merchants available for saving.");
                $('#divMessageAssigndanger').css("display", "block");
                return 0;
            }

            var MerchantArr = []; // merchant array
            var IsActiveArr = []; // merchant active.inactive status array

            // fill up the merchant and its active/inactive menugroup status
            $("#table-assign tbody tr").each(function (index) {
                MerchantArr.push($(this).find("td:eq(2)").text().trim());
                IsActiveArr.push($(this).find("td:eq(1) input").prop('checked'));
            });

            // selected menu group
            var MenuGroupId = $("#selectmenugroups").val();

            // save the merchants to the menugroup
            $.ajax({
                type: "POST",
                url: $('#hdnPath').val() + "/Admin/SaveMenuAssign",
                async:false,
                data: JSON.stringify({ MerchantIds: MerchantArr, IsActiveArr: IsActiveArr, MenuGroupId: MenuGroupId }),
                datatype: "JSON",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.Success) {
                        $('#lblMessageAssignsuccess').text("Customers assigned successfully.");
                        $('#divMessageAssignsuccess').css("display", "block");
                        SetLeftPanelMenus(data.sDataArr.LPanelMenus);
                    }
                    else {
                        $('#lblMessageAssigndanger').text("Customers not assign. \n" + data.Message);
                        $('#divMessageAssigndanger').css("display", "block");
                    }
                },
                error: function (data) {
                    $('#lblMessageAssigndanger').text("Customers not assign. \n" + data);
                    $('#divMessageAssigndanger').css("display", "block");
                }
            });
        });

        // delete row button function for deleting the assigned merchant in the grid
        $(document).on('click', '#table-assign tbody .btn', function () {
            $("#divMessagesuccess").hide();
            $("#divMessage1success").hide();
            $("#divMessage2success").hide();
            $("#divMessage3success").hide();
            $("#divMessagedanger").hide();
            $("#divMessage1danger").hide();
            $("#divMessage2danger").hide();
            $("#divMessage3danger").hide();
            $("#divMessageAssignsuccess").hide();
            $("#divMessageAssigndanger").hide();
            $('#selectmerchants').append('<option value=' + $(this).parents('tr').find('td:eq(2)').text().trim() + '>' + $(this).parents('tr').find('td:eq(3)').text().trim() + '</option>');
            $(this).parents("tr").remove();
            $("#btnSaveAssign").trigger("click");
            $('#lblMessageAssignsuccess').text("Customers delete successfully.");
            $('#divMessageAssignsuccess').css("display", "block");

        });

        // add the merchant from the combo box to the assigned merchants grid below
        $("#btnAssignMerchant").click(function () {
            $("#divMessagesuccess").hide();
            $("#divMessage1success").hide();
            $("#divMessage2success").hide();
            $("#divMessage3success").hide();
            $("#divMessagedanger").hide();
            $("#divMessage1danger").hide();
            $("#divMessage2danger").hide();
            $("#divMessage3danger").hide();
            $("#divMessageAssignsuccess").hide();
            $("#divMessageAssigndanger").hide();

            // select the merchant id of shown merchant in combo box and check if there is merchant avaialbe in combo box
            var sMerchantId = $('#selectmerchants').val(); 
            if(sMerchantId==undefined){
                $('#lblMessageAssign').text("No customers available for adding.");
                $('#divMessageAssign').css("display", "block");
                return 0;
            }

            // remove the selected combo box merchant from combo and select next available merchant
            $('#selectmerchants option[value=' + sMerchantId + ']').remove();
            $('#selectmenugroups option').first().css('selected', 'selected');
            
            // find the merchant values if assigned previously
            var GridRow = '';
            var ActiveVal = '<input type="checkbox" />';
            for(var i = 0; i < sOtherMerchants.length; i++ ){
                if(sOtherMerchants[i].MerchantId == sMerchantId){
                    GridRow = sOtherMerchants[i];
                    break;
                }
            }
            for(var i = 0; i < sMenuGroupMerchants.length; i++ ){
                if(sMenuGroupMerchants[i].MerchantId == sMerchantId){
                    GridRow = sMenuGroupMerchants[i];
                    break;
                }
            }
            for(var i = 0; i < sIsActiveArr.length; i++ ){
                if(sIsActiveArr[i].MerchantId == sMerchantId){
                    if(sIsActiveArr[i].IsActive == true){
                        ActiveVal = '<input type="checkbox" checked="checked"/>';
                    }
                    break;
                }
            }

            // merchant append string for grid
            var txtGridEl = '<tr>' +
                                '<td class="td-actions">' +
                                    '<div class="btn-group">' +
                                        '<button class="btn btn-mini btn-success">' +
                                            '<i class="icon-trash bigger-120"></i>' +
                                        '</button>' +
                                    '</div>' +
                                '</td>' +
                                '<td class="center">' +
                                    '<label>' +
                                    ActiveVal +
                                    '<span class="lbl"></span>' +
                                    '</label>' +
                                '</td>' +
                                '<td style="display:none;">' + GridRow.MerchantId + '</td>' +
                                '<td>' + GridRow.MerchantCompany + '</td>' +
                                '<td>' + GridRow.MerchantAbbrName + '</td>' +
                            '</tr>';

            var chkInsert = -1;
            $("#table-assign tbody").append(txtGridEl);
        });

        // function to show the assigned merchants in dialog box
        $("#btnAssignMenuGroup").click(function () {
            $("#divMessagesuccess").hide();
            $("#divMessage1success").hide();
            $("#divMessage2success").hide();
            $("#divMessage3success").hide();
            $("#divMessagedanger").hide();
            $("#divMessage1danger").hide();
            $("#divMessage2danger").hide();
            $("#divMessage3danger").hide();
            $("#divMessageAssignsuccess").hide();
            $("#divMessageAssigndanger").hide();
            // empty the merchants table
            $("#table-assign tbody").empty(); 
            var Merchants = '';

            // ajax call to action method for fetching merchants assigned to current menu group
            $.ajax({
                type: "GET",
                url: $('#hdnPath').val() + "/Admin/MenuGroupMerchants?MenuGroupId=" + $('#selectmenugroups').val(),
                datatype: "JSON",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.Success) {
                        sMenuGroupMerchants = data.sDataArr.MenuGroupMerchants;
                        sIsActiveArr = data.sDataArr.ActiveArr;
                        $.each(sMenuGroupMerchants, function (index) {
                            // find the active/inactive status of current merchant item in loop
                            var ActiveVal = '<input type="checkbox" />';
                            for (var i = 0; i < sIsActiveArr.length; i++) {
                                if (sIsActiveArr[i].MerchantId == sMenuGroupMerchants[index].MerchantId) {
                                    if (sIsActiveArr[i].IsActive == true) {
                                        ActiveVal = '<input type="checkbox" checked="checked"/>';
                                    }
                                    break;
                                }
                            }

                            // current merchant item append string
                            Merchants +=
                                '<tr>' +
                                    '<td class="td-actions">' +
                                        '<div class="btn-group">' +
                                            '<button class="btn btn-mini btn-success">' +
                                                '<i class="icon-trash bigger-120"></i>' +
                                            '</button>' +
                                        '</div>' +
                                    '</td>' +
                                    '<td class="center">' +
                                        '<label>' +
                                        ActiveVal +
                                        '<span class="lbl"></span>' +
                                        '</label>' +
                                        '</td>' +
                                    '<td style="display:none;">' + sMenuGroupMerchants[index].MerchantId + '</td>' +
                                    '<td>' + sMenuGroupMerchants[index].MerchantCompany + '</td>' +
                                    '<td>' + sMenuGroupMerchants[index].MerchantAbbrName + '</td>' +
                                '</tr>'

                        });
                        $("#table-assign tbody").append(Merchants); // append merchants string to table.

                        // get other merchants not assigned to selected menu group
                        sOtherMerchants = data.sDataArr.OtherMerchants;
                        Merchants = '';

                        // fill up the combo box for merchants not assigned to selected menu group
                        $.each(sOtherMerchants, function (index) {
                            if (index == 0) {
                                Merchants += '<option value=' + sOtherMerchants[index].MerchantId + ' selected="selected">' + sOtherMerchants[index].MerchantCompany + '</option>';
                            }
                            else {
                                Merchants += '<option value=' + sOtherMerchants[index].MerchantId + '>' + sOtherMerchants[index].MerchantCompany + '</option>';
                            }
                        });
                        $('#selectmerchants').empty();
                        $('#selectmerchants').append(Merchants);

                        // show the dialog box for assigned merchants
                        $("#sMenuModal").modal('show');
                    }
                    else {
                        $('#lblMessage1danger').text("Error occured. \n" + data.Message);
                        $('#divMessage1danger').css("display", "block");
                    }
                },
                error: function (data) {
                    $('#lblMessage1danger').text("Error occured. \n" + data);
                    $('#divMessage1danger').css("display", "block");
                }
            });

        });

        // function for adding the new menu group to left panel
        $("#btnAddMenuGroup").click(function () {
            $("#divMessagesuccess").hide();
            $("#divMessage1success").hide();
            $("#divMessage2success").hide();
            $("#divMessage3success").hide();
            $("#divMessagedanger").hide();
            $("#divMessage1danger").hide();
            $("#divMessage2danger").hide();
            $("#divMessage3danger").hide();
            $("#divMessageAssignsuccess").hide();
            $("#divMessageAssigndanger").hide();

            var selectmenutext = $("#txtselectmenu").val();
            
            // check that menu group name entered or not
            if (selectmenutext.trim() == '') {
                $('#lblMessage1danger').text("Enter menu group name.");
                $('#divMessage1danger').css("display", "block");
                return 0;
            }

            // logic to cancel menu group added or revert to previous state 
            if ($("#btnAddMenuGroup").text().trim() == "Add Group") {
                var FindGroup = 0;
               
                // check to see menu group already added
                $("#selectmenugroups option").each(function () {
                    if ($(this).text().trim() == $("#txtselectmenu").val().trim()) {
                        $('#lblMessage1danger').text("Menu group already exists. Enter a different menu group name.");
                        $('#divMessage1danger').css("display", "block");
                        FindGroup = 1;
                        return false;
                    }
                                       
                })
                
                if (FindGroup == 1) return 0;

                // append the menu group
                $('#selectmenugroups').append($('<option>', { value: 0, text: $("#txtselectmenu").val() }));
                $("#selectmenugroups option").last().attr("selected", "selected");
                $("#sortable").empty();
                $("#btnAddMenuGroup").text("Cancel Group");
                $("#selectmenugroups").prop("disabled", true);
                $("#btnDeleteMenuGroup").prop("disabled", true);
                $("#btnAssignMenuGroup").prop("disabled", true);
            }
            else {
                $("#btnAddMenuGroup").text("Add Group");
                $("#selectmenugroups").prop("disabled", false);
                $("#btnDeleteMenuGroup").prop("disabled", false);
                $("#btnAssignMenuGroup").prop("disabled", false);
                $('#selectmenugroups option[value=' + $('#selectmenugroups').val() + ']').remove();
                $('#selectmenugroups option').first().css('selected', 'selected');
                $("#selectmenugroups").trigger("change");
            }
        });

        // function for saving the menu group and its all the menu items
        $("#btnSaveMenuGroup1").click(function () { SaveMenuGroups('#divMessage1success', '#lblMessage1success'); })
        $("#btnSaveMenuGroup2").click(function () { SaveMenuGroups('#divMessage3success', '#lblMessage3success'); })
        function SaveMenuGroups(s1, s2) {
            $("#divMessagesuccess").hide();
            $("#divMessage1success").hide();
            $("#divMessage2success").hide();
            $("#divMessage3success").hide();
            $("#divMessagedanger").hide();
            $("#divMessage1danger").hide();
            $("#divMessage2danger").hide();
            $("#divMessage3danger").hide();
            $("#divMessageAssignsuccess").hide();
            $("#divMessageAssigndanger").hide();

            // check that menu group name entered or not
            if ($("#txtselectmenu").val().trim() == '') {
                $('#lblMessage1danger').text("Enter menu group name.");
                $('#divMessage1danger').css("display", "block");
                return 0;
            }

            var mActive = $("#lblMenuActive input").prop("checked");
            if (mActive) {
                mActive = 1;
            }
            else {
                mActive = 0;
            }

            // set the menu group properties
            var ObjMenuGroup = {
                MenuGroupId: $('#selectmenugroups').val(),
                MenuGroupName: $("#txtselectmenu").val(),
                IsActive: mActive
            };

            // loop through all the menu items in right panel and append in array MenuItems
            var MenuItems = [];
            var Sequence = 1;
            $("#sortable .widget-box").each(function () {
                var sActive = $(this).find("label input").prop("checked")
                if (sActive) {
                    sActive = 1;
                }
                else {
                    sActive = 0;
                }

                MenuItems.push({
                    MenuName: $(this).find("h5").text(),
                    MenuItemId: $(this).find("input[type=hidden]:eq(1)").val(),
                    MenuLink: $(this).find("input[type=text]:eq(1)").val(),
                    MenuIconImage: 'ímg',
                    ParentMenuId: 0,
                    DisplayOrder: Sequence,
                    sMenuType: $(this).find('select').val(),
                    MenuGroupId: $('#selectmenugroups').val(),
                    MenuIconClass: $(this).find("input[type=text]:eq(2)").val(),
                    MenuLevel: $(this).find("input[type=hidden]:eq(0)").val(),
                    IsActive: sActive,
                    RoleIds: {}
                });
                Sequence++;
            });

            // ajax call to save the menus
            $.ajax({
                type: "POST",
                url: $('#hdnPath').val() + "/Admin/SaveMenus",
                data: JSON.stringify({ MenuGroup: ObjMenuGroup, MenuList: MenuItems }),
                datatype: "JSON",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.Success) {
                        $(s2).text("Menus group saved successfully.");
                        $(s1).css("display", "block");
                        $("#btnAddMenuGroup").text("Add Group");
                        $("#selectmenugroups").prop("disabled", false);
                        $("#btnDeleteMenuGroup").prop("disabled", false);
                        $("#btnAssignMenuGroup").prop("disabled", false);

                        // show the saved menu group in combo
                        $("#selectmenugroups option[value=0]").val(data.sDataArr.MenuGroupId);
                        $("#selectmenugroups option[value=" + data.sDataArr.MenuGroupId + "]").text($("#txtselectmenu").val());
                        sMenuGroupArr = data.sDataArr.MenuGroups;
                        SetLeftPanelMenus(data.sDataArr.LPanelMenus);
                    }
                    else {
                        $(s2).text("Menus not save. \n" + data.Message);
                        $(s1).css("display", "block");
                    }
                },
                error: function (data) {
                    $(s2).text("Menus not save. \n" + data);
                    $(s1).css("display", "block");
                }
            });
        }

        // function to set left panel menus for logged in user
        function SetLeftPanelMenus(lPanelMenus) {
            var sMenus = lPanelMenus;
            var sMenuText = '';
            var first = 0;
            $.each(sMenus, function (i) {
                if (sMenus[i].MenuLevel == 0) {
                    sMenuText += '<li>' +
                                        '<a href="' + $("#hdnPath").val() + '/' + sMenus[i].MenuLink + '">' +
                                            '<i class="' + sMenus[i].MenuIconClass + '"></i>' +
                                            '<span>' + sMenus[i].MenuName + '</span>' +
                                            '<input type="hidden" value="' + sMenus[i].MenuItemId + '" />' +
                                        '</a>' +
                                    '</li>';

                }
                else {
                    if (first == 0) {
                        $('.nav.nav-list').empty();
                        $('.nav.nav-list').append(sMenuText);
                    }
                    var parentli = $('.nav.nav-list').find('input[value="' + sMenus[i].ParentMenuId + '"]').parents('li').first();
                    if (parentli.find('b').length == 0) {
                        $('.nav.nav-list').find(parentli).find('a').attr('href', '#');
                        $('.nav.nav-list').find(parentli).find('a').addClass('dropdown-toggle');
                        $('.nav.nav-list').find(parentli).find('a').append('<b class="arrow icon-angle-down"></b>');
                        $('.nav.nav-list').find(parentli).append('<ul class="submenu"></ul>');
                    }
                    sMenuText = '<li>' +
                                        '<a href="' + $("#hdnPath").val() + '/' + sMenus[i].MenuLink + '">' +
                                            '<i class="icon-double-angle-right"></i>' +
                                            '<span>' + sMenus[i].MenuName + '</span>' +
                                            '<input type="hidden" value="' + sMenus[i].MenuItemId + '" />' +
                                        '</a>' +
                                    '</li>';
                    $('.nav.nav-list').find(parentli).find('ul').append(sMenuText);
                    first++;
                }
            });

            var sPageURL = window.location.pathname;
            if (sPageURL != '') {
                $('#uladminmenu li').each(function () {
                    var sUrl = $(this).find('a').attr('href');
                    var sText = $(this).find('a').text();
                    var chkUrl = sUrl.indexOf(sPageURL);
                    if (chkUrl > -1) {
                        var qChk = '';
                        qChk = sUrl.substr(sPageURL.length, 1);
                        if (qChk == '?' || qChk == '') {
                            var LiParent = $(this).parents('li');
                            $(LiParent).addClass('open active');
                            $(this).addClass('active');
                            $('#breadcrumbs ul li:eq(2)').show();
                            $('#breadcrumbs ul li:eq(1) span').show();
                            $('#breadcrumbs ul li:eq(2)').text(sText);
                        }
                    }
                })
            }
        }

        // function to hide/show the drop down panel for clicking the up/down arrow button of menu item widget
        $(document).on('click', 'div .icon-chevron-down', function (e) {
            $("#divMessagesuccess").hide();
            $("#divMessage1success").hide();
            $("#divMessage2success").hide();
            $("#divMessage3success").hide();
            $("#divMessagedanger").hide();
            $("#divMessage1danger").hide();
            $("#divMessage2danger").hide();
            $("#divMessage3danger").hide();
            $("#divMessageAssignsuccess").hide();
            $("#divMessageAssigndanger").hide();
            var ObjColl = $(this).parents(".widget-box.collapsed");
            if (ObjColl.length > 0) {
                ObjColl.removeClass("collapsed");
            }
            else {
                $(this).parents(".widget-box").addClass("collapsed");
            }
            stopPropogation(e);
        });

        // function to remove the menu item from the right panel
        $(document).on('click', '#sortable .widget-box button', function () {
            $("#divMessagesuccess").hide();
            $("#divMessage1success").hide();
            $("#divMessage2success").hide();
            $("#divMessage3success").hide();
            $("#divMessagedanger").hide();
            $("#divMessage1danger").hide();
            $("#divMessage2danger").hide();
            $("#divMessage3danger").hide();
            $("#divMessageAssignsuccess").hide();
            $("#divMessageAssigndanger").hide();
            $(this).parents(".widget-box").remove();
            var DivArr = $("#sortable .widget-box");

            // loop throught all the menu items of right panel and set their menu level
            var knt = 0;
            if (DivArr[0].className == 'widget-box collapsed ui-sortable-helper') knt = 1;
            DivArr[knt].children[0].value = 0;
            PrevLeft = 0;
            CurLeft = 0;
            for (var i = knt; i < DivArr.length; i++) {
                if (DivArr[i].className == 'widget-box collapsed ui-sortable-helper') continue;
                CurLeft = parseInt(DivArr[i].children[0].value);
                if (CurLeft - PrevLeft > 1) {
                    for (var j = i; j < DivArr.length; j++) {
                        if (DivArr[j].className == 'widget-box collapsed ui-sortable-helper') continue;
                        PrevLeft++;
                        if (DivArr[j].children[0].value > PrevLeft) {
                            DivArr[j].children[0].value = PrevLeft;
                        }
                    }
                    break;
                }
                PrevLeft = CurLeft;
            }

            // loop throught all the menu items of right panel and set their margin
            for (var i = 0; i < DivArr.length; i++) {
                if (DivArr[i].className == 'widget-box collapsed ui-sortable-helper') continue;
                CurLeft = parseInt(DivArr[i].children[0].value) * MaxMargin;
                if (DivArr[i].className == 'widget-box collapsed ui-sortable-placeholder') $('.ui-sortable-helper').css('margin-left', CurLeft + 'px');
                DivArr[i].style['margin-left'] = CurLeft + 'px';
            }
        });

        // set the checked/unchecked state of menu item panel isactive checkbox
        $(document).on('click', '#sortable .widget-box label', function (e) {
            $("#divMessagesuccess").hide();
            $("#divMessage1success").hide();
            $("#divMessage2success").hide();
            $("#divMessage3success").hide();
            $("#divMessagedanger").hide();
            $("#divMessage1danger").hide();
            $("#divMessage2danger").hide();
            $("#divMessage3danger").hide();
            $("#divMessageAssignsuccess").hide();
            $("#divMessageAssigndanger").hide();
            var sChk = $(this).find("input[type=checkbox]").attr('checked');
            if (sChk.length > 0) {
                $(this).find("input[type=checkbox]").removeAttr('checked');
            }
            else {
                $(this).find("input[type=checkbox]").attr('checked', 'checked');
            }
            return false;
        });

        // function to check valid menu item name entered
        $(document).on('focusout', '#sortable .widget-box input[type="text"]', function () {
            $("#divMessagesuccess").hide();
            $("#divMessage1success").hide();
            $("#divMessage2success").hide();
            $("#divMessage3success").hide();
            $("#divMessagedanger").hide();
            $("#divMessage1danger").hide();
            $("#divMessage2danger").hide();
            $("#divMessage3danger").hide();
            $("#divMessageAssignsuccess").hide();
            $("#divMessageAssigndanger").hide();
            if ($(this).index() == 1) {
                if ($(this).val().trim() == '') {
                    $('#lblMessage3danger').text("Enter menu name.");
                    $('#divMessage3danger').css("display", "block");
                    $(this).val($(this).parents('.widget-box').find('h5').text());
                }
                else {
                    $(this).parents('.widget-box').find('h5').text($(this).val());
                }
            }
        });

        // call the set controls function to set width, margins and orientation of menu items according to windows size
        $(window).resize(function () {
            SetControls();
        });

        // function to set width, margins and orientation of menu items according to windows size
        function SetControls() {
            ScrWidth = $(window).width();
            if (ScrWidth < 1000) {
                $('#createmenudiv').css('width', '100%');
                $('#showmenudiv').css('width', '100%');
                $('#showmenudiv').css('margin-left', '0px');
                var maxlevel = 0;
                $('#showmenudiv .widget-box input[type="hidden"]:eq(0)').each(function () {
                    var i = parseInt($(this).val());
                    if (maxlevel < i) {
                        maxlevel = i;
                    }
                });
                MaxMargin = 5;
                MaxWidth = ScrWidth - (maxlevel * MaxMargin) - 20;
                $('#showmenudiv .widget-box').each(function () {
                    var i = parseInt($(this).find('input[type="hidden"]:eq(0)').val());
                    $(this).css('margin-left', (i * MaxMargin) + 'px');
                });
                $('#showmenudiv .widget-box').css('width', MaxWidth + 'px');
            }
            if (ScrWidth > 1000) {
                $('#createmenudiv').css('width', '35%');
                $('#showmenudiv').css('width', '55%');
                $('#showmenudiv').css('margin-left', '20px');
                MaxMargin = 40;
                MaxWidth = 350;
                $('#showmenudiv .widget-box').each(function () {
                    var i = parseInt($(this).find('input[type="hidden"]:eq(0)').val());
                    $(this).css('margin-left', (i * MaxMargin) + 'px');
                });
                $('#showmenudiv .widget-box').css('width', MaxWidth + 'px');
            }
        }

        // stop the event propagation in case of bubbled events of child controls.
        function stopPropogation(e) {
            e = e || window.event;
            e.cancelBubble = true;
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
        }

    })

