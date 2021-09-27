import nodeMailer from 'nodeMailer';
import settings from '@configs/settings';

class sendEmail {
    public static sendMail = (to: any, subject: any, htmlContent: any) => {
      const transporter = nodeMailer.createTransport({
        host: settings.mailHost,
        auth: {
          user: settings.adminEmail,
          pass: settings.adminEmailPassword,
        },
      });
      const option = {
        to: to,
        subject: subject,
        html: htmlContent,
      };
      return transporter.sendMail(option);
    };
}

export default sendEmail;
