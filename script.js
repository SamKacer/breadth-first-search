google.charts.load('current', {
    'packages': ['geochart', 'table', 'line'],
    'mapsApiKey': 'AIzaSyDfldKhiFoaTFYBAki_9qHQRyjDZvov96o'
});
google.charts.setOnLoadCallback(drawChart);


var isData = false;
var countries = [];
var dailyData = {
    "Albania" : [501, 525, 563, 507, 410, 490, 532],
    "Austria" : [6006, 5704, 3839,9643, 10368, 8962, 7192],
    "Belarus" : [996,983,1038,1057,1098,1167, 1248],
    "Belgium" : [],
    "Bosnia and Herzegovina": [1211, 996, 1605, 1541,1728,1332,1275],
}

var linegraphData = [
    ["Monday", 0],
    ["Tuesday", 0],
    ["Wednesday", 0],
    ["Thursday", 0],
    ["Friday", 0],
    ["Saturday", 0],
    ["Sunday", 0]
]

// Function that gets the data used for visualisation
function getData() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
    data.addColumn('number', 'New Cases (per million)');
    data.addColumn('number', 'New Cases');

    // Temporarily use "fake" data
    data.addRows([
        ["Albania",	1225,	3528.0],
        ["Austria",	5741,	51714.0],
        ["Belarus",	802,	7587.0],
        ["Belgium",	2885,	33439.0],
        ["Bosnia and Herzegovina",	2952,	9688.0],
        ["Bulgaria",	3302,	22950.0],
        ["Croatia",	4175,	17140.0],
        ["Cyprus",	1347,	1180.0],
        ["Czech Republic",	4389,	47009.0],
        ["Denmark",	1182,	6848.0],
        ["Estonia",	915,	1215.0],
        ["Faroe Islands",	40,	2.0],
        ["Finland",	309,	1717.0],
        ["France",	3154,	205894.0],
        ["Germany",	1575,	131998.0],
        ["Greece",	1698,	17701.0],
        ["Hungary",	3244,	31345.0],
        ["Iceland",	360,	123.0],
        ["Ireland",	540,	2671.0],
        ["Isle of Man",	70,	6.0],
        ["Italy",	4003,	242062.0],
        [{v: "XK", f:"Kosovo"},	2685,	5191.0],
        ["Latvia",	1246,	2351.0],
        ["Liechtenstein",	5375,	205.0],
        ["Lithuania",	3918,	10668.0],
        ["Luxembourg",	5511,	3450.0],
        ["Macedonia",	3494,	7280.0],
        ["Malta",	1988,	878.0],
        ["Moldova",	1759,	7097.0],
        ["Montenegro",	6857,	4307.0],
        ["Netherlands",	2218,	38013.0],
        ["Norway",	738,	4001.0],
        ["Poland",	4478,	169478.0],
        ["Portugal",	3699,	37726.0],
        ["Romania",	2920,	56186.0],
        ["Russia",	1023,	149417.0],
        ["Serbia",	3005,	20451.0],
        ["Slovakia",	2179,	11900.0],
        ["Slovenia",	4738,	9851.0],
        ["Spain",	2775,	129759.0],
        ["Sweden",	2050,	20701.0],
        ["Switzerland",	5203,	45026.0],
        ["Ukraine",	1697,	74242.0],
        ["United Kingdom",	2547,	172915.0],
        
    ]);
    return data;
}


// callback function to draw charts
function drawChart() {
    data = getData();
    drawMap(data);
    drawTable(data);
    drawLineGraph();
}


function updateLineGraph(country, newData){

    // update the data for the row depending on the status of the line graph

    // if no country has been clicked yet
    if(countries.length == 0) {
        countries.push(country)
        for(var i=0; i< linegraphData.length; i++) {
            linegraphData[i][1] = newData[i];
        }
    }

    // if only one country has been clicked
    else if(countries.length == 1){
        countries.push(country);
        for(var i=0; i< linegraphData.length; i++) {
            linegraphData[i].push(newData[i]);
        }
    }

    // if two countries have already been selected
    else {
        countries.shift(); // remove first country
        countries.push(country);
        for(var i=0; i< linegraphData.length; i++) {
            linegraphData[i].splice(1,1);
            linegraphData[i].push(newData[i]);
        }
    }


    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Day of the Week');
    for(var i=0; i<countries.length; i++) {
        data.addColumn('number', countries[i]);
    }

    data.addRows(linegraphData);

    var options = {
        chart: {
            title: 'Daily Reported Cases in Countries',
            subtitle: 'For week 09/11/2020 - 15/11/2020'
        },
        crosshair:{ 
            trigger: "both",
            orientation: 'vertical' 
        },
        width: 900,
        height: 500
    };

    var chart = new google.charts.Line(document.getElementById('linechart_material'));

    chart.draw(data, google.charts.Line.convertOptions(options));

}

function drawLineGraph() {
    var data = new google.visualization.DataTable();
      data.addColumn('string', 'Day of the Week');
      data.addColumn('number', 'None');
      

      data.addRows(linegraphData);

      var options = {
        chart: {
          title: 'Daily Reported Cases in Countries',
          subtitle: 'For week 09/11/2020 - 15/11/2020'
        },
        crosshair:{ 
            trigger: "both",
            orientation: 'vertical' 
        },
        width: 900,
        height: 500
      };

      var chart = new google.charts.Line(document.getElementById('linechart_material'));

      chart.draw(data, google.charts.Line.convertOptions(options));
  }


// helper function used to draw map
function drawMap(data) {
    var map_options = {
        region: 150,
        colorAxis: {colors: ['ffdb00', 'ffa904', 'ee7b06']}
    };
    var geoChart = new google.visualization.GeoChart(document.getElementById('map_div'));
    

    // inline function to setup the selection behaviour
    function selectHandler() {
        var selectedItem = geoChart.getSelection()[0];
        if (selectedItem) {
            var country = data.getValue(selectedItem.row, 0);
            if(country == "XK"){
                country = "Kosovo";
            }

            d = dailyData[country];
            if(d == null){
                d = [5784, 4096, 3817, 4935, 5839, 6653, 6602];
            } 
            updateLineGraph(country, d);

            /*
            var str = '<p>' + country + ': ' + perMillion + ' new cases per million';
            var str2 = '<br> ' + newCases + ' new cases total</p>';
            div = document.getElementById('output');
            div.insertAdjacentHTML('beforeend', str + str2);
            */
        }
    }

    google.visualization.events.addListener(geoChart, 'select', selectHandler)
    geoChart.draw(data, map_options);
}

// function to display the data in a tabular format
function createTable(tableData) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
  
    tableData.forEach(function(rowData) {
        var row = document.createElement('tr');

        rowData.forEach(function(cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
  
    table.appendChild(tableBody);
    document.body.appendChild(table);
}


// helper function to fraw table
function drawTable(data) {
    var table_options = {
        showRowNumber: false, 
        width: '100%', 
        height: '100%', 
        pageSize: 15, 
        sortColumn: 1, 
        sortAscending: false
    };
    var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(data, table_options);
}
