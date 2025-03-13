import * as jsonfile from 'jsonfile';
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
      return peliexistente
    }).catch((error) => {
      console.log("no se ha podido leer el archivo correctamente");
      return null
    });
  }

    addPeli(pelicula: Peli): Promise<Boolean> {
      const promesa1 = this.getByid(pelicula.id).then((peliexistente) => 
      { if (peliexistente) {
        return false
      } else {


        const data = {
          peliculas: [] as Peli[],
        }

        data.peliculas.push(pelicula);

       const promesa2 = jsonfile.writeFile("./pelis.json", data);
        return promesa2.then((resolve)=> {
            return true
        });
      }
    });
    
    return promesa1
    
    } 

    
  
    
    


  
  

  }
export { PelisCollection, Peli };
