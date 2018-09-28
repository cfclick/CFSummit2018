function Coin(){
    //coin = constructor();
    coin = this;
    this.arrayOfDataTable           = [];
    this.arrayOfHistoricalPrice     = [];
    this.arrayOfHistoricalPrice2    = [];
    this.OtherExchPrice             = {};
    this.totalBTCSold               = 0;
    this.totalBTCBuy                = 0;
    this.totalBTCDiff               = 0;
    this.BTCPrice                   = 0;
    this.DashPrice                  = 0;
    this.LTCPrice                   = 0;
    this.ZECPrice                   = 0;

    this.load_data_btn              = $('#load_data_btn');
    this.placeholder                = $('#orders_placeholder');
    this.otherExch_sideModal        = $('#otherExch_sideModal');
    this.streamModalLg              = $('#streamModalLg');
    this.select_history_year        = $('#select_history_year');
    this.btn_price_exchanges        = $('#btn_price_exchanges');
    this.myOtherExchTitle           = $('#myOtherExchTitle');
    this.btn_price_exchanges_dash   = $('#btn_price_exchanges_dash');
    this.btn_price_exchanges_zec    = $('#btn_price_exchanges_zec');
    this.btn_price_exchanges_ltc    = $('#btn_price_exchanges_ltc');
    this.btc_sales                  = $('#btc_sales');
    this.btc_buy                    = $('#btc_buy');
    this.btc_diff                   = $('#btc_diff');
    this.btn_stream                 = $('#btn_stream');
    this.news_feed                  = $('#news_feed');
    this.btc_deals_progress         = $('#btc_deals_progress');
    this.prog_percent               = $('#prog_percent');
    this.prog_percent2              = $('#prog_percent2');
    this.prog_percent3              = $('#prog_percent3');
    
    this.pusher_02                  = new Pusher('de504dc5763aeef9ff52');
    this.ordersChannel              = this.pusher_02.subscribe('live_orders');

    Pusher.host                     = 'slanger1.chain.so'; // our server
    Pusher.ws_port                  = 443; // our server's port
    Pusher.wss_port                 = 443; // ...
    
    // create the pusher client connection
    
    // subscribe to the channel for BTC/USD updates
    this.pusher_01              = new Pusher('e9f5cc20074501ca7395', { encrypted: true, disabledTransports: ['sockjs'], disableStats: true });
    
    this.ticker_btc             = this.pusher_01.subscribe('ticker_btc_usd');
    this.ticker_update_btc      = this.pusher_01.subscribe('blockchain_update_btc');
    this.ticker_update_dash     = this.pusher_01.subscribe('blockchain_update_dash');
    this.ticker_update_zec      = this.pusher_01.subscribe('blockchain_update_zec');
    this.ticker_update_ltc      = this.pusher_01.subscribe('blockchain_update_ltc');
    this.ticker_ltc             = this.pusher_01.subscribe('ticker_ltc_usd');
    this.ticker_dash            = this.pusher_01.subscribe('ticker_dash_usd');
    this.ticker_zcash           = this.pusher_01.subscribe('ticker_zec_usd');
    this.ticker_dogecoin        = this.pusher_01.subscribe('ticker_dogecoin_usd');

    $('.mdb-select').material_select();

    (async (f1) => {
        f1.listAllCryptocurrenciesasync(); 
        await f1.listHistoricalData();
    })(this);

    (async (f1) => {
        await f1.getSocialStats(1182); 
        await f1.getCryptoNewsFeed('2018-09-26');
    })(this);

   // this.loadHistoricalData();
    (async (f1) => {
        f1.getOrders();
    })(this);

    this.setEventListener();

}

