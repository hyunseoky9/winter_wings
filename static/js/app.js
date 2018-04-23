var map;
var x = 3;
var markers = [];
var circles = [];
var radius;
var korean_name = ['새매', '말똥가리','황조롱이','멧비둘기','집비둘기','쇠딱따구리',
'오색딱따구리','청딱다구리','알락할미새','딱새','개똥지빠귀','노랑지빠귀',
'쇠박새','진박새','곤줄박이','박새','오목눈이','붉은머리오목눈이',
'동고비','때까치','직박구리','까치','어치','큰부리까마귀',
'까마귀','찌르레기','참새','되새','방울새','콩새'];

var latin_name = ['Accipiter nisus','Buteo japonicus', 'Falco tinnunculus', 'Streptopelia orientalis', 'Columba livia', 'Dendrocopos kizuki',
'Dendrocopos major', 'Picus canus', 'Motacilla alba', 'Phoenicurus auroreus', 'Turdus eunomus', 'Turdus naumanni', 'Poecile palustris',
'Periparus ater', 'Sittiparus varius', 'Parus minor', 'Aegithalos caudatus', 'Sinosuthera webbiana', 'Sitta europaea', 'Lanius bucephalus',
'Hypsipetes amaurotis', 'Pica pica', 'Garrulus glandarius', 'Corvus macrorhynchos', 'Corvus corone', 'Spodiopsar cineraceus', 'Passer montanus',
'Fringilla montifringilla', 'Chloris sinica', 'Coccothraustes coccothraustes'];

for(i=0; i<korean_name.length; i++){
	var string = "<tr><td>"+korean_name[i]+" (<i>"+latin_name[i]+"<i/>)</td>"+
	"<td><input type='text' name='count"+i+"-1'></td>"+
	"<td><input type='text' name='count"+i+"-2'></td>"+
	"<td><input type='text' name='count"+i+"-3'></td>"+
	"<td><input type='text' name='count"+i+"-4'></td></tr>";
	$("#species-heading").after(string);
}

//add species on the table
var after_default_id = korean_name.length;
document.getElementById('sp-count').value = after_default_id
$("#species-add-button").click(function() {
	string = "<tr><td>"+"<input type='text' name='sp-name-"+after_default_id+"'></td>"+
	"<td><input type='text' name='count"+after_default_id+"-1'></td>"+
	"<td><input type='text' name='count"+after_default_id+"-2'></td>"+
	"<td><input type='text' name='count"+after_default_id+"-3'></td>"+
	"<td><input type='text' name='count"+after_default_id+"-4'></td></tr>"
	;
	$("#species-add").before(string);
	after_default_id += 1;
	document.getElementById('sp-count').value = after_default_id;
	console.log($("#sp-count").val());
});

