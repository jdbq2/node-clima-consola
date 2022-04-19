const axios = require("axios");
const { guardarDB, leerDB } = require("../helpers/guardarArchivo");

class Busquedas {
  historial = [];

  constructor() {
    if (this.leerDataBase()) {
      this.historial = this.leerDataBase();
    }
  }

  get paramsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  get historialCapitalizado() {
    return this.historial.map((lugar) => {
      let palabras = lugar.split(" ");
      palabras.map((palabra) => {
        return palabra[0].toUpperCase() + palabra.substring(1);
      });
      return palabras.join(" ");
    });
  }

  async ciudad(lugar = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json `,
        params: this.paramsMapBox,
      });
      const resp = await instance.get();
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (e) {
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
        params: { ...this.paramsOpenWeather, lat, lon },
      });
      const resp = await instance.get();
      const { weather, main } = resp.data;
      return {
        desc: weather[0].description,
        min: `${main.temp_min} Grados Centigrados`,
        max: `${main.temp_max} Grados Centigrados`,
        temp: `${main.temp} Grados Centigrados`,
      };
    } catch (e) {
      return [];
    }
  }

  agregarHistorial(lugar = "") {
    if (this.historial.includes(lugar.toLocaleLowerCase)) {
      return;
    }
    if(this.historial.length >= 6){
      this.historial.pop();
    }
    this.historial.unshift(lugar);
    this.guardarDataBase(this.historial);
  }

  guardarDataBase(data) {
    guardarDB(data);
  }

  leerDataBase() {
    return leerDB();
  }
}

module.exports = Busquedas;
