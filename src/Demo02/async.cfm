
<h2>Async call</h2>
<cfscript>
	//Start time count
	startTick = gettickCount()/1000;
	
	//Create async instance of URL helper and call method startWebSiteDownloadSync	
	helper_future = runAsync(function(){
		return new cfcs.UrlHelper().startWebSiteDownloadSync();
	});
	
	//Create async instance of URL pdfManager and call method assemblePDF	
	pdfManager_future = runAsync(function(){
		return new cfcs.pdfManager().assemblePDF();
	});
	
	//Create instance of WebCrawler
	/*crawFuture = runAsync( function(){
		
		return result;
	});*/
	
	crawler = new cfcs.WebCrawler();
	//Inject websites url into the constructor
		crawler.crawl('https://amazon.com');	
		crawler.crawl('https://foxnews.com');
		crawler.crawl('https://cnn.com');	
		crawler.crawl('https://adobe.com');	
		result = crawler.crawl('https://youtube.com');
	
	//Get tick time
	endTick = gettickCount()/1000;
	//duration of execution time from start to end
	duration = endTick - startTick;
	//priny out total duration
	writeoutput("<h3>Total Async Execution Time: #duration#</h3>");
	writeoutput("<br>");
	/*
	writeoutput("<h3>Wait for future to get the result back:</h3><br>");
	startTick2 = gettickCount()/1000;
	for( future in helper_future.get() ){
		writeoutput(future.url);
		writeoutput("<br>");
	}
	endTick2 = gettickCount()/1000;
	duration2 = duration + endTick2 - startTick2;
	writeoutput("<h3>Total Execution Time after getting the future: #duration2#</h3>");
	*/	
</cfscript>
