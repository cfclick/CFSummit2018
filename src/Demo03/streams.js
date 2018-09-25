
function CryptoCompare(){
	cryptoCompare = this;

	this.streamUrl = "https://streamer.cryptocompare.com/";
	this.fsym = "BTC";
	this.tsym = "USD";
	this.currentSubs;
	this.currentSubsText = "";
	this.dataUrl = "https://min-api.cryptocompare.com/data/subs?fsym=" + this.fsym + "&tsyms=" + this.tsym;
	this.socket = io(this.streamUrl);

	(async (t) => {
		$.getJSON(t.dataUrl, function( data ) {
			t.currentSubs = data['USD']['TRADES'];
			console.log(t.currentSubs);
			for (let i = 0; i < t.currentSubs.length; i++) {
				t.currentSubsText += t.currentSubs[i] + ", ";
			}
			$('#sub-exchanges').text(t.currentSubsText);
			t.socket.emit('SubAdd', { subs: t.currentSubs });
		});
	})(this);
	
	this.setEventListener();
}

CryptoCompare.prototype.setEventListener = function(){
	cryptoCompare = this;

	cryptoCompare.socket.on('m', function( currentData ) {
		let tradeField = currentData.substr(0, currentData.indexOf("~"));
		if ( tradeField == CCC.STATIC.TYPE.TRADE ) {
			cryptoCompare.transformData(currentData);
		}
	});

	$('#unsubscribe').click(function() {
		console.log('Unsubscribing to streamers');
		$('#subscribe').removeClass('subon');
		$(this).addClass('subon');
		$('#stream-text').text('Stream stopped');
		cryptoCompare.socket.emit('SubRemove', { subs: cryptoCompare.currentSubs });
		$('#sub-exchanges').text("");
	});
	
	$('#subscribe').click(function() {
		console.log('Subscribing to streamers')
		$('#unsubscribe').removeClass('subon');
		$(this).addClass('subon');
		$('#stream-text').text("Streaming...");
		cryptoCompare.socket.emit('SubAdd', { subs: cryptoCompare.currentSubs });
		$('#sub-exchanges').text(cryptoCompare.currentSubsText);
	});
}


CryptoCompare.prototype.transformData = function( data ) {
	let coinfsym = CCC.STATIC.CURRENCY.getSymbol(cryptoCompare.fsym);
	let cointsym = CCC.STATIC.CURRENCY.getSymbol(cryptoCompare.tsym)
	let incomingTrade = CCC.TRADE.unpack(data);
	//console.log(incomingTrade);
	let newTrade = {
		Market: incomingTrade['M'],
		Type: incomingTrade['T'],
		ID: incomingTrade['ID'],
		Price: CCC.convertValueToDisplay(cointsym, incomingTrade['P']),
		Quantity: CCC.convertValueToDisplay(coinfsym, incomingTrade['Q']),
		Total: CCC.convertValueToDisplay(cointsym, incomingTrade['TOTAL'])
	};

	if (incomingTrade['F'] & 1) {
		newTrade['Type'] = "SELL";
	}
	else if (incomingTrade['F'] & 2) {
		newTrade['Type'] = "BUY";
	}
	else {
		newTrade['Type'] = "UNKNOWN";
	}

	cryptoCompare.displayData(newTrade);
};

CryptoCompare.prototype.displayData = function( dataUnpacked ) {
	let maxTableSize = 30;
	let length = $('table tr').length;
	$('#trades').after(
		"<tr class=" + dataUnpacked.Type + "><th>" + dataUnpacked.Market + "</th><th>" + dataUnpacked.Type + "</th><th>" + dataUnpacked.ID + "</th><th>" + dataUnpacked.Price + "</th><th>" + dataUnpacked.Quantity + "</th><th>" + dataUnpacked.Total + "</th></tr>"
	);

	if (length >= (maxTableSize)) {
		$('table tr:last').remove();
	}
};

