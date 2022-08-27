$(function () {

    $('input[type="checkbox"]').css('position', 'relative');
    $('#divUsersModal').removeClass('span10');
    $('#imgSpin').hide();

    var sSortDir = 'Asc';
    var sSortCol = 'UserName';

    var sUserSortDir = 'Asc';
    var sUserSortCol = 'FirstName';

    var dtCurrent = new Date();
    var sMonth = dtCurrent.getMonth();
    var sYear = dtCurrent.getFullYear();
    var sFromDate = new Date(sYear, sMonth, 1);
    var sToDate = new Date(sYear, sMonth, dtCurrent.getDate());
    $('.date-picker').datepicker({ format: 'mm/dd/yyyy' });
    $('#dtpFrom').datepicker('setDate', sFromDate);
    $('#dtpTo').datepicker('setDate', sToDate);

    if ($('#hdnPath').val() == '/') $('#hdnPath').val('');

    GetUserActions();

    // show dialog box for searching users
    $('#btnOpenUsersModal').click(function () {
        $('#divUsersModal').addClass('span10');
        $("#divUsersModal").modal('show');
    });

    // scrollables
    $('.slim-scroll').each(function () {
        var $this = $(this);
        $this.slimScroll({
            height: $this.data('height') || 100,
            railVisible: true
        });
    });

    $('#tblUsers thead tr th a').click(function () {
        if (sUserSortDir == 'Asc') {
            sUserSortDir = 'Desc';
        }
        else {
            sUserSortDir = 'Asc';
        }
        sUserSortCol = $(this).attr('data-pdsa-val');
        GetUserList();
    })

    $('#tblUserActions thead tr th a').click(function () {
        if (sSortDir == 'Asc') {
            sSortDir = 'Desc';
        }
        else {
            sSortDir = 'Asc';
        }
        sSortCol = $(this).attr('data-pdsa-val');
        GetUserActions();
    })

    $('.modal').on('hidden', function () {
        $('#divUsersModal').removeClass('span10');
        $('#btnDateSearch').trigger('click');
    });

    $(document).on('click', '#tblUsers tbody tr td input[type="radio"]', function () {
        var sCell = $(this).parents('td');
        var sUserId = $(sCell).find('input[type="hidden"]').val();
        var sName = $(sCell).next('td').text() + ' ' + $(sCell).next('td').next('td').text();
        $('#hdnUserId').val(sUserId);
        $('#txtSelectedUserName').val(sName);
    })

    $('#btnDateSearch').click(function () {
        GetUserActions();
    })

    $('#btnSearch').click(function () {
        GetUserList();
    })

    function GetUserList() {
        var MerchantId = 0;
        if ($('#hdnUserRole').val() == 'SuperAdmin') {
            MerchantId = 0;
        }
        else {
            MerchantId = $('#hdnMerchantId').val();
        }
        $.ajax({
            type: "POST",
            url: $('#hdnPath').val() + "/Admin/GetUsersForReport",
            datatype: "JSON",
            data: JSON.stringify({
                MerchantId: MerchantId, lstUserGroupId: null, SearchText: $('#txtSearch').val(), SortCol: sUserSortCol, SortDir: sUserSortDir,
                PageLength: 0, PageNumber: 0
            }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.Success) {
                    var lstUsers = data.Users;
                    var sChecked = '';
                    $("#tblUsers tbody").empty();
                    var sHtmlUsers = '';
                    $(lstUsers).each(function (i) {
                        var sOrganisation = '';
                        $(lstUsers[i].MetaDataList).each(function (j) {
                            if (lstUsers[i].MetaDataList[j].Item2 == 'Organization') {
                                sOrganisation = lstUsers[i].MetaDataList[j].Item3;
                            }
                        })
                        if (i == 0) {
                            sChecked = 'checked = "checked"';
                            $('#hdnUserId').val(lstUsers[i].UserId);
                            $('#txtSelectedUserName').val(lstUsers[i].FirstName + ' ' + lstUsers[i].LastName);
                        } else {
                            sChecked = '';
                        }

                        sHtmlUsers += '<tr>' +
                                            '<td><label><input type="radio" style="opacity: 1; position: relative; margin-top: -3px;" name="rdoUserId" ' + sChecked +
                                            ' /><input type="hidden" value="' + lstUsers[i].UserId + '" /></td>' +
                                            '<td>' + lstUsers[i].FirstName + '</td>' +
                                            '<td class="hidden-phone">' + lstUsers[i].LastName + '</td>' +
                                            '<td class="hidden-phone">' + sOrganisation + '</td>' +
                                            '<td>' + lstUsers[i].MerchantName + '</td>' +
                                            '<td class="hidden-phone">' + lstUsers[i].RoleName + '</td>' +
                                            '<td class="hidden-phone">' + lstUsers[i].GroupName + '</td>' +
                                            '<td class="hidden-phone">' + lstUsers[i].DateAdded + '</td>' +
                                            '<td class="hidden-phone">' + lstUsers[i].LastActiveDate + '</td>' +
                                            '<td>' + (lstUsers[i].IsActive == true ? 'True' : 'False') + '</td>' +
                                      '</tr>';
                    });
                    $("#tblUsers tbody").append(sHtmlUsers);
                }
                else {
                    $('.alert p').text("Error occured. \n" + data.Message);
                    $('.alert').css("display", "block");
                }
            },
            error: function (data) {
                $('.alert p').text("Error occured. \n" + data);
                $('.alert').css("display", "block");
            }
        });
    }

    function GetUserActions() {

        $.ajax({
            type: "POST",
            url: $('#hdnPath').val() + "/Admin/GetUsersActions",
            datatype: "JSON",
            data: JSON.stringify({ lUserId: $('#hdnUserId').val(), dtpFrom: $('#dtpFrom').val(), dtpTo: $('#dtpTo').val(), sSortDir: sSortDir, sSortCol: sSortCol }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.Success) {
                    var lstUserActions = data.lstUserActions;
                    $("#tblUserActions tbody").empty();
                    var sHtmlUsers = '';
                    $(lstUserActions).each(function (i) {

                        sHtmlUsers += '<tr>' +
                                            '<td>' + lstUserActions[i].UserName + '</td>' +
                                            '<td>' + lstUserActions[i].ProductResourceName + '</td>' +
                                            '<td>' + lstUserActions[i].ActionName + '</td>' +
                                            '<td>' + lstUserActions[i].ActionDate + '</td>' +
                                      '</tr>';
                    });

                    $("#tblUserActions tbody").append(sHtmlUsers);
                }
                else {
                    $('.alert p').text("Error occured. \n" + data.Message);
                    $('.alert').css("display", "block");
                }
            },
            error: function (data) {
                $('.alert p').text("Error occured. \n" + data);
                $('.alert').css("display", "block");
            }
        });
    }

    $('#btnExport').click(function () {
        var sFormat = '';
        $('.alert p').text('');
        $('.alert').css("display", "none");
        if ($('#ddlExportFormat').val() == "1") {
            sFormat = 'Pdf';
        }
        if ($('#ddlExportFormat').val() == "2") {
            sFormat = 'Xls';
        }
        if (sFormat == '') {
            $('.alert p').text("Please select an export format. \n" + data.Message);
            $('.alert').css("display", "block");
            return false;
        }
        $.ajax({
            type: "POST",
            url: $('#hdnPath').val() + "/Admin/ActivityReport",
            datatype: "JSON",
            data: JSON.stringify({ lUserId: $('#hdnUserId').val(), dtpFrom: $('#dtpFrom').val(), dtpTo: $('#dtpTo').val(), sFormat: sFormat, sSortDir: sSortDir, sSortCol: sSortCol }),
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#imgSpin').show();
            },
            complete: function () {
                $('#imgSpin').hide();
            },
            success: function (data) {
                if (data.Success) {
                    window.open(data.sReportUrl, "_blank");
                    $('.alert p').text("Report generated successfully. \n" + data.Message);
                    $('.alert').css("display", "block");
                }
                else {
                    $('.alert p').text("Error occured. \n" + data.Message);
                    $('.alert').css("display", "block");
                }
            },
            error: function (data) {
                $('.alert p').text("Error occured. \n" + data);
                $('.alert').css("display", "block");
            }
        });
    })


    var WindowWidth = $(window).width();
    var width = WindowWidth - 50;
    $('#divUsersModal').css('width', width + 'px');
    if (WindowWidth > 768) {
        $('#divUsersModal').css('left', '-15px');
    }
    else {
        $('#divUsersModal').css('left', '25px');
    }

    $(window).resize(function () {
        WindowWidth = $(window).width();
        width = WindowWidth - 50;
        $('#divUsersModal').css('width', width + 'px');
        if (WindowWidth > 768) {
            $('#divUsersModal').css('left', '-15px');
        }
        else {
            $('#divUsersModal').css('left', '25px');
        }
    });

    $('#txtSearch').keydown(function (e) {
        if (e.keyCode == 13) {
            $('#btnSearch').trigger('click');
            e.preventDefault();
        }
    });

})
