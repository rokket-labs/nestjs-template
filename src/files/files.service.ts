import * as fs from 'fs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

import { FileUpload } from 'src/helpers/fileUploadDefinitions';

@Injectable()
export class FilesService {
  async create(file: FileUpload): Promise<string> {
    const { createReadStream, filename } = file;
    const extension = filename.split('.').pop();
    const name = `${nanoid(30)}.${extension}`;

    await new Promise((res, rej) =>
      createReadStream()
        .pipe(
          fs.createWriteStream(path.join(__dirname, name)),
        ) /* Use your own implementation (S3, GCB, FTP, etc.) */
        .on('finish', res)
        .on('error', rej),
    );

    return name;
  }

  async delete(fileUrl: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.unlink(path.join(__dirname, fileUrl), (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}
