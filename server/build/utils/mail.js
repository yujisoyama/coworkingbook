"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordEmail = exports.sendAccountConfirmEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
});
const sendAccountConfirmEmail = async (uuid, email, name) => {
    try {
        const mailSent = await transporter.sendMail({
            from: 'Coworking Book Platform <coworkingbook.platform@gmail.com>',
            to: [email],
            subject: 'Coworking Book - Account Activation',
            html: "<h2>Coworking Book Platform</h2> <p>Hi, " + name + "</p> <p>Click in the link below to confirm your email address and activate your account</p> <a href='http://15.228.128.96:3000/user/active/" + uuid + "' target='_blank'>Activate Account</a>",
        });
        console.log(mailSent);
    }
    catch (err) {
        console.log(err);
    }
};
exports.sendAccountConfirmEmail = sendAccountConfirmEmail;
const sendPasswordEmail = async (email, name, password) => {
    try {
        const mailSent = await transporter.sendMail({
            from: 'Coworking Book Platform <coworkingbook.platform@gmail.com>',
            to: [email],
            subject: 'Coworking Book - Forgot Password',
            html: "<h2>Coworking Book Platform</h2> <p>Hi, " + name + "</p> <p>There is your new password: " + password + "</p> <p>You can change your password in Edit Profile section.</p>",
        });
        console.log(mailSent);
    }
    catch (err) {
        console.log(err);
    }
};
exports.sendPasswordEmail = sendPasswordEmail;
