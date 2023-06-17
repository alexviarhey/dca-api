import { ObjectId, Schema } from "mongoose"

export interface IPriceItemSchema {
  _id?: ObjectId
  itemNumber: string
  name: string
  materialsCost: number
  serviceCost: number
}

export const priceItemSchema = new Schema<IPriceItemSchema>({
  itemNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  materialsCost: { type: Number, required: true },
  serviceCost: { type: Number, required: true },
})

export const PRICE_ITEMS = "price_items"
