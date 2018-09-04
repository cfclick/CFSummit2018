component output="false" 
{
	container = {};
	container.maxLinks = "0";
	container.excludeFilters = "";
	container.qData = QueryNew('url,title,body,itemDate', 'varchar,varchar,varchar,date');
	container.qLinks = QueryNew('url', 'varchar');

	remote function indexPage(pageData="") {
		title = pageData.title;
		body = pageData.body;
		titleAr = ListToArray(title,' ');

		//writedump(titleAr,"console");
        for(str in titleAr){
            strVal = Trim(str);
            strVal = strVal.toLowerCase();
            cacheput(strVal, body);
        }
	}

	remote function crawl(site="", extensions="", excludeFilters="", maxLinks="0") {
		if ( IsValid('URL', ARGUMENTS.site) && GetStatus(ARGUMENTS.site) ) {
			container.maxLinks = Val(ARGUMENTS.maxLinks);
			container.excludeFilters = ARGUMENTS.excludeFilters;
			container.extensions = ARGUMENTS.extensions;
			checkLinks(ARGUMENTS.site, ARGUMENTS.site, ARGUMENTS.extensions);
		}
		return container.qData;
	}

	public function getStatus(required link) {
		var result = 0;
		cfhttp( url=ARGUMENTS.link, timeout=5, redirect=true, method="head" );
		result = Val(cfhttp.statusCode);
		return result;
	}

	public function shouldFollow(required link, required domain) {
		var result = true;
		cfquery( dbtype="query", name="qHasBeenChecked" ) { //Note: queryExecute() is the preferred syntax but this syntax is easier to convert generically

			writeOutput("SELECT url
            FROM container.qLinks
            WHERE url = '#ARGUMENTS.link#'");
        }
        
		if ( qHasBeenChecked.recordCount ) {
			result = false;
		} else if ( ARGUMENTS.link contains 'javascript:' ) {
			result = false;
		} else if ( Val(container.maxLinks) && container.qLinks.recordCount >= Val(container.maxLinks) ) {
			result = false;
		} else if ( Left(link, Len(ARGUMENTS.domain)) != ARGUMENTS.domain ) {
			result = false;
		}
		return result;
	}

	public function shouldIndex(required link) {
		var result = true;
		if ( ListLen(container.extensions) && !ListFindNoCase(container.extensions, ListLast(ListFirst(ARGUMENTS.link, '?'), '.')) ) {
			result = false;
		} else if ( ListLen(container.excludeFilters) ) {
        
            filters = listToArray(container.excludeFilters,'|');

            for( filter in filters){
                literalFilter = Replace(filter, '*', '', 'ALL');

                if ( Left(filter, 1) == '*' and Right(filter, 1) == '*' ){
                    if (link contains literalFilter){
                        result = false;
                    }
                }else if( Right(filter, 1) == '*' ){
                    if( Left(link, Len(literalFilter)) == literalFilter ){
                        result = false
                    }
                }else if( Left(filter, 1) == '*' ){
                    if( Right(link, Len(literalFilter)) == literalFilter ){
                        result = false;
                    }
                }else{
                    if( link == filter ){
                        result = false
                    }
                }
            }

		}
		return result;
	}

	public function checkLinks(required page, required domain) {
		var link = '';
		//  Get the page 
		cfhttp( url=ARGUMENTS.page, timeout=10, resolveurl=true, redirect=true, method="get" );
		QueryAddRow(container.qLinks);
		QuerySetCell(container.qLinks, 'url', ARGUMENTS.page);
		if ( Val(CFHTTP.statusCode) == 200 ) {
			if ( shouldIndex (ARGUMENTS.page) ) {
				QueryAddRow(container.qData);
				QuerySetCell(container.qData, 'url', getRelativePath(ARGUMENTS.page));
				QuerySetCell(container.qData, 'title', getPageTitle(CFHTTP.fileContent));
				QuerySetCell(container.qData, 'body', getBrowsableContent(CFHTTP.fileContent));
				QuerySetCell(container.qData, 'itemDate', '');
			}
			aLinks = ReMatchNoCase('((((https?:|ftp : ) \/\/)|(www\.|ftp\.))[-[:alnum:]\?$%,\.\/\|&##!@:=\+~_]+[A-Za-z0-9\/])', StripComments(cfhttp.fileContent));
			for ( link in aLinks ) {
				link = Replace(ListFirst(link, '##'), ':80', '', 'ONE');
				if ( shouldFollow(link, ARGUMENTS.domain) ) {
					linkStatus = GetStatus(link);
					if ( linkStatus == 200 ) {
						//  Link check its contents as well 
						checkLinks(link, ARGUMENTS.domain);
					}
				}
			}
		}
		return;
	}

	public function getBrowsableContent(required string) {
		ARGUMENTS.string = StripComments(ARGUMENTS.string);
		ARGUMENTS.string = ReReplaceNoCase(ARGUMENTS.string, '<invalidTag.*?>.*?</script>', '', 'ALL');
		ARGUMENTS.string = ReReplaceNoCase(ARGUMENTS.string, '<style.*?>.*?</style>', '', 'ALL');
		ARGUMENTS.string = ReReplace(ARGUMENTS.string, '<[^>]*>', '', 'ALL');
		return ARGUMENTS.string;
	}

	public function stripComments(required string) {
		ARGUMENTS.string = ReReplace(ARGUMENTS.string, '<--[^(--&gt  ) ]*-->', '', 'ALL');
		return ARGUMENTS.string;
	}

	public function getPageTitle(required string) {
		return ReReplace(ARGUMENTS.string, ".*<title>([^<>]*)</title>.*", "\1");
	}

	public function getRelativePath(required path) {
		ARGUMENTS.path = ReplaceNoCase(ARGUMENTS.path, 'http://', '', 'ONE');
		ARGUMENTS.path = ReplaceNoCase(ARGUMENTS.path, ListFirst(ARGUMENTS.path, '/'), '', 'ONE');
		return ARGUMENTS.path;
	}

}