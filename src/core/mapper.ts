export abstract class Mapper<Model, Dto, CreateDto> {
    abstract map(model: Model): Dto

    abstract mapToSchema(dto: CreateDto): Model

    public mapArray(models: Model[]): Dto[] {
        return models.map(this.map)
    }

    public mapToSchemaArray(dtos: CreateDto[]): Model[] {
        return dtos.map(this.mapToSchema)
    }

}