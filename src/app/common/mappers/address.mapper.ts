import { Mapper } from "../../../core/mapper";
import { IAddressSchema } from "../schemas/address.schema";
import { AddressDto, CreateAddressDto } from "../dto/adress.dtos";


export class AddressMapper extends Mapper<IAddressSchema, AddressDto, CreateAddressDto> {
    async map(model: IAddressSchema) {
        return {
            country: model.country,
            city: model.city,
            street: model.street,
            house: model.house,
            apartment: model.apartment,
            text: model.text
        };
    }

    async mapToSchema(dto: CreateAddressDto): Promise<IAddressSchema> {
        const text =
            dto.country +
            dto.city +
            dto.street +
            dto.house +
            (dto.apartment ? dto.apartment : "");

        return {
            country: dto.country,
            city: dto.city,
            street: dto.street,
            house: dto.house,
            apartment: dto.apartment,
            text
        };
    }
}

export const addressMapper = new AddressMapper();
