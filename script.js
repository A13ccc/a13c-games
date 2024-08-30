var coll = document.getElementsByClassName("collapsible");
var i;

alert("Hey, if there are any games you want me to add please click the link in the green note.\nIf there are any features you want me to fix/add please click the link in the grey note.\nHappy gaming :)");

for (i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function() {
		this.classList.toggle("active");
		var content = this.nextElementSibling;
		if (content.style.display === "block") {
			content.style.display = "none";
		} else {
			content.style.display = "block";
		}
	});
}