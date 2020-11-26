google.charts.load('current', {
    'packages': ['geochart', 'table'],
    'mapsApiKey': 'AIzaSyDfldKhiFoaTFYBAki_9qHQRyjDZvov96o'
});
google.charts.setOnLoadCallback(drawChart);

// Function that gets the data used for visualisation
function getData() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
    data.addColumn('number', 'New Deaths (per million)');
    data.addColumn('number', 'New Deaths');

    // Temporarily use "fake" data
    data.addRows([
        ["Albania",	19.111,	55.0],
        ["Austria",	34,	311.0],
        ["Belarus",	3,	35.0],
        ["Belgium",	108, 1261.0],
        ["Bosnia and Herzegovina", 111, 367.0],
        ["Bulgaria", 66, 459.0],
        ["Croatia",	61,	254.0],
        ["Cyprus",	13,	12.0],
        ["Czech Republic",	128, 1377.0],
        ["Denmark",	2, 17.0],
        ["Estonia",	5, 7.0],
        ["Faroe Islands", 0, 0.0],
        ["Finland",	1,	7.0],
        ["France",	62,	4077.0],
        ["Germany",	14,	1196.0],
        ["Greece",	27,	286.0],
        ["Hungary",	68,	659.0],
        ["Iceland",	20,	7.0],
        ["Ireland",	6, 33.0],
        ["Isle of Man",	11,	1.0],
        ["Italy", 59, 3620.0],
        [{v: "XK", f:"Kosovo"}, 33,	65.0],
        ["Latvia", 13, 25.0],
        ["Lithuania", 23, 63.0],
        ["Luxembourg", 54, 34.0],
        ["Macedonia", 82, 171.0],
        ["Malta",	52,	23.0],
        ["Moldova",	28,	115.0],
        ["Montenegro",	82,	52.0],
        ["Netherlands",	28,	482.0],
        ["Norway",	1,	9.0],
        ["Poland",	63,	2409.0],
        ["Portugal", 44,	457.0],
        ["Romania",	53,	1020.0],
        ["Russia",	17,	2583.0],
        ["Serbia",	16,	109.0],
        ["Slovakia", 29, 159.0],
        ["Slovenia", 58, 122.0],
        ["Spain", 41, 1936.0],
        ["Sweden", 5, 52.0],
        ["Switzerland",	63,	552.0],
        ["Ukraine",	27,	1196.0],
        ["United Kingdom",	42,	2878.0]
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
        colorAxis: {colors: ['ffdb00', 'ffa904', 'ee7b06'],
        
        }
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
