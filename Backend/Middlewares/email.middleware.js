require('dotenv').config();
const nodemailer = require("nodemailer")

const sendEmail = async (to,subject,text) =>{
    try {
        //create a node mailer transporter
        const transporter = nodemailer.createTransport({
            host: 'lon108.truehost.cloud',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        //Setup email data

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: ` <img src="https://s3.amazonaws.com/logos.brandpa.com/uploads/d67b26f50dac5330a56fe707b4aa589a/FarmFiesta.png" alt='logo'/>
            <p>${text}</p>
            `
        };
        //Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
  
module.exports = sendEmail