Coin.prototype.setEventListener = function(){

    coin = this;
    coin.ticker_btc.bind('price_update', function(data) {
        // show price updates
        if (data.type == "price" && data.value.exchange=="bitstamp") {
          coin.BTCPrice =   data.value.price;
         
          $('span#csprice').replaceWith('<span id="csprice">$' + data.value.price + ' ' + data.value.price_base+'</span>')
          $('#time_updated_btc').html('Last Time updated: ' + coin.unix_timestampToDateTime(data.value.time) );
          $('#sym_btc_cur').html(data.value.symbol );         
        }
    });

    
    coin.ticker_ltc.bind('price_update', function(data) {
        // show price updates
        if (data.type == "price" && data.value.exchange=="bitstamp") {
            coin.LTCPrice =   data.value.price;
           
          $('#time_updated_ltc').html('Last Time updated: ' + coin.unix_timestampToDateTime( data.value.time ) );
          $('span#csprice_ltc').replaceWith('<span id="csprice_ltc">$' + data.value.price + ' ' +  data.value.price_base+'</span>')
        }
    });
  
    coin.ticker_dash.bind('price_update', function(data) {
        // show price updates
        if (data.type == "price" && data.value.exchange=="bitfinex") {
            coin.DashPrice =   data.value.price;
            
            $('#time_updated_dash').html('Last Time updated: ' + coin.unix_timestampToDateTime( data.value.time ) );
          $('span#csprice_dash').replaceWith('<span id="csprice_dash">$' + data.value.price + ' ' +  data.value.price_base+'</span>')
        }
    });
  
    coin.ticker_zcash.bind('price_update', function(data) {
        // show price updates
        if (data.type == "price" && data.value.exchange=="bitfinex") {
            coin.ZECPrice=   data.value.price;
          
            $('#time_updated_zec').html('Last Time updated: ' + coin.unix_timestampToDateTime( data.value.time ) );
          $('span#csprice_zcash').replaceWith('<span id="csprice_zcash">$' + data.value.price + ' ' +  data.value.price_base+'</span>')
        }
    });
  
    coin.ticker_dogecoin.bind('price_update', function(data) {
        // show price updates
        if (data.type == "price" && data.value.exchange=="bitstamp") {
            $('#time_updated_doge').html('Last Time updated: ' + coin.unix_timestampToDateTime( data.value.time ) );
          $('span#csprice_dogecoin').replaceWith('<span id="csprice_dogecoin">$' + data.value.price + ' ' +  data.value.price_base +'</span>')
        }
    });
  
    
    coin.ticker_update_btc.bind('tx_update', function(data) {
        if (data.type == "tx") {
            // update an HTML div or span with the new content, for e.g.: data.value.blockhash
            $('#btc_updates').html('total inputs:' + data.value.total_inputs + ' sent value:' + data.value.sent_value);
           
        }
    }); 
    
    coin.ticker_update_dash.bind('tx_update', function(data) {
        if (data.type == "tx") {
            // update an HTML div or span with the new content, for e.g.: data.value.blockhash
            $('#dash_updates').html('total inputs:' + data.value.total_inputs + ' sent value:' + data.value.sent_value);
           
        }
    });

    coin.ticker_update_zec.bind('tx_update', function(data) {
        if (data.type == "tx") {
            // update an HTML div or span with the new content, for e.g.: data.value.blockhash
            $('#zec_updates').html('total inputs:' + data.value.total_inputs + ' sent value:' + data.value.sent_value);
           
        }
    });

    coin.ticker_update_ltc.bind('tx_update', function(data) {
        if (data.type == "tx") {
            // update an HTML div or span with the new content, for e.g.: data.value.blockhash
            $('#ltc_updates').html('total inputs:' + data.value.total_inputs + ' sent value:' + data.value.sent_value);
           
        }
    });
    
    
    coin.load_data_btn.off('click').on('click', async () => {
        await coin.listAllCryptocurrenciesasync();//.then( f1.renderDataTable() ); 
    });

    coin.select_history_year.off('change').on('change', async (event) =>{
        
        await coin.listHistoricalData();
        
    });

    coin.btn_price_exchanges.off('click').on('click', async (event) => {
        await coin.getPriceFromExchages('BTC'); 
    });

    coin.btn_price_exchanges_zec.off('click').on('click', async (event) => {
        await coin.getPriceFromExchages('ZEC'); 
    });

    coin.btn_price_exchanges_dash.off('click').on('click', async (event) => {
        await coin.getPriceFromExchages('DASH'); 
    });

    coin.btn_price_exchanges_ltc.off('click').on('click', async (event) => {
        await coin.getPriceFromExchages('LTC'); 
    });

    coin.otherExch_sideModal.on('shown.bs.modal', () => {
        coin.myOtherExchTitle.html(coin.otherExchPrice.network);
        coin.otherExchPrice.prices.forEach( elem => {
             $('#exchanges_list').append('<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">' +
                                '<div class="d-flex w-100 justify-content-between">' + 
                                '<h5 class="mb-1">' + elem.exchange + '</h5><small>' + coin.unix_timestampToDateTime(elem.time) + '</small></div>' + 
                                '<p class="mb-1 text-primary">$' + elem.price + '</p><small>' + elem.price_base + '</small></a>' );                                                     
        } )        
    });

    coin.otherExch_sideModal.on('hide.bs.modal', () => {
        coin.myOtherExchTitle.html("");
        coin.otherExchPrice.prices = [];
        $('#exchanges_list').html("");
    });

    coin.btn_stream.off('click').on('click', async (event) => {
        coin.streamModalLg.modal('show');
    });

    coin.streamModalLg.on('shown.bs.modal', () => {
        
        cryptoCompare = new CryptoCompare();     
    });
}

