import { Peli,  PelisCollection } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
    model: PelisCollection;

    constructor() {
      this.model = new PelisCollection();
    }

    async get(options?: Options): Promise<Peli[]> {
  // 1) Sin opciones: todas las películas
  if (!options) {
    return this.model.getAll();
  }
  // 2) Búsqueda por ID
  if (options.id !== undefined) {
    const peli = await this.model.getById(options.id);
    return peli ? [peli] : [];    // <— devuelve [] si no existe
  }
  // 3) Búsqueda por title/tag
  if (options.search) {
    return this.model.search(options.search);
  }
  return [];
}


    async search(options?: Options): Promise<Peli[]> {
      if(options?.id){
        const peli = await this.model.getById(options.id); // Buscar por ID
        return peli ? [peli] : [];
      }else if(options?.search){
        return this.model.search(options.search); // Buscar por opciones
      } else {
        return this.model.getAll(); // Entrega todas las peliculas
      }
    }

    async add(pelicula: Peli): Promise<boolean> {
      const existe = await this.model.getById(pelicula.id)
      if(existe){
        return false;
      } else {
        await this.model.add(pelicula);
        return true;
      }
    }
}

export { PelisController }
