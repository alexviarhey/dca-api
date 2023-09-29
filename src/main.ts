import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { AjvExceptionFilter } from "./app/patient-card/common/exeption-filters";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const PORT = process.env.PORT || 8000;
const isProd = process.env.NODE_ENV = 'production'

const runSwagger = (app) => {
    const config = new DocumentBuilder()
        .setTitle("Dca")
        .setDescription("The dca API")
        .setVersion("1.0")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
}

const runApp = async () => {
    const app = await NestFactory.create(AppModule);

    if (!isProd) {
        runSwagger(app)
    }

    app.setGlobalPrefix("/api");

    app.enableCors({
        origin: [
            "http://localhost:3000",
            "https://dca-ved6.onrender.com"
        ],
        credentials: true
    });

    app.useGlobalFilters(new AjvExceptionFilter());

    await app.listen(PORT);

    console.log("App started at port", PORT);

}


runApp();
