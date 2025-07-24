import minimist from "minimist";
import { Peli } from "./models";
import { PelisController } from "./controllers";

const controller = new PelisController();

async function main() {
  const args = minimist(process.argv.slice(2));
  const cmd  = args._[0];               // "add" | "get" | "search"

  if (cmd === "add") {
    const peli: Peli = {
      id:    Number(args.id),
      title: String(args.title),
      tags:  Array.isArray(args.tags) ? args.tags : [args.tags],
    };
    const ok = await controller.add(peli);
    console.log(ok
      ? "Película agregada correctamente"
      : "Error al agregar la película"
    );

  } else if (cmd === "get") {
    const id    = Number(args._[1]);
    const pelis = await controller.get({ id });
    console.log(pelis.length ? pelis : "Película no encontrada");

  } else if (cmd === "search") {
    const opts: any = {};
    if (args.title) opts.title = String(args.title);
    if (args.tag)   opts.tag   = String(args.tag);

    const pelis = await controller.get({ search: opts });
    console.log(pelis.length ? pelis : "No se encontraron películas");

  } else {
    console.log(
      "Uso:\n" +
      "  add --id=.. --title=.. --tags=..\n" +
      "  get <id>\n" +
      "  search [--title=..] [--tag=..]"
    );
  }
}

main().catch(console.error);
