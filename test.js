
<script src="https://code.jquery.com/jquery-3.4.1.min.js" type="text/javascript"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.5.3/d3.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/topojson/1.6.9/topojson.min.js"></script>
<script src="http://nyuad.me/datamaps.world.min.js"></script>
<div class="container text-center" style="padding:15px 0px;">
    
    <button type="button"  id="urlChanger" class="btn btn-primary w-100" style="word-wrap: break-word;color:black;">Click here to request positive Malaria diagnosis datapoints</button>
   
</div>
<div id="mapID" style="position: relative; width: 100%; height: 10%;"></div>

<script>
    //var map = new Datamap({element: document.getElementById('mapID')});
    
    var pathways = [];
function airportCodeToLocation(code) {
    var airportCodes = ["AUH","DXB","BOS","AKB","AKU","AMS","AEX","CCU","ADL","ABV","YLW","MCT","GAN","MLE","BDO","BPT","CPT"];
    var strokeWidth = 3;
    var arc = true;
   // var styling = ;
    var locations =[{"latitude": 24.4393782,"longitude": 54.6539986},
               {"latitude": 25.2514169,"longitude": 55.3685408939522},
               {"latitude": 28.2101136,"longitude": 83.6799872944477},
               {"latitude": 35.4546013,"longitude": 139.4499969},
               {"latitude": 41.2622137,"longitude": 80.2919775},
               {"latitude": 5.60257425,"longitude": -0.187675842619238},
                {"latitude": 31.32927365,"longitude": -92.5409237515579},
                {"latitude": 22.6564148,"longitude": 88.44614133761},
               {"latitude": -34.9367719,"longitude": 138.5387068},
                {"latitude": 9.00706695,"longitude": 7.26514987293491},
               {"latitude": 49.951334,"longitude": -119.381027763473},
                {"latitude": 23.5987194,"longitude": 58.2891469370507},
                {"latitude": 38.9611497,"longitude": 121.535413},
                {"latitude": 4.1912793,"longitude": 73.5290459},
                {"latitude": 14.5000233,"longitude": 120.9964705},
                {"latitude": 43.3392887,"longitude": 21.8567161},
                {"latitude": -33.97109385,"longitude": 18.6020542427743}];
    for (i = 0; i < airportCodes.length; i++) {
        if(code==airportCodes[i]) {
            return locations[i];
        }
    }
}


// Arcs coordinates can be specified explicitly with latitude/longtitude,
// or just the geographic center of the state/country.
    /*
arsssscs.arc([
  {
    origin: 'LK',
    destination: 'TX'
  },
  {
    origin: 'OR',
    destination: 'TX'
  },
  {
    origin: 'NY',
    destination: 'TX'
  },
  {
      origin: {
          latitude: 40.639722,
          longitude: -73.778889
      },
      destination: "SRI"
  },
  {
      origin: {
          latitude: 30.194444,
          longitude: -97.67
      },
      destination: {
          latitude: 25.793333,
          longitude: -80.290556
      },
      options: {
        strokeWidth: 5,
        strokeColor: 'green',
        greatArc: true
      }
  },
  {
      origin: {
          latitude: 39.861667,
          longitude: -104.673056
      },
      destination: {
          latitude: 35.877778,
          longitude: -78.7875
      }
  }
],  {strokeWidth: 1, arcSharpness: 1.4}); */
</script>
<script>
    
    function runCounter() {
       
    $('.counter').each(function () {
                $(this).prop('Counter',0).animate({
                        Counter: $(this).text()
                }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                                $(this).text(Math.ceil(now) + " datapoints");
                        }
                });
            });
    }
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
     function loadData(url) {
         
         
//sleep(1000);
$.getJSON(url, function(jArr) {
    
        tableData="<div class='row' style='padding:2px;'>";
    
    $(".counter").text("0");
    $(".counter").text(jArr.length);
    runCounter();
$.each(jArr, function(index, data) {
 tableData += "<div class='col-xs-6 col-sm-3'><ul class='list-group text-center'><li class='list-group-item'><span><mark><strong>Unique identifier</mark></strong> <br/>"+data.identifier+"</span></li>"+"<li class='list-group-item'><span><mark><strong>Nationality</mark></strong> <br/><span>"+data.nationality+'</span></li>'+"<li class='list-group-item'><span><mark><strong>Airport Code</mark></strong> <br/><span>"+data.airportcode+'</span></li>'+"<li class='list-group-item'><span><mark><strong>Departure Airport Code</mark></strong> <br/><span>"+data.fromairportcode+'</span></li>'+"<li class='list-group-item'><span><mark><strong>Destination Airport Code</mark></strong> <br/><span>"+data.toairportcode+'</span></li>'+"<li class='list-group-item'><span><mark><strong>Malaria Diagnosis (0 or 1)</mark></strong> <br/><span>"+data.malaria+'</span></li>'+"<li class='list-group-item'><span><mark><strong>Hepatitis B Diagnosis (0 or 1)</mark></strong> <br/><span>"+data.hepatitisb+'</span></li>'+"<li class='list-group-item'><span><mark><strong>Whooping Cough Diagnosis (0 or 1)</mark></strong> <br/><span>"+data.whoopingcough+'</span></li>'+"<li class='list-group-item'><span><mark><strong>Tuberculosis Diagnosis (0 or 1)</mark></strong> <br/><span>"+data.tuberculosis+'</span></li>'+"<li class='list-group-item'><span><mark><strong>Plague Diagnosis (0 or 1)</mark></strong> <br/><span>"+data.plague+'</span></li>'+'</ul><br/></div>';
    var color = "green";
    if((data.malaria>0)||(data.hepatitisb>0)||(data.whoopingcough>0)||(data.tuberculosis>0)||(data.plague>0)) {
        color ="red";
    }
    pathways.push({origin:airportCodeToLocation(data.fromairportcode,"none"),destination:airportCodeToLocation(data.toairportcode,"red"), options: {
        strokeWidth: 1.2,
        strokeColor: color,
        greatArc: true
      }});
    
});
tableData+="</div>";

$('#data-table').html(tableData);
   // alert(JSON.stringify(pathways));
    //start map
    $('#mapID').html("");
     $("#mapID").slideDown( "slow", function() {{
    // Animation complete.
  }});
    var arcs = new Datamap({
  element: document.getElementById("mapID"),
  scope: 'world',
 responsive: true,
  fills: {
    defaultFill: "#fdcc52",
    win: '#0fa0fa'
  },
  data: {
    'TX': { fillKey: 'win' },
    'FL': { fillKey: 'win' },
    'NC': { fillKey: 'win' },
    'CA': { fillKey: 'win' },
    'NY': { fillKey: 'win' },
    'CO': { fillKey: 'win' }
  }
});
   
    arcs.arc(pathways);
    
    pathways =[];
    
    //end map
//alert(JSON.stringify(pathways))
    });
    }
