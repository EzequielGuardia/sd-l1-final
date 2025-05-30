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
};

class PelisCollection {
  
  async getAll(): Promise<Peli[]> {
  try {
    const pelis = await jsonfile.readFile("./pelis.json");
    return pelis;
  } catch (e) {
    return []; // si no existe o da error, devolvemos lista vacía
  }
}

  async getById(id: number): Promise<Peli | null> {
    const pelis: Peli[] = await this.getAll();
    const peliEncontrada = pelis.find(peli => peli.id === id)
    return peliEncontrada || null;
  }

  async add(peli: Peli): Promise<boolean> {
    const pelis = await this.getAll();
    const yaExiste = await this.getById(peli.id);

    if (yaExiste) {
      return false;
    }

    pelis.push(peli);
    await jsonfile.writeFile("./pelis.json", pelis);
    return true;
  }

    async search(options: { title?: string; tag?: string }): Promise<Peli[]> {
  let peliculas = await this.getAll();

  if (options.title) {
    const titleSearch = options.title.toLowerCase();
    peliculas = peliculas.filter((peli) =>
      peli.title.toLowerCase().includes(titleSearch)
    );
  }

  if (options.tag) {
    const tagSearch = options.tag.toLowerCase();
    peliculas = peliculas.filter((peli) =>
      peli.tags.some((tag) => tag.toLowerCase() === tagSearch)
    );
  }

  return peliculas;
}
  
}  
    
export { PelisCollection, Peli };