Coin.prototype.getOrders = async () => {
    btSell  = 0;
    btBuy   = 0;
    btdiff  = 0;
    $.each(['order_created', 'order_changed', 'order_deleted'], function (eventIndex, eventName) {
        coin.ordersChannel.bind(eventName, function (data) {
            if ($('ol li').length > 30) {
                coin.placeholder.find('li:first').remove();
            }

            let cl = "success-color";
            if( data.order_type != 0)
            {
                coin.totalBTCSold += data.amount;
                coin.btc_sales.html( coin.totalBTCSold );
                btSell = coin.totalBTCSold;
                $( "#btc_progress" ).html('<div id="btc_deals_progress" class="progress-bar bg grey darken-3" role="progressbar" style="width:' + coin.totalBTCSold/100  + '%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="1000"></div>');
                coin.prog_percent.html( coin.totalBTCSold/100 );
                cl = "danger-color";
            }
            else
            {
               
                coin.totalBTCBuy += data.amount;
                coin.btc_buy.html( coin.totalBTCBuy );
                $( "#btc_progress2" ).html('<div id="btc_deals_progress2" class="progress-bar bg grey darken-3" role="progressbar" style="width:' + coin.totalBTCBuy/100  + '%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="1000"></div>');
                coin.prog_percent2.html( coin.totalBTCBuy/100 );
                btBuy = coin.totalBTCSold;
            }

            coin.totalBTCDiff = coin.totalBTCBuy - coin.totalBTCSold;
            btdiff = coin.totalBTCDiff;
            $( "#btc_progress3" ).html('<div id="btc_deals_progress3" class="progress-bar bg grey darken-3" role="progressbar" style="width:' + coin.totalBTCSold/100  + '%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="1000"></div>');
            coin.prog_percent3.html( coin.totalBTCDiff/100 );
            coin.btc_diff.html( coin.totalBTCDiff );
            coin.placeholder.append('<li class="text-small ' + cl + '">[' + eventName + '] (' + coin.unix_timestampToDateTime(data.datetime) + ') ' + data.id + ': ' + data.amount + ' BTC @ ' + data.price + ' USD ' + ((data.order_type == 0) ? 'BUY' : 'SELL') + '</li>');

            setTimeout( function(){
                console.log(btSell,btBuy,btdiff);
                coin.saveOrders(btSell,btBuy,btdiff);
            },10000);
        });

        
    });

    
}

Coin.prototype.saveOrders = async (btSell,btBuy,btdiff) =>{

    $.ajax({
        type: "get",
        url: "http://localhost/CFSummit2018/src/cfcs/CoinMarketCap.cfc?method=saveOders&salePrice=" + btSell + "&buyPrice=" + btBuy + "&diffInPrice=" + btdiff ,
        beforeSend: function (xhr) {
          
        },
        async: true
    }).done(function (response) {
       console.log("order saved");

    }).fail(function (xhr) {
        console.log(xhr);
   
    });
}

Coin.prototype.request = (url) => {

    let prom = new Promise( function( resolve, reject ) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response)
                } else {
                    reject(xhr.status)
                }
            }
        }
        xhr.ontimeout = function () {
            reject('timeout')
        }
        xhr.open('get', url, true)
        xhr.send()
    });

    return prom;

}

Coin.prototype.listAllCryptocurrenciesasync = async function(){

    const AllCryptocurrenciesGet = "http://localhost/CFSummit2018/src/cfcs/CoinMarketCap.cfc?method=listAllCryptocurrencies";       
    const Crypto = await coin.request(AllCryptocurrenciesGet);
    coin.arrayOfDataTable = JSON.parse(Crypto);
    coin.renderDataTable( coin.arrayOfDataTable );
}

