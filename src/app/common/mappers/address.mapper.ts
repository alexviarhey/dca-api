import { Mapper } from "../../core/mapper";
import { IAddressSchema } from "../schemas/address.schema";
import { AddressDto } from "../dto/adress.dtos";


export class AddressMapper extends Mapper<IAddressSchema, AddressDto> {
    map(model: IAddressSchema) {
        const text =
            model.country +
            model.city +
            model.street +
            model.house +
            model.apartment ? model.apartment : ''

       return {
           text,
           country: model.country,
           city: model.city,
           street: model.street,
           house: model.house,
           apartment: model.apartment
       }
    }
}

export const addressMapper = new AddressMapper()