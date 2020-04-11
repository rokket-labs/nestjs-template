import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import { nanoid } from 'nanoid'
import * as path from 'path'
import { FileUpload } from 'src/helpers/fileUploadDefinitions'

@Injectable()
export class FilesService {
  async create(file: FileUpload): Promise<string> {
    const { createReadStream, filename } = file
    const extension = filename.split('.').pop()
    const name = `${nanoid(30)}.${extension}`
    await new Promise((res, rej) =>
      createReadStream()
        .pipe(
          fs.createWriteStream(path.join(__dirname, name)),
        ) /* aqui implementa tu servicio en vez de fs */
        .on('finish', res)
        .on('error', rej),
    )
    return name
  }

  async delete(fileUrl: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.unlink(path.join(__dirname, fileUrl), err => {
        if (err) reject(err)
        resolve(true)
      })
    })
  }
}
