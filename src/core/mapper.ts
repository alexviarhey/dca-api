export abstract class Mapper<Model, Dto, CreateDto> {
    abstract map(model: Model): Dto

    abstract mapToSchema(dto: CreateDto | Partial<CreateDto>): Model

    public mapArray(models: Model[]): Dto[] {
        return models.map(this.map)
    }

    public mapToSchemaArray(dtos: CreateDto[]): Model[] {
        return dtos.map(this.mapToSchema)
    }

    public mapToSchemaPartial(dto: Partial<CreateDto>): Partial<Model> {
        const fullSchema = this.mapToSchema(dto)

        //remove undefined fields
        Object.keys(fullSchema).forEach(key => {
            if(fullSchema[key] === undefined) {
                delete fullSchema[key]
            }
        })

        return fullSchema
    }
}