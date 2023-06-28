import { Controller, Get } from "@nestjs/common";
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
import * as fs from 'fs';
import * as path from "path";


@Controller("print/test")
export class PrintController {

    constructor(
    ) { }


    @Get("")
    async print() {
        console.log(process.cwd() + '/templates/first.docx')
        try {
            const content = fs.readFileSync(process.cwd() + '/templates/first.docx')

            const zip = new PizZip(content);

            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });

            // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
            doc.render({
                first_name: "Иванов Иван Иванович",
                date_of_birth: `"23" января 2021 года`
            });

            const buf = doc.getZip().generate({
                type: "nodebuffer",
                // compression: DEFLATE adds a compression step.
                // For a 50MB output document, expect 500ms additional CPU time
                compression: "DEFLATE",
            });

            fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);

            return buf
        } catch (err) {
            console.error("OPEN TEMPLATE ERROR: ", err);
        }
    }
}
