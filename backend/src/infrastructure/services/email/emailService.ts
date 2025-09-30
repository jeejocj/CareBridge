import { IBaseEmailTemplate } from "../../../domain/interfaces/services/email/IBaseEmailTemplate";
import { IEmailService } from "../../../domain/interfaces/services/email/IEmailService";
import nodemailer from "nodemailer";

export class EmailService implements IEmailService {
  private _transporter: nodemailer.Transporter;
  constructor() {
    this._transporter = nodemailer.createTransport(
      {
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      {
        from: process.env.EMAIL_USER,
      }
    );

    this._transporter
      .verify()
      .then(() => console.log("Gmail service connection establised"))
      .catch((err) => console.error("Gmail connection failed:", err));
  }
  async sendEmail(email: Required<IBaseEmailTemplate>): Promise<void> {
    await this._transporter.sendMail({
      to: email.receiverEmail,
      subject: email.subject,
      html: email.content,
    });
  }
}
