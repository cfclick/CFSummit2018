<cfscript>
	startTick = gettickCount()/1000;
	
		
	helper_future = runAsync(function(){
		return new UrlHelper().startWebSiteDownloadSync();
	});
	
		
	pdfManager_future = runAsync(function(){
		return new pdfManager().assemblePDF();
	});
	
	crawler = new WebCrawler();
	crawler.crawl('https://amazon.com');	
	crawler.crawl('https://foxnews.com');
	crawler.crawl('https://cnn.com');	
	crawler.crawl('https://adobe.com');	
	result = crawler.crawl('https://youtube.com');
	
	endTick = gettickCount()/1000;
	duration = endTick - startTick;
	writeOutput(duration);
	writeoutput("<br>");
	
	startTick2 = gettickCount()/1000;
	for( future in helper_future.get() ){
		writeoutput(future.url);
		writeoutput("<br>");
	}
	endTick2 = gettickCount()/1000;
	duration2 = endTick2 - startTick2;
	writeDump(duration2);
	
</cfscript>
