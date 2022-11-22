function CrearCabecera(row) {
  const cabecera = document.createElement("thead");
  const tr = document.createElement("tr");

  //Uso un for in para recorrer el objeto.
  for (const key in row) {
    if (key === "id") {
      continue;
    }
    const th = document.createElement("th");
    th.textContent = key;
    tr.appendChild(th);
  }

  cabecera.appendChild(tr);

  return cabecera;
}

function CrearCuerpo(data) {
  //Ya se valida el array en la funcion crear tabla.

  const cuerpo = document.createElement("tbody");

  data.forEach((elemento) => {
    const fila = document.createElement("tr");
    for (const atributo in elemento) {
      if (atributo === "id") {
        fila.setAttribute("data-id", elemento[atributo]);
        continue;
      }
      const celda = document.createElement("td");
      celda.textContent = elemento[atributo];
      fila.appendChild(celda);
    }
    cuerpo.appendChild(fila);
  });

  return cuerpo;
}

const tabla = document.createElement("table");
tabla.setAttribute("class", "table table-sm table-bordered table-hover");

export function CrearTabla(data) {
  if (!Array.isArray(data)) {
    return null;
  }
  tabla.appendChild(CrearCabecera(data[0]));
  tabla.appendChild(CrearCuerpo(data));

  return tabla;
}

export function ActualizarTabla(array) {
  const divTabla = document.querySelector(".divTabla");
  if (divTabla.hasChildNodes()) {
    divTabla.removeChild(divTabla.lastChild);
  }
  SpinnerEncendido();
  setTimeout(function () {
    SpinnerApagado();
    divTabla.appendChild(CrearTabla(array));
  }, 1500);
}

export function OcultarColumna(numColumna) {
  for (let i = 0; i < tabla.rows.length; i++) {
    let w = tabla.rows[i].cells;
    w[numColumna].style.display = "none";
  }
}

export function MostrarColumna(numColumna) {
  for (let i = 0; i < tabla.rows.length; i++) {
    let w = tabla.rows[i].cells;
    w[numColumna].style.removeProperty("display");
  }
}

const contenedor = document.getElementById("carga");

function SpinnerEncendido() {
  contenedor.style.visibility = "visible";
  contenedor.style.opacity = "100";
}

function SpinnerApagado() {
  contenedor.style.visibility = "hidden";
  contenedor.style.opacity = "0";
}
