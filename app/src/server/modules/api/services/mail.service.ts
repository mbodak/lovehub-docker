import { Component } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';

@Component()
export class MailService {

  private readonly service = 'gmail';
  private readonly authMail = 'lovehub.kv034@gmail.com';
  private readonly authPass = 'Q32xr710061997';
  private readonly transporter = nodemailer.createTransport({
    service: this.service,
    auth: {
      user: this.authMail,
      pass: this.authPass
    }
  });


  async createToken(): Promise<string> {
    try {
      const buf = await crypto.randomBytes(20);
      const token = buf.toString('hex');

      return token;
    } catch (error) {
      console.log(error);
    }
  }

  async sendRecoverPassEmail(email: string, token: string) {
    const mailOptions = {
      from: this.authMail,
      to: email,
      subject: 'LoveHub Password Reset',
      text: `Its your reset password link http://localhost:4200/forgot/${token}`
    };

    try {
      const res = await this.transporter.sendMail(mailOptions);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  async sendMail(email: string, subject: string, text: string) {
   const options = {
     from: this.authMail,
     to: email,
     subject,
     text
   } ;

   try {
     const res = await this.transporter.sendMail(options);
     console.log(res);
   } catch (e) {
     console.log(e);
   }
  }

}
