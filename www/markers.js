function PillarsMarker(lat, lng, id, name, image) {
	this.position = new google.maps.LatLng(lat,lng);
	this.name = name;
	this.id = id;
	this.shadow = '';
	this.content = "<div style='text-align:center;cursor:pointer'>" + 
		"<img id='" + id + "' class='imgMarker' src='images/" + image + "'/>" + 
		"<div class='label'>" + name + "</div>" +
		"</div>";
}

var markers = [
    new PillarsMarker(7.580327791330129,-28.212890625,"id_gildedvale","Gilded Vale", "gildedvale.png"),
    new PillarsMarker(10.703791711680736,-33.310546875,"id_valewood","Valewood", "wilderness.png"),
    new PillarsMarker(10.228437266155943,-18.7646484375,"id_esternwood","Esternwood","wilderness.png"),
    new PillarsMarker(2.8113711933311403,-25.2685546875,"id_magransfork","Magran's Fork","wilderness.png"),
    new PillarsMarker(3.908098881894123,-15.46875,"id_blackmeadow","Black Meadow","wilderness.png")
];
