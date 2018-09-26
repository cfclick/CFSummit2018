<cfscript>
	coin = new cfsummit2018.src.cfcs.CoinMarketCap(); 
	writedump(coin.getCryptoNewsFeed('2018-09-26'));
</cfscript>
