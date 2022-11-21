import { Schema } from "mongoose"

export enum ContactPointSystem {
    PHONE = 'phone',
    EMAIL = 'email',
    URL = 'url'
}

export enum ContactPointUse {
    HOME = 'home',
    WORK = 'work',
}

// const EMAIL_REGEX = /^[a-zA-Z0-9!#$%&'*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(|\.[a-zA-Z0-9-]+)$/
// const PHONE_REGEX = /^[0-9\s+()-]+$/
// const URL_REGEX = /https(:\/\/)((www.)?)(([^.]+)\.)?([a-zA-z0-9\-_]+)(.com|.net|.gov|.org|.in|.by|.ru)(\/[^\s]*)?/


export interface IContactPointSchema {
    system: ContactPointSystem,
    use: ContactPointUse,
    value: string
}


export const contactPointSchema = new Schema<IContactPointSchema>({
    system: { type: String, enum: ContactPointSystem, required: true },
    use: { type: String, enum: ContactPointUse, required: false, default: ContactPointUse.HOME },
    value: { type: String, required: true }
}, { _id: false })
