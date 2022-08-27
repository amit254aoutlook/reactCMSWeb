
function ShowRecordMessage() {
    $('#divPager .active').removeClass('active');
    var PagerNos = 5 * parseInt(PageNumber / 5);
    if (PagerNos == PageNumber) PagerNos = PagerNos - 5;
    $('#divPager li').each(function (i) {
        if (i > 0 & i < 6) {
            $(this).find('a').text(++PagerNos);
            if (PagerNos == PageNumber) {
                $(this).addClass('active');
            }
        }
    })
    var RecCount = parseInt($('#hdnRecordCount').val());
    var PageLimit = parseInt(RecCount / PageLength);
    if ((RecCount % PageLength) > 0) {
        PageLimit++;
    }
    if ($('#divPager li:eq(1) a').text().trim() == '1') {
        $('#divPager li:eq(0)').addClass('disabled');
    }
    else {
        $('#divPager li:eq(0)').removeClass('disabled');
    }
    var LastPage = parseInt($('#divPager li:eq(5) a').text().trim());
    if ((LastPage * PageLength) > RecCount) {
        $('#divPager li:eq(6)').addClass('disabled');
    }
    else {
        $('#divPager li:eq(6)').removeClass('disabled');
    }
    $('#divPager li').each(function (i) {
        if (i > 0 & i < 6) {
            if (parseInt($(this).find('a').text()) > PageLimit) {
                $(this).addClass('disabled');
            }
            else {
                $(this).removeClass('disabled');
            }
        }
    })
    var FirstRecord = ((PageNumber - 1) * PageLength) + 1;
    var LastRecord = PageNumber * PageLength;
    if (RecCount < (PageNumber * PageLength)) {
        LastRecord = RecCount;
    }
    if (LastRecord == 0) {
        FirstRecord = 0;
        $('#divPager li:eq(1)').removeClass('active');
    }
    $('#table_report_info').text('Showing ' + FirstRecord + ' to ' + LastRecord + ' of ' + RecCount + ' entries');
}

$(function () {

    $('#divPageLength select').change(function () {
        PageNumber = 1;
       
        //if ($('#divPageLength select').val() == "All") {
        //    PageLength = $('#hdnPageLength').val();
        //}
        //else {
            PageLength =  $('#divPageLength select').val();
       // }
        $('#hdnPageNumber').val(PageNumber);
        $('#hdnPageLength').val(PageLength);
        $('#divPager .active').removeClass('active');
        $('#divPager li:eq(1)').addClass('active');
        GetTableRecords();
        ShowRecordMessage();
    })

    $('#divPager a').click(function () {
        var ParentLi = $(this).parents('li');
        if ($(ParentLi).hasClass('disabled')) return false;
        var ChkLi1 = $(this).find('.icon-double-angle-left');
        var ChkLi2 = $(this).find('.icon-double-angle-right');
        $('#divPager .active').removeClass('active');
        var PageIncr = 0;
        if (ChkLi1.length > 0) PageIncr = -5;
        if (ChkLi2.length > 0) PageIncr = 5;
        if (ChkLi1.length > 0 || ChkLi2.length > 0) {
            $('#divPager li').each(function (i) {
                if (i > 0 & i < 6) {
                    $(this).find('a').text(parseInt($(this).find('a').text()) + PageIncr);
                }
            })
            PageNumber = $('#divPager li:eq(1)').find('a').text().trim();
            $('#divPager li:eq(1)').addClass('active');
        }
        if (ChkLi1.length == 0 && ChkLi2.length == 0) {
            PageNumber = $(this).text().trim();
            $(ParentLi).addClass('active');
        }
        $('#hdnPageNumber').val(PageNumber);
        GetTableRecords();
        ShowRecordMessage();
    })

    $('#divPageLength select').val($('#hdnPageLength').val());
    ShowRecordMessage();

})
