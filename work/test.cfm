<cfscript>
	x = 6;
	y = 6;
	symbol = chr(6);
	space = "      ";
	arr = arraynew(1);
	for( i=1; i<=6; i++){
		
		for( s=1; s<=6-i; s++){	
			writeOutput("-");
		}
		for( j=1; j <= i;j++){	
			writeOutput("*");	
				
		}
		writeOutput("<br>");
	}
	//writedump(arr);
	/*
 	Executors = createobject('java','java.util.concurrent.Executors');
 	writeDump(Executors);*/
</cfscript>
