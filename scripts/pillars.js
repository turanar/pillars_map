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
	        this.cache[i].style.opacity = newOpacity;
	        this.cache[i].style.filter = "alpha(opacity=" + newOpacity * 100 + ")";
	    }
	}
};

var markerArray = [];

function load() {
		var latlng = new google.maps.LatLng(0.0,0.0);
		var myOptions = {
				zoom: 5,
				minZoom: 5,
				maxZoom: 5,
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

    var allowedBounds = new google.maps.LatLngBounds(
         new google.maps.LatLng(-20.427012814257385,-42.1875),
         new google.maps.LatLng(20.427012814257385,42.1875)
    );
    var lastValidCenter = map.getCenter();

    google.maps.event.addListener(map, 'center_changed', function() {
        if (allowedBounds.contains(map.getCenter())) {
            lastValidCenter = map.getCenter(); return;
        }
        map.panTo(lastValidCenter);
    });

		markers.forEach(function(e){
				e.map = map;
				marker = new RichMarker(e);
				markerArray.push(marker);
				google.maps.event.addListener(marker,'mouseover',function(element){
					$(this.markerWrapper_).addClass('selected');
				});
				google.maps.event.addListener(marker,'mouseout',function(element){
					$(this.markerWrapper_).removeClass('selected');
				});
				google.maps.event.addListener(marker,'click',function(element){
					console.log($('a',this.markerWrapper_));
					$('a',this.markerWrapper_).click();
				});
		});
}
