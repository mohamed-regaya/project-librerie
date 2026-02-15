// login + register / signin + signup + connexion + creation de compte

import userModel from "../models/userModel.js";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import addressModel from "../models/addressModel.js";
import { transporter } from "../middlewares/nodemailer.js";

const register = async (data) => {
  let exisiintgUser = await userModel.findOne({ email: data.email });
  if (exisiintgUser) {
    return "addresse email deja utilisé";
  } else {
    if (data.city && data.country && data.postale_code) {
      let newAddress = new addressModel({
        city: data.city,
        country: data.country,
        postale_code: data.postale_code,
      });
      let savedAddress = await newAddress.save();
      data.address = savedAddress._id;
    }

    let password = data.password;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async function (err, hashedPassword) {
        if (err) {
          console.log(err);
        }
        data.password = hashedPassword;

        let newUser = new userModel(data);
        let result = await newUser.save();
        return result;
      });
    });
  }
};

const login = async (data) => {
  const user = await userModel.findOne({ email: data.email });

  if (!user) {
    return {
      error: "Email non existant",
      token: null,
    };
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    return {
      error: "Mot de passe incorrect",
      token: null,
    };
  }

  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

  return {
    msg: "Connecté avec succès",
    token,
    user,
  };
};

const getAllUsers = async () => {
  let result = await userModel.find();
  return result;
};

const deleteUser = async (id) => {
  let result = await userModel.findByIdAndDelete(id);
  return result;
};

export const updateUserProfile = async (userId, data) => {
  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(data.password, salt);
    data.password = hash;
  }

  const updatedUser = await userModel
    .findByIdAndUpdate(userId, { $set: data }, { new: true })
    .select("-password");

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};

let users = [];

const sendResetCodeService = async (email) => {
  console.log("📨 sendResetCodeService called with:", email);

  try {
    // Generate a clean 5-digit code
    const resetCode = Math.floor(10000 + Math.random() * 90000);
    console.log("🔐 Generated reset code:", resetCode);

    // Find user
    const user = await userModel.findOne({ email: email });
    console.log("👤 User found:", !!user);

    if (!user) {
      return { status: false, msg: "email non trouvé" };
      // throw new Error("User not found");
    }

    // Update reset code
    await userModel.findOneAndUpdate(
      { email: email },
      {
        resetCode: resetCode,
      },
    );

    console.log("✅ Reset code saved to database");

    // Verify SMTP before sending
    await transporter.verify();
    console.log("📡 SMTP server ready");

    // Send email
    const info = await transporter.sendMail({
      from: "Hichem22@gmail.com", // must be verified
      to: email,
      subject: "Password Reset Code",
      html: `
        <h2>Password Reset</h2>
        <p>Your verification code:</p>
        <h1>${resetCode}</h1>
        <p>Expires in 10 minutes</p>
      `,
    });

    console.log("✉️ Email sent:", info.messageId);

    return { status: true, msg: "email envoyé" };
  } catch (error) {
    console.error("🔥 sendResetCodeService ERROR:");
    console.error(error.message || error);
    return { status: false, msg: "erreur d'envoie" };
  }
};

const verifyResetCodeService = async (email, code) => {
  console.log(email, code);
  const user = await userModel.findOne({ email: email });
  console.log(user);
  if (!user || user.resetCode !== code) {
    return false;
  }

  return true;
};

const resetPasswordService = async (email, code, newPassword) => {
  const user = await userModel.findOne({ email: email });

  if (!user || user.resetCode !== code) {
    return false;
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  await userModel.findOneAndUpdate(
    { email: email }, // ✅ filter
    {
      password: newHashedPassword,
      resetCode: null,
    },
  );

  return true;
};

export default {
  register,
  login,
  getAllUsers,
  deleteUser,
  updateUserProfile,
  sendResetCodeService,
  verifyResetCodeService,
  resetPasswordService,
};
