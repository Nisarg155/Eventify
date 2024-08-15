const DOMAIN = "mailg.csi-ddu.tech";
const Mailgun = require('mailgun-js');
const dotenv = require('dotenv')
dotenv.config();
const mailgun = new  Mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

const sendEmail = (to, subject, html) => {
    const data = {
        from: 'CSI DDU <ce_csi@ddu.ac.in>',
        to: to,
        subject: subject,
        html: html
    };

    mailgun.messages().send(data, (error, body) => {
        if (error) {
            console.error(error);
        } else {
            console.log(body);
        }
    });
};

module.exports = {sendEmail};
