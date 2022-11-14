import { ObjectId, Schema } from "mongoose";

export interface IServiceGroup {
  _id: ObjectId
  groupNumber: number
  name: string
  subgroupsIds: string[]
}


export const serviceGroupSchema = new Schema<IServiceGroup>({
  groupNumber: { type: Number, required: true },
  name: { type: String, required: true },
  subgroupsIds: { type: [String], required: true },
})


export const SERVICE_GROUPS = "service_groups"