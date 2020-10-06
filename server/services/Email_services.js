const nodemailer = require('nodemailer');

const Logger = require('./logger_services');

const logger = new Logger('app');

const transporter = nodemailer.createTransport({
  service: 'GMAIL',
  auth: {
    user: 'kingmonkey409@gmail.com',
    pass: 'Yos112233',
  },
});

const SERVICE_EMAIL_ADDRESS = {
  from: 'kingmonkey409@gmail.com',
  to: 'ziadeyusef@gmail.com',
};

const emailNotification = (details, subject, text) => {
  const mailOptions = {
    from: SERVICE_EMAIL_ADDRESS.from,
    to: SERVICE_EMAIL_ADDRESS.to,
    subject,
    text: `${text} :${details}`,
  };

  transporter.sendMail(mailOptions, (error2, info) => {
    if (error2) {
      logger.error(error2);
    } else {
      logger.info(`Email sent: ${info.response}`);
    }
  });
};

module.exports = { emailNotification };
