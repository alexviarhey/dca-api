import { Schema } from "mongoose";

export interface IHumanNameSchema {
    firstName: string
    lastName: string
    given: string
}


export const humanNameSchema = new Schema<IHumanNameSchema>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    given: { type: String, nullable: true, required: false, default: null},
}, { _id: false })
