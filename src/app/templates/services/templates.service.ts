import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ITemplateSchema, TEMPLATES_COLLECTION } from "../schemas/template.schema";
import { Model } from "mongoose";
import { templatePlaceholdersMap } from "../schemas/placeholder";

type TemplatesForFill = Array<{
    _id: string,
    placeholders?: { [key: number]: string }
}>

export type TemplatesGroups = {
    [key: string]: TemplatesForFill
}

@Injectable()
export class TemplatesService {

    constructor(
        @InjectModel(TEMPLATES_COLLECTION)
        private templatesModel: Model<ITemplateSchema>
    ) {
    }

    async fillTemplatesGroups(groups: TemplatesGroups): Promise<{ [key: string]: string }> {
        try {
            const templatesIds = Object.values(groups)
                .flat()
                .map(t => t._id);

            const templates = await this.templatesModel.find({
                _id: { $in: templatesIds }
            });

            const templatesMap = new Map(
                templates.map(t => [t._id, t])
            );

            const result = {};

            for (let [k, templatesForFill] of Object.entries(groups)) {
                let finalText = "";

                templatesForFill.forEach(tForFill => {
                    const template = templatesMap.get(tForFill._id);

                    if (!template) {
                        console.log(`Template ${tForFill._id} not found in template map`);
                        return;
                    }

                    let filledTemplateDescription = template.description;

                    if (tForFill.placeholders) {
                        for (let [placeholderType, v] of Object.entries(tForFill.placeholders)) {
                            const placeholder = templatePlaceholdersMap.get(+placeholderType);

                            filledTemplateDescription = filledTemplateDescription.replace(new RegExp(placeholder, "g"), v);
                        }
                    }

                    finalText += " " + filledTemplateDescription;
                });

                result[k] = finalText.trim();
            }

            return result;

        } catch (e) {
            console.log(e);
        }
    }
}