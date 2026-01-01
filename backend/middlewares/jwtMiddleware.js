import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({ message: "les headers de requete est vide ! " });
  }
  const token = authHeader.replace("Bearer ", "");
  console.log("le token depuis jwt middleware est", token);
  if (!token) {
    return res.json({ message: "aucun jeton fournis!" });
  }
  try {
    let decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded_token;
    //req.role = decoed_token.role
    next();
    console.log("decoded token", decoded_token);
    // return res.json({
    //   message: "jeton acces valide : binevneue!",
    //   decoded_token: decoded_token,
    // });
  } catch (error) {
    return res.json({
      message: "jeton invalide ",
    });
  }
};

export default verifyJWT;
