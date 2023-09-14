import { FilterQuery, Schema } from "mongoose";
import { ContactPointSystem, ContactPointUse } from "../schemas/contact-point.schema";
import { ApiProperty } from "@nestjs/swagger";

export const contactPointValidationSchema = {
    type: "object",
    required: ["system", "value"],
    properties: {
        system: {
            type: "string",
            enum: Object.values(ContactPointSystem),
        },
        use: {
            type: "string",
            enum: Object.values(ContactPointUse)
        },
        value: {
            type: "string"
        }
    },
    allOf: [
        {
            if: { properties: { system: { const: ContactPointSystem.PHONE } } },
            then: { properties: { value: { type: "string", pattern: "^\[0-9]+$" } } },
        },
        {
            if: { properties: { system: { const: ContactPointSystem.EMAIL } } },
            then: { properties: { value: { type: "string", format: "email" } } },
        },
        {
            if: { properties: { system: { const: ContactPointSystem.URL } } },
            then: { properties: { value: { type: "string", format: "uri" } } },
        }
    ],
    additionalProperties: false,
}


export class CreateContactPointDto {
    @ApiProperty({ enum: ContactPointSystem })
    system: ContactPointSystem

    @ApiProperty({ enum: ContactPointUse, required: false })
    use?: ContactPointUse

    @ApiProperty()
    value: string
}


export class ContactPointDto {
    @ApiProperty({ enum: ContactPointSystem })
    system: ContactPointSystem

    @ApiProperty({ enum: ContactPointUse })
    use: ContactPointUse

    @ApiProperty()
    value: string
}

type DtoWithContactPoint = {
    telecom?: CreateContactPointDto[]
}
export class ContactPointHelper {
    public static getFilterByPhone<S extends Schema, D extends DtoWithContactPoint>(dto: D): FilterQuery<S> {
        let filterQuery: FilterQuery<S> = {}

        if (dto.telecom && dto.telecom.length) {
            const phones = dto.telecom.filter(t => t.system === ContactPointSystem.PHONE);
            if (!phones.length) return filterQuery

            const phoneValues = []

            for (const phone of phones) {
                phoneValues.push(phone.value)
            }
            filterQuery = {
                "telecom.value": { $in: phoneValues }
            };
        }

        return filterQuery
    }
}