Coin.prototype.renderDataTable = async function(){

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })
      
    $('#example').DataTable( {
        data: coin.arrayOfDataTable.data,
        destroy: true,
        searching: true,
        lengthChange: false,
        autoWidth: true,
        paging: true,
        pageLength: 10,
        deferRender: true,
        processing: true,
        responsive: true,
        order: ([4, 'asc']),
        columns: [
            { data: 'name' },
            { data: 'symbol' },
            { data: 'price', 
                render: function ( data, type, row ) {
                    if ( row ) {
                        var price = row.quote.USD.price;
                        return formatter.format(price);
                    }
                    return "";
                } 
            },
            { data: 'market_cap', 
                render: function ( data, type, row ) {
                    if ( row ) {
                        var market_cap = row.quote.USD.market_cap;
                        return formatter.format(market_cap);
                    }
                    return "";
                }  
            },
            { data: 'cmc_rank' },
            { data: 'date_added' },
            { data: 'last_updated' },
            { data: 'percent_change_1h', 
                render: function ( data, type, row ) {
                    if ( row ) {
                        var percent_change_1h = row.quote.USD.percent_change_1h;
                        if( percent_change_1h > 0 )
                            return '<i class="fa fa-arrow-circle-up text-success"></i> ' + percent_change_1h;
                        else
                            return '<i class="fa fa-arrow-circle-down text-danger"></i> ' + percent_change_1h;
                    }
                    return "";
                }
            },
            { data: 'percent_change_24h', 
                render: function ( data, type, row ) {
                    if ( row ) {
                        var percent_change_24h = row.quote.USD.percent_change_24h;
                        if( percent_change_24h > 0 )
                            return '<i class="fa fa-arrow-circle-up text-success"></i> ' + percent_change_24h;
                        else
                            return '<i class="fa fa-arrow-circle-down text-danger"></i> ' + percent_change_24h;
                    }
                    return "";
                }  
            },
            { data: 'percent_change_7d', 
                render: function ( data, type, row ) {
                    if ( row ) {
                        var percent_change_7d = row.quote.USD.percent_change_7d;
                        if( percent_change_7d > 0 )
                            return '<i class="fa fa-arrow-circle-up text-success"></i> ' + percent_change_7d;
                        else
                            return '<i class="fa fa-arrow-circle-down text-danger"></i> ' + percent_change_7d;
                    }
                    return "";
                }  
            }
        ]
    } );
}

Coin.prototype.listHistoricalData = async function(){

    let history_year = coin.select_history_year.val();

    if(history_year == null){
        history_year = 2018;
    }

    let previous_year = history_year - 1;
    const historicalDataGet = "http://localhost/CFSummit2018/src/cfcs/CoinMarketCap.cfc?method=listHistoricalData&theYear=" + history_year;
    const historicalDataGet2 = "http://localhost/CFSummit2018/src/cfcs/CoinMarketCap.cfc?method=listHistoricalData&theYear=" + previous_year;       
    const response  = await coin.request(historicalDataGet);
    const response2 = await coin.request(historicalDataGet2);
    const arrayOflistHistoricalData = JSON.parse(response);
    const arrayOflistHistoricalData2 = JSON.parse(response2);

    coin.arrayOfHistoricalPrice = [];
    arrayOflistHistoricalData.forEach(element => {
        let elem = JSON.parse(element);
        if( elem.success){
            if( typeof elem.rates != 'undefined'  )         
                coin.arrayOfHistoricalPrice.push(elem.rates.BTC);
        }else{
           console.log(elem.error.info);
        }
    });

    coin.arrayOfHistoricalPrice2 = [];
    arrayOflistHistoricalData2.forEach(element => {
        let elem = JSON.parse(element);
        if( elem.success){
            if( typeof elem.rates != 'undefined'  )         
                coin.arrayOfHistoricalPrice2.push(elem.rates.BTC);
        }else{
           console.log(elem.error.info);
        }
    });

    coin.renderChart();
}

