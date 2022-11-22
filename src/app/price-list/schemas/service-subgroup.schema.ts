import { ObjectId, Schema } from "mongoose";

export interface IServiceSubgroup {
  _id?: ObjectId
  subgroupNumber: string
  name: string
  priceItemsIds: string[]
}


export const serviceSubgroupSchema = new Schema<IServiceSubgroup>({
  subgroupNumber: { type: String, required: true },
  name: { type: String, required: true },
  priceItemsIds: { type: [String], required: false, default: [] },
})


export const SERVICE_SUBGROUPS = "service_subgroups"
