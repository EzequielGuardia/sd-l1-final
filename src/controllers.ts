import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    tag?: string;
    titile? : string;
  };
};

class PelisController {
    private model:  PelisCollection;
  constructor() {
    this.model = new PelisCollection();
  }

  async get(options?: Options): Promise<Peli[]> {
    if (options?.id) {
      const peli = await this.model.getByid(options.id);
      return peli ? [peli]: [];
    } else if (options?.search) {
      return this.model.search(options.search)
  } else {
     return this.model.getAll();
  }

  }

}
export { PelisController };
