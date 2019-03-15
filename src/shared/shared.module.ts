import { Module } from '@nestjs/common';
import { DatabaseService } from './database-service';
import { ConfigurationService } from './configuration/configuration.service';
import { configurationServiceFactory } from './configuration/configuration-service-factory';
import { databaseServiceFactory } from './database-service-factory';

@Module({
  providers: [{
    provide: DatabaseService,
    useFactory: databaseServiceFactory,
    inject: [ConfigurationService],
  },
    {
      provide: ConfigurationService,
      useFactory: configurationServiceFactory,
    }],
  exports: [DatabaseService],
})
export class SharedModule {}
