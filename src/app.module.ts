import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [BlogModule, SharedModule],
})
export class AppModule {}
