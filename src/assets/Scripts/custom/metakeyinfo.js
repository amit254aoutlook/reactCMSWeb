
var SortDir = $('#hdnSortOrder').val();
var SortCol = $('#hdnSortColumn').val();
var PageNumber = $('#hdnPageNumber').val();
var PageLength = $('#hdnPageLength').val();

function GetMetaKeys() {

    $.ajax({
        type: "POST",
        url: $('#hdnPath').val() + "/Admin/GetMetaKeys",
        datatype: "JSON",
        data: JSON.stringify({
            SearchText: $('#hdnSearchText').val(), SortCol: SortCol, SortDir: SortDir, PageLength: PageLength, PageNumber: PageNumber
        }),
        contentType: "application/json; charset=utf-8",
        async: false,
        beforeSend: function () {
            $("#tblMetaKeys tbody").empty();
            $("#tblMetaKeys tbody").css('text-align', 'center');
            $("#tblMetaKeys tbody").append('<img src="' + $('#hdnPath').val() + '/Content/images/Common-logos/AjaxLoader.GIF" height="50px" width="50px" ' +
                ' style="display: inline-block; vertical-align: middle; text-align: center;" /><br /><span>Loading...</span>');
        },
        success: function (data) {
            if (data.Success) {
                var lstMetaKeys = data.MetaKeys ;
                var sHtmlText = '';
                $(lstMetaKeys).each(function (i) {
                    sHtmlText += '<tr>' +
                                              '<td style="width: 60px;">' + lstMetaKeys[i].KeyName + '</td>' +
                                              '<td>' + lstMetaKeys[i].KeyDisplay + '</td>' +
                                              '<td>' + lstMetaKeys[i].TemplateName + '</td>' +
                                              '<td>' + lstMetaKeys[i].MetaGroupName + '</td>' +
                                               '<td>' + (lstMetaKeys[i].IsActive == true ? 'True' : 'False') + '</td>' +
                                              '<td style="width:60px;" class="td-actions">' +
                                                  '<a style="text-decoration:none;" class="btn btn-mini btn-primary" data-pdsa-val="' + lstMetaKeys[i].MetaId + '" data-pdsa-action="edit" href="#" title="Edit" data-toggle="tooltip" data-placement="top">' +
                                                      '<i class="icon-pencil"></i>' +
                                                  '</a>&nbsp;' +
                                                  '<a style="text-decoration: none;" class="btn btn-mini btn-danger" data-pdsa-val="' + lstMetaKeys[i].MetaId + '" href="#" title="Delete" data-toggle="tooltip" data-placement="top">' +
                                                      '<i class="icon-trash"></i>' +
                                                  '</a>' +
                                              '</td>' +
                                           '</tr>';
                })
                $("#tblMetaKeys tbody").empty();
                $("#tblMetaKeys tbody").css('text-align', 'left');
                $("#tblMetaKeys tbody").append(sHtmlText);
                $('#hdnRecordCount').val(data.RecordCount);
            }
            else {
                $('#divAlert1 span:eq(2) li').text("Error occured. \n");
                $('#divAlert1 span:eq(2) li').show();
                $('#divAlert1').show();
            }
        },
        error: function (data) {
            $('#divAlert1 span:eq(2) li').text("Error occured. \n");
            $('#divAlert1 span:eq(2) li').show();
            $('#divAlert1').show();
        }
    });

}

function GetTableRecords() {
    GetMetaKeys();
}

