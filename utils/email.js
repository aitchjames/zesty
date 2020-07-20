const nodemailer = require('nodemailer');
const ejs = require('ejs');
const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Zesty Recipes <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        // To get transporter details for sending emails
        if (process.env.NODE_ENV === 'production') {
            // Sendgrid
            return nodemailer.createTransport({
                host: process.env.SENDGRID_HOST,
                port: process.env.SENDGRID_PORT,
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    // Send the actual email
    async send(template, subject) {
        // Render HTML based on ejs template
        const html = await ejs.renderFile(`${__dirname}/../views/email/${template}.ejs`, {
            firstName: this.firstName,
            url: this.url,
            subject
        });

        // Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        };

        // Create transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to Zesty Recipes Family');
    }

    async sendPasswordReset() {
        await this.send('passwordReset', 'Your password reset token (Valid for 10 mins)');
    }
};
