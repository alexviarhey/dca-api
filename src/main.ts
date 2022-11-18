import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { AjvExceptionFilter } from "./app/common/exeption-filters";

const PORT = 8000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix("/api");
    app.enableCors({
        origin: ["http://localhost:3000"],
        credentials: true
    });
    app.useGlobalFilters(new AjvExceptionFilter())
    await app.listen(PORT);
    console.log("App started at port", PORT);
}

bootstrap();
