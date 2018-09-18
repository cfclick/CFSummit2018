
<h2>Async call with error method</h2>
<cfscript>
	//Start time count
	startTick = gettickCount()/1000;
	
	//Create async instance of URL helper and call method startWebSiteDownloadSync	
	helper_future = runAsync(function(){
		return new cfcs.UrlHelper().startWebSiteDownloadSync();
	}).error(onError);
	
	//Create async instance of URL pdfManager and call method assemblePDF	
	pdfManager_future = runAsync(function(){
		return new cfcs.pdfManager().assemblePDF();
	}).error(onError);
	
	//Create instance of WebCrawler
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
	
	writeoutput("<h3>Wait for future to get the result back:</h3><br>");
	startTick2 = gettickCount()/1000;
	
	
	writeoutput("<br>");
	writeDump(pdfManager_future);
	writeoutput("<br>");
	if( isArray(helper_future.get())){
		for( future in helper_future.get() ){
			writeoutput(future.url);
			writeoutput("<br>");
		}
	}else{
		writeOutput(helper_future.get());
	}
	
	endTick2 = gettickCount()/1000;
	duration2 = duration + endTick2 - startTick2;
	writeoutput("<h3>Total Execution Time after getting the future: #duration2#</h3>");
	
	
	function onError(e){
		return e.message;
	}
</cfscript>
