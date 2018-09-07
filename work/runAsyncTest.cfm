<cfscript>
	/*start_time = gettickCount()/1000;
	try
     {
     	future = runAsync(function(){
			sleep(2000);
			my_sleepTime = 2000;
			return my_sleepTime;
		}, 5000).then( function(sleepTime){
			sleep(2500);
			total_sleep = sleepTime + 2500;
			return total_sleep;
		}, 3000 ).then(function(totalSleep){
			sleep(3600);
			final_sleep = totalSleep + 4000;
			return final_sleep;
		}, 3500).error(function(e){
				return e.message;
		}, 15000);
		
		end_time = gettickCount()/1000;
		writeOutput("Execution Time: <br>");
		writeOutput(end_time-start_time);
		writeOutput("<br>");
		writeOutput("Future: <br>");
		writeoutput(future.get());
     }
     catch(Any e)
     {
     	writeOutput("Catch:<br>");
     	writeoutput(e.message);
     }

	
	future2 = runAsync( function() {
		sleep(2000);
		my_sleepTime = 2000;
		return my_sleepTime;
	}, 3000 );
	
	
	*/
	
	start_time = gettickCount()/1000;
	
	
	future3 = runAsync( insertYourCard, 3000 )
						.then( validatePin, 3000)
						.then( deposit, 3000)
						.then( printReceipt )
						.error( onError );
	
	
	
	end_time = gettickCount()/1000;
	writeOutput("Execution Time: <br>");
	writeOutput(end_time-start_time);
	writeOutput("<br>");
	writeOutput("Future: <br>");
	//writeoutput(future3.get());
	writeOutput("<br>");
	
	start_time2 = gettickCount()/1000;
	pinNumber = insertYourCard();
	valid = validatePin(pinNumber);
	amount = deposit(valid);
	result = printReceipt(amount);
	end_time2 = gettickCount()/1000;
	writeOutput("Execution Time: <br>");
	writeOutput(end_time2-start_time2);
	writeOutput("<br>");
	
	function insertYourCard(){
		sleep(1000);
		pinNumber = 1111;
		return pinNumber;
	}
	
	function validatePin( numeric pinNumber ){
		sleep(2000);
		if( pinNumber == 1111){
			return true;
		}else{
			return false;
		}
	}
	
	function deposit(isValid){
		sleep(1000);
		if( isValid ){
			deposit_check = 1000;
			return deposit_check;
		}else{
			throw(message="Invalid pin number");
		}	
	}
	
	function printReceipt(amount){
		sleep(3000);
		return "Receipt printed amount of #amount#";
	}
	
	function onError(e){
		return e.message;
	}
	
	
	
	
	
	
	
	
	
	
</cfscript>