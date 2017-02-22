var WorldMapType = {
	cache : Array(),
	opacity: 1.0,
	tileSize: new google.maps.Size(256, 256),
	maxZoom: 6,
	minZoom: 5,
	getTile: function(coord, zoom, ownerDocument) {
	    var tilex=coord.x;
	    var tiley=coord.y;

	    var xoffset = Math.floor((Math.pow(2,zoom) - zoomSize[zoom][0])/2);
	    var yoffset = Math.floor((Math.pow(2,zoom) - zoomSize[zoom][1])/2);
	    var width = xoffset + zoomSize[zoom][0];
	    var height = yoffset + zoomSize[zoom][1];

	    zoomSize[6] = [zoomSize[5][0]*2,zoomSize[5][1]*2];
	    zoomSize[4] = [zoomSize[5][0]/2,zoomSize[5][1]/2];
	    zoomSize[3] = [zoomSize[4][0]/2,zoomSize[4][1]/2];

	    if ((tilex < xoffset)||(tilex>= width)||(tiley < yoffset)||(tiley >= (height)))
	    {
	    	var blank = ownerDocument.createElement('DIV');
	    	blank.style.width = this.tileSize.width + 'px';
	    	blank.style.height = this.tileSize.height + 'px';
	    	return blank;
	    }
	    var num = (coord.y-yoffset)*zoomSize[zoom][0] + (coord.x-xoffset);
	  	var img = ownerDocument.createElement('IMG');
	    img.id = "t_" + num;
	    img.style.width = this.tileSize.width + 'px';
	    img.style.height = this.tileSize.height + 'px';
	    img.src = "tiles/" + folder + "/" + zoom + "/tile-"+num+".jpg";
	    this.cache.push(img);
	    return img;
	},
	releaseTile: function(tile) {
	    var idx = this.cache.indexOf(tile);
	    if(idx!=-1) this.cache.splice(idx, 1);
	    tile=null;
	},
	name: "World Map",
	alt: "World Map Tiles",
	setOpacity: function(newOpacity) {
	    this.opacity = newOpacity;
	    for (var i = 0; i < this.cache.length; i++) {
	        this.cache[i].style.opacity = newOpacity; //mozilla
	        this.cache[i].style.filter = "alpha(opacity=" + newOpacity * 100 + ")"; //ie
	    }
	}
};

function load() {
	var latlng = new google.maps.LatLng(0.0,0.0);
	var myOptions = {
	        zoom: 5,
	        minZoom: 5,
	        maxZoom: 6,
	        center: latlng,
	        panControl: false,
	        zoomControl: true,
	        mapTypeControl: false,
	        scaleControl: false,
	        streetViewControl: false,
	        overviewMapControl: false,
	        backgroundColor: '#000000',
	        mapTypeId: "WorldMap"
	};	
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    map.mapTypes.set("WorldMap",WorldMapType);
    
    // bounds of the desired area
    var allowedBounds = new google.maps.LatLngBounds(
         new google.maps.LatLng(-20,-40),
         new google.maps.LatLng(20,40)
    );
    var lastValidCenter = map.getCenter();

    google.maps.event.addListener(map, 'center_changed', function() {
        if (allowedBounds.contains(map.getCenter())) {
            // still within valid bounds, so save the last valid position
            lastValidCenter = map.getCenter();
            return;
        }
        // not valid anymore => return to last valid position
        map.panTo(lastValidCenter);
    });   
    
    // Show the lat and lng under the mouse cursor.
    var coordsDiv = document.getElementById('coords');
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
    map.addListener('mousemove', function(event) {
      coordsDiv.textContent =
          'lat: ' + event.latLng.lat() + ', ' +
          'lng: ' + event.latLng.lng();
    });   
    
    // Adds a marker to the map.
    function addMarker(location, map) {
      // Add the marker at the clicked location, and add the next-available label
      // from the array of alphabetical characters.
      var marker = new google.maps.Marker({
        position: location,
        label: "Test",
        map: map
      });
    };
    
    google.maps.event.addListener(map, 'click', function(event) {
        addMarker(event.latLng, map);
    });    
}
