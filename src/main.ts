import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// export let logger;

async function bootstrap() {
  bootstrapAzureInsights();
  const app = await NestFactory.create(AppModule);
  await app.listen(3333);
}
bootstrap();

function bootstrapAzureInsights() {
  const appInsights = require('applicationinsights');
  appInsights
    .setup('3e9b9276-e7df-4537-a858-6dad09ebf4c0')
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .start();
 }
