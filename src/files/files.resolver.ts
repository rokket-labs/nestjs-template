import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { FileUpload, GraphQLUpload } from 'src/helpers/fileUploadDefinitions';

import { File } from './files.model';
import { FilesService } from './files.service';

@Resolver(File)
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @Mutation(() => File)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) fileInput: FileUpload,
  ): Promise<File> {
    const url = await this.filesService.create(fileInput);

    return { url, success: true };
  }

  @Mutation(() => Boolean)
  async removeFile(@Args('fileUrl') fileUrl: string): Promise<boolean> {
    return this.filesService.delete(fileUrl);
  }
}
