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

    if (!file.mimetype.includes('image')) {
      throw new Error('Invalid file type');
    }

    if (!fs.existsSync('uploads/ids')) {
      fs.mkdirSync('uploads/ids', { recursive: true });
    }

    const filePath = `uploads/ids/${Date.now()}_${file.originalname}`;
    fs.writeFileSync(filePath, file.buffer);

    return new Promise((resolve, reject) => {
      const scriptPath = 'scripts/ocr.py'; 
      exec(`python3 ${scriptPath} "${filePath}"`, async (err, stdout) => {
        if (err) {
          console.error(err);
          return reject('OCR failed: ' + err.message);
        }

        try {
            const ocrResult = JSON.parse(stdout);
            const parsed = this.parseText(ocrResult.text);
            const detected = parsed.documentType !== 'UNKNOWN';
            
            const dbStatus = 'UNVERIFIED';
            const clientStatus = detected ? 'VERIFIED' : 'UNVERIFIED';

            const doc = await this.prisma.document.create({
              data: {
                userId,
                filePath,
                rawText: ocrResult.text,
                idNumber: parsed.idNumber,
                dob: parsed.dateOfBirth,
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
      'بطاقة هوية',
      'جواز سفر',
      'Passport',
      'رخصة سوق',
    ];

    const detectedType = keywords.find(k => cleanedText.includes(k)) 
      ? 'LEBANESE_DOCUMENT' 
      : 'UNKNOWN';

    const idMatch = text.match(/\b\d{8,15}\b/); 
    const dateMatch = text.match(/\b\d{1,2}[/-]\d{1,2}[/-]\d{4}\b/);

    let specificType = detectedType;
    if (cleanedText.includes('بطاقة هوية')) specificType = 'ID_CARD';
    if (cleanedText.includes('جواز سفر') || cleanedText.includes('Passport')) specificType = 'PASSPORT';
    if (cleanedText.includes('رخصة سوق')) specificType = 'DRIVING_LICENSE';

    return {
      documentType: specificType,
      idNumber: idMatch?.[0] || null,
      dateOfBirth: dateMatch?.[0] || null
    };
  }

  async getVerificationStatus(userId: string) {
    const document = await this.prisma.document.findUnique({
      where: { userId },
    });

    if (!document) {
      throw new HttpException({
        status: 'NONE',
        message: 'No document uploaded',
      }, 410);
    }

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

  async confirmDocument(userId: string) {
    const document = await this.prisma.document.findUnique({
      where: { userId },
    });

    if (!document) {
      throw new Error('No document found to verify');
    }

    return this.prisma.document.update({
      where: { userId },
      data: { status: 'VERIFIED' },
    });
    }
}