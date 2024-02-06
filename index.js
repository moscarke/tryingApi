const app = require('express')();
const httpRequest = require('request');
const https = require('https');

function getRoutes(){
	return new Promise(function(resolve){
		let parsed, rawData = "";

		const url = "https://rt.data.gov.hk/v2/transport/citybus/company/ctb";

		https.get(url, function (raw){
			//const list = raw.split("\r\n");
			//const routeList = [];
			//let x = "<tr><td style='width:14%;'><strong>路線</strong></td><td style='width:86%;'><strong>方向</strong></td></tr>";
			let specialDeparture, routeName, routeInfo, count = 0, a;
			raw.setEncoding('utf8');
			
			raw.on('data', (chunk) => { rawData += chunk; });
			raw.on('end', () => {
				try {
					const parsedData = JSON.parse(rawData);
					console.log(parsedData);
					resolve(parsedData);
				} catch (e) {
					console.error(e.message);
				}
			});
			
			//parsed = raw;
			//parsed = CSVToArray(raw);
			//console.log(parsed);
			/*
			//console.log(parsed[parsed.map(e => e[0]).indexOf("1723-1-319-0600")]);
			var output = getAllIndexes(parsed, "1723-1-319-0600");
			for (let i = 0; i < output.length; i++){
			  console.log(parsed[output[i]]);
			}*/

		});
	})
}

function CSVToArray(strData, strDelimiter){
	strDelimiter = (strDelimiter || ",");
	
	var objPattern = new RegExp((
		// Delimiters.
		"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

		// Quoted fields.
		"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

		// Standard fields.
		"([^\"\\" + strDelimiter + "\\r\\n]*))"
	),"gi");

	var arrData = [[]];
	var arrMatches = null;

	while (arrMatches = objPattern.exec(strData)){
		var strMatchedDelimiter = arrMatches[1];

		if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter){
			arrData.push([]);
		}

		var strMatchedValue;

		if (arrMatches[2]){
			strMatchedValue = arrMatches[2].replace(new RegExp( "\"\"", "g" ),"\"");
		} else {
			strMatchedValue = arrMatches[3];
		}
		arrData[arrData.length - 1].push(strMatchedValue);
	}

	return (arrData);
}

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.map(e => e[0]).indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

app.get("/", async (request, response) =>{
	console.log(request);
	let output = await getRoutes();
	output = output || "No data";
	response.json(output);
	
});

app.listen("/")
