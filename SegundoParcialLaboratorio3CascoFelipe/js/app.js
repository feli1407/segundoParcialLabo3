import { ActualizarTabla, CrearTabla, MostrarColumna, OcultarColumna } from "./tablaDinamica.js";
import {
  validarCampoVacio,
  ValidarKm,
  ValidarPotencia,
  ValidarPuertas,
  ValidarRadioSeleccionado,
} from "./validaciones.js";
import { Anuncio } from "./anuncio.js";
import { getAnuncios } from "./ajax.js";

const formulario = document.forms[0];
//console.log(formulario);

const {
  txtTitulo,
  Venta,
  Alquiler,
  txtDescripcion,
  numPrecio,
  numPuertas,
  numKms,
  numPotencia,
  txtId,
} = formulario;

//Asi se quien llamo al evento click, para saber el indice del array
window.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    let id = e.target.parentElement.dataset.id;
    console.log(id);
    //asi obtengo la persona que selecciono para modificarla
    CargarFormulario(anuncios.find((anuncio) => anuncio.id == id));
  } else if (e.target.matches("#btnEliminar")) {
    manejadorEliminar(parseInt(txtId.value));
    txtId.value = "";
    formulario.reset();
    ActualizarTabla(anuncios);
    ActualizarLocalStorage();
    //Elimino un anuncio del array y updateo la tabla para ver los cambios.
  } else if (e.target.matches("#btnCancelar")) {
    //pongo el id sin nada para poder agregar uno nuevo y que no lo elimine
    txtId.value = "";
    formulario.reset();
  }
});

const controles = formulario.elements;
for (let i = 0; i < controles.length; i++) {
  const control = controles.item(i);
  if (control.matches("input")) {
    if (control.matches("[type=text]") || control.matches("[type=number]")) {
      control.addEventListener("blur", validarCampoVacio);
    }
  }
}

//Consigo el numero de id con el array de anuncios que tengo en el localstorage.
//Si es que lo tengo, saco el indice y actualizo la tabla.
let anuncios = [];
if (JSON.parse(localStorage.getItem("anuncios")) != null) {
  anuncios = JSON.parse(localStorage.getItem("anuncios"));
  ActualizarTabla(anuncios);
}


//CAMBIAR A AJAX


//Evento que maneja el sumbit de guardar.
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  //Valido que no haya errores en los datos ingresados y sino salgo del evento.
  const controles = e.target.elements;
  for (const control of controles) {
    if (
      control.classList.contains("inputError") ||
      ValidarRadioSeleccionado() == false ||
      ValidarKm(document.getElementById("numKms").value) == false ||
      ValidarPotencia(document.getElementById("numPotencia").value) == false ||
      ValidarPuertas(document.getElementById("numPuertas").value) == false
    ) {
      return;
    }
  }

  //creo un anuncio con los datos
  const anuncio = new Anuncio(
    txtId.value,
    txtTitulo.value,
    ValidarRadioSeleccionado(),
    txtDescripcion.value,
    numPrecio.value,
    numPuertas.value,
    numKms.value,
    numPotencia.value
  );

  if (anuncio.id === "") {
    //Si el id no existe tengo que hacer el alta
    anuncio.id = Date.now();
    manejadorCrear(anuncio);
  } else {
    //Como existe el id se que es una modificacion
    manejadorModificar(anuncio);
  }

  ActualizarTabla(anuncios);
  console.log("enviando...");
  ActualizarLocalStorage();
});

const manejadorCrear = (nuevoAnuncio) => {
  anuncios.push(nuevoAnuncio);
};

const manejadorModificar = (anuncioEditado) => {
  const anunciosActualizados = anuncios.map((anuncio) =>
    anuncio.id == anuncioEditado.id ? anuncioEditado : anuncio
  );
  anuncios = anunciosActualizados;
  //Si encuentro la persona que vine a editar te devuelvo la persona editada, sino te devuelvo la misma.
  //Map nos devuelve un array con la persona actualizada y lo paso al array original asi lo sobreescribe con los datos actualizados.
};

