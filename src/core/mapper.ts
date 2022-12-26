export abstract class Mapper<Model, Dto, CreateDto> {
    abstract map(model: Model): Dto

    abstract mapToSchema(dto: CreateDto | Partial<CreateDto>): Promise<Model>

    public mapArray(models: Model[]): Promise<Dto[]> {
        return Promise.all(models.map(this.map))
    }

    public mapToSchemaArray(dtos: CreateDto[]): Promise<Model[]> {
        return Promise.all(dtos.map(this.mapToSchema))
    }

    public mapToSchemaPartial(dto: Partial<CreateDto>): Promise<Partial<Model>> {
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