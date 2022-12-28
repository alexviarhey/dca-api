import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { AjvExceptionFilter } from "./app/common/exeption-filters";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
const axios = require("axios");
import { parse } from "csv-parse";

const fs = require("fs");


const PORT = process.env.PORT || 8000;

const parseMKB = async () => {
    let res = [];

    fs.readFile("src/mkb.csv", "utf-8", (err, data) => {
        if (err) console.log(err);
        else {
            res = data
                .split("\r\n")
                .filter(r => r !== "")
                .map(r => {
                    const splitted = r.split("—");
                    return { code: splitted[0].trim(), name: splitted[1].trim() }
                });

            console.log(res);
        }
    });


};

//parseMKB();


async function bootstrap() {
   
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle("Dca")
        .setDescription("The dca API")
        .setVersion("1.0")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    app.setGlobalPrefix("/api");
    app.enableCors({
        origin: ["http://localhost:3000"],
        credentials: true
    });
    app.useGlobalFilters(new AjvExceptionFilter());
    await app.listen(PORT);
    console.log("App started at port", PORT);

}

bootstrap();

