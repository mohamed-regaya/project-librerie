// login + register / signin + signup + connexion + creation de compte

import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import addressModel from "../models/addressModel.js";
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
      msg: "Email non existant",
      token: null,
    };
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    return {
      msg: "Mot de passe incorrect",
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
  };
};

export default { register, login };
