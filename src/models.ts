import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("../pelis.json").then((data) => {
      return data; 
    }).catch((error) => {
      console.log("Este archivo no se leyo correctamente", error)
      return [];
    })
    
  }

  getByid(id: number): Promise<Peli | null> {
    return this.getAll().then((pelis: Peli[]) => {
      const peliexistente = pelis.find(peli => peli.id === id)
      return peliexistente || null
    }).catch((error) => {
      console.log("no se ha podido leer el archivo correctamente");
      return null
    });

    } 
  
    
  }


  
  


export { PelisCollection, Peli };
