component  output="false"
{
	cfheader(name="Access-Control-Allow-Origin", value="*"  );
	
	remote string function listAllCryptocurrencies() returnformat="JSON"   {
		cfhttp( url="https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", method="get", result="mydata" ){
			cfhttpparam( type="header", name="X-CMC_PRO_API_KEY", value="4389f4bc-69f6-4f95-8da0-8abffc16ed80");
		}
			
		return mydata.FileContent;
	}
}