import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { ContactFormDto } from './dto/contact-form.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async submitContactForm(
    @Body() contactFormDto: ContactFormDto,
  ): Promise<{ message: string }> {
    await this.emailService.sendContactForm(
      contactFormDto.fullName,
      contactFormDto.email,
      contactFormDto.subject,
      contactFormDto.message,
    );

    return { message: 'Contact form submitted successfully' };
  }
}
