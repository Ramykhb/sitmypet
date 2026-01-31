import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class R2Service {
  private r2Client: S3Client;

  constructor(private configService: ConfigService) {
    this.r2Client = new S3Client({
      region: 'auto',
      endpoint: `https://${this.configService.get<string>('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: this.configService.get<string>('R2_ACCESS_KEY')!,
        secretAccessKey: this.configService.get<string>('R2_SECRET_KEY')!,
      },
    });
  }

  async upload(
    buffer: Buffer,
    fileName: string,
    mimeType: string,
    folder: string = 'uploads',
  ) {
    const key = `${folder}/${Date.now()}-${fileName}`;

    await this.r2Client.send(
      new PutObjectCommand({
        Bucket: this.configService.get<string>('R2_BUCKET')!,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
      }),
    );

    const publicUrl = `${this.configService.get<string>('R2_PUBLIC_URL')}/${key}`;

    return {
      key,
      url: publicUrl,
    };
  }
}
