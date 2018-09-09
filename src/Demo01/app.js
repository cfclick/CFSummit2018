$(document).ready(function(){
    
     /****************** Client ajax ******************/

    $('#sync_btn').off('click').on('click', function(target){

        $.ajax({
            type: "get",
            url: "http://localhost/CFSummit2018/src/cfcs/UrlHelper.cfc?method=startWebSiteDownloadSync",
            
            beforeSend: function (xhr) {
                $('#sync_result_div').html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i>");
                $("#total_sync_duration").html("");
            },
            async: true
        }).done(function (response) {
           
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
                                       
                    $('#sync_result_div').html(str);
                });
            }
            console.log(response);
            
        }).fail(function (xhr) {
            console.log(xhr);
            $('#sync_result_div').html("Sorry error check console log");
            $("#total_sync_duration").html("");
        });

    });

    $('#async_btn').off('click').on('click', function(target){
        $.ajax({
            type: "get",
            url: "http://localhost/CFSummit2018/src/cfcs/UrlHelper.cfc?method=startWebSiteDownloadASync",
            
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
            url: "http://localhost/CFSummit2018/src/cfcs/UrlHelper.cfc?method=startWebSiteDownloadASyncAwait",
            
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

    /****************** Client function ******************/

    $('#sync_func_btn').off('click').on('click', function(target){
        
        var siteName = WebSiteDownload_sync();
        console.log(siteName);
        crawl_sync(siteName);
        assemblePDF_sync();
    });

    $('#async_func_btn').off('click').on('click', function(target){
        starteAsync();
    });

    /******************** Synchronous functions *******************/

    function WebSiteDownload_sync(){
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("WebSiteDownload_sync executed" )
                resolve("https://adobe.com")
            }, 2700)
        });
        return promise;
       
    }

    function crawl_sync(siteName){
        setTimeout(() => {
            console.log("crawl_sync executed for " + siteName )
        }, 4300);
    }

    function assemblePDF_sync(){
        setTimeout(() => {
            console.log("assemblePDF_sync executed")
        }, 10000);
    }


    /******************** A Synchronous functions *******************/

    async function starteAsync(){
        var siteName = await WebSiteDownload();//.then(crawl).then(assemblePDF);
        await crawl(siteName);
        await assemblePDF();
    }

    async function WebSiteDownload(){
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("WebSiteDownload executed" )
                resolve("https://adobe.com")
            }, 2700)
        });
        return promise;
        /*return setTimeout(() => {
            console.log("WebSiteDownload executed");
            return "";
        }, 2700);*/
    }

    async function crawl(siteName){
        setTimeout(() => {
            console.log("crawl executed for " + siteName )
        }, 4300);
    }

    async function assemblePDF(){
        setTimeout(() => {
            console.log("assemblePDF executed")
        }, 10000);
    }
});