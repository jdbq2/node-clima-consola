require("dotenv").config();
const {
  inquirerMenu,
  pause,
  leerInput,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  let opt;
  const busquedas = new Busquedas();
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const lugar = await leerInput("Ciudad: ");
        const lugares = await busquedas.ciudad(lugar);
        const id = await listarLugares(lugares);
        const lugarSel = lugares.find((l) => l.id === id);
        busquedas.agregarHistorial(lugarSel.nombre);
        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
        console.clear();
        console.log("\n Informacion de la ciudad \n");
        console.log("Ciudad: ", lugarSel.nombre);
        console.log("Latitud: ", lugarSel.lat);
        console.log("Longitud: ", lugarSel.lng);
        console.log("Temperatura: ", clima.temp);
        console.log("Minima: ", clima.min);
        console.log("Maxima: ", clima.max);
        console.log("¿Como esta el clima?: ", clima.desc);
        break;
      case 2:
        console.clear()
        console.log()
        busquedas.historialCapitalizado.forEach((lugar, i) => {
          idx = i + 1 + ".";
          console.log(`${idx.green} ${lugar}`);
        });
        console.log()
        break;
    }

    await pause();
  } while (opt !== 0);
};

main();
