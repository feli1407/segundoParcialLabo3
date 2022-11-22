import { Anuncio } from "./anuncio.js";

const divAnunciosAutos = document.querySelector(".anunciosAutos");
let anuncios = [];
if (JSON.parse(localStorage.getItem("anuncios")) != null) {
  anuncios = JSON.parse(localStorage.getItem("anuncios"));
  divAnunciosAutos.appendChild(CrearTarjetas(anuncios));
}

//CAMBIAR A AJAX


function CrearTarjetas(anuncios) {
  const tarjetas = document.createElement("div");

  anuncios.forEach((elemento) => {
    const tarjeta = document.createElement("div");
    tarjeta.setAttribute("class", "tarjeta");
    const parrafo = document.createElement("p");
    for (const atributo in elemento) {
      if (atributo === "id") {
        continue;
      }
      parrafo.textContent += atributo+": "  + elemento[atributo] + " / ";
    }
    tarjeta.appendChild(parrafo);
    tarjeta.setAttribute("class", "card text-center border-success");
    tarjeta.setAttribute("style", "margin-top: 15px");
    tarjetas.appendChild(tarjeta);
  });

  return tarjetas;
}
