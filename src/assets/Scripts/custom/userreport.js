$(function () {

    $('input[type="checkbox"]').css('position', 'relative');
    $('#imgSpin').hide();

    var sSortDir = 'Asc';
    var sSortCol = 'FirstName';

    $('#ddlUserGroups option:eq(0)').prop('selected', true);

    if ($('#hdnPath').val() == '/') $('#hdnPath').val('');

    GetUserList();

    // scrollables
    $('.slim-scroll').each(function () {
        var $this = $(this);
        $this.slimScroll({
            height: $this.data('height') || 100,
            railVisible: true
        });
    });

    $('#btnSearch').click(function () {
        GetUserList();
    })

    $('#tblUsers thead tr th a').click(function () {
        if (sSortDir == 'Asc') {
            sSortDir = 'Desc';
        }
        else {
            sSortDir = 'Asc';
        }
        sSortCol = $(this).attr('data-pdsa-val');
        GetUserList();
    })

    function GetUserList() {

        $.ajax({
            type: "POST",
            url: $('#hdnPath').val() + "/Admin/GetUsersForReport",
            datatype: "JSON",
            data: JSON.stringify({
                MerchantId: $('#ddlMerchants').val(), lstUserGroupId: $('#ddlUserGroups').val(), SearchText: $('#txtSearch').val(),
                SortCol: sSortCol, SortDir: sSortDir, PageLength: 0, PageNumber: 0
            }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.Success) {
                    var lstUsers = data.Users;
                    $("#tblUsers tbody").empty();
                    var sHtmlUsers = '';
                    $(lstUsers).each(function (i) {
                        var sOrganisation = '';
                        $(lstUsers[i].MetaDataList).each(function(j){
                            if (lstUsers[i].MetaDataList[j].Item2 == 'Organization') {
                                sOrganisation = lstUsers[i].MetaDataList[j].Item3;
                            }
                        })
                        sHtmlUsers += '<tr>' +
                                            '<td>' + lstUsers[i].FirstName + '</td>' +
                                            '<td class="hidden-phone">' + lstUsers[i].LastName + '</td>' +
                                            '<td class="hidden-phone">' + sOrganisation + '</td>' +
                                            '<td>' + lstUsers[i].MerchantName + '</td>' +
                                            '<td class="hidden-phone">' + lstUsers[i].RoleName + '</td>' +
                                            '<td class="hidden-phone">' + lstUsers[i].GroupName + '</td>' +
                                            '<td class="hidden-phone">' + lstUsers[i].DateAdded + '</td>' +
                                            '<td class="hidden-phone">' + lstUsers[i].LastActiveDate + '</td>' +
                                            '<td>' + (lstUsers[i].IsActive == true ? 'True' : 'False') + '</td>' +
                                            '<td class="td-actions ">' +
                                                   '<a class="btn btn-mini btn-success"  href="/AdamDemoSite/Admin/CustomerReport?lUserId=' + lstUsers[i].UserId + '">' +
                                                       '<i class="icon-ok bigger-120"></i>' +
                                                   '</a>' +
                                            '</td>' +
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
            url:  $('#hdnPath').val() + "/Admin/UserReport",
            datatype: "JSON",
            data: JSON.stringify({ lstUserGroupIds: $('#ddlUserGroups').val(), sSearchText: $('#txtSearch').val(), sFormat: sFormat, sSortDir: sSortDir, sSortCol: sSortCol }),
            contentType: "application/json; charset=utf-8",
            beforeSend: function() {
                $('#imgSpin').show();
            },
            complete: function(){
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


    

})
