import nodemailer from "nodemailer";

class MailService {
  transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport(<any>{
      host: "smtp.gmail.com",
      port: "587",
      secure: false,
      auth: {
        user: "roottestforback@gmail.com",
        pass: "aahlxjlqbpxgvywa",
      },
      tls:{
        rejectUnauthorized:false,
      }
    });
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта на" + process.env.API_URL,
      text: "",
      html: `
      <div>
      <h1>Для активации перейдите по ссылке</h1>
      <a href=${link}>${link}</a>
      </div>
      `,
    });
  }
}

export const mailService = new MailService();