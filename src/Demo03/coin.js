function Coin(){
    //coin = constructor();
    coin = this;
    this.arrayOfDataTable = [];
    this.arrayOfHistoricalPrice = [];

    this.load_data_btn          = $('#load_data_btn');
    this.placeholder            = $('#orders_placeholder');
    this.news_sideModalTR       = $('#news_sideModalTR');
    this.select_history_year    = $('#select_history_year');
    
    this.pusher_02              = new Pusher('de504dc5763aeef9ff52');
    this.ordersChannel          = this.pusher_02.subscribe('live_orders');

    Pusher.host                 = 'slanger1.chain.so'; // our server
    Pusher.ws_port              = 443; // our server's port
    Pusher.wss_port             = 443; // ...
    
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
        await f1.listAllCryptocurrenciesasync().then( f1.renderDataTable() ); 
    })(this);

    
    this.loadHistoricalData( this );

   // this.loadHistoricalData();
    this.getOrders();
    this.setEventListener();

}

Coin.prototype.setEventListener = function(){

    coin = this;
    coin.ticker_btc.bind('price_update', function(data) {
        // show price updates
        if (data.type == "price" && data.value.exchange=="bitstamp") {
          $('span#csprice').replaceWith('<span id="csprice">$' + data.value.price + ' ' + data.value.price_base+'</span>')
          $('#time_updated_btc').html('Last Time updated: ' + data.value.time );
          $('#sym_btc_cur').html(data.value.symbol );         
        }
    });

    
    coin.ticker_ltc.bind('price_update', function(data) {
        // show price updates
        if (data.type == "price" && data.value.exchange=="bitstamp") {
          $('#time_updated_ltc').html('Last Time updated: ' + data.value.time );
          $('span#csprice_ltc').replaceWith('<span id="csprice_ltc">$' + data.value.price + ' ' +  data.value.price_base+'</span>')
        }
      });
  
      coin.ticker_dash.bind('price_update', function(data) {
        // show price updates
        if (data.type == "price" && data.value.exchange=="bitfinex") {
            $('#time_updated_dash').html('Last Time updated: ' + data.value.time );
          $('span#csprice_dash').replaceWith('<span id="csprice_dash">$' + data.value.price + ' ' +  data.value.price_base+'</span>')
        }
      });
  
      coin.ticker_zcash.bind('price_update', function(data) {
        // show price updates
        if (data.type == "price" && data.value.exchange=="bitfinex") {
            $('#time_updated_zec').html('Last Time updated: ' + data.value.time );
          $('span#csprice_zcash').replaceWith('<span id="csprice_zcash">$' + data.value.price + ' ' +  data.value.price_base+'</span>')
        }
      });
  
      coin.ticker_dogecoin.bind('price_update', function(data) {
        // show price updates
        if (data.type == "price" && data.value.exchange=="bitstamp") {
            $('#time_updated_doge').html('Last Time updated: ' + data.value.time );
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
    
    
    coin.load_data_btn.off('click').on('click', () => {
       
        (async (f1) => {
            await f1.listAllCryptocurrenciesasync().then( f1.renderDataTable() ); 
        })(this);

    });

    coin.select_history_year.off('change').on('change', (event) =>{
        
        coin.loadHistoricalData( coin );
        
    });

}

Coin.prototype.loadHistoricalData = async (f2) => {

        await f2.listHistoricalData().then( f2.renderChart() ); 
}

Coin.prototype.getOrders = function(){

    $.each(['order_created', 'order_changed', 'order_deleted'], function (eventIndex, eventName) {
        coin.ordersChannel.bind(eventName, function (data) {
            if ($('ol li').length > 30) {
                coin.placeholder.find('li:first').remove();
            }
            coin.placeholder.append('<li>[' + eventName + '] (' + data.datetime + ') ' + data.id + ': ' + data.amount + ' BTC @ ' + data.price + ' USD ' + ((data.order_type == 0) ? 'BUY' : 'SELL') + '</li>');
        });
    });

}

Coin.prototype.listAllCryptocurrenciesasync = async function(){
    $.ajax({
        type: "get",
        url: "http://localhost/CFSummit2018/src/cfcs/CoinMarketCap.cfc?method=listAllCryptocurrencies",
       
        beforeSend: function (xhr) {
          
        },
        async: false
    }).done(function (response) {
       
        coin.arrayOfDataTable = JSON.parse(response);
       
        
    }).fail(function (xhr) {
        console.log(xhr);
   
    });
}

Coin.prototype.renderDataTable = async function(){
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
        order: ([2, 'price']),
        columns: [
            { data: 'name' },
            { data: 'symbol' },
            { data: 'price', 
                render: function ( data, type, row ) {
                    if ( row ) {
                        var price = row.quote.USD.price;
                        return price;
                    }
                    return "";
                } 
            },
            { data: 'market_cap', 
                render: function ( data, type, row ) {
                    if ( row ) {
                        var market_cap = row.quote.USD.market_cap;
                        return market_cap;
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
    console.log(history_year);
    $.ajax({
        type: "get",
        url: "http://localhost/CFSummit2018/src/cfcs/CoinMarketCap.cfc?method=listHistoricalData&theYear=" + history_year,
       
        beforeSend: function (xhr) {
          
        },
        async: false
    }).done(function (response) {
        coin.arrayOfHistoricalPrice = [];
        let arrayOflistHistoricalData = JSON.parse(response);
        
        arrayOflistHistoricalData.forEach(element => {
            let elem = JSON.parse(element);
           // console.log(elem.rates);
           if( elem.success){
                if( typeof elem.rates != 'undefined'  )         
                    coin.arrayOfHistoricalPrice.push(elem.rates.BTC);
           }else{
               console.log(elem.error.info);
           }
            

            return coin.arrayOfHistoricalPrice;
        });
        
    }).fail(function (xhr) {
        console.log(xhr);
   
    });


}

Coin.prototype.renderChart = async function( historyList ){
      //Main chart
      let history_year = coin.select_history_year.val();

    if(history_year == null){
        history_year = 2018;
    }
      let ctxL = document.getElementById("lineChart").getContext('2d');
      let myLineChart = new Chart(ctxL, {
          type: 'line',
          data: {
              labels: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
              datasets: [{
                  label: "BTC Price for " + history_year,
                  fillColor: "#fff",
                  backgroundColor: 'rgba(255, 255, 255, .3)',
                  borderColor: 'rgba(255, 99, 132)',
                  data: coin.arrayOfHistoricalPrice,
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

/*
$(document).ready(function () {


    let arrayOfDataTable = [];

    loadAllCrypto();
    listHistoricalData();

    $('.mdb-select').material_select();

    

    $(function () {
        var placeholder = $('#orders_placeholder'),
            pusher = new Pusher('de504dc5763aeef9ff52'),
            ordersChannel = pusher.subscribe('live_orders');

        $.each(['order_created', 'order_changed', 'order_deleted'], function (eventIndex, eventName) {
            ordersChannel.bind(eventName, function (data) {
                if ($('ol li').length > 30) {
                    placeholder.find('li:first').remove();
                }
                placeholder.append('<li>[' + eventName + '] (' + data.datetime + ') ' + data.id + ': ' + data.amount + ' BTC @ ' + data.price + ' USD ' + ((data.order_type == 0) ? 'BUY' : 'SELL') + '</li>');
            });
        });
    });

    
    
    Pusher.host = 'slanger1.chain.so'; // our server
    Pusher.ws_port = 443; // our server's port
    Pusher.wss_port = 443; // ...
    
    // create the pusher client connection
    var pusher = new Pusher('e9f5cc20074501ca7395', { encrypted: true, disabledTransports: ['sockjs'], disableStats: true });
    
    // subscribe to the channel for BTC/USD updates
    var ticker_btc = pusher.subscribe('ticker_btc_usd');
    var ticker_update_btc = pusher.subscribe('blockchain_update_btc');
    var ticker_ltc = pusher.subscribe('ticker_ltc_usd');
    var ticker_dash = pusher.subscribe('ticker_dash_usd');
    var ticker_zcash = pusher.subscribe('ticker_zec_usd');
    var ticker_dogecoin = pusher.subscribe('ticker_dogecoin_usd');
    
    ticker_btc.bind('price_update', function(data) {
        // show price updates
        if (data.type == "price" && data.value.exchange=="bitstamp") {
          $('span#csprice').replaceWith('<span id="csprice">$' + data.value.price + ' ' + data.value.price_base+'</span>')
          $('#time_updated_btc').html('Last Time updated: ' + data.value.time );
          $('#sym_btc_cur').html(data.value.symbol );
          
        }
    });
    
        ticker_update_btc.bind('tx_update', function(data) {
        if (data.type == "tx") {
            // update an HTML div or span with the new content, for e.g.: data.value.blockhash
            $('#btc_updates').html('total inputs:' + data.value.total_inputs + ' sent value:' + data.value.sent_value);
           
        }
        });    
    
    ticker_ltc.bind('price_update', function(data) {
      // show price updates
      if (data.type == "price" && data.value.exchange=="bitstamp") {
        $('span#csprice_ltc').replaceWith('<span id="csprice_ltc">$' + data.value.price + ' LTC/'+data.value.price_base+'</span>')
      }
    });

    ticker_dash.bind('price_update', function(data) {
      // show price updates
      if (data.type == "price" && data.value.exchange=="bitfinex") {
        $('span#csprice_dash').replaceWith('<span id="csprice_dash">$' + data.value.price + ' DASH/'+data.value.price_base+'</span>')
      }
    });

    ticker_zcash.bind('price_update', function(data) {
      // show price updates
      if (data.type == "price" && data.value.exchange=="bitfinex") {
        $('span#csprice_zcash').replaceWith('<span id="csprice_zcash">$' + data.value.price + ' ZEC/'+data.value.price_base+'</span>')
      }
    });

    ticker_dogecoin.bind('price_update', function(data) {
      // show price updates
      if (data.type == "price" && data.value.exchange=="bitstamp") {
        $('span#csprice_dogecoin').replaceWith('<span id="csprice_dogecoin">$' + data.value.price + ' DOGE/'+data.value.price_base+'</span>')
      }
    });

    $('#load_data_btn').off('click').on('click', () => {
       
        loadAllCrypto();

    });

    async function loadAllCrypto(){
        await listAllCryptocurrencies();
        renderDataTable();
    }

    async function listAllCryptocurrencies(){
        $.ajax({
            type: "get",
            url: "http://localhost/CFSummit2018/src/cfcs/CoinMarketCap.cfc?method=listAllCryptocurrencies",
           
            beforeSend: function (xhr) {
              
            },
            async: false
        }).done(function (response) {
           
            arrayOfDataTable = JSON.parse(response);

           // console.log(theData.data);

            
            
        }).fail(function (xhr) {
            console.log(xhr);
       
        });


    }

    async function renderDataTable(){
        $('#example').DataTable( {
            data: arrayOfDataTable.data,
            destroy: true,
            searching: true,
            lengthChange: false,
            autoWidth: true,
            paging: true,
            pageLength: 10,
            deferRender: true,
            processing: true,
            responsive: true,
            order: ([2, 'price']),
            columns: [
                { data: 'name' },
                { data: 'symbol' },
                { data: 'price', 
                    render: function ( data, type, row ) {
                        if ( row ) {
                            var price = row.quote.USD.price;
                            return price;
                        }
                        return "";
                    } 
                },
                { data: 'market_cap', 
                    render: function ( data, type, row ) {
                        if ( row ) {
                            var market_cap = row.quote.USD.market_cap;
                            return market_cap;
                        }
                        return "";
                    }  
                }
            ]
        } );
    }
    

    async function listHistoricalData(){
        $.ajax({
            type: "get",
            url: "http://localhost/CFSummit2018/src/cfcs/CoinMarketCap.cfc?method=listHistoricalData",
           
            beforeSend: function (xhr) {
              
            },
            async: false
        }).done(function (response) {
           
            let arrayOflistHistoricalData = JSON.parse(response);
            let arrayOfHistoricalPrice = [];
            arrayOflistHistoricalData.forEach(element => {
                let elem = JSON.parse(element);
                arrayOfHistoricalPrice.push(elem.rates.BTC);

            });

            console.log(arrayOfHistoricalPrice);

            //Main chart
            var ctxL = document.getElementById("lineChart").getContext('2d');
            var myLineChart = new Chart(ctxL, {
                type: 'line',
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July","August","September"],
                    datasets: [{
                        label: "BTC Price for 2018",
                        fillColor: "#fff",
                        backgroundColor: 'rgba(255, 255, 255, .3)',
                        borderColor: 'rgba(255, 99, 132)',
                        data: arrayOfHistoricalPrice,
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
            
        }).fail(function (xhr) {
            console.log(xhr);
       
        });


    }

  });*/