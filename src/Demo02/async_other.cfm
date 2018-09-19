
<h2>Async call with isDone Cancel isCancelled method</h2>
<cfscript>
	//Start time count
	start_time = gettickCount()/1000;
	
	helper_future = runAsync(function(){
		sleep(7000);
		writelog("helper_future completed");
		return "helper_future completed";
	});
	
		
	pdfManager_future = runAsync(function(){
		sleep(12000);
		writelog("pdfManager_future completed");
		return "pdfManager_future completed";
	});
	
	
	crawler_future = runAsync(function(){
		sleep(5000);
		writelog("crawler_future completed");
		return "crawler_future completed";
	});
	
	writeOutput("helper_future.isDone? #helper_future.isDone()#");
	writeoutput("<br>");
	writeOutput("pdfManager_future.isDone? #pdfManager_future.isDone()#");
	writeoutput("<br>");
	/*
	sleep(2000);
	pdfManager_future.cancel();
	writeOutput("pdfManager_future.isCancelled? #pdfManager_future.isCancelled()#");
	writeoutput("<br>");
	*/
	writeOutput("crawler_future.isDone? #crawler_future.isDone()#");
	writeoutput("<br>");
	writeOutput("<br>");
	writeOutput("<br>");
	end_time = gettickCount()/1000;
	writeOutput("Execution Time: <br>");
	writeOutput(end_time-start_time);
	writeOutput("<br>");
	
	/*
	sleep(7100);
	writeOutput("helper_future.isDone? #helper_future.isDone()#");
	writeoutput("<br>");
	*/
	
	function onError(e){
		return e.message;
	}
</cfscript>
