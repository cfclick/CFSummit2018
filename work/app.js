$(document).ready(function(){

    $('#sync_btn').off('click').on('click', function(target){

        $.ajax({
            type: "get",
            url: "http://shirak-dell/CFSummit2018/work/UrlHelper.cfc?method=startWebSiteDownloadSync",
            
            beforeSend: function (xhr) {
                $('#sync_result_div').html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i>");
                $("#total_sync_duration").html("");
            },
            async: true
        }).done(function (response) {
           // $('#sync_result_div').html(response);
           result = JSON.parse(response);
            if( result ){
                totalDueration = 0;
                str = "";
                result.forEach(element => {

                    str = str + 
                    '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' +
                    element.url + '</h5><small>Char Len: ' + element.charLen + '</small></div><p class="mb-1">' + element.duration + ' mls</p><small>Is done? ' + element.isDone + '</small></a>';
                    
                    totalDueration += eval(element.duration);
                    
                    $("#total_sync_duration").html(totalDueration);
                    /*str = str + "<li>url: " + element.url + "</li>" +
                    "<li>len: " + element.charLen + "</li>" + 
                    "<li>duration: " + element.duration + "</li>"; */
                    
                    $('#sync_result_div').html(str);
                });
            }
            console.log(response);
            
        }).fail(function (xhr) {
            console.log(xhr);
            $('#sync_result_div').html("Sorry error check console log");
            $("#total_sync_duration").html("");
        });

        //$('#sync_result_div').html("sync button clicked");
    });

    $('#async_btn').off('click').on('click', function(target){
        $.ajax({
            type: "get",
            url: "http://shirak-dell/CFSummit2018/work/UrlHelper.cfc?method=startWebSiteDownloadASync",
            
            beforeSend: function (xhr) {
                $('#async_result_div').html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i>");
                $("#total_async_duration").html("");
            },
            async: true
        }).done(function (response) {
            result = JSON.parse(response);
            if( result ){
                str = "";
                totalDueration = 0;
                totalPageDueration = 0;
                grandTotalDueration = 0;
                result.forEach(element => {
                    
                    str = str + 
                    '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' +
                    element.url + '</h5><small>Char Len: ' + element.charLen + '</small></div><p class="mb-1">async duration: ' + element.duration + ' mls</p><small>page duration? ' + element.pageDuration + '</small></a>'
                    
                    totalDueration += eval(element.duration);
                    totalPageDueration += eval(element.pageDuration);
                    
                    $("#total_async_duration").html(totalDueration);
                    /*    str = str + "<li>url: " + element.url + "</li>" +
                    "<li>len: " + element.charLen + "</li>" + 
                    "<li>duration: " + element.duration + "</li>"; 
                    */
                    $('#async_result_div').html(str);
                });
            }
            
            console.log(response);

        }).fail(function (xhr, type, statusText) {
            console.log(xhr);
            $('#async_result_div').html(statusText);
            $("#total_async_duration").html("");
        });
        
    });

    $('#async_await_btn').off('click').on('click', function(target){
        $.ajax({
            type: "get",
            url: "http://shirak-dell/CFSummit2018/work/UrlHelper.cfc?method=startWebSiteDownloadASyncAwait",
            
            beforeSend: function (xhr) {
                $('#async_result_div').html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i>");
                $("#total_async_await_duration").html("");
            },
            async: true
        }).done(function (response) {
            result = JSON.parse(response);
            if( result ){
                str = "";
                totalDueration = 0;
                totalPageDueration = 0;
                grandTotalDueration = 0;
                result.forEach(element => {
                    
                    str = str + 
                    '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' +
                    element.url + '</h5><small>Char Len: ' + element.charLen + '</small></div><p class="mb-1">async duration: ' + element.duration + ' mls</p><small>page duration? ' + element.pageDuration + '</small></a>'
                    
                    totalDueration += eval(element.duration);
                    totalPageDueration += eval(element.pageDuration);
                    
                    $("#total_async_await_duration").html(totalDueration);
                    /*    str = str + "<li>url: " + element.url + "</li>" +
                    "<li>len: " + element.charLen + "</li>" + 
                    "<li>duration: " + element.duration + "</li>"; 
                    */
                    $('#async_result_div').html(str);
                });
            }
            
            console.log(response);

        }).fail(function (xhr, type, statusText) {
            console.log(xhr);
            $('#async_result_div').html(statusText);
            $("#total_async_await_duration").html("");
        });
        
    });
});