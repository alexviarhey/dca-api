import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ITemplateSchema, TEMPLATES_COLLECTION } from "../schemas/template.schema";
import { Model } from "mongoose";
import { templatePlaceholdersMap } from "../schemas/placeholder";
import { Result } from "../../../core/result";

type TemplatesForFill = Array<{
    _id: string,
    placeholders?: Array<{ [key: string]: string }>
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

    async fillTemplatesGroups(groups: TemplatesGroups): Promise<Result<{ [key: string]: string }>> {
        try {

            if (!this.validateTemplateGroups(groups)) {
                return Result.err("Invalid body!")
            }

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
                        tForFill.placeholders.forEach(p => {
                            for (let [placeholderType, v] of Object.entries(p)) {
                                const placeholder = templatePlaceholdersMap.get(+placeholderType);

                                filledTemplateDescription = filledTemplateDescription.replace(new RegExp(placeholder), v);
                            }
                        })

                    }

                    finalText += " " + filledTemplateDescription;
                });

                result[k] = finalText.trim();
            }

            return Result.ok(result)

        } catch (e) {
            console.log('fillTemplatesGroups error', e);
            return Result.err('Something went wrong!')
        }
    }

    private validateTemplateGroups(groups: TemplatesGroups): boolean {
        if (typeof groups !== 'object') return false

        for (let [_, templates] of Object.entries(groups)) {
            if (!Array.isArray(templates)) return false


            for (let template of templates) {
                if (!template._id) return false

                if (template.placeholders && Array.isArray(template.placeholders)) {
                    for (let [_, value] of Object.entries(template.placeholders)) {
                        if (typeof value !== 'object') return false
                    }
                }
            }
        }

        return true
    }
}
