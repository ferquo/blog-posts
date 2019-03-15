import { Injectable } from '@nestjs/common';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

@Injectable()
export class ConfigurationService {
    private config: any;

    constructor(private configFileName: string) { }

    async load() {
        try {
            this.config = yaml.safeLoad(fs.readFileSync(this.configFileName, 'utf8'));
        } catch (e) {
            console.log(e);
        }
    }

    getSettings() {
        return this.config;
    }
}