const manejadorEliminar = (id) => {
  let indiceEliminar = anuncios.findIndex((anuncio) => {
    return anuncio.id == id;
  });
  anuncios.splice(indiceEliminar, 1);
};

//actualizo el local storage
function ActualizarLocalStorage() {
  localStorage.setItem("anuncios", JSON.stringify(anuncios));
}

//Carga los datos del anuncio en el formulario
function CargarFormulario(anuncio) {
  txtId.value = anuncio.id;
  txtTitulo.value = anuncio.titulo;
  //asi asigno al radiobutton la opcion.
  if (anuncio.transaccion == "Venta") {
    Venta.checked = true;
  } else {
    Alquiler.checked = true;
  }
  txtDescripcion.value = anuncio.descripcion;
  numPrecio.value = anuncio.precio;
  numPuertas.value = anuncio.cantPuertas;
  numKms.value = anuncio.cantKms;
  numPotencia.value = anuncio.cantPotencia;
}

const transaccion = document.getElementById("opFiltrarTransaccion");
const promedio = document.getElementById("promedio");

transaccion.addEventListener("change", (e) => {
  if (e.target.value == "Venta") {
    promedio.textContent = "Promedio: " + FiltrarTransaccion("Venta", anuncios);
  } else if (e.target.value == "Alquiler") {
    console.log(e.target.value);
    promedio.textContent =
      "Promedio: " + FiltrarTransaccion("Alquiler", anuncios);
  } else {
    promedio.textContent = "Seleccione una transaccion.";
  }
});

function FiltrarTransaccion(tipo, autos) {
  let retorno = 0;
  if (tipo == "Venta") {
    let totalAutosVenta = autos.filter((auto) => {
      return auto.transaccion == "Venta";
    });
    let totalPrecioVentas = totalAutosVenta.reduce((previo, actual) => {
      return previo + parseFloat(actual.precio); //previo es un 0 porque lo inicializo en 0 y actual siempre va a ser una auto, entonces sumo los importes.
    }, 0);
    retorno = totalPrecioVentas / totalAutosVenta.length;
  } else if (tipo == "Alquiler") {
    let totalAutosAlquiler = autos.filter((auto) => {
      return auto.transaccion == "Alquiler";
    });
    let totalPrecioAlquiler = totalAutosAlquiler.reduce((previo, actual) => {
      return previo + parseFloat(actual.precio); //previo es un 0 porque lo inicializo en 0 y actual siempre va a ser una auto, entonces sumo los importes.
    }, 0);
    retorno = totalPrecioAlquiler / totalAutosAlquiler.length;
  }
  return retorno;
}

const opcionesFiltrar = document.querySelector(".seleccionarColumnas");

opcionesFiltrar.addEventListener("change", (e) => {
  let checkboxes = document.querySelectorAll("input[type=checkbox]");

  for (let i = 0; checkboxes.length > i; i++) {
    if (checkboxes[i].checked) {
      console.log(checkboxes[i].name)
      if (checkboxes[i].name == "titulo") {
        MostrarColumna(i);
      }
      else if (checkboxes[i].name == "transaccion") {
        MostrarColumna(i);
      }
      else if (checkboxes[i].name == "descripcion") {
        MostrarColumna(i);
      }
      else if (checkboxes[i].name == "precio") {
        MostrarColumna(i);
      }
      else if (checkboxes[i].name == "cantPuertas") {
        MostrarColumna(i);
      }
      else if (checkboxes[i].name == "cantKms") {
        MostrarColumna(i);
      }
      else if (checkboxes[i].name == "cantPotencia") {
        MostrarColumna(i);
      }
    }
    else
    {
      OcultarColumna(i);
    }
  }

  // if(cadenaMap != ""){
  //   let anunciosMap = anuncios.map((anuncio)=>{
  //     return {titulo:anuncio.titulo};
  //   });
  //   console.log(anunciosMap);
  // }
});
