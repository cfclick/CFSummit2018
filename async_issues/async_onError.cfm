<cfscript>
	startTick_1 = gettickCount()/1000;
	
	/* Run async on main cfm page WITH onError 	*/
	urlhelper_future = runAsync( function(){
		return new UrlHelper().startWebSiteDownloadSync();
	} ).error( onError );
	
	endTick_1 = gettickCount()/1000;
	duration_1 = endTick_1 - startTick_1;
	writeOutput("Run async on main cfm page <strong>WITH</strong> onError:<span style='color:Red'>#duration_1#</span><br>");
	/**********************************************************************************************/
	
	
	
	startTick_2 = gettickCount()/1000;
	
	/* Run async on main cfm page WITHOUT onError*/
	urlhelper_future = runAsync(function(){
		return new UrlHelper().startWebSiteDownloadSync();
	});
	
	endTick_2 = gettickCount()/1000;
	duration_2 = endTick_2 - startTick_2;
	writeOutput("Run async on main cfm page <strong>WITHOUT</strong> onError:#duration_2#<br><br>");
	/**********************************************************************************************/
	
	
	
	startTick_3 = gettickCount()/1000;
	
	/* Run async on cfc  WITH onError 	*/
	urlhelper_future = runAsync( function(){
		return new UrlHelper().startWebSiteDownloadASync(true);
	} ).error( onError );
	
	endTick_3 = gettickCount()/1000;
	duration_3 = endTick_3 - startTick_3;
	writeOutput("Run async on cfc <strong>WITH</strong> onError:<span style='color:Red'>#duration_3#</span><br>");
	/**********************************************************************************************/
	
	
	
	startTick_4 = gettickCount()/1000;
	
	/* Run async on cfc page WITHOUT onError*/
	urlhelper_future = runAsync(function(){
		return new UrlHelper().startWebSiteDownloadASync(false);
	});
	
	endTick_4 = gettickCount()/1000;
	duration_4 = endTick_4 - startTick_4;
	writeOutput("Run async on cfc page <strong>WITHOUT</strong> onError:#duration_4#<br>");
	/**********************************************************************************************/
	
	
	function onError(error){
		//send email or log
		return error.message;
	}	
</cfscript>
