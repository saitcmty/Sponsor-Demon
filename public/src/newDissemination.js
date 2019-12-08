function createDisseminationList(newDisseminationList) {
	
	$.ajax({

		url: "/disseminations"
		method: "POST",
		data: JSON.stringify(newDisseminationList),
		dataType: "JSON",
		contentType: "application/json",

		success: function(responseJSON) {
			console.log("A huevo", responseJSON);			
		},

		error: function(error) {
			console.log("Chale", error)
		}
	});
}

function main() {

	$("#create-new-list").on('click', function() {
	
		let newDisseminationList = {
	
			id					: 		"",
			name 				: 		$("#list-name").val(),
			creator			: 		idLoggedUser,
			message 		: 		$("#list-message").val(),
			companys 		: 		[],
			ambassador	: 		[],
			stuff 			: 		""
		};

		createDisseminationList(newDisseminationList);
	});

} main();