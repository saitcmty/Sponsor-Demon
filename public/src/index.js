function logUser(user) {

}

function getUser(logUser) {

	$.ajax({
		
		url: `/users`,
		method: "GET",
		dataType: "JSON",
		contentType: "application/json",

		success: function(responseJSON) {
			for (let i=0; i<responseJSON.lenght; i++) {
				if (responseJSON[i].email == logUser.email) {
					if (responseJSON[i].password == logUser.password) {
						logUser(responseJSON[i]);
					}
					else {
						alert("No se pudo iniciar sesion");
					}
				}	
			}
		},

		error: function(error) {
			console.log("Chale", error)
		}
	});
}

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
				admin: false,
			};
			register(newUser);
		}
	});

	$("#log-in-btn").on("click", function() {
		
		let logUser = {
			email: $("#sign-in-mail").val(),
			password: $("#sign-in-password").val()
		};

		getUser(logUser);
	});
}
watchForm();