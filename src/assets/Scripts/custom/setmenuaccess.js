$(function () {

    // showing table border
    $("#table-menu-role").css("border-collapse", "collapse");

    if ($('#hdnPath').val() == '/') $('#hdnPath').val('');

    // get the changed menu group in combo box and its related menu items and show them
    $("#selectmenugroups").change(function () {
        // empty the message boxes
        $('.alert').css("display", "none");

        // change the selected menu group and remove the selected property from previous menu group
        $(this).find("option[selected=selected]").removeAttr("selected");
        $("#selectmenugroups option[value=" + $(this).val() + "]").attr("selected", "selected");

        // empty and fill up the grid with the selected menu group's menu items
        var MnuItems = '';
        var sRoles = '';
        $.ajax({
            type: "GET",
            url: $("#hdnPath").val() + "/Admin/MenuGroupChanged?MenuGroupId=" + $('#selectmenugroups').val(),
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.Success) {
                    var sMenuItems = data.sGroupMenuMenuItems;
                    $.each(sMenuItems, function (index) {

                        // get roles for this menu item
                        var MenuRoles = sMenuItems[index].RoleIds;

                        //iterate through table headers for getting the role ids and forming the td html string
                        $('#table-menu-role thead th').each(function () {
                            var sThItem = $(this);
                            if (sThItem.index() == 0) {
                                sRoles = '<td style="width:40%"><label style="margin-left:' + (parseInt(sMenuItems[index].MenuLevel) * 10) + 'px' +
                                            '">' + sMenuItems[index].MenuName + '</label>' +
                                            '<input type="hidden" value="' + sMenuItems[index].MenuItemId + '" />' +
                                            '<input type="hidden" value="' + sMenuItems[index].MenuLevel + '" />' +
                                         '</td>';
                            }
                            else {
                                var cnt = 0;
                                $.each(MenuRoles, function (idx) {
                                    if (parseInt(sThItem.find('input[type="hidden"]').val()) == MenuRoles[idx]) cnt = 1;
                                })
                                if (cnt == 1) {
                                    sRoles += '<td>' +
                                                    '<label class="center">' +
                                                        '<input type="checkbox" checked="checked" />' +
                                                        '<span class="lbl"></span>' +
                                                    '</label>' +
                                                '</td>';
                                }
                                else {
                                    sRoles += '<td>' +
                                                    '<label class="center">' +
                                                        '<input type="checkbox" />' +
                                                        '<span class="lbl"></span>' +
                                                    '</label>' +
                                                '</td>';
                                }
                            }
                        })
                        MnuItems += '<tr>' + sRoles + '</tr>';

                    })

                    // append the html for menu items
                    $("#table-menu-role tbody").empty();
                    $("#table-menu-role tbody").append(MnuItems);
                }
                else {
                    $('#lblMessage').text("Error occured. \n" + data.Message);
                    $('#divMessage').css("display", "block");
                }
            },
            error: function (data) {
                $('#lblMessage').text("Error occured. \n" + data);
                $('#divMessage').css("display", "block");
            }
        });

    });

    // call the menu group change on for load event
    $("#selectmenugroups").change();

    // function for saving the menu access roles 
    $("#btnSaveMenuAccess1").click(function () { SaveMenuRights('#divMessage1', '#lblMessage1'); })
    $("#btnSaveMenuAccess2").click(function () { SaveMenuRights('#divMessage2', '#lblMessage2'); })
    function SaveMenuRights(s1, s2) {
        $('.alert').css("display", "none");

        // loop through all the grid cells and append access rules in array MenuItems
        var MenuItems = [];
        $("#table-menu-role tbody tr").each(function () {
            var RoleIdArr = [];
            var MenuId = '';
            var i = 0;
            $(this).find('td').each(function () {
                if (i == 0) {
                    MenuId = $(this).find('input[type="hidden"]').val();
                }
                else {
                    if ($(this).find('input[type="checkbox"]').prop('checked') == true) {
                        RoleIdArr.push($('#table-menu-role th:eq(' + i + ') input[type="hidden"]').val());
                    }
                }
                i++;
            })
            MenuItems.push({
                MenuItemId: MenuId,
                RoleIds: RoleIdArr
            });
        });

        // ajax call to save the menus
        $.ajax({
            type: "POST",
            url: $("#hdnPath").val() + "/Admin/SaveMenuAccess",
            data: JSON.stringify({ MenuList: MenuItems }),
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.Success) {
                    $(s2).text("Menus access rights saved successfully.");
                    $(s1).css("display", "block");
                    SetLeftPanelMenus(data.sDataArr.LPanelMenus);
                }
                else {
                    $(s2).text("Menus access rights save unsuccessfull. \n" + data.Message);
                    $(s1).css("display", "block");
                }
            },
            error: function (data) {
                $(s2).text("Menus access rights save unsuccessfull. \n" + data);
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

    // function to check valid roles are assigned to menus
    $(document).on('change', '#table-menu-role tbody td input[type=checkbox]', function () {
        var TdIdx = $(this).parents('td').index();
        var Idx = $(this).parents('tr').index();
        var sRows = $('#table-menu-role tbody tr');
        var MenuLevel = 0;
        var PrevMenuLevel = 0;
        if ($(this).prop('checked')) {
            for (var i = Idx; i > -1; i--) {
                MenuLevel = $(sRows[i]).find('td:eq(0) input[type=hidden]:eq(1)').val();
                if (MenuLevel < PrevMenuLevel) {
                    $(sRows[i]).find('td:eq(' + TdIdx + ') input[type=checkbox]').prop('checked', true);
                }
                if (MenuLevel == 0) break;
                PrevMenuLevel = MenuLevel;
            }
        }
        else {
            MenuLevel = $(this).parents('tr').find('td:eq(0) input[type=hidden]:eq(1)').val();
            var Curlevel = 0;
            for (var i = Idx + 1; i < sRows.length; i++) {
                Curlevel = $(sRows[i]).find('td:eq(0) input[type=hidden]:eq(1)').val();
                if (MenuLevel < Curlevel) {
                    $(sRows[i]).find('td:eq(' + TdIdx + ') input[type=checkbox]').prop('checked', false);
                }
                else {
                    break;
                }
            }
        }
    })

    $('table tbody tr').each(function (i) {
        $(this).find('td').css('text-align', 'center');
        //$(this).find('td:eq(0)').css('text-align', 'left');
    })
    
});