import { Schema } from "mongoose";

export interface ICommonDiseasesSchema {
    cardiovascularSystem: string | null;
    nervousSystem: string | null;
    endocrineSystem: string | null;
    digestiveSystem: string | null;
    respiratorySystem: string | null;
    allergicReactions: string | null;
    continuousUseOfMedicines: string | null;
    harmfulFactors: string | null;
    pregnancyOrPostpartumPeriod: string | null;
    infectiousDiseases: string | null;
}


export const commonDiseasesSchema = new Schema<ICommonDiseasesSchema>({
    cardiovascularSystem: { type: String, nullable: true, default: null },
    nervousSystem: { type: String, nullable: true, default: null },
    endocrineSystem: { type: String, nullable: true, default: null },
    digestiveSystem: { type: String, nullable: true, default: null },
    respiratorySystem: { type: String, nullable: true, default: null },
    allergicReactions: { type: String, nullable: true, default: null },
    continuousUseOfMedicines: { type: String, nullable: true, default: null },
    harmfulFactors: { type: String, nullable: true, default: null },
    pregnancyOrPostpartumPeriod: { type: String, nullable: true, default: null },
    infectiousDiseases: { type: String, nullable: true, default: null }
}, { _id: false });
