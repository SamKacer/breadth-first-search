google.charts.load('current', {
    'packages': ['geochart', 'table', 'line'],
    'mapsApiKey': 'AIzaSyDfldKhiFoaTFYBAki_9qHQRyjDZvov96o'
});
google.charts.setOnLoadCallback(drawChart);


var isData = false;
var countries = [];
// for selection handler
var lastSelection = null;
var dummyLinegraphData = [
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

    
    const rows = Object.entries(realData).map( ([country, countryData]) => {
        const latestData = countryData.map(xs => xs[xs.length - 1]);
        return [country, latestData[0], latestData[2]];
    });
    console.log(rows[0]);
    data.addRows(rows);
    return data;
}


// callback function to draw charts
function drawChart() {
    data = getData();
    drawMap(data);
    drawTable(data);
    drawDummyLineGraph();
}


// format data for line graph for selected countries  and provided country data
function formatLinegraphData(){
    result  = [["Monday"], ["Tuesday"], ["Wednesday"], ["Thursday"], ["Friday"], ["Saturday"], ["Sunday"]];
countries.forEach(country => {
countryData = realData[country][0];
if(countryData == null){
    countryData = [5784, 4096, 3817, 4935, 5839, 6653, 6602];
} 
result.forEach((dayList, i) => {
dayList.push(countryData[i]);
});
});
return result;
}

function updateLineGraph(country){

    // if country not in countries then add it, otherwise remove it
    if(countries.includes(country)) {
        countries = countries.filter(c => c != country);
    } else {
        countries.push(country);
    }

    //if no countries selected, just draw dummy line graph
    if(countries.length == 0){
        drawDummyLineGraph();
        return;
    }
    
    var countryData = formatLinegraphData();
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Day of the Week');
    for(var i=0; i<countries.length; i++) {
        data.addColumn('number', countries[i]);
    }

    data.addRows(countryData);

    var options = {
        chart: {
            title: 'Daily Reported Cases in Countries per Million',
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

function drawDummyLineGraph() {
    var data = new google.visualization.DataTable();
      data.addColumn('string', 'Day of the Week');
      data.addColumn('number', 'None');
      

      data.addRows(dummyLinegraphData);

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
        if (selectedItem == null) {
            if(lastSelection == null) {
                console.log("didnt expect lastSelection to be null");
                return;
            }
            selectedItem = lastSelection;
        } else {
            lastSelection = selectedItem;
        }
        var country = data.getValue(selectedItem.row, 0);
        if(country == "XK"){
            country = "Kosovo";
        }
        updateLineGraph(country);

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
