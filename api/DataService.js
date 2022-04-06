import axios from 'axios';
const API_KEY = '69636f29401aff20cfa640a04a91ff58';

axios.defaults.headers.post = {
	'Content-Type': 'application/json'
};

export const SearchAddressByQuery = async query => {
	let response = await axios.get(`https://photon.komoot.io/api/?q=${query}&osm_tag=place:city`);
	return response.data;
};

export const GetWeatherByCoordinates = async (lat, lon) => {
	let response = axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=metric&appid=${API_KEY}`)
	return response;
};

export const GetLocationLatLong = async (location) => {
	const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_KEY}`);
	return response;
};

export const GetFutureDaysForecast = async (lat, lon) => {
	const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=metric&appid=${API_KEY}`);
	return response;
};

export const GetPastDaysData = async (lat, lon, day) => {
	const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&units=metric&dt=${day}&appid=${API_KEY}`);
	return response;
};
