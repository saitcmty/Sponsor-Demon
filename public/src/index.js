function register(newUser) {

	$.ajax({

		url: "/users", 
		method: "POST",
		data: JSON.stringify(newUser),
		dataType: "JSON",
		contentType: "application/json",

		success: function(responseJSON) {
			console.log("A huevo");
		},

		error: function(error) {
			console.log("Juguito de Chale", error);
		}
	});
}

function watchForm() {

	$("#sign-in-btn").on("click", function() {
		
		if ($("#sign-in-password").val() != $("#sign-in-password-confirm").val()) {
			alert("Las contraseñas no coinciden");
		}

		else {	
			let newUser = {
				id: "",
				name: $("#sign-in-name").val(),
				email: $("#sign-in-mail").val(),
				password: $("#sign-in-password").val(),
				logged: false,
				admin: false
			};

			register(newUser);
		}
	});

	$("#log-in-btn").on("click", function() {
		
		let logUser = {

		};
	});
}
watchForm();