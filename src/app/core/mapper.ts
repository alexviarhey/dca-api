


interface IMapper<Model, Dto> {
  map(model: Model): Promise<Dto>
}