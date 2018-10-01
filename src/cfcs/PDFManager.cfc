component  output="false"
{
	function init(){
		return this;
	}
	
	public void function assemblePDF(){
		pdf = new PDF();
		pdf.setDestination( "C:\inetpub\wwwroot\CFSummit2018\documents_process\Verdugo_Insurance1.pdf" )
		.setOverwrite(true)
		.setPackage(true);
		pdf.addParam(source= "C:\inetpub\wwwroot\CFSummit2018\assets\cover_letter.docx");
		pdf.addParam(source= "C:\inetpub\wwwroot\CFSummit2018\documents_process\foxnews.pdf",userpassword="user",ownerpassword="owner", password="user");
		pdf.addParam(source= "C:\inetpub\wwwroot\CFSummit2018\assets\mybackyard.jpg");
		pdf.addParam(source= "C:\inetpub\wwwroot\CFSummit2018\assets\Curro.mp3");
		pdf.addParam(source= "C:\inetpub\wwwroot\CFSummit2018\assets\jt021109-desktop.m4v");
		pdf.addParam(source= "C:\inetpub\wwwroot\CFSummit2018\assets\CFSummit2015-digital-signature.pptx");
		pdf.addParam(source= "C:\inetpub\wwwroot\CFSummit2018\assets\CFWfS_diagram.vsdx");
		pdf.addParam(source= "C:\inetpub\wwwroot\CFSummit2018\assets\MyList.xlsx"); 				  				
		pdf.merge();
	}
	
	public void function URLToPDF( required string _url, required string fileName ){
		
		cfhtmltopdf(destination="C:\inetpub\wwwroot\CFSummit2018\documents_process\#fileName#.pdf",
	  							source="#arguments._url#",
	  							orientation="landscape",
	  							pagetype="letter",
	  							margintop="0.5",
	  							marginbottom="0.5",
	  							marginleft="0.5",
	  							marginright="0.5",
	  							ownerpassword="owner",
	  							userpassword="user",
	  							encryption="RC4_128",
	  							permissions="AllowPrinting,AllowCopy",
	  							overwrite="true");	
	  	
	  	
	}
}