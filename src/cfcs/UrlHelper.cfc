component
{
	
	function init(){
		//variables.response = {"startTick":"","endTick":"","duration":"","url":"", "charLen":"","isDone":""}
		return this;
	}

    public final array function listTargetSites() 
    {
      
       return ["https://adobe.com",
               "http://cnn.com",
               "https://foxnews.com",
               "http://coldfusion.adobe.com",
               "https://youtube.com",
               "http://cfsummit.adobeevents.com/",
               "http://amazon.com"
              ];
    }
    
    /**
    * startWebSiteDownloadSync synchronous
    **/
    remote any function startWebSiteDownloadSync() returnformat="JSON"   {
        var urls = listTargetSites();
		
        var futArr = [];
        for(var item in urls ){    
        	var startTick = gettickCount()/1000;         	
        	var site_content = downloadWebsite(item);
        	var endTick = gettickCount()/1000;
        	var duration = numberFormat(endTick - startTick, "____.____");
        	//var response = {"asyncStartTick":asyncStartTick,"asyncEndTick":"","duration":"","pageDuration":"","url":item, "charLen":"","isDone":""};
        	var response = {"startTick":startTick,"endTick":endTick,"duration":duration,"url":item, "charLen":len(site_content.fileContent),"isDone":""};
        	//var site = {"duration":duration,"url":item, "charLen":len(site_content.fileContent)};
        	futArr.append(response); 
        }
        return futArr;
    }
    
    /*
    * startWebSiteDownloadSync Asynchronous
    */   
    remote any function startWebSiteDownloadASync() returnformat="JSON"   {
        final urls = listTargetSites();

        var futArr = [];
        for(var item in urls){
        	var startTick = gettickCount()/1000;  
       	
        	var future = runAsync( function()
        						    {
        						    	var asyncStartTick = gettickCount()/1000; 
        						   		var response = {"asyncStartTick":asyncStartTick,"asyncEndTick":"","duration":"","pageDuration":"","url":item, "charLen":"","isDone":""};
        								return response;
        							}).then(downloadWebsiteAsync);
        							//.error(onError);
        							
        	var endTick = gettickCount()/1000;
        	//res["endTick"]=endTick;
        	var duration = numberFormat(endTick - startTick, "____.__________");
        	//var res = future.get();
        	//res["pageDuration"]=duration;
        	var res = {"duration":duration,"url":item, "charLen":"", "isDone":""};
        	futArr.append(res); 
        }
         return futArr;
             
    }
    
    /*
    * startWebSiteDownloadSync Asynchronous and wait
    */   
    remote any function startWebSiteDownloadASyncAwait() returnformat="JSON"   {
        final urls = listTargetSites();

        var futArr = [];
        for(var item in urls){
        	var startTick = gettickCount()/1000;  
       	
        	var future = runAsync( function()
        						    {
        						    	var asyncStartTick = gettickCount()/1000; 
        						   		var response = {"asyncStartTick":asyncStartTick,"asyncEndTick":"","duration":"","pageDuration":"","url":item, "charLen":"","isDone":""};
        								return response;
        							}).then(downloadWebsiteAsync);
        							//.error(onError);
        							
        	var endTick = gettickCount()/1000;
        	//res["endTick"]=endTick;
        	var duration = numberFormat(endTick - startTick, "____.__________");
        	var res = future.get();
        	res["pageDuration"]=duration;
        	//var res = {"duration":duration,"url":item, "charLen":"", "isDone":""};
        	futArr.append(res); 
        }
         return futArr;
             
    }
    
   /* private createJSON(siteIndex){
    	var site = {"duration":duration,"url":item, "charLen":len(future.get().fileContent), "isDone":future.isDone()};
    }*/
    
    private any function downloadWebsite(required string site)
    {
    	var siteIndex = "";
    	
    	if ( IsValid('URL', ARGUMENTS.site) && getStatus(ARGUMENTS.site) ) {
    		cfhttp( url=ARGUMENTS.site, timeout=15, redirect=true, method="GET", result="siteIndex"  );   		
    	}    	
    	
    	return siteIndex;   	
    }
    
    private any function downloadWebsiteAsync(required any mysite)
    {
    	
    	var response = arguments.mysite;
    	//randN = randRange(1000,5500);
    	//sleep(randN);
    	if ( IsValid('URL', response.url) && getStatus(response.url) ) {
    		cfhttp( url=response.url, timeout=15, redirect=true, method="GET", result="http_response"  );   		
    	}    
    	response["charLen"] = len(http_response.FileContent);	
    	var asyncEndTick = gettickCount()/1000;
       	response["asyncEndTick"]=asyncEndTick;
        var duration = numberFormat(asyncEndTick - response["asyncStartTick"], "____.___");
        response["duration"]=duration;
        writelog( text=serializeJSON(response) );
    	return response;   	
    }
    
    private function getStatus(required string link) {
		var result = 0;
		cfhttp( url=ARGUMENTS.link, timeout=5, redirect=true, method="head" );
		result = Val(cfhttp.statusCode);
		return result;
	}
	
	private function onError(err){
		return err.message;
	}
    
    
}