export abstract class Mapper<Model, Dto> {
    abstract map(model: Model): Dto

    public mapArray(models: Model[]): Dto[] {
        return models.map(this.map)
    }

}