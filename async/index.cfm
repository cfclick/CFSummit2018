<cfscript>
	pdfManager = new CFSummit2018.async.PDFManager();
	
	start = getTickCount();
	future1 = runAsync( pdfManager.URLToPDF("http://foxnews.com", "foxnews")).isDone().then(pdfManager.assemblePDF());
	/*writeDump(future1);
	future2 = runAsync(pdfManager.assemblePDF());
	writeDump(future2);*/
	end = getTickCount();
	
	duration = end - start;
	
	writeoutput(duration/1000);
	
	 	
</cfscript>
