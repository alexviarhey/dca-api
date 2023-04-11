export abstract class Mapper<Model, Dto, CreateDto = Dto> {
    abstract map(model: Model): Promise<Dto>

    abstract mapToSchema(dto: CreateDto | Partial<CreateDto>): Promise<Model>

    public mapArray(models: Model[]): Promise<Dto[]> {
        return Promise.all(models.map(this.map.bind(this)))
    }

    public mapToSchemaArray(dtos: CreateDto[]): Promise<Model[]> {
        return Promise.all(dtos.map(this.mapToSchema.bind(this)))
    }

    public mapToSchemaPartial(dto: Partial<CreateDto>): Promise<Partial<Model>> {
        const fullSchema = this.mapToSchema(dto)

        //remove undefined fields
        Object.keys(fullSchema).forEach(key => {
            if (fullSchema[key] === undefined) {
                delete fullSchema[key]
            }
        })

        return fullSchema
    }
}
