import csvParse from "csv-parse";
import fs from "fs";

class ImportCategoryUseCase {
    execute(file: Express.Multer.File): void {
        const stream = fs.createReadStream(file.path);
        // csvParse() -  responsavel por ler linha por linha do arquivo
        const parseFile = csvParse();

        // "pipe" Responsavel por pegar o pedaço lido e repassar para dentro do parseFile
        stream.pipe(parseFile);
        // "on"  recebe a linha que esta lendo e aplica uma ação no caso print no console
        parseFile.on("data", async (line) => {
            console.log(line);
        });
    }
}

export { ImportCategoryUseCase };