Coin.prototype.renderChart = async () =>{
      //Main chart
      let history_year = coin.select_history_year.val();

    if(history_year == null){
        history_year = 2018;
    }

    let previous_year = history_year - 1;
      let ctxL = document.getElementById("lineChart").getContext('2d');
      let myLineChart = new Chart(ctxL, {
          type: 'line',
          data: {
              labels: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
              datasets: [{
                  label: "BTC Price for " + history_year,
                  fillColor: "rgba(220,220,220,0.2)",
                  strokeColor: "rgba(220,220,220,1)",
                  pointColor: "rgba(220,220,220,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(220,220,220,1)",
                  backgroundColor: [
                      'rgba(255, 255, 255, 0.2)',
                      'rgba(255, 255, 255, 0.2)',
                      'rgba(255, 255, 255, 0.2)',
                      'rgba(255, 255, 255, 0.2)',
                      'rgba(255, 255, 255, 0.2)',
                      'rgba(255, 255, 255, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 255, 255, 1)',
                      'rgba(255, 255, 255, 1)',
                      'rgba(255, 255, 255, 1)',
                      'rgba(255, 255, 255, 1)',
                      'rgba(255, 255, 255, 1)',
                      'rgba(255, 255, 255, 1)'
                  ],
                  borderWidth: 1,
                  data: coin.arrayOfHistoricalPrice,
              },{
                label: "BTC Price for " + previous_year,
                fillColor: "rgba(151,187,205,0.2)",
                            strokeColor: "rgba(151,187,205,1)",
                            pointColor: "rgba(151,187,205,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            backgroundColor: [
                                'rgba(255, 255, 255, 0.2)',
                                'rgba(255, 255, 255, 0.2)',
                                'rgba(255, 255, 255, 0.2)',
                                'rgba(255, 255, 255, 0.2)',
                                'rgba(255, 255, 255, 0.2)',
                                'rgba(255, 255, 255, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 255, 255, 1)',
                                'rgba(255, 255, 255, 1)',
                                'rgba(255, 255, 255, 1)',
                                'rgba(255, 255, 255, 1)',
                                'rgba(255, 255, 255, 1)',
                                'rgba(255, 255, 255, 1)'
                            ],
                            borderWidth: 1,
                data: coin.arrayOfHistoricalPrice2,
            }]
          },
          options: {
              legend: {
                  labels: {
                      fontColor: "#fff",
                  }
              },
              scales: {
                  xAxes: [{
                      gridLines: {
                          display: true,
                          color: "rgba(255,255,255,.25)"
                      },
                      ticks: {
                          fontColor: "#fff",
                      },
                  }],
                  yAxes: [{
                      display: true,
                      gridLines: {
                          display: true,
                          color: "rgba(255,255,255,.25)"
                      },
                      ticks: {
                          fontColor: "#fff",
                      },
                  }],
              }
          }
      });
}

Coin.prototype.getPriceFromExchages = async (ticker) => {

    $.ajax({
        type: "get",
        url: "https://chain.so/api/v2/get_price/" + ticker + "/USD",
       
        beforeSend: function (xhr) {
          
        },
        async: false
    }).done(function (response) {
      // console.log(response);
      
       coin.otherExchPrice = response.data;
       coin.otherExch_sideModal.modal('show');
        
    }).fail(function (xhr) {
        console.log(xhr);
   
    });

}

Coin.prototype.getSocialStats = async (id) =>{
    const socialstatsGet = "http://localhost/CFSummit2018/src/cfcs/CoinMarketCap.cfc?method=getSocialStats&id="+id;       
    const response = await coin.request(socialstatsGet);
    const socialStatsData = JSON.parse(response);

    socialStatsData.Data.CryptoCompare.SimilarItems.forEach(element => {
        $("#crypto_images").append('<img src="https://www.cryptocompare.com/' + element.ImageUrl + '" class="rounded-circle avatar-img z-depth-1-half" width="50px" height="50px" style="margin:10px">');        
    });

   // $("#img").attr('src', 'https://www.cryptocompare.com/' + socialStatsData.Data.CryptoCompare.SimilarItems[1].ImageUrl);
    console.log(socialStatsData);
}

Coin.prototype.getCryptoNewsFeed = async (dateString) => {
    const cryptoNewsFeedGet = "http://localhost/CFSummit2018/src/cfcs/CoinMarketCap.cfc?method=getCryptoNewsFeed&dateString="+dateString;       
    const response = await coin.request(cryptoNewsFeedGet);
    const cryptoNewsFeedData = JSON.parse(response);
   
   // console.log(cryptoNewsFeedData);

    cryptoNewsFeedData.articles.forEach(element => {
        coin.news_feed.append('<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">' +
        '<div class="d-flex w-100 justify-content-between">' +
          '<h5 class="mb-1">' + element.title + '</h5>' +
          '<small>' + element.publishedAt + '</small>' +
        '</div>' +
       
        '</a></div>');
    });
    /*  '<p class="mb-1">' + element.description + '</p>'+
        '<small>' + element.source.name + '</small>' + */

    
}

Coin.prototype.unix_timestampToDateTime = ( unix_timestamp )  =>  {
    let date = new Date(unix_timestamp*1000);
    let mydate = date.toLocaleString();
    // Hours part from the timestamp
   /* let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    let fulldatetime = mydate + ' ' + formattedTime;*/

    return mydate;
}
