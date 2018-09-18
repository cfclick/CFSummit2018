component  output="false"
{
	cfheader(name="Access-Control-Allow-Origin", value="*"  );
	
	remote string function listAllCryptocurrencies() returnformat="JSON"   {
		cfhttp( url="https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", method="get", result="mydata" ){
			cfhttpparam( type="header", name="X-CMC_PRO_API_KEY", value="4389f4bc-69f6-4f95-8da0-8abffc16ed80");
		}
			
		return mydata.FileContent;
	}
	
	
	remote any function listHistoricalData() returnformat="JSON"   {
		var arr = [];
		var future = runAsync( function(){
			
			cfhttp( url="http://api.coinlayer.com/2018-01-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="jan" );
			arr.append(jan.FileContent);		
			return arr;
			
		}).then( function(arr){
			cfhttp( url="http://api.coinlayer.com/2018-02-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="feb" );
			arr.append(feb.FileContent);			
			return arr;
			
		}).then( function(arr){
			cfhttp( url="http://api.coinlayer.com/2018-03-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="mar" );
			arr.append(mar.FileContent);		
			return arr;
			
		}).then( function(arr){
			cfhttp( url="http://api.coinlayer.com/2018-04-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="apr" );
			arr.append(apr.FileContent);
			
			return arr;
		}).then( function(arr){
			cfhttp( url="http://api.coinlayer.com/2018-05-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="may" );
			arr.append(may.FileContent);		
			return arr;
			
		}).then( function(arr){
			cfhttp( url="http://api.coinlayer.com/2018-06-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="jun" );
			arr.append(jun.FileContent);			
			return arr;
			
		}).then( function(arr){
			cfhttp( url="http://api.coinlayer.com/2018-07-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="jul" );
			arr.append(jul.FileContent);			
			return arr;
			
		}).then( function(arr){
			cfhttp( url="http://api.coinlayer.com/2018-08-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="aug" );
			arr.append(aug.FileContent);			
			return arr;
			
		}).then( function(arr){
			cfhttp( url="http://api.coinlayer.com/2018-09-01?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc", method="get", result="sep" );
			arr.append(sep.FileContent);			
			return arr;
			
		});
		
			
		return future.get();
	}
	
	
	//http://api.coinlayer.com/2018-04-30?access_key=b9f4a792d5e5aebf37264fc60cb999df&symbols=btc,eth
}