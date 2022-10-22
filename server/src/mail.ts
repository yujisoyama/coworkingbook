import nodemailer from 'nodemailer';
import "dotenv/config";

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
});

export const sendEmail = async (uuid: string, email: string, name: string) => {
    try {
        const mailSent = await transporter.sendMail({
            from: 'Coworking Book Platform <coworkingbook.platform@gmail.com>',
            to: [email],
            subject: 'Coworking Book - Account Activation',
            html: "<h2>Coworking Book Platform</h2> <p>Hi, " + name + "</p> <p>Click in the link below to confirm your email address and activate your account</p> <a href='http://localhost:3000/user/active/" + uuid + "' target='_blank'>Activate Account</a>",
        });
        console.log(mailSent);
    } catch (err) {
        console.log(err);
    }
    

}