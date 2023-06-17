import { Model } from "mongoose"
import { BaseService } from "../../../core/base.service"
import { Mapper } from "../../../core/mapper"
import { Result } from "../../../core/result"
import { IPatientCardSchema } from "../schemas/patientCard.schema"

export type TabSchema = (IPatientCardSchema)[keyof IPatientCardSchema]

export class CardTabService<Dto, M extends Mapper<TabSchema, Dto>> extends BaseService {
    constructor(
        private cardModel: Model<IPatientCardSchema>,
        private mapper: M,
        private tabName: keyof IPatientCardSchema
    ) {
        super("CardTabService")
    }

    public async getTabData(cardId: string): Promise<Result<Dto>> {
        try {
            const card = await this.cardModel.findById(
                cardId,
                { [this.tabName]: 1 }
            )

            if (!card) {
                return Result.err(`Card with id ${cardId} not found!`)
            }

            return Result.ok(
                await this.mapper.map(card[this.tabName])
            )
        } catch (error) {
            return this.errorLogger.logErrorAndReturnSomethingWentWrongResult({
                method: 'getTabData',
                error
            })
        }
    }

    public async updateTabData(cardId: string, data: Dto): Promise<Result> {
        try {

            const updateRes = await this.cardModel.updateOne(
                {
                    _id: cardId
                },
                {
                    $set: {
                        [this.tabName]: await this.mapper.mapToSchema(data)
                    }
                }
            )

            return updateRes.modifiedCount
                ? Result.ok()
                : Result.err('Карточка не найдена!')

        } catch (error) {
            return this.errorLogger.logErrorAndReturnSomethingWentWrongResult({
                method: 'updateTabData',
                error
            })
        }
    }
}
