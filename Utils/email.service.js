const nodemailer = require("nodemailer");
require("dotenv").config()
async function emailSendingService(email, randomCode) {
  try {
   
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.VERIFIR_EMAIL,
        pass: process.env.GOOGLE_PASS,
      },
    });

    const emailOption = {
      from: process.env.VERIFIR_EMAIL,
      to: email,
      subject: "Email verifying",
      html: `<b>Email tasdiqlash uchun kodingiz ${randomCode}</b>`,
      
    };
    await transporter.sendMail(emailOption);
    console.log('Email yuborildi:', email);
    const info = await transporter.sendMail(emailOption);
    return info; 
  } catch (error) {
    throw new Error("Email jo`natishda xatolik yuz berdi");
  }
}
module.exports = emailSendingService;
