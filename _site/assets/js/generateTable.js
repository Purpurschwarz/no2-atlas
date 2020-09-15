// generating the results table from json data
// only for table in ergebnisse.html
                
function createTable() {
                    
    document.getElementById("tabelleAnzeigenButton").style.display = "none";
    document.getElementById("tabelleEinblendenButton").style.display = "none";
    document.getElementById("tabelleAusblendenButton").style.display = "block";
    document.getElementById("resultsTable").style.display = "block";
    var tableCount = 0;

    // http request
    let requestUrl = "https://raw.githubusercontent.com/Purpurschwarz/no2-atlas/master/assets/new.json";
    let request = new XMLHttpRequest();
    request.open("GET", requestUrl);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        const json = request.response; 
        makeTable(json);
    }

    // creating the table and filling it with data from an Rest-API
    function makeTable(json) {

        //making the table be rendered only once
        if(tableCount === 0) {

        // creating the table
        var table = document.createElement('table');
        table.setAttribute("class", "sortierbar");
        
        // creating tableheads with class "sortierbar" for sorting
        var tableheads = ["Straße", "Hausnr.", "", "", "", "Breite", "Länge", "von", "bis", "Ort", "Kampagne", "Wert", "Sammler"]
        var thead = document.createElement("thead");
        var tr = document.createElement('tr');
        var span = document.createElement('span');
        span.setAttribute("class", "block");
        for(let h=0; h<tableheads.length; h++) {
            var th = document.createElement('th')
            var span = document.createElement('span');
            span.setAttribute("class", "block");
            th.innerHTML = tableheads[h] + "△▽";
            th.appendChild(span);
            th.setAttribute("class", "sortierbar")
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        table.appendChild(thead);

        var tbody = document.createElement("tbody");

        // iterating through the places
        for(var i=0; i<json.places.length; i++) {

            // iterating through the different measurements in the same place
            for(var j=0; j<json.places[i].measurements.length; j++) {
                var tr = document.createElement('tr');

                    // creating the first columns with the data of the place
                    for(var k=0; k<7; k++) {
                        
                        var td = document.createElement('td');
                        td.innerHTML = Object.values(json.places[i])[k];
                        tr.appendChild(td);
                    }

                    // creating the other columns with the data of the measurements
                    for(var l=0; l<6; l++) {
                        var td = document.createElement('td');
                        td.innerHTML = Object.values(json.places[i].measurements[j])[l];
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
            }
        
            
        }
        table.appendChild(tbody);
        document.getElementById('resultsTable').appendChild(table);
        new JB_tableSort(table);
        tableCount++;

        }
    }

}

function hideTable() {
    document.getElementById("tabelleAnzeigenButton").style.display = "none";
    document.getElementById("tabelleEinblendenButton").style.display = "block";
    document.getElementById("tabelleAusblendenButton").style.display = "none";
    document.getElementById("resultsTable").style.display = "none";
}

function showTable() {
    document.getElementById("tabelleEinblendenButton").style.display = "none";
    document.getElementById("tabelleAusblendenButton").style.display = "block";
    document.getElementById("resultsTable").style.display = "block";
}


// enabling tabs on videos site

function selectTab(tabname) {

    // making all tabs darkgrey (not selectet)
    var tabIds = ['Vorstellung', 'Hintergrund', 'Teilnahme', 'Messergebnis', 'Bisher', 'Sonstiges'];
    for(var i = 0; i < 5; i++) {
        y = document.getElementById(tabIds[i]);
        y.classList.replace('isSelected', 'isNotSelected');
    }

    // making the selected tab lightgrey (selected)
    document.getElementById(tabname).setAttribute("class", "isSelected");

    // displaying / hiding the corresponding videos
    var videoIds = ['video0', 'video1-1', 'video1-2', 'video1-3', 'video2-2', 'video3-1', 'video3-2', 'video4-1', 'video4-2', 'Sonstiges-Videos'];
    for(var j = 0; j < 10; j++) {
        document.getElementById(videoIds[j]).style.display = "none";
    }
    switch(tabname) {
        case 'Vorstellung':
            document.getElementById('video0').style.display = "block";
            break;
        case 'Hintergrund':
            document.getElementById('video1-1').style.display = "block";
            document.getElementById('video1-2').style.display = "block";
            document.getElementById('video1-3').style.display = "block";
            break;
        case 'Teilnahme':
            document.getElementById('video2-2').style.display = "block";
            break;
        case 'Messergebnis':
            document.getElementById('video3-1').style.display = "block";
            document.getElementById('video3-2').style.display = "block";
            break;
        case 'Bisher':
            document.getElementById('video4-1').style.display = "block";
            document.getElementById('video4-2').style.display = "block";
            break;
        case 'Sonstiges':
            document.getElementById('Sonstiges-Videos').style.display = "block";
            break;

    }
}



