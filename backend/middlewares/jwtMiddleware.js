import jwt from "jsonwebtoken";

const verifyJWT = (allowedRoles = []) => {
  return (req, res, next) => {
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
      /*

decoded_token = {
id : "hsgdhsdghsdghsd",
role : client / admin / workder,
email : sdqdqsd

}
      */
      req.user = decoded_token;
      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(decoded_token.role)
      ) {
        return res
          .status(403)
          .json({ error: "acces réfusé : role non autorisé" });
      }
      next();
    } catch (error) {
      return res.json({
        message: "jeton invalide ",
      });
    }
  };
};

export default verifyJWT;
