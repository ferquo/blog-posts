import { ConfigurationService } from './configuration.service';

export const configurationServiceFactory = async () => {
  const service = new ConfigurationService('config.yml');
  await service.load();
  return service;
};
