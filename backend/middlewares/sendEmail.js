const nodemailer = require("nodemailer");

exports.sendEmail = async (Options) => {
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "fe84b8bef0f018",
      pass: "e2330a48b4a1bf",
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: Options.email,
    subject: Options.subjext,
    text: Options.message,
  };

  await transporter.sendMail(mailOptions);
};
