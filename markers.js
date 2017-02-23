function PillarsMarker(lat, lng, id, name, image, toplabel, offset) {
	this.position = new google.maps.LatLng(lat,lng);
	this.name = name;
	this.id = id;
	this.shadow = '';
	if(offset === undefined) offset = -5;
	this.content = "<div style='text-align:center;cursor:pointer'>" +
		"<a href='" + id + ".html'><img id='id_" + id + "' class='imgMarker' src='images/" + image + "'/></a>" +
		"<div class='label' style='position:relative;top:" + offset + "px'>" + name + "</div>" +
		"</div>";
	if(toplabel) {
		this.content = "<div style='text-align:center;cursor:pointer'>" +
			"<div class='label'>" + name + "</div>" +
			"<a href='" + id + ".html'><img id='id_" + id + "' class='imgMarker' src='images/" + image + "'/></a>" +
			"</div>";
	}
}

var markers = [
    new PillarsMarker(7.580327791330129,-28.212890625,"gildedvale","Gilded Vale", "gildedvale.png"),
    new PillarsMarker(10.703791711680736,-33.310546875,"valewood","Valewood", "wilderness.png"),
    new PillarsMarker(10.228437266155943,-18.7646484375,"esternwood","Esternwood","wilderness.png"),
    new PillarsMarker(2.8113711933311403,-25.2685546875,"magransfork","Magran's Fork","wilderness.png"),
    new PillarsMarker(3.908098881894123,-15.46875,"blackmeadow","Black Meadow","wilderness.png"),
		new PillarsMarker(10.962764256386823,-6.1962890625,"raedrichold","Raedric's Hold","raedrichold.png"),
		new PillarsMarker(-2.9869273933348635,-24.23583984375,"anslogcompass","Anslög's Compass","anslogcompass.png"),
		new PillarsMarker(14.562317701914857,-29.4873046875,"cilantlis","Cilant Lîs","cilantlis.png"),
		new PillarsMarker(2.6796866158037598,-5.009765625,"caednua","Caed Nua","caednua.png"),
		new PillarsMarker(-7.710991655433216,-14.8974609375,"firstfires","First Fires","firstfires.png"),
		new PillarsMarker(-2.4162756547063857,-11.71142578125,"madhmrbridge","Madhmr Bridge","madhmrbridge.png", true),
		new PillarsMarker(-8.58102121564184,-6.416015625,"aedelwanbridge","Aedelwan<br/>Bridge","aedelwanbridge.png"),
		new PillarsMarker(-8.49410453755187,0.28564453125,"woodendplains","Woodend Plains","wilderness.png"),
		new PillarsMarker(-17.853290114098,-2.52685546875,"searingfalls","Searing Falls","wilderness.png"),
		new PillarsMarker(-18.562947442888298,11.31591796875,"elmshore","Elmshore","wilderness.png"),
		new PillarsMarker(-4.8282597468669755,20.50048828125,"dyrfordcrossing","Dyrford Crossing","wilderness.png"),
		new PillarsMarker(-4.959615024698014,31.79443359375,"northweald","Northweald","wilderness.png"),
		new PillarsMarker(-15.199386048559994,-13.9306640625,"pearlwoodbluff","Pearlwood Bluff","pearlwoodbluff.png"),
		new PillarsMarker(-12.254127737657367,7.822265625,"stormwallgorge","Stormwall Gorge","stormwallgorge.png"),
		new PillarsMarker(-6.751896464843375,-18.83056640625,"heritagehill","Heritage Hill","heritagehill.png"),
		new PillarsMarker(-5.703447982149503,-10.34912109375,"copperlane","Copperlane","copperlane.png"),
		new PillarsMarker(-10.703791711680724,-11.66748046875,"brackenbury","Brackenbury","brackenbury.png"),
		new PillarsMarker(-11.049038346537092,-18.56689453125,"ondrasgift","Ondra's Gift","ondrasgift.png"),
		new PillarsMarker(0.4394488164139768,20.76416015625,"cliabanrilag","Clîaban Rilag","cliabanrilag.png"),
		new PillarsMarker(-5.7908968128719565,12.3486328125,"dyrfordvillage","Dyrford Village","dyrfordvillage.png"),
		new PillarsMarker(1.7136116598836224,35.244140625,"hyleatemple","Temple of Hylea","hyleatemple.png"),
		new PillarsMarker(7.493196470122287,5.38330078125,"cragholdtbluffs","Crägholdt Bluffs","cragholdtbluffs.png"),
		new PillarsMarker(-15.156973713377665,32.255859375,"elmsreach","Elm's Reach","elmsreach.png"),
		new PillarsMarker(-11.221510260010543,28.125,"oldsong","Oldsong","oldsong.png"),
		new PillarsMarker(-14.477234210156505,23.8623046875,"burialisle","Burial Isle","burialisle.png"),
		new PillarsMarker(-18.145851771694467,25.99365234375,"hearthsong","Hearthsong","hearthsong.png"),
		new PillarsMarker(12.940322128384626,25.2685546875,"towhitemarch","The White March","towhitemarch.png")
];
