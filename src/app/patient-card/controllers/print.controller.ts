import { Controller, Get } from "@nestjs/common";
import * as fs from 'fs';
import { PatchType, TextRun, UnderlineType, patchDocument } from "docx";




@Controller("print/test")
export class PrintController {

    constructor(
    ) { }


    @Get("")
    async print() {
        console.log(process.cwd() + '/templates/first.docx')
        try {
            const content = fs.readFileSync(process.cwd() + '/templates/first.docx')

            const doc = await patchDocument(content, {
                patches: {
                    full_name: {
                        type: PatchType.PARAGRAPH,
                        children: [new TextRun({
                            text: 'Иванов Иван Иванович',
                            bold: true,
                            font: 'Times New Roman',
                            size: '16pt',
                            underline: {
                                color: '#000000',
                                type: UnderlineType.SINGLE
                            }
                        })]
                    }
                },
            });

            fs.writeFileSync("out.docx", doc);

            return "SUCCESS"

        } catch (err) {
            console.error("OPEN TEMPLATE ERROR: ", err);
        }
    }
}
