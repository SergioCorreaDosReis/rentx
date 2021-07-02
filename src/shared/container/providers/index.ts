import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
	"DayjsDateProvider", // Nome do nosso container
	DayjsDateProvider // Nome da classe que queremos chamar
);
