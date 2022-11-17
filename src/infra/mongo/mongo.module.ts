import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoService } from "./mongo.service";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const isTest = configService.get<string>("NODE_ENV") === 'test'
        const uri = configService.get<string>(!isTest ? 'MONGO_URI' : 'MONGO_TEST_URI')

        console.log(uri)

        return {
          uri
        }
      },
      inject: [ConfigService],
      imports: [ConfigModule]
    })
  ],
  providers: [MongoService],
  exports: [MongoService]
})
export class MongoModule { }
