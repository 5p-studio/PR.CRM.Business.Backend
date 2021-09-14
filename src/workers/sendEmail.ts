import Bull, { Queue } from 'bull';
import sendEmail from '@services/sendEmail';
import opts from '@libs/redisConnection';
import CustomerModel from '@models/customers';
import fs from 'fs';
import Path from 'path';
import handlebars from 'handlebars';

class SendEmailWorker {
    public queue: Queue;
    public delay: any;
    public idCustomer: any;
    public subject: any;
    public htmlContent: any;

    constructor (delay: any, idcustomer:any, subject: any, htmlContent: any) {
      this.queue = new Bull('send email', opts);
      this.delay = delay;
      this.idCustomer = idcustomer.split(' ');
      this.subject = subject;
      this.htmlContent = htmlContent;
      this.queue.on('completed', (job) => job.remove());
    }

    private static async sendMail (email: any, subject: any, htmlContent: any) {
      sendEmail.sendMail(email, subject, htmlContent);
    }

    public async shedulejob () {
      const option = {
        delay: this.delay,
        attempts: 2,
      };
      const customer = await CustomerModel.findAll({
        where: {
          id: this.idCustomer,
        },
      });
      const filePath = Path.join(__dirname, '../../src/templates/email.hbs');
      const source = fs.readFileSync(filePath).toString();
      const template = handlebars.compile(source);
      for (let i = 0; i < this.idCustomer.length; i++) {
        const replacements = {
          name: customer[i].firstName,
          htmlcontent: this.htmlContent,
        };
        const htmltosend = template(replacements);
        const data = {
          email: customer[i].email,
          firstName: customer[i].firstName,
          subject: this.subject,
          htmlContent: htmltosend,
        };
        this.queue.add(data, option);
      }
      this.queue.process(async function (job, done) {
        await SendEmailWorker.sendMail(job.data.email, job.data.subject, job.data.htmlContent);
        done();
      });
    }
}

export default SendEmailWorker;
