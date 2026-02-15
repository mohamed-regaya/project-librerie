import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "7516bb002@smtp-brevo.com",
    pass: "xsmtpsib-055e33c9079a10589a0259c761b07a32b124b45497c3582e5c70b87680fef6c6-7dZYOSRZy359mR20",
  },
});
