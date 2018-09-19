<!doctype html>
<html lang="en">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		
		<!-- Bootstrap CSS -->
		<link rel="stylesheet" href="../../assets/bootstrap/css/bootstrap.min.css" 
		      integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" 
		      crossorigin="anonymous">
			  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
		<title>
			(Client) sync-a-sync ajax
		</title>
	</head>
	<body>
		
		
		<div class="container-fluid">
			<h1>
				(Client) sync-a-sync ajax
			</h1>
			<div class="row">
				
					<div class="col-md-4">
						<div class="card" >
							<div class="card-body">
								<h5 class="card-title">
									Sync (Normal)
								</h5>
								<h6 class="card-subtitle mb-2 text-muted">
									Synchronous Server
								</h6>
								<p class="card-text">
									Run the code in sequence order (one after another)
								</p>
								<a href="#" id="sync_btn" class="btn btn-primary">Normal (sync)</a>
								<br><br>
								<div class="list-group" id="sync_result_div">
									
									
								  </div>
								<!--<ul id="sync_result_div" style="padding-top:15px" >
								</ul>-->
								

							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card" >
							<div class="card-body">
								<h5 class="card-title">
									Async
								</h5>
								<h6 class="card-subtitle mb-2 text-muted">
									Asynchronous Server
								</h6>
								<p class="card-text">
									Run the code in parallel order
								</p>
								<a href="#" id="async_btn" class="btn btn-primary">async</a>
								<a href="#" id="async_await_btn" class="btn btn-primary">async/await</a>
								<br><br>
								<div class="list-group" id="async_result_div">
									
								  </div>
								<!--<ul id="async_result_div">
									
								</ul>-->
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<cfscript>
							adminObj = createObject("component","cfide.adminapi.administrator");
							adminObj.login("x");
							runtimeObj=createObject("component","cfide.adminapi.runtime");
							corePool=runtimeObj.getRuntimeProperty("corePoolSize");
							//writeOutput("core pool size is: " & corePool & "");
							maxPool=runtimeObj.getRuntimeProperty("maxPoolSize");
							//writeOutput("max pool size is: " & maxPool & "");
							keepAlive=runtimeObj.getruntimeProperty("keepAliveTime");
							//writeOutput("keep alive time is: " & keepAlive & "");
						</cfscript>
						<div class="card" >
							<div class="card-body">
								<h5 class="card-title">
									CFAdmin
								</h5>
								<h6 class="card-subtitle mb-2 text-muted">
									Asynchronous
								</h6>
								<p class="card-text">
									core pool size is: <cfoutput>#corePool#</cfoutput>
								</p>

								<p class="card-text">
									max pool size is: <cfoutput>#maxPool#</cfoutput>
								</p>

								<p class="card-text">
									keep alive time is: <cfoutput>#keepAlive#</cfoutput>
								</p>

								<p class="card-text">
									Total sync duration: <span id="total_sync_duration"></span>
								</p>

								<p class="card-text">
									Total async duration: <span id="total_async_duration"></span>
								</p>

								<p class="card-text">
									Total async/await duration: <span id="total_async_await_duration"></span>
								</p>
							</div>
						</div>
					</div>
				
			</div>
		</div>
		
		<!-- Optional JavaScript -->
		<!-- jQuery first, then Popper.js, then Bootstrap JS -->
		<script	src="https://code.jquery.com/jquery-3.3.1.min.js"
  			integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
			crossorigin="anonymous">
		</script>

		</script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" 
		        integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" 
		        crossorigin="anonymous">

		</script>
		<script src="../../assets/bootstrap/js/bootstrap.min.js" 
		        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" 
		        crossorigin="anonymous">

		</script>

		<script src="app.js">
		</script>
	</body>
</html>