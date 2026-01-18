import { HttpException, Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OcrService {
  constructor(private prisma: PrismaService) {}

  async handleUpload(file, userId: string) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    if (!file.mimetype.includes('image') && file.mimetype !== 'application/pdf') {
      throw new Error('Invalid file type');
    }

    if (!fs.existsSync('uploads/ids')) {
      fs.mkdirSync('uploads/ids', { recursive: true });
    }

    const filePath = `uploads/ids/${Date.now()}_${file.originalname}`;
    fs.writeFileSync(filePath, file.buffer);

    return new Promise((resolve, reject) => {
      const scriptPath = 'scripts/ocr.py'; 
      exec(`python3.13 ${scriptPath} "${filePath}"`, async (err, stdout) => {
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

            let profile = await this.prisma.profile.findUnique({ where: { userId } });
            if (!profile) {
                profile = await this.prisma.profile.create({
                    data: {
                        userId,
                        location: 'Unknown',
                    }
                });
            }

            const doc = await this.prisma.document.upsert({
              where: { profileId: profile.id },
              update: {
                filePath,
                status: dbStatus
              },
              create: {
                profileId: profile.id,
                filePath,
                status: dbStatus
              }
            });

            resolve({
              status: clientStatus,
              documentType: parsed.documentType,
              documentId: doc.id
            });
        } catch (e) {
            console.error("Error parsing/saving:", e);
            reject("Processing failed: " + e.message);
        }
      });
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
      'PERMIS DE CONDUIRE'
    ];

    const detectedType = keywords.some(k => 
      cleanedText.toLowerCase().includes(k.toLowerCase())
    ) ? 'LEBANESE_DOCUMENT' : 'UNKNOWN';

    let specificType = detectedType;
    if (cleanedText.includes('بطاقة هوية') || cleanedText.includes('هوية')) specificType = 'ID_CARD';
    if (cleanedText.includes('جواز سفر') || cleanedText.toLowerCase().includes('passport')) specificType = 'PASSPORT';
    if (cleanedText.includes('رخصة سوق') || cleanedText.toLowerCase().includes('driving license')) specificType = 'DRIVING_LICENSE';

    return {
      documentType: specificType
    };
  }

  async getVerificationStatus(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: { document: true },
    });

    if (!profile || !profile.document) {
      throw new HttpException({
        status: 'NONE',
        message: 'No document uploaded',
      }, 410);
    }
    
    const document = profile.document;

    if (document.status === 'UNVERIFIED') {
       throw new HttpException({
        status: 'UNVERIFIED',
        documentId: document.id,
        message: 'Document uploaded but not verified',
      }, 410);
    }

    return {
      status: document.status,
      documentId: document.id,
      uploadedAt: document.createdAt,
      rejectionReason: null,
    };
  }
}