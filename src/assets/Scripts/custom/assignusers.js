    $(function () {

        $('input[type="checkbox"]').css('position', 'relative');

        var sSortDir = 'Asc';
        var sSortCol = 'FirstName';

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

        // get the changed menu group in combo box and its related menu items and show them
        $("#ddlUserGroups").change(function () {
            $("#txtSearch").val('');
            GetUserList();
        });

        $('#btnSearch').click(function () {
            GetUserList();
        })

        $('#tblUsers thead tr th a').click(function () {
            var isCheckbox = $(this).find('input[type="checkbox"]');
            if (isCheckbox.length > 0) {
                return 0;
            }
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
                url: $('#hdnPath').val() + "/Admin/GetUserGroupUsers",
                datatype: "JSON",
                data: JSON.stringify({ lstUserGroupIds: $('#ddlUserGroups').val(), iRoleId: 1, sSearchText: $("#txtSearch").val(), sSortDir: sSortDir, sSortCol: sSortCol }),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.Success) {
                        var lstUsers = data.Users;
                        $("#tblUsers tbody").empty();
                        var sHtmlUsers = '';
                        $(lstUsers).each(function (i) {

                            sHtmlUsers += '<tr>' +
                                                '<td class="center" style="width:50px;">' + '<a>' +
                                                    '<input type="checkbox" style="position: relative;">' + '</a>' +
                                                    '<input type="hidden" value="' + lstUsers[i].UserId + '" />' +
                                                '</td>' +
                                                '<td>' + lstUsers[i].FirstName + '</td>' +
                                                '<td>' + lstUsers[i].EmailAddress + '</td>' +
                                                '<td>' + lstUsers[i].MerchantName + '</td>' +
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

        // read the values of various fields entered by user push into the json array and append in hidden field
        $('#btnSave').click(function () {

            var JsonData = new Array;
            var UserIds = new Array;
            var Error = '';
            iChkPanel = 0;
            $("#tblUsers tbody tr").each(function () {

                var tdFirst = $(this).find('td:eq(0)');
                var chkCheckbox = $(tdFirst).find('input[type="checkbox"]').prop('checked');
                if (chkCheckbox) {
                    UserIds.push($(tdFirst).find('input[type="hidden"]').val());
                }

            })

            if ($("#ddlUserGroups").val() == $("#ddlAssignGroups").val()) {
                Error = "Cannot assign to same user group." + " - ";
            }
            if (UserIds == '') {
                Error += "No users selected for assigning." + " - ";
            }
            JsonData.push({ JsonData: { UserIds: UserIds, UserGroupId: $("#ddlAssignGroups").val(), Error: Error } });
            $('#hdnExtraValues').val(JSON.stringify(JsonData));
        })

    })
