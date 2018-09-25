$(document).ready(function(){
    
     /****************** Client ajax ******************/

    $('#sync_btn').off('click').on('click', function(target){

        $('#sync_result_div').html("");
        $.ajax({
            type: "get",
            url: "http://localhost/CFSummit2018/src/cfcs/UrlHelper.cfc?method=startWebSiteDownloadSync",
            
            beforeSend: function (xhr) {
                $('#sync_loader').html("<i class='fa fa-spinner fa-spin fa-3x'></i>");
                $("#total_sync_duration").html("");
            },
            async: true
        }).done(function (response) {
            $('#sync_loader').html("");
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
           // console.log(response);
            
        }).fail(function (xhr) {
            $('#sync_loader').html("Error");
            console.log(xhr);
            $('#sync_result_div').html("Sorry error check console log");
            $("#total_sync_duration").html("");
        });

    });

    $('#async_btn').off('click').on('click', async function(target){
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
            
            //console.log(response);

        }).fail(function (xhr, type, statusText) {
            console.log(xhr);
            $('#async_result_div').html(statusText);
            $("#total_async_duration").html("");
        });
        
    });

    $('#async_await_btn').off('click').on('click', async function(target){
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
            
            //console.log(response);

        }).fail(function (xhr, type, statusText) {
            console.log(xhr);
            $('#async_result_div').html(statusText);
            $("#total_async_await_duration").html("");
        });
        
    });

    /****************** Client function ******************/

    $('#sync_func_btn').off('click').on('click', function(target){
        
        startSync()
    });

    $('#async_func_btn').off('click').on('click', function(target){
        startAsync();
    });

    /******************** Synchronous functions *******************/

    function startSync(){
        listSync();
       
    }

    function listSync() {
        const userGet = "https://api.github.com/search/users?page=1&q=cfclick&type=Users"
        
        const users = request(userGet);
        const usersList = JSON.parse(users).items
        
            usersList.forEach(async function (user) {
                const repos = request(user.repos_url)
          
                handleRepoList(user, repos)
            });
         /*\\var myPromise = MakeQuerablePromise(users);
       
       if( myPromise.isFulfilled() ){
            const usersList = JSON.parse(users).items
        
            usersList.forEach(async function (user) {
                const repos = request(user.repos_url)
          
                handleRepoList(user, repos)
            });
        }else{
            console.log("Initial rejected:", myPromise.isRejected());//false
            console.log("Initial pending:", myPromise.isPending());//true

            
        }

        myPromise.then(function(data){
            console.log(data); // "Yeah !"
            console.log("Final fulfilled:", myPromise.isFulfilled());//true
            console.log("Final rejected:", myPromise.isRejected());//false
            console.log("Final pending:", myPromise.isPending());//false
        })*/
        
    }

    /******************** A Synchronous functions *******************/
   
    async function startAsync(){
        list();
        /*const siteName = WebSiteDownload();//.then(crawl).then(assemblePDF);
        crawl(await siteName);
        await assemblePDF();*/
    }

    function request(url) {
        let prom = new Promise( function( resolve, reject ) {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.response)
                    } else {
                        reject(xhr.status)
                    }
                }
            }
            xhr.ontimeout = function () {
                reject('timeout')
            }
            xhr.open('get', url, true)
            xhr.send()
        });

        return prom;
    }

    async function list() {
        const userGet = "https://api.github.com/search/users?page=1&q=cfclick&type=Users"
        
        const users = await request(userGet)
        const usersList = JSON.parse(users).items
        
        usersList.forEach(async function (user) {
          const repos = await request(user.repos_url)
          
          handleRepoList(user, repos)
        })
    }

    function handleRepoList(user, repos) {
        const userRepos = JSON.parse(repos)
        
        // Handle each individual user repo here
        console.log(user, userRepos)
    }

    /**
 * This function allow you to modify a JS Promise by adding some status properties.
 * Based on: http://stackoverflow.com/questions/21485545/is-there-a-way-to-tell-if-an-es6-promise-is-fulfilled-rejected-resolved
 * But modified according to the specs of promises : https://promisesaplus.com/
 */
function MakeQuerablePromise(promise) {
    // Don't modify any promise that has been already modified.
    if (promise.isResolved) return promise;

    // Set initial state
    var isPending = true;
    var isRejected = false;
    var isFulfilled = false;

    // Observe the promise, saving the fulfillment in a closure scope.
    var result = promise.then(
        function(v) {
            isFulfilled = true;
            isPending = false;
            return v; 
        }, 
        function(e) {
            isRejected = true;
            isPending = false;
            throw e; 
        }
    );

    result.isFulfilled = function() { return isFulfilled; };
    result.isPending = function() { return isPending; };
    result.isRejected = function() { return isRejected; };
    return result;
}
});