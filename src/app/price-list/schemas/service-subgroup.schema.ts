import { ObjectId, Schema } from "mongoose";

export interface IServiceSubgroup {
  _id: ObjectId
  subgroupNumber: number
  name: string
  priceItemsIds: string[]
}


export const serviceSubgroupSchema = new Schema<IServiceSubgroup>({
  subgroupNumber: { type: Number, required: true },
  name: { type: String, required: true },
  priceItemsIds: { type: [String], required: true },
})


export const SERVICE_SUBGROUPS = "service_subgroups"
