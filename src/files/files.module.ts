import { Module } from '@nestjs/common';

import { FilesResolver } from './files.resolver';
import { FilesService } from './files.service';

@Module({
  providers: [FilesService, FilesResolver],
})
export class FilesModule {}
