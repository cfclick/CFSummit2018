component  output="false"
{
	cfheader(name="Access-Control-Allow-Origin", value="*"  );
	
	remote string function listAllCryptocurrencies() returnformat="JSON"   {
		cfhttp( url="https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", method="get", result="mydata" ){
			cfhttpparam( type="header", name="X-CMC_PRO_API_KEY", value="4389f4bc-69f6-4f95-8da0-8abffc16ed80");
		}
			
		return mydata.FileContent;
	}
	
	
	remote any function listHistoricalData(string theYear='2018') returnformat="JSON"   {
		
		writelog(theYear);
		var dataDirectoryAndFile = getDirectoryFromPath( getCurrentTemplatePath() ) & "\#theYear#_listAllCryptocurrencies.json";
		
		if( cacheIdExists("#theYear#_listAllCryptocurrencies") )
		{
			writelog("cached ID: #theYear#_listAllCryptocurrencies used");
			return cacheGet("#theYear#_listAllCryptocurrencies");
		}
		else if( fileExists( dataDirectoryAndFile ) )
		{
			writelog("JSON File: #theYear#_listAllCryptocurrencies.json used");
			
			return readFromJSONFile(dataDirectoryAndFile);
		}
		else
		{
			var arr = [];
			var future = runAsync( function(){
				
				cfhttp( url="http://api.coinlayer.com/#theYear#-01-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="jan" );
				arr.append(jan.FileContent);		
				return arr;
				
			}).then( function(arr){
				cfhttp( url="http://api.coinlayer.com/#theYear#-02-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="feb" );
				arr.append(feb.FileContent);			
				return arr;
				
			}).then( function(arr){
				cfhttp( url="http://api.coinlayer.com/#theYear#-03-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="mar" );
				arr.append(mar.FileContent);		
				return arr;
				
			}).then( function(arr){
				cfhttp( url="http://api.coinlayer.com/#theYear#-04-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="apr" );
				arr.append(apr.FileContent);
				
				return arr;
			}).then( function(arr){
				cfhttp( url="http://api.coinlayer.com/#theYear#-05-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="may" );
				arr.append(may.FileContent);		
				return arr;
				
			}).then( function(arr){
				cfhttp( url="http://api.coinlayer.com/#theYear#-06-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="jun" );
				arr.append(jun.FileContent);			
				return arr;
				
			}).then( function(arr){
				cfhttp( url="http://api.coinlayer.com/#theYear#-07-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="jul" );
				arr.append(jul.FileContent);			
				return arr;
				
			}).then( function(arr){
				cfhttp( url="http://api.coinlayer.com/#theYear#-08-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="aug" );
				arr.append(aug.FileContent);			
				return arr;
				
			}).then( function(arr){
				cfhttp( url="http://api.coinlayer.com/#theYear#-09-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="sep" );
				arr.append(sep.FileContent);			
				return arr;
				
			}).then( function(arr){
				cfhttp( url="http://api.coinlayer.com/#theYear#-10-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="oct" );
				arr.append(oct.FileContent);			
				return arr;
				
			}).then( function(arr){
				cfhttp( url="http://api.coinlayer.com/#theYear#-11-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="nov" );
				arr.append(nov.FileContent);			
				return arr;
				
			}).then( function(arr){
				cfhttp( url="http://api.coinlayer.com/#theYear#-12-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="dec" );
				arr.append(dec.FileContent);			
				return arr;
				
			});
			
			
			cachePut("#theYear#_listAllCryptocurrencies",future.get() );
			saveToJSONFile(dataDirectoryAndFile, future.get() );
			writelog("Real time API Data used: #theYear#");
			
			return future.get();
		}
		
		
	}
	
	private void function saveToJSONFile( required string name, required any data ){
		
		fileWrite( name, serializeJSON( data )	) ;
	
	}
	
	private any function readFromJSONFile( required string name){
		
		var listAllCryptocurrencies = deserializeJSON(fileRead( name));
		return listAllCryptocurrencies;
	}
	
	
	//http://api.coinlayer.com/2018-04-30?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc,eth
}