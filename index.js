const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/form', (req, res) => {
    console.log(req.body);
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
        <h3> Contact Details </h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Message: ${req.body.message}</li>
        </ul>
        `;
        let transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            // host: "smtp.ethereal.email",
            // port: 587,
            host: 'smtp.gmail.com',
            secure: false, // true for 465, false for other ports
            auth: {
                // user: 'leone.will@ethereal.email',
                // pass: 'VJytN1MAXMqKKatPaF'
                user: 'akbaranj@gmail.com',
                pass: 'ASDdsa2439@A'
            }
        }));
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"New User 👻" <text@example.com>', // sender address
            to: "km.akbarbasha@gmail.com, hello@prodjar.com", // list of receivers
            subject: `New User ${req.body.name}`, // Subject line
            text: `${req.body.message}`, // plain text body
            html: htmlEmail // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err);
            }
            console.log('Message Sent: %s', info.message);
            console.log('Message URL: %s', nodemailer.getTestMessageUrl(info));
        })
    })
})

const PORT = process.env.PORT || 5001;

app.listen(PORT, error => {
    if (error) {
        return logger.info('something bad happened: ' + JSON.stringify(error));
    }
    console.log(`Server listening on port ${PORT}`)
})