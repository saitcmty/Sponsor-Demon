$("#btn-next").on("click", function() {
	if ($("#magic-words").val().toLowerCase() == "por favor") {
		window.location.replace('./dissemination.html');	
	}
});