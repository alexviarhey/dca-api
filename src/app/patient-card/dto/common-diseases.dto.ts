import { ApiProperty } from "@nestjs/swagger";

export const commonDiseasesAjvSchema = {
    type: "object",
    additionalProperties: false,
    allRequired: true,
    properties: {
        stateOfHealth: { type: 'string' },
        cardiovascularSystem: { type: 'string' },
        nervousSystem: { type: 'string' },
        endocrineSystem:{ type: 'string' },
        digestiveSystem: { type: 'string' },
        respiratorySystem: { type: 'string' },
        allergicReactions: { type: 'string' },
        continuousUseOfMedicines: { type: 'string' },
        harmfulFactors: { type: 'string' },
        pregnancyOrPostpartumPeriod: { type: 'string' },
        infectiousDiseases: { type: 'string' },
        other: { type: 'string' },
    }
};

export class CreateCommonDiseasesDto {
    @ApiProperty({ nullable: true })
    stateOfHealth: string | null;

    @ApiProperty({ nullable: true })
    cardiovascularSystem: string | null;

    @ApiProperty({ nullable: true })
    nervousSystem: string | null;

    @ApiProperty({ nullable: true })
    endocrineSystem: string | null;

    @ApiProperty({ nullable: true })
    digestiveSystem: string | null;

    @ApiProperty({ nullable: true })
    respiratorySystem: string | null;

    @ApiProperty({ nullable: true })
    allergicReactions: string | null;

    @ApiProperty({ nullable: true })
    continuousUseOfMedicines: string | null;

    @ApiProperty({ nullable: true })
    harmfulFactors: string | null;

    @ApiProperty({ nullable: true })
    pregnancyOrPostpartumPeriod: string | null;

    @ApiProperty({ nullable: true })
    infectiousDiseases: string | null;

    @ApiProperty({ nullable: true })
    other: string | null;
}

export class UpdateCommonDiseasesDto extends CreateCommonDiseasesDto {
}

export class CommonDiseasesDto extends CreateCommonDiseasesDto {
}
