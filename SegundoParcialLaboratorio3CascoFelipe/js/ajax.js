const URL = "http://localhost:3000/anuncios";

const divSpinner = document.getElementById("spinner");

export const getAnuncios = () => {

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      //si ya cargo el ready stage
      if (xhr.status >= 200 && xhr.status < 300) {
        //y si el status es valido, entro.
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        return data;
      } else {
        console.error(`Error: ${xhr.status} - ${xhr.statusText}`); //apostrofes -> alt + 96
        return false;
      }
    }
  });

  xhr.open("GET", URL);

  xhr.send();
};

const getPersona = (id) => {
  setSpinner(divSpinner, "./assets/caminante.gif");

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      //si ya cargo el ready stage
      if (xhr.status >= 200 && xhr.status < 300) {
        //y si el status es valido, entro.
        const data = JSON.parse(xhr.responseText);
        console.log(data);
      } else {
        console.error(`Error: ${xhr.status} - ${xhr.statusText}`); //apostrofes -> alt + 96
      }

      clearSpinner(divSpinner);
    }
  });

  xhr.open("GET", URL + "/" + id);

  xhr.send();
};

const createPersona = () => {
    //Creo la persona
  const nuevaPersona = {
    nombre: "Julio",
    sexo: "hombre",
  };
  setSpinner(divSpinner, "./assets/caminante.gif");

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      //si ya cargo el ready stage
      if (xhr.status >= 200 && xhr.status < 300) {
        //y si el status es valido, entro.
        const data = JSON.parse(xhr.responseText);
        console.log(data);
      } else {
        console.error(`Error: ${xhr.status} - ${xhr.statusText}`); //apostrofes -> alt + 96
      }

      clearSpinner(divSpinner);
    }
  });

  xhr.open("POST", URL);//Envio una solicitud por POST
  xhr.setRequestHeader("Content-Type", "Application/json");//Le indico que es por JSON
  xhr.send(JSON.stringify(nuevaPersona));//Envio la persona parseada a JSON
};

const updatePersona = (persona) => {
    
  setSpinner(divSpinner, "./assets/caminante.gif");

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      //si ya cargo el ready stage
      if (xhr.status >= 200 && xhr.status < 300) {
        //y si el status es valido, entro.
        const data = JSON.parse(xhr.responseText);
        console.log(data);
      } else {
        console.error(`Error: ${xhr.status} - ${xhr.statusText}`); //apostrofes -> alt + 96
      }

      clearSpinner(divSpinner);
    }
  });

  xhr.open("PUT", URL + "/" + persona.id);//Envio una solicitud por PUT ya que estoy modificando
  xhr.setRequestHeader("Content-Type", "Application/json");//Le indico que es por JSON
  xhr.send(JSON.stringify(persona));//Envio la persona parseada a JSON
};

const deletePersona = (id) => {
    setSpinner(divSpinner, "./assets/caminante.gif");
  
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4) {
        //si ya cargo el ready stage
        if (xhr.status >= 200 && xhr.status < 300) {
          //y si el status es valido, entro.
          const data = JSON.parse(xhr.responseText);
          console.log(data);
        } else {
          console.error(`Error: ${xhr.status} - ${xhr.statusText}`); //apostrofes -> alt + 96
        }
  
        clearSpinner(divSpinner);
      }
    });
  
    xhr.open("DELETE", URL + "/" + id);//La peticion al servidor va a ser DELETE y lo borra
  
    xhr.send();
  };

const setSpinner = (div, src) => {
  const img = document.createElement("img");
  img.setAttribute("src", src);
  img.setAttribute("alt", "spinner");
  div.appendChild(img);
};

const clearSpinner = (div) => {
  while (div.hasChildNodes()) {
    div.removeChild(div.firstElementChild);
  }
};
