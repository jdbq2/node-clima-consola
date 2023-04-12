const inquirer = require("inquirer");
require("colors");

const menuOpts = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que quieres hacer?",
    choices: [
      {
        value: 1,
        name: `${"1".green} Buscar Ciudad`,
      },
      {
        value: 2,
        name: `${"2".green} Historial`,
      },
      {
        value: 0,
        name: `${"0".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log();
  console.log("=====================".white);
  console.log("Seleccione una opcion".white);
  console.log("=====================".white);
  console.log();

  const { opcion } = await inquirer.prompt(menuOpts);

  return opcion;
};

const pause = async () => {
  //console.clear();

  const pauseOpts = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];

  const { enter } = await inquirer.prompt(pauseOpts);

  return enter;
};

const leerInput = async (mensaje) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message: mensaje,
      validate(value) {
        if (value.length === 0) {
          return "Por Favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listarLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: lugar.id,
      name: `${idx}. ${lugar.nombre}`,
    };
  });

  const preguntas = [
    { type: "list", name: "id", message: "Seleccione un lugar:", choices },
  ];

  const { id } = await inquirer.prompt(preguntas);

  return id;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${idx}. ${tarea.descripcion}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    { type: "checkbox", name: "ids", message: "Seleccione", choices },
  ];

  const { ids } = await inquirer.prompt(pregunta);

  return ids;
};

const confirmar = async (message) => {
  const question = [{ type: "confirm", name: "ok", message }];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

module.exports = {
  inquirerMenu,
  pause,
  leerInput,
  listarLugares,
  confirmar,
  mostrarListadoChecklist,
};
