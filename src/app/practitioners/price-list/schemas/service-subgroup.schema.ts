import { ObjectId, Schema } from "mongoose";

interface ISubgroupPriceItems {
    _id: string,
    quantity: number
}

export interface IServiceSubgroup {
    _id?: ObjectId;
    subgroupNumber: string;
    name: string;
    priceItems: ISubgroupPriceItems[];
}

const subgorupPriceItemsSchema = new Schema({
    _id: { type: String, required: true },
    quantity: { type: Number, required: true }
});


export const serviceSubgroupSchema = new Schema<IServiceSubgroup>({
    subgroupNumber: { type: String, required: true },
    name: { type: String, required: true },
    priceItems: { type: [subgorupPriceItemsSchema], required: false, default: [] }
});


export const SERVICE_SUBGROUPS = "service_subgroups";
