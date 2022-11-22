import { ObjectId, Schema } from "mongoose";

export interface IServiceGroup {
  _id?: string
  groupNumber: string
  name: string
  subgroupsIds: string[]
}


export const serviceGroupSchema = new Schema<IServiceGroup>({
  groupNumber: { type: String, required: true },
  name: { type: String, required: true },
  subgroupsIds: { type: [String], required: false, default: []},
})


export const SERVICE_GROUPS = "service_groups"