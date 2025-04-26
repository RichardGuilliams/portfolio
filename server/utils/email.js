const nodemailer = require('nodemailer');
const { htmlToText } = require('html-to-text')
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const path = require("path");
const AppError = require("./appError.js");


//react
// const React = require('react');
// const ReactDOMServer = require('react-dom/server');

// SENDGRID
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'test@example.com', // Change to your recipient
//   from: 'test@example.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
//

module.exports = class Email{
    constructor(user, url){
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Richard Guilliams <${process.env.EMAIL_FROM}>`
    }

    newTransport(){
        if(process.env.NODE_ENV === 'production') {
            // Sendgrid
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USER,
                    pass: process.env.SENDGRID_PASSWORD,
                }
            });
        }

        //1 Create Transporter
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    }
    
    async send(template, subject){
        require('@babel/register')({
            extensions: ['.js', '.jsx'],
            presets: ['@babel/preset-env', '@babel/preset-react']
          });
        const Component = require(path.join(__dirname, `../views/${template}.jsx`)).default;

        // 2. Render to static HTML
        const html = ReactDOMServer.renderToStaticMarkup(
          React.createElement(Component, {
            firstName: this.firstName,
            url: this.url,
            subject
          })
        );
      
        // 3. Email options
        const emailOptions = {
          from: this.from,
          to: this.to,
          subject,
          html,
          text: htmlToText(html)
        };

      
        // 4. Send it
        try {
            await this.newTransport().sendMail(emailOptions);
            console.log('email sent successfully');
          } catch (err) {
            console.error('❌ Email sending error:', err);
            throw new AppError("The email did not send", 500);
          }
    }

    async sendWelcome(){
        await this.send('welcomeEmail', 'Welcome to Richard Guilliams IO. we\'re lucky to have you.')
    }

    async sendPasswordReset(){
        await this.send('passwordReset', 'Your password reset token (valid for ten minutes)');
    }
}
