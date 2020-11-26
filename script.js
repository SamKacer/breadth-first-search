google.charts.load('current', {
    'packages': ['geochart', 'table'],
    'mapsApiKey': 'AIzaSyDfldKhiFoaTFYBAki_9qHQRyjDZvov96o'
});
google.charts.setOnLoadCallback(drawChart);

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
        ["Bosnia and Herzegovina",	2952.925,	9688.0],
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
}



// helper function used to draw map
function drawMap(data) {
    var map_options = {
        region: 150,
        colorAxis: {colors: ['ffdb00', 'ffa904', 'ee7b06']}
    };
    var geoChart = new google.visualization.GeoChart(document.getElementById('map_div'));
    geoChart.draw(data, map_options);
}

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