</script>
<style>
    .list-group-item {
        word-wrap: break-word;
    }
</style>

<h1 style="color:white;" class="text-center"><div class="counter" ></div></h1>
<script>
    $( document ).ready(function() {
     loadData('https://igem-nyuad-api.herokuapp.com/request/');
});
       var arrayURLs = ['https://igem-nyuad-api.herokuapp.com/request/','https://igem-nyuad-api.herokuapp.com/request/by/disease/malaria','https://igem-nyuad-api.herokuapp.com/request/by/disease/hepatitisB','https://igem-nyuad-api.herokuapp.com/request/by/disease/whoopingCough','https://igem-nyuad-api.herokuapp.com/request/by/disease/tuberculosis','https://igem-nyuad-api.herokuapp.com/request/by/disease/plague','https://igem-nyuad-api.herokuapp.com/request/by/nationality/NZ'];
    var buttonInfo =["positive Malaria diagnosis datapoints","positive Hepatitis B diagnosis datapoints","positive Whooping Cough diagnosis datapoints","positive Tuberculosis diagnosis datapoints","positive Plague diagnosis datapoints","by nationality country being New Zealand","all datapoints"];
    var currentInfo =["Currently requesting all the data from the Volatect API.","Currently requesting all the data where malaria has been tested positive","Currently requesting all the data where Hepatitis B has been tested positive","Currently requesting all the data where Whooping Cough has been tested positive","Currently requesting all the data where Tuberculosis has been tested positive","Currently requesting all the data where Plague has been tested positive","Currently requesting all the data where nationality country is New Zealand"]
    
    var current_url_number = 0;
    $('#urlChanger').click(function(){
        $( "#mapID" ).slideUp( "slow", function() {
    // Animation complete.
  });
        $(".counter").text("");
    //alert("clicked");
        $('#data-table').html("<div class='w-100' class='text-center'><img src='https://2019.igem.org/wiki/images/a/ab/T--NYU_Abu_Dhabi--loaderyo.gif' class='img-fluid text-center'/></div>");
    current_url_number = (current_url_number + 1) % arrayURLs.length;
   // alert(arrayURLs[current_url_number]);
        $("#urlChanger").text("Click here to request " + buttonInfo[current_url_number]);
        $("#easyInfo").html();
    $("#urlHolder").html("<u>Request URL:</u> <a target='_blank' href='" + arrayURLs[current_url_number] + "'>" + arrayURLs[current_url_number] + "</a><br/>" + "<u>Info: </u>" + currentInfo[current_url_number]);
        
        setTimeout(function(){
            loadData(arrayURLs[current_url_number]);
        }, 2000);
         
    
    
});
   </script>
<div class="w-100 text-center" id="data-table"></div>