function initMap() {
	/*TODO
	zoom to marker
	geocode
	put it into gps input.
	gps to marker.
	*/
	//Make map
	map = new google.maps.Map(document.getElementById("map"), {
		center: {lat: 37.532600, lng: 127.024612},
		zoom: 13
	});
	var clicked = 0;
	var theresCircle = 0;

	//event listener for putting markers by click, and moving range accordingly
	google.maps.event.addListener(map, 'click',function(event) {
		if(clicked == 0){
			console.log(event.latLng);
			placeMarker(event.latLng);
			clicked = 1;
			console.log(markers[0]);
		} else {
			removeMarker(markers[0]);
			placeMarker(event.latLng);
		}

		if(theresCircle==0 && radius>0){
			var lat = markers[0].getPosition().lat();
			var lng = markers[0].getPosition().lng();
			latlng = {lat: lat,lng: lng};
			drawCircle(radius,latlng);
			theresCircle = 1;
		} else if (theresCircle==1){
			var lat = markers[0].getPosition().lat();
			var lng = markers[0].getPosition().lng();
			latlng = {lat: lat,lng: lng};
			removeCircle(circles[0]);
			drawCircle(radius,latlng);
		}
	});

	//event listener for putting markers by address
	document.getElementById("ad_search").addEventListener("click", function(){
		address2marker();
	});

	//event listener for putting markers by gps coord.
	document.getElementById("gps_search").addEventListener("click",function(){
		gps2marker();
	});

	//updating range live
	$("#radius").keyup(function(){
		radius = $("#radius").val();
		radius = parseFloat(radius);
		if(radius==""){
			radius = 0;
		}
		if(isNaN(radius)){
			radius = 0;
		}
		if(markers[0]){
			var lat = markers[0].getPosition().lat();
			var lng = markers[0].getPosition().lng();
			latlng = {lat: lat,lng: lng};
			console.log(latlng);
			if(theresCircle == 0){
				drawCircle(radius,latlng);
				theresCircle = 1;
			} else {
				removeCircle(circles[0]);
				drawCircle(radius,latlng);
			}
		}
	});

	//putting marker
	function placeMarker(location) {
		var marker = new google.maps.Marker({
			position: location,
			map: map
		});
		markers[0] = marker;
		map.setCenter(location);
		map.setZoom(15);
		document.getElementById('lat').value = marker.getPosition().lat();
		document.getElementById('lng').value = marker.getPosition().lng();	
	}

	//removing marker
	function removeMarker(marker){
		marker.setMap(null);
	}

	//draw circle
	function drawCircle(radius,latlng){
		var circle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: latlng,
            radius: radius
        });
        circles[0] = circle;
	}

	//remove circle
	function removeCircle(circle){
		circle.setMap(null);
	}

	//putting address to marker
	function address2marker(){
		var geocoder = new google.maps.Geocoder();
		var address = document.getElementById('address').value;
		if (address == ''){
			alert("장소나 주소를 적어주세요.")
		} else {
			geocoder.geocode(
				{address: address},
				function(results, status){
					if(status == google.maps.GeocoderStatus.OK) {
						console.log(results[0].geometry.location)
						if(clicked ==0){
							placeMarker(results[0].geometry.location);
							clicked = 1;
						} else {
							removeMarker(markers[0]);
							placeMarker(results[0].geometry.location);
						}
						if(theresCircle==0 && radius>0){
							var lat = markers[0].getPosition().lat();
							var lng = markers[0].getPosition().lng();
							latlng = {lat: lat,lng: lng};
							drawCircle(radius,latlng);
							theresCircle = 1;
						} else if (theresCircle==1){
							var lat = markers[0].getPosition().lat();
							var lng = markers[0].getPosition().lng();
							latlng = {lat: lat,lng: lng};
							removeCircle(circles[0]);
							drawCircle(radius,latlng);
						}
					} else {
						alert("장소를 찾을 수 없었습니다. 좀더 정확한 주소/장소를 검색해 보세요.");
				}
			});
		}
	}

	//putting gps to marker
	function gps2marker(){

		var latlngGPS = {lat: parseFloat(document.getElementById('lat').value),
			lng: parseFloat(document.getElementById('lng').value)};
		console.log(latlngGPS.lat);
		console.log(latlngGPS);
		if(clicked ==0){
			placeMarker(latlngGPS);
			clicked = 1;
		} else {
			removeMarker(markers[0]);
			placeMarker(latlngGPS);
		}
		if(theresCircle==0 && radius>0){
			var lat = markers[0].getPosition().lat();
			var lng = markers[0].getPosition().lng();
			latlng = {lat: lat,lng: lng};
			drawCircle(radius,latlng);
			theresCircle = 1;
		} else if (theresCircle==1){
			var lat = markers[0].getPosition().lat();
			var lng = markers[0].getPosition().lng();
			latlng = {lat: lat,lng: lng};
			removeCircle(circles[0]);
			drawCircle(radius,latlng);
		}

	}
}

$(window).resize(function () {
    var h = $(window).height(),
        offsetTop = 60; // Calculate the top offset

    $('#map').css('height', (h - offsetTop));
}).resize();