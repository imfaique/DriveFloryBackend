const { secureHeapUsed } = require('crypto');
var dotenv = require('dotenv')
dotenv.config()
const nodemailer = require('nodemailer');

let transpoter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    },
})

module.exports = {
    verifyUserEmail: async function verifyUserEmail(name, userEmail, username, token) {
        try {
            info = await transpoter.sendMail({
                from: process.env.AUTH_EMAIL,
                to: userEmail,
                subject: 'hello' + name + 'Please verify your email address by clicking the link',
                html: 'http://localhost:5000/' + 'verifyUserEmail' + username + '/' + token,
            })
        } catch (err) {
            console.log(err)
        }
    }
}