import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { File } from './files.schema'
import { FilesService } from './files.service'
import { GraphQLUpload, FileUpload } from 'src/helpers/fileUploadDefinitions'

@Resolver(File)
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @Mutation(() => File)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) fileInput: FileUpload,
  ): Promise<File> {
    const url = await this.filesService.create(fileInput)
    return { url, success: true }
  }

  @Mutation(() => Boolean)
  async removeFile(@Args('fileUrl') fileUrl: string): Promise<boolean> {
    return await this.filesService.delete(fileUrl)
  }
}
