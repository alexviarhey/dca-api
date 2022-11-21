import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { AjvExceptionFilter } from "./app/common/exeption-filters";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const PORT = 8000;

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