$(function () {

    if ($('#hdnPath').val() == '/') $('#hdnPath').val('');
    
    var MetaGrpList = ''
    var GrpId = 0;
    var MetaId = 0;

    var lookupgrpId = 0;
    var lookupvalid = 0;

    if ($('#hdnPath').val() == '/') $('#hdnPath').val('');

    $('#divAlert1').hide();
    if ($($('#hdnError').val()).find('ul li:eq(0)').text() != '') {
        var AlertHtml = '<div class="alert alert-danger alert-dismissable" role="alert">' +
                                            '<button type="button" class="close" data-dismiss="alert">' +
                                                '<span aria-hidden="true">&times;</span>' +
                                                '<span class="sr-only">Close</span>' +
                                            '</button>' +
                                            '<span>' + $('#hdnError').val() + '</span>' +
                                        '</div>';
        $('#divAlert1').empty();
        $('#divAlert1').append(AlertHtml);
        $('#divAlert1').show();
    }
    if ($('#hdnStatus').val() != '') {
        var AlertHtml = '<div class="alert alert-success alert-dismissable" role="alert">' +
                                            '<button type="button" class="close" data-dismiss="alert">' +
                                                '<span aria-hidden="true">&times;</span>' +
                                                '<span class="sr-only">Close</span>' +
                                            '</button>' +
                                            '<span>' + $('#hdnStatus').val() + '</span>' +
                                        '</div>';
        $('#divAlert1').empty();
        $('#divAlert1').append(AlertHtml);
        $('#divAlert1').show();
    }

    $("#btnMetaGroup").click(function () {
        $("#MetaGroup").css("style", "block");
        $("#Template").css("style", "none");
        $("#LookupGroup").css("style", "none");
        $("#LookupValues").css("style", "none");
        $('#lblMetaerror').text("");
        $('#lblMetasucess').text("");
        $('#lblMetaupdate').text("");
        $("#txtgroupname").val("")
        $("#txtdisplayorder").val('');
        $('#btnaddgroup').text("Save Group");
        $('#btnDelOptionOk').text("ok");
        $('#btnmetagcancel').text("Cancel");
        $("#lblmetaactive input").prop("checked", '')
        $("#table-Metagrp tbody").empty();
        //$("#table-Metakey tbody").empty();
        var Metagrps = '';
        $.ajax({
            type: "GET",
            url: $('#hdnPath').val() + "/Admin/GetMetaGroups",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                MetaGrpList = data.MetaGroup;

                $.each(MetaGrpList, function (index) {

                    Metagrps +=
                        '<tr>' +
                            '<td class="td-actions">' +
                                '<div class="btn-group">' +
                                    '<button class="btn btn-mini btn-success">' +
                                        '<i class="icon icon-edit"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +

                            '<td style="display:none;">' + MetaGrpList[index].MetaGroupId + '</td>' +
                            '<td>' + MetaGrpList[index].MetaGroupName + '</td>' +
                            '<td>' + MetaGrpList[index].DisplayOrder + '</td>' +
                            '<td class="td-actions">' +
                                '<div class="btn-group">' +
                                    '<button href="#" class="btn-sm btn-color-primary" data-pdsa-val="@item.MetaGroupId" id="metagroupTrash" style="color: red; text-decoration: none;">' +
                                        '<i class="icon-trash"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +
                        '</tr>'
                });

                $("#table-Metagrp tbody").append(Metagrps);
                $("#sMenuModal").modal('show');
                $('#btnmetagcancel').hide();
            },
            error: function (data) {
                $('#lblMetaerror').text("Error occured. Error: \n" + data);
            }
        });
        $("#MetaGroup").modal('show');

    });

    $("#btnaddgroup").click(function () {
        $('#lblMetaerror').text("");
        $('#lblMetasucess').text("");
        $('#lblMetaupdate').text("");
        var MetaGrpName = $("#txtgroupname").val();
        var MetaDispOrder = $("#txtdisplayorder").val();
        var MetaActive = $("#lblmetaactive input").prop("checked");

        if (MetaGrpName == "") {
            $('#lblMetaerror').text("Please enter meta group name");
            return;
        }
        if (MetaDispOrder == "") {
            $('#lblMetaerror').text("Please enter meta Display Order");
            return;
        }
        if (MetaActive) {
            MetaActive = 1;
        }
        else {

            MetaActive = 0;
        }

        if ($('#btnaddgroup').text() == 'Update') {

            $.ajax({
                type: "POST",
                url: $('#hdnPath').val() + "/Admin/UpdateMetaGroups",

                data: JSON.stringify({ MetaGroupName: MetaGrpName, MetaDisplayOrder: MetaDispOrder, IsActive: MetaActive, MetaGroupId: metaGrpId }),
                datatype: "JSON",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data == '1') {
                        $('#lblMetaupdate').text("Meta group update successfully.");

                    }
                    else {
                        $('#lblMetaerror').text("No Exist.");
                    }

                    GetMetaGroups();
                    $('#txtgroupname').val('');
                    $('#txtdisplayorder').val('');
                    $("#lblmetaactive input").prop("checked", false)
                    $('#btnaddgroup').text("Save Group");
                    $('#btnmetagcancel').hide();
                },
                error: function (data) {
                    $('#lblMetaerror').text("Try Again later. Error: \n" + data);
                }
            });
        }
        else if ($('#btnaddgroup').text("Save Group"))
        {
            $.ajax({
                type: "POST",
                url: $('#hdnPath').val() + "/Admin/SaveMetaGroup",

                data: JSON.stringify({ MetaGroupName: MetaGrpName, MetaDisplayOrder: MetaDispOrder, IsActive: MetaActive }),
                datatype: "JSON",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    

                    if (data == '1') {
                        $('#lblMetasucess').text("Meta group save successfully.");

                    }
                    else {
                        $('#lblMetaerror').text("Already Exist.");
                    }

                    GetMetaGroups();
                    $('#txtgroupname').val('');
                    $('#txtdisplayorder').val('');
                    $("#lblmetaactive input").prop("checked", false)
                    $('#btnaddgroup').text("Save Group");
                    $('#btnmetagcancel').hide();
                },
                error: function (data) {
                    $('#lblMetaerror').text("Try Again later. Error: \n" + data);
                }
            });
        }
    });

    $("#btnmetagcancel").click(function () {
        $('#lblMetaerror').text("");
        $('#lblMetasucess').text("");
        $('#lblMetaupdate').text("");
        $('#txtgroupname').val('');
        $('#txtdisplayorder').val('');
        $("#lblmetaactive input").prop("checked", false)
        $('#btnaddgroup').text("Save Group");
        $('#btnmetagcancel').hide();
        GetMetaGroups();
        return false;
    });

    $(document).on('click', '#tblMetaKeys tbody .btn-mini', function () {
        var ChkClass = $(this).find('.icon-pencil');
        if (ChkClass.length > 0) {
            $('#EventCommand').val('edit');
            $('#EventArgument').val($(this).attr('data-pdsa-val'));
            document.forms[0].submit();
        }
        ChkClass = $(this).find('.icon-trash');
        if (ChkClass.length > 0) {
            $('#btnDelmetaOk').attr('data-pdsa-val', $(this).attr('data-pdsa-val'));
            $("#dlgDelmeta").modal('show');
        }
    })

    //$(".icon-trash").click(function () {
    //    var msg = "";

    //    MetaID = $(this).parents('tr').find('td:eq(5)').text().trim();
    //    if (MetaID != null) {
    //        $('#btnDelmetaOk').attr('data-pdsa-val', MetaID);
    //        $("#dlgDelmeta").modal('show');
    //        return false;
    //    }
        

    //    return false;
    //});
    
    $(document).on('click', '#table-Metagrp tbody .btn', function () {

        $('#lblMetaerror').text("");
        $('#lblMetasucess').text("");
        $('#lblMetaupdate').text("");
        $("#lblmetaactive input").prop("checked", true);
        $("#txtdisplayorder").val($(this).parents('tr').find('td:eq(3)').text().trim());
        $("#txtgroupname").val($(this).parents('tr').find('td:eq(2)').text().trim());
        metaGrpId = $(this).parents('tr').find('td:eq(1)').text().trim();
        $(this).parents('tr').parents('tr').remove();
        $($($(this).parents('tr')).parents('table')).find('td').css('background-color', '');
        $(this).parents('tr').find('td').css('background-color', 'LightBlue');
        $('#btnaddgroup').text("Update");
        $('#btnmetagcancel').show();
        return false;

    });

    $(document).on('click', '#table-Metagrp tbody .btn-sm', function () {
        GrpId = $(this).parents('tr').find('td:eq(1)').text().trim();
        $('#lblMetaerror').text("");
        var Message = ('Are you want to delete Meta Group');
        if (GrpId != null) {
            if (confirm(Message) == true) {
                if (confirm('Are You Sure ?') == true) {
                    $.ajax({
                        type: "POST",
                        url: $('#hdnUrl').val() + "/Admin/DeleteMetaGroup",
                        data: JSON.stringify({ MetaGroupId: GrpId }),
                        datatype: "JSON",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data == '1') {
                                $('#lblMetaerror').text("Meta Group Delete Successfully.");

                            }
                            else {
                                $('#lblMetaerror').text("Meta Group Can Not be Deleted ,Referential constraint violation: cannot delete the Parent Key value .");
                            }
                            GetMetaGroups();
                            $('#txtgroupname').val('');
                            $('#txtdisplayorder').val('');
                            $("#lblmetaactive input").prop("checked", false)
                            $('#btnaddgroup').text("Save Group");
                            $('#btnmetagcancel').hide();

                        },
                        error: function (data) {

                            $('#lblMetaerror').text("Try Again later. Error: \n" + data);
                        }
                    });
                    return false;
                }

                else {
                    return false;
                }
            }
            else {
                return false;
            }

        }
        else {

            return false;
        }

    });

    $(document).on('click', '#table-Metagrp tbody .btn-sm', function () {
        GrpId = $(this).parents('tr').find('td:eq(1)').text().trim();
        $('#lblMetaerror').text("");
        $('#lblMetasucess').text("");
        $('#lblMetaupdate').text("");
        var Message = ('Are you want to delete Meta Group');
        if (GrpId != null) {
            if (confirm(Message) == true) {
                if (confirm('Are You Sure ?') == true) {
                    $.ajax({
                        type: "POST",
                        url: $('#hdnPath').val() + "/Admin/DeleteMetaGroup",
                        data: JSON.stringify({ MetaGroupId: GrpId }),
                        datatype: "JSON",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data == '1') {
                                $('#lblMetasucess').text("Meta group delete successfully.");

                            }
                            else {
                                $('#lblMetaerror').text("Meta group can not be Deleted, else its exist with meta key.");
                            }
                            GetMetaGroups();
                            $('#txtgroupname').val('');
                            $('#txtdisplayorder').val('');
                            $("#lblmetaactive input").prop("checked", false)
                            $('#btnaddgroup').text("Save Group");
                            $('#btnmetagcancel').hide();

                        },
                        error: function (data) {

                            $('#lblMetaerror').text("Try Again later. Error: \n" + data);
                        }
                    });
                    return false;
                }

                else {
                    return false;
                }
            }
            else {
                return false;
            }

        }
        else {

            return false;
        }

    });
    
    function GetMetaGroups() {
        var Metagrps = '';
        $.ajax({
            type: "GET",
            url: $('#hdnPath').val() + "/Admin/GetMetaGroups",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                MetaGrpList = data.MetaGroup;

                $.each(MetaGrpList, function (index) {

                    Metagrps +=
                        '<tr>' +
                            '<td class="td-actions">' +
                                '<div class="btn-group">' +
                                    '<button class="btn btn-mini btn-success">' +
                                        '<i class="icon icon-edit"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +

                            '<td style="display:none;">' + MetaGrpList[index].MetaGroupId + '</td>' +
                            '<td>' + MetaGrpList[index].MetaGroupName + '</td>' +
                            '<td>' + MetaGrpList[index].DisplayOrder + '</td>' +
                            '<td class="td-actions">' +
                                '<div class="btn-group">' +
                                    '<button href="#"  class="btn-sm btn-color-primary" data-pdsa-val="@item.MetaGroupId" style="color: red; text-decoration: none;" >' +
                                        '<i class="icon-trash"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +

                        '</tr>'
                });

                $("#table-Metagrp tbody").html(Metagrps);
            },
            error: function (data) {
                $('#lblMetaerror').text("Error occured. Error: \n" + data);
            }
        });
    }

    var tempId = 0;
    var TemplateList = ''
    var TemplateTypeList = ''

    $("#btnTemplate").click(function () {
        $("#MetaGroup").css("style", "none");
        $("#Template").css("style", "block");
        $("#LookupGroup").css("style", "none");
        $("#LookupValues").css("style", "none");
        $('#lbltemplateerror').text("");
        $('#lbltemplatesucess').text("");
        $("#txttemplatename").val("")
        $('#btnaddtemplate').text("Save Template")
        $('#btntempcancel').text("Cancel");
        $("#lbltemplateactive input").prop("checked", '')
        $("#table-template tbody").empty();
        var Templates = '';
        var selectvalues = '';
        $.ajax({
            type: "GET",
            url: $('#hdnPath').val() + "/Admin/GetTemplates",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                TemplateList = data.Template;
                TemplateTypeList = data.TemplateType;

                $.each(TemplateTypeList, function (index) {
                    if (index == 0) {

                        selectvalues += '<option value=' + TemplateTypeList[index].Value + ' selected="selected">' + TemplateTypeList[index].Text + '</option>';
                    }
                    else {
                        selectvalues += '<option value=' + TemplateTypeList[index].Value + '>' + TemplateTypeList[index].Text + '</option>';
                    }
                });
                $("#selecTemplatetype").empty();
                $("#selecTemplatetype").append(selectvalues);

                $.each(TemplateList, function (index) {

                    Templates +=
                        '<tr>' +
                            '<td class="td-actions">' +
                                '<div class="btn-group">' +
                                    '<button class="btn btn-mini btn-success">' +
                                        '<i class="icon icon-edit"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +

                            '<td style="display:none;">' + TemplateList[index].TemplateId + '</td>' +
                            '<td>' + TemplateList[index].TemplateName + '</td>' +
                             '<td>' + TemplateList[index].TemplateTypeName + '</td>' +
                              '<td style="display:none;">' + TemplateList[index].TemplateType + '</td>' +
                              '<td class="td-actions">' +
                                '<div class="btn-group">' +
                                    '<button href="#"  class="btn-sm btn-color-primary" data-pdsa-val="@item.TemplateId" style="color: red; text-decoration: none;">' +
                                        '<i class="icon-trash"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +
                       '</tr>'
                });

                $("#table-template tbody").append(Templates);
                $("#sMenuModal").modal('show');
                $('#btntempcancel').hide();
            },
            error: function (data) {
                $('#lbltemplateerror').text("Error occured. Error: \n" + data);
            }
        });
        $("#Template").modal('show');
    });

    $("#btnaddtemplate").click(function () {
        $('#lbltemplateerror').text("");
        $('#lbltemplatesucess').text("");
        var templateName = $("#txttemplatename").val();
        var TemplateActive = $("#lbltemplateactive input").prop("checked")

        if (templateName == "") {
            $('#lbltemplateerror').text("Please enter Template Name");
            return;
        }
        var templatetype = $("#selecTemplatetype").val();

        if (TemplateActive) {
            TemplateActive = 1;
        }
        else {
            TemplateActive = 0;
        }
        if ($('#btnaddtemplate').text() == 'Update') {
            $.ajax({
                type: "POST",
                url: $('#hdnPath').val() + "/Admin/UpdateTemplates",

                data: JSON.stringify({ TemplateName: templateName, TemplateTypeid: templatetype, IsActive: TemplateActive, TemplateId: tempId }),
                datatype: "JSON",
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                    if (data == '1') {
                        $('#lbltemplatesucess').text("Template Update Successfully.");

                    }
                    else {
                        $('#lbltemplateerror').text("Already Exist.");
                    }

                    GetTemplates();
                    $('#txttemplatename').val('');
                    $("#lbltemplateactive input").prop("checked", false)
                    $('#btnaddtemplate').text("Save Template");
                    $('#btntempcancel').hide();
                },
                error: function (data) {
                    $('#lbltemplateerror').text("Try Again later. Error: \n" + data);
                }
            });
        }
        else {
            $('#btnaddtemplate').text("Save Template")
            $('#lbltemplateerror').text("");
            $('#lbltemplatesucess').text("");
            $.ajax({
                type: "POST",
                url: $('#hdnPath').val() + "/Admin/SaveTemplates",

                data: JSON.stringify({ TemplateName: templateName, TemplateTypeid: templatetype, IsActive: TemplateActive }),
                datatype: "JSON",
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                    if (data == '1') {
                        $('#lbltemplatesucess').text("Template Save Successfully.");

                    }
                    else {
                        $('#lbltemplateerror').text("Already Exist.");
                    }

                    GetTemplates();
                    $('#txttemplatename').val('');
                    $("#lbltemplateactive input").prop("checked", false)
                    $('#btnaddtemplate').text("Save Template");
                    $('#btntempcancel').hide();

                },
                error: function (data) {
                    $('#lbltemplateerror').text("Try Again later. Error: \n" + data);
                }
            });
        }
    });

    $("#btntempcancel").click(function () {
        $('#lbltemplateerror').text("");
        $('#lbltemplatesucess').text("");
        $('#txttemplatename').val('');
        $("#lbltemplateactive input").prop("checked", false)
        $('#btnaddtemplate').text("Save Template");
        $('#btntempcancel').hide();
        GetTemplates();
        return false;
    });

    $(document).on('click', '#table-template tbody .btn', function () {

        $('#lbltemplateerror').text("");
        $('#lbltemplatesucess').text("");
        $("#txttemplatename").val($(this).parents('tr').find('td:eq(2)').text().trim());
        $("#selecTemplatetype").val($(this).parents('tr').find('td:eq(4)').text().trim());
        tempId = $(this).parents('tr').find('td:eq(1)').text().trim();

        $(this).parents("tr").parents("tr").remove();
        $(this).parents('tr').find('td').css('background-color', 'LightBlue');
        $('#btnaddtemplate').text("Update")
        $("#lbltemplateactive input").prop("checked", true);
        $('#btntempcancel').show();
        return false;
    });

    $(document).on('click', '#table-template tbody .btn-sm', function () {
        tempId = $(this).parents('tr').find('td:eq(1)').text().trim();
        $('#lbltemplateerror').text("");
        $('#lbltemplatesucess').text("");
        var Message = ('Are you want to delete Template');
        if (tempId != null) {
            if (confirm(Message) == true) {
                if (confirm('Are You Sure ?') == true) {
                    $.ajax({
                        type: "POST",
                        url: $('#hdnPath').val() + "/Admin/DeleteTemplate",
                        data: JSON.stringify({ TemplateId: tempId }),
                        datatype: "JSON",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data == '1') {
                                $('#lbltemplatesucess').text("Template Delete Successfully.");

                            }
                            else {
                                $('#lbltemplateerror').text("Template can not be Deleted ,else its exist with merchant , Post , Product and metakey.");
                            }
                            GetTemplates();
                        },
                        error: function (data) {
                            $('#lbltemplateerror').text("Try Again later. Error: \n" + data);
                        }
                    });
                    return false;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }

        }
        else {

            return false;
        }

    });

    function GetTemplates() {
        var Templates = '';
        $.ajax({
            type: "GET",
            url: $('#hdnPath').val() + "/Admin/GetTemplates",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                TemplateList = data.Template;

                $.each(TemplateList, function (index) {

                    Templates +=
                        '<tr>' +
                            '<td class="td-actions">' +
                                '<div class="btn-group">' +
                                    '<button class="btn btn-mini btn-success">' +
                                        '<i class="icon icon-edit"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +

                            '<td style="display:none;">' + TemplateList[index].TemplateId + '</td>' +
                            '<td>' + TemplateList[index].TemplateName + '</td>' +
                             '<td>' + TemplateList[index].TemplateTypeName + '</td>' +
                              '<td style="display:none;">' + TemplateList[index].TemplateType + '</td>' +
                              '<td class="td-actions">' +
                                '<div class="btn-group">' +
                                    '<button href="#" class="btn-sm btn-color-primary" data-pdsa-val="@item.TemplateId" style="color: red; text-decoration: none;">' +
                                        '<i class="icon-trash"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +
                        '</tr>'
                });

                $("#table-template tbody").html(Templates);
            },
            error: function (data) {
                $('#lbltemplateerror').text("Error occured. Error: \n" + data);
            }
        });
    }

    var LookupGroupList = ''
    //var lookupgroupId = 0;
    $("#btnLookupGroup").click(function () {
        $("#MetaGroup").css("style", "none");
        $("#Template").css("style", "none");
        $("#LookupGroup").css("style", "block");
        $("#LookupValues").css("style", "none");
        $('#lbllookupgrouperror').text("");
        $('#lbllookupgroupsucess').text("");
        $("#txtlookupgroupname").val("");
        $("#btnalookupgroupcancel").text("Cancel");
        $('#btnaddlookupgroup').text("Save Lookup Group");
        $("#lbllookupgroupactive input").prop("checked", '');
        $("#table-lookupgrp tbody").empty();
        var Lookupgrps = '';
        $.ajax({
            type: "GET",
            url: $('#hdnPath').val() + "/Admin/GetLookupGroups",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                LookupGrpList = data.LookupGroup;

                $.each(LookupGrpList, function (index) {

                    Lookupgrps +=
                        '<tr>' +
                            '<td class="td-actions">' +
                                '<div class="btn-group">' +
                                    '<button class="btn btn-mini btn-success">' +
                                        '<i class="icon icon-edit"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +

                            '<td style="display:none;">' + LookupGrpList[index].LookupGroupId + '</td>' +
                            '<td>' + LookupGrpList[index].LookupGroupName + '</td>' +
                            //'<td>' + LookupGrpList[index].LookupDataValue + '</td>' +
                            '<td class="td-actions">' +
                                '<div class="btn-group">' +
                                    '<button href="#" class="btn-sm btn-color-primary" data-pdsa-val="@item.TemplateId" style="color: red; text-decoration: none;">' +
                                        '<i class="icon-trash"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +
                        '</tr>'
                });

                $("#table-lookupgrp tbody").append(Lookupgrps);
                $("#sMenuModal").modal('show');
               
            },
            error: function (data) {
                $('#lbllookupgrouperror').text("Error occured. Error: \n" + data);
            }
        });
        $("#LookupGroup").modal('show');
        $("#btnalookupgroupcancel").hide();

    });

    $("#btnaddlookupgroup").click(function () {
        $('#lbllookupgrouperror').text("");
        $('#lbllookupgroupsucess').text("");
        var LookupGrpName = $("#txtlookupgroupname").val();
        var LookupGrpActive = $("#lbllookupgroupactive input").prop("checked")

        if (LookupGrpName == "") {
            $('#lbllookupgrouperror').text("Please Enter Group Name");
            return;
        }


        if (LookupGrpActive) {
            LookupGrpActive = 1;
        }
        else {
            LookupGrpActive = 0;
        }

        if ($('#btnaddlookupgroup').text() == 'Update') {
            $.ajax({
                type: "POST",
                url: $('#hdnPath').val() + "/Admin/UpdateLookupGroups",

                data: JSON.stringify({ LookupGroupName: LookupGrpName, IsActive: LookupGrpActive, LookupGroupId: lookupgrpId }),
                datatype: "JSON",
                contentType: "application/json; charset=utf-8",
                success: function (data) {



                    if (data == '1') {

                        $('#lbllookupgroupsucess').text("Lookup Group Update Successfully.");

                    }
                    else {
                        $('#lbllookupgrouperror').text("No Exist.");
                    }
                    $('#txtlookupgroupname').val('');
                    $("#lbllookupgroupactive input").prop("checked", false)
                    $('#btnaddlookupgroup').text("Save Lookup Group");
                    $('#btnalookupgroupcancel').hide();
                    $('#btnLookupValues').show();
                    GetLookupGroups();

                },
                error: function (data) {
                    $('#lbllookupgrouperror').text("Try Again later. Error: \n" + data);
                }
            });
        }
        else {
            $('#btnaddlookupgroup').text("Save Lookup Group")
            $.ajax({
                type: "POST",
                url: $('#hdnPath').val() + "/Admin/SaveLookupGroups",

                data: JSON.stringify({ LookupGroupName: LookupGrpName, IsActive: LookupGrpActive }),
                datatype: "JSON",
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                    if (data == '1') {
                        $('#lbllookupgroupsucess').text("Lookup Group Save Successfully.");

                        GetLookupGroups();
                    }
                    else {
                        $('#lbllookupgrouperror').text("Already Exist.");
                    }
                    GetLookupGroups();
                    $('#txtlookupgroupname').val('');
                    $("#lbllookupgroupactive input").prop("checked", false)
                    $('#btnaddlookupgroup').text("Save Lookup Group");
                    $('#btnalookupgroupcancel').hide();
                    $('#btnLookupValues').show();
                },
                error: function (data) {
                    $('#lbllookupgrouperror').text("Try Again later. Error: \n" + data);
                }
            });
        }
    });

    $("#btnalookupgroupcancel").click(function () {
        $('#lbllookupgrouperror').text("");
        $('#lbllookupgroupsucess').text("");
        $('#txtlookupgroupname').val('');
        $("#lbllookupgroupactive input").prop("checked", false)
        $('#btnaddlookupgroup').text("Save Lookup Group");
        $('#btnalookupgroupcancel').hide();
        $('#btnLookupValues').show();
        GetLookupGroups();
        return false;
    });

    $(document).on('click', '#table-lookupgrp tbody .btn', function () {
        $('#lbllookupgrouperror').text("");
        $('#lbllookupgroupsucess').text("");
        $("#txtlookupgroupname").val($(this).parents('tr').find('td:eq(2)').text().trim());
        lookupgrpId = $(this).parents('tr').find('td:eq(1)').text().trim();
        $(this).parents('tr').parents('tr').remove();
        $($($(this).parents('tr')).parents('table')).find('td').css('background-color', '');
        $(this).parents('tr').find('td').css('background-color', 'LightBlue');
        $('#btnaddlookupgroup').text("Update")
        $("#btnalookupgroupcancel").show();
        // $('#btnLookupValues').hide();
        $("#lbllookupgroupactive input").prop("checked", true)
        return false;


    });
    
    $(document).on('click', '#table-lookupgrp tbody .btn-sm', function () {
        lookupgrpId = $(this).parents('tr').find('td:eq(1)').text().trim();
        $('#lbllookupgrouperror').text("");
        $('#lbllookupgroupsucess').text("");
        //alert(lookupgroupId);
        var Message = ('Are you want to delete Lookup Group');
        if (lookupgrpId != null) {

            if (confirm(Message) == true) {
                if (confirm('Are You Sure ?') == true) {
                    $.ajax({
                        type: "POST",
                        url: $('#hdnPath').val() + "/Admin/DeleteLookupGroup",
                        data: JSON.stringify({ LookupGroupId: lookupgrpId }),
                        datatype: "JSON",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data == '1') {
                                $('#lbllookupgroupsucess').text("LookupGroup Delete Successfully.");

                            }
                            else {
                                $('#lbllookupgrouperror').text("LookupGroup can not be Deleted ,else its exist with lookup value and meta key.");
                            }

                            GetLookupGroups();
                            $('#txtlookupgroupname').val('');
                            $("#lbllookupgroupactive input").prop("checked", false)
                            $('#btnaddlookupgroup').text("Save Lookup Group");
                            $('#btnalookupgroupcancel').hide();
                            $('#btnLookupValues').show();
                        },
                        error: function (data) {
                            $('#lbllookupgrouperror').text("Try Again later. Error: \n" + data);
                        }
                    });
                    return false;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }

        }
        else {

            return false;
        }

    });

    function GetLookupGroups() {
        var Lookupgrps = '';
        $.ajax({
            type: "GET",
            url: $('#hdnPath').val() + "/Admin/GetLookupGroups",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                LookupGrpList = data.LookupGroup;

                $.each(LookupGrpList, function (index) {

                    Lookupgrps +=
                        '<tr>' +
                            '<td class="td-actions">' +
                                '<div class="btn-group">' +
                                    '<button class="btn btn-mini btn-success">' +
                                        '<i class="icon icon-edit"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +

                            '<td style="display:none;">' + LookupGrpList[index].LookupGroupId + '</td>' +
                            '<td>' + LookupGrpList[index].LookupGroupName + '</td>' +
                            //'<td>' + LookupGrpList[index].LookupDataValue + '</td>' +
                        '<td class="td-actions">' +
                        '<div class="btn-group">' +
                            '<button href="#" class="btn-sm btn-color-primary" data-pdsa-val="@item.TemplateId" style="color: red; text-decoration: none;">' +
                                '<i class="icon-trash"></i>' +
                            '</button>' +
                        '</div>' +
                    '</td>' +
                    '</tr>'
                });

                $("#table-lookupgrp tbody").html(Lookupgrps);
            },
            error: function (data) {
                $('#lbllookupgrouperror').text("Error occured. Error: \n" + data);
            }
        });
    }

    var selectValueList = '';
    var LookupValueList = '';
    //var lookupvalueId = 0;
    var lookupdatavalue = '';
    // var lookupgrpId=0;

    $("#btnLookupValues").click(function () {

        $("#MetaGroup").css("style", "none");
        $("#Template").css("style", "none");
        $("#LookupGroup").css("style", "none");
        $("#LookupValues").css("style", "block");
        $('#lblvalueerror').text("");
        $('#lblvaluesucess').text("");
        $("#txtlookupvalue").val("");
        $("#txtlookupdatavalue").val("");
        $('#btnaddvalue').text("Save");
        $('btnaddvaluecancel').text("Cancel");
        $("#lblvalueactive input").prop("checked", '');
        $("#table-LookupValue tbody").empty();
        var Lookupvalues = '';
        var selectvalues = '';

        $.ajax({
            type: "GET",
            url: $('#hdnPath').val() + "/Admin/GetLookupValues",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                selectValueList = data.sDataArr.Lookupselect;
                $.each(selectValueList, function (index) {
                    if (index == 0) {

                        selectvalues += '<option value=' + selectValueList[index].LookupGroupId + ' selected="selected">' + selectValueList[index].LookupGroupName + '</option>';

                    }
                    else {
                        selectvalues += '<option value=' + selectValueList[index].LookupGroupId + '>' + selectValueList[index].LookupGroupName + '</option>';
                    }
                });
                $("#selectLookupGroup").empty();
                $("#selectLookupGroup").append(selectvalues);
                $('#lblvaluesucess').text("");

                LookupValuesList = data.sDataArr.LookupValue;
                //$.each(LookupValuesList, function (index) {

                //    Lookupvalues +=
                //        '<tr>' +
                //            '<td class="td-actions">' +
                //                '<div class="btn-group">' +
                //                    '<button class="btn btn-mini btn-success">' +
                //                        '<i class="icon icon-edit"></i>' +
                //                    '</button>' +
                //                '</div>' +
                //            '</td>' +

                //            '<td style="display:none;">' + LookupValuesList[index].LookupGroupId + '</td>' +
                //            '<td>' + LookupValuesList[index].LookupGroupName + '</td>' + '<td>' + LookupValuesList[index].LookupDisplay + '</td>' +
                //            '<td style="display:none;">' + LookupValuesList[index].LookupDataValue + '</td>' +
                //        '</tr>'
                //});

                //$("#table-LookupValue tbody").append(Lookupvalues);
                GetLookupValuesbyselection($("#selectLookupGroup").val());
                $("#sMenuModal").modal('show');
                $('#lblvaluesucess').text("");
            },
            error: function (data) {
                alert('error');
                $('#lblvalueerror').text("Error occured. Error: \n" + data);
            }
        });

        $("#LookupValues").modal('show');
        $('#btnaddvaluecancel').hide();

    });

    $("#btnaddvalue").click(function () {
        $('#lblvalueerror').text("");
        $('#lblvaluesucess').text("");
        var lookupvalid = $("#selectLookupGroup").val();
        var LookupValueName = $("#txtlookupvalue").val();
        var lookupdatavalue = $("#txtlookupdatavalue").val();
        var ValueActive = $("#lblvalueactive input").prop("checked")
        if (LookupValueName == "") {
            $('#lblvalueerror').text("Please enter Group Values");
            return;
        }

        if (ValueActive) {
            ValueActive = 1;
        }
        else {
            ValueActive = 0;
        }

        if ($('#btnaddvalue').text() == 'Update') {
            $.ajax({
                type: "POST",
                url: $('#hdnPath').val() + "/Admin/UpdateLookupValues",

                data: JSON.stringify({ LookupDisplay: LookupValueName, IsActive: ValueActive, LookupGroupId: lookupvalid }),
                datatype: "JSON",
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                    if (data == '1') {
                        $('#lblvaluesucess').text("Lookup Value Update Successfully.");

                    }
                    else {
                        $('#lblvalueerror').text("No Exist.");
                    }

                    //GetLookupValues();
                    GetLookupValuesbyselection(lookupvalid);
                    $('#txtlookupvalue').val('');
                    $("#lblvalueactive input").prop("checked", false)
                    $('#btnaddvaluecancel').hide();
                    $('#btnaddvalue').text("Save");

                },
                error: function (data) {
                    $('#lblvalueerror').text("Try Again later. Error: \n" + data);
                }
            });
        }
        else {
            $('#btnaddvalue').text("Save")
            $('#lblvalueerror').text("");
            $('#lblvaluesucess').text("");
            lookupvalid = $("#selectLookupGroup").val();
            lookupdatavalue = $("#txtlookupdatavalue").val();
            LookupValueName = $("#txtlookupvalue").val();
            $.ajax({
                type: "POST",
                url: $('#hdnPath').val() + "/Admin/SaveLookupValues",

                data: JSON.stringify({ LookupDisplay: LookupValueName, Isactive: ValueActive, LookupGroupId: lookupvalid }),
                datatype: "JSON",
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                    if (data == "1") {
                        $('#lblvaluesucess').text("Lookup Value Saved Successfully.");

                    }
                    else {
                        $('#lblvalueerror').text("Already Exist.");
                    }

                    GetLookupValues();
                    $('#txtlookupvalue').val('');
                    $("#lblvalueactive input").prop("checked", false)
                    $('#btnaddvaluecancel').hide();
                    $('#btnaddvalue').text("Save");
                },
                error: function (data) {
                    $('#lblvalueerror').text("Try Again later. Error: \n" + data);
                }
            });
        }
    });

    $('#selectLookupGroup').change(function () {
        var selectval = $("#selectLookupGroup").val();


        $.ajax({
            type: "POST",
            url: $('#hdnPath').val() + "/Admin/selectgroupvalue",
            datatype: "JSON",
            data: JSON.stringify({ LookupGroupId: selectval }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                selectValueList = data.sDataArr.LookupValue;
                var Lookupvalues = ''

                $("#table-LookupValue tbody").empty();
                $.each(selectValueList, function (index) {

                    Lookupvalues +=
                        '<tr>' +
                            '<td class="td-actions">' +
                                '<div class="btn-group">' +
                                    '<button class="btn btn-mini btn-success">' +
                                        '<i class="icon icon-edit"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +

                            '<td style="display:none;">' + selectValueList[index].LookupGroupId + '</td>' +
                            //'<td>' + selectValueList[index].LookupGroupName + '</td>' +
                            '<td>' + selectValueList[index].LookupDisplay + '</td>' +
                            '<td class="td-actions">' +
                                '<div class="btn-group">' +
                                    '<button href="#" class="btn-sm btn-color-primary" data-pdsa-val="@item.LookupGroupId"  style="color: red; text-decoration: none;">' +
                                        '<i class="icon-trash"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +
                        '</tr>'
                });

                $("#table-LookupValue tbody").html(Lookupvalues);
                $("#sMenuModal").modal('show');
                $('#btnaddvaluecancel').hide();
                $('#lblvaluesucess').text("");
            }
            ,
            error: function (data) {

                $('#lblvalueerror').text("Error occured. Error: \n" + data);
            }
        });
    });

    $("#btnaddvaluecancel").click(function () {
        $('#lblvalueerror').text("");
        $('#lblvaluesucess').text("");
        $('#txtlookupvalue').val('');
        $("#lblvalueactive input").prop("checked", false)
        $('#btnaddvaluecancel').hide();
        $('#btnaddvalue').text("Save");
        GetLookupValuesbyselection(lookupvalueId);

    });

    $(document).on('click', '#table-LookupValue tbody .btn', function () {

        $('#lblvalueerror').text("");
        $('#lblvaluesucess').text("");
        $("#selectLookupGroup").val($(this).parents('tr').find('td:eq(1)').text().trim());
        $("#txtlookupdatavalue").val($(this).parents('tr').find('td:eq(3)').text().trim());
        $("#txtlookupvalue").val($(this).parents('tr').find('td:eq(2)').text().trim());
        lookupvalid = $(this).parents('tr').find('td:eq(1)').text().trim();
        $(this).parents('tr').parents('tr').remove();
        $($($(this).parents('tr')).parents('table')).find('td').css('background-color', '');
        $(this).parents('tr').find('td').css('background-color', 'LightBlue');
        $('#btnaddvalue').text("Update");
        $('#btnaddvaluecancel').show();
        $("#lblvalueactive input").prop("checked", true);
        return false;


    });

    $(document).on('click', '#table-LookupValue tbody .btn-sm', function () {
        lookupgrpId = $(this).parents('tr').find('td:eq(1)').text().trim();
        $('#lblvalueerror').text("");
        $('#lblvaluesucess').text("");
        var Message = ('Are you want to delete LookupValue');
        if (lookupgrpId != null) {
            if (confirm(Message) == true) {
                if (confirm('Are You Sure ?') == true) {
                    $.ajax({
                        type: "POST",
                        url: $('#hdnPath').val() + "/Admin/DeleteLookupValue",
                        data: JSON.stringify({ LookupGroupId: lookupgrpId }),
                        datatype: "JSON",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data == '1') {
                                $('#lblvaluesucess').text("LookupValue Delete Successfully.");
                                $('#lbllookupgroupsucess').text("");
                            }
                            else {
                                $('#lblvalueerror').text("LookupValue can not be Deleted ,else its exist with meta key.");
                            }
                            GetLookupValues();
                            GetLookupGroups();
                            $('#txtlookupvalue').val('');
                            $("#lblvalueactive input").prop("checked", false)
                            $('#btnaddvaluecancel').hide();
                            $('#btnaddvalue').text("Save");
                        },
                        error: function (data) {
                            $('#lblvalueerror').text("Try Again later. Error: \n" + data);
                        }
                    });
                    return false;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }

        }
        else {

            return false;
        }

    });

    function GetLookupValues() {
        var Lookupvalues = '';
        var selectvalues = '';
        $.ajax({
            type: "GET",
            url: $('#hdnPath').val() + "/Admin/GetLookupValues",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                selectValueList = data.sDataArr.Lookupselect;
                $.each(selectValueList, function (index) {
                    if (index == 0) {
                        selectvalues += '<option value=' + selectValueList[index].LookupGroupId + ' selected="selected">' + selectValueList[index].LookupGroupName + '</option>';
                        //selectvalues += '<option value=' + selectValueList[index].LookupGroupId +  '</option>';
                    }
                    else {
                        selectvalues += '<option value=' + selectValueList[index].LookupGroupId + '>' + selectValueList[index].LookupGroupName + '</option>';
                        //selectvalues += '<option value=' + selectValueList[index].LookupGroupId + '>' +  '</option>';
                    }
                });
                $("#selectLookupGroup").empty();
                $("#selectLookupGroup").append(selectvalues);


                LookupValuesList = data.sDataArr.LookupValue;

                $.each(LookupValuesList, function (index) {

                    Lookupvalues +=
                        '<tr>' +
                            '<td class="td-actions">' +
                                '<div class="btn-group">' +
                                    '<button class="btn btn-mini btn-success">' +
                                        '<i class="icon icon-edit"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +

                               '<td style="display:none;">' + LookupValuesList[index].LookupGroupId + '</td>' +
                            //'<td>' + LookupValuesList[index].LookupGroupName + '</td>' +
                            '<td>' + LookupValuesList[index].LookupDisplay + '</td>' +
                             '<td style="display:none;">' + LookupValuesList[index].LookupDisplay + '</td>' +
                             '<td class="td-actions">' +
                                '<div class="btn-group">' +
                                    '<button href="#" class="btn-sm btn-color-primary" data-pdsa-val="@item.LookupGroupId"  style="color: red; text-decoration: none;">' +
                                        '<i class="icon-trash"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +
                        '</tr>'
                });

                $("#table-LookupValue tbody").html(Lookupvalues);
                // $('btnaddvaluecancel').hide();
            },
            error: function (data) {
                $('#lblvalueerror').text("Error occured. Error: \n" + data);
            }
        });
    }

    function GetLookupValuesbyselection(lookupgrpId1) {
        $.ajax({
            type: "POST",
            url: $('#hdnPath').val() + "/Admin/selectgroupvalue",
            datatype: "JSON",
            data: JSON.stringify({ LookupGroupId: lookupgrpId1 }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                selectValueList = data.sDataArr.LookupValue;
                var Lookupvalues = ''

                $("#table-LookupValue tbody").empty();
                $.each(selectValueList, function (index) {

                    Lookupvalues +=
                        '<tr>' +
                            '<td class="td-actions">' +
                                '<div class="btn-group">' +
                                    '<button class="btn btn-mini btn-success">' +
                                        '<i class="icon icon-edit"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +

                            '<td style="display:none;">' + selectValueList[index].LookupGroupId + '</td>' +
                            //'<td>' + selectValueList[index].LookupGroupName + '</td>' +
                            '<td>' + selectValueList[index].LookupDisplay + '</td>' +
                            '<td class="td-actions">' +
                                '<div class="btn-group">' +
                                    '<button href="#" class="btn-sm btn-color-primary" data-pdsa-val="@item.LookupGroupId"  style="color: red; text-decoration: none;">' +
                                        '<i class="icon-trash"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</td>' +
                        '</tr>'
                });

                $("#table-LookupValue tbody").html(Lookupvalues);
                $("#sMenuModal").modal('show');
                $('#btnaddvaluecancel').hide();
            }
            ,

            error: function (data) {

                $('#lblvalueerror').text("Error occured. Error: \n" + data);
            }
        });
    }

})
