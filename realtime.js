$.ajax({
	  type: 'GET',
	  url: "http://truetime.portauthority.org/bustime/api/v1/getpredictions?key=Ypnn8Cqi6uaAji6zP66DYB46C&stpid=2562",
	  data: {
	    key: "Ypnn8Cqi6uaAji6zP66DYB46C"
	  },
	  dataType: "xml",
	  success: function (xml){
	    // var route = $(xml).find('rt').text();
	    // var predict = $(xml).find('prdtm').text();
	    var routes = $(xml).find('rt');
	    var rtdirts = $(xml).find('rtdir');
	    var dests = $(xml).find('des');
	    var predictions = $(xml).find('prdtm');
	    var timestamps = $(xml).find('tmstmp');
	    
	    // append stop name to the title
	    var stop_name = $(xml).find('stpnm').first().text();
		var h3 = document.getElementById("list");
	    h3.appendChild(document.createTextNode(stop_name));

	    for (var i = 0; i < routes.length; i++){
	    	var route = routes[i].firstChild.nodeValue;
	    	var rtdir = rtdirts[i].firstChild.nodeValue;
	    	var des = dests[i].firstChild.nodeValue;
	    	
	    	// calculate eta
	    	var predict = predictions[i].firstChild.nodeValue.split(' ')[1];
	    	var timestamp = timestamps[i].firstChild.nodeValue.split(' ')[1];

	    	var pre_hour = predict.split(':')[0];
	    	var pre_min = predict.split(':')[1];
	    	var stmp_hour = timestamp.split(':')[0];
	    	var stmp_min = timestamp.split(':')[1];
	    	var diff = Number(pre_min) - Number(stmp_min);
	    	if(diff >= 0){
	    		var min = diff;
	    	}
	    	else{
	    		var min = 60 + diff;
	    	}
	    	
	    	// get Route and Time from XML response
	    	var table = document.getElementById("timeTable");
    		var row = table.insertRow();
    		var cell1 = row.insertCell(0);
    		var cell2 = row.insertCell(1);
    		var cell3 = row.insertCell(2);
   			cell1.innerHTML = '<div class="routeinfo">' + route + '</div>';
    		cell2.innerHTML = '<div class="direction">' + rtdir + "-" + des + '</div>';
    		cell3.innerHTML = '<div class="eta">' + min + " min" + '</div>';


	    	// var routeinfo = document.getElementById("routeinfo");
	    	// var direction = document.getElementById("direction");
	    	// var eta = document.getElementById("eta");

	    	// var p1 = document.createElement("p");
	    	// var p2 = document.createElement("p");
	    	// var p3 = document.createElement("p");

	    	// p1.appendChild(document.createTextNode(route));
	    	// p2.appendChild(document.createTextNode(rtdir + "-" +des));
	    	// p3.appendChild(document.createTextNode(min + " min"));
	    	
	    	// routeinfo.appendChild(p1);
	    	// direction.appendChild(p2);
	    	// eta.appendChild(p3);
	    	// alert("Route: " + route + "\n" + "Prediction: " + predict);
	    }     

	  }   
	});