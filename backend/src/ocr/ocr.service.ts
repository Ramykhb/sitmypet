import { HttpException, Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { PrismaService } from '../prisma/prisma.service';
import { R2Service } from '../storage/r2.service';

@Injectable()
export class OcrService {
  constructor(
    private prisma: PrismaService,
    private r2Service: R2Service,
  ) {}

  async handleUpload(file: Express.Multer.File, userId: string) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    if (
      !file.mimetype.includes('image') &&
      file.mimetype !== 'application/pdf'
    ) {
      throw new Error('Invalid file type');
    }

    const uploaded = await this.r2Service.upload(
      file.buffer,
      file.originalname,
      file.mimetype,
      'uploads/ids',
    );

    const tempDir = path.join(process.cwd(), 'uploads', 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    const tempFilePath = path.join(
      tempDir,
      `ocr_${Date.now()}_${file.originalname}`,
    );
    fs.writeFileSync(tempFilePath, file.buffer);

    return new Promise((resolve, reject) => {
      const scriptPath = 'scripts/ocr.py';
      exec(
        `python3.13 ${scriptPath} "${tempFilePath}"`,
        async (err, stdout) => {
          try {
            if (fs.existsSync(tempFilePath)) {
              fs.unlinkSync(tempFilePath);
            }
          } catch (cleanupErr) {
            console.error('Failed to cleanup temp file:', cleanupErr);
          }

          if (err) {
            console.error(err);
            return reject('OCR failed: ' + err.message);
          }

          try {
            const ocrResult = JSON.parse(stdout);
            const parsed = this.parseText(ocrResult.text);
            const detected = parsed.documentType !== 'UNKNOWN';

            const dbStatus = detected ? 'VERIFIED' : 'UNVERIFIED';
            const clientStatus = dbStatus;

            let profile = await this.prisma.profile.findUnique({
              where: { userId },
            });
            if (!profile) {
              profile = await this.prisma.profile.create({
                data: {
                  userId,
                  location: 'Unknown',
                },
              });
            }

            const doc = await this.prisma.document.upsert({
              where: { profileId: profile.id },
              update: {
                fileUrl: uploaded.url,
                fileKey: uploaded.key,
                status: dbStatus,
              },
              create: {
                profileId: profile.id,
                fileUrl: uploaded.url,
                fileKey: uploaded.key,
                status: dbStatus,
              },
            });

            resolve({
              status: clientStatus,
              documentType: parsed.documentType,
              documentId: doc.id,
              url: uploaded.url,
            });
          } catch (e) {
            console.error('Error parsing/saving:', e);
            reject('Processing failed: ' + e.message);
          }
        },
      );
    });
  }

  parseText(text: string) {
    const cleanedText = text.replace(/\s+/g, ' ').trim();

    const keywords = [
      'الجمهورية اللبنانية',
      'لبنانية',
      'جمهورية',
      'بطاقة هوية',
      'هوية',
      'جواز سفر',
      'Passport',
      'رخصة سوق',
      'DRIVING LICENSE',
      'PERMIS DE CONDUIRE',
    ];

    const detectedType = keywords.some((k) =>
      cleanedText.toLowerCase().includes(k.toLowerCase()),
    )
      ? 'LEBANESE_DOCUMENT'
      : 'UNKNOWN';

    let specificType = detectedType;
    if (cleanedText.includes('بطاقة هوية') || cleanedText.includes('هوية'))
      specificType = 'ID_CARD';
    if (
      cleanedText.includes('جواز سفر') ||
      cleanedText.toLowerCase().includes('passport')
    )
      specificType = 'PASSPORT';
    if (
      cleanedText.includes('رخصة سوق') ||
      cleanedText.toLowerCase().includes('driving license')
    )
      specificType = 'DRIVING_LICENSE';

    return {
      documentType: specificType,
    };
  }

  async getVerificationStatus(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: { document: true },
    });

    if (!profile || !profile.document) {
      throw new HttpException(
        {
          status: 'NONE',
          message: 'No document uploaded',
        },
        410,
      );
    }

    const document = profile.document;

    if (document.status === 'UNVERIFIED') {
      throw new HttpException(
        {
          status: 'UNVERIFIED',
          documentId: document.id,
          message: 'Document uploaded but not verified',
        },
        410,
      );
    }

    return {
      status: document.status,
      documentId: document.id,
      uploadedAt: document.createdAt,
      rejectionReason: null,
    };
  }
}
