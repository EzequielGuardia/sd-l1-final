import minimist from 'minimist';// Ajusta la ruta según tu estructura
import { Peli } from './models'; // Asegúrate de tener el tipo Peli definido
import { PelisController }  from "./controllers";

const controller = new PelisController();

async function main() {
  const args = minimist(process.argv.slice(2));
  
  if (args.add) {
    // Agregar película
    const peli: Peli = {
      id: args.id,
      title: args.title,
      tags: Array.isArray(args.tags) ? args.tags : [args.tags],
    };

    const resultado = await controller.add(peli);
    console.log(resultado ? 'Película agregada correctamente' : 'Error al agregar la película');
  } else if (args.get) {
    // Obtener película por ID
    const peli = await controller.get({ id: args.get });
    console.log(peli ? peli : 'Película no encontrada');
  } else if (args.search) {
    // Buscar película por título o tag
    const searchOptions = {
      id: args.number,
        search: {
          title: args.string,
          tag: args.string,
  },
};
    
    const resultados = await controller.get(searchOptions);
    console.log(resultados.length > 0 ? resultados : 'No se encontraron películas');
  } else {
    console.log('Comando no reconocido. Usa --add, --get o --search.');
  }
}

main().catch(err => {
  console.error('Error:', err);
});
