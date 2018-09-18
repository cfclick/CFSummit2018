
<h2>No Async call</h2>
<cfscript>
	//Start time count
	startTick = gettickCount()/1000;
	
	//Create instance of URL helper
	urlHelper = new cfcs.UrlHelper();
	
	//Call startWebSiteDownloadSync method
	helper = urlHelper.startWebSiteDownloadSync();
	
	
	//Create instance of PDF Manager
	pdfManager = new cfcs.PDFManager();
	
	//Call assemblePDF method	
	pdfManager = pdfManager.assemblePDF();
	
	
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
	writeoutput("<h3>Total Execution Time: #duration#</h3>");
	writeoutput("<br>");
	
</cfscript>