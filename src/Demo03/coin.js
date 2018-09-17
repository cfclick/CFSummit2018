$(document).ready(function () {

    $('.mdb-select').material_select();

    // Small chart
    $(function () {
        $('.min-chart#chart-sales').easyPieChart({
            barColor: "#FF5252",
            onStep: function (from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
    });

    //Main chart
    var ctxL = document.getElementById("lineChart").getContext('2d');
    var myLineChart = new Chart(ctxL, {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "My First dataset",
                fillColor: "#fff",
                backgroundColor: 'rgba(255, 255, 255, .3)',
                borderColor: 'rgba(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45],
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
          $('#sym_btc_cur').html(data.value.symbol + '/' + data.value.price_base );
          
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
      if (data.type == "price" && data.value.exchange=="bitstamp") {
        $('span#csprice_dash').replaceWith('<span id="csprice_dash">$' + data.value.price + ' DASH/'+data.value.price_base+'</span>')
      }
    });

    ticker_zcash.bind('price_update', function(data) {
      // show price updates
      if (data.type == "price" && data.value.exchange=="bitstamp") {
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
        listAllCryptocurrencies();
    });

    function listAllCryptocurrencies(){
        $.ajax({
            type: "get",
            url: "http://shirak-dell/CFSummit2018/src/cfcs/CoinMarketCap.cfc?method=listAllCryptocurrencies",
           
            beforeSend: function (xhr) {
               // $('#sync_result_div').html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i>");
               // $("#total_sync_duration").html("");
            },
            async: true
        }).done(function (response) {
           
          
            console.log(response);
            
        }).fail(function (xhr) {
            console.log(xhr);
       
        });


    }
    


  });