export class ResponseMessages {

    constructor(private modelName: string) {
    }

    createdSuccessfully = `${this.modelName} успешно создан!`;

    updatedSuccessfully = `${this.modelName} успешно обновлен!`;

    deletedSuccessfully = `${this.modelName} успешно удален!`;
}