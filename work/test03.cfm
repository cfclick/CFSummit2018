<cfscript>
	service = new cfsummit2018.src.cfcs.CoinMarketCap();
	result = service.listHistoricalData(); 	
	writeDump(result);
</cfscript>
