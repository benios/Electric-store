const nodemailer = require('nodemailer');

const Logger = require('./logger_services');

const logger = new Logger('app');

const EmailNotification = (details) => {
  const transporter = nodemailer.createTransport({
    service: 'GMAIL',
    auth: {
      user: 'kingmonkey409@gmail.com',
      pass: 'Yos112233',
    },
  });

  const mailOptions = {
    from: 'kingmonkey409@gmail.com',
    to: 'ziadeyusef@gmail.com',
    subject: 'A new order has been created',
    text: `order details: ${details}`,
  };

  transporter.sendMail(mailOptions, (error2, info) => {
    if (error2) {
      logger.error(error2);
    } else {
      logger.info(`Email sent: ${info.response}`);
    }
  });
};

module.exports = { EmailNotification };
