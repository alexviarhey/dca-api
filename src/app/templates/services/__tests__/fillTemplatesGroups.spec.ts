import { TemplatesGroups, TemplatesService } from "../templates.service";
import { TemplatePlaceholdersTypes } from "../../schemas/placeholder";
import { ITemplateSchema } from "../../schemas/template.schema";
import { Model } from "mongoose";


describe("fillTemplatesGroups", () => {

    const mockModel = {
        async find() {
            return [
                { _id: "1", description: "Первый длина: {{length}}, зуб: {{tooth}}." },
                { _id: "2", description: "Второй высота: {{height}}, зуб: {{tooth}}." },
                { _id: "3", description: "Обычный третий шаблон." }
            ];
        }
    };

    const templatesGroup: TemplatesGroups = {
        complains: [
            {
                _id: "1",
                placeholders: {
                    [TemplatePlaceholdersTypes.LENGTH]: "10mm",
                    [TemplatePlaceholdersTypes.TOOTH]: "23"
                }
            }
        ],
        statusLocalis: [
            {
                _id: "2",
                placeholders: {
                    [TemplatePlaceholdersTypes.TOOTH]: "14",
                    [TemplatePlaceholdersTypes.HEIGHT]: "2sm"
                }
            },
            {
                _id: "3"
            }
        ]
    };

    it("Should return valid filled joined templates descriptions", async () => {
        const templatesService = new TemplatesService(mockModel as unknown as Model<ITemplateSchema>);
        const res = await templatesService.fillTemplatesGroups(templatesGroup);

        expect(res).toEqual({
            complains: "Первый длина: 10mm, зуб: 23.",
            statusLocalis: "Второй высота: 2sm, зуб: 14. Обычный третий шаблон."
        });
    });
});