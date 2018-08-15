<cfscript>
	startTick = gettickCount()/1000;
	urlHelper = new UrlHelper();
	
	helper = urlHelper.startWebSiteDownloadSync();
	
	
	
	pdfManager = new PDFManager();	
	pdfManager_future = pdfManager.assemblePDF();
	
	
	
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
	
</cfscript>
