const axios = require("axios");

const BASE_PATH = "http://api.openweathermap.org/data/2.5/weather";
const API_KEY = "376cd2c5f288c97105013deec7c63052";

const prompt = (message, callback) => {
	const stdin = process.stdin;
	const stdout = process.stdout;

	stdin.resume();
	stdout.write(message);

	stdin.once("data", (data) => {
		callback(data.toString().trim());
	});
};

prompt("Insira um local ou um código postal: ", function (location) {
	if(!location){
		console.log("Por favor, tente novamente");
		process.exit();
	}

	axios
		.get(`${BASE_PATH}?q=${location}&units=metric&appid=${API_KEY}`)
		.then((response) => {
			const weather = response;
			const message = `\nData e hora atuais: ${weather.headers.date}\nEstá ${weather.data.main.temp}°C graus em ${location}.`;

			console.log(message);
			process.exit();
		})
		.catch((err) => {
			console.log(`Erro: ${err.response.data.message}`);
			process.exit();
		});
});